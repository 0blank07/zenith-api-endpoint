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

export async function healNationInDatabase(id: number) {
  try {
    logger.info(`Starting retroactive healing for nation ID ${id}...`);
    const result = await pool.query(
      `UPDATE player_stats
       SET nation_region = (SELECT name FROM nations_dictionary WHERE id = $1)
       WHERE nation_region = $2 OR nation_region = $3`,
      [id, `Unknown (nation ${id})`, `Unknown (ID ${id})`]
    );
    logger.info(`Healing complete! Updated ${result.rowCount} player cards for nation.`);
    return result.rowCount;
  } catch (error) {
    logger.error('Failed to heal nation in DB:', error);
    throw error;
  }
}

export async function healClubInDatabase(id: number) {
  try {
    logger.info(`Starting retroactive healing for club ID ${id}...`);
    const result = await pool.query(
      `UPDATE player_stats
       SET team = (SELECT name FROM clubs_dictionary WHERE id = $1)
       WHERE team = $2 OR team = $3`,
      [id, `Unknown (club ${id})`, `Unknown (ID ${id})`]
    );
    logger.info(`Healing complete! Updated ${result.rowCount} player cards for club.`);
    return result.rowCount;
  } catch (error) {
    logger.error('Failed to heal club in DB:', error);
    throw error;
  }
}

export async function healLeagueInDatabase(id: number) {
  try {
    logger.info(`Starting retroactive healing for league ID ${id}...`);
    const result = await pool.query(
      `UPDATE player_stats
       SET league = (SELECT name FROM leagues_dictionary WHERE id = $1)
       WHERE league = $2 OR league = $3`,
      [id, `Unknown (league ${id})`, `Unknown (ID ${id})`]
    );
    logger.info(`Healing complete! Updated ${result.rowCount} player cards for league.`);
    return result.rowCount;
  } catch (error) {
    logger.error('Failed to heal league in DB:', error);
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
