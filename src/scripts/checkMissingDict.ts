import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SKILL_BOOSTS } from '../utils/dataCleaner';

async function checkMissing() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    const r = await pool.query(`
        SELECT DISTINCT skill_id 
        FROM player_available_skills 
        WHERE unlock_requirement_skillname LIKE '%Skill ID%'
    `);
    
    const badSkillIds = r.rows.map((row: any) => row.skill_id);
    console.log(`Found ${badSkillIds.length} unique skills in the DB with 'Skill ID' requirements.`);
    
    let missingFromDict = 0;
    for (const id of badSkillIds) {
        if (!SKILL_BOOSTS[id] || !SKILL_BOOSTS[id].requirement) {
            missingFromDict++;
            console.log(`Skill ${id} is still completely missing from local dictionary!`);
        }
    }
    
    console.log(`${missingFromDict} out of ${badSkillIds.length} bad skills are missing from local dict.`);
    await db.disconnect();
}
checkMissing();