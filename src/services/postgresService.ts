import { Pool } from 'pg';
import format from 'pg-format';
import { Player } from '../types/player';
import logger from '../utils/logger';
import { SKILL_BOOSTS, getSkillTitle } from '../utils/dataCleaner';

const ALL_BOOST_COLUMNS = [
  'boost_pace', 'boost_shooting', 'boost_passing', 'boost_dribbling', 'boost_defending', 'boost_physical',
  'boost_acceleration', 'boost_sprint_speed', 'boost_finishing', 'boost_shot_power', 'boost_long_shot',
  'boost_positioning', 'boost_volley', 'boost_penalties', 'boost_short_passing', 'boost_long_passing',
  'boost_crossing', 'boost_curve', 'boost_free_kick', 'boost_vision', 'boost_ball_control', 'boost_agility',
  'boost_reactions', 'boost_balance', 'boost_composure', 'boost_interceptions', 'boost_heading', 'boost_marking',
  'boost_standing_tackle', 'boost_sliding_tackle', 'boost_awareness', 'boost_jumping', 'boost_stamina',
  'boost_strength', 'boost_aggression', 'boost_gk_diving', 'boost_gk_handling', 'boost_gk_kicking',
  'boost_gk_positioning', 'boost_gk_reflexes', 'boost_long_shot_accuracy', 'boost_free_kick_accuracy'
];

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
    let playerName = player.cardName || player.commonName || `${player.firstName} ${player.lastName}`.trim();
    if (!playerName || /Filter Players|Home|RenderZ/i.test(playerName)) {
        playerName = player.lastName || player.firstName || 'Unknown Player';
    }

    let heightCm = 0;
    let heightFtIn = '';
    const rawHeight = (player as any).height;
    if (typeof rawHeight === 'string') {
        const cmMatch = rawHeight.match(/(\d+)\s*cm/i);
        if (cmMatch) heightCm = parseInt(cmMatch[1]);
        const ftInMatch = rawHeight.match(/(\d+['"]\d+["']?)/);
        if (ftInMatch) heightFtIn = ftInMatch[1];
    } else if (typeof rawHeight === 'number') {
        heightCm = rawHeight;
    }

    let weightKg = 0;
    const rawWeight = (player as any).weight;
    if (typeof rawWeight === 'string') {
        const kgMatch = rawWeight.match(/(\d+)\s*kg/i);
        if (kgMatch) weightKg = parseInt(kgMatch[1]);
    } else if (typeof rawWeight === 'number') {
        weightKg = rawWeight;
    }

    return [
        player.assetId, rank, 0, player.position || '', player.potentialPositions?.join(', ') || '',
        player.nation?.name || '', player.skillMovesLevel || 0, player.foot === 1 ? 'Left' : 'Right',
        5, player.weakFoot || 0, heightFtIn, heightCm, weightKg, player.rating || 0,
        player.stats?.sta || 0, player.avgStats?.avg1 || 0, player.stats?.acc || 0,
        player.stats?.spd || 0, player.avgStats?.avg2 || 0, player.stats?.fin || 0,
        player.stats?.lsa || 0, player.stats?.sho || 0, player.stats?.pos || 0,
        player.stats?.vol || 0, player.stats?.pen || 0, player.avgStats?.avg3 || 0,
        player.stats?.spa || 0, player.stats?.lpa || 0, player.stats?.vis || 0,
        player.stats?.cro || 0, player.stats?.cur || 0, player.stats?.frk || 0,
        player.avgStats?.avg4 || 0, player.stats?.dri || 0, player.stats?.bal || 0,
        player.stats?.agi || 0, player.stats?.rea || 0, player.stats?.bac || 0,
        player.avgStats?.avg5 || 0, player.stats?.mrk || 0, player.stats?.stt || 0,
        player.stats?.slt || 0, player.stats?.awr || 0, player.stats?.hea || 0,
        player.avgStats?.avg6 || 0, player.stats?.str || 0, player.stats?.agg || 0,
        player.stats?.jmp || 0, player.avgGkStats?.avg1 || 0, player.stats?.gkd || 0,
        player.stats?.gkp || 0, player.stats?.han || 0, player.stats?.han || 0,
        player.stats?.ref || 0, player.stats?.ref || 0, player.stats?.gkk || 0,
        player.stats?.gkk || 0, player.auctionable === false, player.added || new Date().toISOString(),
        player.images?.leagueImage || '', player.traits?.map(t => t.title).join(',') || '',
        player.images?.playerCardImage || '', player.images?.playerCardBackground || '',
        player.images?.flagImage || '', player.images?.clubImage || '',
        player.animation?.colors?.rating || '', player.animation?.colors?.position || '',
        player.animation?.colors?.name || '', player.animation?.colors?.level || '',
        player.workRateAtt || 0, player.workRateDef || 0, player.club?.name || '',
        playerName, player.source || '',
    ];
  }

  async savePlayers(players: Player[]): Promise<void> {
    if (players.length === 0) return;

    const statsValues: any[][] = [];
    const metaValues: any[][] = [];
    const availableSkillsValues: any[][] = [];
    const boostValues: any[][] = [];
    const catalogValues: any[][] = [];
    const seenSkills = new Set<number>();

    for (const player of players) {
      for (let rank = 0; rank <= 5; rank++) {
        statsValues.push(this.mapStats(player, rank));
        metaValues.push([player.assetId, rank, 0, rank]);

        if (player.skillStyleSkills && player.skillStyleSkills.length > 0) {
          for (const sk of player.skillStyleSkills) {
            const skillData = SKILL_BOOSTS[sk.id];

            const isLocked = skillData?.requirement ? true : false;
            const reqType = skillData?.requirement ? 'skill' : null;
            // Lookup name from SKILL_BOOSTS to avoid "Skill ID X"
            let reqName = null;
            if (skillData?.requirement) {
                const reqData = SKILL_BOOSTS[skillData.requirement.skillId];
                const rawName = reqData ? reqData.name : `Skill ID ${skillData.requirement.skillId}`;
                reqName = getSkillTitle(skillData.requirement.skillId, rawName, '');
            }

            const reqLevel = skillData?.requirement ? skillData.requirement.level : null;
            const reqId = skillData?.requirement ? skillData.requirement.skillId : null;

            availableSkillsValues.push([
              player.assetId, rank, 0, sk.id, isLocked, reqType, reqName, reqLevel, reqId, reqLevel
            ]);

            if (!seenSkills.has(sk.id)) {
                seenSkills.add(sk.id);
                const skillTitle = getSkillTitle(sk.id, sk.name, sk.image);
                catalogValues.push([sk.id, skillTitle, sk.image || '']);
            }
          }
        }
      }

      if (player.skillStyleSkills && player.skillStyleSkills.length > 0) {
        for (const sk of player.skillStyleSkills) {
          const skillData = SKILL_BOOSTS[sk.id];
          
          if (skillData && skillData.boosts) {
            for (let level = 1; level <= skillData.maxLevel; level++) {
              const boosts = skillData.boosts[level];
              if (!boosts) continue;
              
              const positionsArray = skillData.unlocks[level] || [];
              const pgPositionsString = `{${positionsArray.map((p: string) => `"${p}"`).join(',')}}`;
              
              const boostRow = [player.assetId, sk.id, level, pgPositionsString];
              const currentBoosts: Record<string, number> = {};
              for (const [key, val] of Object.entries(boosts)) {
                 let mappedKey = key;
                 if (key === 'acc') mappedKey = 'boost_acceleration';
                 else if (key === 'agg') mappedKey = 'boost_aggression';
                 else if (key === 'agi') mappedKey = 'boost_agility';
                 else if (key === 'awa' || key === 'awr') mappedKey = 'boost_awareness';
                 else if (key === 'bal') mappedKey = 'boost_balance';
                 else if (key === 'bac') mappedKey = 'boost_ball_control';
                 else if (key === 'cro') mappedKey = 'boost_crossing';
                 else if (key === 'cur') mappedKey = 'boost_curve';
                 else if (key === 'dri') mappedKey = 'boost_dribbling';
                 else if (key === 'div') mappedKey = 'boost_diving';
                 else if (key === 'fin') mappedKey = 'boost_finishing';
                 else if (key === 'fre' || key === 'frk') mappedKey = 'boost_free_kick';
                 else if (key === 'gkd') mappedKey = 'boost_gk_diving';
                 else if (key === 'han') mappedKey = 'boost_gk_handling';
                 else if (key === 'gkk') mappedKey = 'boost_gk_kicking';
                 else if (key === 'gkp') mappedKey = 'boost_gk_positioning';
                 else if (key === 'ref') mappedKey = 'boost_gk_reflexes';
                 else if (key === 'hea') mappedKey = 'boost_heading';
                 else if (key === 'jmp') mappedKey = 'boost_jumping';
                 else if (key === 'kic') mappedKey = 'boost_kicking';
                 else if (key === 'lpa') mappedKey = 'boost_long_passing';
                 else if (key === 'lsh' || key === 'lsa') mappedKey = 'boost_long_shot';
                 else if (key === 'mar' || key === 'mrk') mappedKey = 'boost_marking';
                 else if (key === 'pac') mappedKey = 'boost_pace';
                 else if (key === 'pen') mappedKey = 'boost_penalties';
                 else if (key === 'pos') mappedKey = 'boost_positioning';
                 else if (key === 'rea') mappedKey = 'boost_reactions';
                 else if (key === 'sho') mappedKey = 'boost_shot_power';
                 else if (key === 'sli' || key === 'slt') mappedKey = 'boost_sliding_tackle';
                 else if (key === 'spd') mappedKey = 'boost_sprint_speed';
                 else if (key === 'sta') mappedKey = 'boost_stamina';
                 else if (key === 'stan' || key === 'stt') mappedKey = 'boost_standing_tackle';
                 else if (key === 'str') mappedKey = 'boost_strength';
                 else if (key === 'spa') mappedKey = 'boost_short_passing';
                 else if (key === 'vis') mappedKey = 'boost_vision';
                 else if (key === 'vol') mappedKey = 'boost_volley';
                 else mappedKey = `boost_${key}`;
                 currentBoosts[mappedKey] = val as number;
              }
              for (const col of ALL_BOOST_COLUMNS) {
                boostRow.push(currentBoosts[col] || 0);
              }
              boostValues.push(boostRow);
            }
          }
        }
      }
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      if (catalogValues.length > 0) {
        const catalogQuery = format(`
          INSERT INTO skills_catalog (skill_id, skill_name, skill_image)
          VALUES %L
          ON CONFLICT (skill_id) DO UPDATE SET
            skill_name = EXCLUDED.skill_name,
            skill_image = EXCLUDED.skill_image
        `, catalogValues);
        try {
            await client.query(catalogQuery);
        } catch (e: any) {
            logger.error(`Error in catalogQuery: ${e.message}`);
            throw e;
        }
      }

      if (statsValues.length > 0) {
        const statsQuery = format(`
          INSERT INTO player_stats (
            player_id, rank, training_level, position, alternate_position, nation_region,
            skill_moves_stars, strong_foot_side, strong_foot_stars, weak_foot_stars, height_ft_in, height_cm, weight_kg,
            ovr, stamina_stat, pace, acceleration, sprint_speed, shooting, finishing, long_shot, shot_power, positioning,
            volley, penalties, passing, short_passing, long_passing, vision, crossing, curve, free_kick, dribbling_head,
            dribbling, balance, agility, reactions, ball_control, defending, marking, standing_tackle, sliding_tackle,
            awareness, heading, physical, strength, aggression, jumping, diving, gk_diving, gk_positioning, handling,
            gk_handling, reflexes, gk_reflexes, kicking, gk_kicking, is_untradable, date_added, league_image, traits_name,
            player_image, card_background, nation_flag, club_flag, color_rating, color_position, color_name, color_level,
            work_rate_attack, work_rate_defense, team, name, event
          ) VALUES %L
          ON CONFLICT (player_id, rank, training_level) DO UPDATE SET
            name = EXCLUDED.name, ovr = EXCLUDED.ovr, event = EXCLUDED.event, traits_name = EXCLUDED.traits_name
        `, statsValues);
        try {
            await client.query(statsQuery);
        } catch (e: any) {
            logger.error(`Error in statsQuery: ${e.message}`);
            logger.debug(`statsQuery length: ${statsQuery.length}`);
            throw e;
        }
      }

      if (metaValues.length > 0) {
        const metaQuery = format(`
          INSERT INTO player_skills_meta (player_id, rank, training_level, available_points)
          VALUES %L
          ON CONFLICT (player_id, rank, training_level) DO NOTHING
        `, metaValues);
        try {
            await client.query(metaQuery);
        } catch (e: any) {
            logger.error(`Error in metaQuery: ${e.message}`);
            throw e;
        }
      }

      if (availableSkillsValues.length > 0) {
        const availableQuery = format(`
          INSERT INTO player_available_skills
          (player_id, rank, training_level, skill_id, is_locked, unlock_requirement_type,
           unlock_requirement_skillname, unlock_requirement_level, prerequisite_skill_id, prerequisite_level)
          VALUES %L
          ON CONFLICT (player_id, rank, training_level, skill_id) DO UPDATE SET
            is_locked = EXCLUDED.is_locked,
            unlock_requirement_type = EXCLUDED.unlock_requirement_type,
            unlock_requirement_skillname = EXCLUDED.unlock_requirement_skillname,
            unlock_requirement_level = EXCLUDED.unlock_requirement_level,
            prerequisite_skill_id = EXCLUDED.prerequisite_skill_id,
            prerequisite_level = EXCLUDED.prerequisite_level
        `, availableSkillsValues);
        try {
            await client.query(availableQuery);
        } catch (e: any) {
            logger.error(`Error in availableQuery: ${e.message}`);
            throw e;
        }
      }

      if (boostValues.length > 0) {
        const boostQuery = format(`
          INSERT INTO skill_level_boosts (
            player_id, skill_id, level_number, positions,
            boost_pace, boost_shooting, boost_passing, boost_dribbling, boost_defending, boost_physical,
            boost_acceleration, boost_sprint_speed, boost_finishing, boost_shot_power, boost_long_shot,
            boost_positioning, boost_volley, boost_penalties, boost_short_passing, boost_long_passing,
            boost_crossing, boost_curve, boost_free_kick, boost_vision, boost_ball_control, boost_agility,
            boost_reactions, boost_balance, boost_composure, boost_interceptions, boost_heading, boost_marking,
            boost_standing_tackle, boost_sliding_tackle, boost_awareness, boost_jumping, boost_stamina,
            boost_strength, boost_aggression, boost_gk_diving, boost_gk_handling, boost_gk_kicking,
            boost_gk_positioning, boost_gk_reflexes, boost_long_shot_accuracy, boost_free_kick_accuracy
          )
          VALUES %L
          ON CONFLICT (player_id, skill_id, level_number) DO NOTHING
        `, boostValues);
        try {
            await client.query(boostQuery);
        } catch (e: any) {
            logger.error(`Error in boostQuery: ${e.message}`);
            logger.debug(`EXACT boostQuery: ${boostQuery}`);
            throw e;
        }
      }
      await client.query('COMMIT');
      logger.info(`Bulk Sync: Successfully inserted ${players.length} players in a single transaction.`);
    } catch (error: any) {
      await client.query('ROLLBACK');
      logger.error(`Failed to bulk save players to PostgreSQL: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async deletePlayers(assetIds: number[]): Promise<void> {
    if (assetIds.length === 0) return;
    try {
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
