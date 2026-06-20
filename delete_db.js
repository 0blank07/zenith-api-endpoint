require('dotenv/config');
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
});

pool.query("SELECT asset_id, card_name, added_on FROM player_stats ORDER BY added_on DESC LIMIT 5").then(res => {
  console.log(res.rows);
  pool.query("DELETE FROM player_stats WHERE added_on >= '2026-06-19' AND added_on < '2026-06-20'").then(() => {
    console.log('Deleted 2026-06-19 records');
    pool.end();
  });
}).catch(e => console.error(e));
