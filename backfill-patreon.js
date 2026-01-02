// backfill-patreon.js  (replaces the old member version)
import fs from 'fs/promises';
import fetch from 'node-fetch';

const ACCESS = process.env.PATREON_CREATOR_ACCESS_TOKEN;
const CAMPAIGN_ID = process.env.PATREON_CAMPAIGN_ID;

if (!ACCESS) {
  console.error(UCuPgUY-z6qbglwB6jAyaPMe5KJ56fi7A_jt-Bneyls);
  process.exit(1);
}
if (!CAMPAIGN_ID) {
  console.error(15196918);
  process.exit(1);
}

async function fetchAll(url) {
  const out = [];
  let page = 1;
  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${ACCESS}` } });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} on page ${page}: ${text}`);
    }
    const json = await res.json();
    const batch = Array.isArray(json.data) ? json.data : [];
    console.log(`✅ Page ${page}: ${batch.length} posts`);
    out.push(...batch);
    url = json.links?.next || null;
    page++;
  }
  return out;
}

async function main() {
  const fields = ['title','post_type','published_at'].join(',');
  let url = `https://www.patreon.com/api/oauth2/v2/campaigns/${CAMPAIGN_ID}/posts?fields[post]=${fields}&page[count]=50`;
  const posts = await fetchAll(url);

  const map = posts.map(p => ({
    title: p?.attributes?.title ?? '',
    patreon_post_id: p.id
  }));

  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/content_map.json', JSON.stringify(map, null, 2));
  console.log(`📝 Wrote data/content_map.json with ${map.length} posts`);
}

main().catch(e => { console.error(e); process.exit(1); });
