/**
 * Quick fix for the 4 remaining skills that timed out (11310-11340 = Kahn style).
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Pool } from 'pg';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

const TREE_PATH = path.join(process.cwd(), 'src/utils/skillTree.ts');
const TARGET_SKILLS = [11310, 11320, 11330, 11340];

function loadCurrentTree(): Record<number, any> {
  const content = fs.readFileSync(TREE_PATH, 'utf8');
  const match = content.match(/export const SKILL_TREE: Record<number, any> = (\{[\s\S]+\});\s*$/);
  if (match) return JSON.parse(match[1]);
  return {};
}

function saveTree(tree: Record<number, any>): void {
  const code = `// Master Skill Tree (Requirements & Boosts)\nexport const SKILL_TREE: Record<number, any> = ${JSON.stringify(tree, null, 2)};\n`;
  fs.writeFileSync(TREE_PATH, code, 'utf8');
}

async function go() {
  const pool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432'),
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    database: process.env.PG_DATABASE || 'renderz_db',
  });

  // Get all player IDs that have these skills (ordered by newest)
  const r = await pool.query(`
    SELECT DISTINCT player_id::bigint as pid
    FROM player_available_skills 
    WHERE skill_id = ANY(ARRAY[${TARGET_SKILLS.join(',')}]::int[])
    ORDER BY pid DESC
    LIMIT 10
  `);
  const playerIds: number[] = r.rows.map((row: any) => Number(row.pid));
  logger.info(`Trying ${playerIds.length} players for skills [${TARGET_SKILLS.join(', ')}]`);

  await pool.end();

  const browser = await chromium.launch({ headless: false }); // headless:false to see what happens
  const page = await browser.newPage();

  // Warm up
  await page.goto('https://renderz.app/24/players', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));

  const masterTree = loadCurrentTree();
  let learned = 0;

  for (const pid of playerIds) {
    logger.info(`Trying player ${pid}...`);
    try {
      await page.goto(`https://renderz.app/24/player/${pid}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e: any) {
      logger.warn(`Timeout: ${e.message}`);
      continue;
    }

    const skillsData = await page.evaluate(async () => {
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
            try { return new Function(`return ${text.substring(startIdx + 11, endIdx)}`)(); } catch (_) {}
          }
        }
        return null;
      };
      let d = findData();
      if (d) return d;
      for (let j = 0; j < 20; j++) { await new Promise((r: any) => setTimeout(r, 500)); d = findData(); if (d) return d; }
      return null;
    });

    if (!skillsData) { logger.warn(`  No skillsData on player ${pid}`); continue; }

    for (const item of skillsData) {
      const sk = item.skill;
      if (!sk || !sk.id || !TARGET_SKILLS.includes(sk.id)) continue;
      const maxLevel = sk.levels?.reduce((m: number, l: any) => Math.max(m, l.level), 0) || 1;
      const unlocks: any = {};
      const boosts: any = {};
      for (const l of (sk.levels || [])) {
        if (l.unlockedPositions?.length > 0) unlocks[l.level] = l.unlockedPositions;
        boosts[l.level] = l.abilityModifiers || {};
      }
      masterTree[sk.id] = { id: sk.id, name: sk.name || `Skill ${sk.id}`, maxLevel, requirement: item.requirement || null, unlocks, boosts };
      learned++;
      logger.info(`  ✅ Learned skill ${sk.id}: ${JSON.stringify(boosts[1])}`);
    }

    if (TARGET_SKILLS.every(id => {
      const e = masterTree[id];
      return e && Object.keys(e.boosts || {}).some(k => Object.keys(e.boosts[k]).length > 0);
    })) break;

    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  if (learned > 0) {
    saveTree(masterTree);
    logger.info(`✅ Saved ${learned} skills. skillTree.ts updated.`);
  } else {
    logger.warn(`No skills learned. They may need manual entry.`);
  }
}

go().catch(console.error);
