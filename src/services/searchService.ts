import { RenderzClient } from '../client/renderzClient';
import { SessionManager } from '../browser/sessionManager';
import { SearchOptions } from '../types/search';
import { SearchResponse, Player } from '../types/player';
import { CONSTANTS } from '../config/constants';
import logger from '../utils/logger';

export class SearchService {
  private client: RenderzClient;
  private sessionManager: SessionManager;

  constructor() {
    this.client = new RenderzClient();
    this.sessionManager = new SessionManager();
  }

  async search(options: SearchOptions): Promise<Player[]> {
    const payload = this.buildSearchPayload(options);
    logger.info(`Searching with options: ${JSON.stringify(options)}`);
    
    try {
      // 1. Try Axios first (Fast)
      const response = await this.client.post<SearchResponse>(
        CONSTANTS.SEARCH_ENDPOINT,
        payload
      );
      return response.players;
    } catch (error: any) {
      // 2. If blocked, fallback to Browser Fetch (Guaranteed)
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn('Axios blocked by security. Falling back to Integrated Browser Search (IBS)...');
        return await this.searchViaBrowser(payload);
      }
      throw error;
    }
  }

  private async searchViaBrowser(payload: any): Promise<Player[]> {
    // Force a fresh session before the browser fetch to ensure we have current tokens
    const session = await this.sessionManager.getSession(true);
    
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const context = await browser.newContext({ userAgent: session.userAgent });
    const page = await context.newPage();

    try {
      // We go to the players page first to ensure we are in a valid state
      await page.goto(`${CONSTANTS.BASE_URL}/24/players`, { waitUntil: 'commit' });
      await page.waitForTimeout(2000);
      
      const results = await page.evaluate(async ({ url, body, token, fingerprint }: any) => {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-secure-token': token,
            'x-client-fingerprint': fingerprint
          },
          body: JSON.stringify(body)
        });
        
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error(`Invalid JSON response from API: ${text.substring(0, 100)}`);
        }
      }, { 
        url: CONSTANTS.SEARCH_ENDPOINT, 
        body: payload, 
        token: session.token, 
        fingerprint: session.fingerprint 
      });

      return results.players || [];
    } finally {
      await browser.close();
    }
  }

  async getLatestCards(size: number = 40): Promise<Player[]> {
    return this.search({
      sortBy: 'added',
      sortOrder: 'desc',
      size,
    });
  }

  async searchByName(name: string, size: number = 40): Promise<Player[]> {
    return this.search({
      name,
      size,
    });
  }

  async getByAssetId(assetId: number): Promise<Player | null> {
    const payload = {
      query: {
        bool: {
          must: [{ match: { assetId } }],
          should: [],
          must_not: [],
        },
      },
      from: 0,
      size: 1,
      _source: [],
    };

    try {
      const response = await this.client.post<SearchResponse>(
        CONSTANTS.SEARCH_ENDPOINT,
        payload
      );
      return response.players[0] || null;
    } catch (error: any) {
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn('Axios blocked. Fetching detail via browser...');
        const players = await this.searchViaBrowser(payload);
        return players[0] || null;
      }
      return null;
    }
  }

  async getByRating(min: number, max: number = 120): Promise<Player[]> {
    return this.search({
      minRating: min,
      maxRating: max,
      size: 40,
    });
  }

  private buildSearchPayload(options: SearchOptions) {
    const must: any[] = [];

    if (options.name) {
      must.push({
        query_string: {
          fields: ['cardName', 'commonName', 'firstName', 'lastName'],
          query: `*${options.name}*`,
        },
      });
    }

    if (options.minRating !== undefined || options.maxRating !== undefined) {
      must.push({
        range: {
          rating: {
            gte: options.minRating ?? 0,
            lte: options.maxRating ?? 120,
          },
        },
      });
    }

    if (options.auctionable !== undefined) {
      must.push({ match: { auctionable: options.auctionable } });
      if (options.auctionable) {
        must.push({ range: { 'priceData.0.basePrice': {} } });
      }
    }

    if (options.position) {
      must.push({ match: { position: options.position } });
    }

    if (options.league) must.push({ match: { 'league.id': options.league } });
    if (options.club) must.push({ match: { 'club.id': options.club } });
    if (options.nation) must.push({ match: { 'nation.id': options.nation } });

    const sort: any[] = [];
    if (options.sortBy) {
      sort.push({ [options.sortBy]: { order: options.sortOrder || 'desc' } });
    } else {
      sort.push({ rating: { order: 'desc' } });
    }
    sort.push({ assetId: { order: 'desc' } });

    return {
      query: {
        bool: {
          must,
          should: [],
          must_not: [],
        },
      },
      sort,
      _source: [],
      from: options.from || 0,
      size: options.size || CONSTANTS.DEFAULT_PAGE_SIZE,
    };
  }
}
