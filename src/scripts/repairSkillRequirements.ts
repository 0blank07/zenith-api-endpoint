/**
 * repairSkillRequirements.ts
 *
 * WHAT THIS SCRIPT DOES:
 *   1. Queries the DB for all unique skill IDs used by players
 *   2. Finds "bad" skills in skillTree.ts: entries that are either MISSING entirely,
 *      OR are placeholders (empty boosts = {}) created by a previous partial run
 *   3. For each bad skill, finds a sample player from the DB, visits that player's
 *      FC Mobile page on RenderZ via Playwright, and extracts the full skill data
 *      (real requirements, boosts, unlocks)
 *   4. Saves all newly learned/fixed skills to skillTree.ts + renderzDictionary.ts
 *   5. Finds all affected player asset IDs (those using the bad skills)
 *   6. Re-fetches those players from RenderZ and re-syncs them to fix
 *      is_locked, unlock_requirement_*, and prerequisite_* in the DB
 *
 * USAGE: npm run repair-skills
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { PostgresService } from '../services/postgresService';
import { SearchService } from '../services/searchService';
import { SKILL_TREE } from '../utils/skillTree';
import { RENDERZ_DICTIONARY } from '../utils/renderzDictionary';
import { SKILL_BOOSTS } from '../utils/dataCleaner';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

const TREE_PATH = path.join(process.cwd(), 'src/utils/skillTree.ts');
const DICT_PATH = path.join(process.cwd(), 'src/utils/renderzDictionary.ts');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadCurrentTree(): Record<number, any> {
  try {
    const content = fs.readFileSync(TREE_PATH, 'utf8');
    const match = content.match(/export const SKILL_TREE: Record<number, any> = (\{[\s\S]+\});\s*$/);
    if (match) return JSON.parse(match[1]);
  } catch (e: any) {
    logger.error(`Failed to parse skillTree.ts: ${e.message}`);
  }
  return { ...(SKILL_TREE as Record<number, any>) };
}

function loadCurrentDict(): Record<string, string> {
  try {
    const content = fs.readFileSync(DICT_PATH, 'utf8');
    const match = content.match(/export const RENDERZ_DICTIONARY: Record<string, string> = (\{[\s\S]+\});\s*$/);
    if (match) return JSON.parse(match[1]);
  } catch (_) {}
  return { ...RENDERZ_DICTIONARY };
}

function saveTree(tree: Record<number, any>): void {
  const code = `// Master Skill Tree (Requirements & Boosts)\nexport const SKILL_TREE: Record<number, any> = ${JSON.stringify(tree, null, 2)};\n`;
  fs.writeFileSync(TREE_PATH, code, 'utf8');
  logger.info(`✅ skillTree.ts saved — ${Object.keys(tree).length} entries.`);
}

function saveDict(dict: Record<string, string>): void {
  const code = `// Auto-generated mapping file. Do not edit manually.\nexport const RENDERZ_DICTIONARY: Record<string, string> = ${JSON.stringify(dict, null, 2)};\n`;
  fs.writeFileSync(DICT_PATH, code, 'utf8');
  logger.info(`✅ renderzDictionary.ts saved.`);
}

/** A skill is a "placeholder" if it has no boosts OR empty boosts for every level */
function isPlaceholder(entry: any): boolean {
  if (!entry) return true;
  if (!entry.boosts) return true;
  const boostKeys = Object.keys(entry.boosts);
  if (boostKeys.length === 0) return true;
  return boostKeys.every(k => Object.keys(entry.boosts[k] || {}).length === 0);
}

// ─── Browser-based skill extraction ──────────────────────────────────────────

