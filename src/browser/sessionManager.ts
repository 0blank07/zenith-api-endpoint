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
      await page.goto(`${CONSTANTS.BASE_URL}/24/players`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      // Wait for Cloudflare Turnstile to pass by looking for a known RenderZ UI element
      logger.info('Waiting for Cloudflare challenge to resolve or page to load...');
      try {
          // Wait for either the search input, or the players list to appear, meaning CF is passed
          await page.waitForSelector('input[placeholder*="Search"], a:has-text("Players")', { timeout: 20000 });
          logger.info('Cloudflare challenge passed / Main page loaded.');
      } catch (e) {
          logger.warn('Page did not load recognizable RenderZ elements within 20s. Might be stuck on Cloudflare.');
          // Take a screenshot for debugging if possible
          // await page.screenshot({ path: 'cf_stuck.png' });
      }

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
      logger.info('Attempting to trigger search...');
      try {
        // Find any input on the page and force interaction
        await page.evaluate(() => {
            const inputs = Array.from(document.querySelectorAll('input'));
            if (inputs.length > 0) {
                // Focus the first input, usually the search bar
                inputs[0].focus();
                // If there's a specific search button, click it
                const btns = Array.from(document.querySelectorAll('button'));
                const searchBtn = btns.find(b => b.textContent && b.textContent.toLowerCase().includes('search'));
                if (searchBtn) searchBtn.click();
            }
        });
        
        await page.waitForTimeout(1000);
        await page.keyboard.type('Messi', { delay: 100 });
        await page.keyboard.press('Enter');
        logger.info('Typed dummy query into DOM.');
        await page.waitForTimeout(3000);
      } catch (err) {
        logger.warn('Failed to force interaction via DOM evaluation.');
      }

      // Check LocalStorage / Svelte Fallback just in case they return
      try {
        const ls = await page.evaluate(() => {
          let t = localStorage.getItem('token');
          let f = localStorage.getItem('fingerprint');
          return { t, f };
        });

        if (ls.t && !sessionData.token) sessionData.token = ls.t;
        if (ls.f && !sessionData.fingerprint) sessionData.fingerprint = ls.f;
      } catch (e) {}

      const cookies = await context.cookies();
      sessionData.cookies = cookies.map(c => `${c.name}=${c.value}`).join('; ');
      sessionData.expiresAt = Date.now() + CONSTANTS.SESSION_TIMEOUT;

      // RenderZ no longer requires x-secure-token. Cookies are enough.
      // if (!sessionData.token) {
      //   throw new Error('Failed to extract security tokens from request headers');
      // }

      const finalSession = sessionData as SessionData;
      fs.writeFileSync(this.cachePath, JSON.stringify(finalSession, null, 2));

      return finalSession;
    } finally {
      await browser.close();
    }
  }
}
