import 'dotenv/config';
import fs from 'fs';
import { SearchService } from '../services/searchService';
import { PostgresService } from '../services/postgresService';
import { SKILL_BOOSTS } from '../utils/dataCleaner';
import { healMissingSkills, MissingSkill } from './healSkills';
import { Pool } from 'pg';
import logger from '../utils/logger';

const searchService = new SearchService();
const dbService = new PostgresService();

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function run() {
  try {
    logger.info('Starting Anomaly Heal Script...');
    
    if (!fs.existsSync('anomalous_players.json')) {
      logger.error('anomalous_players.json not found!');
      process.exit(1);
    }

    const allIds: number[] = JSON.parse(fs.readFileSync('anomalous_players.json', 'utf8'));
    logger.info(`Loaded ${allIds.length} total anomalous IDs from file.`);

    await dbService.initSchema();
    const client = await pool.connect();
    
    logger.info('Checking database to see which players have already been healed...');
    let remainingIds: number[] = [];
    
    try {
      // Chunk the checking to avoid query limits
      for (let i = 0; i < allIds.length; i += 10000) {
        const chunk = allIds.slice(i, i + 10000);
        const chunkRes = await client.query(`
          SELECT player_id 
          FROM player_stats 
          WHERE player_id = ANY($1::bigint[]) 
            AND array_length(raw_trait_ids, 1) IS NULL
        `, [chunk]);
        remainingIds.push(...chunkRes.rows.map(r => parseInt(r.player_id)));
      }
    } finally {
      client.release();
    }

    logger.info(`Found ${remainingIds.length} players still needing a deep audit (already healed ${allIds.length - remainingIds.length}).`);
    const ids = remainingIds;
    
    if (ids.length === 0) {
      logger.info('All anomalous players have been healed! Exiting.');
      process.exit(0);
    }

    const batchSize = 450;
    
    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      logger.info(`Fetching batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(ids.length / batchSize)}...`);
      
      try {
        const players = await searchService.getPlayersByAssetIds(batch);
        
        if (players && players.length > 0) {
          // Heal skills just like regular sync
          const missingForBatch: MissingSkill[] = [];
          for (let j = 0; j < players.length; j++) {
              players[j].skillStyleSkills?.forEach(sk => {
                  if (!SKILL_BOOSTS[sk.id]) missingForBatch.push({ skillId: sk.id, playerId: players[j].assetId || players[j].playerId, name: sk.name });
              });
          }
          if (missingForBatch.length > 0) {
              const learned = await healMissingSkills(missingForBatch);
              Object.assign(SKILL_BOOSTS, learned);
          }
          
          // Deduplicate
          const uniquePlayersMap = new Map();
          for (const p of players) {
              uniquePlayersMap.set(p.assetId, p);
          }
          const uniquePlayers = Array.from(uniquePlayersMap.values());
          
          await dbService.savePlayers(uniquePlayers);
          logger.info(`Successfully audited and saved ${uniquePlayers.length} players from batch.`);
        } else {
          logger.warn(`No players returned for this batch. IDs may be invalid or RenderZ blocked request.`);
        }
      } catch (err: any) {
        logger.error(`Error processing batch starting at index ${i}:`, err.message);
      }
      
      // Small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    logger.info('Deep audit complete!');
    process.exit(0);
  } catch (error) {
    logger.error('Heal script failed:', error);
    process.exit(1);
  }
}

run();
