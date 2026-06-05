import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function checkCols() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    const r = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'player_stats'");
    const cols = r.rows.map((row: any) => row.column_name);
    console.log('League columns:', cols.filter((c: string) => c.includes('league')));
    console.log('All columns:', cols);
    await db.disconnect();
}
checkCols();