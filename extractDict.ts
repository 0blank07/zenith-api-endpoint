import fs from 'fs';

const text = fs.readFileSync('translations.txt', 'utf8');

const names = [...text.matchAll(/"trait_name_\d+":"([^"]+)"/g)];
const descs = [...text.matchAll(/"trait_desc_\d+":"([^"]+)"/g)];

const map: Record<string, any> = {};

names.forEach(m => {
  const matchStr = m[0]; // e.g. "trait_name_12":"Rapid"
  const parts = matchStr.split(':');
  const id = parts[0].replace(/"/g, ''); // trait_name_12
  map[id] = { name: m[1] };
});

descs.forEach(m => {
  const matchStr = m[0];
  const parts = matchStr.split(':');
  const idStr = parts[0].replace(/"/g, ''); // trait_desc_12
  const id = idStr.replace('desc', 'name'); // trait_name_12
  if (map[id]) {
    map[id].desc = m[1];
  }
});

console.log(JSON.stringify(map, null, 2));
fs.writeFileSync('full_trait_dict.json', JSON.stringify(map, null, 2));
