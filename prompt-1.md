
Aadar@Blank MINGW64 /c/project-files/zenith-api-endpoint (trait-final-production-2)
$ npm run update-dict && npm run sync -- --missing && python download_images.py && scp -r ./downloaded_images/* blank@157.230.249.27:/var/www/images.zenithfcm.com/ && rm -rf ./downloaded_images/*

> renderz-fc-mobile-api@1.0.0 update-dict
> ts-node src/scripts/updateDictionary.ts

2026-07-21T16:02:40.926Z [info]: Launching headless browser to extract RenderZ bundles... 
2026-07-21T16:02:50.220Z [info]: Found 93 JavaScript bundles. Downloading & parsing... 
2026-07-21T16:03:57.653Z [info]: Successfully updated dictionary! Added/Modified 4 skills. Total skills: 337. 

> renderz-fc-mobile-api@1.0.0 sync
> ts-node src/index.ts sync --missing

2026-07-21T16:04:04.459Z [info]: Assuming PostgreSQL schemas (player_stats, skill_level_boosts, etc.) already exist. 
2026-07-21T16:04:04.469Z [info]: --- RUNNING FULL DISCOVERY SYNC --- 
2026-07-21T16:04:04.481Z [info]: Refreshing session via Playwright... 
2026-07-21T16:04:05.219Z [info]: Navigating to https://renderz.app/24/players ... 
2026-07-21T16:04:05.325Z [info]: Dictionaries loaded: 21 traits, 50 celebrations. 
2026-07-21T16:04:12.267Z [info]: Waiting for Cloudflare challenge to resolve or page to load... 
2026-07-21T16:04:12.341Z [info]: Cloudflare challenge passed / Main page loaded. 
2026-07-21T16:04:17.495Z [info]: Attempting to trigger search... 
2026-07-21T16:04:19.113Z [info]: Typed dummy query into DOM. 
2026-07-21T16:04:27.412Z [info]: Using cached session data 
2026-07-21T16:04:29.024Z [info]: Using cached session data 
2026-07-21T16:04:32.448Z [info]: Using cached session data 
2026-07-21T16:04:34.255Z [info]: Using cached session data 
2026-07-21T16:04:36.056Z [info]: Using cached session data 
2026-07-21T16:04:39.632Z [info]: Using cached session data 
2026-07-21T16:04:42.098Z [info]: Using cached session data 
2026-07-21T16:04:44.698Z [info]: Using cached session data 
2026-07-21T16:04:47.756Z [info]: Using cached session data 
2026-07-21T16:04:49.830Z [info]: Using cached session data 
2026-07-21T16:04:51.433Z [info]: Using cached session data 
2026-07-21T16:04:53.171Z [info]: Using cached session data 
2026-07-21T16:04:54.734Z [info]: Using cached session data 
2026-07-21T16:04:56.191Z [info]: Using cached session data 
2026-07-21T16:04:59.531Z [info]: Using cached session data 
2026-07-21T16:05:01.710Z [info]: Using cached session data 
2026-07-21T16:05:05.054Z [info]: Using cached session data 
2026-07-21T16:05:07.548Z [info]: Using cached session data 
2026-07-21T16:05:09.010Z [info]: Using cached session data 
2026-07-21T16:05:10.678Z [info]: Using cached session data 
2026-07-21T16:05:22.936Z [info]: Using cached session data 
2026-07-21T16:05:30.160Z [info]: Using cached session data 
2026-07-21T16:05:34.648Z [info]: Using cached session data 
2026-07-21T16:05:38.326Z [info]: Using cached session data 
2026-07-21T16:05:43.654Z [info]: Using cached session data 
2026-07-21T16:05:47.515Z [info]: Using cached session data 
2026-07-21T16:05:50.836Z [info]: Using cached session data 
2026-07-21T16:05:54.091Z [info]: Using cached session data 
2026-07-21T16:05:56.075Z [info]: Using cached session data 
2026-07-21T16:05:58.398Z [info]: Using cached session data 
2026-07-21T16:06:02.560Z [info]: Using cached session data 
2026-07-21T16:06:06.882Z [info]: Using cached session data 
2026-07-21T16:06:10.348Z [info]: Using cached session data 
2026-07-21T16:06:15.092Z [info]: Using cached session data 
2026-07-21T16:06:19.920Z [info]: Using cached session data 
2026-07-21T16:06:25.403Z [info]: Using cached session data 
2026-07-21T16:06:31.294Z [info]: Using cached session data 
2026-07-21T16:06:35.502Z [info]: Using cached session data 
2026-07-21T16:06:40.417Z [info]: Using cached session data 
2026-07-21T16:06:44.917Z [info]: Using cached session data 
2026-07-21T16:06:48.730Z [info]: Using cached session data 
2026-07-21T16:06:52.016Z [info]: Using cached session data 
2026-07-21T16:06:55.436Z [info]: Using cached session data 
2026-07-21T16:06:58.951Z [info]: Using cached session data 
2026-07-21T16:07:02.621Z [info]: Using cached session data 
2026-07-21T16:07:06.152Z [info]: Using cached session data 
2026-07-21T16:07:10.470Z [info]: Using cached session data 
2026-07-21T16:07:14.106Z [info]: Using cached session data 
2026-07-21T16:07:16.768Z [info]: Using cached session data 
2026-07-21T16:07:20.354Z [info]: Using cached session data 
2026-07-21T16:07:22.476Z [info]: Using cached session data 
2026-07-21T16:07:24.277Z [info]: Using cached session data 
2026-07-21T16:07:27.840Z [info]: Using cached session data 
2026-07-21T16:07:29.964Z [info]: Using cached session data 
2026-07-21T16:07:31.735Z [info]: Using cached session data 
2026-07-21T16:07:35.896Z [info]: Using cached session data 
2026-07-21T16:07:37.789Z [info]: Using cached session data 
2026-07-21T16:07:41.511Z [info]: Using cached session data 
2026-07-21T16:07:44.016Z [info]: Scan complete. Found 58092 players on RenderZ. 
2026-07-21T16:08:10.342Z [info]: Found 147 missing players. 
2026-07-21T16:08:10.343Z [info]:   -> Capturing sub-batch 1/2 (100 players)... 
2026-07-21T16:08:10.345Z [info]: Using cached session data 
2026-07-21T16:08:14.501Z [info]:   -> Capturing sub-batch 2/2 (47 players)... 
2026-07-21T16:08:14.502Z [info]: Using cached session data 
2026-07-21T16:10:33.833Z [info]: Bulk Sync: Successfully inserted 147 players in a single transaction. 
2026-07-21T16:10:33.837Z [info]: Saved 147 new player IDs to ./new_players_for_playstyles.json. Triggering auto-sync for playstyles... 
2026-07-21T16:23:16.345Z [info]: Disconnected from PostgreSQL 
2026-07-21 21:53:17,440 [INFO] ======================================================================
2026-07-21 21:53:17,440 [INFO] ZENITH IMAGE MIGRATION - DOWNLOAD MODE
2026-07-21 21:53:17,440 [INFO] ======================================================================
2026-07-21 21:53:17,440 [INFO] Log file: ./image_migration_logs\download_20260721_215317.log
2026-07-21 21:53:17,441 [INFO] 🔥 LIVE MODE: Downloading with anti-block headers + DB update
2026-07-21 21:53:17,441 [INFO] Image directory: ./downloaded_images
2026-07-21 21:53:17,441 [INFO] 
[PHASE 1/4] Extracting image URLs from database...
2026-07-21 21:53:17,442 [INFO] Connecting to database...
2026-07-21 21:53:19,836 [INFO] Extracting from player_stats (single URL columns)...
2026-07-21 21:53:21,943 [INFO]   Found 211 unique URLs from single columns
2026-07-21 21:53:21,944 [INFO] Extracting from player_stats (comma-separated: skills, traits)...
2026-07-21 21:53:23,048 [INFO]   Found 31 additional URLs from comma-separated columns
2026-07-21 21:53:23,048 [INFO] Extracting from skills_catalog...
2026-07-21 21:53:23,268 [INFO]   Found 66 additional URLs from skills_catalog
2026-07-21 21:53:23,294 [INFO] Total unique renderz.app image URLs: 308
2026-07-21 21:53:23,298 [INFO] 
✓ Total URLs to process: 308
2026-07-21 21:53:23,299 [INFO] ✓ URLs shuffled to avoid detection patterns
2026-07-21 21:53:23,301 [INFO] 
[PHASE 2/4] Downloading images...
2026-07-21 21:53:23,302 [INFO] Rate limit: ~2 images/second with random delays
2026-07-21 21:53:25,284 [INFO] [1/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_SWITZERLAND_STATIC_L3.png (28.5KB)
2026-07-21 21:53:27,144 [INFO] [2/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_ICON_ARGENTINA_STATIC_L2.png (32.3KB)
2026-07-21 21:53:29,070 [INFO] [3/308] ✓ Downloaded: club_23_1335.png (10.0KB)
2026-07-21 21:53:31,251 [INFO] [4/308] ✓ Downloaded: skill_S10_BALL_PLAYING_DEFENDER_3.png (3.4KB)
2026-07-21 21:53:33,250 [INFO] [5/308] ✓ Downloaded: traitlogo_23_13.png (2.2KB)
2026-07-21 21:53:34,746 [INFO] [6/308] ✓ Downloaded: league_23_1003.png (9.5KB)
2026-07-21 21:53:36,260 [INFO] [7/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG_BASE_ICON_STATIC.png (26.0KB)
2026-07-21 21:53:38,031 [INFO] [8/308] ✓ Downloaded: player_25_192505_TWG26_MM_2_461e8579fafd4ee0.png (16.6KB)
2026-07-21 21:53:40,464 [WARNING] [9/308] ✗ Failed: https://images-v2.renderz.app/player_25_230424?verify=1784206368-Iuv62ugAsVJo5%2BcGp0Q35IPn93r5qcX%2FDcH0qxDVsoU%3D: HTTP 404
2026-07-21 21:53:41,810 [INFO] [10/308] ✓ Downloaded: celebrationlogo_23_0.png (883.0B)
2026-07-21 21:53:43,220 [INFO] [11/308] ✓ Downloaded: flags_23_128x128_21.png (683.0B)
2026-07-21 21:53:45,335 [INFO] [12/308] ✓ Downloaded: traitlogo_23_17.png (2.1KB)
2026-07-21 21:53:47,104 [INFO] [13/308] ✓ Downloaded: skill_PHYSICAL_2.png (1.6KB)
2026-07-21 21:53:49,077 [INFO] [14/308] ✓ Downloaded: flags_23_128x128_45.png (2.2KB)
2026-07-21 21:53:52,029 [INFO] [15/308] ✓ Downloaded: skill_DEXTERITY_2.png (1.3KB)
2026-07-21 21:53:53,910 [INFO] [16/308] ✓ Downloaded: player_25_246669_TWG26_MM_6287fd6488e93d81.png (15.7KB)
2026-07-21 21:53:53,910 [INFO] Progress: 16/308 (5.2%) | Rate: 0.5 img/s | ETA: 9.3 min | Downloaded: 153.0KB | Failed: 1
2026-07-21 21:53:55,674 [INFO] [17/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_ENGLAND_STATIC_L2.png (30.3KB)
2026-07-21 21:53:57,195 [INFO] [18/308] ✓ Downloaded: player_25_204838_TWG26_MM_6ca5e8159de980bf.png (16.4KB)
2026-07-21 21:53:58,707 [INFO] [19/308] ✓ Downloaded: skill_S10_FALSEBACK_3.png (3.2KB)
2026-07-21 21:54:00,089 [INFO] [20/308] ✓ Downloaded: player_25_243481_PATCH_WC26_f6bd04d116fd41b4.png (8.1KB)
2026-07-21 21:54:02,108 [INFO] [21/308] ✓ Downloaded: club_23_111111.png (15.6KB)
2026-07-21 21:54:04,441 [INFO] [22/308] ✓ Downloaded: skill_S10_DEFENDER_3.png (3.5KB)
2026-07-21 21:54:06,729 [INFO] [23/308] ✓ Downloaded: player_25_265428.png (6.9KB)
2026-07-21 21:54:08,469 [INFO] [24/308] ✓ Downloaded: skill_S10_WINGBACK_3.png (3.3KB)
2026-07-21 21:54:10,367 [INFO] [26/308] ✓ Downloaded: bg_23_B_FCM25_MOMENTS_LIVE_STATIC.png (27.1KB)
2026-07-21 21:54:11,954 [INFO] [27/308] ✓ Downloaded: player_25_216393_TWG26_MM_d275e3b4284879df.png (12.7KB)
2026-07-21 21:54:13,872 [INFO] [28/308] ✓ Downloaded: club_23_1364.png (8.1KB)
2026-07-21 21:54:15,347 [INFO] [29/308] ✓ Downloaded: league_23_78.png (10.8KB)
2026-07-21 21:54:17,432 [INFO] [30/308] ✓ Downloaded: player_25_250723_TWG26_MM_d3f89689c34905ad.png (14.2KB)
2026-07-21 21:54:19,525 [INFO] [31/308] ✓ Downloaded: player_25_262071_TWG26_LIVE_6ee548bfbea40969.png (15.1KB)
2026-07-21 21:54:20,881 [INFO] [32/308] ✓ Downloaded: player_25_247883.png (8.1KB)
2026-07-21 21:54:22,921 [INFO] [33/308] ✓ Downloaded: player_25_248861.png (8.4KB)
2026-07-21 21:54:24,631 [INFO] [34/308] ✓ Downloaded: flags_23_128x128_129.png (3.1KB)
2026-07-21 21:54:24,632 [INFO] Progress: 34/308 (11.0%) | Rate: 0.6 img/s | ETA: 8.2 min | Downloaded: 357.5KB | Failed: 1
2026-07-21 21:54:26,510 [INFO] [35/308] ✓ Downloaded: traitlogo_23_16.png (1.8KB)
2026-07-21 21:54:28,655 [INFO] [36/308] ✓ Downloaded: flags_23_128x128_18.png (682.0B)
2026-07-21 21:54:30,850 [INFO] [37/308] ✓ Downloaded: skillmovelogo_23_0.png (1.2KB)
2026-07-21 21:54:32,629 [INFO] [38/308] ✓ Downloaded: player_25_241197_MOMENT26_LIVE_6f7466947265f8fe.png (15.4KB)
2026-07-21 21:54:35,009 [WARNING] [39/308] ✗ Failed: https://images-v2.renderz.app/player_25_230455?verify=1784206368-OyN67YfCBy%2FsELIJoPP8peBNJyW1%2FV9j4lwxOmZoI1Q%3D: HTTP 404
2026-07-21 21:54:36,382 [INFO] [40/308] ✓ Downloaded: club_23_1369.png (14.5KB)
2026-07-21 21:54:38,398 [INFO] [41/308] ✓ Downloaded: player_25_241461_TWG26_LIVE2_7f442cf2d1de11f9.png (16.3KB)
2026-07-21 21:54:40,161 [INFO] [42/308] ✓ Downloaded: traitlogo_23_18.png (1.9KB)
2026-07-21 21:54:42,145 [WARNING] [43/308] ✗ Failed: https://images-v2.renderz.app/player_25_230214?verify=1784206368-cTeWEqyXR1IE4cTwmsTn%2F0xwR4c0gKu0kqpiq3NrDVY%3D: HTTP 404
2026-07-21 21:54:43,526 [INFO] [44/308] ✓ Downloaded: club_23_1318.png (11.6KB)
2026-07-21 21:54:45,268 [INFO] [45/308] ✓ Downloaded: traitlogo_23_10.png (1.6KB)
2026-07-21 21:54:47,076 [INFO] [46/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_ENGLAND_STATIC_L3.png (31.2KB)
2026-07-21 21:54:49,421 [WARNING] [47/308] ✗ Failed: https://images-v2.renderz.app/player_25_230366?verify=1784206368-xswldUuT%2BI04K20wnYeFbXI8ruFyJbhpY4ipeTOCjs4%3D: HTTP 404
2026-07-21 21:54:52,504 [INFO] [49/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_NORWAY_STATIC_L3.png (29.2KB)
2026-07-21 21:54:54,951 [INFO] [50/308] ✓ Downloaded: skill_S10_HALF_WINGER_3.png (3.6KB)
2026-07-21 21:54:54,951 [INFO] Progress: 50/308 (16.2%) | Rate: 0.5 img/s | ETA: 7.9 min | Downloaded: 517.8KB | Failed: 4
2026-07-21 21:54:56,808 [INFO] [51/308] ✓ Downloaded: player_25_254131_PATCH2_08a6dcb19cbcb2c8.png (7.7KB)
2026-07-21 21:54:58,164 [INFO] [52/308] ✓ Downloaded: player_25_82329_TWG26_LIVE2_6984c8c9d4f6d0f8.png (14.8KB)
2026-07-21 21:55:00,452 [INFO] [53/308] ✓ Downloaded: skill_S10_HIGHBALLS_3.png (3.6KB)
2026-07-21 21:55:02,634 [INFO] [54/308] ✓ Downloaded: skill_S10_HEADER_3.png (3.5KB)
2026-07-21 21:55:04,977 [INFO] [55/308] ✓ Downloaded: player_25_247827_TWG26_MM_dd1d501058736061.png (14.4KB)
2026-07-21 21:55:07,689 [WARNING] [56/308] ✗ Failed: https://images-v2.renderz.app/player_25_230445?verify=1784206368-T4B40SHICgmzPIFnE4ZwVj2Hxpje4c6I%2B0%2FzA4NmMcU%3D: HTTP 404
2026-07-21 21:55:09,685 [INFO] [57/308] ✓ Downloaded: club_23_115693.png (11.2KB)
2026-07-21 21:55:12,731 [INFO] [58/308] ✓ Downloaded: player_25_241159_TWG26_MM_3226014b90159f47.png (14.7KB)
2026-07-21 21:55:15,219 [INFO] [59/308] ✓ Downloaded: traitlogo_23_15.png (1.9KB)
2026-07-21 21:55:17,799 [INFO] [60/308] ✓ Downloaded: player_25_234378_TWG26_MM_00ddc20788ff9da7.png (13.0KB)
2026-07-21 21:55:19,651 [INFO] [62/308] ✓ Downloaded: player_25_244176_MOMENT26_LIVE_cc5bd0ef18ad752a.png (13.2KB)
2026-07-21 21:55:21,561 [INFO] [63/308] ✓ Downloaded: skill_FULLBACK_2.png (1.8KB)
2026-07-21 21:55:22,888 [INFO] [64/308] ✓ Downloaded: club_23_105035.png (15.7KB)
2026-07-21 21:55:24,282 [INFO] [65/308] ✓ Downloaded: skill_S10_FALSE_NINE_3.png (3.2KB)
2026-07-21 21:55:27,362 [INFO] [66/308] ✓ Downloaded: traitlogo_23_7.png (1.9KB)
2026-07-21 21:55:27,366 [INFO] Progress: 66/308 (21.4%) | Rate: 0.5 img/s | ETA: 7.6 min | Downloaded: 648.4KB | Failed: 5
2026-07-21 21:55:29,286 [INFO] [67/308] ✓ Downloaded: skill_S10_TARGET_FORWARD_3.png (3.2KB)
2026-07-21 21:55:32,658 [INFO] [68/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_FRANCE_STATIC_L2.png (27.7KB)
2026-07-21 21:55:35,494 [INFO] [69/308] ✓ Downloaded: skill_S10_CENTRE_BACK_3.png (3.5KB)
2026-07-21 21:55:39,089 [INFO] [70/308] ✓ Downloaded: player_25_243576_TWG26_MM_5a9ed526fa37e5a1.png (14.7KB)
2026-07-21 21:55:41,676 [INFO] [71/308] ✓ Downloaded: flags_23_128x128_95.png (3.8KB)
2026-07-21 21:55:43,124 [INFO] [72/308] ✓ Downloaded: club_23_1352.png (9.7KB)
2026-07-21 21:55:44,599 [INFO] [73/308] ✓ Downloaded: skill_NO_NONSENSE_FULLBACK_2.png (1.3KB)
2026-07-21 21:55:45,854 [INFO] [74/308] ✓ Downloaded: player_25_222357_TWG26_MM_83a4a8ada968944a.png (14.6KB)
2026-07-21 21:55:47,369 [INFO] [75/308] ✓ Downloaded: club_23_dark_114578.png (11.6KB)
2026-07-21 21:55:48,680 [INFO] [76/308] ✓ Downloaded: skill_BOX_TO_BOX_2.png (1.4KB)
2026-07-21 21:55:49,915 [INFO] [77/308] ✓ Downloaded: skill_ENGANCHE_2.png (1.5KB)
2026-07-21 21:55:51,256 [INFO] [78/308] ✓ Downloaded: player_25_244176_TWG26_MM_6fa370b141440f5b.png (11.2KB)
2026-07-21 21:55:52,673 [WARNING] [79/308] ✗ Failed: https://images-v2.renderz.app/player_25_230462?verify=1784206368-OaEztKRX07Fd2cu4voV4RlTL3MUbPKq3QGT4uWugFoQ%3D: HTTP 404
2026-07-21 21:55:53,513 [INFO] [81/308] ✓ Downloaded: skill_LIBERO_2.png (1.5KB)
2026-07-21 21:55:55,104 [INFO] [82/308] ✓ Downloaded: player_25_239604_TWG26_ICON_71b6d0f9d9e742e9.png (14.3KB)
2026-07-21 21:55:57,319 [INFO] [83/308] ✓ Downloaded: club_23_111130.png (3.4KB)
2026-07-21 21:55:58,900 [INFO] [84/308] ✓ Downloaded: skill_S10_GK_RUSH_3.png (3.4KB)
2026-07-21 21:55:58,901 [INFO] Progress: 84/308 (27.3%) | Rate: 0.5 img/s | ETA: 6.9 min | Downloaded: 786.4KB | Failed: 6
2026-07-21 21:56:00,461 [INFO] [85/308] ✓ Downloaded: traitlogo_23_25.png (2.0KB)
2026-07-21 21:56:01,912 [INFO] [87/308] ✓ Downloaded: bg_23_B_BASE_CONMEBOL_LIB_STATIC.png (18.2KB)
2026-07-21 21:56:03,441 [INFO] [88/308] ✓ Downloaded: player_25_268514_TWG26_ICON_aee4a23f9af431a3.png (11.8KB)
2026-07-21 21:56:04,904 [INFO] [90/308] ✓ Downloaded: player_25_211339.png (7.9KB)
2026-07-21 21:56:06,417 [INFO] [91/308] ✓ Downloaded: player_25_202371_TWG26_LIVE_7461e4b53d914c0c.png (11.9KB)
2026-07-21 21:56:08,172 [INFO] [93/308] ✓ Downloaded: player_25_253396_TWG26_LIVE_ba3e1731fb9d61b9.png (11.7KB)
2026-07-21 21:56:15,337 [INFO] [94/308] ✓ Downloaded: flags_23_128x128_38.png (2.3KB)
2026-07-21 21:56:17,900 [INFO] [95/308] ✓ Downloaded: skill_S10_WINGER_3.png (3.5KB)
2026-07-21 21:56:19,444 [INFO] [97/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG_MOMENTS_STATIC.png (39.0KB)
2026-07-21 21:56:20,763 [INFO] [98/308] ✓ Downloaded: player_25_204923_TWG26_MM_a7c12fa91928665b.png (12.8KB)
2026-07-21 21:56:22,285 [INFO] [99/308] ✓ Downloaded: skill_DRIBBLING_2.png (2.0KB)
2026-07-21 21:56:24,136 [INFO] [100/308] ✓ Downloaded: skill_INVERTED_WINGER_2.png (1.1KB)
2026-07-21 21:56:24,136 [INFO] Progress: 100/308 (32.5%) | Rate: 0.6 img/s | ETA: 6.3 min | Downloaded: 926.1KB | Failed: 6
2026-07-21 21:56:26,409 [INFO] [101/308] ✓ Downloaded: skill_S10_SHADOW_STRIKER_3.png (3.4KB)
2026-07-21 21:56:28,715 [INFO] [102/308] ✓ Downloaded: traitlogo_23_23.png (2.1KB)
2026-07-21 21:56:30,739 [INFO] [103/308] ✓ Downloaded: player_25_234577_TWG26_MM_5a6b0bcfab303b37.png (14.5KB)
2026-07-21 21:56:32,701 [INFO] [104/308] ✓ Downloaded: skill_RAUMDEUTER_2.png (1.9KB)
2026-07-21 21:56:34,041 [INFO] [105/308] ✓ Downloaded: club_23_1322.png (8.8KB)
2026-07-21 21:56:35,384 [INFO] [106/308] ✓ Downloaded: skill_SHADOW_STRIKER_2.png (2.1KB)
2026-07-21 21:56:36,935 [INFO] [107/308] ✓ Downloaded: club_23_1362.png (9.4KB)
2026-07-21 21:56:39,027 [INFO] [108/308] ✓ Downloaded: flags_23_128x128_52.png (1.8KB)
2026-07-21 21:56:40,620 [INFO] [109/308] ✓ Downloaded: flags_23_128x128_61.png (2.5KB)
2026-07-21 21:56:42,537 [INFO] [110/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_FRANCE_STATIC_L3.png (27.4KB)
2026-07-21 21:56:44,038 [INFO] [111/308] ✓ Downloaded: player_25_239837_TWG26_MM_533baa366f611b0d.png (17.9KB)
2026-07-21 21:56:45,718 [INFO] [112/308] ✓ Downloaded: player_25_262863_TWG26_MM_c478982bafb6be9f.png (14.2KB)
2026-07-21 21:56:47,868 [INFO] [113/308] ✓ Downloaded: player_25_251854_TWG26_MM_f8a4e48c32cf4c50.png (14.9KB)
2026-07-21 21:56:49,524 [INFO] [114/308] ✓ Downloaded: player_25_242516_TWG26_MM_f01f0263729b954b.png (15.1KB)
2026-07-21 21:56:50,980 [INFO] [115/308] ✓ Downloaded: traitlogo_23_14.png (1.9KB)
2026-07-21 21:56:52,220 [INFO] [116/308] ✓ Downloaded: player_25_245541_MOMENTS26_LIVE_a763e0ea3a2fc5d8.png (14.4KB)
2026-07-21 21:56:53,661 [INFO] [118/308] ✓ Downloaded: club_23_1337.png (14.8KB)
2026-07-21 21:56:54,916 [INFO] [119/308] ✓ Downloaded: flags_23_128x128_54.png (3.7KB)
2026-07-21 21:56:54,916 [INFO] Progress: 119/308 (38.6%) | Rate: 0.6 img/s | ETA: 5.6 min | Downloaded: 1.1MB | Failed: 6
2026-07-21 21:56:56,454 [INFO] [120/308] ✓ Downloaded: player_25_254571_TWG26_ICON_5657111dc3092119.png (15.5KB)
2026-07-21 21:56:57,878 [INFO] [121/308] ✓ Downloaded: skill_NO_NONSENSE_CENTRE_BACK_2.png (1.2KB)
2026-07-21 21:56:59,182 [INFO] [122/308] ✓ Downloaded: league_23_dark_1014.png (9.4KB)
2026-07-21 21:57:00,638 [INFO] [123/308] ✓ Downloaded: skill_S10_COMPLETE_WIDE_MIDFIELDER_3.png (3.3KB)
2026-07-21 21:57:01,877 [INFO] [124/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_ARGENTINA_STATIC_L3.png (31.2KB)
2026-07-21 21:57:03,115 [INFO] [125/308] ✓ Downloaded: skill_S10_INVERTED_WINGER_3.png (3.3KB)
2026-07-21 21:57:04,913 [INFO] [126/308] ✓ Downloaded: skill_FINISHER_2.png (1.4KB)
2026-07-21 21:57:06,418 [INFO] [127/308] ✓ Downloaded: club_23_111012.png (14.2KB)
2026-07-21 21:57:07,565 [INFO] [128/308] ✓ Downloaded: player_25_237068_TWG26_ICON_7ed32adc3ccd8bb9.png (15.2KB)
2026-07-21 21:57:09,435 [INFO] [129/308] ✓ Downloaded: player_25_254409.png (7.5KB)
2026-07-21 21:57:11,589 [INFO] [130/308] ✓ Downloaded: player_25_271421_TWG26_MM_5556d946c814e1be.png (15.9KB)
2026-07-21 21:57:13,414 [INFO] [131/308] ✓ Downloaded: player_25_202811_TWG26_MM_234549aedff7b51b.png (12.4KB)
2026-07-21 21:57:15,423 [INFO] [132/308] ✓ Downloaded: league_23_1014.png (9.5KB)
2026-07-21 21:57:16,941 [INFO] [133/308] ✓ Downloaded: club_23_111465.png (6.7KB)
2026-07-21 21:57:18,234 [INFO] [134/308] ✓ Downloaded: skill_S10_PASSING_3.png (3.3KB)
2026-07-21 21:57:19,590 [INFO] [135/308] ✓ Downloaded: flags_23_128x128_56.png (2.2KB)
2026-07-21 21:57:20,967 [INFO] [136/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_NORWAY_STATIC_L2.png (28.5KB)
2026-07-21 21:57:22,442 [INFO] [137/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_UNITEDSTATES_STATIC_L3.png (30.8KB)
2026-07-21 21:57:23,750 [INFO] [138/308] ✓ Downloaded: player_25_256903_TWG26_MM_2eb022fb27862b0c.png (13.7KB)
2026-07-21 21:57:25,110 [INFO] [139/308] ✓ Downloaded: player_25_185427_TWG26_LIVE_6fc543cd98377522.png (13.6KB)
2026-07-21 21:57:25,110 [INFO] Progress: 139/308 (45.1%) | Rate: 0.6 img/s | ETA: 4.9 min | Downloaded: 1.3MB | Failed: 6
2026-07-21 21:57:26,667 [INFO] [140/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_MOROCCO_STATIC_L3.png (29.7KB)
2026-07-21 21:57:27,887 [INFO] [141/308] ✓ Downloaded: player_25_255125_TWG26_MM_7f7b60f410fc29bb.png (15.4KB)
2026-07-21 21:57:29,302 [INFO] [142/308] ✓ Downloaded: flags_23_128x128_53.png (2.0KB)
2026-07-21 21:57:30,633 [INFO] [143/308] ✓ Downloaded: skill_S10_BOX_TO_BOX_3.png (3.0KB)
2026-07-21 21:57:32,224 [INFO] [144/308] ✓ Downloaded: player_25_244260_TWG26_MM_d4280a96be0acc8d.png (13.7KB)
2026-07-21 21:57:33,585 [INFO] [145/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_COLOMBIA_STATIC_L3.png (23.9KB)
2026-07-21 21:57:35,284 [WARNING] [146/308] ✗ Failed: https://images-v2.renderz.app/player_25_77776?verify=1784206368-8FgKKUmIcjjvrPYHUin%2BZHeNDirY32udhVhp0Y4ghwo%3D: HTTP 404
2026-07-21 21:57:36,143 [INFO] [147/308] ✓ Downloaded: flags_23_128x128_4.png (725.0B)
2026-07-21 21:57:37,362 [INFO] [148/308] ✓ Downloaded: player_25_231443_TWG26_MM_8211270cbef2ad45.png (12.0KB)
2026-07-21 21:57:38,855 [INFO] [149/308] ✓ Downloaded: player_25_227678_TWG26_MM_c2a153a04bca25b7.png (12.5KB)
2026-07-21 21:57:40,704 [INFO] [150/308] ✓ Downloaded: skill_ATTACKING_FULLBACK_2.png (2.0KB)
2026-07-21 21:57:42,120 [INFO] [151/308] ✓ Downloaded: skill_SHOOTING_2.png (2.1KB)
2026-07-21 21:57:43,726 [INFO] [153/308] ✓ Downloaded: skill_BALL_PLAYING_DEFENDER_2.png (2.1KB)
2026-07-21 21:57:45,933 [INFO] [154/308] ✓ Downloaded: skill_S10_ATTACKING_MIDFIELDER_3.png (3.5KB)
2026-07-21 21:57:50,756 [INFO] [156/308] ✓ Downloaded: club_23_114154.png (29.6KB)
2026-07-21 21:57:54,078 [INFO] [157/308] ✓ Downloaded: league_23_2267.png (10.7KB)
2026-07-21 21:57:55,885 [INFO] [158/308] ✓ Downloaded: club_23_111109.png (12.2KB)
2026-07-21 21:57:55,886 [INFO] Progress: 158/308 (51.3%) | Rate: 0.6 img/s | ETA: 4.3 min | Downloaded: 1.5MB | Failed: 7
2026-07-21 21:57:57,243 [INFO] [159/308] ✓ Downloaded: player_25_224179_PATCH_WC26_abce1301154b2fee.png (8.5KB)
2026-07-21 21:57:58,961 [INFO] [160/308] ✓ Downloaded: skill_S10_CROSSING_3.png (3.5KB)
2026-07-21 21:58:02,909 [INFO] [161/308] ✓ Downloaded: player_25_275048_TWG26_LIVE_f4a4d889bc78077c.png (13.5KB)
2026-07-21 21:58:04,469 [INFO] [162/308] ✓ Downloaded: flags_23_128x128_57.png (2.1KB)
2026-07-21 21:58:06,206 [INFO] [163/308] ✓ Downloaded: skill_WIDE_MIDFIELDER_2.png (1.8KB)
2026-07-21 21:58:09,525 [INFO] [164/308] ✓ Downloaded: league_23_2118.png (12.4KB)
2026-07-21 21:58:13,227 [INFO] [165/308] ✓ Downloaded: flags_23_128x128_111.png (1.6KB)
2026-07-21 21:58:14,599 [INFO] [166/308] ✓ Downloaded: player_25_258908_TWG26_MM_d186bb8e7389b0ed.png (14.2KB)
2026-07-21 21:58:16,008 [INFO] [167/308] ✓ Downloaded: player_25_262135_TWG26_LIVE2_cc406016c52107df.png (14.9KB)
2026-07-21 21:58:19,500 [INFO] [168/308] ✓ Downloaded: player_25_267897_TWG26_ICON_406c24820f95043d.png (12.9KB)
2026-07-21 21:58:21,082 [INFO] [169/308] ✓ Downloaded: player_25_247090_TWG26_MM_2_acd0a203eef4a743.png (13.7KB)
2026-07-21 21:58:23,714 [INFO] [170/308] ✓ Downloaded: traitlogo_23_21.png (1.3KB)
2026-07-21 21:58:26,972 [INFO] [172/308] ✓ Downloaded: player_25_203574_TWG26_LIVE_d48bc9e4b36ff227.png (14.4KB)
2026-07-21 21:58:26,972 [INFO] Progress: 172/308 (55.8%) | Rate: 0.6 img/s | ETA: 4.0 min | Downloaded: 1.6MB | Failed: 7
2026-07-21 21:58:28,363 [INFO] [173/308] ✓ Downloaded: bg_23_B_BASE_CONMEBOL_SUD_STATIC.png (9.9KB)
2026-07-21 21:58:29,855 [INFO] [174/308] ✓ Downloaded: skill_S10_GOAL_KEEPER_3.png (3.3KB)
2026-07-21 21:58:35,127 [INFO] [175/308] ✓ Downloaded: skill_S10_PHYSICAL_3.png (3.2KB)
2026-07-21 21:58:39,592 [INFO] [177/308] ✓ Downloaded: club_23_1328.png (13.3KB)
2026-07-21 21:58:48,053 [INFO] [178/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_BELGIUM_STATIC_L3.png (27.4KB)
2026-07-21 21:58:56,704 [INFO] [179/308] ✓ Downloaded: skill_S10_DEFENSIVE_MIDFIELDER_3.png (3.5KB)
2026-07-21 21:58:59,355 [INFO] [180/308] ✓ Downloaded: flags_23_128x128_36.png (1.3KB)
2026-07-21 21:58:59,355 [INFO] Progress: 180/308 (58.4%) | Rate: 0.5 img/s | ETA: 4.0 min | Downloaded: 1.7MB | Failed: 7
2026-07-21 21:59:02,097 [INFO] [181/308] ✓ Downloaded: player_25_237646_TWG26_LIVE_2_6699b898d2aaf3ec.png (15.7KB)
2026-07-21 21:59:04,777 [INFO] [182/308] ✓ Downloaded: player_25_247780.png (8.0KB)
2026-07-21 21:59:06,468 [INFO] [183/308] ✓ Downloaded: player_25_217141_TWG26_MM_2_8429836f30c0e334.png (15.6KB)
2026-07-21 21:59:08,320 [INFO] [184/308] ✓ Downloaded: club_23_1370.png (9.0KB)
2026-07-21 21:59:10,350 [INFO] [185/308] ✓ Downloaded: skill_PASSING_2.png (1.5KB)
2026-07-21 21:59:11,704 [INFO] [186/308] ✓ Downloaded: flags_23_128x128_70.png (3.0KB)
2026-07-21 21:59:13,106 [INFO] [189/308] ✓ Downloaded: club_23_1325.png (6.9KB)
2026-07-21 21:59:14,264 [INFO] [191/308] ✓ Downloaded: flags_23_128x128_14.png (1.2KB)
2026-07-21 21:59:15,385 [INFO] [192/308] ✓ Downloaded: player_25_269161_TWG26_MM_c86fc58609507014.png (16.6KB)
2026-07-21 21:59:17,320 [INFO] [194/308] ✓ Downloaded: club_23_111456.png (9.9KB)
2026-07-21 21:59:21,418 [INFO] [195/308] ✓ Downloaded: player_25_231207_TWG26_MM_68701f1d5320480c.png (13.1KB)
2026-07-21 21:59:23,995 [INFO] [196/308] ✓ Downloaded: club_23_1598.png (14.8KB)
2026-07-21 21:59:26,938 [INFO] [197/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_ICON_SPAIN_STATIC_L2.png (32.6KB)
2026-07-21 21:59:29,639 [INFO] [199/308] ✓ Downloaded: skill_S10_WIDE_MIDFIELDER_3.png (3.4KB)
2026-07-21 21:59:29,639 [INFO] Progress: 199/308 (64.6%) | Rate: 0.5 img/s | ETA: 3.3 min | Downloaded: 1.8MB | Failed: 7
2026-07-21 21:59:30,874 [INFO] [200/308] ✓ Downloaded: flags_23_128x128_183.png (3.6KB)
2026-07-21 21:59:30,874 [INFO] Progress: 200/308 (64.9%) | Rate: 0.5 img/s | ETA: 3.3 min | Downloaded: 1.8MB | Failed: 7
2026-07-21 21:59:32,238 [INFO] [202/308] ✓ Downloaded: player_25_70289_TWG26_MM_dd1abe5a1de97b57.png (15.2KB)
2026-07-21 21:59:33,580 [INFO] [203/308] ✓ Downloaded: club_23_1386.png (15.8KB)
2026-07-21 21:59:34,870 [INFO] [205/308] ✓ Downloaded: flags_23_128x128_34.png (760.0B)
2026-07-21 21:59:36,484 [INFO] [206/308] ✓ Downloaded: flags_23_128x128_10.png (2.4KB)
2026-07-21 21:59:38,230 [INFO] [207/308] ✓ Downloaded: skill_S10_POACHER_3.png (3.5KB)
2026-07-21 21:59:40,679 [INFO] [208/308] ✓ Downloaded: player_25_251804_TWG26_MM_9379f893e31851a8.png (13.9KB)
2026-07-21 21:59:42,431 [INFO] [209/308] ✓ Downloaded: skill_S10_HOLDING_3.png (3.5KB)
2026-07-21 21:59:45,914 [INFO] [210/308] ✓ Downloaded: skill_S10_SWEEPER_KEEPER_3.png (3.2KB)
2026-07-21 21:59:47,472 [INFO] [211/308] ✓ Downloaded: skill_S10_SHOOTING_3.png (3.5KB)
2026-07-21 21:59:48,917 [INFO] [212/308] ✓ Downloaded: skill_S10_SHOT_STOPPER_3.png (3.3KB)
2026-07-21 21:59:50,298 [INFO] [213/308] ✓ Downloaded: skill_S10_DRIBBLING_3.png (3.3KB)
2026-07-21 21:59:51,796 [INFO] [215/308] ✓ Downloaded: skill_S10_ADVANCE_FORWARD_3.png (3.5KB)
2026-07-21 21:59:53,905 [INFO] [216/308] ✓ Downloaded: player_25_246191_TWG26_MM_1702348e6a2f4ec2.png (15.0KB)
2026-07-21 21:59:55,765 [INFO] [217/308] ✓ Downloaded: player_25_200145_TWG26_MM_5931bf71a7eba4ef.png (14.5KB)
2026-07-21 21:59:57,597 [INFO] [218/308] ✓ Downloaded: player_25_212067_TWG26_LIVE2_a152dbad99900480.png (17.1KB)
2026-07-21 21:59:59,353 [INFO] [219/308] ✓ Downloaded: player_25_231866_TWG26_MM_f348508ccbd182cf.png (14.2KB)
2026-07-21 22:00:01,757 [INFO] [220/308] ✓ Downloaded: flags_23_128x128_60.png (2.5KB)
2026-07-21 22:00:01,757 [INFO] Progress: 220/308 (71.4%) | Rate: 0.6 img/s | ETA: 2.7 min | Downloaded: 2.0MB | Failed: 7
2026-07-21 22:00:04,514 [WARNING] [222/308] ✗ Failed: https://images-v2.renderz.app/player_25_230411?verify=1784206368-OCnVFA3UkqzTFXUSNk0iyGHZwSbp3JUh4v1Jwt5ozfI%3D: HTTP 404
2026-07-21 22:00:05,998 [INFO] [223/308] ✓ Downloaded: club_23_111975.png (15.6KB)
2026-07-21 22:00:07,942 [INFO] [224/308] ✓ Downloaded: skill_COUNTER_2.png (2.1KB)
2026-07-21 22:00:11,541 [INFO] [225/308] ✓ Downloaded: player_25_256630_TWG26_MM_12e21856df3f91ca.png (12.9KB)
2026-07-21 22:00:13,940 [INFO] [226/308] ✓ Downloaded: player_25_239522_TWG26_ICON_2_9092b9740fcffe59.png (13.3KB)
2026-07-21 22:00:15,918 [INFO] [227/308] ✓ Downloaded: club_23_111455.png (10.1KB)
2026-07-21 22:00:18,241 [INFO] [228/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_PORTUGAL_STATIC_L3.png (29.3KB)
2026-07-21 22:00:19,792 [INFO] [229/308] ✓ Downloaded: flags_23_128x128_58.png (2.3KB)
2026-07-21 22:00:21,214 [INFO] [230/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_SPAIN_STATIC_L2.png (30.0KB)
2026-07-21 22:00:22,877 [INFO] [231/308] ✓ Downloaded: skill_S10_STRIKER_3.png (3.5KB)
2026-07-21 22:00:24,257 [INFO] [232/308] ✓ Downloaded: skill_S10_TRADITIONAL_WINGER_3.png (3.5KB)
2026-07-21 22:00:26,620 [INFO] [233/308] ✓ Downloaded: flags_23_128x128_59.png (3.2KB)
2026-07-21 22:00:28,472 [INFO] [234/308] ✓ Downloaded: flags_23_128x128_104.png (3.1KB)
2026-07-21 22:00:30,305 [INFO] [235/308] ✓ Downloaded: club_23_111114.png (10.5KB)
2026-07-21 22:00:32,177 [INFO] [236/308] ✓ Downloaded: traitlogo_23_2.png (1.7KB)
2026-07-21 22:00:32,177 [INFO] Progress: 236/308 (76.6%) | Rate: 0.6 img/s | ETA: 2.2 min | Downloaded: 2.1MB | Failed: 8
2026-07-21 22:00:34,504 [INFO] [237/308] ✓ Downloaded: skill_S10_PLAYMAKER_3.png (3.0KB)
2026-07-21 22:00:36,382 [INFO] [239/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_EGYPT_STATIC_L3.png (27.4KB)
2026-07-21 22:00:37,799 [INFO] [240/308] ✓ Downloaded: player_25_193352_TWG26_MM_49451d310f7f00c1.png (14.3KB)
2026-07-21 22:00:39,139 [INFO] [241/308] ✓ Downloaded: club_23_1387.png (5.9KB)
2026-07-21 22:00:41,362 [INFO] [242/308] ✓ Downloaded: skill_S10_FULLBACK_3.png (3.5KB)
2026-07-21 22:00:43,383 [INFO] [244/308] ✓ Downloaded: skill_S10_DEEP_LYING_PLAYMAKER_3.png (3.6KB)
2026-07-21 22:00:45,402 [INFO] [245/308] ✓ Downloaded: skill_BALANCED_2.png (1.8KB)
2026-07-21 22:00:46,683 [INFO] [246/308] ✓ Downloaded: skill_S10_GK_PASSING_3.png (3.5KB)
2026-07-21 22:00:47,996 [INFO] [247/308] ✓ Downloaded: player_25_261742_MOMENT26_LIVE_b56ab6710adbde0a.png (16.3KB)
2026-07-21 22:00:49,597 [INFO] [248/308] ✓ Downloaded: traitlogo_23_12.png (1.9KB)
2026-07-21 22:00:52,129 [INFO] [249/308] ✓ Downloaded: player_25_20801_TWG26_MM_e5f0c9d4c9696330.png (35.7KB)
2026-07-21 22:00:54,283 [INFO] [250/308] ✓ Downloaded: skill_DEFENDING_2.png (1.6KB)
2026-07-21 22:00:56,281 [INFO] [251/308] ✓ Downloaded: player_25_257279_TWG26_MM_5615314857214395.png (12.5KB)
2026-07-21 22:00:57,836 [INFO] [252/308] ✓ Downloaded: player_25_264348_PATCH_WC26_927d1154472596d1.png (7.3KB)
2026-07-21 22:00:59,238 [INFO] [253/308] ✓ Downloaded: player_25_202126_TWG26_MM_1fe3abe28a6d499c.png (13.2KB)
2026-07-21 22:01:01,152 [INFO] [254/308] ✓ Downloaded: skill_PLAYMAKER_2.png (1.6KB)
2026-07-21 22:01:03,362 [INFO] [256/308] ✓ Downloaded: player_25_231478_TWG26_MM_a9b0b4c3feb88a01.png (14.4KB)
2026-07-21 22:01:03,362 [INFO] Progress: 256/308 (83.1%) | Rate: 0.6 img/s | ETA: 1.6 min | Downloaded: 2.3MB | Failed: 8
2026-07-21 22:01:05,479 [INFO] [257/308] ✓ Downloaded: player_25_190042_TWG26_ICON_2_e953a5d90e8538e7.png (14.9KB)
2026-07-21 22:01:08,245 [INFO] [258/308] ✓ Downloaded: player_25_232514.png (7.4KB)
2026-07-21 22:01:09,785 [INFO] [259/308] ✓ Downloaded: player_25_233084_TWG26_MM_65a65c3a6fd57bba.png (15.5KB)
2026-07-21 22:01:12,023 [INFO] [260/308] ✓ Downloaded: player_25_241637_TWG26_LIVE_44e71dfbd682182c.png (13.4KB)
2026-07-21 22:01:13,928 [WARNING] [261/308] ✗ Failed: https://images-v2.renderz.app/player_25_272360?verify=1784206369-E0o58cTCkpXdPRFSUhcfG4LJHIVFHXXPhvgSyMJ0nCY%3D: HTTP 404
2026-07-21 22:01:15,080 [INFO] [264/308] ✓ Downloaded: club_23_114578.png (11.6KB)
2026-07-21 22:01:17,424 [INFO] [265/308] ✓ Downloaded: player_25_255434_TWG26_MM_986deef56338c8dd.png (17.0KB)
2026-07-21 22:01:19,405 [INFO] [266/308] ✓ Downloaded: player_25_252371_TWG26_MM_44dce9aeaf70564e.png (14.8KB)
2026-07-21 22:01:21,157 [INFO] [269/308] ✓ Downloaded: flags_23_128x128_47.png (2.5KB)
2026-07-21 22:01:23,090 [INFO] [270/308] ✓ Downloaded: skill_ANCHOR_2.png (1.7KB)
2026-07-21 22:01:24,522 [INFO] [271/308] ✓ Downloaded: skill_WIDE_TARGET_MAN_2.png (1.5KB)
2026-07-21 22:01:25,780 [INFO] [272/308] ✓ Downloaded: club_23_115935.png (16.0KB)
2026-07-21 22:01:28,382 [INFO] [273/308] ✓ Downloaded: skill_TARGET_MAN_2.png (1.6KB)
2026-07-21 22:01:30,381 [INFO] [274/308] ✓ Downloaded: skill_S10_LONG_SHOT_3.png (3.4KB)
2026-07-21 22:01:33,301 [INFO] [275/308] ✓ Downloaded: player_25_238581_TWG26_LIVE_f4aa40da1bc795fb.png (15.3KB)
2026-07-21 22:01:35,362 [INFO] [276/308] ✓ Downloaded: player_25_237678_TWG26_LIVE_64c79018fafd69c7.png (16.4KB)
2026-07-21 22:01:35,363 [INFO] Progress: 276/308 (89.6%) | Rate: 0.6 img/s | ETA: 1.0 min | Downloaded: 2.5MB | Failed: 9
2026-07-21 22:01:36,665 [INFO] [277/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_SPAIN_STATIC_L3.png (29.7KB)
2026-07-21 22:01:38,246 [INFO] [278/308] ✓ Downloaded: player_25_277643_TWG26_MM_cccbfd9f1c2e69ab.png (13.7KB)
2026-07-21 22:01:39,998 [INFO] [279/308] ✓ Downloaded: traitlogo_23_22.png (1.7KB)
2026-07-21 22:01:42,113 [INFO] [280/308] ✓ Downloaded: skill_S10_WIDE_PLAYMAKER_3.png (3.4KB)
2026-07-21 22:01:44,044 [INFO] [282/308] ✓ Downloaded: club_23_1354.png (12.3KB)
2026-07-21 22:01:46,319 [INFO] [283/308] ✓ Downloaded: player_25_242380_MOMENTS26_LIVE_3537f1ef9c9e3fee.png (13.9KB)
2026-07-21 22:01:47,951 [INFO] [284/308] ✓ Downloaded: player_25_209331_TWG26_MM_7c9ac4a15784f4b0.png (16.0KB)
2026-07-21 22:01:49,960 [INFO] [285/308] ✓ Downloaded: player_25_244305.png (8.2KB)
2026-07-21 22:01:51,642 [INFO] [286/308] ✓ Downloaded: club_23_112659.png (16.4KB)
2026-07-21 22:01:53,603 [INFO] [288/308] ✓ Downloaded: player_25_254817_MOMENTS26_LIVE_3eadc458ec315544.png (14.3KB)
2026-07-21 22:01:55,564 [INFO] [289/308] ✓ Downloaded: flags_23_128x128_83.png (2.7KB)
2026-07-21 22:01:57,042 [INFO] [290/308] ✓ Downloaded: club_23_1375.png (11.2KB)
2026-07-21 22:01:58,570 [INFO] [291/308] ✓ Downloaded: skill_S10_COMPLETE_FULLBACK_3.png (3.5KB)
2026-07-21 22:01:59,763 [INFO] [292/308] ✓ Downloaded: skill_BALL_WINNING_MIDFIELDER_2.png (1.6KB)
2026-07-21 22:02:01,648 [INFO] [293/308] ✓ Downloaded: player_25_25924_TWG26_ICON_6bd32f76f82cab14.png (13.6KB)
2026-07-21 22:02:03,308 [INFO] [294/308] ✓ Downloaded: traitlogo_23_1.png (1.9KB)
2026-07-21 22:02:36,603 [INFO] [296/308] ✓ Downloaded: player_25_251566_TWG26_MM_642143089dd0a7fa.png (12.6KB)
2026-07-21 22:02:36,603 [INFO] Progress: 296/308 (96.1%) | Rate: 0.5 img/s | ETA: 0.4 min | Downloaded: 2.7MB | Failed: 9
2026-07-21 22:02:37,751 [INFO] [297/308] ✓ Downloaded: club_23_115517.png (10.3KB)
2026-07-21 22:02:38,887 [INFO] [299/308] ✓ Downloaded: player_25_256197_TWG26_MM_276672cd90c1bd0b.png (15.2KB)
2026-07-21 22:02:40,399 [INFO] [300/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_MOROCCO_STATIC_L2.png (30.3KB)
2026-07-21 22:02:40,399 [INFO] Progress: 300/308 (97.4%) | Rate: 0.5 img/s | ETA: 0.2 min | Downloaded: 2.8MB | Failed: 9
2026-07-21 22:02:41,752 [INFO] [301/308] ✓ Downloaded: player_25_177003_TWG26_MM_314348d290d774e4.png (13.6KB)
2026-07-21 22:02:43,110 [INFO] [302/308] ✓ Downloaded: player_25_254243_TWG26_LIVE_a437feb514fa63a6.png (12.2KB)
2026-07-21 22:02:44,395 [INFO] [303/308] ✓ Downloaded: flags_23_128x128_7.png (707.0B)
2026-07-21 22:02:45,811 [INFO] [305/308] ✓ Downloaded: club_23_1377.png (7.6KB)
2026-07-21 22:02:48,241 [INFO] [306/308] ✓ Downloaded: skill_S10_DEFENDING_3.png (3.1KB)
2026-07-21 22:02:49,710 [INFO] [307/308] ✓ Downloaded: bg_23_backgrounds_twg26_TWG26_LIVE_BELGIUM_STATIC_L2.png (28.7KB)
2026-07-21 22:02:51,240 [INFO] [308/308] ✓ Downloaded: player_25_266837.png (7.0KB)
2026-07-21 22:02:51,735 [INFO] 
======================================================================
2026-07-21 22:02:51,736 [INFO] [PHASE 3/4] DOWNLOAD SUMMARY
2026-07-21 22:02:51,736 [INFO] ======================================================================
2026-07-21 22:02:51,736 [INFO] ✓ Downloaded:     265
2026-07-21 22:02:51,736 [INFO] ○ Already exists: 34
2026-07-21 22:02:51,736 [INFO] ⏱ Timeout:        0
2026-07-21 22:02:51,736 [INFO] ⏱ Rate limited:   0
2026-07-21 22:02:51,736 [INFO] ✗ Failed:         9
2026-07-21 22:02:51,736 [INFO] ━ Total:          308
2026-07-21 22:02:51,736 [INFO] 📦 Total size:    2.8MB
2026-07-21 22:02:51,736 [INFO] ⏱ Time taken:    9.5 minutes (568s)
2026-07-21 22:02:51,736 [INFO] 📊 Rate:          0.5 images/second
2026-07-21 22:02:51,736 [INFO] 
======================================================================
2026-07-21 22:02:51,737 [INFO] [PHASE 4/4] UPDATING DATABASE URLs
2026-07-21 22:02:51,738 [INFO] ======================================================================
2026-07-21 22:02:51,738 [INFO] Connecting to database for URL update...
2026-07-21 22:02:54,392 [INFO]   ✓ Updated 882 rows in player_stats.player_image
2026-07-21 22:02:55,245 [INFO]   ✓ Updated 882 rows in player_stats.card_background
2026-07-21 22:02:56,033 [INFO]   ✓ Updated 882 rows in player_stats.nation_flag
2026-07-21 22:02:56,880 [INFO]   ✓ Updated 882 rows in player_stats.club_flag
2026-07-21 22:02:57,687 [INFO]   ✓ Updated 882 rows in player_stats.league_image
2026-07-21 22:02:58,559 [INFO]   ✓ Updated 0 rows in player_stats.skills
2026-07-21 22:02:59,507 [INFO]   ✓ Updated 882 rows in player_stats.traits
2026-07-21 22:02:59,634 [INFO]   ✓ Updated 120 rows in skills_catalog.skill_image
2026-07-21 22:02:59,719 [INFO] ✓ DB update committed — 5412 total rows updated
2026-07-21 22:02:59,719 [INFO] ======================================================================
2026-07-21 22:02:59,719 [WARNING] 
⚠ 9 downloads failed:
2026-07-21 22:02:59,719 [WARNING]   - https://images-v2.renderz.app/player_25_230424?verify=1784206368-Iuv62ugAsVJo5%2BcGp0Q35IPn93r5qcX%2FDcH0qxDVsoU%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230455?verify=1784206368-OyN67YfCBy%2FsELIJoPP8peBNJyW1%2FV9j4lwxOmZoI1Q%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230214?verify=1784206368-cTeWEqyXR1IE4cTwmsTn%2F0xwR4c0gKu0kqpiq3NrDVY%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230366?verify=1784206368-xswldUuT%2BI04K20wnYeFbXI8ruFyJbhpY4ipeTOCjs4%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230445?verify=1784206368-T4B40SHICgmzPIFnE4ZwVj2Hxpje4c6I%2B0%2FzA4NmMcU%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230462?verify=1784206368-OaEztKRX07Fd2cu4voV4RlTL3MUbPKq3QGT4uWugFoQ%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_77776?verify=1784206368-8FgKKUmIcjjvrPYHUin%2BZHeNDirY32udhVhp0Y4ghwo%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_230411?verify=1784206368-OCnVFA3UkqzTFXUSNk0iyGHZwSbp3JUh4v1Jwt5ozfI%3D: HTTP 404
2026-07-21 22:02:59,721 [WARNING]   - https://images-v2.renderz.app/player_25_272360?verify=1784206369-E0o58cTCkpXdPRFSUhcfG4LJHIVFHXXPhvgSyMJ0nCY%3D: HTTP 404
2026-07-21 22:02:59,722 [INFO] 
ℹ Run script again to retry failed downloads
2026-07-21 22:02:59,722 [INFO] 
✓ Images saved to: ./downloaded_images
2026-07-21 22:02:59,722 [INFO] ✓ Log saved to: ./image_migration_logs\download_20260721_215317.log
Enter passphrase for key '/c/Users/Aadar/.ssh/id_ed25519': 
bg_23_B_BASE_CONMEBOL_LIB_STATIC.png                                                                                                             100%   18KB   7.1KB/s   00:02    
bg_23_B_BASE_CONMEBOL_SUD_STATIC.png                                                                                                             100%   10KB  12.3KB/s   00:00    
bg_23_B_FCM25_MOMENTS_LIVE_STATIC.png                                                                                                            100%   27KB  21.4KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_ICON_ARGENTINA_STATIC_L2.png                                                                                       100%   32KB  17.1KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_ICON_SPAIN_STATIC_L2.png                                                                                           100%   33KB   8.3KB/s   00:03    
bg_23_backgrounds_twg26_TWG26_LIVE_ARGENTINA_STATIC_L3.png                                                                                       100%   31KB  23.5KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_BELGIUM_STATIC_L2.png                                                                                         100%   29KB  22.1KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_BELGIUM_STATIC_L3.png                                                                                         100%   27KB  25.0KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_COLOMBIA_STATIC_L3.png                                                                                        100%   24KB  18.8KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_EGYPT_STATIC_L3.png                                                                                           100%   27KB  23.5KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_ENGLAND_STATIC_L2.png                                                                                         100%   30KB  19.2KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_ENGLAND_STATIC_L3.png                                                                                         100%   31KB  18.9KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_FRANCE_STATIC_L2.png                                                                                          100%   28KB  28.7KB/s   00:00    
bg_23_backgrounds_twg26_TWG26_LIVE_FRANCE_STATIC_L3.png                                                                                          100%   27KB  22.2KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_MOROCCO_STATIC_L2.png                                                                                         100%   30KB  20.5KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_MOROCCO_STATIC_L3.png                                                                                         100%   30KB  20.8KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_NORWAY_STATIC_L2.png                                                                                          100%   29KB  23.2KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_NORWAY_STATIC_L3.png                                                                                          100%   29KB  26.1KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_PORTUGAL_STATIC_L3.png                                                                                        100%   29KB  25.2KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_SPAIN_STATIC_L2.png                                                                                           100%   30KB  17.9KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_SPAIN_STATIC_L3.png                                                                                           100%   30KB  28.7KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_SWITZERLAND_STATIC_L3.png                                                                                     100%   29KB  23.7KB/s   00:01    
bg_23_backgrounds_twg26_TWG26_LIVE_UNITEDSTATES_STATIC_L3.png                                                                                    100%   31KB  24.5KB/s   00:01    
bg_23_backgrounds_twg26_TWG_BASE_ICON_STATIC.png                                                                                                 100%   26KB  26.4KB/s   00:00    
bg_23_backgrounds_twg26_TWG_MOMENTS_STATIC.png                                                                                                   100%   39KB   6.7KB/s   00:05    
celebrationlogo_23_0.png                                                                                                                         100%  883     6.3KB/s   00:00    
club_23_105035.png                                                                                                                               100%   16KB  21.6KB/s   00:00    
club_23_111012.png                                                                                                                               100%   14KB  19.6KB/s   00:00    
club_23_111109.png                                                                                                                               100%   12KB  21.8KB/s   00:00    
club_23_111111.png                                                                                                                               100%   16KB  20.5KB/s   00:00    
club_23_111114.png                                                                                                                               100%   11KB  17.1KB/s   00:00    
club_23_111130.png                                                                                                                               100% 3504     7.8KB/s   00:00    
club_23_111455.png                                                                                                                               100%   10KB  19.0KB/s   00:00    
club_23_111456.png                                                                                                                               100%   10KB  23.6KB/s   00:00    
club_23_111465.png                                                                                                                               100% 6825    14.5KB/s   00:00    
club_23_111975.png                                                                                                                               100%   16KB  25.9KB/s   00:00    
club_23_112659.png                                                                                                                               100%   16KB  24.3KB/s   00:00    
club_23_114154.png                                                                                                                               100%   30KB  32.2KB/s   00:00    
club_23_114578.png                                                                                                                               100%   12KB  18.1KB/s   00:00    
club_23_115517.png                                                                                                                               100%   10KB  19.9KB/s   00:00    
club_23_115693.png                                                                                                                               100%   11KB  18.1KB/s   00:00    
club_23_115935.png                                                                                                                               100%   16KB  22.3KB/s   00:00    
club_23_1318.png                                                                                                                                 100%   12KB  20.4KB/s   00:00    
club_23_1322.png                                                                                                                                 100% 9046    13.5KB/s   00:00    
club_23_1325.png                                                                                                                                 100% 7018    21.2KB/s   00:00    
club_23_1328.png                                                                                                                                 100%   13KB  19.7KB/s   00:00    
club_23_1335.png                                                                                                                                 100%   10KB  21.9KB/s   00:00    
club_23_1337.png                                                                                                                                 100%   15KB  15.6KB/s   00:00    
club_23_1352.png                                                                                                                                 100% 9952    26.8KB/s   00:00    
club_23_1354.png                                                                                                                                 100%   12KB  22.8KB/s   00:00    
club_23_1362.png                                                                                                                                 100% 9614    17.9KB/s   00:00    
club_23_1364.png                                                                                                                                 100% 8332    20.5KB/s   00:00    
club_23_1369.png                                                                                                                                 100%   15KB  22.4KB/s   00:00    
club_23_1370.png                                                                                                                                 100% 9234    22.1KB/s   00:00    
club_23_1375.png                                                                                                                                 100%   11KB  16.8KB/s   00:00    
club_23_1377.png                                                                                                                                 100% 7790    13.7KB/s   00:00    
club_23_1386.png                                                                                                                                 100%   16KB  21.8KB/s   00:00    
club_23_1387.png                                                                                                                                 100% 6063    16.9KB/s   00:00    
club_23_1598.png                                                                                                                                 100%   15KB  23.6KB/s   00:00    
club_23_dark_114578.png                                                                                                                          100%   12KB  15.3KB/s   00:00    
flags_23_128x128_10.png                                                                                                                          100% 2505    14.5KB/s   00:00    
flags_23_128x128_104.png                                                                                                                         100% 3190    12.8KB/s   00:00    
flags_23_128x128_111.png                                                                                                                         100% 1662     9.8KB/s   00:00    
flags_23_128x128_129.png                                                                                                                         100% 3186     9.2KB/s   00:00    
flags_23_128x128_14.png                                                                                                                          100% 1218     7.4KB/s   00:00    
flags_23_128x128_18.png                                                                                                                          100%  682     2.7KB/s   00:00    
flags_23_128x128_183.png                                                                                                                         100% 3642    11.1KB/s   00:00    
flags_23_128x128_21.png                                                                                                                          100%  683     4.8KB/s   00:00    
flags_23_128x128_34.png                                                                                                                          100%  760     4.2KB/s   00:00    
flags_23_128x128_36.png                                                                                                                          100% 1376     8.4KB/s   00:00    
flags_23_128x128_38.png                                                                                                                          100% 2381    14.5KB/s   00:00    
flags_23_128x128_4.png                                                                                                                           100%  725     6.4KB/s   00:00    
flags_23_128x128_45.png                                                                                                                          100% 2297    12.3KB/s   00:00    
flags_23_128x128_47.png                                                                                                                          100% 2545     8.0KB/s   00:00    
flags_23_128x128_52.png                                                                                                                          100% 1838    13.0KB/s   00:00    
flags_23_128x128_53.png                                                                                                                          100% 2012     8.4KB/s   00:00    
flags_23_128x128_54.png                                                                                                                          100% 3839    23.7KB/s   00:00    
flags_23_128x128_56.png                                                                                                                          100% 2222    13.5KB/s   00:00    
flags_23_128x128_57.png                                                                                                                          100% 2121    10.8KB/s   00:00    
flags_23_128x128_58.png                                                                                                                          100% 2406    14.9KB/s   00:00    
flags_23_128x128_59.png                                                                                                                          100% 3280    10.6KB/s   00:00    
flags_23_128x128_60.png                                                                                                                          100% 2547    12.7KB/s   00:00    
flags_23_128x128_61.png                                                                                                                          100% 2594    19.5KB/s   00:00    
flags_23_128x128_7.png                                                                                                                           100%  707     4.9KB/s   00:00    
flags_23_128x128_70.png                                                                                                                          100% 3037    12.8KB/s   00:00    
flags_23_128x128_83.png                                                                                                                          100% 2738    12.5KB/s   00:00    
flags_23_128x128_95.png                                                                                                                          100% 3879    20.0KB/s   00:00    
league_23_1003.png                                                                                                                               100% 9687    16.2KB/s   00:00    
league_23_1014.png                                                                                                                               100% 9750    18.2KB/s   00:00    
league_23_2118.png                                                                                                                               100%   12KB  21.3KB/s   00:00    
league_23_2267.png                                                                                                                               100%   11KB  17.2KB/s   00:00    
league_23_78.png                                                                                                                                 100%   11KB  16.3KB/s   00:00    
league_23_dark_1014.png                                                                                                                          100% 9629    26.0KB/s   00:00    
player_25_177003_TWG26_MM_314348d290d774e4.png                                                                                                   100%   14KB  27.3KB/s   00:00    
player_25_185427_TWG26_LIVE_6fc543cd98377522.png                                                                                                 100%   14KB  21.2KB/s   00:00    
player_25_190042_TWG26_ICON_2_e953a5d90e8538e7.png                                                                                               100%   15KB  29.6KB/s   00:00    
player_25_192505_TWG26_MM_2_461e8579fafd4ee0.png                                                                                                 100%   17KB  28.9KB/s   00:00    
player_25_193352_TWG26_MM_49451d310f7f00c1.png                                                                                                   100%   14KB  24.1KB/s   00:00    
player_25_200145_TWG26_MM_5931bf71a7eba4ef.png                                                                                                   100%   14KB  24.1KB/s   00:00    
player_25_202126_TWG26_MM_1fe3abe28a6d499c.png                                                                                                   100%   13KB  25.2KB/s   00:00    
player_25_202371_TWG26_LIVE_7461e4b53d914c0c.png                                                                                                 100%   12KB  16.7KB/s   00:00    
player_25_202811_TWG26_MM_234549aedff7b51b.png                                                                                                   100%   12KB  22.5KB/s   00:00    
player_25_203574_TWG26_LIVE_d48bc9e4b36ff227.png                                                                                                 100%   14KB  32.3KB/s   00:00    
player_25_204838_TWG26_MM_6ca5e8159de980bf.png                                                                                                   100%   16KB  22.3KB/s   00:00    
player_25_204923_TWG26_MM_a7c12fa91928665b.png                                                                                                   100%   13KB  21.2KB/s   00:00    
player_25_20801_TWG26_MM_e5f0c9d4c9696330.png                                                                                                    100%   36KB  29.9KB/s   00:01    
player_25_209331_TWG26_MM_7c9ac4a15784f4b0.png                                                                                                   100%   16KB  34.2KB/s   00:00    
player_25_211339.png                                                                                                                             100% 8107    27.8KB/s   00:00    
player_25_212067_TWG26_LIVE2_a152dbad99900480.png                                                                                                100%   17KB  19.4KB/s   00:00    
player_25_216393_TWG26_MM_d275e3b4284879df.png                                                                                                   100%   13KB  33.1KB/s   00:00    
player_25_217141_TWG26_MM_2_8429836f30c0e334.png                                                                                                 100%   16KB  23.0KB/s   00:00    
player_25_222357_TWG26_MM_83a4a8ada968944a.png                                                                                                   100%   15KB  26.4KB/s   00:00    
player_25_224179_PATCH_WC26_abce1301154b2fee.png                                                                                                 100% 8746    23.8KB/s   00:00    
player_25_227678_TWG26_MM_c2a153a04bca25b7.png                                                                                                   100%   12KB  28.7KB/s   00:00    
player_25_231207_TWG26_MM_68701f1d5320480c.png                                                                                                   100%   13KB  30.7KB/s   00:00    
player_25_231443_TWG26_MM_8211270cbef2ad45.png                                                                                                   100%   12KB  25.7KB/s   00:00    
player_25_231478_TWG26_MM_a9b0b4c3feb88a01.png                                                                                                   100%   14KB  36.1KB/s   00:00    
player_25_231866_TWG26_MM_f348508ccbd182cf.png                                                                                                   100%   14KB  36.9KB/s   00:00    
player_25_232514.png                                                                                                                             100% 7534    19.5KB/s   00:00    
player_25_233084_TWG26_MM_65a65c3a6fd57bba.png                                                                                                   100%   15KB  26.7KB/s   00:00    
player_25_234378_TWG26_MM_00ddc20788ff9da7.png                                                                                                   100%   13KB  14.7KB/s   00:00    
player_25_234577_TWG26_MM_5a6b0bcfab303b37.png                                                                                                   100%   14KB  18.9KB/s   00:00    
player_25_237068_TWG26_ICON_7ed32adc3ccd8bb9.png                                                                                                 100%   15KB  22.3KB/s   00:00    
player_25_237646_TWG26_LIVE_2_6699b898d2aaf3ec.png                                                                                               100%   16KB  26.8KB/s   00:00    
player_25_237678_TWG26_LIVE_64c79018fafd69c7.png                                                                                                 100%   16KB  27.8KB/s   00:00    
player_25_238581_TWG26_LIVE_f4aa40da1bc795fb.png                                                                                                 100%   15KB  27.7KB/s   00:00    
player_25_239522_TWG26_ICON_2_9092b9740fcffe59.png                                                                                               100%   13KB  20.6KB/s   00:00    
player_25_239604_TWG26_ICON_71b6d0f9d9e742e9.png                                                                                                 100%   14KB  24.6KB/s   00:00    
player_25_239837_TWG26_MM_533baa366f611b0d.png                                                                                                   100%   18KB  25.2KB/s   00:00    
player_25_241159_TWG26_MM_3226014b90159f47.png                                                                                                   100%   15KB  30.5KB/s   00:00    
player_25_241197_MOMENT26_LIVE_6f7466947265f8fe.png                                                                                              100%   15KB  22.6KB/s   00:00    
player_25_241461_TWG26_LIVE2_7f442cf2d1de11f9.png                                                                                                100%   16KB  24.2KB/s   00:00    
player_25_241637_TWG26_LIVE_44e71dfbd682182c.png                                                                                                 100%   13KB  23.0KB/s   00:00    
player_25_242380_MOMENTS26_LIVE_3537f1ef9c9e3fee.png                                                                                             100%   14KB  28.1KB/s   00:00    
player_25_242516_TWG26_MM_f01f0263729b954b.png                                                                                                   100%   15KB  38.4KB/s   00:00    
player_25_243481_PATCH_WC26_f6bd04d116fd41b4.png                                                                                                 100% 8344    19.2KB/s   00:00    
player_25_243576_TWG26_MM_5a9ed526fa37e5a1.png                                                                                                   100%   15KB  15.7KB/s   00:00    
player_25_244176_MOMENT26_LIVE_cc5bd0ef18ad752a.png                                                                                              100%   13KB  22.1KB/s   00:00    
player_25_244176_TWG26_MM_6fa370b141440f5b.png                                                                                                   100%   11KB  14.1KB/s   00:00    
player_25_244260_TWG26_MM_d4280a96be0acc8d.png                                                                                                   100%   14KB  15.6KB/s   00:00    
player_25_244305.png                                                                                                                             100% 8407    18.1KB/s   00:00    
player_25_245541_MOMENTS26_LIVE_a763e0ea3a2fc5d8.png                                                                                             100%   14KB  20.6KB/s   00:00    
player_25_246191_TWG26_MM_1702348e6a2f4ec2.png                                                                                                   100%   15KB  28.2KB/s   00:00    
player_25_246669_TWG26_MM_6287fd6488e93d81.png                                                                                                   100%   16KB  23.4KB/s   00:00    
player_25_247090_TWG26_MM_2_acd0a203eef4a743.png                                                                                                 100%   14KB  15.8KB/s   00:00    
player_25_247780.png                                                                                                                             100% 8190    30.6KB/s   00:00    
player_25_247827_TWG26_MM_dd1d501058736061.png                                                                                                   100%   14KB  27.1KB/s   00:00    
player_25_247883.png                                                                                                                             100% 8327    18.1KB/s   00:00    
player_25_248861.png                                                                                                                             100% 8555    18.0KB/s   00:00    
player_25_250723_TWG26_MM_d3f89689c34905ad.png                                                                                                   100%   14KB  23.7KB/s   00:00    
player_25_251566_TWG26_MM_642143089dd0a7fa.png                                                                                                   100%   13KB  29.5KB/s   00:00    
player_25_251804_TWG26_MM_9379f893e31851a8.png                                                                                                   100%   14KB  28.5KB/s   00:00    
player_25_251854_TWG26_MM_f8a4e48c32cf4c50.png                                                                                                   100%   15KB  29.8KB/s   00:00    
player_25_252371_TWG26_MM_44dce9aeaf70564e.png                                                                                                   100%   15KB  22.2KB/s   00:00    
player_25_253396_TWG26_LIVE_ba3e1731fb9d61b9.png                                                                                                 100%   12KB  16.3KB/s   00:00    
player_25_254131_PATCH2_08a6dcb19cbcb2c8.png                                                                                                     100% 7872    19.5KB/s   00:00    
player_25_254243_TWG26_LIVE_a437feb514fa63a6.png                                                                                                 100%   12KB  25.6KB/s   00:00    
player_25_254409.png                                                                                                                             100% 7704    30.4KB/s   00:00    
player_25_254571_TWG26_ICON_5657111dc3092119.png                                                                                                 100%   15KB  32.6KB/s   00:00    
player_25_254817_MOMENTS26_LIVE_3eadc458ec315544.png                                                                                             100%   14KB  31.8KB/s   00:00    
player_25_255125_TWG26_MM_7f7b60f410fc29bb.png                                                                                                   100%   15KB  25.2KB/s   00:00    
player_25_255434_TWG26_MM_986deef56338c8dd.png                                                                                                   100%   17KB  23.5KB/s   00:00    
player_25_256197_TWG26_MM_276672cd90c1bd0b.png                                                                                                   100%   15KB  20.1KB/s   00:00    
player_25_256630_TWG26_MM_12e21856df3f91ca.png                                                                                                   100%   13KB  18.0KB/s   00:00    
player_25_256903_TWG26_MM_2eb022fb27862b0c.png                                                                                                   100%   14KB  14.1KB/s   00:00    
player_25_257279_TWG26_MM_5615314857214395.png                                                                                                   100%   13KB  20.0KB/s   00:00    
player_25_258908_TWG26_MM_d186bb8e7389b0ed.png                                                                                                   100%   14KB  10.0KB/s   00:01    
player_25_25924_TWG26_ICON_6bd32f76f82cab14.png                                                                                                  100%   14KB  15.6KB/s   00:00    
player_25_261742_MOMENT26_LIVE_b56ab6710adbde0a.png                                                                                              100%   16KB  16.6KB/s   00:00    
player_25_262071_TWG26_LIVE_6ee548bfbea40969.png                                                                                                 100%   15KB  11.5KB/s   00:01    
player_25_262135_TWG26_LIVE2_cc406016c52107df.png                                                                                                100%   15KB  15.8KB/s   00:00    
player_25_262863_TWG26_MM_c478982bafb6be9f.png                                                                                                   100%   14KB  13.2KB/s   00:01    
player_25_264348_PATCH_WC26_927d1154472596d1.png                                                                                                 100% 7509    12.8KB/s   00:00    
player_25_265428.png                                                                                                                             100% 7054    13.1KB/s   00:00    
player_25_266837.png                                                                                                                             100% 7132    13.0KB/s   00:00    
player_25_267897_TWG26_ICON_406c24820f95043d.png                                                                                                 100%   13KB  16.6KB/s   00:00    
player_25_268514_TWG26_ICON_aee4a23f9af431a3.png                                                                                                 100%   12KB  18.6KB/s   00:00    
player_25_269161_TWG26_MM_c86fc58609507014.png                                                                                                   100%   17KB  18.0KB/s   00:00    
player_25_271421_TWG26_MM_5556d946c814e1be.png                                                                                                   100%   16KB  15.7KB/s   00:01    
player_25_275048_TWG26_LIVE_f4a4d889bc78077c.png                                                                                                 100%   14KB  19.4KB/s   00:00    
player_25_277643_TWG26_MM_cccbfd9f1c2e69ab.png                                                                                                   100%   14KB  19.6KB/s   00:00    
player_25_70289_TWG26_MM_dd1abe5a1de97b57.png                                                                                                    100%   15KB  23.7KB/s   00:00    
player_25_82329_TWG26_LIVE2_6984c8c9d4f6d0f8.png                                                                                                 100%   15KB  24.4KB/s   00:00    
skill_ANCHOR_2.png                                                                                                                               100% 1764     3.0KB/s   00:00    
skill_ATTACKING_FULLBACK_2.png                                                                                                                   100% 2058     9.7KB/s   00:00    
skill_BALANCED_2.png                                                                                                                             100% 1861    10.7KB/s   00:00    
skill_BALL_PLAYING_DEFENDER_2.png                                                                                                                100% 2189     8.8KB/s   00:00    
skill_BALL_WINNING_MIDFIELDER_2.png                                                                                                              100% 1595    10.0KB/s   00:00    
skill_BOX_TO_BOX_2.png                                                                                                                           100% 1434     6.9KB/s   00:00    
skill_COUNTER_2.png                                                                                                                              100% 2167    10.1KB/s   00:00    
skill_DEFENDING_2.png                                                                                                                            100% 1657     7.3KB/s   00:00    
skill_DEXTERITY_2.png                                                                                                                            100% 1360     6.5KB/s   00:00    
skill_DRIBBLING_2.png                                                                                                                            100% 2071     8.5KB/s   00:00    
skill_ENGANCHE_2.png                                                                                                                             100% 1526     6.7KB/s   00:00    
skill_FINISHER_2.png                                                                                                                             100% 1394     6.7KB/s   00:00    
skill_FULLBACK_2.png                                                                                                                             100% 1844     8.6KB/s   00:00    
skill_INVERTED_WINGER_2.png                                                                                                                      100% 1170     5.6KB/s   00:00    
skill_LIBERO_2.png                                                                                                                               100% 1526     8.7KB/s   00:00    
skill_NO_NONSENSE_CENTRE_BACK_2.png                                                                                                              100% 1268     7.6KB/s   00:00    
skill_NO_NONSENSE_FULLBACK_2.png                                                                                                                 100% 1364     5.5KB/s   00:00    
skill_PASSING_2.png                                                                                                                              100% 1499     9.2KB/s   00:00    
skill_PHYSICAL_2.png                                                                                                                             100% 1657     8.0KB/s   00:00    
skill_PLAYMAKER_2.png                                                                                                                            100% 1622     6.4KB/s   00:00    
skill_RAUMDEUTER_2.png                                                                                                                           100% 1962     9.6KB/s   00:00    
skill_S10_ADVANCE_FORWARD_3.png                                                                                                                  100% 3612    11.5KB/s   00:00    
skill_S10_ATTACKING_MIDFIELDER_3.png                                                                                                             100% 3535    12.4KB/s   00:00    
skill_S10_BALL_PLAYING_DEFENDER_3.png                                                                                                            100% 3479    14.4KB/s   00:00    
skill_S10_BOX_TO_BOX_3.png                                                                                                                       100% 3095    13.6KB/s   00:00    
skill_S10_CENTRE_BACK_3.png                                                                                                                      100% 3566     9.1KB/s   00:00    
skill_S10_COMPLETE_FULLBACK_3.png                                                                                                                100% 3590    10.6KB/s   00:00    
skill_S10_COMPLETE_WIDE_MIDFIELDER_3.png                                                                                                         100% 3390    14.5KB/s   00:00    
skill_S10_CROSSING_3.png                                                                                                                         100% 3614     9.9KB/s   00:00    
skill_S10_DEEP_LYING_PLAYMAKER_3.png                                                                                                             100% 3675    14.8KB/s   00:00    
skill_S10_DEFENDER_3.png                                                                                                                         100% 3621    16.0KB/s   00:00    
skill_S10_DEFENDING_3.png                                                                                                                        100% 3188    15.3KB/s   00:00    
skill_S10_DEFENSIVE_MIDFIELDER_3.png                                                                                                             100% 3546    16.4KB/s   00:00    
skill_S10_DRIBBLING_3.png                                                                                                                        100% 3398    15.4KB/s   00:00    
skill_S10_FALSEBACK_3.png                                                                                                                        100% 3327    20.1KB/s   00:00    
skill_S10_FALSE_NINE_3.png                                                                                                                       100% 3323    16.5KB/s   00:00    
skill_S10_FULLBACK_3.png                                                                                                                         100% 3610    13.8KB/s   00:00    
skill_S10_GK_PASSING_3.png                                                                                                                       100% 3628    19.4KB/s   00:00    
skill_S10_GK_RUSH_3.png                                                                                                                          100% 3524    10.9KB/s   00:00    
skill_S10_GOAL_KEEPER_3.png                                                                                                                      100% 3399    15.8KB/s   00:00    
skill_S10_HALF_WINGER_3.png                                                                                                                      100% 3655    16.9KB/s   00:00    
skill_S10_HEADER_3.png                                                                                                                           100% 3552    14.4KB/s   00:00    
skill_S10_HIGHBALLS_3.png                                                                                                                        100% 3676    11.1KB/s   00:00    
skill_S10_HOLDING_3.png                                                                                                                          100% 3602    17.2KB/s   00:00    
skill_S10_INVERTED_WINGER_3.png                                                                                                                  100% 3421    10.2KB/s   00:00    
skill_S10_LONG_SHOT_3.png                                                                                                                        100% 3499    15.9KB/s   00:00    
skill_S10_PASSING_3.png                                                                                                                          100% 3401    20.4KB/s   00:00    
skill_S10_PHYSICAL_3.png                                                                                                                         100% 3239    15.8KB/s   00:00    
skill_S10_PLAYMAKER_3.png                                                                                                                        100% 3066    15.2KB/s   00:00    
skill_S10_POACHER_3.png                                                                                                                          100% 3592    18.2KB/s   00:00    
skill_S10_SHADOW_STRIKER_3.png                                                                                                                   100% 3439    14.2KB/s   00:00    
skill_S10_SHOOTING_3.png                                                                                                                         100% 3563    17.5KB/s   00:00    
skill_S10_SHOT_STOPPER_3.png                                                                                                                     100% 3382    10.6KB/s   00:00    
skill_S10_STRIKER_3.png                                                                                                                          100% 3626    18.1KB/s   00:00    
skill_S10_SWEEPER_KEEPER_3.png                                                                                                                   100% 3314    14.5KB/s   00:00    
skill_S10_TARGET_FORWARD_3.png                                                                                                                   100% 3236    11.6KB/s   00:00    
skill_S10_TRADITIONAL_WINGER_3.png                                                                                                               100% 3620    22.8KB/s   00:00    
skill_S10_WIDE_MIDFIELDER_3.png                                                                                                                  100% 3482    18.6KB/s   00:00    
skill_S10_WIDE_PLAYMAKER_3.png                                                                                                                   100% 3472    14.6KB/s   00:00    
skill_S10_WINGBACK_3.png                                                                                                                         100% 3423    10.7KB/s   00:00    
skill_S10_WINGER_3.png                                                                                                                           100% 3543    11.5KB/s   00:00    
skill_SHADOW_STRIKER_2.png                                                                                                                       100% 2156    10.6KB/s   00:00    
skill_SHOOTING_2.png                                                                                                                             100% 2147     9.4KB/s   00:00    
skill_TARGET_MAN_2.png                                                                                                                           100% 1687     9.8KB/s   00:00    
skill_WIDE_MIDFIELDER_2.png                                                                                                                      100% 1801     5.5KB/s   00:00    
skill_WIDE_TARGET_MAN_2.png                                                                                                                      100% 1546     1.9KB/s   00:00    
skillmovelogo_23_0.png                                                                                                                           100% 1195     9.8KB/s   00:00    
traitlogo_23_1.png                                                                                                                               100% 1958    12.4KB/s   00:00    
traitlogo_23_10.png                                                                                                                              100% 1679     7.2KB/s   00:00    
traitlogo_23_12.png                                                                                                                              100% 1976     8.0KB/s   00:00    
traitlogo_23_13.png                                                                                                                              100% 2299     9.1KB/s   00:00    
traitlogo_23_14.png                                                                                                                              100% 1909     5.4KB/s   00:00    
traitlogo_23_15.png                                                                                                                              100% 1976     9.5KB/s   00:00    
traitlogo_23_16.png                                                                                                                              100% 1792     8.9KB/s   00:00    
traitlogo_23_17.png                                                                                                                              100% 2102    10.0KB/s   00:00    
traitlogo_23_18.png                                                                                                                              100% 1967    12.0KB/s   00:00    
traitlogo_23_2.png                                                                                                                               100% 1743     9.6KB/s   00:00    
traitlogo_23_21.png                                                                                                                              100% 1372     6.7KB/s   00:00    
traitlogo_23_22.png                                                                                                                              100% 1770     9.2KB/s   00:00    
traitlogo_23_23.png                                                                                                                              100% 2164     6.7KB/s   00:00    
traitlogo_23_25.png                                                                                                                              100% 2032     7.0KB/s   00:00    
traitlogo_23_7.png                                                                                                                               100% 1955     9.3KB/s   00:00    

