import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function check() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    const r1 = await pool.query(`SELECT COUNT(*) FROM player_available_skills WHERE unlock_requirement_skillname LIKE '%Skill ID%'`);
    const r2 = await pool.query(`SELECT COUNT(*) FROM player_available_skills WHERE unlock_requirement_skillname LIKE '%NAME_SKILL%'`);
    
    console.log(`Bad "Skill ID": ${r1.rows[0].count}`);
    console.log(`Bad "NAME_SKILL": ${r2.rows[0].count}`);
    
    // Let's get distinct player IDs that need healing
    const broken = await pool.query(`
        SELECT DISTINCT player_id 
        FROM player_available_skills 
        WHERE unlock_requirement_skillname LIKE '%Skill ID%' 
        OR unlock_requirement_skillname LIKE '%NAME_SKILL%'
    `);
    console.log(`Total broken players: ${broken.rows.length}`);
    await db.disconnect();
}
check();
