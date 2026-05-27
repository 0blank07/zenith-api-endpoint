# RenderZ FC Mobile API Wrapper & Scraper

A production-ready Node.js/TypeScript toolset for extracting, searching, and monitoring FC Mobile player data from the RenderZ Elasticsearch backend.

## Features

- **Automated Authentication**: Uses Playwright to bypass Cloudflare and harvest `x-secure-token` and `x-client-fingerprint`.
- **Resilient API Client**: Axios wrapper with automatic token refresh, response interceptors, and exponential backoff retries.
- **Strict Typing**: Full TypeScript interfaces for players, stats, and Elasticsearch payloads.
- **Modular Architecture**: Clean separation between browser automation, API logic, and domain services.
- **CLI Interface**: Powerful command-line tool for searching, filtering, and exporting data.
- **Caching**: Local session caching to minimize browser launches.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` to adjust settings like `HEADLESS` mode or `USER_AGENT`.*

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install chromium
   ```

4. **Build Project**:
   ```bash
   npm run build
   ```

## Usage

### Search by Name
```bash
npm run search -- --name Messi
```

### Get Latest Added Cards
```bash
npm run latest
```

### Filter by Rating
```bash
npm run rating -- --min 115 --max 120
```

### Export to JSON
```bash
npm run export -- --name Ronaldo --output ronaldos.json
```

### Sync to PostgreSQL
```bash
# Ensure PG_* variables are set in .env
npm run dev sync -- --size 100
```

## Production Deployment Advice

- **Headless Mode**: Ensure `HEADLESS=true` in your `.env` for server environments.
- **Proxy Support**: If running at scale, consider adding proxy support to `SessionManager.ts` to rotate IPs and avoid Cloudflare rate limiting.
- **Token Rotation**: The system handles token rotation automatically. If you notice a high frequency of refreshes, increase `SESSION_TIMEOUT` in `constants.ts`.
- **Database Integration**: For long-term monitoring, hook `SearchService` into MongoDB or PostgreSQL within `src/index.ts`.

## Advanced: Reverse Engineering & Scaling

### Hidden Fields Discovery
The `Player` interface in `src/types/player.ts` covers 90% of the visible data. To discover hidden fields:
1. Set `LOG_LEVEL=debug` in `.env`.
2. Inspect the raw responses logged in `combined.log`.
3. Update the `_source: []` array in `searchService.ts` to `_source: ["*"]` if the API supports it.

### Handling Cloudflare
If Cloudflare blocking increases:
1. Switch to a more advanced stealth plugin (e.g., `puppeteer-extra-plugin-stealth` adapted for Playwright).
2. Use a residential proxy provider.
3. Ensure your `USER_AGENT` matches the browser used by Playwright exactly.

## License
MIT
