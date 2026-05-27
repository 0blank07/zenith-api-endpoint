import { Player, Trait, Skill } from '../types/player';

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

/**
 * CLEANING LOGIC
 */
export function cleanName(name: string, id?: number, type?: 'club' | 'league' | 'nation' | 'program'): string {
  if (!name) return 'Unknown';

  // 1. Check Dictionaries First
  if (id !== undefined) {
    if (type === 'nation' && NATIONS[id]) return NATIONS[id];
    if (type === 'league' && LEAGUES[id]) return LEAGUES[id];
    if (type === 'club' && CLUBS[id]) return CLUBS[id];
  }
  
  if (type === 'program' && PROGRAMS[name]) return PROGRAMS[name];

  // 2. Regex Cleaning (Strip Prefixes)
  return name
    .replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_|trait_name_|skillmove_name_)/i, '')
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
  13: 'Finesse Shot',
  16: 'Outside Foot Shot',
  18: 'Speed Dribbler',
  15: 'Play Maker',
  12: 'Long Passer',
  11: 'Long Shot Taker',
  8: 'Early Crosser',
  21: 'Solid Player',
  25: 'Leadership',
  2: 'Diver',
  3: 'Injury Prone',
  14: 'Power Header',
  17: 'Technical Dribbler',
  20: 'Flair',
  22: 'Dives Into Tackles',
  24: 'Team Player',
};

export function getTraitTitle(id: number, rawTitle: string): string {
  return TRAITS[id] || cleanName(rawTitle);
}

/**
 * SKILL PROGRESSION DATABASE (Hierarchy & Levels)
 */
export const SKILL_BOOSTS: Record<number, any> = {
  // ATK
  37010: { name: 'Striker', maxLevel: 2, boosts: ['Finishing', 'Shot Power', 'Volley'], unlocks: { 2: ['CAM'] } },
  37020: { name: 'Advanced Forward', maxLevel: 3, boosts: ['Acceleration', 'Sprint Speed', 'Agility'], unlocks: {} },
  37050: { name: 'False Nine', maxLevel: 2, requires: 'Striker Lvl 2', boosts: ['Short Passing', 'Vision', 'Dribbling'], unlocks: { 2: ['CF'] } },
  37060: { name: 'Dribbling', maxLevel: 3, requires: 'False Nine Lvl 2', boosts: ['Dribbling', 'Ball Control', 'Agility'], unlocks: {} },
  37070: { name: 'Physical', maxLevel: 3, requires: 'False Nine Lvl 2', boosts: ['Strength', 'Aggression', 'Jumping'], unlocks: {} },
  37080: { name: 'Header', maxLevel: 3, requires: 'False Nine Lvl 2', boosts: ['Heading Accuracy', 'Jumping', 'Strength'], unlocks: {} },
  // MID
  33010: { name: 'Central Midfielder', maxLevel: 2, boosts: ['Short Passing', 'Vision', 'Long Passing'], unlocks: { 2: ['CDM', 'CAM'] } },
  33030: { name: 'Box To Box', maxLevel: 3, requires: 'Central Midfielder Lvl 2', boosts: ['Stamina', 'Short Passing', 'Interceptions'], unlocks: {} },
  33060: { name: 'Playmaker', maxLevel: 2, boosts: ['Vision', 'Long Passing', 'Short Passing'], unlocks: {} },
  33070: { name: 'Dribbling', maxLevel: 3, boosts: ['Dribbling', 'Ball Control', 'Agility'], unlocks: {} },
  33080: { name: 'Awareness', maxLevel: 3, boosts: ['Interceptions', 'Marking', 'Awareness'], unlocks: {} },
  33090: { name: 'Physical', maxLevel: 3, boosts: ['Strength', 'Aggression', 'Stamina'], unlocks: {} },
  // WING
  36010: { name: 'Winger', maxLevel: 2, boosts: ['Crossing', 'Acceleration', 'Sprint Speed'], unlocks: { 2: ['RM', 'LM'] } },
  36040: { name: 'Inverted Winger', maxLevel: 2, boosts: ['Agility', 'Dribbling', 'Finishing'], unlocks: { 2: ['RW', 'LW'] } },
  36050: { name: 'Dribbling', maxLevel: 3, boosts: ['Dribbling', 'Ball Control', 'Agility'], unlocks: {} },
  36060: { name: 'Passing', maxLevel: 3, boosts: ['Short Passing', 'Long Passing', 'Vision'], unlocks: {} },
  36070: { name: 'Shooting', maxLevel: 3, boosts: ['Shot Power', 'Long Shots', 'Volleys'], unlocks: {} },
};

export function getSkillDetails(id: number, level: number = 1) {
  const data = SKILL_BOOSTS[id];
  if (!data) return null;

  if (level > data.maxLevel) return null;

  const boostValue = level * 7;
  const unlocked = data.unlocks[level] || [];

  return {
    name: data.name,
    boosts: data.boosts.map((b: string) => `${b} +${boostValue}`),
    unlockedPositions: unlocked,
    requires: data.requires
  };
}

export function getSkillTitle(id: number, rawName: string): string {
  return SKILL_BOOSTS[id]?.name || cleanName(rawName);
}
