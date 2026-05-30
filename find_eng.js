const fs = require('fs');
const text = fs.readFileSync('renderz_actual_strings.js', 'utf8');

const idx = text.indexOf('"Striker"');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 100)));
} else {
  console.log("Striker not found");
}

const engIdx = text.indexOf('"en-US"');
console.log("en-US found at:", engIdx);
