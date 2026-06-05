import { Player, Trait, Skill } from '../types/player';
import { RENDERZ_DICTIONARY } from './renderzDictionary';
import { SKILL_TREE } from './skillTree';

/**
 * MAPPINGS & DICTIONARIES
 */

const NATIONS: Record<number, string> = {
  52: 'Argentina', 14: 'England', 54: 'Brazil', 18: 'France', 21: 'Germany',
  45: 'Spain', 38: 'Portugal', 34: 'Netherlands', 31: 'Italy', 39: 'USA', 95: 'USA',
  350: 'Saudi Arabia', 5: 'Belgium', 7: 'Belgium', 35: 'Norway', 44: 'Scotland', 27: 'Japan',
  25: 'South Korea', 167: 'South Korea', 117: 'Morocco', 30: 'Ivory Coast', 108: 'Ivory Coast',
  42: 'Senegal', 111: 'Cameroon', 103: 'Cameroon', 49: 'Uruguay', 48: 'Turkey', 10: 'Austria',
  22: 'Ghana', 47: 'Switzerland', 83: 'Mexico', 4: 'Austria'
};

const LEAGUES: Record<number, string> = {
  13: 'Premier League', 53: 'La Liga', 78: 'LALIGA EA SPORTS', 19: 'Bundesliga',
  31: 'Serie A', 16: 'Ligue 1 Uber Eats', 350: 'ROSHN Saudi League', 39: 'Major League Soccer',
  2118: 'Nation Story', 10: 'Eredivisie', 14: 'Liga NOS', 60: 'Super Lig', 1: 'World Class',
  1980: 'Bundesliga'
};

const CLUBS: Record<number, string> = {
  112893: 'Inter Miami CF', 1369: 'Paris Saint-Germain', 1362: 'FC Barcelona', 241: 'FC Barcelona',
  10: 'Manchester City', 11: 'Manchester United', 243: 'Real Madrid', 5: 'Chelsea', 45: 'Juventus',
  22: 'Bayern Munich', 21: 'Borussia Dortmund', 240: 'Atletico Madrid',
  112658: 'Al Nassr', 112392: 'Al Hilal', 73: 'Spurs', 9: 'Liverpool', 1: 'Arsenal',
  113149: 'FC Cincinnati', 113018: 'St. Louis CITY SC', 114154: 'Icons', 115935: 'Heroes',
  1354: 'Al Nassr', 112139: 'Al Nassr', 131510: 'SC Freiburg'
};

const PROGRAMS: Record<string, string> = {
  'PROGRAM_TOTS26': 'TOTS 2026',
  'PROGRAM_BASE': 'Base Card',
  'PROGRAM_ICONS': 'Icon',
  'PROGRAM_HEROS8': 'Heroes',
  'PROGRAM_TOTY': 'TOTY',
  'PROGRAM_UCL': 'Champions League',
  'PROGRAM_UCL26': 'Champions League 2026',
  'TWG26': 'The World’s Game'
};

const STAT_NAMES: Record<string, string> = {
  acc: 'Acceleration', spd: 'Sprint Speed', fin: 'Finishing', sho: 'Shot Power',
  lsa: 'Long Shots', vol: 'Volleys', pen: 'Penalties', pos: 'Positioning',
  spa: 'Short Passing', lpa: 'Long Passing', vis: 'Vision', cro: 'Crossing',
  cur: 'Curve', frk: 'Free Kick', dri: 'Dribbling', agi: 'Agility', bal: 'Balance',
  bac: 'Ball Control', rea: 'Reactions', mrk: 'Marking', stt: 'Standing Tackle',
  slt: 'Sliding Tackle', hea: 'Heading', awr: 'Awareness', str: 'Strength',
  agg: 'Aggression', jmp: 'Jumping', sta: 'Stamina',
  gkd: 'Diving', han: 'Handling', gkk: 'Kicking', gkp: 'Positioning', ref: 'Reflexes'
};

