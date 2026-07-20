import psycopg2
import requests
import os
import sys
import io

# Fix Windows terminal encoding for emojis
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
    
import time
import logging
from urllib.parse import urlparse
from datetime import datetime
from pathlib import Path
import random
from dotenv import load_dotenv

# Load credentials from local .env file
load_dotenv()

# Configuration
DB_CONFIG = {
    'host': os.getenv('PG_HOST', 'localhost'),
    'database': os.getenv('PG_DATABASE', 'zenith_data'),
    'user': os.getenv('PG_USER', 'zenith_bot'),
    'password': os.getenv('PG_PASSWORD', 'zenith6Z@'),
    'port': os.getenv('PG_PORT', '5432')
}

# Changed to a local directory for Windows
IMAGE_DIR = './downloaded_images'
CDN_BASE  = 'https://images.zenithfcm.com'
LOG_DIR = './image_migration_logs'
DRY_RUN = '--dry-run' in sys.argv or '-d' in sys.argv

# Setup logging
os.makedirs(LOG_DIR, exist_ok=True)
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
log_file = os.path.join(LOG_DIR, f'download_{timestamp}.log')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

def get_headers():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
    return {
        'User-Agent': random.choice(user_agents),
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://renderz.app/',  # Fixed Anti-Hotlink Referer
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }

def extract_image_urls_from_db():
    logger.info("Connecting to database...")
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    image_urls = set()

    logger.info("Extracting from player_stats (single URL columns)...")
    cur.execute("""
        SELECT player_image, card_background, nation_flag, club_flag, league_image
        FROM player_stats
        WHERE player_image LIKE '%renderz.app%'
           OR card_background LIKE '%renderz.app%'
           OR nation_flag LIKE '%renderz.app%'
           OR club_flag LIKE '%renderz.app%'
           OR league_image LIKE '%renderz.app%'
    """)
    for row in cur.fetchall():
        for url in row:
            if url and 'renderz.app' in url:
                image_urls.add(url.strip())

    logger.info(f"  Found {len(image_urls)} unique URLs from single columns")

    logger.info("Extracting from player_stats (comma-separated: skills, traits)...")
    cur.execute("""
        SELECT skills, traits 
        FROM player_stats 
        WHERE skills LIKE '%renderz.app%' 
           OR traits LIKE '%renderz.app%'
    """)
    before_count = len(image_urls)
    for row in cur.fetchall():
        for field in row:
            if field:
                for url in field.split(','):
                    url = url.strip()
                    if url and 'renderz.app' in url:
                        image_urls.add(url)
    logger.info(f"  Found {len(image_urls) - before_count} additional URLs from comma-separated columns")

    logger.info("Extracting from skills_catalog...")
    cur.execute("SELECT skill_image FROM skills_catalog WHERE skill_image LIKE '%renderz.app%'")
    before_count = len(image_urls)
    for row in cur.fetchall():
        if row[0] and 'renderz.app' in row[0]:
            image_urls.add(row[0].strip())
    logger.info(f"  Found {len(image_urls) - before_count} additional URLs from skills_catalog")

    cur.close()
    conn.close()

    logger.info(f"Total unique renderz.app image URLs: {len(image_urls)}")
    return list(image_urls)

def get_filename_from_url(url):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if '.' not in filename:
        filename = filename + '.png'
    return filename

def download_image(url, save_dir, dry_run=False, retry_count=0):
    try:
        filename = get_filename_from_url(url)
        filepath = os.path.join(save_dir, filename)

        if os.path.exists(filepath):
            file_size = os.path.getsize(filepath)
            if file_size > 0:
                return ('skip', filename, file_size)
            else:
                os.remove(filepath)

        if dry_run:
            return ('dry_run', filename, 0)

        headers = get_headers()
        response = requests.get(url, stream=True, timeout=30, headers=headers,
                                allow_redirects=True, verify=True)
        response.raise_for_status()

        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        file_size = os.path.getsize(filepath)
        if file_size == 0:
            os.remove(filepath)
            return ('fail', f"{url}: Downloaded empty file", 0)

        return ('success', filename, file_size)

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 403 and retry_count < 3:
            time.sleep(random.uniform(2, 5))
            return download_image(url, save_dir, dry_run, retry_count + 1)
        elif e.response.status_code == 429:
            return ('ratelimit', url, 0)
        else:
            return ('fail', f"{url}: HTTP {e.response.status_code}", 0)
    except requests.exceptions.Timeout:
        if retry_count < 2:
            time.sleep(1)
            return download_image(url, save_dir, dry_run, retry_count + 1)
        return ('timeout', url, 0)
    except requests.exceptions.RequestException as e:
        return ('fail', f"{url}: {str(e)[:100]}", 0)
    except Exception as e:
        return ('error', f"{url}: {str(e)[:100]}", 0)

