import { RenderzClient } from '../client/renderzClient';
import { SessionManager } from '../browser/sessionManager';
import { SearchOptions } from '../types/search';
import { SearchResponse, Player } from '../types/player';
import { CONSTANTS } from '../config/constants';
import logger from '../utils/logger';
import fs from 'fs';

export class SearchService {
  private client: RenderzClient;
  private sessionManager: SessionManager;

  constructor() {
    this.client = new RenderzClient();
    this.sessionManager = new SessionManager();
  }

  private async searchViaSSR(url: string): Promise<Player[]> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const page = await browser.newPage();
    let capturedData: Player[] = [];

    try {
      logger.info(`SSR Scrape: Navigating to ${url}...`);

      // Set up interception
      page.on('response', async (response: any) => {
        const reqUrl = response.url();
        if (reqUrl.includes('elasticsearch')) {
           try {
              const text = await response.text();
              const json = JSON.parse(text);
              if (json.players && json.players.length > 0) {
                  capturedData = json.players;
                  logger.info(`SSR Intercept successful! Caught ${capturedData.length} players from network.`);
              }
           } catch (e) {}
        }
      });

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      
      // Wait up to 20 seconds for the network request to be caught
      for (let i = 0; i < 40; i++) {
        if (capturedData.length > 0) break;
        await new Promise(r => setTimeout(r, 500));
      }

      if (capturedData.length > 0) {
          // Normalize intercepted data
          return capturedData.map((p: any) => {
              const raw = p as any;
              return {
                ...raw,
                assetId: raw.assetId || raw.id,
                playerId: raw.playerId || raw.id,
                club: raw.club || { name: raw.clubName || 'Unknown', id: 0 },
                league: raw.league || { name: raw.leagueName || 'Unknown', id: 0 },
                nation: raw.nation || { name: raw.nationName || 'Unknown', id: 0 }
              };
          });
      }

      // Fallback: Try rehydrating from __data.json
      const dataUrl = url.includes('?') ? url.replace('?', '/__data.json?') : `${url}/__data.json`;
      logger.info(`Fallback: Fetching rehydration data from ${dataUrl}...`);
      await page.goto(dataUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      const rawContent = await page.evaluate(() => document.body.innerText);
      const json = JSON.parse(rawContent);

      const rehydrate = (data: any[]) => {
        const values = data;
        const cache = new Map();
        const walk = (obj: any): any => {
          if (obj === null || obj === undefined) return obj;
          if (typeof obj === 'number') {
            if (obj >= 0 && obj < values.length) {
              const val = values[obj];
              if (val === null || typeof val !== 'object') return val;
              if (cache.has(obj)) return cache.get(obj);
              const placeholder = Array.isArray(val) ? [] : {};
              cache.set(obj, placeholder);
              if (Array.isArray(val)) (placeholder as any[]).push(...val.map(walk));
              else for (const key in val) (placeholder as any)[key] = walk(val[key]);
              return placeholder;
            }
            return obj;
          }
          if (Array.isArray(obj)) return obj.map(walk);
          if (typeof obj === 'object') {
            const res: any = {};
            for (const key in obj) res[key] = walk(obj[key]);
            return res;
          }
          return obj;
        };
        return walk(data[0]);
      };

      for (const node of json.nodes) {
        if (node && node.data) {
          const rehydrated = rehydrate(node.data);
          const findPlayers = (obj: any, depth = 0): Player[] | null => {
            if (!obj || depth > 10) return null;
            if (Array.isArray(obj)) {
              if (obj.length > 0 && obj[0].rating && obj[0].position) return obj;
              for (const item of obj) {
                const found = findPlayers(item, depth + 1);
                if (found) return found;
              }
            } else if (typeof obj === 'object') {
              if (obj.rating && obj.position && (obj.cardName || obj.firstName)) return [obj];
              if (obj.players && Array.isArray(obj.players)) return findPlayers(obj.players, depth + 1);
              if (obj.player && typeof obj.player === 'object') return findPlayers(obj.player, depth + 1);
              for (const key in obj) {
                const found = findPlayers(obj[key], depth + 1);
                if (found) return found;
              }
            }
            return null;
          };

          const players = findPlayers(rehydrated);
          if (players && players.length > 0) {
            logger.info(`SSR Extraction successful! Found ${players.length} players.`);
            return players.map(p => {
              const raw = p as any;
              
              const skillStyleSkills = raw.skillStyleSkills || (raw.skillsData ? raw.skillsData.map((s: any) => ({
                id: s.skill.id,
                name: s.skill.name,
                image: s.skill.image
              })) : []);

              return {
                ...raw,
                assetId: raw.assetId || raw.id,
                playerId: raw.playerId || raw.id,
                weakFoot: raw.weakFoot || parseInt(raw.weakFootRating?.toString().match(/\d+/)?.[0] || '3'),
                birthday: raw.birthday || '1990-01-01T00:00:00Z',
                source: raw.source || 'Unknown',
                club: raw.club || { name: raw.clubName || 'Unknown', id: 0 },
                league: raw.league || { name: raw.leagueName || 'Unknown', id: 0 },
                nation: raw.nation || { name: raw.nationName || 'Unknown', id: 0 },
                skillStyleSkills,
                skillMovesLevel: typeof raw.skillMovesLevel === 'number' ? raw.skillMovesLevel : parseInt(raw.skillMoves?.stars?.toString().match(/\d+/)?.[0] || '3')
              };
            });
          }
        }
      }
      return [];
    } catch (error: any) {
      logger.error(`SSR Scrape failed: ${error.message}`);
      return [];
    } finally {
      await browser.close();
    }
  }

