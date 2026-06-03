
Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (main)
$ npx ts-node src/index.ts sync --missing
2026-06-03T16:23:56.093Z [info]: Assuming PostgreSQL schemas (player_stats, skill_level_boosts, etc.) already exist. 
2026-06-03T16:23:56.099Z [info]: --- RUNNING FULL DISCOVERY SYNC --- 
2026-06-03T16:23:56.100Z [info]: Fetching all Asset IDs from RenderZ (High Speed Scan)... 
2026-06-03T16:23:56.105Z [info]: Refreshing session via Playwright... 
2026-06-03T16:23:56.773Z [info]: Navigating to https://renderz.app/24/players ... 
2026-06-03T16:24:03.136Z [info]: Waiting for Cloudflare challenge to resolve or page to load... 
2026-06-03T16:24:03.636Z [info]: Captured x-client-fingerprint (REQ) from https://renderz.app/api/secure-token/init 
2026-06-03T16:24:03.636Z [info]: Captured x-code (REQ) from https://renderz.app/api/secure-token/init 
2026-06-03T16:24:03.820Z [info]: Cloudflare challenge passed / Main page loaded. 
2026-06-03T16:24:03.950Z [info]: Captured x-secure-token (REQ) from https://renderz.app/api/search/elasticsearch 
2026-06-03T16:24:03.950Z [info]: Captured x-client-fingerprint (REQ) from https://renderz.app/api/search/elasticsearch 
2026-06-03T16:24:06.847Z [info]: Dismissing Mobile App Prompt... 
2026-06-03T16:24:09.581Z [info]: Captured x-secure-token (RES) from https://renderz.app/api/search/elasticsearch 
2026-06-03T16:24:16.831Z [info]: Attempting to trigger search... 
2026-06-03T16:24:18.401Z [info]: Typed dummy query into DOM. 
2026-06-03T16:24:22.307Z [warn]: Attempt 1 failed: SESSION_BLOCKED. Retrying in 2000ms... 
2026-06-03T16:24:24.312Z [info]: Using cached session data 
2026-06-03T16:24:24.570Z [warn]: Attempt 2 failed: SESSION_BLOCKED. Retrying in 4000ms... 
2026-06-03T16:24:28.585Z [info]: Using cached session data 
2026-06-03T16:24:28.802Z [warn]: Attempt 3 failed: SESSION_BLOCKED. Retrying in 8000ms... 
2026-06-03T16:24:28.802Z [error]: Failed to scan all asset IDs: SESSION_BLOCKED 
2026-06-03T16:24:36.325Z [info]: Full Scan Results: RenderZ has 0 players. DB has 50249 players. 
2026-06-03T16:24:36.326Z [info]: Identified 0 missing players. 
2026-06-03T16:24:36.326Z [info]: Database is already perfectly in sync with RenderZ. 

Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (main)
$ 