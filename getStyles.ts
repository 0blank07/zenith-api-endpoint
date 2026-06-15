import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  
  const res = await pool.query(`SELECT DISTINCT playstyle_name FROM player_playstyles WHERE playstyle_name != 'None' ORDER BY playstyle_name`);
  console.log('--- FOUND PLAYSTYLES ---');
  res.rows.forEach((r: any) => console.log(r.playstyle_name));
  
  await pool.end();
}
run().catch(console.error);
