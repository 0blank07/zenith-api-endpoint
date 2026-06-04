import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function healBrokenPlayers() {
    const db = new PostgresService();
    const search = new SearchService();
    const pool = (db as any).pool;
    
    try {
        logger.info('Identifying players that are missing rank 5 data...');
        const res = await pool.query('SELECT DISTINCT player_id FROM player_stats WHERE player_id NOT IN (SELECT player_id FROM player_stats WHERE rank = 5)');
        const brokenIds = res.rows.map((r: any) => Number(r.player_id));
        
        logger.info(`Found ${brokenIds.length} broken players. Starting healing process...`);
        
        const BATCH_SIZE = 100;
        for (let i = 0; i < brokenIds.length; i += BATCH_SIZE) {
            const batch = brokenIds.slice(i, i + BATCH_SIZE);
            logger.info(`--- HEALING BATCH ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(brokenIds.length / BATCH_SIZE)} (${batch.length} players) ---`);
            
            const players = await search.getPlayersByAssetIds(batch);
            
            if (players.length > 0) {
                logger.info(`Resaving ${players.length} players to populate Ranks 1-5 and Skills Catalog...`);
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

healBrokenPlayers();