  async search(options: SearchOptions): Promise<Player[]> {
    const payload = this.buildSearchPayload(options);
    logger.info(`Searching with options: ${JSON.stringify(options)}`);
    
    try {
      // 1. Try API first (Fastest)
      const response = await this.client.post<SearchResponse>(CONSTANTS.SEARCH_ENDPOINT, payload);
      return response.players;
    } catch (error: any) {
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn('Axios blocked. Entering Multi-Page SSR Loop...');
        
        const targetSize = options.size || CONSTANTS.DEFAULT_PAGE_SIZE;
        const players: Player[] = [];
        let currentPage = 1;

        const { chromium } = require('playwright-extra');
        const stealthPlugin = require('puppeteer-extra-plugin-stealth');
        chromium.use(stealthPlugin());

        const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
        const page = await browser.newPage();

        try {
          // Initialize first page to capture security tokens
          logger.info(`SSR Loop: Initializing session on Page 1...`);
          const initialUrl = `${CONSTANTS.BASE_URL}/24/players?page=1`;
          
          let tokens: { token: string, fingerprint: string } | null = null;
          
          page.on('request', (req: any) => {
            if (req.url().includes('elasticsearch') && !tokens) {
              const h = req.headers();
              if (h['x-secure-token'] && h['x-client-fingerprint']) {
                tokens = {
                  token: h['x-secure-token'],
                  fingerprint: h['x-client-fingerprint']
                };
              }
            }
          });

          await page.goto(initialUrl, { waitUntil: 'domcontentloaded', timeout: 90000 });
          
          // Wait for tokens to be captured (up to 15s)
          for (let i = 0; i < 30; i++) {
            if (tokens) break;
            
            // If we are halfway through and still no tokens, try to force a request by triggering search
            if (i === 15) {
                logger.warn('Token capture slow, attempting to force a request via UI...');
                await page.evaluate(() => {
                    const searchBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent?.toLowerCase().includes('search'));
                    if (searchBtn instanceof HTMLElement) searchBtn.click();
                }).catch(() => null);
            }
            
            await new Promise(r => setTimeout(r, 500));
          }

          if (!tokens) {
            throw new Error('Failed to capture security tokens from SSR page after multiple attempts.');
          }

          logger.info('Tokens captured. Executing fast-fetch loop...');

          // Execute manual fetch loop inside the browser context
          const allResults = await page.evaluate(async (params: { targetSize: number, tokens: any, options: SearchOptions, endpoint: string }) => {
            const results: any[] = [];
            const { targetSize, tokens, options, endpoint } = params;
            
            for (let offset = 0; offset < targetSize; offset += 40) {
              const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-secure-token': tokens.token,
                  'x-client-fingerprint': tokens.fingerprint
                },
                body: JSON.stringify({
                  query: { bool: { must: [], should: [], must_not: [] } }, // Simple query for latest
                  sort: [ { [options.sortBy || 'rating']: { order: options.sortOrder || 'desc' } }, { assetId: { order: 'desc' } } ],
                  _source: [],
                  from: offset,
                  size: 40
                })
              });

              if (!res.ok) break;
              const json = await res.json();
              if (!json.players || json.players.length === 0) break;
              
              results.push(...json.players);
              if (results.length >= targetSize) break;
              
              // Small throttle to stay under the radar
              await new Promise(r => setTimeout(r, 200));
            }
            return results;
          }, { targetSize, tokens, options, endpoint: CONSTANTS.SEARCH_ENDPOINT });

          if (allResults.length > 0) {
            const normalized = allResults.map((p: any) => ({
              ...p,
              assetId: p.assetId || p.id,
              playerId: p.playerId || p.id,
              club: p.club || { name: p.clubName || 'Unknown', id: 0 },
              league: p.league || { name: p.leagueName || 'Unknown', id: 0 },
              nation: p.nation || { name: p.nationName || 'Unknown', id: 0 }
            }));
            players.push(...normalized);
            logger.info(`SSR Loop Complete: Captured ${players.length} players.`);
          }
        } finally {
          await browser.close();
        }

        return players.slice(0, targetSize);
      }
      throw error;
    }
  }

  async getByAssetId(assetId: number): Promise<Player | null> {
    const payload = { query: { bool: { must: [{ match: { assetId } }], should: [], must_not: [] } }, from: 0, size: 1, _source: [] };
    try {
      const response = await this.client.post<SearchResponse>(CONSTANTS.SEARCH_ENDPOINT, payload);
      return response.players[0] || null;
    } catch (error: any) {
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn(`Detail blocked. Fetching SSR for player ${assetId}...`);
        const url = `${CONSTANTS.BASE_URL}/24/player/${assetId}`;
        const players = await this.searchViaSSR(url);
        return players[0] || null;
      }
      return null;
    }
  }

  async getLatestCards(size: number = 40): Promise<Player[]> { return this.search({ sortBy: 'added', sortOrder: 'desc', size }); }
  async searchByName(name: string, size: number = 40): Promise<Player[]> { return this.search({ name, size }); }
  async getByRating(min: number, max: number = 120): Promise<Player[]> { return this.search({ minRating: min, maxRating: max, size: 40 }); }

  private buildSearchPayload(options: SearchOptions) {
    const must: any[] = [];
    if (options.name) must.push({ query_string: { fields: ['cardName', 'commonName', 'firstName', 'lastName'], query: `*${options.name}*` } });
    if (options.minRating !== undefined || options.maxRating !== undefined) must.push({ range: { rating: { gte: options.minRating ?? 0, lte: options.maxRating ?? 120 } } });
    if (options.auctionable !== undefined) {
      must.push({ match: { auctionable: options.auctionable } });
      if (options.auctionable) must.push({ range: { 'priceData.0.basePrice': {} } });
    }
    if (options.position) must.push({ match: { position: options.position } });
    if (options.league) must.push({ match: { 'league.id': options.league } });
    if (options.club) must.push({ match: { 'club.id': options.club } });
    if (options.nation) must.push({ match: { 'nation.id': options.nation } });
    const sort: any[] = [];
    if (options.sortBy) sort.push({ [options.sortBy]: { order: options.sortOrder || 'desc' } });
    else sort.push({ rating: { order: 'desc' } });
    sort.push({ assetId: { order: 'desc' } });
    return { query: { bool: { must, should: [], must_not: [] } }, sort, _source: [], from: options.from || 0, size: options.size || CONSTANTS.DEFAULT_PAGE_SIZE };
  }
}
