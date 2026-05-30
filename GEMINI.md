# RenderZ FC Mobile API Wrapper & Scraper

A hybrid TypeScript/Python toolset designed for extracting, searching, and monitoring FC Mobile player data from the RenderZ platform. This project combines browser automation (to bypass Cloudflare) with high-speed API interaction and a robust data pipeline.

## Project Overview

*   **Purpose**: To provide a reliable way to access FC Mobile player data, stats, and card assets from RenderZ.
*   **Core Architecture**:
    *   **TypeScript Engine**: The backbone of the project, handling session management, API interaction (via Axios), and CLI features.
    *   **Browser Automation**: Uses Playwright with stealth plugins to harvest security tokens (`x-secure-token`, `x-client-fingerprint`) from the RenderZ website.
    *   **Service Layer**: Modular services for searching (Elasticsearch queries), database interaction (PostgreSQL), and data cleaning.
    *   **Bridge Scraper**: A Python script (`scrape_all_players.py`) that leverages the TypeScript engine to perform high-speed, exhaustive data collection and persistence.

## Key Technologies

*   **Node.js/TypeScript**: Main application logic and CLI.
*   **Playwright (playwright-extra)**: Browser automation with stealth for Cloudflare bypass.
*   **Axios**: API client with automatic token rotation and interceptors.
*   **PostgreSQL**: Target database for player data storage and monitoring.
*   **Commander.js**: Powering the Node-based CLI.
*   **Python**: Used for high-speed scraping and data processing bridge.
*   **Elasticsearch (RenderZ Backend)**: The primary source of data.

## Building and Running

### Prerequisites
*   Node.js (v18+)
*   Python (v3.9+)
*   PostgreSQL (optional, for syncing)
*   Playwright Browsers: `npx playwright install chromium`

### Key Commands (Node.js)
*   `npm install`: Install dependencies.
*   `npm run build`: Compile TypeScript to JavaScript.
*   `npm run dev -- <command>`: Run the CLI directly via `ts-node`.
*   `npm run search -- --name Messi`: Search for players by name.
*   `npm run latest`: Get the most recently added cards.
*   `npm run rating -- --min 115 --max 120`: Filter by OVR rating.
*   `npm run sync -- --size 100`: Sync latest cards to PostgreSQL.

### Key Commands (Python)
*   `python scrape_all_players.py`: Run the high-speed bridge scraper to populate the database.

## Development Conventions

*   **Environment Configuration**: All sensitive data (DB credentials, API settings) must be managed via `.env`. See `.env.example`.
*   **Type Safety**: Every API response and domain object is strictly typed in `src/types/`. Avoid `any` at all costs.
*   **Resiliency**:
    *   The project uses **Integrated Browser Search (IBS)** as a fallback. If standard API calls are blocked by Cloudflare (403), the `SearchService` automatically falls back to fetching via an automated browser instance.
    *   Exponential backoff is implemented for retries.
*   **Logging**: Use the Winston-based logger in `src/utils/logger.ts`. Logs are stored in `combined.log` and `error.log`.
*   **Modular Services**: Keep business logic (searching, DB) inside `src/services/` and utility logic in `src/utils/`.

## Directory Structure

*   `src/browser/`: Browser automation and session/token management.
*   `src/client/`: The hardened Axios-based API client.
*   `src/services/`: Core logic for data retrieval and persistence.
*   `src/types/`: TypeScript interfaces mirroring the RenderZ API schema.
*   `src/utils/`: Data cleaning, formatting, and logging helpers.
*   `scrape_all_players.py`: The Python-based high-volume scraper.
