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
  console.log('Updating unlock_requirement_type in DB...');
  const res = await pool.query(`
    UPDATE player_available_skills
    SET unlock_requirement_type = 'skill_level'
    WHERE unlock_requirement_type = 'skill'
  `);
  console.log(`Updated ${res.rowCount} rows.`);
  await pool.end();
}

run().catch(console.error);
