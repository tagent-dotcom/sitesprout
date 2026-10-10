// robots.txt, built from the site address so the sitemap link is always right.
// Every crawler is welcome, AI ones included: being cited by ChatGPT,
// Perplexity and Google's AI answers needs them to read the site.
import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/site';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
