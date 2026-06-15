import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function run() {
  const sql = fs.readFileSync('src/scripts/create_playstyles_tables.sql', 'utf8');
  await pool.query(sql);
  console.log('Tables created.');
  await pool.end();
}
run().catch(console.error);
