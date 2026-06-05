import { Player, Trait, Skill } from '../types/player';
import { RENDERZ_DICTIONARY } from './renderzDictionary';
import { SKILL_TREE } from './skillTree';

/**
 * MAPPINGS & DICTIONARIES
 * These are built from FC Mobile 24/25/26 data standards.
 */

const NATIONS: Record<number, string> = {
  52: 'Argentina', 14: 'England', 54: 'Brazil', 18: 'France', 21: 'Germany',
  45: 'Spain', 38: 'Portugal', 34: 'Netherlands', 31: 'Italy', 39: 'USA', 95: 'USA',
  350: 'Saudi Arabia', 5: 'Belgium', 7: 'Belgium', 35: 'Norway', 44: 'Scotland', 27: 'Japan',
  25: 'South Korea', 167: 'South Korea', 117: 'Morocco', 30: 'Ivory Coast', 108: 'Ivory Coast',
  42: 'Senegal', 111: 'Cameroon', 103: 'Cameroon', 49: 'Uruguay', 48: 'Turkey', 10: 'Austria',
  22: 'Ghana', 47: 'Switzerland', 83: 'Mexico'
};

const LEAGUES: Record<number, string> = {
  13: 'Premier League', 53: 'La Liga', 78: 'LALIGA EA SPORTS', 19: 'Bundesliga',
  31: 'Serie A', 16: 'Ligue 1 Uber Eats', 39: 'MLS', 350: 'Saudi Pro League',
  2118: 'Nation Story', 10: 'Eredivisie', 14: 'Liga NOS', 60: 'Super Lig', 1: 'World Class'
};

const CLUBS: Record<number, string> = {
  112893: 'Inter Miami', 1369: 'Paris Saint-Germain', 1362: 'FC Barcelona', 241: 'FC Barcelona',
  10: 'Manchester City', 11: 'Manchester United', 243: 'Real Madrid', 5: 'Chelsea', 45: 'Juventus',
  22: 'Bayern Munich', 21: 'Borussia Dortmund', 240: 'Atletico Madrid',
  112658: 'Al Nassr', 112392: 'Al Hilal', 73: 'Spurs', 9: 'Liverpool', 1: 'Arsenal',
  113149: 'FC Cincinnati', 113018: 'St. Louis CITY SC', 114154: 'Icons', 115935: 'Heroes'
};

