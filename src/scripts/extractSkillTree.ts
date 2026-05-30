import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import logger from '../utils/logger';
import { RENDERZ_DICTIONARY } from '../utils/renderzDictionary';

chromium.use(stealthPlugin());

const TREE_PATH = path.join(__dirname, '../utils/skillTree.ts');

async function extractExhaustiveSkillTree() {
  logger.info('🚀 Starting Optimized Exhaustive Master Skill Tree Extraction...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Load existing tree if it exists to allow resuming
  let masterTree: Record<number, any> = {};
  if (fs.existsSync(TREE_PATH)) {
      try {
          // Quick hack to parse existing exported object
          const content = fs.readFileSync(TREE_PATH, 'utf8');
          const jsonMatch = content.match(/export const SKILL_TREE: Record<number, any> = (\{[\s\S]*?\});/);
          if (jsonMatch) {
              masterTree = JSON.parse(jsonMatch[1]);
              logger.info(`Resuming with ${Object.keys(masterTree).length} existing skills.`);
          }
      } catch (e) {}
  }

  const skillIds = Object.keys(RENDERZ_DICTIONARY)
    .filter(k => k.startsWith('NAME_SKILL_'))
    .map(k => k.replace('NAME_SKILL_', ''));
  
  logger.info(`Target: ${skillIds.length} unique skill IDs.`);

  try {
    await page.goto('https://renderz.app/24/players', { waitUntil: 'domcontentloaded', timeout: 60000 });

    for (let i = 0; i < skillIds.length; i++) {
        const id = parseInt(skillIds[i]);
        if (masterTree[id]) continue;

        logger.info(`[${i+1}/${skillIds.length}] Processing Skill ID: ${id}`);

        try {
            const filterUrl = `https://renderz.app/24/players?skills=["${id}"]`;
            await page.goto(filterUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            
            // Wait for link with a shorter timeout
            const playerUrl = await page.waitForSelector('a[href^="/24/player/"]', { timeout: 10000 })
                .then(el => el?.evaluate((a: any) => a.href))
                .catch(() => null);

            if (playerUrl) {
                logger.info(`Found player for Skill ${id}. Extracting...`);
                await page.goto(playerUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
                
                // Poll for __sveltekit_ data instead of waiting for networkidle
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

                    // Try immediately
                    let data = findData();
                    if (data) return data;
                    
                    // Poll for 5 seconds
                    for (let j = 0; j < 10; j++) {
                        await new Promise(r => setTimeout(r, 500));
                        data = findData();
                        if (data) return data;
                    }
                    return null;
                });

                if (skillsData) {
                    let capturedCount = 0;
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

                            masterTree[sk.id] = {
                                id: sk.id,
                                name: RENDERZ_DICTIONARY[`NAME_SKILL_${sk.id}`] || sk.name,
                                maxLevel,
                                requirement: item.requirement ? { skillId: item.requirement.skillId, level: item.requirement.level } : null,
                                unlocks,
                                boosts
                            };
                            capturedCount++;
                        }
                    }
                    logger.info(`✅ Captured ${capturedCount} new skills. Total: ${Object.keys(masterTree).length}`);
                    
                    // Periodic save to prevent data loss
                    const tsCode = `// Master Skill Tree (Requirements & Boosts)\nexport const SKILL_TREE: Record<number, any> = ${JSON.stringify(masterTree, null, 2)};\n`;
                    fs.writeFileSync(TREE_PATH, tsCode, 'utf8');
                }
            } else {
                logger.warn(`⚠️ No players found for ${id}.`);
            }
        } catch (err: any) {
            logger.error(`❌ Error on ${id}: ${err.message}`);
        }
    }

    logger.info(`🏁 DONE! Master tree saved to ${TREE_PATH}`);

  } catch (error: any) {
    logger.error(`Fatal: ${error.message}`);
  } finally {
    await browser.close();
  }
}

extractExhaustiveSkillTree();
