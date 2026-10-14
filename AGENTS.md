# Agent Instructions

## Project Overview

One-page website for an apartment for rent in the Zlín region, built on the AstroWind template with **Astro v7** and **Tailwind CSS v4**. Fully static, light mode only, Czech UI (`i18n.language: cs`). Everything lives on `src/pages/index.astro` as sections linked by `#anchors`; the only other pages are `/privacy`, `/terms` and `404`. Hosted on Cloudflare Workers (static assets). Bookings will go through Google Calendar (not implemented yet).

User-facing text is Czech. Placeholders are marked `[doplnit]` in page copy and `TODO` in config. The site is intentionally `noindex` until launch (see README "Before launch").

**Stack:** Astro v7 | Tailwind CSS v4 | TypeScript 5.9 | MDX | Sharp

## Skills

Before implementing a project-specific task (editing sections, widgets, Open Graph images, structured data, header customisation, styling, deployment…), check `.agents/skills/` for an existing skill and follow it.

## Quick Reference

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server at localhost:4321  |
| `npm run build`   | Production build to `./dist/`       |
| `npm run preview` | Preview production build locally    |
| `npm run check`   | Run astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier issues   |

**Node.js requirement:** >= 22.22.3

## Architecture

### Directory Structure

```
src/
  assets/styles/tailwind.css   # Tailwind v4 config (themes, utilities, plugins)
  components/
    common/        # Shared: Image, Metadata, Analytics, ToggleMenu
    ui/            # Primitives: Button, Form, Headline, Timeline, WidgetWrapper
    widgets/       # Page sections: Hero, Features, Bento, Pricing, Comparison, FAQs, Team, Gallery…
    CustomStyles.astro  # CSS variables for colors and fonts
  layouts/             # Layout.astro, PageLayout.astro, MarkdownLayout.astro
  pages/               # index.astro (one-page site, sections linked by #anchors), privacy.md, terms.md, 404.astro
  utils/               # images.ts, permalinks.ts, frontmatter.ts, utils.ts
  config.yaml          # Site configuration (loaded as virtual module)
  navigation.ts        # Navigation structure
  types.d.ts           # TypeScript type definitions
vendor/integration/    # Custom Astro integration for config loading
```

### Path Aliases

Use `~/` to import from `src/`:

```typescript
import Image from '~/components/common/Image.astro';
import { SITE } from 'astrowind:config';
```

### Configuration System

Site config lives in `src/config.yaml` and is loaded as a Vite virtual module `astrowind:config` by the custom integration in `vendor/integration/`. Exports: `SITE`, `I18N`, `METADATA`, `ANALYTICS`.

## Tailwind CSS v4

Configuration is CSS-first in `src/assets/styles/tailwind.css`:

- **Theme tokens:** `@theme { --color-primary: var(--aw-color-primary); ... }`
- **Custom utilities:** `@utility bg-page { ... }`
- **Light mode only:** there is no dark mode, no theme switch and no `dark:` variant. Do not add `dark:` classes.
- **Plugins:** `@plugin "@tailwindcss/typography"`
- **Custom variant:** `@custom-variant intersect (&:not([no-intersect]))`
- **Sources:** `@source not` excludes `.agents/`, `README.md` and `AGENTS.md`, so class names in doc examples are not generated.

CSS variables for colors/fonts are defined in `src/components/CustomStyles.astro` (a single `:root` light palette).

The Vite plugin `@tailwindcss/vite` is configured in `astro.config.ts` (not as an Astro integration).

### Class Merging

Components use `twMerge` from `tailwind-merge` v3 for conditional class composition.

## Hosting

Cloudflare Workers static assets: `wrangler.jsonc` serves `dist/` (`npm run build && npx wrangler deploy`). No adapter; the site is fully static. `public/_headers` sets cache headers for `/_astro/*`. There is no blog and no content collection.

## Component Patterns

- Props extend interfaces from `~/types`
- Use `class:list` for conditional classes
- Use `twMerge()` when accepting className overrides
- Use named slots for layout composition
- Widget components accept standardized props (see `~/types`)

## Image Handling

`src/components/common/Image.astro` supports:

- Local images via `astro:assets` (optimized by Sharp)
- Remote images via Unpic CDN
- Allowed domains (for providers Unpic can't detect, processed by Sharp): `cdn.pixabay.com`

Hero images use `loading="eager"` and `fetchpriority="high"`.

## Fonts

Fonts are handled by Astro's native **Fonts API**, configured in `astro.config.ts` under the `fonts` key (provider, family, `cssVariable`) and injected via the `<Font />` component in `src/layouts/Layout.astro`. Astro self-hosts, subsets, preloads, and generates metric-adjusted fallbacks. To change the typeface, edit the `fonts` entry and point `--aw-font-*` in `CustomStyles.astro` at the new `cssVariable`.

## Third-party Scripts (Partytown)

`@astrojs/partytown` is wired as an **opt-in** in `astro.config.ts`, gated behind `const hasExternalScripts = false`. Set it to `true` to offload third-party scripts (e.g. Google Analytics via `analytics.vendors.googleAnalytics.partytown`) to a web worker. It is disabled by default so the base template ships no external scripts.

## Content Security Policy

Astro's native CSP is intentionally **not** enabled in this version: it is incompatible with `<ClientRouter />` view transitions (shipped on by default) and would break the arbitrary third-party scripts a template user typically adds. CSP is deferred to AstroWind v2, where the component model (and optional SSR) make it clean and opt-in.

## Verification Checklist

After changes, always verify:

1. `npm run build` succeeds
2. `npm run check` passes (astro check + ESLint + Prettier)
3. Visual check in browser: homepage, mobile menu
4. Structured data describes the site it is on: the `WebSite` / `Organization` block in `src/pages/index.astro` is built only from `config.yaml`; anything you add there must be true for your site
