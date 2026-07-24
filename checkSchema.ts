import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  console.time('connection');
  await pool.query(`SELECT 1`);
  console.timeEnd('connection');

  console.time('count');
  const res = await pool.query(`SELECT COUNT(*) as total FROM player_stats WHERE 1=1 AND name ILIKE '%kane%' AND rank = 0`);
  console.timeEnd('count');
  console.log(res.rows[0]);
  await pool.end();
}
run();
