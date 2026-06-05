import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function healDb() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    console.log('Fixing corrupted Ligue 1 Spurs players...');
    
    // Fix Dembele, Nuno Mendes, Vitinha, etc.
    const resClub = await pool.query(`
        UPDATE player_stats
        SET team = 'Paris Saint-Germain'
        WHERE team = 'Spurs' AND league = 'Ligue 1'
    `);
    console.log("Updated " + resClub.rowCount + " players' club.");

    // Fix League Names globally
    const resLeague = await pool.query(`
        UPDATE player_stats
        SET league = 'Ligue 1 Uber Eats'
        WHERE league = 'Ligue 1'
    `);
    console.log("Updated " + resLeague.rowCount + " players' league.");

    // Check Dembele again
    const dem = await pool.query(`
        SELECT player_id, name, team, league, nation_region, event 
        FROM player_stats 
        WHERE name ILIKE '%Dembele%' OR name = 'Dembélé'
        LIMIT 5
    `);
    console.table(dem.rows);

    await db.disconnect();
}

healDb().catch(console.error);