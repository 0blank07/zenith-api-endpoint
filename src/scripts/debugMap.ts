const fs = require('fs');
const path = 'C:/project-files/Zenith-app-Max/src/lib/server/player-seo-contract.mjs';

let c = fs.readFileSync(path, 'utf8');
const replacement = `
  const rawLeagueId = String(firstDefined([source.league_id, source.leagueId, source.league], '')).replace(/LeagueName_/gi, "");
  console.log('[DEBUG-MAP] id:', playerId, 'league:', source.league, 'team:', source.team, 'club:', source.club);
`;
c = c.replace(/const rawLeagueId =.*?;/, replacement);
fs.writeFileSync(path, c, 'utf8');
console.log('Injected safely.');
