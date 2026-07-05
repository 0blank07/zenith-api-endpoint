import { Pool } from 'pg';
import logger from './logger';
import 'dotenv/config';

let traitsCache: Record<number, string> = {};
let celebrationsCache: Record<number, string> = {};
let isLoaded = false;

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

export async function loadDictionaries() {
  try {
    const traitsRes = await pool.query('SELECT id, name FROM traits_dictionary');
    traitsCache = {};
    traitsRes.rows.forEach(row => {
      traitsCache[row.id] = row.name;
    });

    const celebrationsRes = await pool.query('SELECT id, name FROM celebrations_dictionary');
    celebrationsCache = {};
    celebrationsRes.rows.forEach(row => {
      celebrationsCache[row.id] = row.name;
    });

    isLoaded = true;
    logger.info(`Dictionaries loaded: ${Object.keys(traitsCache).length} traits, ${Object.keys(celebrationsCache).length} celebrations.`);
  } catch (error) {
    logger.error('Failed to load dictionaries from DB:', error);
  }
}

export function getTraitNameFromCache(id: number): string | undefined {
  if (!isLoaded) {
    logger.warn('Dictionary cache not loaded yet! Using fallback.');
  }
  return traitsCache[id];
}

export function getCelebrationNameFromCache(id: number): string | undefined {
  return celebrationsCache[id];
}

export async function logMissingMetadata(assetId: number | undefined, type: string, unknownId: number) {
  try {
    await pool.query(
      `INSERT INTO missing_metadata (asset_id, type, unknown_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (type, unknown_id) DO NOTHING`,
      [assetId || null, type, unknownId]
    );
  } catch (error) {
    logger.error(`Failed to log missing metadata (${type} ${unknownId}):`, error);
  }
}

// Initial load (can be awaited during app startup)
loadDictionaries();
