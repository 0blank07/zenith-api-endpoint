import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function query() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    try {
        const res = await pool.query("SELECT name, description FROM playstyles_catalog WHERE description ILIKE 'trait_desc_%'");
        console.log(JSON.stringify(res.rows, null, 2));
    } finally {
        await pool.end();
    }
}
query();
