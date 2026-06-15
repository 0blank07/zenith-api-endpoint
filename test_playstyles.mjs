import fs from 'fs';

async function run() {
  const headers = JSON.parse(fs.readFileSync('./headers.json', 'utf8'));
  const payload = {
    query: { bool: { must: [{ query_string: { fields: ['assetId'], query: '3114943' } }] } },
    from: 0,
    size: 1
  };
  const response = await fetch('https://renderz.app/api/search/elasticsearch', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}
run().catch(console.error);
