import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(stealthPlugin());

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const pid = 4714449; // Mbappe
  console.log(`Visiting player ${pid}...`);
  await page.goto(`https://renderz.app/player/${pid}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  const hasSkillsData = await page.evaluate(() => {
    return document.body.innerHTML.includes('skillsData');
  });
  console.log('Does HTML include skillsData?', hasSkillsData);
  await browser.close();
}

run().catch(console.error);
