import os
import json
import requests
import re
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# --- MOCK DB FOR TESTING ---
def mock_insert(records):
    print(f"\n[TEST SUCCESS] Simulated saving {len(records)} players to PostgreSQL.")
    p = records[0]
    print(f"Sample Player: {p['card_name']} ({p['rating']} OVR) - {p['club_name']}, {p['nation_name']}")
    print(f"Position: {p['position']}")
    print(f"Cleaned Program: {p['full_data']['cleaned']['program']}")
    print(f"Cleaned Traits: {', '.join(p['full_data']['cleaned']['traits'])}")
    print(f"Sample Stat (Acceleration): {p['full_data']['stats']['acc']}")

# --- COPIED CLEANING LOGIC ---
NATIONS = {52: 'Argentina', 14: 'England', 54: 'Brazil', 18: 'France', 21: 'Germany'}
CLUBS = {112893: 'Inter Miami', 1369: 'PSG', 241: 'FC Barcelona'}
TRAITS = {13: 'Finesse Shot', 16: 'Outside Foot Shot', 18: 'Speed Dribbler'}

def clean_name(name, item_id=None, category=None):
    if not name: return "Unknown"
    if item_id:
        if category == 'nation' and item_id in NATIONS: return NATIONS[item_id]
        if category == 'club' and item_id in CLUBS: return CLUBS[item_id]
    name = re.sub(r'^(TeamName_|LeagueName_|NationName_|PROGRAM_|NAME_SKILL_|trait_name_)', '', name)
    return name.replace('_', ' ').strip()

# --- TEST EXECUTION ---
def test_scrape():
    HEADERS_FILE = "headers.json"
    API_URL = "https://renderz.app/api/search/elasticsearch"
    
    with open(HEADERS_FILE, "r") as f:
        headers = json.load(f)
    
    print("🚀 Starting API Test...")
    payload = {
        "query": {"bool": {"must": [{"query_string": {"fields": ["cardName"], "query": "*Messi*"}}], "should": [], "must_not": []}},
        "from": 0, "size": 5
    }
    
    resp = requests.post(API_URL, json=payload, headers=headers)
    if resp.status_code != 200:
        print(f"❌ Failed: {resp.status_code}")
        print(resp.text)
        return

    data = resp.json()
    players = data.get("players", [])
    if not players:
        print("❌ No players returned.")
        return

    records = []
    for p in players:
        records.append({
            "asset_id": p.get("assetId"),
            "player_id": p.get("playerId"),
            "card_name": p.get("cardName"),
            "rating": p.get("rating"),
            "position": p.get("position"),
            "club_name": clean_name(p["club"]["name"], p["club"]["id"], 'club'),
            "nation_name": clean_name(p["nation"]["name"], p["nation"]["id"], 'nation'),
            "full_data": {
                **p,
                "cleaned": {
                    "traits": [TRAITS.get(t['id'], clean_name(t['title'])) for t in p.get('traits', [])],
                    "program": clean_name(p.get('source'), category='program')
                }
            }
        })
    
    mock_insert(records)

if __name__ == "__main__":
    test_scrape()
