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
  const res = await pool.query(`SELECT * FROM player_stats WHERE player_id = '4714449'`);
  console.log("Player stats:", res.rows);
  const res2 = await pool.query(`SELECT pas.* FROM player_available_skills pas WHERE player_id = '4714449'`);
  console.log("Skills:", res2.rows);
  await pool.end();
}

run().catch(console.error);
