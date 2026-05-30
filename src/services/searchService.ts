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
        // Disable cache to force elasticsearch requests on every page navigation
        const context = await browser.newContext({ offline: false });
        const page = await context.newPage();

        try {
          while (players.length < targetSize) {
            logger.info(`SSR Loop: Fetching Page ${currentPage} (Collected: ${players.length}/${targetSize})`);
            
            let url = `${CONSTANTS.BASE_URL}/24/players?page=${currentPage}&`;
            const params = [];
            if (options.name) params.push(`q=${encodeURIComponent(options.name)}`);
            if (options.sortBy) params.push(`sortBy=${options.sortBy}`);
            if (options.sortOrder) params.push(`sortOrder=${options.sortOrder}`);
            if (options.minRating) params.push(`minRating=${options.minRating}`);
            if (options.maxRating) params.push(`maxRating=${options.maxRating}`);
            url += params.join('&');

            let pagePlayers: Player[] = [];
            
            const interceptor = async (response: any) => {
              if (response.url().includes('elasticsearch')) {
                try {
                  const text = await response.text();
                  const json = JSON.parse(text);
                  if (json.players && json.players.length > 0) {
                    pagePlayers = json.players;
                    logger.info(`Page ${currentPage}: Caught ${pagePlayers.length} players from network.`);
                  }
                } catch (e) {}
              }
            };
            page.on('response', interceptor);

            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
            
            // Wait for player cards to actually appear in the UI (triggers the API call)
            await page.waitForSelector('a[href^="/24/player/"]', { timeout: 15000 }).catch(() => null);

            // Wait for network response (up to 5s more)
            for (let i = 0; i < 10; i++) {
              if (pagePlayers.length > 0) break;
              await new Promise(r => setTimeout(r, 500));
            }
            
            page.off('response', interceptor);

            // If network failed, try rehydration fallback on the same page
            if (pagePlayers.length === 0) {
              logger.warn(`Page ${currentPage}: Network capture failed. Trying SSR rehydration...`);
              const ssrData = await page.evaluate(() => {
                  const findData = () => {
                      const scripts = Array.from(document.querySelectorAll('script')).map(s => s.textContent).filter(t => t && t.includes('__sveltekit_'));
                      if (scripts.length === 0) return null;
                      const text = scripts[0] || '';
                      
                      // Balanced bracket extraction for players array
                      // In search results, it might be deep in the nodes.
                      // Let's try to extract exactly what we need
                      const match = text.match(/players:(\[.*?\]),count/);
                      if (match) {
                        try { return new Function(`return ${match[1]}`)(); } catch (e) {}
                      }
                      return null;
                  };
                  return findData();
              });

              if (ssrData && Array.isArray(ssrData) && ssrData.length > 0) {
                pagePlayers = ssrData;
                logger.info(`Page ${currentPage}: Rehydrated ${pagePlayers.length} players from SSR block.`);
              }
            }

            if (pagePlayers.length === 0) {
              logger.warn(`Page ${currentPage}: No players found. Ending loop.`);
              break;
            }

            // Normalize and Add
            const normalized = pagePlayers.map((p: any) => ({
              ...p,
              assetId: p.assetId || p.id,
              playerId: p.playerId || p.id,
              club: p.club || { name: p.clubName || 'Unknown', id: 0 },
              league: p.league || { name: p.leagueName || 'Unknown', id: 0 },
              nation: p.nation || { name: p.nationName || 'Unknown', id: 0 }
            }));

            players.push(...normalized);
            logger.info(`Progress: ${players.length}/${targetSize} players collected.`);

            if (players.length >= targetSize) break;
            currentPage++;
            // Longer delay to prevent IP blocking/browser throttling
            await new Promise(r => setTimeout(r, 3000));
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
