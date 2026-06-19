import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import logger from '../utils/logger';

async function fixPlaystyles() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    try {
        logger.info('Deleting fake playstyles from player_playstyles...');
        await pool.query(`
            DELETE FROM player_playstyles 
            WHERE playstyle_name IN ('Clinical Finisher', 'Play Maker', 'GK Long Thrower')
        `);

        logger.info('Deleting fake playstyles from playstyles_catalog...');
        await pool.query(`
            DELETE FROM playstyles_catalog 
            WHERE name IN ('Clinical Finisher', 'Play Maker', 'GK Long Thrower')
        `);

        logger.info('Updating real playstyles with correct descriptions...');
        await pool.query(`
            UPDATE playstyles_catalog 
            SET description = 'Performs finesse shots with additional curve and improved accuracy.'
            WHERE name = 'Finesse Shot'
        `);

        await pool.query(`
            UPDATE playstyles_catalog 
            SET description = 'Reaches a higher sprint speed while dribbling and has a reduced chance of an error when sprinting or performing knock-ons.'
            WHERE name = 'Rapid'
        `);

        logger.info('Fix complete!');
    } catch (e: any) {
        logger.error(`Error: ${e.message}`);
    } finally {
        await pool.end();
    }
}

fixPlaystyles();
