import 'dotenv/config';
import { dbService } from '../services/postgresService';
import logger from '../utils/logger';

async function run() {
    await dbService.initSchema();
    const res = await dbService.pool.query("SELECT player_id, name, date_added FROM player_stats ORDER BY date_added DESC LIMIT 5");
    console.log(res.rows);
    
    // Hard delete the ones from 2026-06-19
    await dbService.pool.query("DELETE FROM player_stats WHERE date_added >= '2026-06-19' AND date_added < '2026-06-20'");
    console.log("Deleted players from 2026-06-19 for testing!");
    
    process.exit(0);
}

run();
