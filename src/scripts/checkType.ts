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
    SELECT skill_id, is_locked, unlock_requirement_skillname, unlock_requirement_type
    FROM player_available_skills
    WHERE player_id = '24038731'
    LIMIT 10
  `);
  for (const row of res.rows) {
    console.log(row);
  }
  await pool.end();
}

run().catch(console.error);
