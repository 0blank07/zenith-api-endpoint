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
  const res = await pool.query(`
    SELECT pas.skill_id, sc.skill_name, pas.is_locked, pas.unlock_requirement_skillname
    FROM player_available_skills pas
    LEFT JOIN skills_catalog sc ON pas.skill_id = sc.skill_id
    WHERE pas.player_id = 3114943 OR pas.player_id = (SELECT player_id FROM player_stats WHERE name ILIKE '%eusebio%' LIMIT 1)
  `);
  for (const row of res.rows) {
    console.log(row);
  }
  await pool.end();
}

run().catch(console.error);
