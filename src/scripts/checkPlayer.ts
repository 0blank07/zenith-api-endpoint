import 'dotenv/config';
import { PostgresService } from '../services/postgresService';

async function verifyPlayer(playerId: number) {
    const db = new PostgresService();
    const pool = (db as any).pool;
    
    try {
        console.log(`\n🔍 VERIFYING DATA FOR PLAYER ID: ${playerId}\n`);

        const stats = await pool.query('SELECT name, ovr, position, team, event, date_added FROM player_stats WHERE player_id = $1', [playerId]);
        console.log('--- 1. PLAYER STATS ---');
        if (stats.rows.length > 0) console.table(stats.rows);
        else console.log('❌ No stats found for this ID.');

        const skillsMeta = await pool.query('SELECT * FROM player_skills_meta WHERE player_id = $1', [playerId]);
        console.log('\n--- 2. SKILLS META ---');
        if (skillsMeta.rows.length > 0) console.table(skillsMeta.rows);
        else console.log('❌ No skills meta found.');

        const available = await pool.query('SELECT skill_id, is_locked, unlock_requirement_skillname FROM player_available_skills WHERE player_id = $1', [playerId]);
        console.log('\n--- 3. AVAILABLE SKILLS ---');
        if (available.rows.length > 0) console.table(available.rows);
        else console.log('❌ No available skills found.');

        const boosts = await pool.query('SELECT skill_id, level_number, boost_pace, boost_shooting FROM skill_level_boosts WHERE player_id = $1 LIMIT 5', [playerId]);
        console.log('\n--- 4. SKILL BOOSTS (Sample) ---');
        if (boosts.rows.length > 0) console.table(boosts.rows);
        else console.log('❌ No skill boosts found.');

    } catch (error: any) {
        console.error('\n❌ Verification Error:', error.message);
    } finally {
        await db.disconnect();
    }
}

const pid = process.argv[2] ? parseInt(process.argv[2]) : 24044726;
verifyPlayer(pid);
