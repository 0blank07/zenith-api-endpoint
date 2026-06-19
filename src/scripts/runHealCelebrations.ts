import 'dotenv/config';
import { PostgresService } from '../services/postgresService';
import { healMissingCelebrations } from './healTraits';
import fs from 'fs';
import path from 'path';

const CLEANER_PATH = path.join(__dirname, '../utils/dataCleaner.ts');

async function run() {
    const db = new PostgresService();
    const pool = (db as any).pool;

    console.log('Extracting current celebrations from dataCleaner.ts...');
    const cleanerContent = fs.readFileSync(CLEANER_PATH, 'utf8');
    const blockRegex = /const CELEBRATIONS: Record<number, string> = \{([\s\S]*?)\};/;
    const match = cleanerContent.match(blockRegex);
    
    let knownCelebrations = new Set<number>();
    if (match) {
        const block = match[1];
        const lines = block.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//')) continue;
            // extract all numbers before colon
            const pairs = trimmed.split(',');
            for (const pair of pairs) {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const id = parseInt(parts[0].trim());
                    if (!isNaN(id)) knownCelebrations.add(id);
                }
            }
        }
    }

    console.log(`Found ${knownCelebrations.size} known celebrations.`);

    console.log('Scanning database for players with unknown celebrations...');
    const res = await pool.query('SELECT asset_id, raw_data FROM players');
    
    const missing: { assetId: number; celebrationId: number }[] = [];
    const missingSet = new Set<number>();

    for (const row of res.rows) {
        const data = row.raw_data;
        if (data && data.celebration) {
            const c = data.celebration;
            const celebrationId = c.id;
            if (celebrationId && typeof celebrationId === 'number') {
                if (!knownCelebrations.has(celebrationId) && !missingSet.has(celebrationId)) {
                    missingSet.add(celebrationId);
                    missing.push({ assetId: row.asset_id, celebrationId });
                }
            }
        }
    }

    console.log(`Found ${missing.length} unique missing celebrations.`);

    if (missing.length > 0) {
        console.log('Triggering healMissingCelebrations...');
        await healMissingCelebrations(missing);
        console.log('Done healing celebrations.');
    } else {
        console.log('No missing celebrations found in DB.');
    }

    await pool.end();
}

run().catch(console.error);
