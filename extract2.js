const fs = require('fs');
const dictText = fs.readFileSync('renderz_dict.js', 'utf8');
const stringsText = fs.readFileSync('renderz_strings.js', 'utf8');

// Combine both files' string assignments
const combinedText = dictText + '\n' + stringsText;

const dict = {};
// Let's capture functions that return strings: On=()=>"Striker"
// Or On=function(){return"Striker"}
// Or On="Striker"
const fnRegex = /([a-zA-Z0-9_$]+)\s*=\s*(?:(?:\(\)|function\s*\(\))\s*=>?\s*(?:return\s*)?)?["']([^"']+)["']/g;
let match;
while ((match = fnRegex.exec(combinedText)) !== null) {
  dict[match[1]] = match[2];
}

const result = {};
const mapRegex = /(NAME_SKILL_\d+|skillmove_name_\d+):([a-zA-Z0-9_$]+)/g;
while ((match = mapRegex.exec(dictText)) !== null) {
  const key = match[1];
  const varName = match[2];
  
  if (dict[varName]) {
    result[key] = dict[varName];
  } else {
    // If not found, let's search specifically for the variable name in the text
    const specificRegex = new RegExp(varName + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
    const specificMatch = specificRegex.exec(combinedText);
    if (specificMatch) {
       result[key] = specificMatch[1];
    } else {
       // Look for anything resembling this variable
       const look = combinedText.substring(combinedText.indexOf(varName + '='), combinedText.indexOf(varName + '=') + 100);
       result[key] = `UNKNOWN_VAR_${varName} -> ${look}`;
    }
  }
}

fs.writeFileSync('extracted_skills.json', JSON.stringify(result, null, 2));
console.log('Extracted ' + Object.keys(result).length + ' skills.');
