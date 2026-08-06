import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function main() {
  await pool.query(`CREATE TABLE IF NOT EXISTS nations_dictionary (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL);`);
  await pool.query(`CREATE TABLE IF NOT EXISTS clubs_dictionary (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL);`);
  await pool.query(`CREATE TABLE IF NOT EXISTS leagues_dictionary (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL);`);
  console.log('Tables created');
  process.exit(0);
}
main();
