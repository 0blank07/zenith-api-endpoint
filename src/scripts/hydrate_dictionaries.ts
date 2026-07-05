import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Extract data from dataCleaner since we don't want to export them just for this
const TRAITS: Record<number, string> = {
  1: 'Long Throw', 2: 'Powerful Driven Free Kick', 7: 'Dives Into Tackles',
  12: 'Early Crosser', 13: 'Finesse Shot', 14: 'Flair', 15: 'Long Passer',
  16: 'Long Shot Taker', 18: 'Play Maker', 22: 'Power Header',
  25: 'Outside Foot Shot', 29: 'Acrobatic Clearance', 3: 'Injury Prone',
  8: 'Early Crosser', 11: 'Long Shot Taker', 17: 'Technical Dribbler',
  20: 'Flair', 21: 'Solid Player', 24: 'Team Player', 9: 'Selfish'
};

const CELEBRATIONS: Record<number, string> = {
  78: 'Samba', 68: 'Waddle', 67: 'Floor Spin', 66: 'Timber', 64: 'Push It Down',
  63: 'Stand Tall', 62: 'KO', 61: 'Matador', 51: 'Heart', 48: 'Thigh Point',
  47: 'Celebration 47', 45: 'Violinist', 44: 'Uppercut Jump Punch', 42: 'Torero',
  40: 'Standing Archer', 39: 'Stand and Point to Sky', 38: 'Spanish Archer',
  37: 'Side Slide', 34: 'Samba Dance', 32: 'Roll and Fist Pump', 31: 'Robot',
  30: 'Punch and Dodge', 29: 'Point to Crowd', 28: 'One Knee Fist Pump',
  27: 'Kneel and Point to Heavens', 24: 'Knee Slide Spin', 22: 'Knee Slide Arms Out',
  21: 'Knee Slide', 20: 'Jump Punch to Fist Pump', 19: "I Can't Hear You",
  15: 'Hand Spring', 14: 'Front Flip', 13: 'Push-Up', 11: 'Double Backflip',
  10: 'Chest Slide', 9: 'Karate Kick', 8: 'Cart Wheel and Flip', 7: 'Cart Wheel',
  6: 'Brick Fall', 5: 'Bow', 3: 'Golf Swing', 2: 'Big Fist Pump',
  81: 'Embrace', 80: 'Think', 79: 'Slide and Cheer', 74: 'Yoga', 69: 'Square',
  85: 'Siuuu!', 50: 'Right Here Right Now', 25: 'Belli-goal'
};

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function hydrate() {
  console.log('Creating tables...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS traits_dictionary (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS celebrations_dictionary (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS missing_metadata (
        id SERIAL PRIMARY KEY,
        asset_id INT,
        type VARCHAR(50) NOT NULL,
        unknown_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(type, unknown_id)
    );
  `);

  console.log('Hydrating traits_dictionary...');
  for (const [id, name] of Object.entries(TRAITS)) {
    await pool.query(
      'INSERT INTO traits_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
      [parseInt(id), name]
    );
  }

  console.log('Hydrating celebrations_dictionary...');
  for (const [id, name] of Object.entries(CELEBRATIONS)) {
    await pool.query(
      'INSERT INTO celebrations_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
      [parseInt(id), name]
    );
  }

  console.log('Hydration complete.');
  await pool.end();
}

hydrate().catch(console.error);
