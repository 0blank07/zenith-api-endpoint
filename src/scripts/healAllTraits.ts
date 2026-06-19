import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function healAllTraits() {
    const db = new PostgresService();
    const search = new SearchService();
    const pool = (db as any).pool;

    try {
        logger.info('Finding players with missing traits URLs...');
        
        // Find players where traits is null or empty, but traits_name is not empty
        // This ensures we only target players who actually have traits, but are missing the URLs.
        const result = await pool.query(`
            SELECT DISTINCT player_id 
            FROM player_stats 
            WHERE (traits IS NULL OR traits = '') 
              AND (traits_name IS NOT NULL AND traits_name != '')
        `);
        
        const assetIds: number[] = result.rows.map((row: any) => Number(row.player_id));
        logger.info(`Found ${assetIds.length} players needing trait URL healing.`);
        
        if (assetIds.length === 0) {
            logger.info('Database is already fully healed.');
            return;
        }

        const batchSize = 100;
        let healedCount = 0;

        for (let i = 0; i < assetIds.length; i += batchSize) {
            const batch = assetIds.slice(i, i + batchSize);
            logger.info(`Fetching batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(assetIds.length / batchSize)}...`);
            
            const players = await search.getPlayersByAssetIds(batch);
            if (players.length > 0) {
                logger.info(`Saving ${players.length} players to database...`);
                await db.savePlayers(players);
                healedCount += players.length;
            } else {
                logger.warn(`Failed to fetch any players for batch.`);
            }
        }
        
        logger.info(`Successfully healed traits for ${healedCount} players!`);

    } catch (error: any) {
        logger.error(`Failed to heal all traits: ${error.message}`);
    } finally {
        // Assume process will exit when done, but try to disconnect safely
        try {
           await pool.end();
        } catch(e){}
        process.exit(0);
    }
}

healAllTraits();
