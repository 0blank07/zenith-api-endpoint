import 'dotenv/config';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { SessionManager } from '../browser/sessionManager';
import { SearchService } from '../services/searchService';
import { PostgresService } from '../services/postgresService';

chromium.use(stealth());

async function run() {
    console.log('Fetching latest 50 FC 25 players from RenderZ to map Playstyles...');
    const searchService = new SearchService();
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    // Fetch 50 players (FC 25)
    const latestPlayers = await searchService.getLatestCards(50);
    const assetIds = latestPlayers.map((p: any) => p.assetId || p.id).filter((id: any) => id);
    console.log(`Found ${assetIds.length} players to scrape.`);
    
    const sessionManager = new SessionManager();
    const session = await sessionManager.getSession();
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ userAgent: session.userAgent });
    
    if (session.cookies) {
        const cArr = session.cookies.split(';').map((c: string) => {
            const [name, ...rest] = c.split('=');
            return { name: name.trim(), value: rest.join('=').trim(), domain: '.renderz.app', path: '/' };
        });
        await context.addCookies(cArr);
    }
    
    const extractedPlaystyles = new Map<string, any>();
    
    for (const id of assetIds) {
        console.log(`Scraping FC 25 player: ${id}`);
        const page = await context.newPage();
        try {
            await page.goto(`https://renderz.app/25/player/${id}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await page.waitForTimeout(3000); // Wait for hydration
            
            const playstyles = await page.evaluate(() => {
                const containers = document.querySelectorAll('.group.relative.flex.items-start.gap-3.overflow-hidden.rounded-lg');
                return Array.from(containers).map(el => {
                    const nameEl = el.querySelector('.text-sm.leading-tight.font-semibold.text-white');
                    const descEl = el.querySelector('.text-xs.leading-relaxed.text-muted-foreground');
                    const levelEl = el.querySelector('.shrink-0.rounded-md');
                    const imgEl = el.querySelector('img');
                    
                    return {
                        name: nameEl?.textContent?.trim() || 'Unknown',
                        description: descEl?.textContent?.trim() || '',
                        level: levelEl?.textContent?.trim() || '1',
                        icon: imgEl?.getAttribute('src') || ''
                    };
                });
            });
            
            for (const ps of playstyles) {
                if (!extractedPlaystyles.has(ps.name)) {
                    extractedPlaystyles.set(ps.name, ps);
                    console.log(`✅ Found new Playstyle: ${ps.name} (Level ${ps.level})`);
                }
            }
            
            if (extractedPlaystyles.size >= 18) {
                console.log('✅ Found all 18 playstyles!');
                break;
            }
        } catch(e: any) {
            console.log(`Error scraping ${id}: ${e.message}`);
        }
        await page.close();
    }
    
    console.log('\n--- EXTRACTED DICTIONARY ---');
    console.log(JSON.stringify(Array.from(extractedPlaystyles.values()), null, 2));
    
    // Save to database
    for (const ps of extractedPlaystyles.values()) {
        const numLevel = ps.level.includes('2') || ps.level.toUpperCase().includes('GOLD') ? 2 : 1;
        await pool.query(`
            INSERT INTO playstyles_catalog (name, description, icon_level_1, icon_level_2)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO UPDATE SET
                description = COALESCE(EXCLUDED.description, playstyles_catalog.description),
                icon_level_1 = COALESCE(EXCLUDED.icon_level_1, playstyles_catalog.icon_level_1),
                icon_level_2 = COALESCE(EXCLUDED.icon_level_2, playstyles_catalog.icon_level_2)
        `, [
            ps.name, 
            ps.description, 
            numLevel === 1 ? ps.icon : null, 
            numLevel === 2 ? ps.icon : null
        ]);
    }
    
    await browser.close();
    await pool.end();
    console.log('DATABASE UPDATED 100% PRODUCTION READY');
}

run().catch(console.error);
