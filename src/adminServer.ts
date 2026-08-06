import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import path from 'path';
import logger from './utils/logger';
import { healTraitInDatabase, healNationInDatabase, healClubInDatabase, healLeagueInDatabase } from './scripts/syncTraitHealing';
import { loadDictionaries } from './utils/dictionaryCache';

const app = express();
const port = process.env.ADMIN_PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

// API Routes
app.get('/api/traits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM traits_dictionary ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching traits:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/traits', async (req, res) => {
  const { id, name, oldName } = req.body;
  if (id === undefined || !name) return res.status(400).json({ error: 'Missing id or name' });
  
  try {
    await pool.query(
      'INSERT INTO traits_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
      [id, name]
    );
    
    // Reload cache
    await loadDictionaries();
    
    // Retroactively heal the database using the strict ID
    const hc = await healTraitInDatabase(id);
    const healedCount = hc ?? 0;

    
    res.json({ success: true, message: 'Trait updated', healedCount });
  } catch (error) {
    logger.error('Error updating trait:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/celebrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM celebrations_dictionary ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching celebrations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/celebrations', async (req, res) => {
  const { id, name, oldName } = req.body;
  if (id === undefined || !name) return res.status(400).json({ error: 'Missing id or name' });
  
  try {
    await pool.query(
      'INSERT INTO celebrations_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
      [id, name]
    );
    
    // Reload cache
    await loadDictionaries();
    
    // Retroactively heal celebrations using strict ID (celebration IDs are mapped as ID + 200000)
    const hc = await healTraitInDatabase(id + 200000);
    const healedCount = hc ?? 0;

    
    res.json({ success: true, message: 'Celebration updated', healedCount });
  } catch (error) {
    logger.error('Error updating celebration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/nations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nations_dictionary ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching nations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/nations', async (req, res) => {
  const { id, name } = req.body;
  if (id === undefined || !name) return res.status(400).json({ error: 'Missing id or name' });
  
  try {
    await pool.query(
      'INSERT INTO nations_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
      [id, name]
    );
    await loadDictionaries();
    const healedCount = await healNationInDatabase(id);
    res.json({ success: true, message: 'Nation updated', healedCount: healedCount ?? 0 });
  } catch (error) {
    logger.error('Error updating nation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/clubs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clubs_dictionary ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/clubs', async (req, res) => {
  const { id, name } = req.body;
  if (id === undefined || !name) return res.status(400).json({ error: 'Missing id or name' });
  
  try {
    await pool.query(
      'INSERT INTO clubs_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
      [id, name]
    );
    await loadDictionaries();
    const healedCount = await healClubInDatabase(id);
    res.json({ success: true, message: 'Club updated', healedCount: healedCount ?? 0 });
  } catch (error) {
    logger.error('Error updating club:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/leagues', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leagues_dictionary ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/leagues', async (req, res) => {
  const { id, name } = req.body;
  if (id === undefined || !name) return res.status(400).json({ error: 'Missing id or name' });
  
  try {
    await pool.query(
      'INSERT INTO leagues_dictionary (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
      [id, name]
    );
    await loadDictionaries();
    const healedCount = await healLeagueInDatabase(id);
    res.json({ success: true, message: 'League updated', healedCount: healedCount ?? 0 });
  } catch (error) {
    logger.error('Error updating league:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/missing', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM missing_metadata ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching missing metadata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/missing/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM missing_metadata WHERE id = $1', [id]);
    res.json({ success: true, message: 'Item marked as done.' });
  } catch (error) {
    logger.error('Error deleting missing metadata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/missing/rescan', async (req, res) => {
  try {
    const result = await pool.query(`
      DELETE FROM missing_metadata WHERE
      (type = 'nation' AND unknown_id IN (SELECT id FROM nations_dictionary)) OR
      (type = 'club' AND unknown_id IN (SELECT id FROM clubs_dictionary)) OR
      (type = 'league' AND unknown_id IN (SELECT id FROM leagues_dictionary)) OR
      (type = 'trait' AND unknown_id IN (SELECT id FROM traits_dictionary)) OR
      (type = 'celebration' AND unknown_id IN (SELECT id FROM celebrations_dictionary))
    `);
    res.json({ success: true, deletedCount: result.rowCount });
  } catch (error) {
    logger.error('Error scanning and deleting missing metadata:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve frontend build if available
const frontendPath = path.join(__dirname, '../admin-ui/dist');
app.use(express.static(frontendPath));
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  logger.info(`Admin Server running on http://localhost:${port}`);
});
