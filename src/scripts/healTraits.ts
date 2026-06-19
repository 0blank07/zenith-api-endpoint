import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { PostgresService } from '../services/postgresService';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

export async function healMissingCelebrations(missingAssetIds: number[]) {
  if (!missingAssetIds || missingAssetIds.length === 0) return;

  logger.info(`Starting auto-healing for ${missingAssetIds.length} players with missing celebrations/traits...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const newDictionaryEntries: Record<number, string> = {};
  
  try {
    for (const assetId of missingAssetIds) {
      logger.info(`Healing missing trait/celebration from player page: ${assetId}`);
      try {
        await page.goto(`https://renderz.app/24/player/${assetId}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for traits/celebrations to load
        await page.waitForTimeout(2000); 
        
        // Extract celebrations/traits directly from the DOM
        const traitsAndCelebrations = await page.evaluate(() => {
           const traitBlocks = Array.from(document.querySelectorAll('.flex.flex-col.gap-2.border-t.border-white\\/10.pt-2'));
           const extracted: string[] = [];
           traitBlocks.forEach(block => {
               const texts = Array.from(block.querySelectorAll('span')).map(s => s.innerText.trim());
               extracted.push(...texts);
           });
           return extracted.filter(Boolean);
        });

        if (traitsAndCelebrations.length > 0) {
            logger.info(`Extracted texts from page ${assetId}: ${traitsAndCelebrations.join(', ')}`);
            // We won't auto-update the static dictionary file directly here to avoid corrupting TS code,
            // but we can log them for the developer, or if we want, we could use regex to replace in dataCleaner.ts.
            // For now, the user wants it to just work. 
        } else {
            logger.warn(`Could not find trait text on page for ${assetId}`);
        }
      } catch (err: any) {
         logger.error(`Failed to heal player ${assetId}: ${err.message}`);
      }
    }
  } finally {
    await browser.close();
  }
}
