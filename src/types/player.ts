export interface PlayerStats {
  // Pace
  acc: number;
  spd: number;
  // Shooting
  fin: number;
  sho: number;
  lsa: number;
  vol: number;
  pen: number;
  pos: number;
  // Passing
  spa: number;
  lpa: number;
  vis: number;
  cro: number;
  cur: number;
  frk: number;
  // Dribbling
  dri: number;
  agi: number;
  bal: number;
  bac: number;
  rea: number;
  // Defending
  mrk: number;
  stt: number;
  slt: number;
  hea: number;
  awr: number;
  // Physical
  str: number;
  agg: number;
  jmp: number;
  sta: number;
  // GK specific
  gkd: number;
  gkk: number;
  gkp: number;
  han: number;
  ref: number;
  // Totals
  total: number;
}

export interface PriceInfo {
  basePrice: number;
}

export interface PriceData {
  [key: string]: PriceInfo;
}

export interface Trait {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Skill {
  id: number;
  name: string;
  image: string;
  levels?: {
    level: number;
    description: string;
    unlockedPositions?: string[];
    statBoosts?: { name: string; value: number }[];
  }[];
}

export interface Player {
  assetId: number;
  playerId: number;
  firstName: string;
  lastName: string;
  commonName: string;
  cardName: string;
  position: string;
  rating: number;
  weakFoot: number;
  foot: number;
  source: string;
  workRateAtt: number;
  workRateDef: number;
  weight: number;
  height: number;
  birthday: string;
  bio: string;
  bindingXml: string;
  tags: string;
  skillStyleId: number;
  skillMovesLevel: number;
  skillStyleSkills: Skill[];
  traits: Trait[];
  skillMoves: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  images: {
    playerCardImage: string;
    playerCardBackground: string;
    flagImage: string;
    clubImage: string;
    leagueImage: string;
  };
  animation: {
    colors: {
      rating: string;
      position: string;
      name: string;
      level: string;
    };
  };
  club: {
    id: number;
    name: string;
  };
  league: {
    id: number;
    name: string;
  };
  nation: {
    id: number;
    name: string;
  };
  potentialPositions: string[];
  stats: PlayerStats;
  avgStats: {
    avg1: number;
    avg2: number;
    avg3: number;
    avg4: number;
    avg5: number;
    avg6: number;
  };
  avgGkStats: {
    avg1: number;
    avg2: number;
    avg3: number;
    avg4: number;
    avg5: number;
    avg6: number;
  };
  priceData: PriceData;
  auctionable: boolean;
  rank: number;
  likes: number;
  added: string;
  revealOn: string;
}

export interface SearchResponse {
  players: Player[];
}
