import psycopg2
import json
import os
import sys
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    'host': os.getenv('PG_HOST', 'localhost'),
    'database': os.getenv('PG_DATABASE', 'zenith_data'),
    'user': os.getenv('PG_USER', 'zenith_bot'),
    'password': os.getenv('PG_PASSWORD', 'zenith6Z@'),
    'port': os.getenv('PG_PORT', '5432')
}

CDN_BASE = 'https://images.zenithfcm.com'

def main():
    try:
        with open('migration_url_mapping.json', 'r') as f:
            mapping = json.load(f)
    except Exception as e:
        print(f"Error loading mapping: {e}")
        return

    if not mapping:
        print("Mapping is empty.")
        return

    print("Connecting to database for updates...")
    conn = psycopg2.connect(**DB_CONFIG)
    # Enable autocommit or manual commit per chunk so we don't lock the production database for a long time
    conn.autocommit = False 
    cur = conn.cursor()
    
    total_urls = len(mapping)
    print(f"Updating database for {total_urls} unique URLs...")
    print("Executing in batches to prevent database locking on production...")
    
    updates_made = 0
    errors = 0
    
    tables_cols = [
        ("player_stats", "player_image"),
        ("player_stats", "card_background"),
        ("player_stats", "nation_flag"),
        ("player_stats", "club_flag"),
        ("player_stats", "league_image"),
        ("skills_catalog", "skill_image"),
        ("playstyles_catalog", "icon_level_1"),
        ("playstyles_catalog", "icon_level_2"),
    ]
    
    for i, (old_url, new_name) in enumerate(mapping.items(), 1):
        new_url = f"{CDN_BASE}/{new_name}"
        
        try:
            # Update single URL columns
            for table, col in tables_cols:
                try:
                    cur.execute(f"UPDATE {table} SET {col} = %s WHERE {col} = %s", (new_url, old_url))
                    updates_made += cur.rowcount
                except psycopg2.errors.UndefinedTable:
                    # Table might not exist, that's fine
                    conn.rollback()
                    continue
                except psycopg2.errors.UndefinedColumn:
                    conn.rollback()
                    continue

            # Update CSV columns
            try:
                cur.execute("UPDATE player_stats SET skills = REPLACE(skills, %s, %s) WHERE skills LIKE %s", (old_url, new_url, f"%{old_url}%"))
                updates_made += cur.rowcount
            except psycopg2.errors.UndefinedColumn:
                conn.rollback()
                pass
                
            try:
                cur.execute("UPDATE player_stats SET traits = REPLACE(traits, %s, %s) WHERE traits LIKE %s", (old_url, new_url, f"%{old_url}%"))
                updates_made += cur.rowcount
            except psycopg2.errors.UndefinedColumn:
                conn.rollback()
                pass
                
            # Commit every 100 URLs to avoid long transaction locks
            if i % 100 == 0:
                conn.commit()
                print(f"Progress: {i}/{total_urls} URLs processed... (Rows updated: {updates_made})")

        except Exception as e:
            errors += 1
            conn.rollback()
            print(f"Error updating URL {old_url}: {e}")

    # Final commit for remaining
    conn.commit()
    
    cur.close()
    conn.close()
    
    print("\n" + "="*50)
    print("MIGRATION COMPLETE")
    print(f"Successfully processed {total_urls} URLs.")
    print(f"Total database rows modified: {updates_made}")
    if errors > 0:
        print(f"Encountered {errors} errors. See logs above.")
    print("="*50)

if __name__ == '__main__':
    main()
