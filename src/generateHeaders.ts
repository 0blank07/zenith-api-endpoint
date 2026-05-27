import { SessionManager } from './browser/sessionManager';
import fs from 'fs';
import logger from './utils/logger';

async function generateHeaders() {
  const sm = new SessionManager();
  try {
    logger.info('Generating fresh headers for Python script...');
    const session = await sm.getSession(true);
    
    const headers = {
      "User-Agent": session.userAgent,
      "x-secure-token": session.token,
      "x-client-fingerprint": session.fingerprint,
      "x-code": (session as any).xCode || "",
      "cookie": session.cookies,
      "Content-Type": "application/json",
      "Origin": "https://renderz.app",
      "Referer": "https://renderz.app/24/players",
      "sec-ch-ua": '"Chromium";v="120", "Google Chrome";v="120", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9"
    };

    fs.writeFileSync('headers.json', JSON.stringify(headers, null, 2));
    logger.info('Successfully saved fresh headers to headers.json');
  } catch (error: any) {
    logger.error(`Failed to generate headers: ${error.message}`);
  }
}

generateHeaders();
