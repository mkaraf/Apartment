# NÁZEV APARTMÁNU – website

One-page website for an apartment for rent in the Zlín region (Czech). Built with [Astro v7](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/), starting from the [AstroWind](https://github.com/arthelokyo/astrowind) template.

- Fully static, light mode only, Czech UI (`lang="cs"`).
- One page (`src/pages/index.astro`) with sections linked by anchors (`#kontakt`, …), plus `/privacy` and `/terms`.
- Hosted on Cloudflare Workers (static assets).
- Bookings will go through Google Calendar (not implemented yet).
- Not indexed by search engines until launch (see [Before launch](#before-launch)).

## Requirements

Node.js 22.22.3 or newer (`.nvmrc`).

## Commands

| Command                                | Action                                              |
| :------------------------------------- | :-------------------------------------------------- |
| `npm install`                          | Install dependencies                                |
| `npm run dev`                          | Start the dev server at `localhost:4321`            |
| `npm run build`                        | Build the site to `./dist/`                         |
| `npm run preview`                      | Preview the build locally                           |
| `npm run check`                        | `astro check` + ESLint + Prettier                   |
| `npm run fix`                          | Fix ESLint and Prettier issues                      |
| `npm run build && npx wrangler deploy` | Deploy to Cloudflare (first run asks you to log in) |

## Project structure

```
/
├── .agents/skills/        # Step-by-step guides for AI coding assistants
├── AGENTS.md              # Project conventions (read by AI coding assistants)
├── public/
│   ├── _headers           # Cloudflare headers (cache, temporary noindex)
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/      # Placeholder favicons (replace with real ones)
│   │   ├── images/        # Local images (optimized at build)
│   │   └── styles/        # tailwind.css, shadcn.css
│   ├── components/
│   │   ├── common/        # Metadata, Image, StructuredData, …
│   │   ├── ui/            # Button, Form, Headline, WidgetWrapper, …
│   │   ├── widgets/       # Page sections: Hero, Features, Content, FAQs, Pricing, …
│   │   ├── CustomStyles.astro  # Colours and fonts
│   │   ├── Favicons.astro
│   │   └── Logo.astro
│   ├── layouts/           # Layout, PageLayout, MarkdownLayout
│   ├── pages/             # index.astro, privacy.md, terms.md, 404.astro
│   ├── utils/
│   ├── config.yaml        # Site name, domain, SEO defaults, language
│   └── navigation.ts      # Header and footer links
├── vendor/integration/    # Loads config.yaml as the `astrowind:config` module
├── astro.config.ts
└── wrangler.jsonc         # Cloudflare Workers config
```

## Configuration

- **Site name, domain, SEO defaults, language:** `src/config.yaml` (values marked `TODO` are placeholders).
- **Header and footer links:** `src/navigation.ts`.
- **Colours and font:** `src/components/CustomStyles.astro`; Tailwind tokens and utilities in `src/assets/styles/tailwind.css`; font in the `fonts` entry of `astro.config.ts`.
- **Logo:** `src/components/Logo.astro` (text from `site.name`; see the comment there to switch to an SVG).

## Before launch

- Replace the placeholders marked `TODO` / `[doplnit]` (name, domain, texts, contact details).
- Replace the favicons in `src/assets/favicons/` and the sharing image `src/assets/images/og-placeholder.png`.
- Replace `src/pages/privacy.md` and `src/pages/terms.md` with real Czech texts.
- Allow search engines: set `metadata.robots.index` and `follow` to `true` in `src/config.yaml` and remove the `X-Robots-Tag` block from `public/_headers`.

## Credits and license

Based on [AstroWind](https://github.com/arthelokyo/astrowind) by [Arthelokyo](https://arthelokyo.com), licensed under the MIT license. The template's copyright notice is kept in [LICENSE.md](./LICENSE.md), as the MIT license requires.
