// /llms.txt: a plain-text map of the site for AI assistants
// (https://llmstxt.org). Built from src/i18n/routes.ts, so it never goes stale.
import type { APIRoute } from 'astro';
import { SITE, SITE_URL } from '../config/site';
import { LOCALES } from '../i18n/config';
import { PAGES } from '../i18n/routes';

export const GET: APIRoute = () => {
  const lines = [`# ${SITE.name}`, '', `> Replace with one paragraph: what ${SITE.name} is, who it is for, and what makes it different.`, ''];
  for (const [key, langs] of Object.entries(PAGES)) {
    lines.push(`## ${key}`);
    for (const [lang, path] of Object.entries(langs)) lines.push(`- [${key} (${LOCALES[lang as keyof typeof LOCALES].label})](${SITE_URL}${path})`);
    lines.push('');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
