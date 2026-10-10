// Creates an IndexNow key and the key file Bing checks it against.
//   npm run indexnow:key
// Then put the printed key in INDEXNOW_KEY (.env locally, GitHub repo
// secret for the workflow) and deploy, so public/<key>.txt is live.
import { randomBytes } from 'node:crypto';
import { readdirSync, unlinkSync, writeFileSync } from 'node:fs';

for (const f of readdirSync('public')) if (/^[a-f0-9]{32}\.txt$/.test(f)) unlinkSync(`public/${f}`);
const key = randomBytes(16).toString('hex');
writeFileSync(`public/${key}.txt`, key);
console.log(`Key file written: public/${key}.txt\nINDEXNOW_KEY=${key}`);
