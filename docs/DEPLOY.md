# Git and deploy (GitHub + Vercel)

## First time

```bash
git init && git add -A && git commit -m "Start from SiteSprout"
gh repo create your-site --private --source . --push
```

Then on [vercel.com](https://vercel.com): Add New > Project > import the
repository. Framework preset **Astro**, build command `npm run build`,
output `dist`. Add the environment variables from `.env.example`.

Add your domain (Settings > Domains). Pick **one** version, `www` or not,
redirect the other to it, and use the same one in `SITE_URL`
(`src/config/site.ts`) and in Search Console.

## Every change

```bash
npm run build && npm run check   # build and SEO check
git add <files> && git commit -m "What changed and why"
git push                          # Vercel deploys main automatically
```

Every push to `main` deploys to production; pushes to other branches get a
preview URL. After a production deploy, the IndexNow workflow pings Bing.

## Habits that save trouble

- Small commits with clear messages; one change per commit.
- Run `npm run check` before pushing.
- Never commit `.env` or secrets (already in `.gitignore`).
- If `git push` over SSH hangs, push over HTTPS with the GitHub CLI's
  credential helper:
  `git -c credential.helper= -c credential.helper='!gh auth git-credential' push https://github.com/<you>/<repo>.git main`
