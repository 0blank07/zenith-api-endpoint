import { Pool } from 'pg';
import { Player } from '../types/player';
import logger from '../utils/logger';
import { SKILL_BOOSTS, getSkillTitle } from '../utils/dataCleaner';

export class PostgresService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432'),
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      database: process.env.PG_DATABASE || 'renderz_db',
    });
  }

  async initSchema(): Promise<void> {
    // We assume the schema is already created and managed by the existing system.
    // If we wanted to ensure tables exist, we could add CREATE TABLE statements here,
    // but the user's web app already relies on these tables existing.
    logger.info('Assuming PostgreSQL schemas (player_stats, skill_level_boosts, etc.) already exist.');
  }

  async getLatestAssetId(): Promise<number | null> {
    try {
      const res = await this.pool.query('SELECT MAX(player_id) as max_id FROM player_stats;');
      return res.rows[0]?.max_id ? Number(res.rows[0].max_id) : null;
    } catch (error: any) {
      return null;
    }
  }

  async getAllAssetIds(): Promise<Set<number>> {
    try {
      const res = await this.pool.query('SELECT player_id FROM player_stats;');
      return new Set(res.rows.map(row => Number(row.player_id)));
    } catch (error: any) {
      return new Set();
    }
  }

  private mapStats(player: Player, rank: number) {
    // Rank 0 is Base, but the python script inserted rank 0 to 5.
    // We only fetch Base data right now, so we'll insert it as rank 0.
    // A full implementation would calculate rank 1-5 stats dynamically based on growth curves.
    // For simplicity, we are inserting the Base (rank 0) stats. 

    return [
        player.assetId, // player_id
        rank, // rank
        0, // training_level
        player.position || '', // position
        player.potentialPositions?.join(', ') || '', // alternate_position
        player.nation?.name || '', // nation_region
        player.skillMovesLevel || 0, // skill_moves_stars
        player.foot === 1 ? 'Left' : 'Right', // strong_foot_side
        5, // strong_foot_stars (RenderZ assumes 5 for strong)
        player.weakFoot || 0, // weak_foot_stars
        '', // height_ft_in (Not critical, calculate if needed)
        player.height || 0, // height_cm
        player.weight || 0, // weight_kg
        player.rating || 0, // ovr
        player.stats?.sta || 0, // stamina_stat
        player.avgStats?.avg1 || 0, // pace
        player.stats?.acc || 0, // acceleration
        player.stats?.spd || 0, // sprint_speed
        player.avgStats?.avg2 || 0, // shooting
        player.stats?.fin || 0, // finishing
        player.stats?.lsa || 0, // long_shot
        player.stats?.sho || 0, // shot_power
        player.stats?.pos || 0, // positioning
        player.stats?.vol || 0, // volley
        player.stats?.pen || 0, // penalties
        player.avgStats?.avg3 || 0, // passing
        player.stats?.spa || 0, // short_passing
        player.stats?.lpa || 0, // long_passing
        player.stats?.vis || 0, // vision
        player.stats?.cro || 0, // crossing
        player.stats?.cur || 0, // curve
        player.stats?.frk || 0, // free_kick
        player.avgStats?.avg4 || 0, // dribbling_head
        player.stats?.dri || 0, // dribbling
        player.stats?.bal || 0, // balance
        player.stats?.agi || 0, // agility
        player.stats?.rea || 0, // reactions
        player.stats?.bac || 0, // ball_control
        player.avgStats?.avg5 || 0, // defending
        player.stats?.mrk || 0, // marking
        player.stats?.stt || 0, // standing_tackle
        player.stats?.slt || 0, // sliding_tackle
        player.stats?.awr || 0, // awareness
        player.stats?.hea || 0, // heading
        player.avgStats?.avg6 || 0, // physical
        player.stats?.str || 0, // strength
        player.stats?.agg || 0, // aggression
        player.stats?.jmp || 0, // jumping
        player.avgGkStats?.avg1 || 0, // diving
        player.stats?.gkd || 0, // gk_diving
        player.stats?.gkp || 0, // gk_positioning
        player.stats?.han || 0, // handling
        player.stats?.han || 0, // gk_handling
        player.stats?.ref || 0, // reflexes
        player.stats?.ref || 0, // gk_reflexes
        player.stats?.gkk || 0, // kicking
        player.stats?.gkk || 0, // gk_kicking
        player.auctionable === false, // is_untradable
        player.added || new Date().toISOString(), // date_added
        player.images?.leagueImage || '', // league_image
        player.traits?.map(t => t.title).join(',') || '', // traits_name
        player.images?.playerCardImage || '', // player_image
        player.images?.playerCardBackground || '', // card_background
        player.images?.flagImage || '', // nation_flag
        player.images?.clubImage || '', // club_flag
        player.animation?.colors?.rating || '', // color_rating
        player.animation?.colors?.position || '', // color_position
        player.animation?.colors?.name || '', // color_name
        player.animation?.colors?.level || '', // color_level
        player.workRateAtt || 0, // work_rate_attack
        player.workRateDef || 0, // work_rate_defense
        player.club?.name || '', // team
        player.cardName || player.firstName || '', // name
    ];
  }

  async savePlayers(players: Player[]): Promise<void> {
    if (players.length === 0) return;

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const player of players) {
        // We simulate inserting Rank 0 for now as the base import
        // The old scraper did Rank 0-5. For speed and direct replacement, we insert Base.
        
        // --- 1. Insert into player_stats ---
        const statsQuery = `
          INSERT INTO player_stats (
            player_id, rank, training_level, position, alternate_position, nation_region,
            skill_moves_stars, strong_foot_side, strong_foot_stars, weak_foot_stars, height_ft_in, height_cm, weight_kg,
            ovr, stamina_stat, pace, acceleration, sprint_speed, shooting, finishing, long_shot, shot_power, positioning,
            volley, penalties, passing, short_passing, long_passing, vision, crossing, curve, free_kick, dribbling_head,
            dribbling, balance, agility, reactions, ball_control, defending, marking, standing_tackle, sliding_tackle,
            awareness, heading, physical, strength, aggression, jumping, diving, gk_diving, gk_positioning, handling,
            gk_handling, reflexes, gk_reflexes, kicking, gk_kicking, is_untradable, date_added, league_image, traits_name,
            player_image, card_background, nation_flag, club_flag, color_rating, color_position, color_name, color_level,
            work_rate_attack, work_rate_defense, team, name
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
            $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46,
            $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68,
            $69, $70, $71, $72, $73
          )
          ON CONFLICT (player_id, rank, training_level) DO NOTHING
        `;
        
        await client.query(statsQuery, this.mapStats(player, 0));


        // --- 2. Insert into player_skills_meta ---
        const metaQuery = `
          INSERT INTO player_skills_meta (player_id, rank, training_level, available_points)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (player_id, rank, training_level) DO NOTHING
        `;
        await client.query(metaQuery, [player.assetId, 0, 0, 1]); // Base rank has 1 point

        // --- 3. Insert into player_available_skills & skill_level_boosts ---
        if (player.skillStyleSkills && player.skillStyleSkills.length > 0) {
            for (const sk of player.skillStyleSkills) {
                const skillData = SKILL_BOOSTS[sk.id];
                const skillTitle = getSkillTitle(sk.id, sk.name, sk.image);
                
                const isLocked = skillData?.requirement ? true : false;
                const reqType = skillData?.requirement ? 'skill' : null;
                const reqName = skillData?.requirement ? `Skill ID ${skillData.requirement.skillId}` : null;
                const reqLevel = skillData?.requirement ? skillData.requirement.level : null;
                const reqId = skillData?.requirement ? skillData.requirement.skillId : null;

                const availableQuery = `
                    INSERT INTO player_available_skills
                    (player_id, rank, training_level, skill_id, is_locked,
                     unlock_requirement_type, unlock_requirement_skillname,
                     unlock_requirement_level, prerequisite_skill_id, prerequisite_level)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    ON CONFLICT (player_id, rank, training_level, skill_id) DO NOTHING
                `;
                
                await client.query(availableQuery, [
                    player.assetId, 0, 0, sk.id, isLocked, reqType, reqName, reqLevel, reqId, reqLevel
                ]);

                // Insert Boosts (Level 1, 2, 3)
                if (skillData && skillData.boosts) {
                    for (let level = 1; level <= skillData.maxLevel; level++) {
                        const boosts = skillData.boosts[level];
                        if (!boosts) continue;
                        
                        // Map the boosts to the correct columns
                        const boostValues: Record<string, number> = {};
                        for (const [key, val] of Object.entries(boosts)) {
                           let mappedKey = key;
                           if (key === 'acc') mappedKey = 'boost_acceleration';
                           else if (key === 'spd') mappedKey = 'boost_sprint_speed';
                           else if (key === 'fin') mappedKey = 'boost_finishing';
                           else if (key === 'sho') mappedKey = 'boost_shot_power';
                           else if (key === 'lsa') mappedKey = 'boost_long_shot';
                           else if (key === 'pos') mappedKey = 'boost_positioning';
                           else if (key === 'spa') mappedKey = 'boost_short_passing';
                           else if (key === 'lpa') mappedKey = 'boost_long_passing';
                           else if (key === 'vis') mappedKey = 'boost_vision';
                           else if (key === 'cro') mappedKey = 'boost_crossing';
                           else if (key === 'dri') mappedKey = 'boost_dribbling';
                           else if (key === 'agi') mappedKey = 'boost_agility';
                           else if (key === 'bal') mappedKey = 'boost_balance';
                           else if (key === 'bac') mappedKey = 'boost_ball_control';
                           else if (key === 'rea') mappedKey = 'boost_reactions';
                           else if (key === 'mrk') mappedKey = 'boost_marking';
                           else if (key === 'stt') mappedKey = 'boost_standing_tackle';
                           else if (key === 'slt') mappedKey = 'boost_sliding_tackle';
                           else if (key === 'awr') mappedKey = 'boost_awareness';
                           else if (key === 'hea') mappedKey = 'boost_heading';
                           else if (key === 'str') mappedKey = 'boost_strength';
                           else if (key === 'agg') mappedKey = 'boost_aggression';
                           else if (key === 'jmp') mappedKey = 'boost_jumping';
                           else if (key === 'sta') mappedKey = 'boost_stamina';
                           else if (key === 'gkd') mappedKey = 'boost_gk_diving';
                           else if (key === 'han') mappedKey = 'boost_gk_handling';
                           else if (key === 'gkk') mappedKey = 'boost_gk_kicking';
                           else if (key === 'gkp') mappedKey = 'boost_gk_positioning';
                           else if (key === 'ref') mappedKey = 'boost_gk_reflexes';
                           else mappedKey = `boost_${key}`;
                           
                           boostValues[mappedKey] = val as number;
                        }

                        // We construct a dynamic query because we don't know which boosts are present
                        const columns = ['player_id', 'skill_id', 'level_number', 'positions'];
                        const values: any[] = [player.assetId, sk.id, level, JSON.stringify(skillData.unlocks[level] || [])];
                        
                        let paramIndex = 5;
                        for (const [col, val] of Object.entries(boostValues)) {
                            columns.push(col);
                            values.push(val);
                            paramIndex++;
                        }

                        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                        const boostQuery = `
                            INSERT INTO skill_level_boosts (${columns.join(', ')})
                            VALUES (${placeholders})
                            ON CONFLICT (player_id, skill_id, level_number) DO NOTHING
                        `;
                        
                        try {
                           await client.query(boostQuery, values);
                        } catch (e) {
                           // Silent fail on duplicate or missing col
                        }
                    }
                }
            }
        }
      }
      
      await client.query('COMMIT');
      logger.info(`Successfully synced ${players.length} players to PostgreSQL (Relational Format)`);
    } catch (error: any) {
      await client.query('ROLLBACK');
      logger.error(`Failed to save players to PostgreSQL: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async deletePlayers(assetIds: number[]): Promise<void> {
    if (assetIds.length === 0) return;
    try {
      // Need to delete from all relational tables
      await this.pool.query(`DELETE FROM skill_level_boosts WHERE player_id = ANY($1::bigint[])`, [assetIds]);
      await this.pool.query(`DELETE FROM player_available_skills WHERE player_id = ANY($1::bigint[])`, [assetIds]);
      await this.pool.query(`DELETE FROM player_skills_meta WHERE player_id = ANY($1::bigint[])`, [assetIds]);
      await this.pool.query(`DELETE FROM player_stats WHERE player_id = ANY($1::bigint[])`, [assetIds]);
      
      logger.info(`Successfully deleted ${assetIds.length} players from all tables.`);
    } catch (error: any) {
      logger.error(`Failed to delete players: ${error.message}`);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    logger.info('Disconnected from PostgreSQL');
  }
}
