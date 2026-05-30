import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';
import { RENDERZ_DICTIONARY } from '../utils/renderzDictionary';

chromium.use(stealthPlugin());

const DICT_PATH = path.join(__dirname, '../utils/renderzDictionary.ts');

async function extractSkillNamesFromUI() {
  logger.info('🚀 Starting Skill Name Extraction from UI Filters...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const skillMapping: Record<string, string> = {};

  try {
    // 1. Navigate to players page
    await page.goto('https://renderz.app/24/players', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(5000);

    // 2. Open Filters
    logger.info('Opening Filters menu...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const filterBtn = buttons.find(b => b.innerText.includes('Filters'));
        if (filterBtn) filterBtn.click();
    });
    await page.waitForTimeout(2000);

    // 3. Click Skills category
    logger.info('Selecting Skills category...');
    const skillsTab = page.locator('button:has-text("skills")');
    await skillsTab.click();
    await page.waitForTimeout(2000);

    // 4. Extract all skills
    logger.info('Scanning skills list...');

    // Scroll to the very bottom first to load everything
    const containerSelector = 'div.overflow-auto:has(p.truncate)';
    await page.evaluate((sel) => {
        const container = document.querySelector(sel);
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }, containerSelector);
    await page.waitForTimeout(2000);

    const skillButtons = page.locator('button:has(p.truncate)');
    const count = await skillButtons.count();
    logger.info(`Total skills found in UI: ${count}`);

    for (let i = 0; i < count; i++) {
        const btn = skillButtons.nth(i);
        const name = await btn.locator('p').innerText();
        
        try {
            // Use evaluate to click and get URL immediately to avoid locator issues
            const id = await page.evaluate(async (index) => {
                const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.querySelector('p.truncate'));
                const target = buttons[index];
                if (!target) return null;
                
                target.scrollIntoView();
                (target as HTMLElement).click();
                
                // Wait for URL change
                await new Promise(r => setTimeout(r, 200));
                const url = window.location.href;
                const match = url.match(/skills=%5B%22(\d+)%22%5D/);
                
                // Unclick
                (target as HTMLElement).click();
                await new Promise(r => setTimeout(r, 100));
                
                return match ? match[1] : null;
            }, i);

            if (id) {
                skillMapping[`NAME_SKILL_${id}`] = name;
                logger.info(`[${i+1}/${count}] Mapped: ${id} -> ${name}`);
            }
        } catch (e: any) {
            logger.warn(`Error on skill ${i}: ${e.message}`);
        }
    }

    // 5. Merge and Save
    const merged = { ...RENDERZ_DICTIONARY, ...skillMapping };
    const tsCode = `// Auto-generated mapping file. Do not edit manually.\nexport const RENDERZ_DICTIONARY: Record<string, string> = ${JSON.stringify(merged, null, 2)};\n`;
    fs.writeFileSync(DICT_PATH, tsCode, 'utf8');
    logger.info(`🏁 DONE! Added/Updated mappings. Total: ${Object.keys(merged).length}`);

  } catch (error: any) {
    logger.error(`Fatal UI extraction error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

extractSkillNamesFromUI();
