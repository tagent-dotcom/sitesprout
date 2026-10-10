# SiteSprout 🌱

A simple, SEO-ready, multilingual website starter. Clone it, describe the
idea in `IDEA.md`, change one config file, and build pages.

**Built in:** Astro (static, fast) · SEO head with canonical, hreflang,
Open Graph and JSON-LD · sitemap with language alternates · robots.txt ·
llms.txt for AI assistants · language switcher · Google Analytics 4 with
Consent Mode · Microsoft Clarity · Search Console and Bing verification ·
IndexNow on every deploy · Whop checkout · an SEO check script.

## Start a new site

```bash
gh repo create my-site --template tagent-dotcom/sitesprout --public --clone
cd my-site
npm install
cp .env.example .env
npm run dev
```

Then:

1. **Research** the idea with Semrush and write it into [IDEA.md](IDEA.md)
   ([how](docs/SEMRUSH-RESEARCH.md)).
2. **Configure** `src/config/site.ts` (address, name, owner) and the
   languages in `src/i18n/config.ts`.
3. **Write** the copy in `src/i18n/ui.ts`, the About, Contact and Privacy
   pages, and replace `public/og-default.png` and `public/favicon.svg`.
4. **Build pages** following [docs/SEO-GUIDELINES.md](docs/SEO-GUIDELINES.md).
5. **Deploy** on Vercel ([docs/DEPLOY.md](docs/DEPLOY.md)) and set the
   environment variables.
6. **Connect** Search Console, Bing, GA4, Clarity and IndexNow
   ([docs/ANALYTICS-AND-INDEXING.md](docs/ANALYTICS-AND-INDEXING.md)).
7. **Sell** with Whop if the idea has a paid plan ([docs/WHOP.md](docs/WHOP.md)).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run check` | SEO check of `dist/`: one H1, title and description length, canonical, JSON-LD, hreflang, broken links |
| `npm run indexnow:key` | Create an IndexNow key and its key file |
| `npm run indexnow` | Send new sitemap URLs to IndexNow (`-- --dry-run` to preview) |

## Where things live

```
IDEA.md                    the idea, research summary and decision (fill in first)
research/                  raw keyword research as CSV (keywords, SERPs, competitors)
src/config/site.ts         site address, name, owner, ids from env
src/i18n/config.ts         languages
src/i18n/routes.ts         every page and its URL per language
src/i18n/ui.ts             interface words per language
src/components/SEO.astro   title, description, canonical, hreflang, OG, JSON-LD
src/components/Analytics.astro   GA4 + Clarity
src/components/LangSwitcher.astro
src/components/WhopCheckout.astro
src/layouts/BaseLayout.astro
src/views/                 page bodies shared by all languages
src/pages/                 one file per page and language; robots.txt, llms.txt
scripts/                   SEO check, IndexNow
.github/workflows/         IndexNow after each deploy
docs/                      guides
```

## Guides

- [SEO guidelines](docs/SEO-GUIDELINES.md)
- [Finding ideas with Semrush](docs/SEMRUSH-RESEARCH.md)
- [Languages (i18n)](docs/I18N.md)
- [Analytics, Search Console, Bing, IndexNow, Clarity](docs/ANALYTICS-AND-INDEXING.md)
- [Selling with Whop](docs/WHOP.md)
- [Git and deploy](docs/DEPLOY.md)

## Licence

MIT. Use it for anything; keep the licence file.
