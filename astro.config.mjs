// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/site.ts';
import { DEFAULT_LOCALE, LOCALE_CODES, LOCALES } from './src/i18n/config.ts';
import { PAGES } from './src/i18n/routes.ts';

// Each page's translations, from the one table in src/i18n/routes.ts, so the
// sitemap lists hreflang alternates even when slugs differ by language.
const ALTERNATES = new Map();
for (const langs of Object.values(PAGES)) {
  const links = Object.entries(langs).map(([code, path]) => ({ lang: LOCALES[code].htmlLang, url: new URL(path, SITE_URL).href }));
  for (const link of links) ALTERNATES.set(link.url, links);
}

export default defineConfig({
  site: SITE_URL,
  // One URL per page, always with a trailing slash. Never change this after
  // launch: it would split every page into two URLs in Google's eyes.
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: [...LOCALE_CODES],
    defaultLocale: DEFAULT_LOCALE,
    // The default language lives at the root (/about/), the others under a
    // folder (/de/ueber-uns/).
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Pages with noindex never belong in the sitemap.
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const links = ALTERNATES.get(item.url);
        if (links && links.length > 1) item.links = links;
        return item;
      },
    }),
  ],
});
