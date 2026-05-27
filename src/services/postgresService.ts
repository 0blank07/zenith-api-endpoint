import { Pool } from 'pg';
import { Player } from '../types/player';
import logger from '../utils/logger';

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
    const query = `
      CREATE TABLE IF NOT EXISTS players (
        asset_id BIGINT PRIMARY KEY,
        player_id BIGINT,
        card_name TEXT,
        rating INTEGER,
        position TEXT,
        club_name TEXT,
        price_json JSONB,
        raw_data JSONB,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await this.pool.query(query);
      logger.info('PostgreSQL schema initialized');
    } catch (error: any) {
      logger.error(`Failed to initialize PostgreSQL schema: ${error.message}`);
      throw error;
    }
  }

  async savePlayers(players: Player[]): Promise<void> {
    if (players.length === 0) return;

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const player of players) {
        const query = `
          INSERT INTO players (asset_id, player_id, card_name, rating, position, club_name, price_json, raw_data)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (asset_id) DO UPDATE SET
            rating = EXCLUDED.rating,
            price_json = EXCLUDED.price_json,
            raw_data = EXCLUDED.raw_data,
            updated_at = CURRENT_TIMESTAMP;
        `;
        
        const values = [
          player.assetId,
          player.playerId,
          player.cardName,
          player.rating,
          player.position,
          player.club.name,
          JSON.stringify(player.priceData),
          JSON.stringify(player)
        ];
        
        await client.query(query, values);
      }
      
      await client.query('COMMIT');
      logger.info(`Successfully synced ${players.length} players to PostgreSQL`);
    } catch (error: any) {
      await client.query('ROLLBACK');
      logger.error(`Failed to save players to PostgreSQL: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    logger.info('Disconnected from PostgreSQL');
  }
}
