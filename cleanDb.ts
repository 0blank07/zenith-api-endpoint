import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';
import logger from './src/utils/logger';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;

  const invalidPlaystyles = ['None', 'Unknown'];

  logger.info('Cleaning up None and Unknown playstyles from the database...');

  // Delete from player_playstyles
  const res1 = await pool.query(`
    DELETE FROM player_playstyles 
    WHERE playstyle_name = ANY($1)
  `, [invalidPlaystyles]);
  logger.info(`Deleted ${res1.rowCount} invalid entries from player_playstyles.`);

  // Delete from playstyles_catalog
  const res2 = await pool.query(`
    DELETE FROM playstyles_catalog 
    WHERE name = ANY($1)
  `, [invalidPlaystyles]);
  logger.info(`Deleted ${res2.rowCount} invalid entries from playstyles_catalog.`);

  await pool.end();
}

run().catch(console.error);
