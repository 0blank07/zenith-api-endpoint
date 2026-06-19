import 'dotenv/config';
import { SearchService } from '../services/searchService';
import logger from '../utils/logger';

async function testSpeed() {
    const searchService = new SearchService();
    
    try {
        logger.info('--- STARTING SPEED TEST ---');
        const startTime = Date.now();
        logger.info('Fetching ALL asset IDs...');
        // We'll just fetch a small chunk by manually doing one batch if we want, or getAllAssetIds
        // Let's get all asset IDs to simulate the real sync.
        const allIds = await searchService.getAllAssetIds();
        logger.info(`Found ${allIds.length} IDs. Taking the first 500 for the speed test.`);
        
        const testIds = allIds.slice(0, 500);
        
        const fetchStart = Date.now();
        const players = await searchService.getPlayersByAssetIds(testIds);
        const fetchEnd = Date.now();
        
        logger.info(`Successfully fetched ${players.length} players out of ${testIds.length} requested.`);
        logger.info(`Batch fetch of 500 players took ${(fetchEnd - fetchStart) / 1000}s`);
        
        if (players.length > 0) {
            logger.info('Sample player structure verification:');
            logger.info(`ID: ${players[0].assetId}, Name: ${players[0].firstName} ${players[0].lastName}, OVR: ${players[0].rating}`);
        } else {
            logger.error('CRITICAL: No players were fetched!');
        }

    } catch (e: any) {
        logger.error(`Speed test failed: ${e.message}`);
    } finally {
    }
}

testSpeed();
