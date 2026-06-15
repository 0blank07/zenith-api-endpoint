import 'dotenv/config';
import { SearchService } from '../services/searchService';

async function run() {
  const searchService = new SearchService();
  const player = await searchService.getByAssetId(3114943);
  if (player) {
    console.log(JSON.stringify(player.skillStyleSkills, null, 2));
  }
}
run().catch(console.error);
