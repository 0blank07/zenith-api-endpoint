import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function check() {
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    const names = ['Yamal', 'Pedri', 'Park Ji-sung', 'Dembélé'];

    console.log('Searching players by name...\n');
    for (const name of names) {
        console.log(`--- Name: ${name} ---`);
        const res = await pool.query(
            'SELECT player_id, name, team, league, nation_region FROM player_stats WHERE name ILIKE $1 LIMIT 5',
            [`%${name}%`]
        );
        if (res.rows.length > 0) {
            console.table(res.rows);
        } else {
            console.log('No players found with this name.');
        }
    }

    await db.disconnect();
}

check().catch(console.error);