import psycopg2
import json
import re
import os
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    'host': os.getenv('PG_HOST', 'localhost'),
    'database': os.getenv('PG_DATABASE', 'zenith_data'),
    'user': os.getenv('PG_USER', 'zenith_bot'),
    'password': os.getenv('PG_PASSWORD', 'zenith6Z@'),
    'port': os.getenv('PG_PORT', '5432')
}

def slugify(text):
    if not text: return "unknown"
    text = str(text).lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_old_filename(url):
    if not url: return None
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if '.' not in filename:
        filename = filename + '.png'
    return filename

def is_target_url(url):
    if not url: return False
    return 'renderz.app' in url or 'images.zenithfcm.com' in url

def main():
    print("Connecting to database...")
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
    except Exception as e:
        print(f"Error connecting to DB: {e}")
        return

    mapping_url_to_new_name = {}
    
    # 1. Map Skills
    print("Mapping skills...")
    try:
        cur.execute("SELECT skill_image, skill_name FROM skills_catalog WHERE skill_image IS NOT NULL")
        for img, name in cur.fetchall():
            if is_target_url(img):
                mapping_url_to_new_name[img] = f"skill-{slugify(name)}.png"
    except Exception as e:
        print(f"Notice: Could not map skills (table might not exist): {e}")
        conn.rollback()

    # 2. Map Playstyles
    print("Mapping playstyles...")
    try:
        cur.execute("SELECT icon_level_1, icon_level_2, name FROM playstyles_catalog")
        for ic1, ic2, name in cur.fetchall():
            if is_target_url(ic1):
                mapping_url_to_new_name[ic1] = f"playstyle-{slugify(name)}-1.png"
            if is_target_url(ic2):
                mapping_url_to_new_name[ic2] = f"playstyle-{slugify(name)}-2.png"
    except Exception as e:
        print(f"Notice: Could not map playstyles (table might not exist): {e}")
        conn.rollback()

    # 3. Map Player Stats (Unique and Shared)
    print("Mapping player stats, unique cards, and shared icons...")
    cur.execute("""
        SELECT player_id, name, ovr, player_image, card_background, 
               nation_flag, nation_region, club_flag, team, league_image, league,
               traits, traits_name
        FROM player_stats
        WHERE player_image LIKE '%%renderz.app%%' OR card_background LIKE '%%renderz.app%%'
           OR nation_flag LIKE '%%renderz.app%%' OR club_flag LIKE '%%renderz.app%%'
           OR league_image LIKE '%%renderz.app%%'
    """)
    
    seen_base_slugs = {}
    
    for row in cur.fetchall():
        player_id, name, ovr, p_img, bg_img, n_img, n_reg, c_img, team, l_img, league, traits, traits_name = row
        
        # Unique slug generation
        base_slug = f"{slugify(name)}-{ovr}"
        
        # Ensure unique slugs for players with exactly the same name and OVR (different cards)
        if base_slug in seen_base_slugs:
            seen_base_slugs[base_slug] += 1
            base_slug = f"{base_slug}-{seen_base_slugs[base_slug]}"
        else:
            seen_base_slugs[base_slug] = 1
        
        if is_target_url(p_img):
            mapping_url_to_new_name[p_img] = f"{base_slug}-player.png"
            
        if is_target_url(bg_img):
            mapping_url_to_new_name[bg_img] = f"{base_slug}-background.png"
            
        if is_target_url(n_img):
            mapping_url_to_new_name[n_img] = f"nation-{slugify(n_reg)}.png"
            
        if is_target_url(c_img):
            mapping_url_to_new_name[c_img] = f"club-{slugify(team)}.png"
            
        if is_target_url(l_img):
            mapping_url_to_new_name[l_img] = f"league-{slugify(league)}.png"
            
        # Map traits (comma separated)
        if traits and traits_name and is_target_url(traits):
            trait_urls = [t.strip() for t in traits.split(',')]
            trait_names = [t.strip() for t in traits_name.split(',')]
            for i, t_url in enumerate(trait_urls):
                if is_target_url(t_url):
                    t_name = trait_names[i] if i < len(trait_names) else f"unknown-{i}"
                    mapping_url_to_new_name[t_url] = f"trait-{slugify(t_name)}.png"

    # Also map old filenames directly for the bash script
    filename_mapping = {}
    for url, new_name in mapping_url_to_new_name.items():
        old_file = get_old_filename(url)
        if old_file:
            filename_mapping[old_file] = new_name
        
    with open('migration_url_mapping.json', 'w') as f:
        json.dump(mapping_url_to_new_name, f, indent=2)
        
    with open('migration_file_mapping.json', 'w') as f:
        json.dump(filename_mapping, f, indent=2)
        
    print(f"\n- Generated mappings for {len(mapping_url_to_new_name)} unique URLs.")
    print("- Saved to 'migration_url_mapping.json' and 'migration_file_mapping.json'")
    
if __name__ == '__main__':
    main()
