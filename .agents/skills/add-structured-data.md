# Add Structured Data (JSON-LD)

Out of the box the site emits `WebSite` and `Organization` on the home page and `FAQPage` from the `FAQs` widget when it receives `schema` (currently off: the FAQ answers are placeholders). `src/components/common/Breadcrumbs.astro` can emit `BreadcrumbList` but is not used on the one-page site. `src/components/common/Metadata.astro` handles title, description, canonical, robots, Open Graph and Twitter through `astro-seo`. Anything else (e.g. `LodgingBusiness` for the apartment) is added as described below. Only describe facts that are true for the apartment.

## What the home page ships

`src/pages/index.astro` emits `WebSite` and `Organization` JSON-LD through the layout's `head` slot, built only from `src/config.yaml` (`site.name`, `site.site`, the X handle in `metadata.twitter`), so nothing there needs replacing. Extend the `structuredData` array in that file to add a description, a logo of your own, more `sameAs` profiles or contact data.

## Site-wide (Organization / WebSite)

The home page already emits `WebSite` (with an `Organization` publisher) from `site.name` and `site.site`. To add an `Organization` with logo, social profiles or contact data, extend the `structuredData` array in `src/pages/index.astro`; to emit something on every page, render `StructuredData` inside `src/layouts/Layout.astro` next to the `head` slot.

## Per page

`src/components/common/StructuredData.astro` takes a `schema` object (or an array of them) and prints it as JSON-LD. Pass it through the `head` slot that `Layout.astro` and `PageLayout.astro` expose:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import StructuredData from '~/components/common/StructuredData.astro';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Acme',
  url: 'https://acme.example',
  logo: 'https://acme.example/logo.png',
};
---

<Layout metadata={metadata}>
  <StructuredData slot="head" schema={schema} />
  …
</Layout>
```

JSON-LD is also valid anywhere in the body if a slot is not available (widgets like `FAQs` do that).

## Notes

- Always use `set:html` with `JSON.stringify`; never interpolate user content directly.
- Validate with https://validator.schema.org/ or Google's Rich Results Test.
- `astro-compress` minifies HTML but leaves `application/ld+json` scripts intact.
