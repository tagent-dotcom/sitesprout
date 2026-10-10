/**
 * Every page, with its URL in every language. This one table drives the
 * language switcher, the hreflang tags, the sitemap alternates and
 * llms.txt, so a translated page is always linked to its twins.
 *
 * Localise slugs: people search in their own language, and a German slug
 * (/de/ueber-uns/) ranks better in Germany than /de/about/.
 * A language a page does not exist in yet: leave it out, and the switcher
 * sends that language to its home page instead of a 404.
 */
import type { Locale } from './config';

export const PAGES = {
  home: { en: '/', de: '/de/' },
  about: { en: '/about/', de: '/de/ueber-uns/' },
  contact: { en: '/contact/', de: '/de/kontakt/' },
  privacy: { en: '/privacy/', de: '/de/datenschutz/' },
  pricing: { en: '/pricing/', de: '/de/preise/' },
} satisfies Record<string, Partial<Record<Locale, string>>>;

export type PageKey = keyof typeof PAGES;

/** The URL of a page in a language, or that language's home if it has no version. */
export function pathFor(page: PageKey, lang: Locale): string {
  return (PAGES[page] as Partial<Record<Locale, string>>)[lang] ?? (PAGES.home as Record<Locale, string>)[lang];
}

/** The languages a page really exists in, with their URLs (for hreflang). */
export function alternatesFor(page: PageKey): { lang: Locale; path: string }[] {
  return Object.entries(PAGES[page]).map(([lang, path]) => ({ lang: lang as Locale, path: path as string }));
}
