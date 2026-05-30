const fs = require('fs');
const text = fs.readFileSync('renderz_dict.js', 'utf8');

// Find the mapping for NAME_SKILL_37010
const match = /NAME_SKILL_37010:([a-zA-Z0-9_$]+)/.exec(text);
if (!match) {
  console.log("Could not find NAME_SKILL_37010");
  process.exit();
}
const varName = match[1];
console.log(`NAME_SKILL_37010 is mapped to: ${varName}`);

// Find where varName is imported from
// It looks like: import { ..., originalName as varName, ... } from "..."
// Or import { ..., varName, ... } from "..."
const importRegex = /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g;
let foundImport = null;
let originalName = null;

let importMatch;
while ((importMatch = importRegex.exec(text)) !== null) {
  const importsList = importMatch[1].split(',').map(s => s.trim());
  for (const imp of importsList) {
    if (imp === varName) {
       foundImport = importMatch[2];
       originalName = varName;
       break;
    } else if (imp.endsWith(` as ${varName}`)) {
       foundImport = importMatch[2];
       originalName = imp.split(' as ')[0].trim();
       break;
    }
  }
}

if (foundImport) {
  console.log(`Variable ${varName} is imported from ${foundImport} as ${originalName}`);
} else {
  console.log(`Could not find import for ${varName}`);
}
