import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  const res = await pool.query(`SELECT * FROM player_playstyles WHERE player_id = 24037299`);
  console.log(res.rows);
  
  const res2 = await pool.query(`SELECT * FROM playstyles_catalog`);
  console.log('Catalog:', res2.rows.map((r: any) => r.name));
  
  await pool.end();
}
run();
