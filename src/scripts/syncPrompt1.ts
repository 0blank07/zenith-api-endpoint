import 'dotenv/config';
import fs from 'fs';
import { PostgresService } from '../services/postgresService';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;

  // Read prompt-1.md and extract IDs
  const fileContent = fs.readFileSync('prompt-1.md', 'utf8');
  const assetIds = fileContent
    .split('\n')
    .map(line => {
      const match = line.match(/\/player\/(\d+)/);
      return match ? Number(match[1]) : null;
    })
    .filter(id => id !== null) as number[];

  logger.info(`Found ${assetIds.length} players from prompt-1.md. Starting sync...`);
  
  if (assetIds.length === 0) {
      await pool.end();
      return;
  }

  const { SessionManager } = require('../browser/sessionManager');
  const sessionManager = new SessionManager();
  const session = await sessionManager.getSession();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
      userAgent: session.userAgent
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

  for (const assetId of assetIds) {
      try {
          logger.info(`🔍 Checking Asset ID: ${assetId} ...`);
          const url = `https://renderz.app/24/player/${assetId}`;
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
          
          const playstyles = await page.evaluate(() => {
              const container = document.querySelector('.flex.gap-2.w-full.flex-wrap.justify-center.pb-4') || 
                                document.querySelector('.flex.gap-2.w-full.flex-wrap.justify-center');
              if (!container) return [];
              return Array.from(container.querySelectorAll(':scope > div'))
                  .map(card => {
                      const img = card.querySelector('img');
                      const src = img?.getAttribute('src') || '';
                      if (!src.includes('playstyle_')) return null;
                      const text = card.textContent?.replace(/\s+/g, ' ').trim() || '';
                      return { name: text, icon: src };
                  })
                  .filter(Boolean);
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
                  
                  await pool.query(`
                      INSERT INTO playstyles_catalog (name, icon_level_1, icon_level_2)
                      VALUES ($1, $2, $3)
                      ON CONFLICT (name) DO UPDATE SET
                          icon_level_1 = COALESCE(EXCLUDED.icon_level_1, playstyles_catalog.icon_level_1),
                          icon_level_2 = COALESCE(EXCLUDED.icon_level_2, playstyles_catalog.icon_level_2)
                  `, [ps.name, parsedLevel === 1 ? ps.icon : null, parsedLevel === 2 ? ps.icon : null]);

                  await pool.query(`
                      INSERT INTO player_playstyles (player_id, playstyle_name, level)
                      VALUES ($1, $2, $3)
                      ON CONFLICT (player_id, playstyle_name) DO UPDATE SET
                          level = EXCLUDED.level
                  `, [assetId, ps.name, parsedLevel]);
              }
              logger.info(`   ✅ Playstyles Updated for ${assetId}`);
          } else {
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
  logger.info('\n✨ PROMPT SYNC COMPLETE!\n');
}

run().catch(console.error);
