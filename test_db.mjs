import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function run() {
  try {
    await pool.query(`
      INSERT INTO player_playstyles (player_id, playstyle_name, level)
      VALUES (30913114, 'Rapid', 2)
      ON CONFLICT DO NOTHING
    `);
    console.log('Inserted playstyle for 30913114');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
