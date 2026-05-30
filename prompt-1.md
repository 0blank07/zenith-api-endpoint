2026-05-30T18:57:50.016Z [info]: Searching with options: {"sortBy":"added","sortOrder":"desc","size":55} 
2026-05-30T18:57:50.026Z [info]: Using cached session data 
2026-05-30T18:57:50.984Z [warn]: Attempt 1 failed: SESSION_BLOCKED. Retrying in 2000ms... 
2026-05-30T18:57:53.000Z [info]: Using cached session data 
2026-05-30T18:57:53.631Z [warn]: Attempt 2 failed: SESSION_BLOCKED. Retrying in 4000ms... 
2026-05-30T18:57:57.636Z [info]: Using cached session data 
2026-05-30T18:57:57.746Z [warn]: Attempt 3 failed: SESSION_BLOCKED. Retrying in 8000ms... 
2026-05-30T18:57:57.747Z [warn]: Axios blocked. Switching to SSR method... 
2026-05-30T18:57:58.459Z [info]: SSR Scrape: Navigating to https://renderz.app/24/players?sortBy=added&sortOrder=desc... 
2026-05-30T18:58:09.002Z [info]: SSR Intercept successful! Caught 40 players from network. 


After Attempt 3 failed: SESSION_BLOCKED. Retrying in 8000ms.. I think we should wait like there should be 
attempt 4.
then we can switching to ssr method

and if I run: npx ts-node src/index.ts latest -s 200 then it should give me 200 players card data
not 40 players card data only, I write npx ts-node src/index.ts latest -s 500 then 500 latest player data 
I should get no 40 players card data.

I know what you said that renderz have 40 players each page then after 40 players change the page to
next page and extract another 40 so on till what I said in the npx ts-node src/index.ts latest -s 200
you just have to go to next page and extract 40 then next page 40 until 200 completes

is this possible don't implement tell me in simple summary