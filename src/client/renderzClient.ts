import axios, { AxiosInstance, AxiosResponse } from 'axios';
import fs from 'fs';
import logger from '../utils/logger';
import { SessionManager } from '../browser/sessionManager';
import { CONSTANTS } from '../config/constants';
import { withRetry } from '../utils/retry';

export class RenderzClient {
  private axiosInstance: AxiosInstance;
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = new SessionManager();
    this.axiosInstance = axios.create({
      baseURL: CONSTANTS.BASE_URL,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      const session = await this.sessionManager.getSession();
      
      config.headers['x-secure-token'] = session.token;
      config.headers['x-client-fingerprint'] = session.fingerprint;
      config.headers['cookie'] = session.cookies;
      config.headers['user-agent'] = session.userAgent;
      
      // Modern Chromium headers to match Playwright footprint
      config.headers['sec-ch-ua'] = '"Chromium";v="145", "Not:A-Brand";v="99"';
      config.headers['sec-ch-ua-mobile'] = '?0';
      config.headers['sec-ch-ua-platform'] = '"Windows"';
      
      config.headers['content-type'] = 'application/json';
      config.headers['referer'] = `${CONSTANTS.BASE_URL}/24/players`;
      config.headers['origin'] = CONSTANTS.BASE_URL;

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        // CAPTURE TOKEN ROTATION
        const nextToken = response.headers['x-secure-token'];
        if (nextToken) {
          logger.debug('Captured rotated x-secure-token from response');
          this.updateCachedToken(nextToken);
        }
        return response;
      },
      async (error) => {
        // If we get a security block, just throw and let SearchService handle the fallback
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          throw new Error('SESSION_BLOCKED');
        }
        return Promise.reject(error);
      }
    );
  }

  private updateCachedToken(token: string) {
    const cachePath = process.env.SESSION_CACHE_PATH || './.session-cache.json';
    if (fs.existsSync(cachePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        data.token = token;
        fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
      } catch (e) {}
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    return await withRetry(async () => {
      logger.debug(`POST request to ${url}`, { payload: data });
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data);
      return response.data;
    }, CONSTANTS.RETRY_ATTEMPTS, CONSTANTS.RETRY_DELAY);
  }
}
