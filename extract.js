const fs = require('fs');
const text = fs.readFileSync('renderz_dict.js', 'utf8');

// 1. Find all variable assignments: const a="Text",b="Text2";
// In minified JS, variables might be assigned like x="String"
const dict = {};
const varRegex = /([a-zA-Z0-9_$]+)="([^"]+)"/g;
let match;
while ((match = varRegex.exec(text)) !== null) {
  dict[match[1]] = match[2];
}

// 2. Find the object mapping NAME_SKILL_XXXX:variable
// Example: NAME_SKILL_10010:On
const result = {};
const mapRegex = /(NAME_SKILL_\d+|skillmove_name_\d+):([a-zA-Z0-9_$]+)/g;
while ((match = mapRegex.exec(text)) !== null) {
  const key = match[1];
  const varName = match[2];
  
  // Resolve the variable to the actual string
  if (dict[varName]) {
    result[key] = dict[varName];
  } else {
    result[key] = `UNKNOWN_VAR_${varName}`;
  }
}

fs.writeFileSync('extracted_skills.json', JSON.stringify(result, null, 2));
console.log('Extracted ' + Object.keys(result).length + ' skills.');
