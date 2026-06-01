import { Player, Trait, Skill } from '../types/player';
import { RENDERZ_DICTIONARY } from './renderzDictionary';
import { SKILL_TREE } from './skillTree';

/**
 * MAPPINGS & DICTIONARIES
 * These are built from FC Mobile 24/25/26 data standards.
 */

const NATIONS: Record<number, string> = {
  52: 'Argentina', 14: 'England', 54: 'Brazil', 18: 'France', 21: 'Germany',
  45: 'Spain', 38: 'Portugal', 34: 'Netherlands', 31: 'Italy', 39: 'USA',
  350: 'Saudi Arabia', 5: 'Belgium', 35: 'Norway', 44: 'Scotland', 27: 'Japan',
  25: 'South Korea', 117: 'Morocco', 30: 'Ivory Coast', 42: 'Senegal', 111: 'Cameroon',
  103: 'Nigeria', 49: 'Uruguay', 48: 'Turkey', 10: 'Austria', 22: 'Ghana'
};

const LEAGUES: Record<number, string> = {
  13: 'Premier League', 53: 'La Liga', 19: 'Bundesliga', 31: 'Serie A', 16: 'Ligue 1',
  39: 'MLS', 350: 'Saudi Pro League', 2118: 'Nation Story', 10: 'Eredivisie', 
  14: 'Liga NOS', 60: 'Super Lig', 1: 'World Class'
};

const CLUBS: Record<number, string> = {
  112893: 'Inter Miami', 1369: 'PSG', 241: 'FC Barcelona', 10: 'Manchester City',
  11: 'Manchester United', 243: 'Real Madrid', 5: 'Chelsea', 45: 'Juventus',
  22: 'Bayern Munich', 21: 'Borussia Dortmund', 240: 'Atletico Madrid',
  112658: 'Al Nassr', 112392: 'Al Hilal', 73: 'Spurs', 9: 'Liverpool', 1: 'Arsenal'
};

const PROGRAMS: Record<string, string> = {
  'PROGRAM_TOTS26': 'TOTS 2026',
  'PROGRAM_BASE': 'Base Card',
  'PROGRAM_ICONS': 'Icon',
  'PROGRAM_HEROS8': 'Heroes',
  'PROGRAM_TOTY': 'TOTY',
  'PROGRAM_UCL': 'Champions League',
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

/**
 * SKILL MOVE DATABASE (Requirements)
 */
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

const SKILL_MOVE_NAMES: Record<number, string> = {
  13: 'Roulette',
  1: 'Heel to Heel Flick',
  4: 'Rainbow',
  5: 'Lane Change',
  12: 'Stepover',
  2: 'Ball Roll',
  44: 'Open Up Fake Shot',
  3: 'Flip Flap',
  52: 'Rainbow (Legacy)'
};

/**
 * CLEANING LOGIC
 */
export function cleanName(name: string, id?: number, type?: 'club' | 'league' | 'nation' | 'program' | 'skill_move'): string {
  if (!name) return 'Unknown';

  // 1. Check Dictionaries First
  if (id !== undefined) {
    if (type === 'nation' && NATIONS[id]) return NATIONS[id];
    if (type === 'league' && LEAGUES[id]) return LEAGUES[id];
    if (type === 'club' && CLUBS[id]) return CLUBS[id];
    if (type === 'skill_move' && SKILL_MOVE_NAMES[id]) return SKILL_MOVE_NAMES[id];
  }

  // Check Master RenderZ Dictionary
  if (RENDERZ_DICTIONARY[name]) {
    return RENDERZ_DICTIONARY[name];
  }

  // Handle Skill Move IDs embedded in name strings
  if (name.toLowerCase().includes('skillmove_name_') || name.toLowerCase().includes('skill_move_')) {
    const moveId = parseInt(name.replace(/skillmove_name_|skill_move_/gi, ''));
    if (!isNaN(moveId) && SKILL_MOVE_NAMES[moveId]) return SKILL_MOVE_NAMES[moveId];
  }

  // Fallback for raw IDs being passed as names
  if (!isNaN(parseInt(name)) && SKILL_MOVE_NAMES[parseInt(name)]) {
    return SKILL_MOVE_NAMES[parseInt(name)];
  }
  
  if (type === 'program' && PROGRAMS[name]) return PROGRAMS[name];

  // 2. Regex Cleaning (Strip Prefixes)
  return name
    .replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_|trait_name_|skillmove_name_|skill_move_)/i, '')
    .replace(/_/g, ' ')
    .trim();
}

/**
 * WORK RATE MAPPING
 * Based on UI observation: 2=High, 0=Medium, 1=Low
 */
