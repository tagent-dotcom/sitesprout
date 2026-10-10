# Research data

The raw keyword research behind [../IDEA.md](../IDEA.md). Fill these CSVs
while you research ([../docs/SEMRUSH-RESEARCH.md](../docs/SEMRUSH-RESEARCH.md)),
then summarise them in IDEA.md. Keep the raw data: IDEA.md only holds the
highlights, and the full lists are what you plan pages from later.

Name each file with the country code when you research more than one market
(`keywords-tr.csv`, `keywords-de.csv`). Write the Semrush database and the
date at the top of this README.

| File | One row per | Columns | Where it comes from |
| --- | --- | --- | --- |
| `first-pass-bulk.csv` | keyword checked in the first quick pass | keyword, monthly_searches, kd, cpc_usd, source | Keyword Overview > Bulk Analysis (100 keywords per run) |
| `seeds.csv` | seed term | seed, keywords, monthly_searches, avg_kd | Keyword Magic Tool totals at the top of each search |
| `keywords.csv` | keyword | keyword, monthly_searches, kd, cpc_usd, tool_group, old_year, seed, trend_m1 to trend_m12 | Keyword Magic Tool export for each seed; `tool_group` = your cluster or "not used"; `old_year` = yes if it names a past year |
| `serp.csv` | result in the top 10 | keyword, position, domain, url, page_authority_score, referring_domains, page_traffic, page_keywords | Keyword Overview > SERP analysis for your 20 to 50 key keywords |
| `competitors.csv` | competing domain | domain, visits_now, keywords, authority_score, referring_domains, backlinks, visits_12_months_ago, top_keywords | Domain Overview and Organic Research |

Example of a finished set: the Turkish tools research (7,228 keywords,
520 SERP rows, 18 competitors).

Tips:

- Keep the keywords you leave out, marked "not used" in `tool_group`, so you
  can see later why the totals are what they are.
- Mark keywords that name an old year (`2024`, `2025`): Semrush still shows
  their volume, but nobody searches them any more. Leave them out of totals.
- Trend columns are Semrush's 12-month trend (100 = that keyword's peak
  month). Note which month `trend_m1` is.
