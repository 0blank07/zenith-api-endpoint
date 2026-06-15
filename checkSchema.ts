import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  const res = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'playstyles_catalog'`);
  console.log(res.rows.map((r: any) => r.column_name));
  await pool.end();
}
run();
