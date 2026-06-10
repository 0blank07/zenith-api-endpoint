import 'dotenv/config';
import { Command } from 'commander';
import { SearchService } from './services/searchService';
import { PostgresService } from './services/postgresService';
import logger from './utils/logger';
import fs from 'fs';
import { Player } from './types/player';
import { 
  cleanName, 
  getTraitTitle, 
  getSkillTitle, 
  getSkillRequirements, 
  getWorkRateLabel, 
  getMainStats, 
  getSkillDetails,
  SKILL_BOOSTS
} from './utils/dataCleaner';
import { healMissingSkills, MissingSkill } from './scripts/healSkills';

const program = new Command();
const searchService = new SearchService();
const dbService = new PostgresService();

// Global collector for self-healing
const missingSkillsToHeal: MissingSkill[] = [];
let needsDictionaryUpdate = false;
const missingCelebrationsToHeal: { assetId: number; celebrationId: number }[] = [];

program
  .name('renderz-cli')
  .description('CLI to extract FC Mobile player data from RenderZ')
  .version('1.0.0');

program
  .command('search')
  .description('Search players by name')
  .option('-n, --name <name>', 'Player name')
  .option('-s, --size <number>', 'Number of results', '40')
  .action(async (options) => {
    try {
      const players = await searchService.searchByName(options.name, parseInt(options.size));
      displayPlayers(players);
      if (needsDictionaryUpdate) {
        logger.info('Detected unknown traits/celebrations. Triggering auto-heal for dictionary...');
        await runCommand('npm run update-dict');
      }
      await healMissingSkills(missingSkillsToHeal);
      if (missingCelebrationsToHeal.length > 0) {
        const { healMissingCelebrations } = require('./scripts/healTraits');
        await healMissingCelebrations(missingCelebrationsToHeal);
      }
    } catch (error: any) {
      logger.error(`Search failed: ${error.message}`);
    }
  });

program
  .command('latest')
  .description('Get latest added cards')
  .option('-s, --size <number>', 'Number of results', '40')
  .action(async (options) => {
    try {
      const players = await searchService.getLatestCards(parseInt(options.size));
      displayPlayers(players);
      if (needsDictionaryUpdate) {
        logger.info('Detected unknown traits/celebrations. Triggering auto-heal for dictionary...');
        await runCommand('npm run update-dict');
      }
      await healMissingSkills(missingSkillsToHeal);
      if (missingCelebrationsToHeal.length > 0) {
        const { healMissingCelebrations } = require('./scripts/healTraits');
        await healMissingCelebrations(missingCelebrationsToHeal);
      }
    } catch (error: any) {
      logger.error(`Failed to get latest cards: ${error.message}`);
    }
  });

async function runCommand(command: string) {
  const { exec } = require('child_process');
  return new Promise((resolve) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) logger.error(`Command failed: ${command} - ${error.message}`);
      resolve(stdout);
    });
  });
}

program
  .command('rating')
  .description('Filter players by rating')
  .option('--min <number>', 'Minimum rating', '100')
  .option('--max <number>', 'Maximum rating', '120')
  .action(async (options) => {
    try {
      const players = await searchService.getByRating(parseInt(options.min), parseInt(options.max));
      displayPlayers(players);
      await healMissingSkills(missingSkillsToHeal);
    } catch (error: any) {
      logger.error(`Rating filter failed: ${error.message}`);
    }
  });

program
  .command('export')
  .description('Export search results to JSON')
  .option('-n, --name <name>', 'Player name')
  .option('-o, --output <path>', 'Output file path', './players.json')
  .action(async (options) => {
    try {
      const players = await searchService.searchByName(options.name || '');
      fs.writeFileSync(options.output, JSON.stringify(players, null, 2));
      logger.info(`Successfully exported ${players.length} players to ${options.output}`);
    } catch (error: any) {
      logger.error(`Export failed: ${error.message}`);
    }
  });

program
  .command('detail')
  .description('Deep-dive into a specific player card')
  .requiredOption('--id <number>', 'Asset ID of the player')
  .action(async (options) => {
    try {
      const player = await searchService.getByAssetId(parseInt(options.id));
      if (!player) {
        console.log('Player not found.');
        return;
      }
      displayPlayerDetail(player);
      await healMissingSkills(missingSkillsToHeal);
    } catch (error: any) {
      logger.error(`Failed to fetch details: ${error.message}`);
    }
  });

