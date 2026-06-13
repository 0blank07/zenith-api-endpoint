import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'renderz_db',
});

async function go() {
  const badSkills = [1410,1420,1430,1440,1450,1460,2610,2620,2630,2640,2650,2660,3610,3620,3630,3640,3650,3660,4410,4420,4430,4440,4450,4460,5410,5420,5430,5440,5450,5460,6310,6320,6330,6340,6350,6360,7410,7420,7430,7440,7450,7460,9510,9520,9530,9540,9550,9560,11310,11320,11330,11340,31041,38031];
  
  // Get NEWEST player per skill (highest assetId = newest)
  const res = await pool.query(`
    SELECT pas.skill_id, MAX(pas.player_id::bigint) as newest_player 
    FROM player_available_skills pas 
    WHERE pas.skill_id = ANY(ARRAY[${badSkills.join(',')}]::int[])
    GROUP BY pas.skill_id 
    ORDER BY pas.skill_id
  `);
  
  console.log('Newest players per bad skill:');
  for (const row of res.rows) {
    console.log(`  Skill ${row.skill_id}: player ${row.newest_player}`);
  }
  
  // Also check date_added for these players
  const playerIds = [...new Set(res.rows.map((r: any) => r.newest_player))];
  const playerInfo = await pool.query(`
    SELECT player_id, name, date_added FROM player_stats WHERE player_id = ANY(ARRAY[${playerIds.join(',')}]::bigint[]) AND rank = 0
    ORDER BY date_added DESC LIMIT 20
  `);
  console.log('\nPlayer info:');
  for (const row of playerInfo.rows) {
    console.log(`  ${row.player_id}: ${row.name} (added: ${row.date_added})`);
  }

  await pool.end();
}

go().catch(console.error);
