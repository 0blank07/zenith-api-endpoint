const fs = require('fs');
const path = 'C:/project-files/Zenith-app-Max/src/lib/server/player-seo-contract.mjs';

let content = fs.readFileSync(path, 'utf8');

// 1. Ensure we prioritize the DB
const dbPatchStart = 'export async function fetchPlayerStableRecord(playerId, options = {}) {';
const dbPatchNew = `export async function fetchPlayerStableRecord(playerId, options = {}) {
  const dbPool = getPlayerSlugResolverPool();
  try {
    const dbResult = await dbPool.query('SELECT * FROM player_stats WHERE player_id::text = $1 AND rank = $2', [String(playerId), options.rank ?? 0]);
    if (dbResult.rows.length > 0) {
      return normalizePlayerStableRecord(dbResult.rows[0], playerId);
    }
  } catch (e) {
    console.warn('[player-seo-contract] DB Fetch failed:', e.message);
  }
`;

if (!content.includes('dbPool.query')) {
    content = content.replace(dbPatchStart, dbPatchNew);
}

// 2. Ensure we clean the codes even if API is used
const cleanPatchLine = 'return record;';
const cleanPatchNew = `
  if (record.nation) record.nation = record.nation.replace(/NationName_/g, "").replace(/^54$/, "Brazil").replace(/^49$/, "Uruguay").replace(/^18$/, "France").replace(/^14$/, "England").replace(/_/g, " ").trim();
  if (record.club) record.club = record.club.replace(/TeamName_/g, "").replace(/^114154$/, "Icons").replace(/_/g, " ").trim();
  if (record.eventName) record.eventName = record.eventName.replace(/PROGRAM_/g, "").replace(/ICONS/g, "Icon").replace(/_/g, " ").trim();
  return record;
`;

if (!content.includes('record.nation.replace')) {
    content = content.replace(cleanPatchLine, cleanPatchNew);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Zenith-app-Max patched successfully.');
