import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

const CLEANER_PATH = path.join(__dirname, '../utils/dataCleaner.ts');

export async function healMissingCelebrations(missingCelebrations: { assetId: number; celebrationId: number }[]) {
    if (!missingCelebrations || missingCelebrations.length === 0) return;

    // Deduplicate by celebrationId
    const unique = Array.from(new Map(missingCelebrations.map(item => [item.celebrationId, item])).values());

    logger.info(`\n🛠️  Self-Healing Triggered: Found ${unique.length} missing celebration(s). Firing up UI scraper...`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let newMappings: Record<number, string> = {};

    try {
        for (const item of unique) {
            logger.info(`Extracting Celebration ID ${item.celebrationId} from Player Asset ID ${item.assetId}...`);
            try {
                await page.goto(`https://renderz.app/24/player/${item.assetId}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

                // Scroll to ensure traits are rendered
                await page.evaluate(() => window.scrollBy(0, 1000));
                await page.waitForTimeout(1000);
                await page.evaluate(() => window.scrollBy(0, 1000));
                await page.waitForTimeout(1000);

                const name = await page.evaluate((celebId) => {
                    // Look for the specific image url
                    const targetImgSrc = `celebrationlogo_23_${celebId}`;
                    const imgs = Array.from(document.querySelectorAll('img')).filter(img => img.src && img.src.includes('celebrationlogo'));
                    
                    // Since the URL might have `0` but the mapping is correct, just get ALL celebration names 
                    // from the UI. The easiest way is to look at the grid
                    const h3s = Array.from(document.querySelectorAll('h3, h2, h4, div'));
                    const traitsSection = h3s.find(el => el.textContent && el.textContent.toLowerCase().includes('traits'));
                    
                    if (!traitsSection) return null;
                    
                    let container = traitsSection;
                    for (let i=0; i<3; i++) {
                        if (container.parentElement) container = container.parentElement;
                    }

                    // Inside this container, find the grid items
                    const grid = container.querySelector('.grid-auto-rows.grid');
                    if (grid) {
                        const items = Array.from(grid.children);
                        for (const el of items) {
                            const img = el.querySelector('img');
                            if (img && img.src.includes('celebrationlogo')) {
                                const text = el.textContent?.trim();
                                if (text) return text;
                            }
                        }
                    }
                    return null;
                }, item.celebrationId);

                if (name) {
                    newMappings[item.celebrationId] = name;
                    logger.info(`✅ Successfully scraped celebration: ${name} (ID: ${item.celebrationId})`);
                } else {
                    logger.warn(`⚠️ Could not find celebration name on UI for Player Asset ID ${item.assetId}. Saving as generic to prevent infinite retries.`);
                    newMappings[item.celebrationId] = `Celebration ${item.celebrationId}`;
                }
            } catch (err: any) {
                logger.error(`❌ Error scraping Player Asset ID ${item.assetId}: ${err.message}`);
            }
        }

        if (Object.keys(newMappings).length > 0) {
            logger.info(`💾 Saving ${Object.keys(newMappings).length} new celebration(s) to dataCleaner.ts...`);
            
            let cleanerContent = fs.readFileSync(CLEANER_PATH, 'utf8');
            
            // Find the CELEBRATIONS object block
            const blockRegex = /const CELEBRATIONS: Record<number, string> = \{([\s\S]*?)\};/;
            const match = cleanerContent.match(blockRegex);
            
            if (match) {
                const currentBlock = match[1];
                let injectedBlock = currentBlock;
                
                for (const [id, name] of Object.entries(newMappings)) {
                    // Check if it already exists to avoid duplicates
                    if (!new RegExp(`^\\s*${id}:`, 'm').test(currentBlock)) {
                        // Insert at the top of the block to avoid trailing comment syntax errors
                        injectedBlock = `\n  ${id}: '${name.replace(/'/g, "\\'")}',` + injectedBlock;
                    }
                }
                
                cleanerContent = cleanerContent.replace(blockRegex, `const CELEBRATIONS: Record<number, string> = {${injectedBlock}};`);
                fs.writeFileSync(CLEANER_PATH, cleanerContent, 'utf8');
                logger.info(`✨ Celebration Self-Healing Complete!`);
            } else {
                 logger.error('Could not locate CELEBRATIONS block in dataCleaner.ts');
            }
        }

    } catch (error: any) {
        logger.error(`Fatal Self-Healing Error: ${error.message}`);
    } finally {
        await browser.close();
    }
}
