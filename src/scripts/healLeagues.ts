import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';
import format from 'pg-format';
import { cleanName } from '../utils/dataCleaner';

async function healLeagues() {
    const db = new PostgresService();
    const search = new SearchService();
    const pool = (db as any).pool;
    
    try {
        logger.info('Starting mass healing for League column...');
        
        // Fetch existing records that don't have a league or have 'Unknown'
        // Actually, since league wasn't populated at all before, it will be NULL or empty
        const result = await pool.query(`
            SELECT DISTINCT player_id
            FROM player_stats 
            WHERE league IS NULL OR league = '' OR league = 'Unknown'
        `);
        
        const ids = result.rows.map((row: any) => parseInt(row.player_id));
        logger.info(`Found ${ids.length} players needing league data. Translating now...`);
        
        let updatedCount = 0;
        const BATCH_SIZE = 100; // Fetching from Search API
        
        for (let i = 0; i < ids.length; i += BATCH_SIZE) {
            const batchIds = ids.slice(i, i + BATCH_SIZE);
            const client = await pool.connect();
            
            try {
                // We must fetch from SearchService because the league might only be in the source payload
                // Wait, if league was in player.league?.name, maybe it's in raw_data if we stored it?
                // Let's just fetch it quickly using getPlayersByAssetIds
                const players = await search.getPlayersByAssetIds(batchIds);
                
                await client.query('BEGIN');
                
                const updateValues = players.map(p => [
                    p.assetId,
                    cleanName(p.league?.name, p.league?.id, 'league') || 'Unknown'
                ]);
                
                if (updateValues.length > 0) {
                    const updateQuery = format(`
                        UPDATE player_stats AS p
                        SET league = v.league
                        FROM (VALUES %L) AS v(player_id, league)
                        WHERE p.player_id = v.player_id::bigint
                    `, updateValues);

                    await client.query(updateQuery);
                }
                
                await client.query('COMMIT');
                updatedCount += players.length;
                logger.info(`Updated ${updatedCount}/${ids.length} players...`);
            } catch (err: any) {
                await client.query('ROLLBACK');
                logger.error(`Batch failed: ${err.message}`);
            } finally {
                client.release();
            }
        }
        
        logger.info('League healing complete!');
    } catch (error: any) {
        logger.error(`Fatal error during mass healing: ${error.message}`);
    } finally {
        await db.disconnect();
    }
}

healLeagues();