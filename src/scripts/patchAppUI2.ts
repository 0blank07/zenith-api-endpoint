const fs = require('fs');
const path = 'C:/project-files/Zenith-app-Max/app/player/[slug]/page.js';

let c = fs.readFileSync(path, 'utf8');

// Refined Redirect Logic: Only redirect if the BASE PLAYER ID (assetId) has changed.
// We extract the 4-digit Player ID suffix (which is the middle part of the 7-digit slug suffix).
const oldRedirect = /const canonicalSlug = buildPlayerSlug\(record\) \|\| String\(record\?\.playerId \|\| ''\)\.trim\(\);[\s\S]*?redirect\(canonicalPath\);[\s\S]*?\}/;

const newRedirect = `const canonicalSlug = buildPlayerSlug(record) || String(record?.playerId || '').trim();
  
  // Custom: Only redirect if the actual Player (Asset ID) has changed.
  // The suffix is usually [AssetIDSuffix(4)][RecordIDSuffix(3)].
  const getPlayerIdSuffix = (s) => {
      const parts = s.split('-');
      const suffix = parts[parts.length - 1];
      return suffix.substring(0, 4); // The 6807 part
  };
  
  const isSamePlayer = getPlayerIdSuffix(incomingSlug) === getPlayerIdSuffix(canonicalSlug);

  if (canonicalSlug && incomingSlug !== canonicalSlug && !isSamePlayer) {
    const canonicalPath = rank > 0
      ? \`/player/\${encodeURIComponent(canonicalSlug)}?rank=\${rank}\`
      : \`/player/\${encodeURIComponent(canonicalSlug)}\`;
    redirect(canonicalPath);
  }`;

if (c.includes('const canonicalSlug')) {
    c = c.replace(oldRedirect, newRedirect);
    fs.writeFileSync(path, c, 'utf8');
    console.log('Fixed page.js to prevent reloads on rank change.');
} else {
    console.log('Could not find redirect logic in page.js');
}