program
  .command('revert-sync')
  .description('Revert the database changes made by the last sync command')
  .action(async () => {
    try {
      const backupPath = './latest_sync_rollback.json';
      if (!fs.existsSync(backupPath)) {
        logger.warn('No rollback file found. Nothing to revert.');
        return;
      }
      const idsToDelete = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      if (idsToDelete.length === 0) {
        logger.info('Rollback file is empty. Nothing to revert.');
        return;
      }
      logger.info(`Reverting ${idsToDelete.length} players from the last sync...`);
      await dbService.deletePlayers(idsToDelete);
      fs.unlinkSync(backupPath);
      await dbService.disconnect();
      logger.info('Revert complete.');
    } catch (error: any) {
      logger.error(`Revert failed: ${error.message}`);
    }
  });

program
  .command('sync-ids')
  .description('Forcefully sync specific asset IDs to the database')
  .requiredOption('--ids <ids>', 'Comma-separated asset IDs (e.g. 24044726,24044714)')
  .action(async (options) => {
    try {
      const ids = options.ids.split(',').map((id: string) => parseInt(id.trim()));
      logger.info(`Force syncing ${ids.length} specific players...`);
      
      const players = [];
      for (const id of ids) {
        const player = await searchService.getByAssetId(id);
        if (player) {
          players.push(player);
        } else {
          logger.warn(`Player ID ${id} not found on RenderZ.`);
        }
      }

      if (players.length > 0) {
        await dbService.savePlayers(players);
        logger.info(`Successfully force-synced ${players.length} players.`);
      }
      await dbService.disconnect();
    } catch (error: any) {
      logger.error(`Force sync failed: ${error.message}`);
    }
  });

program
  .command('sync')
  .description('Sync cards to PostgreSQL')
  .option('-s, --size <number>', 'Number of cards per batch', '40')
  .option('-a, --audit', 'Deep audit (Refresh existing data)')
  .option('-m, --missing', 'Full discovery (Scan all IDs)')
  .action(async (options) => {
    try {
      await dbService.initSchema();
      const backupPath = './latest_sync_rollback.json';
      const BATCH_SIZE = parseInt(options.size) || 40;
      let newlyInserted: number[] = [];

      if (options.missing) {
        logger.info('--- RUNNING FULL DISCOVERY SYNC ---');
        const renderzIds = await searchService.getAllAssetIds();
        if (renderzIds.length === 0) return;
        const existingIds = await dbService.getAllAssetIds();
        const missingIds = renderzIds.filter(id => !existingIds.has(id));
        logger.info(`Found ${missingIds.length} missing players.`);

        for (let i = 0; i < missingIds.length; i += 100) {
            const batch = missingIds.slice(i, i + 100);
            const players = await searchService.getPlayersByAssetIds(batch);
            if (players.length > 0) {
                const missingForBatch: MissingSkill[] = [];
                players.forEach(p => p.skillStyleSkills?.forEach(sk => {
                    if (!SKILL_BOOSTS[sk.id]) missingForBatch.push({ skillId: sk.id, playerId: p.assetId || p.playerId, name: sk.name });
                }));
                if (missingForBatch.length > 0) {
                    const learned = await healMissingSkills(missingForBatch);
                    Object.assign(SKILL_BOOSTS, learned);
                }
                await dbService.savePlayers(players);
                newlyInserted.push(...players.map(p => p.assetId));
            }
        }
      } else {
        // DEFAULT SYNC or AUDIT
        logger.info(options.audit ? '--- RUNNING AUDIT SYNC ---' : '--- RUNNING STANDARD SYNC ---');
        let offset = 0;
        let keepFetching = true;
        let consecutiveFullBatches = 0; // Buffer to handle "out of order" additions
        
        // Safety Buffer: Check up to 5 batches (200 players) deep for out-of-order cards
        const MAX_SAFETY_BUFFER = 5;

        while (keepFetching) {
          // SORT BY ASSET_ID DESC instead of added to ensure strictly newest cards are checked first
          const players = await searchService.search({ sortBy: 'assetId', sortOrder: 'desc', from: offset, size: BATCH_SIZE });
          if (players.length === 0) break;
          
          const existingIds = await dbService.getAllAssetIds();
          const missing = players.filter(p => !existingIds.has(p.assetId));
          
          if (missing.length === 0 && !options.audit) {
            consecutiveFullBatches++;
            if (consecutiveFullBatches >= MAX_SAFETY_BUFFER) {
                logger.info(`Caught up to database records (Checked ${MAX_SAFETY_BUFFER} batches deep). Stopping.`);
                break;
            }
            logger.info(`Batch already in DB. Checking batch ${consecutiveFullBatches+1}/${MAX_SAFETY_BUFFER} for safety...`);
          } else {
            consecutiveFullBatches = 0;
            const playersToProcess = options.audit ? players : missing;
            
            if (playersToProcess.length > 0) {
                const missingForBatch: MissingSkill[] = [];
                playersToProcess.forEach(p => p.skillStyleSkills?.forEach(sk => {
                    if (!SKILL_BOOSTS[sk.id]) missingForBatch.push({ skillId: sk.id, playerId: p.assetId || p.playerId, name: sk.name });
                }));
                if (missingForBatch.length > 0) {
                    const learned = await healMissingSkills(missingForBatch);
                    Object.assign(SKILL_BOOSTS, learned);
                }
                await dbService.savePlayers(playersToProcess);
                newlyInserted.push(...playersToProcess.map(p => p.assetId));
            }
          }
          offset += BATCH_SIZE;
          // Hard cap for standard sync to prevent infinite loops (scans top 2000 IDs)
          if (offset > 2000 && !options.audit) break; 
        }
      }
      
      if (newlyInserted.length > 0) fs.writeFileSync(backupPath, JSON.stringify(newlyInserted));
      if (needsDictionaryUpdate) await runCommand('npm run update-dict');
      await healMissingSkills(missingSkillsToHeal);
      if (missingCelebrationsToHeal.length > 0) {
        const { healMissingCelebrations } = require('./scripts/healTraits');
        await healMissingCelebrations(missingCelebrationsToHeal);
      }
      await dbService.disconnect();
    } catch (error: any) {
      logger.error(`Sync failed: ${error.message}`);
    }
  });

