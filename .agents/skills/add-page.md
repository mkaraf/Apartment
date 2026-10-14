# Add a Page

This is a one-page site: new content normally becomes a section of `src/pages/index.astro` (see `edit-one-page-site.md`). Add a separate page only for standalone content such as legal texts. Markdown pages (`privacy.md`, `terms.md`) use `MarkdownLayout` through their `layout` frontmatter.

## Steps

1. Create a new `.astro` file in `src/pages/`
2. Use `PageLayout` for standard pages or `Layout` for custom layouts
3. Compose the page using widget components from `src/components/widgets/`

## Template

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features from '~/components/widgets/Features.astro';

const metadata = {
  title: 'Název stránky',
  description: 'Popis stránky pro vyhledávače',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Volitelný štítek"
    title="Nadpis stránky"
    subtitle="Doplňující text"
    image={{
      src: '~/assets/images/hero-image.png',
      alt: 'Popis obrázku',
    }}
  />

  <Features
    title="Nadpis sekce"
    items={[
      { title: 'Položka 1', description: 'Popis', icon: 'tabler:star' },
      { title: 'Položka 2', description: 'Popis', icon: 'tabler:bed' },
    ]}
  />
</Layout>
```

## Available Widget Components

Hero, Features, Content, Steps, Testimonials, FAQs, Stats, Pricing, Gallery, CallToAction, Contact… (full list in `use-widgets.md`)

## Notes

- Pages in `src/pages/` are automatically routed by filename
- Use `PageLayout` (includes Header + Footer) or `Layout` (bare)
- All widgets accept an `id` prop for anchor links
- Icons use the `tabler:icon-name` format from `@iconify-json/tabler`
