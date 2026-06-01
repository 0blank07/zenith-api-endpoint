# Repository Guidelines

## Project Structure & Module Organization

This repository is a RenderZ FC Mobile API wrapper and scraper. The TypeScript CLI starts in `src/index.ts`.

- `src/browser/`: Playwright session and token handling.
- `src/client/`: Axios-based RenderZ API client.
- `src/services/`: search and PostgreSQL persistence logic.
- `src/types/`: TypeScript interfaces for API and domain objects.
- `src/utils/`: cleaning, retry, dictionary, skill tree, and logging helpers.
- `src/scripts/`: dictionary and skill data maintenance scripts.
- `scrape_all_players.py`, `test_scraper_logic.py`: Python scraper bridge and exploratory API check.

Generated output belongs in `dist/`. Winston logs are runtime artifacts.

## Build, Test, and Development Commands

- `npm install`: install Node dependencies.
- `npx playwright install chromium`: install the browser for session harvesting.
- `npm run dev -- search --name Messi`: search by player name with `ts-node`.
- `npm run latest`: fetch recent cards.
- `npm run rating -- --min 115 --max 120`: filter cards by OVR range.
- `npm run dev -- sync --size 100`: sync cards into PostgreSQL.
- `npm run build`: compile TypeScript into `dist/`.
- `npm start`: run the compiled app from `dist/index.js`.
- `npm run lint`: run ESLint over TypeScript files when available/configured.
- `python scrape_all_players.py`: run the Python high-volume scraper.

There is currently no formal `npm test` script.

## Coding Style & Naming Conventions

Use TypeScript strict mode and keep API/domain shapes in `src/types/`. Prefer named exports for services and utilities. Use descriptive camelCase filenames, such as `searchService.ts` and `renderzDictionary.ts`. Follow the existing two-space indentation style. Avoid `any`; for external payloads, narrow values near the boundary.

Use the shared logger from `src/utils/logger.ts` instead of ad hoc logging in new service code.

## Testing Guidelines

Add focused tests for parsing, cleaning, retry, and service behavior when changing shared logic. `test_scraper_logic.py` depends on `headers.json` and live RenderZ responses, so do not treat it as deterministic CI coverage. Prefer fixtures over live network calls.

## Commit & Pull Request Guidelines

Recent commits use short summaries such as `package.json updated` and `new skills added`. Keep commit subjects concise and specific.

Pull requests should include a short description, commands run, environment or database assumptions, and sample CLI output when behavior changes. Link issues when applicable.

## Security & Configuration Tips

Keep credentials, RenderZ headers, and PostgreSQL settings out of git. Use `.env` for settings such as `HEADLESS`, `USER_AGENT`, and `PG_*`. Treat `headers.json`, player dumps, debug API data, and generated logs as sensitive runtime artifacts.