function displayPlayerDetail(player: Player) {
  const c = player.animation?.colors || { rating: '#FFFFFF', name: '#FFFFFF', position: '#FFFFFF' };
  const skillUnlocks = new Set<string>();
  player.skillStyleSkills?.forEach(sk => {
    const data = SKILL_BOOSTS[sk.id];
    if (data?.unlocks) Object.values(data.unlocks).forEach((posList: any) => posList.forEach((p: string) => skillUnlocks.add(p)));
  });
  const allAltPos = Array.from(new Set([...(player.potentialPositions || []), ...skillUnlocks]));

  console.log(`\n===========================================================`);
  const displayName = player.cardName || player.commonName || `${player.firstName} ${player.lastName}` || 'Unknown';
  console.log(`   DEEP DIVE: ${displayName.toUpperCase()} [OVR: ${player.rating}]`);
  console.log(`===========================================================`);
  console.log(`\n[ Identity & Profile ]`);
  console.log(`- Full Name:      ${player.firstName} ${player.lastName}`);
  console.log(`- Asset ID:       ${player.assetId}`);
  console.log(`- Position:       ${player.position}`);
  console.log(`- Club:           ${cleanName(player.club.name, player.club.id, 'club')} (ID: ${player.club.id})`);
  console.log(`- League:         ${cleanName(player.league.name, player.league.id, 'league')} (ID: ${player.league.id})`);
  console.log(`- Nation:         ${cleanName(player.nation.name, player.nation.id, 'nation')} (ID: ${player.nation.id})`);
  console.log(`- Program:        ${cleanName(player.source, undefined, 'program')}`);

  console.log(`\n[ Base Stats ]`);
  const mainStats = getMainStats(player);
  console.log(mainStats.map(s => ` ${s.label}: ${s.value} `).join(' | '));
  console.log(`\n===========================================================\n`);
}

function displayPlayers(players: Player[]) {
  if (players.length === 0) { console.log('No players found.'); return; }
  for (const player of players) displayPlayerDetail(player);
  console.log(`\nTotal results displayed: ${players.length}`);
}

program.parse(process.argv);
process.on('SIGINT', () => { logger.info('Shutting down...'); process.exit(0); });
