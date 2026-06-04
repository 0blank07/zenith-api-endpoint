blank@zenith-production:~$ node -e "require('dotenv').config(); const { Client } = require('pg'); const c = new Client({host: process.env.PG_HOST, user: process.env.PG_USER, password: process.env.PG_PASSWORD, database:
     process.env.PG_DATABASE}); async function check(){ await c.connect(); console.log('--- 1. PLAYER STATS ---'); const s = await c.query('SELECT name, ovr, position, team, event FROM player_stats WHERE
     player_id = 24044726'); console.table(s.rows); console.log('\n--- 2. SKILLS META ---'); const m = await c.query('SELECT * FROM player_skills_meta WHERE player_id = 24044726'); console.table(m.rows);
     console.log('\n--- 3. AVAILABLE SKILLS ---'); const a = await c.query('SELECT skill_id, is_locked, unlock_requirement_skillname FROM player_available_skills WHERE player_id = 24044726');
     console.table(a.rows); console.log('\n--- 4. SKILL BOOSTS (Sample) ---'); const b = await c.query('SELECT skill_id, level_number, boost_pace, boost_shooting FROM skill_level_boosts WHERE player_id =
     24044726 LIMIT 5'); console.table(b.rows); await c.end(); } check();"
[eval]:2
     process.env.PG_DATABASE}); async function check(){ await c.connect(); console.log('--- 1. PLAYER STATS ---'); const s = await c.query('SELECT name, ovr, position, team, event FROM player_stats WHERE
                                                                                                                                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SyntaxError: Invalid or unexpected token
    at makeContextifyScript (node:internal/vm:185:14)
    at node:internal/process/execution:107:22
    at [eval]-wrapper:6:24
    at runScript (node:internal/process/execution:101:62)
    at evalScript (node:internal/process/execution:133:3)
    at node:internal/main/eval_string:51:3

Node.js v20.20.1
blank@zenith-production:~$
