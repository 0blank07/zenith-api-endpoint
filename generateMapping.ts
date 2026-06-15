import 'dotenv/config';
import { PostgresService } from './src/services/postgresService';
import * as fs from 'fs';

async function run() {
  const db = new PostgresService();
  const pool = (db as any).pool;
  const res = await pool.query(`SELECT name, icon_level_1 FROM playstyles_catalog WHERE name LIKE 'trait_name_%' ORDER BY name`);
  
  let md = '# Playstyle Mapping Helper\n\nSince RenderZ uses internal IDs, please use this table to match the visual icons to your 18 playstyle names.\n\n| Internal ID | Icon | English Playstyle Name |\n|---|---|---|\n';
  
  res.rows.forEach((r: any) => {
    md += `| \`${r.name}\` | ![](${r.icon_level_1}) | ____________ |\n`;
  });
  
  fs.writeFileSync('C:/Users/Aadar/.gemini/antigravity-cli/brain/8e2257c4-96d7-4048-92b8-8271fda6212c/playstyles_mapping.md', md);
  await pool.end();
}
run();
