const fs = require('fs');
const text = fs.readFileSync('renderz_actual_strings.js', 'utf8');

const result = {};

// 1. Find all NAME_SKILL and skillmove_name
const mapRegex = /(NAME_SKILL_\d+|skillmove_name_\d+):([a-zA-Z0-9_$]+)/g;
let match;
while ((match = mapRegex.exec(text)) !== null) {
  const key = match[1];
  const dispatcherVar = match[2];
  
  // 2. Find the dispatcher function: dispatcherVar=(...)=>{...return r==="en-US"?EngFunc():...}
  // Sometimes it's n() instead of t.locale??n(). Let's just look for r==="en-US"?EngFunc()
  // Actually, sometimes the dispatcher might just return a single function if not translated? No, svelte-i18n compiles to this structure.
  
  // Create a regex to find r==="en-US"?([a-zA-Z0-9_$]+)\(\) inside the dispatcher assignment
  const dispatcherEscaped = dispatcherVar.replace(/\$/g, '\\$');
  // Look for dispatcherVar = (e={}, t={}) => { ... r==="en-US"?EngFunc():... }
  const dispatchRegex = new RegExp(dispatcherEscaped + '\\s*=\\s*\\(.*?r==="en-US"\\?([a-zA-Z0-9_$]+)\\(\\):');
  const dispatchMatch = dispatchRegex.exec(text);
  
  if (dispatchMatch) {
     const engFunc = dispatchMatch[1];
     // 3. Find the english string: engFunc=()=>"String"
     const strRegex = new RegExp(engFunc + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
     const strMatch = strRegex.exec(text);
     if (strMatch) {
        result[key] = strMatch[1];
     } else {
        result[key] = `NOT_FOUND_STRING_FOR_${engFunc}`;
     }
  } else {
     // If not a dispatcher, maybe it's directly assigned?
     const directRegex = new RegExp(dispatcherEscaped + '\\s*=\\s*(?:(?:\\(\\)|function\\s*\\(\\))\\s*=>?\\s*(?:return\\s*)?)?["\']([^"\']+)["\']');
     const directMatch = directRegex.exec(text);
     if (directMatch) {
         result[key] = directMatch[1];
     } else {
         result[key] = `NOT_FOUND_DISPATCHER_${dispatcherVar}`;
     }
  }
}

fs.writeFileSync('english_skills.json', JSON.stringify(result, null, 2));
console.log('Successfully extracted ' + Object.keys(result).length + ' English skills!');
