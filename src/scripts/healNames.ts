import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { cleanName, getTraitTitle } from '../utils/dataCleaner';
import logger from '../utils/logger';
import format from 'pg-format';

async function healNames() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    try {
        logger.info('Starting mass name healing for Nations, Clubs, Leagues, Events and Traits...');
        
        // Fetch existing records that match the bad patterns or are numeric-only (raw IDs)
        const result = await pool.query(`
            SELECT player_id, rank, training_level, team, nation_region, event, traits_name 
            FROM player_stats 
            WHERE team LIKE 'TeamName_%' 
               OR nation_region LIKE 'NationName_%' 
               OR event LIKE 'PROGRAM_%' 
               OR traits_name LIKE '%_name_%'
               OR traits_name LIKE '%trait_name_%'
               OR team ~ '^[0-9]+$'
               OR nation_region ~ '^[0-9]+$'
        `);
        
        const rows = result.rows;
        logger.info(`Found ${rows.length} rows with unmapped codes. Translating now...`);
        
        let updatedCount = 0;
        const BATCH_SIZE = 1000;
        
        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
            const batch = rows.slice(i, i + BATCH_SIZE);
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                
                const updateValues = batch.map((row: any) => {
                    const cleanedTeam = cleanName(row.team, undefined, 'club');
                    const cleanedNation = cleanName(row.nation_region, undefined, 'nation');
                    const cleanedEvent = cleanName(row.event, undefined, 'program');
                    
                    const traitsArray = (row.traits_name || '').split(',').filter(Boolean);
                    const cleanedTraits = traitsArray.map((t: string) => {
                         const match = t.match(/\d+/);
                         const id = match ? parseInt(match[0]) : 0;
                         return getTraitTitle(id, t);
                    }).join(',');
                    
                    return [row.player_id, row.rank, row.training_level, cleanedTeam, cleanedNation, cleanedEvent, cleanedTraits];
                });
                
                const updateQuery = format(`
                    UPDATE player_stats AS p
                    SET team = v.team,
                        nation_region = v.nation_region,
                        event = v.event,
                        traits_name = v.traits_name
                    FROM (VALUES %L) AS v(player_id, rank, training_level, team, nation_region, event, traits_name)
                    WHERE p.player_id = v.player_id::bigint AND p.rank = v.rank::int AND p.training_level = v.training_level::int
                `, updateValues);

                await client.query(updateQuery);
                
                await client.query('COMMIT');
                updatedCount += batch.length;
                logger.info(`Updated ${updatedCount}/${rows.length} records instantly...`);
            } catch (err: any) {
                await client.query('ROLLBACK');
                logger.error(`Batch failed: ${err.message}`);
            } finally {
                client.release();
            }
        }
        
        logger.info('Mass translation healing complete!');
    } catch (error: any) {
        logger.error(`Fatal error during mass healing: ${error.message}`);
    } finally {
        await db.disconnect();
    }
}

healNames();