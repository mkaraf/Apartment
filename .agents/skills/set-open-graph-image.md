# Set the Open Graph / Social Share Image

Controls the image shown when a page is shared on social networks (`og:image`, Twitter card).

## Site-wide default

`src/config.yaml` → `metadata.openGraph.images`:

```yaml
metadata:
  openGraph:
    images:
      - url: '~/assets/images/og-placeholder.png' # placeholder; replace with a photo of the apartment
        width: 1200
        height: 628
```

## Per page (`.astro`)

Pass `openGraph.images` in the page `metadata`:

```astro
---
import Layout from '~/layouts/PageLayout.astro';

const metadata = {
  title: 'Obchodní podmínky',
  description: 'Podmínky ubytování',
  openGraph: {
    images: [{ url: '~/assets/images/og-terms.png', width: 1200, height: 628 }],
  },
};
---

<Layout metadata={metadata}>…</Layout>
```

Markdown pages (`privacy.md`, `terms.md`) can set the same `metadata.openGraph.images` in their frontmatter.

## Accepted `url` values

| Value                        | Behaviour                                                             |
| ---------------------------- | --------------------------------------------------------------------- |
| `~/assets/images/…`          | Resolved via `import.meta.glob`, optimised to a 1200×626 JPG at build |
| `/images/…` (from `public/`) | Used as-is, made absolute with `site.site`                            |
| `https://…`                  | Used as-is                                                            |

## Where it is implemented

- Types: `MetaData`, `MetaDataOpenGraph`, `MetaDataImage` in `src/types.d.ts`.
- Merging and rendering: `src/components/common/Metadata.astro` (uses `astro-seo`).
- Image resolution and optimisation: `adaptOpenGraphImages()` and `findImage()` in `src/utils/images.ts`.

## Notes

- Always set `site.site` in `src/config.yaml`; OG image URLs must be absolute.
- Recommended size 1200×630 (the optimiser outputs 1200×626). Keep it under ~300 KB.
- Twitter card type comes from `metadata.twitter.cardType` (`summary_large_image` by default).
