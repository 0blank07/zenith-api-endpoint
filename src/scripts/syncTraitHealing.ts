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

export async function healTraitInDatabase(id: number) {
  try {
    logger.info(`Starting ID-based retroactive healing for trait ID ${id}...`);
    
    // We update traits_name by precisely reconstructing it from dictionaries based on raw_trait_ids
    const result = await pool.query(
      `UPDATE player_stats
       SET traits_name = (
           SELECT string_agg(
               COALESCE(
                   (SELECT name FROM traits_dictionary WHERE id = t_id AND t_id < 200000),
                   (SELECT name FROM celebrations_dictionary WHERE id = t_id - 200000 AND t_id >= 200000),
                   'Unknown (ID ' || t_id || ')'
               ),
               ','
           )
           FROM unnest(raw_trait_ids) AS t_id
       )
       WHERE $1 = ANY(raw_trait_ids)`,
      [id]
    );
    
    logger.info(`Healing complete! Updated ${result.rowCount} player cards.`);
    return result.rowCount;
  } catch (error) {
    logger.error('Failed to heal traits in DB:', error);
    throw error;
  }
}

// Allow running from CLI directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: ts-node syncTraitHealing.ts <id>');
    process.exit(1);
  }
  healTraitInDatabase(parseInt(args[0])).then(() => process.exit(0));
}
