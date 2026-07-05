import 'dotenv/config';
import { Pool } from 'pg';
import logger from '../utils/logger';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function runMigration() {
  try {
    logger.info('Step 1: Instantly copying raw trait IDs from the `players` JSONB cache to `player_stats`...');
    
    const res1 = await pool.query(`
      UPDATE player_stats ps
      SET raw_trait_ids = ARRAY(
          SELECT (elem->>'id')::integer 
          FROM jsonb_array_elements(p.raw_data->'traits') AS elem
      )
      FROM players p
      WHERE ps.player_id = p.asset_id
        AND p.raw_data->'traits' IS NOT NULL;
    `);
    
    logger.info(`Done! Successfully populated raw_trait_ids for ${res1.rowCount} players.`);

    logger.info('Step 2: Healing all legacy comma-separated traits_name strings instantly...');
    
    const res2 = await pool.query(`
      UPDATE player_stats
      SET traits_name = (
          SELECT string_agg(
              COALESCE(
                  (SELECT name FROM traits_dictionary WHERE id = t_id AND t_id < 200000),
                  (SELECT name FROM celebrations_dictionary WHERE id = t_id - 200000 AND t_id >= 200000),
                  'Unknown (ID ' || t_id || ')'
              ),
              ', '
          )
          FROM unnest(raw_trait_ids) AS t_id
      )
      WHERE array_length(raw_trait_ids, 1) > 0;
    `);
    
    logger.info(`Healing complete! Instantly fixed string collisions for ${res2.rowCount} players.`);
    
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
