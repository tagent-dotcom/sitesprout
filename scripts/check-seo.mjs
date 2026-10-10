// A quick SEO check of the built site. Run after `npm run build`:
//   npm run check
// Flags pages without exactly one H1, a missing or odd-length title or
// description, a missing canonical, broken internal links, JSON-LD that does
// not parse, and hreflang links that point at pages that do not exist.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) { console.error('Run npm run build first.'); process.exit(1); }
const files = [];
(function walk(dir) { for (const f of readdirSync(dir)) { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const site = readFileSync('src/config/site.ts', 'utf8').match(/SITE_URL = '([^']+)'/)[1];
const exists = (path) => existsSync(join(DIST, path, 'index.html')) || existsSync(join(DIST, path));
let problems = 0;
const warn = (file, msg) => { problems++; console.log(`✗ ${file.replace(DIST, '')}: ${msg}`); };

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warn(file, `${h1} H1 tags (want 1)`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title) warn(file, 'no <title>');
  else if (title.length > 65) warn(file, `title is ${title.length} characters (aim for 50 to 60)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!desc) warn(file, 'no meta description');
  else if (!noindex && (desc.length < 70 || desc.length > 165)) warn(file, `description is ${desc.length} characters (aim for 140 to 160)`);
  if (!noindex && !/<link rel="canonical"/.test(html)) warn(file, 'no canonical');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { warn(file, 'JSON-LD does not parse'); }
  }
  for (const m of html.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)) {
    const path = m[1].replace(site, '');
    if (!exists(path)) warn(file, `hreflang points to missing page ${path}`);
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const path = m[1];
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) warn(file, `link without trailing slash: ${path}`);
    else if (!exists(path)) warn(file, `broken internal link: ${path}`);
  }
}
console.log(problems ? `\n${problems} problem(s) in ${files.length} pages.` : `All ${files.length} pages pass.`);
process.exit(problems ? 1 : 0);
