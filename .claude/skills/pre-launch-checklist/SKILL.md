---
name: pre-launch-checklist
description: Check what is still missing before the apartment site goes live (placeholders, TODOs, legal texts, indexing, domain, OG image, favicons) and prepare the launch switch. Use when asked about launch readiness, "co ještě chybí", go-live or turning on indexing.
---

# Pre-launch Checklist

The site is intentionally `noindex` and full of placeholders until launch. This skill finds what is left and, only when the user confirms, flips the site to public.

## 1. Report what is missing (read-only)

Run and summarise the results grouped by file (short list, Czech):

```bash
grep -rn "\[doplnit\]" src/
grep -rn "TODO" src/ public/ wrangler.jsonc
grep -rn "NÁZEV APARTMÁNU\|moje-domena.cz\|+420 000 000 000\|Ulice 123" src/
grep -n "Demo content" src/pages/privacy.md src/pages/terms.md
```

Also check:

| Item                | Where                                                         | Done when                                                   |
| ------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Apartment name      | `site.name`, `metadata.title`, `openGraph.site_name`          | No `NÁZEV APARTMÁNU`                                        |
| Domain              | `site.site` in `src/config.yaml`, custom domain in Cloudflare | Real `https://` domain                                      |
| Worker name         | `wrangler.jsonc` `name`                                       | No `TODO`                                                   |
| Legal texts         | `src/pages/privacy.md`, `src/pages/terms.md`                  | Real Czech texts (GDPR, ubytovací podmínky)                 |
| Sharing image       | `src/assets/images/og-placeholder.png`                        | Replaced by a 1200×630 photo (`set-open-graph-image` skill) |
| Favicons            | `src/assets/favicons/`                                        | Own icons                                                   |
| FAQ structured data | `FAQs` in `index.astro`                                       | `schema` prop added once answers are real                   |
| Booking             | `#rezervace` section                                          | Real booking flow (Google Calendar) works                   |
| Contact details     | `#kontakt`, `#lokalita`                                       | Real phone, e-mail, address                                 |

## 2. Go live (only after explicit confirmation)

1. `src/config.yaml`: `metadata.robots.index: true`, `follow: true`; remove the TODO comment.
2. `public/_headers`: remove the `/*` `X-Robots-Tag` block and its TODO comment. Keep the `/_astro/*` cache rule.
3. `npm run build && npm run check`.
4. Check `dist/index.html` has no `noindex` and `dist/sitemap-index.xml` uses the real domain.
5. Deploy (`deploy-cloudflare` skill), then suggest submitting the sitemap in Google Search Console (`googleSiteVerificationId`).

Never flip indexing while placeholders from step 1 remain unless the user explicitly says so.
