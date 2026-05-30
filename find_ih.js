const fs = require('fs');
const text = fs.readFileSync('renderz_actual_strings.js', 'utf8');

const idx = text.indexOf('iH=');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 100)));
} else {
  console.log("iH= not found");
}

const idx2 = text.indexOf('function iH(');
if (idx2 !== -1) {
  console.log(text.substring(Math.max(0, idx2 - 100), Math.min(text.length, idx2 + 100)));
}
