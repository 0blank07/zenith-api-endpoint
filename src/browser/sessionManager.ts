import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'playwright';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';
import { CONSTANTS } from '../config/constants';
import { SessionData } from '../types/session';

chromium.use(stealthPlugin());

export class SessionManager {
  private cachePath: string;

  constructor() {
    this.cachePath = process.env.SESSION_CACHE_PATH || './.session-cache.json';
  }

  async getSession(forceRefresh: boolean = false): Promise<SessionData> {
    if (!forceRefresh && this.isCacheValid()) {
      logger.info('Using cached session data');
      return JSON.parse(fs.readFileSync(this.cachePath, 'utf-8'));
    }

    logger.info('Refreshing session via Playwright...');
    return await this.refreshSession();
  }

  private isCacheValid(): boolean {
    if (!fs.existsSync(this.cachePath)) return false;
    try {
      const data: SessionData = JSON.parse(fs.readFileSync(this.cachePath, 'utf-8'));
      return Date.now() < data.expiresAt;
    } catch {
      return false;
    }
  }

  private async refreshSession(): Promise<SessionData> {
    const browser: Browser = await chromium.launch({
      headless: process.env.HEADLESS !== 'false',
    });

    const context = await browser.newContext({
      userAgent: process.env.USER_AGENT || CONSTANTS.DEFAULT_USER_AGENT,
    });

    // Apply stealth
    // await stealth(context); // Fixed: stealth is not a function in some versions or needs different usage
    
    const page: Page = await context.newPage();

    let sessionData: Partial<SessionData> = {
      userAgent: process.env.USER_AGENT || CONSTANTS.DEFAULT_USER_AGENT,
    };

    try {
      // Intercept ALL requests to find the tokens
      page.on('request', (request) => {
        const headers = request.headers();
        const url = request.url();
        if (headers['x-secure-token']) {
          sessionData.token = headers['x-secure-token'];
          logger.info(`Captured x-secure-token (REQ) from ${url}`);
        }
        if (headers['x-client-fingerprint']) {
          sessionData.fingerprint = headers['x-client-fingerprint'];
          logger.info(`Captured x-client-fingerprint (REQ) from ${url}`);
        }
        if (headers['x-code']) {
          (sessionData as any).xCode = headers['x-code'];
          logger.info(`Captured x-code (REQ) from ${url}`);
        }
      });

      page.on('response', (response) => {
        const headers = response.headers();
        const url = response.url();
        if (headers['x-secure-token']) {
          sessionData.token = headers['x-secure-token'];
          logger.info(`Captured x-secure-token (RES) from ${url}`);
        }
      });

      // The live app uses season-specific URLs like /24/players or /25/players
      logger.info(`Navigating to ${CONSTANTS.BASE_URL}/24/players ...`);
      await page.goto(`${CONSTANTS.BASE_URL}/24/players`, { waitUntil: 'commit', timeout: 60000 });
      
      await page.waitForTimeout(3000);

      // Dismiss "Mobile App Prompt" if it appears
      const continueBtn = page.locator('button:has-text("Continue")');
      if (await continueBtn.isVisible()) {
        logger.info('Dismissing Mobile App Prompt...');
        await continueBtn.click().catch(() => {});
        await page.waitForTimeout(1000);
      }

      // Look for the "Players" link just in case
      const playersLink = page.locator('a:has-text("Players")').first();
      if (await playersLink.isVisible()) {
        await playersLink.click().catch(() => {});
        await page.waitForTimeout(2000);
      }

      // TRIGGER SEARCH OVERLAY
      logger.info('Triggering search overlay...');
      // Try multiple ways to find the search button
      const searchToggle = page.locator('header button').filter({ has: page.locator('img, svg') }).first();
      if (await searchToggle.isVisible()) {
        await searchToggle.click({ force: true });
        await page.waitForTimeout(2000);
      } else {
        logger.warn('Search toggle not visible in header, trying alternate buttons...');
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const b = btns.find(x => x.innerHTML.includes('svg') || x.innerHTML.includes('img'));
          if (b) b.click();
        });
        await page.waitForTimeout(2000);
      }

      // TYPE DUMMY QUERY
      const input = page.locator('input[placeholder*="Search"]').first();
      if (await input.isVisible()) {
        logger.info('Input found. Typing dummy query...');
        await input.fill('Messi');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
      } else {
        logger.warn('Search input not found or not visible. Forcing API call via fetch...');
        // Force an API call in the browser context to trigger the token interceptors
        await page.evaluate(async () => {
            try {
                await fetch('https://renderz.app/api/search/elasticsearch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: { bool: { must: [] } }, size: 1 })
                });
            } catch (e) {
                // Ignore fetch errors, we just want the interceptor to catch the headers
            }
        });
        await page.waitForTimeout(3000);
      }

      // Final Check & LocalStorage Fallback
      let waitTime = 0;
      while (waitTime < 10000 && (!sessionData.token || !sessionData.fingerprint)) {
        // Try to pull from localStorage if request interception is slow/fails
        const ls = await page.evaluate(() => ({
          t: localStorage.getItem('token'),
          f: localStorage.getItem('fingerprint')
        })).catch(() => ({ t: null, f: null }));

        if (ls.t) sessionData.token = ls.t;
        if (ls.f) sessionData.fingerprint = ls.f;

        if (sessionData.token && sessionData.fingerprint) break;

        await page.waitForTimeout(1000);
        waitTime += 1000;
      }

      const cookies = await context.cookies();
      sessionData.cookies = cookies.map(c => `${c.name}=${c.value}`).join('; ');
      sessionData.expiresAt = Date.now() + CONSTANTS.SESSION_TIMEOUT;

      if (!sessionData.token || !sessionData.fingerprint) {
        throw new Error('Failed to extract security tokens from request headers');
      }

      const finalSession = sessionData as SessionData;
      fs.writeFileSync(this.cachePath, JSON.stringify(finalSession, null, 2));
      
      return finalSession;
    } finally {
      await browser.close();
    }
  }
}
