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
                    event: document.querySelector('.player_info_program_name')?.textContent?.trim() || '',
                    playstyles: (() => {
                        const container = document.querySelector('.flex.gap-2.w-full.flex-wrap.justify-center.pb-4');
                        if (!container) return [];
                        return Array.from(container.querySelectorAll(':scope > div'))
                          .map(card => {
                             const img = card.querySelector('img.relative.z-0.h-auto.max-w-full') ?? card.querySelector('img');
                             const src = img?.getAttribute('src') || '';
                             if (!src.includes('playstyle_')) return null;
                             const text = card.textContent?.replace(/\s+/g, ' ').trim() || '';
                             return { name: text, icon: src };
                          })
                          .filter(Boolean);
                    })()
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

            if (data.playstyles && data.playstyles.length > 0) {
                for (let i = 0; i < data.playstyles.length; i++) {
                    const ps = data.playstyles[i];
                    if (!ps) continue;
                    let parsedLevel = 1;
                    if (data.playstyles.length === 2) {
                        parsedLevel = i === 0 ? 2 : 1;
                    } else {
                        if (ps.icon?.includes('GOLD')) parsedLevel = 2;
                    }
                    
                    await pool.query(`
                        INSERT INTO playstyles_catalog (name, icon_level_1, icon_level_2)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (name) DO UPDATE SET
                            icon_level_1 = COALESCE(EXCLUDED.icon_level_1, playstyles_catalog.icon_level_1),
                            icon_level_2 = COALESCE(EXCLUDED.icon_level_2, playstyles_catalog.icon_level_2)
                    `, [ps.name, parsedLevel === 1 ? ps.icon : null, parsedLevel === 2 ? ps.icon : null]);

                    await pool.query(`
                        INSERT INTO player_playstyles (player_id, playstyle_name, level)
                        VALUES ($1, $2, $3)
                        ON CONFLICT (player_id, playstyle_name) DO UPDATE SET
                            level = EXCLUDED.level
                    `, [assetId, ps.name, parsedLevel]);
                }
                console.log(`   ✅ Playstyles Updated for ${assetId}`);
            }

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
                console.log(`   ❌ Could not extract team/league data for ${assetId}`);
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
    3114943, // Eusebio 120
    24044746, // Bruno 120
    24044736, // Messi 119
    24044734, // CR7 119
    24046004, // Dembele 120
    24044716, // Lamine Yamal 119
    24005126, // Lienhart 109
    24045501, // CR7 116
    24045504  // Messi 116
];

forceHealPlayers(playersToFix).catch(console.error);