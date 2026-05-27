# scrape_all_players.py
"""
EXHAUSTIVE High-Speed Scraper (v4 - Bridge Mode): 
Uses the working Node.js engine to fetch data (bypassing Cloudflare)
and Python to process/insert into PostgreSQL.

Requirements:
  - pip install python-dotenv psycopg2-binary
  - npm install (to ensure Node.js dependencies are present)
"""

import os
import time
import json
import subprocess
import sys
from typing import List, Dict
from dotenv import load_dotenv

# ---------- Database Helper ----------
def get_market_db_connection():
    try:
        import psycopg2
    except ImportError:
        print("❌ [CRITICAL] psycopg2 not found. Run: pip install psycopg2-binary")
        sys.exit(1)

    db_name = os.getenv("PG_DATABASE", "renderz_db")
    user = os.getenv("PG_USER", "postgres")
    password = os.getenv("PG_PASSWORD", "postgres")
    host = os.getenv("PG_HOST", "localhost")
    port = os.getenv("PG_PORT", "5432")

    try:
        return psycopg2.connect(host=host, port=port, user=user, password=password, database=db_name)
    except Exception as e:
        if f'database "{db_name}" does not exist' in str(e):
            print(f"\n⚠️ Database '{db_name}' not found. Attempting to create it automatically...")
            try:
                temp_conn = psycopg2.connect(host=host, port=port, user=user, password=password, database="postgres")
                temp_conn.set_isolation_level(0)
                with temp_conn.cursor() as cur:
                    cur.execute(f"CREATE DATABASE {db_name};")
                temp_conn.close()
                print(f"✅ Successfully created database: {db_name}")
                return psycopg2.connect(host=host, port=port, user=user, password=password, database=db_name)
            except Exception as create_error:
                print(f"❌ Failed to create database: {create_error}")
                return None
        else:
            print(f"\n⚠️ [DB ERROR] Could not connect: {e}")
            return None

# ---------- Config ----------
load_dotenv()

TABLE_NAME = "players"
PAGE_SIZE = 100            
BATCH_INSERT_SIZE = 100    

# ---------- Fetcher ----------
def fetch_players_via_node(offset: int, size: int) -> List[Dict]:
    """Calls the Node.js tool to fetch data using its working stealth/IBS engine."""
    try:
        # We'll use a temporary file to get the JSON output
        output_file = f"temp_players_{offset}.json"
        
        # Build command: npx ts-node src/index.ts rating --min 0 --max 120 -s 100
        # Wait, we need to pass the offset. Let's check if the Node.js tool supports it.
        # It doesn't seem to support a raw offset in the CLI yet, but we can call a custom script.
        
        # Let's create a small bridge script in TS
        bridge_ts = f"""
        import {{ SearchService }} from './src/services/searchService';
        const ss = new SearchService();
        ss.search({{ from: {offset}, size: {size} }})
          .then(players => {{
              console.log("JSON_START" + JSON.stringify(players) + "JSON_END");
              process.exit(0);
          }})
          .catch(err => {{
              console.error(err);
              process.exit(1);
          }});
        """
        
        with open("bridge_fetch.ts", "w") as f:
            f.write(bridge_ts)
            
        result = subprocess.run(
            ["npx", "ts-node", "bridge_fetch.ts"],
            capture_output=True,
            text=True,
            shell=True,
            encoding='utf-8'
        )
        
        if result.returncode != 0:
            print(f"❌ Node.js bridge error: {result.stderr}")
            return []
            
        # Extract JSON from output (ignore logs)
        output = result.stdout
        if "JSON_START" in output and "JSON_END" in output:
            json_str = output[output.find("JSON_START")+10:output.rfind("JSON_END")]
            return json.loads(json_str)
        return []
    except Exception as e:
        print(f"❌ Bridge failure: {e}")
        return []

# ---------- Database Initialization ----------
def init_db():
    conn = get_market_db_connection()
    if not conn: return
    cur = conn.cursor()
    cur.execute(f"""
        CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
            asset_id BIGINT PRIMARY KEY,
            player_id BIGINT,
            card_name TEXT,
            rating INTEGER,
            position TEXT,
            club_name TEXT,
            league_name TEXT,
            nation_name TEXT,
            full_data JSONB,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    conn.close()

def insert_to_db(records: List[Dict]):
    if not records: return
    try:
        conn = get_market_db_connection()
        if not conn: return
        with conn.cursor() as cur:
            columns = ["asset_id", "player_id", "card_name", "rating", "position", "club_name", "league_name", "nation_name", "full_data"]
            data = []
            for r in records:
                # Map Node.js player structure to DB structure
                data.append((
                    r.get("assetId"), r.get("playerId"), r.get("cardName"), r.get("rating"), 
                    r.get("position"), r.get("club", {}).get("name"), 
                    r.get("league", {}).get("name"), r.get("nation", {}).get("name"), 
                    json.dumps(r)
                ))
            
            from psycopg2.extras import execute_values
            query = f"INSERT INTO {TABLE_NAME} ({', '.join(columns)}) VALUES %s ON CONFLICT (asset_id) DO UPDATE SET rating = EXCLUDED.rating, full_data = EXCLUDED.full_data, updated_at = CURRENT_TIMESTAMP"
            execute_values(cur, query, data)
            conn.commit()
            conn.close()
    except Exception as e:
        print(f"⚠️ [DB WARNING] Could not save to DB: {e}")

# ---------- Main Scraper ----------
def scrape_everything(start_offset=0, limit=1000):
    init_db()
    
    offset = start_offset
    total_fetched = 0
    
    print(f"🚀 [BRIDGE MODE] Starting scrape from offset {offset}...")

    while total_fetched < limit:
        print(f"📡 Fetching batch at offset {offset}...")
        players = fetch_players_via_node(offset, PAGE_SIZE)
        
        if not players:
            print("🏁 No more players found or error occurred.")
            break
            
        insert_to_db(players)
        total_fetched += len(players)
        print(f"✅ Synced {total_fetched} players to DB.")
        
        offset += PAGE_SIZE
        time.sleep(2) # Modest delay

    print(f"🏁 DONE. Total fetched: {total_fetched}")

if __name__ == "__main__":
    scrape_everything()
