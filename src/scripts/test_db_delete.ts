import 'dotenv/config';
import { dbService } from '../services/dbService';
import logger from '../utils/logger';

async function run() {
    await dbService.initSchema();
    const res = await dbService.pool.query("SELECT asset_id, card_name, added_on FROM player_stats ORDER BY added_on DESC LIMIT 5");
    console.log(res.rows);
    
    // Hard delete the ones from 2026-06-19
    await dbService.pool.query("DELETE FROM player_stats WHERE added_on >= '2026-06-19' AND added_on < '2026-06-20'");
    console.log("Deleted players from 2026-06-19 for testing!");
    
    process.exit(0);
}

run();
