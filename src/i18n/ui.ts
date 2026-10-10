/**
 * Interface words in every language. Pages keep their own long copy; this
 * file is for words that repeat (navigation, footer, buttons, labels).
 * Keep the keys identical in every language: TypeScript flags a missing one.
 */
import { DEFAULT_LOCALE, type Locale } from './config';

const en = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.pricing': 'Pricing',
  'footer.privacy': 'Privacy',
  'footer.madeBy': 'Made by',
  'lang.label': 'Language',
  'skip': 'Skip to content',
  'home.title': 'Your site, ready to grow',
  'home.description': 'A fast, multilingual website starter with SEO, analytics, IndexNow and Whop payments already set up. Replace this with what your site offers.',
  'home.lead': 'Replace this text with what your site does in one clear sentence, and the main keyword people search for.',
  'home.cta': 'Get started',
  'about.title': 'About',
  'about.description': 'Who makes this site and why, how the content is researched and checked, and where every fact comes from. Meet the person behind it.',
  'contact.title': 'Contact',
  'contact.description': 'How to reach the people behind this site: email for questions, corrections and partnerships, with an answer within two working days.',
  'privacy.title': 'Privacy policy',
  'privacy.description': 'What this site collects and why, which services process it (analytics, payments, ads), how long it is kept and the choices you have.',
  'pricing.title': 'Pricing',
  'pricing.description': 'Everything on the site is free to use. An optional paid plan unlocks extra features, paid securely through Whop and cancellable anytime.',
  'pricing.cta': 'Unlock with Whop',
  'pricing.secure': 'Secure checkout by Whop. Cancel anytime.',
  'notFound.title': 'Page not found',
  'notFound.text': 'This page does not exist. Try the home page.',
};

type Dict = Record<keyof typeof en, string>;

const de: Dict = {
  'nav.home': 'Start',
  'nav.about': 'Über uns',
  'nav.contact': 'Kontakt',
  'nav.pricing': 'Preise',
  'footer.privacy': 'Datenschutz',
  'footer.madeBy': 'Gemacht von',
  'lang.label': 'Sprache',
  'skip': 'Zum Inhalt springen',
  'home.title': 'Deine Website, bereit zu wachsen',
  'home.description': 'Ein schnelles, mehrsprachiges Website-Grundgerüst mit SEO, Analytics, IndexNow und Whop-Zahlungen. Ersetze das durch dein Angebot.',
  'home.lead': 'Ersetze diesen Text durch einen klaren Satz, was deine Website tut, mit dem wichtigsten Suchbegriff.',
  'home.cta': 'Loslegen',
  'about.title': 'Über uns',
  'about.description': 'Wer diese Website macht und warum, wie die Inhalte recherchiert und geprüft werden und woher jede Angabe stammt. Lerne die Person dahinter kennen.',
  'contact.title': 'Kontakt',
  'contact.description': 'So erreichst du die Menschen hinter dieser Website: per E-Mail für Fragen, Korrekturen und Kooperationen, Antwort innerhalb von zwei Werktagen.',
  'privacy.title': 'Datenschutzerklärung',
  'privacy.description': 'Welche Daten diese Website erhebt und warum, welche Dienste sie verarbeiten (Analyse, Zahlungen, Werbung) und welche Wahl du hast.',
  'pricing.title': 'Preise',
  'pricing.description': 'Alles auf der Website ist kostenlos. Ein optionaler Bezahlplan schaltet Extras frei, sicher bezahlt über Whop und jederzeit kündbar.',
  'pricing.cta': 'Mit Whop freischalten',
  'pricing.secure': 'Sichere Zahlung über Whop. Jederzeit kündbar.',
  'notFound.title': 'Seite nicht gefunden',
  'notFound.text': 'Diese Seite gibt es nicht. Versuch es mit der Startseite.',
};

const UI: Record<Locale, Dict> = { en, de };

/** t('nav.home') in the page's language, falling back to the default language. */
export function useTranslations(lang: Locale) {
  return (key: keyof Dict) => UI[lang]?.[key] ?? UI[DEFAULT_LOCALE][key];
}
