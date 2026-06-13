import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function run() {
  console.log('Starting dynamic requirement fix...');

  try {
    await pool.query('BEGIN');

    // Find the base skill for each player. 
    // Base skill is the one with the highest max level (e.g. 2 or 3) from skill_level_boosts.
    // If multiple, pick one (e.g. min skill_id).
    const updateResult = await pool.query(`
      WITH player_max_levels AS (
        SELECT 
          player_id, 
          skill_id, 
          MAX(level_number) as max_lvl
        FROM skill_level_boosts
        GROUP BY player_id, skill_id
      ),
      player_base_skills AS (
        SELECT DISTINCT ON (player_id)
          player_id,
          skill_id as base_skill_id
        FROM player_max_levels
        ORDER BY player_id, max_lvl DESC, skill_id ASC
      ),
      base_skill_info AS (
        SELECT 
          pbs.player_id,
          pbs.base_skill_id,
          sc.skill_name as base_skill_name
        FROM player_base_skills pbs
        JOIN skills_catalog sc ON pbs.base_skill_id = sc.skill_id
      )
      UPDATE player_available_skills pas
      SET 
        unlock_requirement_skillname = bsi.base_skill_name,
        prerequisite_skill_id = bsi.base_skill_id,
        unlock_requirement_type = 'skill_level',
        is_locked = true,
        unlock_requirement_level = 2,
        prerequisite_level = 2
      FROM base_skill_info bsi
      WHERE pas.player_id = bsi.player_id 
        AND pas.skill_id != bsi.base_skill_id;
    `);

    console.log(`Updated ${updateResult.rowCount} advanced skills to point to their dynamic base skill.`);

    // Then update the base skill itself to have NO requirements
    const updateBaseResult = await pool.query(`
      WITH player_max_levels AS (
        SELECT 
          player_id, 
          skill_id, 
          MAX(level_number) as max_lvl
        FROM skill_level_boosts
        GROUP BY player_id, skill_id
      ),
      player_base_skills AS (
        SELECT DISTINCT ON (player_id)
          player_id,
          skill_id as base_skill_id
        FROM player_max_levels
        ORDER BY player_id, max_lvl DESC, skill_id ASC
      )
      UPDATE player_available_skills pas
      SET 
        unlock_requirement_skillname = NULL,
        prerequisite_skill_id = NULL,
        unlock_requirement_type = NULL,
        is_locked = false,
        unlock_requirement_level = NULL,
        prerequisite_level = NULL
      FROM player_base_skills pbs
      WHERE pas.player_id = pbs.player_id 
        AND pas.skill_id = pbs.base_skill_id;
    `);

    console.log(`Updated ${updateBaseResult.rowCount} base skills to have NO requirements.`);

    await pool.query('COMMIT');
    console.log('Fix completed successfully!');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error during fix:', err);
  } finally {
    await pool.end();
  }
}

run();
