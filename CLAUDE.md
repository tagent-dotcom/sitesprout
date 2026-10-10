# Notes for AI assistants working on this repo

- Read README.md, IDEA.md and docs/SEO-GUIDELINES.md before adding pages.
- Every page: a row in src/i18n/routes.ts, a view in src/views/, a page file
  per language. Never hardcode another language's URL; use pathFor().
- Run `npm run build && npm run check` before committing; it must pass.
- Third-party ids come only from environment variables (.env.example).
- URLs: lowercase, hyphens, trailing slash, slugs in the page's language.
