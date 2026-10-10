/**
 * The languages the site speaks. To add one:
 *   1. add it here,
 *   2. add its strings in src/i18n/ui.ts,
 *   3. add its URL for every page in src/i18n/routes.ts,
 *   4. create its pages under src/pages/<code>/.
 * See docs/I18N.md.
 */
export const DEFAULT_LOCALE = 'en';

export const LOCALES = {
  en: { label: 'English', flag: '🇬🇧', htmlLang: 'en', ogLocale: 'en_US', dir: 'ltr' },
  de: { label: 'Deutsch', flag: '🇩🇪', htmlLang: 'de', ogLocale: 'de_DE', dir: 'ltr' },
} as const;

export type Locale = keyof typeof LOCALES;
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && value in LOCALES;