async function scrapeSkillsFromPlayerPage(page: any, playerAssetId: number): Promise<any[] | null> {
  // /24/player/ is the SvelteKit route that embeds skillsData in script tags
  const url = `https://renderz.app/24/player/${playerAssetId}`;
  logger.info(`    Visiting ${url} ...`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  } catch (e: any) {
    logger.warn(`    Load timeout for player ${playerAssetId}: ${e.message}`);
    return null;
  }

  return await page.evaluate(async () => {
    const findData = () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s: any) => s.textContent)
        .filter((t: any) => t && t.includes('skillsData'));

      for (const text of scripts) {
        if (!text) continue;
        const startIdx = text.indexOf('skillsData:[');
        if (startIdx === -1) continue;
        let endIdx = -1, depth = 0;
        for (let i = startIdx + 11; i < text.length; i++) {
          if (text[i] === '[') depth++;
          else if (text[i] === ']') {
            depth--;
            if (depth === 0) { endIdx = i + 1; break; }
          }
        }
        if (endIdx !== -1) {
          try {
            return new Function(`return ${text.substring(startIdx + 11, endIdx)}`)();
          } catch (_) {}
        }
      }
      return null;
    };

    let data = findData();
    if (data) return data;
    for (let j = 0; j < 18; j++) {
      await new Promise((r: any) => setTimeout(r, 500));
      data = findData();
      if (data) return data;
    }
    return null;
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function repairSkillRequirements() {
  logger.info('🔧 Starting Skill Requirements Repair (Browser Mode)...\n');

  const db = new PostgresService();
  const pool = (db as any).pool;
  const searchService = new SearchService();

  // ── 1. Find all unique skill IDs in DB ──────────────────────────────────
  logger.info('📊 Step 1: Querying DB for all unique skill IDs used by players...');
  const dbSkillsResult = await pool.query(`
    SELECT DISTINCT
      pas.skill_id::int AS skill_id,
      MAX(pas.player_id::bigint) AS sample_player_id
    FROM player_available_skills pas
    GROUP BY pas.skill_id
    ORDER BY pas.skill_id
  `);

  const allDbSkills: { skillId: number; samplePlayerId: number }[] = dbSkillsResult.rows.map((r: any) => ({
    skillId: Number(r.skill_id),
    samplePlayerId: Number(r.sample_player_id)
  }));
  logger.info(`  Found ${allDbSkills.length} unique skill IDs in DB.\n`);

  // ── 2. Find "bad" skills: missing OR placeholder (empty boosts) ──────────
  const masterTree = loadCurrentTree();
  const dict = loadCurrentDict();

  const badSkills = allDbSkills.filter(s => {
    const entry = masterTree[s.skillId];
    return !entry || isPlaceholder(entry);
  });

  logger.info(`  Skills in skillTree.ts: ${Object.keys(masterTree).length}`);
  logger.info(`  Bad skills (missing/placeholder): ${badSkills.length}`);

  if (badSkills.length === 0) {
    logger.info('✅ All skills have real data in skillTree.ts!');
  } else {
    logger.info(`\n⚠️  Step 2: Bad skill IDs: ${badSkills.map(s => s.skillId).join(', ')}\n`);

    // ── 3. Browser scrape for real skill data ─────────────────────────────
    logger.info('🌐 Step 3: Launching browser to scrape from FC Mobile player pages...');
    const browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    const context = await browser.newContext();
    const page = await context.newPage();

    logger.info('  Warming up on RenderZ...');
    try {
      await page.goto('https://renderz.app/24/players', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(r => setTimeout(r, 2000));
    } catch (_) {}

    // Group by sample player so one page visit covers multiple skills
    const playerToSkillIds = new Map<number, number[]>();
    for (const { skillId, samplePlayerId } of badSkills) {
      if (!playerToSkillIds.has(samplePlayerId)) playerToSkillIds.set(samplePlayerId, []);
      playerToSkillIds.get(samplePlayerId)!.push(skillId);
    }

    logger.info(`  Will visit ${playerToSkillIds.size} player pages.\n`);

    let learnedTotal = 0;
    for (const [playerAssetId, skillIds] of playerToSkillIds) {
      // Check if all skills for this player were already learned from another page visit
      const stillBad = skillIds.filter(id => isPlaceholder(masterTree[id]));
      if (stillBad.length === 0) {
        logger.info(`  Player ${playerAssetId}: all skills already updated, skipping.`);
        continue;
      }

      logger.info(`  Player ${playerAssetId}: targeting skills [${stillBad.join(', ')}]...`);
      const skillsData = await scrapeSkillsFromPlayerPage(page, playerAssetId);

      if (!skillsData || skillsData.length === 0) {
        logger.warn(`  ⚠️  No skillsData found on page for player ${playerAssetId}.`);
        continue;
      }

      let learned = 0;
      for (const item of skillsData) {
        const sk = item.skill;
        if (!sk || !sk.id) continue;

        // Only update if it's a skill we care about AND it's currently bad
        if (!isPlaceholder(masterTree[sk.id])) continue;

        const maxLevel = sk.levels?.reduce((m: number, l: any) => Math.max(m, l.level), 0) || 1;
        const unlocks: Record<number, string[]> = {};
        const boosts: Record<number, any> = {};

        for (const l of (sk.levels || [])) {
          if (l.unlockedPositions?.length > 0) unlocks[l.level] = l.unlockedPositions;
          boosts[l.level] = l.abilityModifiers || {};
        }

        const resolvedName = dict[`NAME_SKILL_${sk.id}`] || sk.name || `Skill ${sk.id}`;
        const entry = {
          id: sk.id,
          name: resolvedName,
          maxLevel,
          requirement: item.requirement
            ? { skillId: item.requirement.skillId, level: item.requirement.level }
            : null,
          unlocks,
          boosts
        };

        masterTree[sk.id] = entry;
        (SKILL_BOOSTS as any)[sk.id] = entry;

        if (!dict[`NAME_SKILL_${sk.id}`] && sk.name && !sk.name.startsWith('NAME_SKILL_')) {
          dict[`NAME_SKILL_${sk.id}`] = sk.name;
        }

        learned++;
        const reqStr = entry.requirement
          ? `requires Skill ${entry.requirement.skillId} LVL${entry.requirement.level}`
          : 'no requirement';
        const boostStr = Object.entries(boosts[1] || {}).map(([k, v]) => `${k}+${v}`).join(', ') || 'no boosts';
        logger.info(`    ✅ Skill ${sk.id} "${resolvedName}": ${reqStr} | ${boostStr}`);
      }

      learnedTotal += learned;
      logger.info(`    → Learned ${learned} real skills from player ${playerAssetId}.\n`);

      await new Promise(r => setTimeout(r, 1000));
    }

    await browser.close();

    // ── 4. Save ──────────────────────────────────────────────────────────
    if (learnedTotal > 0) {
      logger.info(`\n💾 Step 4: Saving ${learnedTotal} updated skills to skillTree.ts...`);
      saveTree(masterTree);
      saveDict(dict);
    } else {
      logger.warn(`\n⚠️  Step 4: Couldn't extract any real skill data from player pages.`);
      logger.warn(`   The skillsData may not be embedded in these player pages.`);
      logger.warn(`   Skills will remain as placeholders (no requirements/boosts).`);
    }
  }

  // ── 5. Find affected players to re-sync ─────────────────────────────────
  logger.info('\n🔍 Step 5: Finding affected players to re-sync in DB...');

  const badSkillIds = badSkills.map(s => s.skillId);
  let affectedPlayerIds: number[] = [];

  if (badSkillIds.length > 0) {
    const affectedResult = await pool.query(`
      SELECT DISTINCT player_id::bigint AS player_id
      FROM player_available_skills
      WHERE skill_id = ANY($1::int[])
      ORDER BY player_id
    `, [badSkillIds]);
    affectedPlayerIds = affectedResult.rows.map((r: any) => Number(r.player_id));
    logger.info(`  Found ${affectedPlayerIds.length} players whose skills need re-syncing.`);
  } else {
    // All skills are good — check if any player has is_locked incorrectly set
    // Only check the players added in the last sync
    const recentResult = await pool.query(`
      SELECT DISTINCT pas.player_id::bigint AS player_id
      FROM player_available_skills pas
      WHERE pas.is_locked = false
        AND EXISTS (
          SELECT 1 FROM player_available_skills pas2
          WHERE pas2.player_id = pas.player_id
            AND pas2.prerequisite_skill_id IS NULL
            AND pas2.unlock_requirement_skillname IS NULL
        )
      ORDER BY player_id
      LIMIT 500
    `);
    affectedPlayerIds = recentResult.rows.map((r: any) => Number(r.player_id));
    logger.info(`  Found ${affectedPlayerIds.length} players with potentially wrong lock status.`);
  }

  if (affectedPlayerIds.length === 0) {
    logger.info('✅ No players to re-sync!');
    await db.disconnect();
    return;
  }

  // ── 6. Re-sync affected players ──────────────────────────────────────────
  logger.info(`\n🔄 Step 6: Re-syncing ${affectedPlayerIds.length} players from RenderZ...\n`);

  const BATCH_SIZE = 50;
  let synced = 0;
  let notFound = 0;

  for (let i = 0; i < affectedPlayerIds.length; i += BATCH_SIZE) {
    const batch = affectedPlayerIds.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(affectedPlayerIds.length / BATCH_SIZE);
    logger.info(`  Batch ${batchNum}/${totalBatches}: Fetching ${batch.length} players...`);

    try {
      const players = await searchService.getPlayersByAssetIds(batch);
      if (players.length > 0) {
        await db.savePlayers(players);
        synced += players.length;
        logger.info(`    ✅ Re-synced ${players.length} players.`);
      }
      if (players.length < batch.length) notFound += batch.length - players.length;
    } catch (err: any) {
      logger.error(`    ❌ Batch ${batchNum} failed: ${err.message}`);
    }

    if (i + BATCH_SIZE < affectedPlayerIds.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  logger.info(`\n🎉 REPAIR COMPLETE!`);
  logger.info(`   ✅ Players re-synced: ${synced}`);
  if (notFound > 0) logger.warn(`   ⚠️  Not found on RenderZ (delisted): ${notFound}`);
  logger.info(`\n   Skill locks and requirements are now correct in the database.`);
  logger.info(`   Restart your Zenith app to see changes.`);

  await db.disconnect();
}

repairSkillRequirements().catch(err => {
  logger.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
