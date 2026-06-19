import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import logger from '../utils/logger';

async function cleanupBogusPlaystyles() {
    const db = new PostgresService();
    const pool = (db as any).pool;

    try {
        logger.info('Cleaning up bogus playstyles (traits/celebrations/skillmoves) from player_playstyles...');
        
        const deletePlayerPlaystyles = await pool.query(`
            DELETE FROM player_playstyles 
            WHERE playstyle_name ILIKE 'trait_name_%' 
               OR playstyle_name ILIKE 'celebration_name_%'
               OR playstyle_name ILIKE 'skillmove_name_%'
        `);
        logger.info(`Deleted ${deletePlayerPlaystyles.rowCount} rows from player_playstyles.`);

        logger.info('Cleaning up bogus playstyles from playstyles_catalog...');
        const deleteCatalog = await pool.query(`
            DELETE FROM playstyles_catalog 
            WHERE name ILIKE 'trait_name_%' 
               OR name ILIKE 'celebration_name_%'
               OR name ILIKE 'skillmove_name_%'
        `);
        logger.info(`Deleted ${deleteCatalog.rowCount} rows from playstyles_catalog.`);

        logger.info('Cleanup complete!');
    } catch (error: any) {
        logger.error(`Cleanup failed: ${error.message}`);
    } finally {
        try {
           await pool.end();
        } catch(e) {}
        process.exit(0);
    }
}

cleanupBogusPlaystyles();
