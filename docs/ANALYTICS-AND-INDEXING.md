# Analytics, Search Console, Bing and IndexNow

Every service is switched on by an environment variable (`.env.example`).
Locally put them in `.env`; on Vercel under Project Settings > Environment
Variables. Leave one empty and that service is simply not loaded.

## Google Analytics 4 (`PUBLIC_GA_ID`)

1. [analytics.google.com](https://analytics.google.com) > Admin > Create property.
2. Add a **Web** data stream with your domain. Copy the Measurement ID (`G-...`).
3. Set `PUBLIC_GA_ID=G-...` and redeploy.
4. Admin > Data filters: add an **Internal traffic** filter for your own IP
   and set it to **Active** (it starts in Testing and filters nothing).
5. Link GA4 to Search Console (Admin > Product links) to see queries in GA.

Consent: the template starts Google Consent Mode v2 with analytics granted
and ads denied. Before showing personalised ads to EU or UK visitors you need
a consent banner (Google certified CMP) that updates consent.

## Google Search Console (`PUBLIC_GSC_VERIFICATION`)

1. [search.google.com/search-console](https://search.google.com/search-console) > Add property.
2. Best: a **Domain** property verified by a DNS TXT record at your registrar
   (covers www, non-www, http and https).
   Alternative: a **URL prefix** property with the **HTML tag** method: copy
   only the `content` value into `PUBLIC_GSC_VERIFICATION` and redeploy.
3. Sitemaps > submit `sitemap-index.xml`.
4. URL Inspection > Request indexing for the home page and each hub.
5. Check weekly: Performance (queries and pages), Pages (indexing problems),
   Core Web Vitals.

## Bing Webmaster Tools (`PUBLIC_BING_VERIFICATION`)

ChatGPT search, Copilot and DuckDuckGo use Bing's index, so Bing matters
more than its own market share.

1. [bing.com/webmasters](https://www.bing.com/webmasters) > **Import from
   Google Search Console** (fastest: verifies and imports the sitemap), or
   add the site and use the meta tag method with `PUBLIC_BING_VERIFICATION`.
2. Submit the sitemap if it was not imported.

## IndexNow (`INDEXNOW_KEY`)

IndexNow tells Bing, Yandex, Naver, Seznam and Yep about new pages within
minutes, instead of waiting for a crawl.

1. `npm run indexnow:key` writes `public/<key>.txt` and prints the key.
2. Put the key in `.env` (`INDEXNOW_KEY=...`) and as a **GitHub repository
   secret** named `INDEXNOW_KEY` (Settings > Secrets and variables > Actions).
3. Commit and deploy, so `https://your-site/<key>.txt` is live.
4. The workflow `.github/workflows/indexnow.yml` then runs after every
   successful production deploy on Vercel (and daily), sending only URLs
   that are new in the sitemap. Run it by hand from the Actions tab, or
   locally: `npm run indexnow -- --dry-run`.
5. The first run can answer 403 while Bing verifies the key; it retries daily.
6. Bing Webmaster Tools > IndexNow shows what was received.

## Microsoft Clarity (`PUBLIC_CLARITY_ID`)

Free heatmaps and session recordings: see where people tap, scroll and give up.

1. [clarity.microsoft.com](https://clarity.microsoft.com) > New project > copy the project id.
2. Set `PUBLIC_CLARITY_ID` and redeploy.
3. Optional: Settings > Setup > Google Analytics integration.
4. Watch recordings of your most important page in the first week; fix
   what confuses people before you build more pages.