const SKILL_MOVE_NAMES: Record<number, string> = {
  13: 'Roulette', 1: 'Heel to Heel Flick', 4: 'Rainbow', 5: 'Lane Change',
  12: 'Stepover', 2: 'Ball Roll', 44: 'Open Up Fake Shot', 3: 'Flip Flap',
  52: 'Rainbow (Legacy)', 15: 'Elastico', 43: 'Heel to Heel Flick',
  46: 'Hocus Pocus', 78: 'Lane Change', 80: 'Open Up Fake Shot'
};

const CELEBRATIONS: Record<number, string> = {
  81: 'Embrace', 80: 'Think', 79: 'Slide and Cheer', 74: 'Yoga', 69: 'Square',
  85: 'Siuuu!', 50: 'Right Here Right Now', 25: 'Belli-goal'
};

/**
 * CLEANING LOGIC - 100% Guaranteed Fail-Safe
 */
export function cleanName(name: string, id?: number, type?: 'club' | 'league' | 'nation' | 'program' | 'skill_move' | 'celebration', context?: { leagueId?: number, assetId?: number }): string {
  if (!name) return 'Unknown';
  let s = String(name).trim();

  // 1. Hardcoded Override Context (Highest Priority)
  const assetId = context?.assetId;
  if (assetId === 24045501) {
     if (type === 'club') return 'Al Nassr';
     if (type === 'league') return 'ROSHN Saudi League';
  }
  if (assetId === 24045504) {
     if (type === 'club') return 'Inter Miami CF';
     if (type === 'league') return 'Major League Soccer';
  }

  const cid = id || parseInt(s.replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_)/i, ''));
  const clid = context?.leagueId;

  // 2. PSG / Spurs Contextual Glitch (Priority over generic club map)
  if (type === 'club' && cid === 73) {
      if (clid === 16 || clid === 31 || s.toLowerCase().includes('ligue 1')) return 'Paris Saint-Germain';
  }

  // 3. Direct ID Lookup
  if (!isNaN(cid)) {
    if (type === 'nation' && NATIONS[cid]) return NATIONS[cid];
    if (type === 'league' && LEAGUES[cid]) return LEAGUES[cid];
    if (type === 'club' && CLUBS[cid]) return CLUBS[cid];
    if (type === 'skill_move' && SKILL_MOVE_NAMES[cid]) return SKILL_MOVE_NAMES[cid];
    if (type === 'celebration' && CELEBRATIONS[cid]) return CELEBRATIONS[cid];
  }

  // 4. Dictionary Lookup
  if (RENDERZ_DICTIONARY[s] && !RENDERZ_DICTIONARY[s].startsWith('NOT_FOUND_')) {
    return RENDERZ_DICTIONARY[s];
  }
  if (PROGRAMS[s]) return PROGRAMS[s];

  // 5. Regex Cleanup
  let cleaned = s
    .replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_|trait_name_|skillmove_name_|skill_move_|celebration_name_)/i, '')
    .replace(/_/g, ' ')
    .trim();

  // 6. Hardcoded Expansion Fixes
  if (cleaned === 'Ligue 1') return 'Ligue 1 Uber Eats';
  if (cleaned === 'PSG') return 'Paris Saint-Germain';

  // 7. Strict Number Blocker
  if (!isNaN(parseInt(cleaned)) && cleaned.length > 0 && !cleaned.includes(' ')) {
      const lastId = parseInt(cleaned);
      if (type === 'club' && CLUBS[lastId]) return CLUBS[lastId];
      if (type === 'league' && LEAGUES[lastId]) return LEAGUES[lastId];
      if (type === 'nation' && NATIONS[lastId]) return NATIONS[lastId];
      return `Unknown (${type || 'ID'} ${cleaned})`;
  }

  return cleaned;
}

/**
 * UTILS
 */
export function getWorkRateLabel(val: number): string {
  const map: Record<number, string> = { 2: 'High', 0: 'Medium', 1: 'Low' };
  return map[val] || 'Medium';
}

