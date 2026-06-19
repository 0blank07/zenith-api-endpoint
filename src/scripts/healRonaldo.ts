import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function healRonaldo() {
    const db = new PostgresService();
    const search = new SearchService();
    
    try {
        const targetId = 30903786; // Ronaldo
        logger.info(`Force healing specific player: ${targetId}`);
        
        const player = await search.getByAssetId(targetId);
        
        if (player) {
            logger.info(`Resaving player to forcefully pull traits...`);
            
            await db.savePlayers([player]);
            logger.info(`Player healed.`);
        } else {
             logger.warn('Player not found on RenderZ.');
        }
    } catch (error: any) {
        logger.error(`Healing failed: ${error.message}`);
    }
}

healRonaldo();