# ─────────────────────────────────────────────────────────────────────────────
# Phase 4 — Bulk SQL URL Update (fast, seconds not minutes)
# ─────────────────────────────────────────────────────────────────────────────
import re

def slugify(text):
    if not text: return 'unknown'
    text = str(text).lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def extract_filename(url):
    if not url or not isinstance(url, str): return None
    parts = url.split('/')
    last_part = parts[-1]
    if not last_part: return None
    return last_part.split('?')[0]

def update_database_urls(dry_run=False):
    logger.info("Connecting to database for URL update & Slugification...")
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    logger.info("Fetching player stats to build rename map...")
    cur.execute("""
        SELECT 
            player_id, name, ovr, player_image, 
            card_background, event,
            nation_flag, nation_region,
            club_flag, team,
            league_image, league,
            traits, traits_name
        FROM player_stats
    """)
    rows = cur.fetchall()

    rename_map = {}

    def add_mapping(url, prefix, raw_name):
        f = extract_filename(url)
        if f and f.endswith('.png') and raw_name:
            clean_name = slugify(raw_name)
            rename_map[f] = f"{prefix}-{clean_name}.png"

    for r in rows:
        player_id, name, ovr, player_image, card_background, event, nation_flag, nation_region, club_flag, team, league_image, league, traits, traits_name = r
        
        # Player Image
        p_file = extract_filename(player_image)
        if p_file and p_file.endswith('.png'):
            rename_map[p_file] = f"{slugify(name)}-{ovr}-{player_id}-image.png"

        # Shared Assets
        add_mapping(card_background, 'background', event)
        add_mapping(nation_flag, 'nation', nation_region)
        add_mapping(club_flag, 'club', team)
        add_mapping(league_image, 'league', league)

        if traits and traits_name:
            t_urls = traits.split(',')
            t_names = traits_name.split(',')
            for i in range(len(t_urls)):
                if i < len(t_names):
                    add_mapping(t_urls[i], 'trait', t_names[i])

    # Fetch skills catalog
    logger.info("Fetching skills catalog...")
    cur.execute("SELECT skill_name, skill_image FROM skills_catalog")
    for r in cur.fetchall():
        s_name, s_image = r
        f = extract_filename(s_image)
        if f and f.endswith('.png') and s_name:
            rename_map[f] = f"skill-{slugify(s_name)}.png"

    logger.info(f"Built mapping for {len(rename_map)} total files. Renaming local files...")
    
    if not dry_run:
        import glob
        local_files = glob.glob(os.path.join(IMAGE_DIR, '*.png'))
        rename_count = 0
        for filepath in local_files:
            old_f = os.path.basename(filepath)
            if old_f in rename_map and old_f != rename_map[old_f]:
                new_f = rename_map[old_f]
                new_filepath = os.path.join(IMAGE_DIR, new_f)
                try:
                    os.rename(filepath, new_filepath)
                    rename_count += 1
                except Exception as e:
                    logger.error(f"Failed to rename {old_f} to {new_f}: {e}")
        logger.info(f"Successfully renamed {rename_count} files locally in {IMAGE_DIR}")

    if not dry_run:
        cur.execute("BEGIN")

    logger.info("Updating database URLs with new clean names via Temp Table...")
    
    if not dry_run:
        cur.execute("""
            CREATE TEMP TABLE temp_url_map (
                old_url TEXT PRIMARY KEY,
                new_url TEXT NOT NULL
            )
        """)
        
        map_values = []
        for old_f, new_f in rename_map.items():
            if old_f != new_f:
                # We map BOTH the renderz.app URL pattern AND the old zenithfcm.com URL pattern 
                # to the NEW zenithfcm.com slug URL, so the join matches either safely.
                old_zenith_url = f"{CDN_BASE}/{old_f}"
                new_zenith_url = f"{CDN_BASE}/{new_f}"
                map_values.append((old_zenith_url, new_zenith_url))

        # Because the database might have old renderz urls, we also use REPLACE later for traits.
        import psycopg2.extras as pg_extras
        pg_extras.execute_values(
            cur,
            "INSERT INTO temp_url_map (old_url, new_url) VALUES %s",
            map_values
        )

        single_cols = ['player_image', 'card_background', 'nation_flag', 'club_flag', 'league_image']
        for col in single_cols:
            cur.execute(f"""
                UPDATE player_stats 
                SET {col} = m.new_url
                FROM temp_url_map m
                WHERE player_stats.{col} LIKE '%' || split_part(m.old_url, '/', 4) || '%'
            """)

        cur.execute("""
            UPDATE skills_catalog 
            SET skill_image = m.new_url
            FROM temp_url_map m
            WHERE skills_catalog.skill_image LIKE '%' || split_part(m.old_url, '/', 4) || '%'
        """)

        # For CSV columns, we do it safely using row-by-row mapping
        logger.info("Updating CSV columns...")
        cur.execute("SELECT player_id, skills, traits FROM player_stats WHERE skills IS NOT NULL OR traits IS NOT NULL")
        rows = cur.fetchall()
        for r in rows:
            p_id, skills, traits = r
            updated = False
            new_s, new_t = skills, traits
            for old_f, new_f in rename_map.items():
                if old_f == new_f: continue
                # replace hash with slug
                old_part = split_part_custom = old_f
                new_url = f"{CDN_BASE}/{new_f}"
                
                if new_s and old_part in new_s:
                    new_s = re.sub(r'https://[^,]+' + old_part + r'[^,]*', new_url, new_s)
                    updated = True
                if new_t and old_part in new_t:
                    new_t = re.sub(r'https://[^,]+' + old_part + r'[^,]*', new_url, new_t)
                    updated = True
            
            if updated:
                cur.execute("UPDATE player_stats SET skills = %s, traits = %s WHERE player_id = %s", (new_s, new_t, p_id))

        conn.commit()
        logger.info("✓ DB update committed — URLs are fully slugified!")
    else:
        logger.info(f"~ Dry run: would update all DB URLs to new slugs")

    cur.close()
    conn.close()
