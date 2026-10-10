# SEO guidelines

The rules every page on a SiteSprout site follows. Most are already built
into the template (marked ✅); the rest are yours to do per page.

## 1. One page, one search intent

- Each page targets **one main keyword** and its close variants. Two pages for
  the same keyword compete with each other (keyword cannibalisation), so merge
  them instead.
- Pick the keyword before writing the page (see [SEMRUSH-RESEARCH.md](SEMRUSH-RESEARCH.md)).
- Match the intent Google already shows: if the top 10 are tools, build a
  tool; if they are lists, write a list. A wrong format does not rank.
- Tools, games, quizzes and calculators beat articles: an AI answer cannot
  replace something the visitor has to *use*.

## 2. URLs ✅

- Lowercase, words separated by hyphens, in the page's language:
  `/de/prozentrechner/`, not `/de/percentage-calculator/`.
- Always a trailing slash (`trailingSlash: 'always'` in astro.config.mjs and
  `vercel.json`). Never change URLs after launch; if you must, add a 301
  redirect in `vercel.json`.
- Short: the main keyword, nothing else. No dates, no ids.

## 3. Title and description

- **Title** (`<title>`): 50 to 60 characters, main keyword first, then a
  benefit. The layout adds ` | SiteName`. Example: `Percentage Calculator: Fast and Free`.
- **Description**: 140 to 160 characters, says what the visitor gets, contains
  the keyword once, ends with a reason to click. Unique on every page.
- `npm run check` flags titles over 65 and descriptions outside 70 to 165.

## 4. Page structure

- Exactly **one H1** that contains the main keyword (checked by `npm run check`).
- The tool or answer **above the fold**. Explanations go below it.
- Under the tool, a short guide in this order (this is what AI answers quote):
  1. **At a glance**: 40 to 60 words that answer the query directly.
  2. **How to use it**: 3 or 4 steps.
  3. **How it works**: the formula, the rules or the source.
  4. **FAQ**: 4 to 6 real questions people ask (take them from Semrush's
     "Questions" filter and Google's "People also ask").
- H2s for sections, H3s inside them. No skipped levels.
- Short paragraphs (3 sentences at most), plain words, real numbers.

## 5. Structured data (JSON-LD) ✅ partly

- Every page gets `WebPage` (built in). The home page adds `Organization`
  and `WebSite` (built in, `src/views/Home.astro`).
- Add per page through the `schema` prop of `BaseLayout`:
  - a tool or calculator: `WebApplication` (`applicationCategory`, `offers` with price 0);
  - a game or quiz: `VideoGame` or `Quiz`;
  - a FAQ section: `FAQPage` (only for questions visible on the page);
  - an article: `Article` with `author`, `datePublished`, `dateModified`;
  - breadcrumbs on deeper pages: `BreadcrumbList`.
- Never add fake ratings or reviews. Test pages with Google's
  [Rich Results Test](https://search.google.com/test/rich-results).

## 6. Languages ✅

- One URL per language, linked with `hreflang` (built in from
  `src/i18n/routes.ts`), plus `x-default` pointing to the default language.
- Translate slugs, titles, descriptions and headings, not only body text.
- Each language version must be complete and natural. A machine translation
  nobody checked is thin content; get a native speaker to proofread.
- Research keywords **per country**: the best keyword in Spanish is often not
  the translation of the English one. Details in [I18N.md](I18N.md).

## 7. Internal links

- Every page is reachable in 3 clicks from the home page.
- Link related pages to each other with descriptive anchor text
  ("percentage calculator", not "click here").
- The home page links to every hub; each hub links to its pages; each page
  links back to its hub and to 3 to 6 related pages.
- `npm run check` flags broken internal links and links missing the trailing slash.

## 8. Technical ✅

- Static HTML (Astro), so pages load fast and every crawler sees the content.
- Canonical on every page, built from the clean URL (no query strings).
- `sitemap-index.xml` (with language alternates) and `robots.txt` generated
  on build. `/llms.txt` lists every page for AI assistants.
- Pages you do not want in Google (thank-you pages, test pages): pass
  `noindex` to the layout **and** add them to the sitemap `filter` in
  astro.config.mjs, so the sitemap never lists a noindex page.
- Core Web Vitals: keep images sized (`width` and `height`), lazy-load
  images below the fold, avoid heavy JavaScript on content pages. Test with
  [PageSpeed Insights](https://pagespeed.web.dev/).

## 9. Trust (E-E-A-T)

Google, AdSense reviewers and AI assistants look for a real, accountable site:

- An **About** page with a real name, city and why the site exists.
- A **Contact** page with a working email. In Germany and Austria also an
  Impressum with a postal address.
- A **Privacy** page that matches what the site really does.
- Sources named on pages that state facts. A "last reviewed" date on pages
  that change (exam rules, prices, laws).

## 10. After launch

- Submit the sitemap in Google Search Console and Bing Webmaster Tools
  ([ANALYTICS-AND-INDEXING.md](ANALYTICS-AND-INDEXING.md)).
- IndexNow pings Bing on every deploy (built in, needs the key).
- Weekly: Search Console > Performance > Queries. Pages ranking 8 to 20 are
  the fastest wins: improve their title, intro and FAQ.
- Monthly: check Pages > "Crawled, currently not indexed". Those pages are
  too thin or too similar to others: merge or improve them.
- Never: buy links, publish many near-identical pages (one per city with the
  same text), or hide text. These get sites penalised.

## Pre-publish checklist for every new page

- [ ] Main keyword chosen, KD checked, intent matches the top 10
- [ ] Slug in the page's language, trailing slash, added to `src/i18n/routes.ts`
- [ ] Title 50 to 60 characters, description 140 to 160, both unique
- [ ] One H1 with the keyword; tool or answer above the fold
- [ ] At a glance, how to use, how it works, FAQ
- [ ] Schema added (`WebApplication`, `FAQPage`...)
- [ ] 3 to 6 internal links in, 3 to 6 out
- [ ] `npm run build && npm run check` passes
