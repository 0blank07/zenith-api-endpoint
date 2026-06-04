import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function healCorruptedSkills() {
    const db = new PostgresService();
    const search = new SearchService();
    const pool = (db as any).pool;
    
    try {
        logger.info('Identifying players with corrupted skill requirements...');
        const res = await pool.query(`
            SELECT DISTINCT player_id 
            FROM player_available_skills 
            WHERE unlock_requirement_skillname LIKE '%Skill ID%'
        `);
        const brokenIds = res.rows.map((r: any) => Number(r.player_id));
        
        logger.info(`Found ${brokenIds.length} broken players. Starting fast-healing process...`);
        
        const BATCH_SIZE = 100;
        for (let i = 0; i < brokenIds.length; i += BATCH_SIZE) {
            const batch = brokenIds.slice(i, i + BATCH_SIZE);
            logger.info(`--- HEALING BATCH ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(brokenIds.length / BATCH_SIZE)} (${batch.length} players) ---`);
            
            // Delete bad data first to ensure clean insert
            await pool.query('DELETE FROM skill_level_boosts WHERE player_id = ANY($1::bigint[])', [batch]);
            await pool.query('DELETE FROM player_available_skills WHERE player_id = ANY($1::bigint[])', [batch]);
            
            // Fetch fast and save
            const players = await search.getPlayersByAssetIds(batch);
            if (players.length > 0) {
                await db.savePlayers(players);
                logger.info(`Batch healed.`);
            }
        }
        
        logger.info('Healing process complete!');
    } catch (error: any) {
        logger.error(`Healing failed: ${error.message}`);
    } finally {
        await db.disconnect();
    }
}

healCorruptedSkills();