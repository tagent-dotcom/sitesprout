// Tells Bing (and through IndexNow also Yandex, Naver, Seznam and Yep) about
// new and changed pages straight away, instead of waiting for a crawl.
// ChatGPT search and Copilot use Bing's index, so a page Bing knows on day
// one can be cited by AI assistants on day one.
//
//   npm run indexnow                 # submit sitemap URLs not sent before
//   npm run indexnow -- --all        # submit every URL in the sitemap
//   npm run indexnow -- URL [URL...] # submit these (a page that changed)
//   add --dry-run to print without sending
//
// Needs SITE_URL in src/config/site.ts, INDEXNOW_KEY in the environment and
// public/<key>.txt deployed (npm run indexnow:key). The GitHub workflow runs
// this after every production deploy and keeps the sent list in its cache.
// Protocol: https://www.indexnow.org/documentation
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = readFileSync('src/config/site.ts', 'utf8').match(/SITE_URL = '([^']+)'/)?.[1];
const KEY = process.env.INDEXNOW_KEY;
const STATE = process.env.INDEXNOW_STATE || '.indexnow/sent.json';
const BATCH = 10000;

if (!SITE || SITE.includes('example.com')) { console.error('Set SITE_URL in src/config/site.ts first.'); process.exit(1); }
if (!KEY) { console.error('Set INDEXNOW_KEY (npm run indexnow:key creates one).'); process.exit(1); }
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');
const given = args.filter((a) => a.startsWith('http'));

async function sitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const map of maps) {
    const xml = await (await fetch(map)).text();
    urls.push(...[...xml.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return [...new Set(urls)];
}

const live = (await fetch(KEY_LOCATION).then((r) => r.text()).catch(() => '')).trim();
if (live !== KEY) { console.error(`Key file not live at ${KEY_LOCATION}. Deploy public/${KEY}.txt first.`); process.exit(1); }

const sent = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
let urls;
if (given.length) urls = given;
else {
  const all_ = await sitemapUrls();
  urls = all ? all_ : all_.filter((u) => !sent[u]);
  console.log(`${all_.length} URLs in the sitemap, ${urls.length} to submit.`);
}
urls = urls.filter((u) => u.startsWith(SITE + '/'));
if (!urls.length) { console.log('Nothing new to submit.'); process.exit(0); }
if (dryRun) { console.log(urls.join('\n')); process.exit(0); }

for (let i = 0; i < urls.length; i += BATCH) {
  const urlList = urls.slice(i, i + BATCH);
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 accepted; 202 accepted while the key is still being verified.
  if (res.status !== 200 && res.status !== 202) { console.error(`IndexNow answered ${res.status}: ${await res.text()}`); process.exit(1); }
  const today = new Date().toISOString().slice(0, 10);
  for (const u of urlList) sent[u] = today;
  console.log(`Submitted ${urlList.length} URLs (HTTP ${res.status}).`);
}
mkdirSync(dirname(STATE), { recursive: true });
writeFileSync(STATE, JSON.stringify(sent, null, 1) + '\n');
