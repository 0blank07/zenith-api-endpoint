const fs = require('fs');
const path = 'C:/project-files/Zenith-app-Max/src/lib/server/player-seo-contract.mjs';

let c = fs.readFileSync(path, 'utf8');

const mappingBlock = `
  const NATIONS = { 52: 'Argentina', 14: 'England', 54: 'Brazil', 18: 'France', 21: 'Germany', 45: 'Spain', 38: 'Portugal', 34: 'Netherlands', 31: 'Italy', 39: 'USA', 95: 'USA', 350: 'Saudi Arabia', 5: 'Belgium', 7: 'Belgium', 35: 'Norway', 44: 'Scotland', 27: 'Japan', 25: 'South Korea', 167: 'South Korea', 117: 'Morocco', 30: 'Ivory Coast', 108: 'Ivory Coast', 42: 'Senegal', 111: 'Cameroon', 103: 'Cameroon', 49: 'Uruguay', 48: 'Turkey', 10: 'Austria', 22: 'Ghana', 47: 'Switzerland', 83: 'Mexico' };
  const LEAGUES = { 13: 'Premier League', 53: 'La Liga', 78: 'LALIGA EA SPORTS', 19: 'Bundesliga', 31: 'Serie A', 16: 'Ligue 1 Uber Eats', 39: 'MLS', 350: 'Saudi Pro League', 2118: 'Nation Story', 10: 'Eredivisie', 14: 'Liga NOS', 60: 'Super Lig', 1: 'World Class' };
  const CLUBS = { 112893: 'Inter Miami', 1369: 'Paris Saint-Germain', 1362: 'FC Barcelona', 241: 'FC Barcelona', 10: 'Manchester City', 11: 'Manchester United', 243: 'Real Madrid', 5: 'Chelsea', 45: 'Juventus', 22: 'Bayern Munich', 21: 'Borussia Dortmund', 240: 'Atletico Madrid', 112658: 'Al Nassr', 112392: 'Al Hilal', 73: 'Spurs', 9: 'Liverpool', 1: 'Arsenal', 113149: 'FC Cincinnati', 113018: 'St. Louis CITY SC', 114154: 'Icons', 115935: 'Heroes' };

  const clean = (val, type, context = {}) => {
    if (!val) return 'Unknown';
    let s = String(val).trim();
    
    // Handle data glitch for Team 73 in Ligue 1
    if (type === 'club' && (s === '73' || s.includes('_73')) && context.leagueId === '16') return 'Paris Saint-Germain';

    const id = parseInt(s.replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_)/i, ''));
    if (!isNaN(id)) {
        if (type === 'nation' && NATIONS[id]) return NATIONS[id];
        if (type === 'league' && LEAGUES[id]) return LEAGUES[id];
        if (type === 'club' && CLUBS[id]) return CLUBS[id];
    }
    
    let res = s.replace(/^(TeamName_|LeagueName_|NationName_|PROGRAM_|trait_name_|skillmove_name_|skill_move_|celebration_name_)/i, '').replace(/_/g, ' ').trim();
    if (res === 'Ligue 1') return 'Ligue 1 Uber Eats';
    return res;
  };

  const rawLeagueId = String(firstDefined([source.league_id, source.leagueId, source.league], '')).replace(/LeagueName_/gi, "");

  if (record.nation) record.nation = clean(record.nation, 'nation');
  if (record.club) record.club = clean(record.club, 'club', { leagueId: rawLeagueId });
  if (record.league) record.league = clean(record.league, 'league');
`;

const oldCleaning = /if\s*\(record\.nation\)\s*record\.nation\s*=\s*String\(record\.nation\)\.replace\(.*?\)[\s\S]*?if\s*\(record\.traits\)\s*record\.traits\s*=\s*record\.traits\.map\(.*?\);/;

if (oldCleaning.test(c)) {
    c = c.replace(oldCleaning, (match) => {
        // Keep the traits mapping but replace the others with the new mappingBlock
        const traitsLine = match.match(/if\s*\(record\.traits\)\s*record\.traits\s*=\s*record\.traits\.map\(.*?\);/)[0];
        return mappingBlock + '\n  ' + traitsLine;
    });
    fs.writeFileSync(path, c, 'utf8');
    console.log('Zenith app contract patched with robust ID mapping.');
} else {
    console.log('Could not find existing cleaning logic in contract.');
}
