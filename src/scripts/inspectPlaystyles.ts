import 'dotenv/config';
import { SearchService } from '../services/searchService';

async function run() {
  const searchService = new SearchService();
  console.log('Fetching player 3114943...');
  const players = await searchService.getPlayersByAssetIds([3114943]);
  if (players.length > 0) {
    const p = players[0];
    console.log('Found player:', p.cardName);
    console.log('PlayStyles:', JSON.stringify((p as any).playStyles || (p as any).playstyles, null, 2));
  } else {
    console.log('Player not found.');
  }
  process.exit(0);
}

run().catch(console.error);
