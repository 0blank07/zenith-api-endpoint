import 'dotenv/config';
import { Pool } from 'pg';
import fs from 'fs';
import logger from '../utils/logger';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function run() {
  try {
    logger.info('Fetching dictionaries...');
    const traitsRes = await pool.query('SELECT id, name FROM traits_dictionary');
    const celebRes = await pool.query('SELECT id, name FROM celebrations_dictionary');

    const nameToId = new Map<string, number>();
    for (const row of traitsRes.rows) {
      nameToId.set(row.name.trim().toLowerCase(), row.id);
    }
    for (const row of celebRes.rows) {
      nameToId.set(row.name.trim().toLowerCase(), row.id + 200000);
    }

    const SKILL_MOVES = [
      'Roulette', 'Heel to Heel Flick', 'Rainbow', 'Lane Change',
      'Stepover', 'Ball Roll', 'Open Up Fake Shot', 'Flip Flap',
      'Rainbow (Legacy)', 'Elastico', 'Hocus Pocus',
      'flick up jog', 'lateral heel to heel', 'heel chop', 'stepover and exit', 'hard stop'
    ].map(s => s.toLowerCase());
    const skillMoveSet = new Set(SKILL_MOVES);

    logger.info('Fetching players missing raw_trait_ids...');
    const playersRes = await pool.query(`
      SELECT player_id, traits_name 
      FROM player_stats 
      WHERE array_length(raw_trait_ids, 1) IS NULL 
        AND traits_name IS NOT NULL 
        AND traits_name != ''
    `);

    logger.info(`Found ${playersRes.rowCount} players to process.`);

    const anomalies: number[] = [];
    const validUpdates: { player_id: number; raw_trait_ids: number[] }[] = [];

    for (const row of playersRes.rows) {
      const tokens = row.traits_name.split(',').map((t: string) => t.trim()).filter(Boolean);
      let isAnomaly = false;
      const ids: number[] = [];
      const seenNames = new Set<string>();

      for (const token of tokens) {
        const lowerToken = token.toLowerCase();

        // Check 1: Duplicate name
        if (seenNames.has(lowerToken)) {
          isAnomaly = true;
          break;
        }
        seenNames.add(lowerToken);

        // Ignore Skill Moves completely (they aren't traits/celebrations)
        if (skillMoveSet.has(lowerToken)) {
          continue;
        }

        // Check 2: Unknown name
        if (nameToId.has(lowerToken)) {
          ids.push(nameToId.get(lowerToken)!);
        } else {
          isAnomaly = true;
          break;
        }
      }

      if (isAnomaly) {
        anomalies.push(row.player_id);
      } else {
        validUpdates.push({ player_id: row.player_id, raw_trait_ids: ids });
      }
    }

    logger.info(`Analysis complete. Found ${validUpdates.length} perfect players and ${anomalies.length} anomalous players.`);

    // Write anomalies to file
    if (anomalies.length > 0) {
      fs.writeFileSync('anomalous_players.json', JSON.stringify(anomalies, null, 2));
      logger.info(`Saved ${anomalies.length} anomalous player IDs to anomalous_players.json.`);
    }

    if (validUpdates.length > 0) {
      logger.info('Running massive bulk UPDATE via temporary table...');
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        
        // Create temp table
        await client.query(`
          CREATE TEMP TABLE temp_trait_updates (
            player_id BIGINT,
            raw_trait_ids INTEGER[]
          ) ON COMMIT DROP;
        `);

        // Insert in batches of 10,000 to prevent query string limits
        const batchSize = 10000;
        for (let i = 0; i < validUpdates.length; i += batchSize) {
          const batch = validUpdates.slice(i, i + batchSize);
          
          let valuesStr = '';
          for (let j = 0; j < batch.length; j++) {
            valuesStr += `(${batch[j].player_id}, ARRAY[${batch[j].raw_trait_ids.join(',')}]::INTEGER[])`;
            if (j < batch.length - 1) valuesStr += ',';
          }
          
          await client.query(`INSERT INTO temp_trait_updates (player_id, raw_trait_ids) VALUES ${valuesStr}`);
        }

        // Apply bulk update
        const updateRes = await client.query(`
          UPDATE player_stats ps
          SET raw_trait_ids = t.raw_trait_ids
          FROM temp_trait_updates t
          WHERE ps.player_id = t.player_id;
        `);

        // Reconstruct their traits_name string instantly
        const healRes = await client.query(`
          UPDATE player_stats ps
          SET traits_name = (
              SELECT string_agg(
                  COALESCE(
                      (SELECT name FROM traits_dictionary WHERE id = t_id AND t_id < 200000),
                      (SELECT name FROM celebrations_dictionary WHERE id = t_id - 200000 AND t_id >= 200000),
                      'Unknown (ID ' || t_id || ')'
                  ),
                  ', '
              )
              FROM unnest(ps.raw_trait_ids) AS t_id
          )
          FROM temp_trait_updates t
          WHERE ps.player_id = t.player_id;
        `);

        await client.query('COMMIT');
        logger.info(`Success! Updated ${updateRes.rowCount} players perfectly.`);
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    }

    process.exit(0);
  } catch (error) {
    logger.error('Reverse engineering failed:', error);
    process.exit(1);
  }
}

run();