# ─────────────────────────────────────────────────────────────────────────────

def format_size(bytes):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes < 1024.0:
            return f"{bytes:.1f}{unit}"
        bytes /= 1024.0
    return f"{bytes:.1f}TB"

def main():
    mode = "DRY RUN MODE" if DRY_RUN else "DOWNLOAD MODE"
    logger.info("="*70)
    logger.info(f"ZENITH IMAGE MIGRATION - {mode}")
    logger.info("="*70)
    logger.info(f"Log file: {log_file}")

    if DRY_RUN:
        logger.info("⚠ DRY RUN: No files will be downloaded or DB rows updated")
    else:
        logger.info("🔥 LIVE MODE: Downloading with anti-block headers + DB update")

    if not DRY_RUN:
        os.makedirs(IMAGE_DIR, exist_ok=True)
        logger.info(f"Image directory: {IMAGE_DIR}")

    logger.info("\n[PHASE 1/4] Extracting image URLs from database...")
    try:
        urls = extract_image_urls_from_db()
    except Exception as e:
        logger.error(f"Failed to extract URLs: {e}")
        return 1

    logger.info(f"\n✓ Total URLs to process: {len(urls)}")
    random.shuffle(urls)
    logger.info("✓ URLs shuffled to avoid detection patterns")

    logger.info(f"\n[PHASE 2/4] {'Simulating' if DRY_RUN else 'Downloading'} images...")
    logger.info("Rate limit: ~2 images/second with random delays")

    stats = {
        'downloaded': 0, 'skipped': 0, 'failed': 0,
        'timeout': 0, 'ratelimit': 0, 'dry_run': 0, 'total_bytes': 0
    }

    failed_urls = []
    start_time = time.time()
    last_log_time = start_time
    consecutive_403 = 0

    for i, url in enumerate(urls, 1):
        status, info, size = download_image(url, IMAGE_DIR, DRY_RUN)
        stats['total_bytes'] += size

        if status == 'success':
            stats['downloaded'] += 1
            consecutive_403 = 0
            logger.info(f"[{i}/{len(urls)}] ✓ Downloaded: {info} ({format_size(size)})")
        elif status == 'skip':
            stats['skipped'] += 1
            consecutive_403 = 0
            logger.debug(f"[{i}/{len(urls)}] ○ Exists: {info} ({format_size(size)})")
        elif status == 'dry_run':
            stats['dry_run'] += 1
            logger.info(f"[{i}/{len(urls)}] ~ Would download: {info}")
        elif status == 'ratelimit':
            stats['ratelimit'] += 1
            logger.warning(f"[{i}/{len(urls)}] ⏱ Rate limited, pausing 60s...")
            failed_urls.append(info)
            time.sleep(60)
        elif status == 'timeout':
            stats['timeout'] += 1
            logger.warning(f"[{i}/{len(urls)}] ⏱ Timeout: {info}")
            failed_urls.append(info)
        else:
            stats['failed'] += 1
            if '403' in str(info):
                consecutive_403 += 1
            logger.warning(f"[{i}/{len(urls)}] ✗ Failed: {info}")
            failed_urls.append(info)

        if consecutive_403 >= 10:
            logger.warning("⚠ Too many 403 errors. Pausing 30s...")
            time.sleep(30)
            consecutive_403 = 0

        current_time = time.time()
        if i % 100 == 0 or (current_time - last_log_time) >= 30:
            elapsed = current_time - start_time
            rate = i / elapsed if elapsed > 0 else 0
            eta_seconds = (len(urls) - i) / rate if rate > 0 else 0
            logger.info(
                f"Progress: {i}/{len(urls)} ({i/len(urls)*100:.1f}%) | "
                f"Rate: {rate:.1f} img/s | ETA: {eta_seconds/60:.1f} min | "
                f"Downloaded: {format_size(stats['total_bytes'])} | Failed: {stats['failed']}"
            )
            last_log_time = current_time

        if status == 'success' and not DRY_RUN:
            time.sleep(random.uniform(0.3, 0.7))
        elif status == 'fail' and '403' in str(info) and not DRY_RUN:
            time.sleep(random.uniform(1, 3))

    elapsed = time.time() - start_time
    # Prevent division by zero if it runs instantly
    safe_elapsed = elapsed if elapsed > 0 else 0.1
    
    logger.info("======================================================================")
    logger.info("[PHASE 3/4] DOWNLOAD SUMMARY")
    logger.info("======================================================================")
    logger.info(f" ✓ Downloaded:     {stats['downloaded']}")
    logger.info(f" ⏭ Already exists: {stats['skipped']}")
    logger.info(f" ⌛ Timeout:        {stats['timeout']}")
    logger.info(f" 🛑 Rate limited:   {stats['ratelimit']}")
    logger.info(f" ❌ Failed:         {stats['failed']}")
    logger.info(f" 📊 Total:          {len(urls)}")
    logger.info(f" 💾 Total size:     {format_size(stats['total_bytes'])}")
    logger.info(f" ⏱ Time taken:     {elapsed/60:.1f} minutes ({elapsed:.0f}s)")
    logger.info(f" ⚡ Rate:           {len(urls)/safe_elapsed:.1f} images/second")

    logger.info("\n" + "="*70)
    logger.info("[PHASE 4/4] UPDATING DATABASE URLs")
    logger.info("="*70)
    try:
        update_database_urls(dry_run=DRY_RUN)
    except Exception as e:
        logger.error(f"DB update failed: {e}", exc_info=True)

    logger.info("="*70)

    if failed_urls and not DRY_RUN:
        logger.warning(f"\n⚠ {len(failed_urls)} downloads failed:")
        for url in failed_urls[:20]:
            logger.warning(f"  - {url}")
        if len(failed_urls) > 20:
            logger.warning(f"  ... and {len(failed_urls) - 20} more (see log file)")
        logger.info("\nℹ Run script again to retry failed downloads")

    if not DRY_RUN:
        logger.info(f"\n✓ Images saved to: {IMAGE_DIR}")
    logger.info(f"✓ Log saved to: {log_file}")

    success_rate = (stats['downloaded'] + stats['skipped']) / len(urls) if urls else 0
    if success_rate > 0.95:
        return 0
    elif success_rate > 0.80:
        logger.warning(f"⚠ Only {success_rate*100:.1f}% success rate.")
        return 0
    else:
        logger.error(f"✗ Low success rate: {success_rate*100:.1f}%")
        return 1

if __name__ == "__main__":
    if '--help' in sys.argv or '-h' in sys.argv:
        print("""
Zenith Image Migration Script

Usage:
  python download_images.py           # Full download + DB update
  python download_images.py --dry-run # Test mode (no downloads, no DB changes)
        """)
        sys.exit(0)

    try:
        sys.exit(main())
    except KeyboardInterrupt:
        logger.warning("\n\n⚠ Interrupted by user")
        sys.exit(1)
    except Exception as e:
        logger.error(f"\n\n✗ Fatal error: {e}", exc_info=True)
        sys.exit(1)