export function getWorkRateLabel(val: number): string {
  const map: Record<number, string> = { 2: 'High', 0: 'Medium', 1: 'Low' };
  return map[val] || 'Medium';
}

/**
 * MAIN STAT MAPPING (Weighted Categories)
 */
export function getMainStats(player: Player) {
  const isGK = player.position === 'GK';
  const data = isGK ? player.avgGkStats : player.avgStats;

  if (isGK) {
    return [
      { label: 'DIV', value: data.avg1 },
      { label: 'HAN', value: data.avg2 },
      { label: 'KIC', value: data.avg3 },
      { label: 'REF', value: data.avg4 },
      { label: 'SPD', value: data.avg5 },
      { label: 'POS', value: data.avg6 },
    ];
  }

  return [
    { label: 'PAC', value: data.avg1 },
    { label: 'SHO', value: data.avg2 },
    { label: 'PAS', value: data.avg3 },
    { label: 'DRI', value: data.avg4 },
    { label: 'DEF', value: data.avg5 },
    { label: 'PHY', value: data.avg6 },
  ];
}

/**
 * REQUIREMENT LOGIC
 */
export function getSkillRequirements(skillLevel: number) {
  return {
    available: SKILL_MOVES_DATABASE.filter(s => s.stars <= skillLevel),
    locked: SKILL_MOVES_DATABASE.filter(s => s.stars > skillLevel)
  };
}

/**
 * TRAIT TITLES
 */
const TRAITS: Record<number, string> = {
  1: 'Long Throw',
  2: 'Powerful Driven Free Kick',
  7: 'Dives Into Tackles',
  12: 'Early Crosser',
  13: 'Finesse Shot',
  14: 'Flair',
  15: 'Long Passer',
  16: 'Long Shot Taker',
  18: 'Play Maker',
  22: 'Power Header',
  25: 'Outside Foot Shot',
  29: 'Acrobatic Clearance',
  3: 'Injury Prone',
  8: 'Early Crosser',
  11: 'Long Shot Taker',
  17: 'Technical Dribbler',
  20: 'Flair',
  21: 'Solid Player',
  24: 'Team Player'
};

export function getTraitTitle(id: number, rawTitle: string): string {
  if (/^traits?[_ ]title[_ ]\d+$/i.test(rawTitle)) {
    return TRAITS[id] || cleanName(rawTitle);
  }

  if (rawTitle && !/^trait_name_\d+$/i.test(rawTitle)) {
    return cleanName(rawTitle);
  }

  // If the title contains "skillmove" or "skill_move", it's a move being shown as a trait
  if (rawTitle.toLowerCase().includes('skillmove') || rawTitle.toLowerCase().includes('skill_move')) {
    return cleanName(rawTitle);
  }
  return TRAITS[id] || cleanName(rawTitle);
}

/**
 * SKILL PROGRESSION DATABASE (Hierarchy & Levels)
 */
// Keep export for backward compatibility with index.ts
export const SKILL_BOOSTS = SKILL_TREE;

export function getSkillDetails(id: number, level: number = 1) {
  const tree = SKILL_TREE as any;
  const data = tree[id];
  if (!data) return null;

  if (level > data.maxLevel) return null;

  const unlocked = data.unlocks[level] || [];
  const boostMap = data.boosts[level] || {};
  
  const formattedBoosts = Object.entries(boostMap).map(([stat, val]) => {
    return `${STAT_NAMES[stat] || stat.toUpperCase()} +${val}`;
  });
  
  let requiresStr = '';
  if (data.requirement) {
    const parentId = data.requirement.skillId;
    const parentSkill = tree[parentId];
    const parentName = parentSkill ? cleanName(parentSkill.name) : `Skill ID ${parentId}`;
    requiresStr = `${parentName} Lvl ${data.requirement.level}`;
  }

  return {
    name: cleanName(data.name),
    boosts: formattedBoosts,
    unlockedPositions: unlocked,
    requires: requiresStr
  };
}

export function getSkillTitle(id: number, rawName: string, iconUrl?: string): string {
  const tree = SKILL_TREE as any;
  const skillData = tree[id];
  const resolvedName = skillData?.name || RENDERZ_DICTIONARY[rawName] || rawName;
  const cleaned = cleanName(resolvedName);
  
  // Final Fallback: Icon URL Trick
  if ((cleaned === rawName || !isNaN(parseInt(cleaned))) && iconUrl) {
    const urlMatch = iconUrl.match(/skill_S10_([A-Z_]+)_\d+/i) || iconUrl.match(/skill_([A-Z_]+)_\d+/i);
    if (urlMatch) {
        return urlMatch[1].replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
  }
  
  return cleaned;
}

