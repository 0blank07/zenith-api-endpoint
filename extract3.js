const fs = require('fs');
const dictText = fs.readFileSync('renderz_dict.js', 'utf8');
const stringsText = fs.readFileSync('renderz_actual_strings.js', 'utf8');

// 1. Get all NAME_SKILL and skillmove_name variables in dictText
const mappings = {}; // varName -> Key
const mapRegex = /(NAME_SKILL_\d+|skillmove_name_\d+):([a-zA-Z0-9_$]+)/g;
let match;
while ((match = mapRegex.exec(dictText)) !== null) {
  mappings[match[2]] = match[1];
}

// 2. Resolve imports in dictText
// Example: import { ..., iH as b1, ... } from "./CydOa1BV.js"
const originalVars = {}; // varName in dictText -> originalVarName in stringsText
const importRegex = /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g;
while ((match = importRegex.exec(dictText)) !== null) {
  const importsList = match[1].split(',').map(s => s.trim());
  for (const imp of importsList) {
    if (imp.includes(' as ')) {
       const parts = imp.split(' as ');
       originalVars[parts[1].trim()] = parts[0].trim();
    } else {
       originalVars[imp] = imp;
    }
  }
}

// 3. Find string values in stringsText
// Example: const iH = () => "Striker"
// Or iH="Striker"
// Or function iH(){return "Striker"}
const result = {};

for (const [varName, key] of Object.entries(mappings)) {
  const targetVarName = originalVars[varName] || varName;
  
  // Look for targetVarName="String" or targetVarName=()=>"String" or targetVarName=function(){return"String"}
  const valRegex = new RegExp(targetVarName + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
  const valMatch = valRegex.exec(stringsText);
  if (valMatch) {
     result[key] = valMatch[1];
  } else {
     // Look for alternative syntax like targetVarName:()=>"String" inside an object
     const altRegex = new RegExp(targetVarName + '\\s*:\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
     const altMatch = altRegex.exec(stringsText);
     if (altMatch) {
         result[key] = altMatch[1];
     } else {
         result[key] = `NOT_FOUND_${targetVarName}`;
     }
  }
}

fs.writeFileSync('final_extracted_skills.json', JSON.stringify(result, null, 2));
console.log('Successfully extracted ' + Object.keys(result).length + ' skills.');
