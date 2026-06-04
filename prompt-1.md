
Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (main)
$ npx ts-node src/index.ts sync --missing
2026-06-03T16:49:49.208Z [info]: Assuming PostgreSQL schemas (player_stats, skill_level_boosts, etc.) already exist. 
2026-06-03T16:49:49.214Z [info]: --- RUNNING FULL DISCOVERY SYNC --- 
2026-06-03T16:49:49.216Z [info]: Fetching all Asset IDs from RenderZ (High Speed Scan)... 
2026-06-03T16:49:49.220Z [info]: Using cached session data 
2026-06-03T16:49:51.039Z [warn]: Attempt 1 failed: SESSION_BLOCKED. Retrying in 2000ms... 
2026-06-03T16:49:53.048Z [info]: Using cached session data 
2026-06-03T16:49:53.211Z [warn]: Attempt 2 failed: SESSION_BLOCKED. Retrying in 4000ms... 
2026-06-03T16:49:57.226Z [info]: Using cached session data 
2026-06-03T16:49:57.387Z [warn]: Attempt 3 failed: SESSION_BLOCKED. Retrying in 8000ms... 
2026-06-03T16:49:57.389Z [warn]: Direct scan blocked. Entering Browser-based ID Discovery... 
2026-06-03T16:50:11.351Z [info]: Full Scan Results: RenderZ has 0 players. DB has 50249 players. 
2026-06-03T16:50:11.351Z [info]: Identified 0 missing players. 
2026-06-03T16:50:11.352Z [info]: Database is already perfectly in sync with RenderZ. 

Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (main)
$ 






