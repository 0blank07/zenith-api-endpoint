import 'dotenv/config';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { PostgresService } from '../services/postgresService';
import { cleanName } from '../utils/dataCleaner';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

async function forceHealPlayers(assetIds: number[]) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const db = new PostgresService();
    const pool = (db as any).pool;

    console.log(`\n🚀 STARTING FORCE HEAL FOR ${assetIds.length} PLAYERS...\n`);

    for (const assetId of assetIds) {
        try {
            console.log(`🔍 Processing Asset ID: ${assetId} ...`);
            const url = `https://renderz.app/24/player/${assetId}`;
            
            await page.goto(url, { waitUntil: 'networkidle' });
            
            // Extract the metadata using Evaluate
            const data = await page.evaluate(() => {
                const labels = Array.from(document.querySelectorAll('div')).filter(d => d.innerText && d.innerText.toUpperCase() === d.innerText && d.innerText.length > 2);
                
                const getVal = (label: string) => {
                    const el = Array.from(document.querySelectorAll('div')).find(d => d.innerText === label);
                    if (el && el.parentElement) {
                        const valEl = el.parentElement.querySelector('div:last-child');
                        return valEl ? (valEl as HTMLElement).innerText : null;
                    }
                    return null;
                };

                return {
                    team: getVal('TEAM'),
                    league: getVal('LEAGUE'),
                    nation: getVal('NATION/REGION'),
                    event: document.querySelector('.player_info_program_name')?.textContent?.trim() || ''
                };
            });

            if (!data.team || !data.league) {
                // Fallback attempt to find by text if selectors fail
                const bodyText = await page.innerText('body');
                const teamMatch = bodyText.match(/TEAM\n([^\n]+)/i);
                const leagueMatch = bodyText.match(/LEAGUE\n([^\n]+)/i);
                if (teamMatch) data.team = teamMatch[1].trim();
                if (leagueMatch) data.league = leagueMatch[1].trim();
            }

            console.log(`   Found: Team=${data.team}, League=${data.league}, Nation=${data.nation}`);

            if (data.team && data.league) {
                const cleanTeam = cleanName(data.team, undefined, 'club');
                const cleanLeague = cleanName(data.league, undefined, 'league');
                const cleanNation = cleanName(data.nation || '', undefined, 'nation');

                const res = await pool.query(`
                    UPDATE player_stats 
                    SET team = $1, league = $2, nation_region = $3
                    WHERE player_id = $4
                `, [cleanTeam, cleanLeague, cleanNation, assetId]);

                console.log(`   ✅ Database Updated: ${res.rowCount} rows fixed.`);
            } else {
                console.log(`   ❌ Could not extract data for ${assetId}`);
            }

        } catch (error: any) {
            console.error(`   ❌ Error processing ${assetId}: ${error.message}`);
        }
    }

    await browser.close();
    await db.disconnect();
    console.log('\n✨ FORCE HEAL COMPLETE!\n');
}

// User provided Asset IDs
const playersToFix = [
    24044736, // Messi 119
    24044734, // CR7 119
    24046004, // Dembele 120
    24044716, // Lamine Yamal 119
    24005126, // Lienhart 109
    24045501, // CR7 116
    24045504  // Messi 116
];

forceHealPlayers(playersToFix).catch(console.error);