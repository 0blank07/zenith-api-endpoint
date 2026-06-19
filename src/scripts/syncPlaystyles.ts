import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;

  const fs = require('fs');
  const tempPath = './new_players_for_playstyles.json';
  let assetItems: { url: string; assetId: number }[] = [];

  if (!fs.existsSync(tempPath)) {
      logger.info('No new players temp file found. Exiting.');
      await pool.end();
      return;
  }

  const ids = JSON.parse(fs.readFileSync(tempPath, 'utf8'));
  assetItems = ids.map((id: number) => ({
      url: `https://renderz.app/24/player/${id}`,
      assetId: id
  }));
  
  logger.info(`Found ${assetItems.length} players from temp file. Starting headful sync for playstyles...`);
  // Delete temp file after reading
  fs.unlinkSync(tempPath);
  
  if (assetItems.length === 0) {
      await pool.end();
      return;
  }

  const { SessionManager } = require('../browser/sessionManager');
  const sessionManager = new SessionManager();
  const session = await sessionManager.getSession();

  const browser = await chromium.launch({ 
      headless: false,
      args: ['--window-size=1920,1080']
  });
  const context = await browser.newContext({
      userAgent: session.userAgent,
      viewport: { width: 1920, height: 1080 }
  });
  
  if (session.cookies) {
      const cookiesArr = session.cookies.split(';').map((c: string) => {
          const [name, ...rest] = c.split('=');
          return {
              name: name.trim(),
              value: rest.join('=').trim(),
              domain: '.renderz.app',
              path: '/'
          };
      });
      await context.addCookies(cookiesArr);
  }

  const page = await context.newPage();

  for (const item of assetItems) {
      const assetId = item.assetId;
      try {
          logger.info(`Checking Asset ID: ${assetId} at URL: ${item.url} ...`);
          await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(1500); // Give SvelteKit a moment to render
          
          const playstyles = await page.evaluate(() => {
              // Only use FC 25 Selectors to ensure we do not mix old traits with playstyles
              // Foolproof SvelteKit Playstyle Extraction
              const playstyleImages = document.querySelectorAll('img[src*="playstyle_"]');
              if (playstyleImages.length > 0) {
                  return Array.from(playstyleImages).map(imgEl => {
                      const container = imgEl.closest('.group') || imgEl.parentElement?.parentElement;
                      if (!container) return null;
                      
                      const nameEl = container.querySelector('.text-sm, .font-semibold');
                      const descEl = container.querySelector('.text-xs, .text-muted-foreground');
                      const levelEl = container.querySelector('.bg-primary\\/15, .text-\\[10px\\]');
                      
                      const src = imgEl.getAttribute('src') || '';
                      if (!src.includes('playstyle_') && !src.includes('traitlogo_')) return null;
                      
                      let level = 1;
                      if (levelEl?.textContent?.includes('2') || src.includes('GOLD')) level = 2;
                      
                      // Do not return raw trait_name_X as they are mixed
                      if (src.includes('traitlogo_')) return null;

                      const extractedName = nameEl?.textContent?.trim() || 'Unknown';
                      
                      // Strictly block invalid names so they NEVER enter the DB
                      if (extractedName.toLowerCase() === 'unknown' || extractedName.toLowerCase() === 'none') {
                          return null;
                      }

                      return {
                          name: extractedName,
                          description: descEl?.textContent?.trim() || '',
                          level,
                          icon: src
                      };
                  }).filter(Boolean);
              }
              
              return [];
          });

          if (playstyles && playstyles.length > 0) {
              for (let i = 0; i < playstyles.length; i++) {
                  const ps = playstyles[i];
                  if (!ps) continue;
                  let parsedLevel = 1;
                  if (playstyles.length === 2) {
                      parsedLevel = i === 0 ? 2 : 1;
                  } else {
                      if (ps.icon?.includes('GOLD')) parsedLevel = 2;
                  }
                  
                  const numLevel = typeof ps.level === 'number' ? ps.level : parsedLevel;
                  await pool.query(`
                      INSERT INTO playstyles_catalog (name, description, icon_level_1, icon_level_2)
                      VALUES ($1, $2, $3, $4)
                      ON CONFLICT (name) DO UPDATE SET
                          description = COALESCE(EXCLUDED.description, playstyles_catalog.description),
                          icon_level_1 = COALESCE(EXCLUDED.icon_level_1, playstyles_catalog.icon_level_1),
                          icon_level_2 = COALESCE(EXCLUDED.icon_level_2, playstyles_catalog.icon_level_2)
                  `, [ps.name, ps.description || null, numLevel === 1 ? ps.icon : null, numLevel === 2 ? ps.icon : null]);
              }

              // Before inserting, delete all existing playstyles for this player to prevent stale data
              await pool.query(`DELETE FROM player_playstyles WHERE player_id = $1`, [assetId]);

              for (let i = 0; i < playstyles.length; i++) {
                  const ps = playstyles[i];
                  if (!ps) continue;
                  let parsedLevel = 1;
                  if (playstyles.length === 2) {
                      parsedLevel = i === 0 ? 2 : 1;
                  } else {
                      if (ps.icon?.includes('GOLD')) parsedLevel = 2;
                  }
                  const numLevel = typeof ps.level === 'number' ? ps.level : parsedLevel;
                  
                  await pool.query(`
                      INSERT INTO player_playstyles (player_id, playstyle_name, level)
                      VALUES ($1, $2, $3)
                  `, [assetId, ps.name, numLevel]);
              }
              logger.info(`   ✅ Playstyles Updated for ${assetId}`);
          } else {
              // Mark as checked to prevent infinite loops (by inserting a dummy playstyle or we just let it be)
              // We'll insert a "None" record so we don't check it again.
              await pool.query(`INSERT INTO playstyles_catalog (name) VALUES ('None') ON CONFLICT DO NOTHING`);
              await pool.query(`INSERT INTO player_playstyles (player_id, playstyle_name, level) VALUES ($1, 'None', 1) ON CONFLICT DO NOTHING`, [assetId]);
              logger.info(`   ℹ️ No playstyles found for ${assetId}`);
          }

      } catch (error: any) {
          logger.error(`   ❌ Error processing ${assetId}: ${error.message}`);
      }
  }

  await browser.close();
  await pool.end();
  logger.info('\n✨ PLAYSTYLES SYNC COMPLETE!\n');
}

run().catch(console.error);
