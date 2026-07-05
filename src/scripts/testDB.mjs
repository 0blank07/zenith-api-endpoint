import 'dotenv/config';
import pg from 'pg';
const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

async function run() {
  const res = await pool.query("SELECT player_id, name, traits_name FROM player_stats WHERE player_id = 7206339 LIMIT 1");
  console.log('Player 7206339:', res.rows[0]);
  pool.end();
}
run();
