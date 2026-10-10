/**
 * Everything about the site in one place. Change these before launch.
 * The rest of the template reads from here, so a new site is mostly this
 * file, the copy in src/i18n/ui.ts and your pages.
 */

/** The live address, no trailing slash. Must match Search Console exactly (www or not). */
export const SITE_URL = 'https://www.example.com';

export const SITE = {
  name: 'SiteSprout',
  /** Shown after the page title: "Page title | SiteSprout". Keep it short. */
  titleSuffix: 'SiteSprout',
  /** The person or company behind the site. Google and AdSense look for this. */
  owner: {
    name: 'Your Name',
    url: 'https://www.example.com/about/',
    email: 'hello@example.com',
    city: 'Your City',
    country: 'Your Country',
  },
  /** Profiles that belong to the site, for the Organization schema. */
  sameAs: [] as string[],
  /** Default share image in /public, 1200 x 630 px. */
  ogImage: '/og-default.png',
  themeColor: '#1f7a4d',
  /** Year the site started, for the footer and the About page. */
  since: 2026,
} as const;

/**
 * Third-party ids come from environment variables (see .env.example), so the
 * template never ships someone else's ids and every service can be switched
 * off by leaving its variable empty.
 */
export const IDS = {
  ga: import.meta.env.PUBLIC_GA_ID ?? '',
  clarity: import.meta.env.PUBLIC_CLARITY_ID ?? '',
  gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
  bingVerification: import.meta.env.PUBLIC_BING_VERIFICATION ?? '',
  whopPlan: import.meta.env.PUBLIC_WHOP_PLAN_ID ?? '',
};
