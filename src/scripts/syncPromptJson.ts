import 'dotenv/config';
import fs from 'fs';
import { PostgresService } from '../services/postgresService';
import { RenderzClient } from '../client/renderzClient';
import logger from '../utils/logger';

// Trait Dictionary mapping based on standard FC Mobile traits
const TRAIT_DICTIONARY: Record<string, string> = {
  'trait_name_12': 'Rapid',
  'trait_name_15': 'Clinical Finisher',
  'trait_name_16': 'Finesse Shot',
  'trait_name_18': 'Play Maker',
  'trait_name_21': 'GK Long Thrower',
  // We can add more here as we discover them
};

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  const client = new RenderzClient();

  const fileContent = fs.readFileSync('prompt-1.md', 'utf8');
  const assetIds = fileContent
    .split('\n')
    .map(line => {
      const match = line.match(/\/player\/(\d+)/);
      return match ? Number(match[1]) : null;
    })
    .filter(id => id !== null) as number[];

  logger.info(`Found ${assetIds.length} players from prompt-1.md. Starting JSON sync...`);
  
  if (assetIds.length === 0) {
      await pool.end();
      return;
  }

  // Batch into chunks of 40 for elasticsearch
  const chunkSize = 40;
  for (let i = 0; i < assetIds.length; i += chunkSize) {
      const batch = assetIds.slice(i, i + chunkSize);
      try {
          logger.info(`🔍 Fetching batch ${i} to ${i + batch.length} ...`);
          const payload = {
              query: { bool: { must: [{ terms: { assetId: batch } }] } },
              from: 0,
              size: batch.length,
              _source: []
          };
          
          const response = await client.post<any>('/api/search/elasticsearch', payload);
          if (!response || !response.players) continue;

          for (const player of response.players) {
              const assetId = player.assetId || player.id;
              const traits = player.traits || player.playStyles || [];
              
              if (traits && traits.length > 0) {
                  for (let j = 0; j < traits.length; j++) {
                      const t = traits[j];
                      let name = TRAIT_DICTIONARY[t.title] || t.title || 'Unknown';
                      const icon = t.image;
                      
                      let parsedLevel = 1;
                      if (traits.length === 2) {
                          parsedLevel = j === 0 ? 2 : 1;
                      } else {
                          if (icon?.includes('GOLD')) parsedLevel = 2;
                      }
                      
                      await pool.query(`
                          INSERT INTO playstyles_catalog (name, icon_level_1, icon_level_2)
                          VALUES ($1, $2, $3)
                          ON CONFLICT (name) DO UPDATE SET
                              icon_level_1 = COALESCE(EXCLUDED.icon_level_1, playstyles_catalog.icon_level_1),
                              icon_level_2 = COALESCE(EXCLUDED.icon_level_2, playstyles_catalog.icon_level_2)
                      `, [name, parsedLevel === 1 ? icon : null, parsedLevel === 2 ? icon : null]);

                      await pool.query(`
                          INSERT INTO player_playstyles (player_id, playstyle_name, level)
                          VALUES ($1, $2, $3)
                          ON CONFLICT (player_id, playstyle_name) DO UPDATE SET
                              level = EXCLUDED.level
                      `, [assetId, name, parsedLevel]);
                  }
                  logger.info(`   ✅ Playstyles Updated for ${assetId}`);
              } else {
                  await pool.query(`INSERT INTO playstyles_catalog (name) VALUES ('None') ON CONFLICT DO NOTHING`);
                  await pool.query(`INSERT INTO player_playstyles (player_id, playstyle_name, level) VALUES ($1, 'None', 1) ON CONFLICT DO NOTHING`, [assetId]);
                  logger.info(`   ℹ️ No playstyles found for ${assetId}`);
              }
          }
      } catch (error: any) {
          logger.error(`   ❌ Error processing batch: ${error.message}`);
      }
  }

  await pool.end();
  logger.info('\n✨ JSON SYNC COMPLETE!\n');
}

run().catch(console.error);