const PROGRAMS: Record<string, string> = {
  'PROGRAM_TOTS26': 'TOTS 2026',
  'PROGRAM_BASE': 'Base Card',
  'PROGRAM_ICONS': 'Icon',
  'PROGRAM_HEROS8': 'Heroes',
  'PROGRAM_TOTY': 'TOTY',
  'PROGRAM_UCL': 'Champions League',
  'PROGRAM_UCL26': 'Champions League 2026'
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
 * CELEBRATION DATABASE
 */
const CELEBRATIONS: Record<number, string> = {
  81: 'Embrace', 80: 'Think', 79: 'Slide and Cheer', 74: 'Yoga', 69: 'Square',
  58: 'X', 57: 'Scorpion', 55: 'Cell Phone', 54: 'Baby', 52: 'Point to Sky',
  50: 'Right Here Right Now', 78: 'Samba', 68: 'Waddle', 66: 'Timber', 63: 'Stand Tall',
  56: 'Kiss the Ring', 48: 'Thigh Point', 46: 'Walking Backflip', 45: 'Violinist',
  42: 'Torero', 41: 'Standing Arm Sweep', 39: 'Stand and Point to Sky', 38: 'Spanish Archer',
  37: 'Side Slide', 36: 'Shoulder Dust', 34: 'Samba Dance', 31: 'Robot', 30: 'Punch and Dodge',
  24: 'Knee Slide Spin', 23: 'Knee Slide Fall on Back', 22: 'Knee Slide Arms Out',
  20: 'Jump Punch to Fist Pump', 19: "I Can't Hear You", 18: 'Heel Taps', 15: 'Hand Spring',
  14: 'Front Flip', 13: 'Push-Up', 10: 'Chest Slide', 9: 'Karate Kick', 7: 'Cart Wheel',
  6: 'Brick Fall', 2: 'Embrace / Default', 3: 'Chest Slide', 5: 'Point to Crowd',
  11: 'Bow', 21: 'Heart', 25: 'Belli-goal (Arms Out)', 27: 'One Arm Raised',
  28: 'Knee Slide', 29: 'Slide Salute', 32: 'Fist Pump', 40: 'Spanish Archer / Carlos Signature',
  43: 'Hand Spring', 44: 'Kneel and Point to Heavens', 47: 'Calm Down', 51: 'Dance',
  60: 'Arms Crossed', 62: 'Boxing', 64: 'Robot', 67: 'Matador', 70: 'Meditation (Zen)',
  85: 'Siuuu! / Right Here Right Now', 86: 'Arms Crossed (Alt)', 87: 'Point to Sky',
  8: 'Cart Wheel and Flip'
};


/**
 * CLEANING LOGIC
 */
export function cleanName(name: string, id?: number, type?: 'club' | 'league' | 'nation' | 'program' | 'skill_move' | 'celebration', context?: { leagueId?: number }): string {
  if (!name) return 'Unknown';

  // 1. Contextual Fixes (Handle Data Glitches)
  if (type === 'club' && (id === 73 || name.includes('_73'))) {
     // If team is 73 and league is Ligue 1 (16), it's PSG
     if (context?.leagueId === 16) return 'Paris Saint-Germain';
  }

  // 2. Check Dictionaries First
  if (id !== undefined) {
    if (type === 'nation' && NATIONS[id]) return NATIONS[id];
    if (type === 'league' && LEAGUES[id]) return LEAGUES[id];
    if (type === 'club' && CLUBS[id]) return CLUBS[id];
    if (type === 'skill_move' && SKILL_MOVE_NAMES[id]) return SKILL_MOVE_NAMES[id];
    if (type === 'celebration' && CELEBRATIONS[id]) return CELEBRATIONS[id];
  }

  // Check Master RenderZ Dictionary
  if (RENDERZ_DICTIONARY[name] && !RENDERZ_DICTIONARY[name].startsWith('NOT_FOUND_')) {
    return RENDERZ_DICTIONARY[name];
  }

  // Check Local Programs Dictionary
  if (PROGRAMS[name]) return PROGRAMS[name];

  // Try parsing IDs from generic names or numeric strings
  const numericId = parseInt(name.replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_)/i, ''));
  if (!isNaN(numericId)) {
      if (type === 'nation' && NATIONS[numericId]) return NATIONS[numericId];
      if (type === 'club' && CLUBS[numericId]) return CLUBS[numericId];
      if (type === 'league' && LEAGUES[numericId]) return LEAGUES[numericId];
  }

  // Clean PROGRAM strings
  if (name.toUpperCase().includes('PROGRAM')) {
      return name.replace(/PROGRAM/i, '').replace(/_/g, ' ').replace(/([A-Za-z]+)(\d+)/, '$1 $2').trim();
  }

  // Handle Skill Move IDs embedded in name strings
  if (name.toLowerCase().includes('skillmove_name_') || name.toLowerCase().includes('skill_move_')) {
    const moveId = parseInt(name.replace(/skillmove_name_|skill_move_/gi, ''));
    if (!isNaN(moveId) && SKILL_MOVE_NAMES[moveId]) return SKILL_MOVE_NAMES[moveId];
  }

  // Handle Celebration IDs embedded in name strings
  if (name.toLowerCase().includes('celebration_name_')) {
    const celebId = parseInt(name.replace(/celebration_name_/gi, ''));
    if (!isNaN(celebId) && CELEBRATIONS[celebId]) return CELEBRATIONS[celebId];
  }

  // Fallback for raw IDs being passed as names
  if (!isNaN(parseInt(name))) {
    const numericId = parseInt(name);
    if (type === 'skill_move' || name.toLowerCase().includes('skill')) return `Skill Move ${numericId}`;
    if (type === 'celebration' || name.toLowerCase().includes('celebration')) return CELEBRATIONS[numericId] || `Celebration ${numericId}`;
    if (SKILL_MOVE_NAMES[numericId]) return SKILL_MOVE_NAMES[numericId];
  }

  // 3. Regex Cleaning (Strip Prefixes)
  const cleaned = name
    .replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_|trait_name_|skillmove_name_|skill_move_|celebration_name_)/i, '')
    .replace(/_/g, ' ')
    .trim();

  // Special case: Ligue 1 incomplete name
  if (cleaned === 'Ligue 1') return 'Ligue 1 Uber Eats';

  // If after cleaning we only have a number, give it context
  if (!isNaN(parseInt(cleaned)) && cleaned.length > 0) {
    const numCleaned = parseInt(cleaned);
    if (name.toLowerCase().includes('celebration')) return CELEBRATIONS[numCleaned] || `Celebration ${cleaned}`;
    if (name.toLowerCase().includes('skill')) return `Skill Move ${cleaned}`;
    if (name.toLowerCase().includes('trait')) return `Trait ${cleaned}`;
  }

  return cleaned;
}

/**
 * WORK RATE MAPPING
 */
export function getWorkRateLabel(val: number): string {
  const map: Record<number, string> = { 2: 'High', 0: 'Medium', 1: 'Low' };
  return map[val] || 'Medium';
}

/**
 * MAIN STAT MAPPING
 */
export function getMainStats(player: Player) {
  const isGK = player.position === 'GK';
  const data = isGK ? player.avgGkStats : player.avgStats;
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

/**
 * SKILL PROGRESSION DATABASE
 */
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
