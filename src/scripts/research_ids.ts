import 'dotenv/config';
import { SearchService } from '../services/searchService';
import { cleanName } from '../utils/dataCleaner';

async function research() {
    const search = new SearchService();
    console.log('Fetching players to research IDs...\n');
    
    // Search for some known problematic players or high rated ones
    const players = await search.getByRating(110, 130);
    
    const results = players.map(p => ({
        name: p.cardName || p.commonName,
        ovr: p.rating,
        raw_team: p.club.name,
        team_id: p.club.id,
        raw_league: p.league.name,
        league_id: p.league.id,
        raw_nation: p.nation.name,
        nation_id: p.nation.id,
        program: p.source
    }));

    console.table(results);
}

research().catch(console.error);