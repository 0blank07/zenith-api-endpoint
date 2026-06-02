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
  .command('sync')
  .description('Sync latest cards to PostgreSQL')
  .option('-s, --size <number>', 'Number of cards to sync', '100')
  .action(async (options) => {
    try {
      await dbService.initSchema();
      const players = await searchService.getLatestCards(parseInt(options.size));
      await dbService.savePlayers(players);
      await dbService.disconnect();
    } catch (error: any) {
      logger.error(`Sync failed: ${error.message}`);
    }
  });

function displayPlayerDetail(player: Player) {
  const c = player.animation?.colors || { rating: '#FFFFFF', name: '#FFFFFF', position: '#FFFFFF' };
  
  // 1. Calculate unlocked positions from skill tree
  const skillUnlocks = new Set<string>();
  if (player.skillStyleSkills) {
    player.skillStyleSkills.forEach(sk => {
      const data = SKILL_BOOSTS[sk.id];
      if (data?.unlocks) {
        Object.values(data.unlocks).forEach((posList: any) => {
          posList.forEach((p: string) => skillUnlocks.add(p));
        });
      }
    });
  }
  const allAltPos = Array.from(new Set([...(player.potentialPositions || []), ...skillUnlocks]));

  const traits = player.traits || [];

  console.log(`\n===========================================================`);
  const displayName = player.cardName || player.commonName || `${player.firstName} ${player.lastName}` || 'Unknown';
  console.log(`   DEEP DIVE: ${displayName.toUpperCase()} [OVR: ${player.rating}]`);
  console.log(`===========================================================`);
  
  console.log(`\n[ ASSETS & COLORS ]`);
  console.log(`- OVR Color:      ${c.rating}`);
  console.log(`- Name Color:     ${c.name}`);
  console.log(`- Pos Color:      ${c.position}`);
  console.log(`- Player Img:     ${player.images.playerCardImage}`);
  console.log(`- BG Image:       ${player.images.playerCardBackground}`);
  console.log(`- Flag Img:       ${player.images.flagImage}`);
  console.log(`- Club Img:       ${player.images.clubImage}`);
  console.log(`- League Img:     ${player.images.leagueImage}`);

  console.log(`\n[ IDENTITY & PROFILE ]`);
  console.log(`- Full Name:      ${player.firstName} ${player.lastName}`);
  console.log(`- Asset ID:       ${player.assetId} (Player ID: ${player.playerId})`);
  console.log(`- Position:       ${player.position}`);
  console.log(`- Alt Positions:  ${allAltPos.join(', ') || 'None'}`);
  console.log(`- Height/Weight:  ${player.height} cm / ${player.weight} kg`);
  console.log(`- Foot:           ${player.foot === 1 ? 'Left' : 'Right'} (WF: ${player.weakFoot}/5)`);
  console.log(`- Work Rate:      ATT: ${getWorkRateLabel(player.workRateAtt)} | DEF: ${getWorkRateLabel(player.workRateDef)}`);
  console.log(`- Birthday:       ${new Date(player.birthday).toLocaleDateString()}`);
  console.log(`- Club:           ${cleanName(player.club.name, player.club.id, 'club')} (ID: ${player.club.id})`);
  console.log(`- League:         ${cleanName(player.league.name, player.league.id, 'league')} (ID: ${player.league.id})`);
  console.log(`- Nation:         ${cleanName(player.nation.name, player.nation.id, 'nation')} (ID: ${player.nation.id})`);
  console.log(`- Program:        ${cleanName(player.source, undefined, 'program')}`);
  console.log(`- Bio:            ${player.bio}`);

  console.log(`\n[ BASE STATS ]`);
  const mainStats = getMainStats(player);
  console.log(mainStats.map(s => ` ${s.label}: ${s.value} `).join(' | '));

  console.log(`\n[ DETAILED ATTRIBUTES ]`);
  const s = player.stats;
  console.log(` PACE:       Acc: ${s.acc}  | Spd: ${s.spd}`);
  console.log(` SHOOTING:   Fin: ${s.fin}  | ShP: ${s.sho} | Lng: ${s.lsa} | Vol: ${s.vol} | Pen: ${s.pen} | Pos: ${s.pos}`);
  console.log(` PASSING:    ShP: ${s.spa}  | Lng: ${s.lpa} | Vis: ${s.vis} | Cro: ${s.cro} | Cur: ${s.cur} | FrK: ${s.frk}`);
  console.log(` DRIBBLING:  Dri: ${s.dri}  | Agi: ${s.agi} | Bal: ${s.bal} | BaC: ${s.bac} | Rea: ${s.rea}`);
  console.log(` DEFENDING:  Mrk: ${s.mrk}  | StT: ${s.stt} | SlT: ${s.slt} | Hea: ${s.hea} | Awr: ${s.awr}`);
  console.log(` PHYSICAL:   Str: ${s.str}  | Agg: ${s.agg} | Jmp: ${s.jmp} | Sta: ${s.sta}`);
  if (player.position === 'GK') {
    console.log(` GOALKEEP:   Div: ${s.gkd}  | Han: ${s.han} | Kic: ${s.gkk} | Pos: ${s.gkp} | Ref: ${s.ref}`);
  }
  console.log(` TOTAL:      ${s.total}`);

  console.log(`\n[ TRAITS ]`);
  if (traits.length > 0) {
    traits.forEach(t => {
      console.log(`- ${getTraitTitle(t.id, t.title)} [${t.image}]`);
    });
  } else {
    console.log(`- No specialized traits listed`);
  }

  console.log(`\n[ SKILL MOVE REQUIREMENTS ]`);
  const moves = getSkillRequirements(player.skillMovesLevel);
  console.log(`- PRIMARY:   ${cleanName(player.skillMoves?.title || 'Unknown', player.skillMoves?.id, 'skill_move')}`);
  console.log(`- AVAILABLE: ${moves.available.map(m => m.name).join(', ')}`);
  console.log(`- LOCKED:    ${moves.locked.map(m => `${m.name} (${m.stars}★)`).join(', ') || 'None'}`);

  console.log(`\n[ SKILL PROGRESSION TREE ]`);
  if (player.skillStyleSkills && player.skillStyleSkills.length > 0) {
    // 1. Get all skills data for this player
    const playerSkills = player.skillStyleSkills.map(sk => ({
      ...sk,
      data: SKILL_BOOSTS[sk.id],
      title: getSkillTitle(sk.id, sk.name, sk.image)
    }));

    // 2. Identify the Tiers by following the chain on the card
    const tier1 = playerSkills.find(s => s.data && s.data.requirement === null);
    const tier2 = playerSkills.find(s => s.data && s.data.requirement && tier1 && s.data.requirement.skillId === tier1.id);
    
    player.skillStyleSkills.forEach((sk) => {
      const title = getSkillTitle(sk.id, sk.name, sk.image);
      console.log(`\n> SKILL: ${title}`);
      console.log(`  Icon: ${sk.image}`);
      
      const skillData = SKILL_BOOSTS[sk.id];
      if (skillData) {
        // Dynamic Requirement Logic (Follow the Chain)
        let requirementText = '';
        
        const isTier1 = tier1 && sk.id === tier1.id;
        const isTier2 = tier2 && sk.id === tier2.id;
        const isTier3 = !isTier1 && !isTier2;

        if (isTier2 && tier1) {
          requirementText = `${tier1.title} Lvl 2`;
        } else if (isTier3 && tier2) {
          requirementText = `${tier2.title} Lvl 2`;
        } else if (isTier3 && tier1 && !tier2) {
          // Fallback if card skips a tier
          requirementText = `${tier1.title} Lvl 2`;
        }

        if (requirementText) console.log(`  Requirement: ${requirementText}`);

        for (let lvl = 1; lvl <= 3; lvl++) {
          const details = getSkillDetails(sk.id, lvl);
          if (details) {
            let line = `  [Level ${lvl}] Boosts: ${details.boosts.join(', ')}`;
            if (details.unlockedPositions.length > 0) {
              line += ` | UNLOCKS: ${details.unlockedPositions.join(', ')}`;
            }
            console.log(line);
          }
        }
      } else {
        console.log(`  (No details available for this skill)`);
        missingSkillsToHeal.push({
          skillId: sk.id,
          playerId: player.playerId,
          name: title
        });
      }
    });
  }

  console.log(`\n===========================================================\n`);
}

function displayPlayers(players: Player[]) {
  if (players.length === 0) {
    console.log('No players found.');
    return;
  }

  // Iterate through all players and show full details for each
  for (const player of players) {
    displayPlayerDetail(player);
  }
  
  console.log(`\nTotal results displayed: ${players.length}`);
}

program.parse(process.argv);

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down...');
  process.exit(0);
});
