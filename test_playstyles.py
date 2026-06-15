import json
import requests

with open("headers.json", "r") as f:
    headers = json.load(f)

payload = {
    "query": {"bool": {"must": [{"query_string": {"fields": ["assetId"], "query": "3114943"}}]}},
    "from": 0, "size": 1
}
resp = requests.post("https://renderz.app/api/search/elasticsearch", json=payload, headers=headers)
data = resp.json()
print(json.dumps(data, indent=2))
