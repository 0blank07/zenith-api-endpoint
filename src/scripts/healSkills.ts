import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';

chromium.use(stealthPlugin());

const TREE_PATH = path.join(process.cwd(), 'src/utils/skillTree.ts');
const DICT_PATH = path.join(process.cwd(), 'src/utils/renderzDictionary.ts');

export interface MissingSkill {
  skillId: number;
  playerId: number;
  name: string;
}

export async function healMissingSkills(missingSkills: MissingSkill[]): Promise<Record<number, any>> {
  if (!missingSkills || missingSkills.length === 0) return {};

  const newlyLearned: Record<number, any> = {};
  const uniqueMissingSkills = Array.from(new Map(missingSkills.map(item => [item.skillId, item])).values());

  logger.info(`\n🛠️  Self-Healing Triggered: Found ${uniqueMissingSkills.length} unique missing skill(s). Extracting data...`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let masterTree: Record<number, any> = {};
  if (fs.existsSync(TREE_PATH)) {
      try {
          const content = fs.readFileSync(TREE_PATH, 'utf8');
          const jsonMatch = content.match(/export const SKILL_TREE: Record<number, any> = (\{[\s\S]*?\});/);
          if (jsonMatch) masterTree = JSON.parse(jsonMatch[1]);
      } catch (e) {}
  }

  let dict: Record<string, string> = {};
  if (fs.existsSync(DICT_PATH)) {
      try {
          const content = fs.readFileSync(DICT_PATH, 'utf8');
          const jsonMatch = content.match(/export const RENDERZ_DICTIONARY: Record<string, string> = (\{[\s\S]*?\});/);
          if (jsonMatch) dict = JSON.parse(jsonMatch[1]);
      } catch (e) {}
  }

  let updatedCount = 0;

  try {
    for (const missing of uniqueMissingSkills) {
        if (masterTree[missing.skillId]) {
             newlyLearned[missing.skillId] = masterTree[missing.skillId];
             continue;
        }

        logger.info(`Extracting Skill ID ${missing.skillId} from Player ID ${missing.playerId}...`);
        
        try {
            const filterUrl = `https://renderz.app/24/players?skills=["${missing.skillId}"]`;
            await page.goto(filterUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

            let playerUrl = await page.waitForSelector('a[href^="/24/player/"]', { timeout: 10000 })
                .then(el => el?.evaluate((a: any) => a.href))
                .catch(() => null);

            if (!playerUrl) {
                playerUrl = `https://renderz.app/24/player/${missing.playerId}`;
                logger.warn(`No FC 24 player found for skill ${missing.skillId}. Falling back to direct Player ID ${missing.playerId}...`);
            }

            await page.goto(playerUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

            const skillsData = await page.evaluate(async () => {
                const findData = () => {
                    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.textContent).filter(t => t && t.includes('__sveltekit_'));
                    if (scripts.length === 0) return null;
                    const text = scripts[0] || '';
                    const startIdx = text.indexOf('skillsData:[');
                    if (startIdx === -1) return null;
                    let endIdx = -1, depth = 0;
                    for (let i = startIdx + 11; i < text.length; i++) {
                        if (text[i] === '[') depth++;
                        else if (text[i] === ']') {
                            depth--;
                            if (depth === 0) { endIdx = i + 1; break; }
                        }
                    }
                    if (endIdx !== -1) {
                        try { return new Function(`return ${text.substring(startIdx + 11, endIdx)}`)(); } catch (e) { return null; }
                    }
                    return null;
                };

                let data = findData();
                if (data) return data;
                
                for (let j = 0; j < 10; j++) {
                    await new Promise(r => setTimeout(r, 500));
                    data = findData();
                    if (data) return data;
                }
                return null;
            });

            if (skillsData) {
                for (const item of skillsData) {
                    const sk = item.skill;
                    if (!sk || !sk.id) continue;
                    
                    if (!masterTree[sk.id]) {
                        const maxLevel = sk.levels.reduce((max: number, l: any) => Math.max(max, l.level), 0);
                        const unlocks: Record<number, string[]> = {};
                        const boosts: Record<number, any> = {};

                        for (const l of sk.levels) {
                            if (l.unlockedPositions && l.unlockedPositions.length > 0) unlocks[l.level] = l.unlockedPositions;
                            boosts[l.level] = l.abilityModifiers;
                        }

                        let resolvedName = sk.name;
                        if (!resolvedName || resolvedName.startsWith('NAME_SKILL_')) {
                            resolvedName = dict[`NAME_SKILL_${sk.id}`] || missing.name;
                        } else {
                            resolvedName = dict[`NAME_SKILL_${sk.id}`] || sk.name;
                        }

                        const newSkill = {
                            id: sk.id,
                            name: resolvedName,
                            maxLevel,
                            requirement: item.requirement ? { skillId: item.requirement.skillId, level: item.requirement.level } : null,
                            unlocks,
                            boosts
                        };

                        masterTree[sk.id] = newSkill;
                        newlyLearned[sk.id] = newSkill;
                        
                        if (!dict[`NAME_SKILL_${sk.id}`]) dict[`NAME_SKILL_${sk.id}`] = resolvedName;

                        updatedCount++;
                        logger.info(`✅ Successfully scraped and learned skill: ${resolvedName} (ID: ${sk.id})`);
                    }
                }
            } else {
                logger.warn(`⚠️ Could not find skill data on page for Player ID ${missing.playerId}.`);
            }
        } catch (err: any) {
            logger.error(`❌ Error scraping Player ID ${missing.playerId}: ${err.message}`);
        }
    }

    if (updatedCount > 0) {
        logger.info(`💾 Saving ${updatedCount} new skill(s) to local databases...`);
        const tsTreeCode = `// Master Skill Tree (Requirements & Boosts)\nexport const SKILL_TREE: Record<number, any> = ${JSON.stringify(masterTree, null, 2)};\n`;
        fs.writeFileSync(TREE_PATH, tsTreeCode, 'utf8');

        const tsDictCode = `// Auto-generated mapping file. Do not edit manually.\nexport const RENDERZ_DICTIONARY: Record<string, string> = ${JSON.stringify(dict, null, 2)};\n`;
        fs.writeFileSync(DICT_PATH, tsDictCode, 'utf8');
        logger.info(`✨ Self-Healing Complete!`);
    } else {
        logger.info(`🤷 No new skills were saved.`);
    }

  } catch (error: any) {
    logger.error(`Fatal Self-Healing Error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  return newlyLearned;
}
