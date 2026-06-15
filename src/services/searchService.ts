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

  async getPlayersByAssetIds(assetIds: number[]): Promise<Player[]> {
      const results: Player[] = [];
      const batchSize = 50; // Increased sub-batch size for faster processing
      
      for (let i = 0; i < assetIds.length; i += batchSize) {
          const batch = assetIds.slice(i, i + batchSize);
          logger.info(`  -> Capturing sub-batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(assetIds.length/batchSize)} (${batch.length} players)...`);
          try {
              // Try direct API first for the batch
              const payload = { 
                  query: { bool: { must: [{ terms: { assetId: batch } }], should: [], must_not: [] } }, 
                  from: 0, 
                  size: batch.length, 
                  _source: [] 
              };
              const response = await this.client.post<SearchResponse>(CONSTANTS.SEARCH_ENDPOINT, payload);
              if (response.players && response.players.length > 0) {
                  results.push(...response.players.map(p => this.normalizePlayer(p)));
                  if (response.players.length === batch.length) continue;
                  
                  // If we got some but not all, find which are missing and continue to SSR
                  const foundIds = new Set(response.players.map((p: any) => p.assetId));
                  const remainingBatch = batch.filter(id => !foundIds.has(id));
                  if (remainingBatch.length > 0) {
                      const ssrPlayers = await this.getPlayersByAssetIdsViaSSR(remainingBatch);
                      results.push(...ssrPlayers);
                  }
                  continue;
              }
          } catch (e) {
              logger.warn(`Batch API fetch failed for ${batch.length} players, falling back to SSR...`);
          }

          // Fallback to SSR for this small batch
          const ssrPlayers = await this.getPlayersByAssetIdsViaSSR(batch);
          results.push(...ssrPlayers);
          
          // Small delay between sub-batches to be safe
          if (i + batchSize < assetIds.length) await new Promise(r => setTimeout(r, 500));
      }
      
      return results;
  }

  private async getPlayersByAssetIdsViaSSR(assetIds: number[]): Promise<Player[]> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const page = await browser.newPage();
    let tokens: { token: string, fingerprint: string, code?: string } | null = null;

    try {
      page.on('request', (req: any) => {
        if (tokens && tokens.token) return;
        if (!req.url().includes('elasticsearch')) return;
        const h = req.headers();
        if (h['x-secure-token'] && h['x-client-fingerprint']) {
          tokens = { token: h['x-secure-token'], fingerprint: h['x-client-fingerprint'], code: h['x-code'] };
        }
      });

      await page.goto(`${CONSTANTS.BASE_URL}/24/players`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      // Wait for tokens
      for (let i = 0; i < 20; i++) {
        if (tokens) break;
        if (i === 10) {
            await page.evaluate(() => {
                const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Search'));
                if (btn) btn.click();
            }).catch(() => null);
        }
        await new Promise(r => setTimeout(r, 500));
      }

      if (!tokens) return [];

      return await page.evaluate(async (params: { assetIds: number[], tokens: any, endpoint: string }) => {
        const { assetIds, tokens, endpoint } = params;
        const found: any[] = [];
        
        // Fetch players one by one or in a single terms query
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-secure-token': tokens.token,
            'x-client-fingerprint': tokens.fingerprint,
            ...(tokens.code ? { 'x-code': tokens.code } : {})
          },
          body: JSON.stringify({
            query: { bool: { must: [{ terms: { assetId: assetIds } }], should: [], must_not: [] } },
            from: 0,
            size: assetIds.length,
            _source: []
          })
        });

        if (res.ok) {
            const json = await res.json();
            if (json.players) found.push(...json.players);
        }
        return found;
      }, { assetIds, tokens, endpoint: CONSTANTS.SEARCH_ENDPOINT });

    } catch (error: any) {
      logger.error(`SSR Batch fetch failed: ${error.message}`);
      return [];
    } finally {
      await browser.close();
    }
  }

  private async searchViaSSR(url: string): Promise<Player[]> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const page = await browser.newPage();
    let capturedData: Player[] = [];
    let renderedTraits: Player['traits'] | null = null;

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

      if (url.includes('/player/')) {
        renderedTraits = await this.extractRenderedTraits(page);
      }

      if (capturedData.length > 0) {
          // Normalize intercepted data and merge in traits rendered on the player detail page
          return capturedData.map((p: any) => this.normalizePlayer(p, renderedTraits));
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
              return this.normalizePlayer(p, renderedTraits);
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

  async getAllAssetIds(): Promise<number[]> {
    const fetchIdsBatch = async (size: number, searchAfter?: any[], tokens?: any) => {
        const body: any = {
            query: { bool: { must: [], should: [], must_not: [] } },
            sort: [{ assetId: { order: "desc" } }],
            size: size
        };
        if (searchAfter) body.search_after = searchAfter;
        
        if (tokens) {
            // Using browser fetch context
            return await this.fetchInBrowser(CONSTANTS.SEARCH_ENDPOINT, body, tokens);
        } else {
            // Using direct axios client
            return await this.client.post(CONSTANTS.SEARCH_ENDPOINT, body);
        }
    };

    logger.info('Fetching all Asset IDs from RenderZ (High Speed Scan)...');
    try {
      const allIds: number[] = [];
      const BATCH_SIZE = 1000;
      let lastAssetId: number | null = null;
      let hasMore = true;

      while (hasMore) {
        const searchAfter = lastAssetId ? [lastAssetId] : undefined;
        const response: any = await fetchIdsBatch(BATCH_SIZE, searchAfter);
        
        if (response.players && response.players.length > 0) {
           const batch = response.players.map((p: any) => p.assetId);
           allIds.push(...batch);
           lastAssetId = batch[batch.length - 1];
           
           if (response.players.length < BATCH_SIZE) {
               hasMore = false;
           }
        } else {
           hasMore = false;
        }
      }
      logger.info(`Scan complete. Found ${allIds.length} players on RenderZ.`);
      return allIds;
    } catch (error: any) {
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn('Direct scan blocked. Entering Browser-based ID Discovery...');
        return await this.getAllAssetIdsViaSSR();
      }
      logger.error(`Failed to scan all asset IDs: ${error.message}`);
      return [];
    }
  }

  private async fetchInBrowser(endpoint: string, body: any, tokens: any, method: string = 'POST') {
      const options: any = {
          method,
          headers: {
              'Content-Type': 'application/json',
              'x-secure-token': tokens.token,
              'x-client-fingerprint': tokens.fingerprint
          }
      };
      if (body) {
          options.body = JSON.stringify(body);
      }
      return await fetch(endpoint, options).then(r => r.json());
  }

  private async getAllAssetIdsViaSSR(): Promise<number[]> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });   
    const page = await browser.newPage();
    let capturedTokens: any = null;

    try {
      page.on('console', (msg: any) => logger.debug(`BROWSER: ${msg.text()}`));

      page.on('request', (req: any) => {
        const headers = req.headers();
        if (headers['x-code'] && (!capturedTokens || !capturedTokens.code)) {
            if (!capturedTokens) capturedTokens = {};
            capturedTokens.code = headers['x-code'];
            logger.info('Captured x-code for SSR Discovery');
        }

        if (capturedTokens && capturedTokens.token && capturedTokens.fingerprint) return;
        if (!req.url().includes('elasticsearch')) return;
        
        if (headers['x-secure-token'] && headers['x-client-fingerprint']) {
          if (!capturedTokens) capturedTokens = {};
          capturedTokens.token = headers['x-secure-token'];
          capturedTokens.fingerprint = headers['x-client-fingerprint'];
          if (headers['x-code']) capturedTokens.code = headers['x-code'];
          logger.info('Captured search tokens for SSR Discovery');
        }
      });

      await page.goto(`${CONSTANTS.BASE_URL}/24/players`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      // Force a search interaction to ensure tokens are generated/used
      await page.evaluate(() => {
          const searchBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent?.toLowerCase().includes('search'));
          if (searchBtn instanceof HTMLElement) searchBtn.click();
      }).catch(() => null);

      for (let i = 0; i < 40; i++) {
        if (capturedTokens && capturedTokens.token && capturedTokens.fingerprint) break;
        await new Promise(r => setTimeout(r, 500));
      }

      if (!capturedTokens || !capturedTokens.token) throw new Error('Failed to capture tokens for SSR Discovery');

      return await page.evaluate(async (params: { tokens: any, endpoint: string }) => {      
        const results: number[] = [];
        const { tokens, endpoint } = params;
        let lastAssetId: number | null = null;
        let lastSortValue: any = null;
        let hasMore = true;
        const BATCH_SIZE = 1000; // Increased for speed

        while (hasMore) {
          const headers: any = {
            'Content-Type': 'application/json',
            'x-secure-token': tokens.token,
            'x-client-fingerprint': tokens.fingerprint
          };
          if (tokens.code) headers['x-code'] = tokens.code;

          const body: any = {
              query: { bool: { must: [], should: [], must_not: [] } },
              sort: [{ rating: { order: "desc" } }, { assetId: { order: "desc" } }],
              _source: [],
              from: 0,
              size: BATCH_SIZE
          };
          if (lastSortValue !== null && lastAssetId !== null) {
              delete body.from;
              body.search_after = [lastSortValue, lastAssetId];
          }

          const res = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
          });

          if (!res.ok) {
              console.error(`Fetch failed with status ${res.status}`);
              break;
          }
          const json = await res.json();
          if (!json.players || json.players.length === 0) {
              console.log('SSR Search returned no players. Response: ' + JSON.stringify(json));
              hasMore = false;
              break;
          }
          
          results.push(...json.players.map((p: any) => p.assetId));
          const lastPlayer = json.players[json.players.length - 1];
          lastSortValue = lastPlayer.rating;
          lastAssetId = lastPlayer.assetId;
          
          if (results.length % 1000 === 0) {
              console.log(`SSR Discovery Progress: ${results.length} players found...`);
          }
          
          if (json.players.length < BATCH_SIZE) {
              hasMore = false;
          }
          
          // Minimal throttle
          await new Promise(r => setTimeout(r, 50));
        }
        return results;
      }, { tokens: capturedTokens, endpoint: CONSTANTS.SEARCH_ENDPOINT });
    } catch (error: any) {
      logger.error(`SSR Discovery failed: ${error.message}`);
      return [];
    } finally {
      await browser.close();
    }
  }

  private mapTraitName(title: string): string {
    const TRAIT_DICTIONARY: Record<string, string> = {
      'trait_name_12': 'Rapid',
      'trait_name_15': 'Clinical Finisher',
      'trait_name_16': 'Finesse Shot',
      'trait_name_18': 'Play Maker',
      'trait_name_21': 'GK Long Thrower'
    };
    return TRAIT_DICTIONARY[title] || title || 'Unknown';
  }

  private normalizePlayer(raw: any, renderedTraits: Player['traits'] | null = null): Player {
    if (Number(raw.assetId) === 3114943 || Number(raw.id) === 3114943 || Number(raw.assetId) === 24044746 || Number(raw.id) === 24044746) {
      require('fs').writeFileSync('eusebio_raw.json', JSON.stringify(raw, null, 2));
      console.log('Saved RAW JSON to eusebio_raw.json');
    }
    
    const skillStyleSkills = raw.skillStyleSkills || (raw.skillsData ? raw.skillsData.map((s: any) => ({
      id: s.skill.id,
      name: s.skill.name,
      image: s.skill.image
    })) : []);
    const supplementalTraits = this.extractSupplementalTraits(raw);

    return {
      ...raw,
      assetId: raw.assetId || raw.id,
      playerId: raw.playerId || raw.id,
      weakFoot: raw.weakFoot || parseInt(raw.weakFootRating?.toString().match(/\d+/)?.[0] || '3'),
      birthday: raw.birthday || '1990-01-01T00:00:00Z',
      source: raw.source || 'Unknown',
      club: raw.club || { name: raw.clubName || 'Unknown', id: this.extractLinkedId(raw.clubLink) },
      league: raw.league || { name: raw.leagueName || 'Unknown', id: this.extractLinkedId(raw.leagueLink) },
      nation: raw.nation || { name: raw.nationName || 'Unknown', id: this.extractLinkedId(raw.nationLink) },
      skillStyleSkills,
      playstyles: (() => {
        const extractedPlaystyles = (renderedTraits || []).filter(rt => rt.image && (rt.image.includes('playstyle_') || rt.image.includes('traitlogo_'))).map(rt => ({
          name: this.mapTraitName((rt as any).title || (rt as any).name || ''),
          icon: rt.image,
          level: (rt.image && rt.image.includes('GOLD')) ? 2 : 1,
          description: rt.description || ''
        }));
        const rawPlaystyles = raw.playStyles || raw.playstyles || raw.playstylesData || [];
        const mappedRawTraits = (raw.traits || []).filter((t: any) => t.image).map((t: any) => ({
          name: this.mapTraitName(t.title || ''),
          icon: t.image,
          level: (t.image && t.image.includes('GOLD')) ? 2 : 1,
          description: t.description || ''
        }));
        
        if (Number(raw.assetId) === 3114943 || Number(raw.assetId) === 24044746) {
           console.log('RAW PLAYSTYLES:', JSON.stringify(rawPlaystyles));
           console.log('EXTRACTED PLAYSTYLES:', JSON.stringify(extractedPlaystyles));
           console.log('MAPPED RAW TRAITS:', JSON.stringify(mappedRawTraits));
        }
        const combined = [...rawPlaystyles, ...extractedPlaystyles, ...mappedRawTraits];
        
        const uniquePlaystylesMap = new Map();
        combined.forEach(ps => {
            const name = ps.name || ps.title || 'Unknown';
            if (!uniquePlaystylesMap.has(name)) {
                uniquePlaystylesMap.set(name, ps);
            }
        });
        const uniquePlaystyles = Array.from(uniquePlaystylesMap.values());
        
        return uniquePlaystyles.map((ps: any, i: number, arr: any[]) => {
          let parsedLevel = 1;
          if (arr.length === 2) {
             parsedLevel = i === 0 ? 2 : 1;
          } else {
             if (typeof ps.level === 'number') parsedLevel = ps.level;
             else if (typeof ps.level === 'string' && ps.level.includes('2')) parsedLevel = 2;
             else if (ps.icon?.includes('GOLD') || ps.image?.includes('GOLD')) parsedLevel = 2;
          }
          return {
             name: ps.name || 'Unknown',
             icon: ps.icon || ps.image || '',
             level: parsedLevel,
             description: ps.description || ''
          };
        });
      })(),
      traits: this.mergeTraits(this.mergeTraits(raw.traits, supplementalTraits), (renderedTraits || []).filter(rt => !rt.image || (!rt.image.includes('playstyle_') && !rt.image.includes('traitlogo_')))),
      skillMovesLevel: typeof raw.skillMovesLevel === 'number' ? raw.skillMovesLevel : parseInt(raw.skillMoves?.stars?.toString().match(/\d+/)?.[0] || '3'),
      _raw: Object.keys(raw)
    };
  }

  async getSkillDetails(skillId: number, tokens?: any): Promise<any> {
    try {
        const endpoint = `https://renderz.app/api/skill/style/skill/${skillId}`;
        let data;
        
        if (tokens) {
             data = await this.fetchInBrowser(endpoint, undefined, tokens, 'GET');
        } else {
             // Use Axios for faster fetches
             const axios = require('axios');
             const response = await axios.get(endpoint, {
                 headers: { 'User-Agent': CONSTANTS.DEFAULT_USER_AGENT }
             });
             data = response.data;
        }
        return data;
    } catch (e) {
        logger.warn(`Failed to fetch dynamic skill details for skill ID ${skillId}`);
        return null;
    }
  }

  private extractLinkedId(link: unknown): number {
    if (typeof link !== 'string') return 0;
    return parseInt(link.match(/\d+$/)?.[0] || '0');
  }

  private mergeTraits(rawTraits: unknown, renderedTraits: Player['traits'] | null): Player['traits'] {
    const raw = this.normalizeTraits(rawTraits);
    const rendered = this.normalizeTraits(renderedTraits);

    if (raw.length === 0) return rendered;
    if (rendered.length === 0) return raw;

    const renderedById = new Map(rendered.map(trait => [trait.id, trait]));
    const rawIds = new Set(raw.map(trait => trait.id));
    const merged = raw.map(rawTrait => {
      const renderedTrait = renderedById.get(rawTrait.id);
      if (!renderedTrait) return rawTrait;

      return {
        ...rawTrait,
        title: this.isUsefulRenderedTraitTitle(renderedTrait.title) ? renderedTrait.title : rawTrait.title,
        description: renderedTrait.description || rawTrait.description,
        image: rawTrait.image || renderedTrait.image
      };
    });

    for (const renderedTrait of rendered) {
      if (!rawIds.has(renderedTrait.id)) {
        merged.push(renderedTrait);
      }
    }

    return merged;
  }

  private extractSupplementalTraits(raw: any): Player['traits'] {
    const supplemental: Array<{ id: number; title: string; description: string; image: string } | null> = [
      this.normalizeSupplementalTrait(raw?.skillMoves, 'skillmovelogo_23_', 100000),
      this.normalizeSupplementalTrait(raw?.celebration, 'celebrationlogo_23_', 200000)
    ];

    return supplemental
      .filter((trait): trait is { id: number; title: string; description: string; image: string } => trait !== null);
  }

  private normalizeSupplementalTrait(
    trait: any,
    imageToken: 'skillmovelogo_23_' | 'celebrationlogo_23_',
    idOffset: number
  ): { id: number; title: string; description: string; image: string } | null {
    const image = typeof trait?.image === 'string' ? trait.image : '';
    if (!image.includes(imageToken)) return null;

    const imageId = Number(image.match(new RegExp(`${imageToken}(\\d+)`))?.[1]);
    const sourceId = Number.isFinite(Number(trait?.id)) ? Number(trait.id) : imageId;
    if (!Number.isFinite(sourceId)) return null;

    return {
      id: idOffset + sourceId,
      title: typeof trait?.title === 'string' && trait.title.trim().length > 0 ? trait.title : `${imageToken}${sourceId}`,
      description: typeof trait?.description === 'string' && trait.description.trim().length > 0 ? trait.description : '',
      image
    };
  }

  private normalizeTraits(traits: unknown): Player['traits'] {
    if (!Array.isArray(traits)) return [];

    return traits
      .map((trait: any) => {
        const image = typeof trait?.image === 'string' ? trait.image : '';
        const imageId = image.match(/traitlogo_23_(\d+)/)?.[1];
        const id = Number(trait?.id ?? imageId);
        if (!Number.isFinite(id)) return null;

        return {
          id,
          title: typeof trait?.title === 'string' && trait.title.trim().length > 0 ? trait.title : `trait_name_${id}`,
          description: typeof trait?.description === 'string' && trait.description.trim().length > 0 ? trait.description : `trait_desc_${id}`,
          image
        };
      })
      .filter((trait): trait is { id: number; title: string; description: string; image: string } => trait !== null);
  }

  private isUsefulRenderedTraitTitle(title: string): boolean {
    const normalized = title.trim();
    return normalized.length > 0
      && !/^traits?[_ ]title[_ ]\d+$/i.test(normalized)
      && !/^trait_name_\d+$/i.test(normalized)
      && !/^\d+$/.test(normalized);
  }

  private async extractRenderedTraits(page: any): Promise<Player['traits'] | null> {
    try {
      const renderedTraitsSelector = '.flex.gap-2.w-full.flex-wrap.justify-center.pb-4';
      await page.waitForSelector(renderedTraitsSelector, { timeout: 10000 }).catch(() => null);
      await page.waitForSelector(`${renderedTraitsSelector} img.relative.z-0.h-auto.max-w-full`, { timeout: 10000 }).catch(() => null);
      await page.waitForFunction(() => {
        const container = document.querySelector('.flex.gap-2.w-full.flex-wrap.justify-center.pb-4');
        if (!container) return true;

        const cards = Array.from(container.querySelectorAll(':scope > div'));
        if (cards.length === 0) return true;

        return cards.some((card) => {
          const image = card.querySelector('img.relative.z-0.h-auto.max-w-full') ?? card.querySelector('img');
          if (!image) return false;
          const src = image.getAttribute('src') || '';
          if (!/(traitlogo_23_|skillmovelogo_23_|celebrationlogo_23_|playstyle_)/.test(src)) return false;
          const text = card.textContent?.replace(/\s+/g, ' ').trim() || '';
          return text.length > 0;
        });
      }, { timeout: 10000 }).catch(() => null);

      return await page.evaluate(() => {
        const container = document.querySelector('.flex.gap-2.w-full.flex-wrap.justify-center.pb-4');
        if (!container) return null;

        const cards = Array.from(container.querySelectorAll(':scope > div'))
          .filter((card) => {
            const image = card.querySelector('img.relative.z-0.h-auto.max-w-full') ?? card.querySelector('img');
            if (!image) return false;
            const src = image.getAttribute('src') || '';
            return /(traitlogo_23_|skillmovelogo_23_|celebrationlogo_23_|playstyle_)/.test(src);
          });
        if (cards.length === 0) return null;

        return cards
          .map((card: Element, index: number) => {
            const imageElement = card.querySelector('img.relative.z-0.h-auto.max-w-full') ?? card.querySelector('img');
            const image = imageElement?.getAttribute('src') || '';
            const imageMatch = image.match(/(traitlogo_23_|skillmovelogo_23_|celebrationlogo_23_)(\d+)/);

            const spans = Array.from(card.querySelectorAll('span'));
            const visibleTitle = spans
              .map((span) => span.textContent?.replace(/\s+/g, ' ').trim() || '')
              .find((text) => text.length > 0 && !/^traits?[_ ]title[_ ]\d+$/i.test(text));
            const fallbackTitle = card.textContent?.replace(/\s+/g, ' ').trim() || '';
            const titleText = visibleTitle || fallbackTitle;

            let id = 300000 + index;
            if (imageMatch) {
              const prefix = imageMatch[1];
              const imageId = Number(imageMatch[2]);
              if (prefix === 'traitlogo_23_') {
                id = imageId;
              } else if (prefix === 'skillmovelogo_23_') {
                id = 100000 + imageId;
              } else if (prefix === 'celebrationlogo_23_') {
                id = 200000 + imageId;
              }
            }

            return {
              id,
              title: titleText || `trait_name_${id}`,
              description: `trait_desc_${id}`,
              image
            };
          })
          .filter((trait): trait is { id: number; title: string; description: string; image: string } => trait !== null);
      });
    } catch (error: any) {
      logger.warn(`Could not extract rendered traits: ${error.message}`);
      return null;
    }
  }

  async search(options: SearchOptions): Promise<Player[]> {
    const payload = this.buildSearchPayload(options);
    logger.info(`Searching with options: ${JSON.stringify(options)}`);
    
    try {
      // 1. Try API first (Fastest)
      const response = await this.client.post<SearchResponse>(CONSTANTS.SEARCH_ENDPOINT, payload);
      return response.players.map(player => this.normalizePlayer(player));
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
            let lastSortValue: any = null;
            let lastAssetId: number | null = null;
            
            const sortBy = options.sortBy || 'rating';
            const sortOrder = options.sortOrder || 'desc';

            while (results.length < targetSize) {
              const body: any = {
                query: { bool: { must: [], should: [], must_not: [] } },
                sort: [ { [sortBy]: { order: sortOrder } }, { assetId: { order: 'desc' } } ],
                size: 40
              };
              
              if (lastAssetId !== null) {
                  body.search_after = [lastSortValue, lastAssetId];
              }

              const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-secure-token': tokens.token,
                  'x-client-fingerprint': tokens.fingerprint
                },
                body: JSON.stringify(body)
              });

              if (!res.ok) break;
              const json = await res.json();
              if (!json.players || json.players.length === 0) break;
              
              results.push(...json.players);
              const lastPlayer = json.players[json.players.length - 1];
              lastSortValue = lastPlayer[sortBy];
              lastAssetId = lastPlayer.assetId;

              if (json.players.length < 40) break;
              if (results.length >= targetSize) break;
              
              // Small throttle to stay under the radar
              await new Promise(r => setTimeout(r, 200));
            }
            return results;
          }, { targetSize, tokens, options, endpoint: CONSTANTS.SEARCH_ENDPOINT });

          if (allResults.length > 0) {
            const normalized = allResults.map((p: any) => this.normalizePlayer(p));
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

  private async getByAssetIdViaSSRSearch(assetId: number): Promise<Player | null> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const page = await browser.newPage();
    let tokens: { token: string, fingerprint: string } | null = null;

    try {
      page.on('request', (req: any) => {
        if (tokens || !req.url().includes('elasticsearch')) return;

        const headers = req.headers();
        if (headers['x-secure-token'] && headers['x-client-fingerprint']) {
          tokens = {
            token: headers['x-secure-token'],
            fingerprint: headers['x-client-fingerprint']
          };
        }
      });

      await page.goto(`${CONSTANTS.BASE_URL}/24/players?page=1`, { waitUntil: 'domcontentloaded', timeout: 90000 });

      for (let i = 0; i < 40; i++) {
        if (tokens) break;
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (!tokens) {
        logger.warn(`Could not capture search tokens for player ${assetId}; falling back to route SSR.`);
        return null;
      }

      const result = await page.evaluate(async (params: { assetId: number, tokens: { token: string, fingerprint: string }, endpoint: string }) => {
        const response = await fetch(params.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-secure-token': params.tokens.token,
            'x-client-fingerprint': params.tokens.fingerprint
          },
          body: JSON.stringify({
            query: { bool: { must: [{ match: { assetId: params.assetId } }], should: [], must_not: [] } },
            from: 0,
            size: 1,
            _source: []
          })
        });

        if (!response.ok) {
          return null;
        }

        const json = await response.json();
        return json.players?.[0] || null;
      }, { assetId, tokens, endpoint: CONSTANTS.SEARCH_ENDPOINT });

      if (!result) return null;
      logger.info(`SSR search API detail successful for player ${assetId}.`);
      return this.normalizePlayer(result);
    } catch (error: any) {
      logger.warn(`SSR search API detail failed for player ${assetId}: ${error.message}`);
      return null;
    } finally {
      await browser.close();
    }
  }

  private async getRenderedTraitsForAsset(assetId: number): Promise<Player['traits'] | null> {
    const { chromium } = require('playwright-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth');
    chromium.use(stealthPlugin());

    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const page = await browser.newPage();

    try {
      await page.goto(`${CONSTANTS.BASE_URL}/24/player/${assetId}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
      return await this.extractRenderedTraits(page);
    } catch (error: any) {
      logger.warn(`Could not fetch rendered traits for ${assetId}: ${error.message}`);
      return null;
    } finally {
      await browser.close();
    }
  }

  public async enrichPlayerTraitsFromRenderedCard(player: Player, assetId: number): Promise<Player> {
    const renderedTraits = await this.getRenderedTraitsForAsset(assetId);
    if (!renderedTraits || renderedTraits.length === 0) return player;

    return {
      ...player,
      traits: this.mergeTraits(player.traits, renderedTraits)
    };
  }

  async getByAssetId(assetId: number): Promise<Player | null> {
    const payload = { query: { bool: { must: [{ match: { assetId } }], should: [], must_not: [] } }, from: 0, size: 1, _source: [] };
    try {
      const response = await this.client.post<SearchResponse>(CONSTANTS.SEARCH_ENDPOINT, payload);
      const player = response.players[0];
      if (!player) return null;
      const normalized = this.normalizePlayer(player);
      return await this.enrichPlayerTraitsFromRenderedCard(normalized, assetId);
    } catch (error: any) {
      if (error.message.includes('SESSION_BLOCKED') || error.message.includes('403')) {
        logger.warn(`Detail blocked. Fetching SSR for player ${assetId}...`);
        const apiPlayer = await this.getByAssetIdViaSSRSearch(assetId);
        if (apiPlayer) return await this.enrichPlayerTraitsFromRenderedCard(apiPlayer, assetId);

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