export function getMainStats(player: Player) {
  const isGK = player.position === 'GK';
  const data = isGK ? player.avgGkStats : player.avgStats;
  if (!data) return [];
  if (isGK) {
    return [
      { label: 'DIV', value: data.avg1 }, { label: 'HAN', value: data.avg2 },
      { label: 'KIC', value: data.avg3 }, { label: 'REF', value: data.avg4 },
      { label: 'SPD', value: data.avg5 }, { label: 'POS', value: data.avg6 },
    ];
  }
  return [
    { label: 'PAC', value: data.avg1 }, { label: 'SHO', value: data.avg2 },
    { label: 'PAS', value: data.avg3 }, { label: 'DRI', value: data.avg4 },
    { label: 'DEF', value: data.avg5 }, { label: 'PHY', value: data.avg6 },
  ];
}

export const SKILL_MOVES_DATABASE = [
  { name: 'Open Up Fake Shot', stars: 1 },
  { name: 'Ball Roll', stars: 2 },
  { name: 'Stepover', stars: 2 },
  { name: 'Roulette', stars: 3 },
  { name: 'Heel to Heel Flick', stars: 3 },
  { name: 'Lane Change', stars: 4 },
  { name: 'Rainbow', stars: 4 },
  { name: 'Elastico', stars: 5 },
  { name: 'Hocus Pocus', stars: 5 },
];

export function getSkillRequirements(skillLevel: number) {
  return {
    available: SKILL_MOVES_DATABASE.filter(s => s.stars <= skillLevel),
    locked: SKILL_MOVES_DATABASE.filter(s => s.stars > skillLevel)
  };
}

const TRAITS: Record<number, string> = {
  1: 'Long Throw', 2: 'Powerful Driven Free Kick', 7: 'Dives Into Tackles',
  12: 'Early Crosser', 13: 'Finesse Shot', 14: 'Flair', 15: 'Long Passer',
  16: 'Long Shot Taker', 18: 'Play Maker', 22: 'Power Header',
  25: 'Outside Foot Shot', 29: 'Acrobatic Clearance', 3: 'Injury Prone',
  8: 'Early Crosser', 11: 'Long Shot Taker', 17: 'Technical Dribbler',
  20: 'Flair', 21: 'Solid Player', 24: 'Team Player'
};

export function getTraitTitle(id: number, rawTitle: string): string {
  if (id >= 200000) {
    const celebrationId = id - 200000;
    if (CELEBRATIONS[celebrationId]) return CELEBRATIONS[celebrationId];
    return cleanName(rawTitle || `celebration_name_${celebrationId}`, celebrationId, 'celebration');
  }
  if (/^traits?[_ ]title[_ ]\d+$/i.test(rawTitle)) return TRAITS[id] || cleanName(rawTitle);
  if (rawTitle && !/^trait_name_\d+$/i.test(rawTitle)) return cleanName(rawTitle);
  return TRAITS[id] || cleanName(rawTitle);
}

export const SKILL_BOOSTS = SKILL_TREE;

export function getSkillDetails(id: number, level: number = 1) {
  const tree = SKILL_TREE as any;
  const data = tree[id];
  if (!data || level > data.maxLevel) return null;
  const unlocked = data.unlocks[level] || [];
  const boostMap = data.boosts[level] || {};
  const formattedBoosts = Object.entries(boostMap).map(([stat, val]) => `${STAT_NAMES[stat] || stat.toUpperCase()} +${val}`);
  let requiresStr = '';
  if (data.requirement) {
    const parentId = data.requirement.skillId;
    const parentSkill = tree[parentId];
    const parentName = parentSkill ? cleanName(parentSkill.name) : `Skill ID ${parentId}`;
    requiresStr = `${parentName} Lvl ${data.requirement.level}`;
  }
  return { name: cleanName(data.name), boosts: formattedBoosts, unlockedPositions: unlocked, requires: requiresStr };
}

export function getSkillTitle(id: number, rawName: string, iconUrl?: string): string {
  const tree = SKILL_TREE as any;
  const skillData = tree[id];
  const resolvedName = skillData?.name || RENDERZ_DICTIONARY[rawName] || rawName;
  const cleaned = cleanName(resolvedName);
  if ((cleaned === rawName || !isNaN(parseInt(cleaned))) && iconUrl) {
    const urlMatch = iconUrl.match(/skill_S10_([A-Z_]+)_\d+/i) || iconUrl.match(/skill_([A-Z_]+)_\d+/i);
    if (urlMatch) return urlMatch[1].replace(/_/g, ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  return cleaned;
}
