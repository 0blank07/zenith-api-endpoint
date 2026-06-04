import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function healCarlosAlberto() {
    const db = new PostgresService();
    const search = new SearchService();
    
    try {
        const targetId = 30916807; // Carlos Alberto
        logger.info(`Force healing specific player: ${targetId}`);
        
        const player = await search.getByAssetId(targetId);
        
        if (player) {
            logger.info(`Resaving player to forcefully pull dynamic skill data...`);
            
            // Delete existing boosts for this player to force a clean insert
            const pool = (db as any).pool;
            await pool.query('DELETE FROM skill_level_boosts WHERE player_id = $1', [targetId]);
            await pool.query('DELETE FROM player_available_skills WHERE player_id = $1', [targetId]);
            
            await db.savePlayers([player]);
            logger.info(`Player healed.`);
        } else {
             logger.warn('Player not found on RenderZ.');
        }
    } catch (error: any) {
        logger.error(`Healing failed: ${error.message}`);
    } finally {
        await db.disconnect();
    }
}

healCarlosAlberto();
