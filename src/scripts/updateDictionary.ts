import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { RENDERZ_DICTIONARY } from '../utils/renderzDictionary';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

const DICT_PATH = path.join(__dirname, '../utils/renderzDictionary.ts');

async function updateDictionary() {
  logger.info('Launching headless browser to extract RenderZ bundles...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Visit page
    await page.goto('https://renderz.app/24/players', { waitUntil: 'domcontentloaded' });
    
    // 2. Extract all module/script URLs
    const jsUrls = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]')).map((s: any) => s.src);
      const preloads = Array.from(document.querySelectorAll('link[rel="modulepreload"]')).map((l: any) => l.href);
      return [...new Set([...scripts, ...preloads])].filter(url => url && url.includes('.js'));
    });

    logger.info(`Found ${jsUrls.length} JavaScript bundles. Downloading & parsing...`);
    
    let giantJs = '';
    for (const url of jsUrls) {
      try {
        const jsRes = await axios.get(url);
        giantJs += jsRes.data + '\n';
      } catch (e) {
        // Skip inaccessible/external scripts gracefully
      }
    }

    // 3. Extract mappings
    const extracted: Record<string, string> = {};
    const mapRegex = /(NAME_SKILL_\d+|skillmove_name_\d+|trait_name_\d+):([a-zA-Z0-9_$]+)/g;
    let match;
    let newItemsCount = 0;

    while ((match = mapRegex.exec(giantJs)) !== null) {
      const key = match[1];
      const dispatcherVar = match[2];
      
      const dispatcherEscaped = dispatcherVar.replace(/\$/g, '\\$');
      const dispatchRegex = new RegExp(dispatcherEscaped + '\\s*=\\s*\\(.*?r==="en-US"\\?([a-zA-Z0-9_$]+)\\(\\):');
      const dispatchMatch = dispatchRegex.exec(giantJs);
      
      if (dispatchMatch) {
         const engFunc = dispatchMatch[1];
         const strRegex = new RegExp(engFunc + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
         const strMatch = strRegex.exec(giantJs);
         if (strMatch) {
            extracted[key] = strMatch[1];
         }
      } else {
         const directRegex = new RegExp(dispatcherEscaped + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
         const directMatch = directRegex.exec(giantJs);
         if (directMatch) {
             extracted[key] = directMatch[1];
         }
      }
    }

    // 4. Merge with existing dictionary
    const merged = { ...RENDERZ_DICTIONARY };
    
    for (const [key, val] of Object.entries(extracted)) {
        if (!merged[key] || merged[key] !== val) {
            merged[key] = val;
            newItemsCount++;
        }
    }

    if (newItemsCount > 0) {
        // 5. Write back to TypeScript file
        const tsCode = `// Auto-generated mapping file. Do not edit manually.\nexport const RENDERZ_DICTIONARY: Record<string, string> = ${JSON.stringify(merged, null, 2)};\n`;
        fs.writeFileSync(DICT_PATH, tsCode, 'utf8');
        logger.info(`Successfully updated dictionary! Added/Modified ${newItemsCount} skills. Total skills: ${Object.keys(merged).length}.`);
    } else {
        logger.info('Dictionary is already up-to-date. No new skills found.');
    }

  } catch (error: any) {
    logger.error(`Failed to update dictionary: ${error.message}`);
  } finally {
    await browser.close();
  }
}

updateDictionary();
