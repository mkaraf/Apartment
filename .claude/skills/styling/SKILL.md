---
name: styling
description: Tailwind v4 tokens, colours, utilities, animations and the light-only theme. Use for any visual/styling change, colour palette or CustomStyles.astro edit.
---

# Styling Guide

## Tailwind CSS v4 Configuration

All Tailwind config is in `src/assets/styles/tailwind.css`:

### Theme Tokens

Defined in `@theme` block, mapped to CSS variables from `CustomStyles.astro`:

| Token               | CSS Variable                              | Usage                            |
| ------------------- | ----------------------------------------- | -------------------------------- |
| `--color-primary`   | `--aw-color-primary`                      | `bg-primary`, `text-primary`     |
| `--color-secondary` | `--aw-color-secondary`                    | `bg-secondary`, `text-secondary` |
| `--color-accent`    | `--aw-color-accent`                       | `bg-accent`, `text-accent`       |
| `--color-heading`   | `--aw-color-text-heading`                 | `text-heading` (titles, hero h1) |
| `--color-default`   | `--aw-color-text-default`                 | `text-default`                   |
| `--color-muted`     | `--aw-color-text-muted`                   | `text-muted`                     |
| `--color-link`      | `--aw-color-link` (falls back to primary) | `text-link`, active header link  |

### Custom Utilities

| Utility         | Purpose                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| `bg-page`       | Page background color                                                           |
| `text-page`     | Legacy; `--aw-color-text-page` is not defined, so it inherits the parent colour |
| `btn`           | Base button styles                                                              |
| `btn-primary`   | Primary CTA button                                                              |
| `btn-secondary` | Secondary button                                                                |
| `btn-tertiary`  | Text-style button                                                               |

### Light Mode Only

The site has no dark mode: there is no theme switch, no `.dark` class and no `dark:` variant (Tailwind's default `dark:` would follow the visitor's OS setting, so do not add `dark:` classes). Prefer the tokens above over hard-coded colours so `CustomStyles.astro` stays the single place to re-theme.

`tailwind.css` excludes `.claude/`, `README.md` and `AGENTS.md` from class scanning (`@source not …`), so class names in doc examples never end up in the CSS.

### Scroll Animations

Custom `intersect` variant for IntersectionObserver animations:

```html
<div class="intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade"></div>
```

## shadcn/ui Tokens

`src/assets/styles/shadcn.css` (imported by `tailwind.css`) defines the semantic variables shadcn/ui components expect and maps them to Tailwind utilities:

| shadcn utility                                                                   | Backed by                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------- |
| `bg-background`, `text-foreground`                                               | `--aw-color-bg-page`, `--aw-color-text-default` |
| `bg-card`, `bg-popover` (+ `-foreground`)                                        | page background / default text                  |
| `text-muted-foreground`                                                          | `--aw-color-text-muted`                         |
| `border-border`, `border-input`, `ring-ring`                                     | 15 % mix of text over background / primary      |
| `bg-destructive`, `text-destructive-foreground`                                  | fixed red / white                               |
| `text-primary-foreground`, `text-secondary-foreground`, `text-accent-foreground` | white                                           |
| `bg-chart-1..5`, `bg-sidebar*`                                                   | derived from primary / secondary / accent       |

Differences from a stock shadcn theme (kept on purpose): `bg-primary`, `bg-secondary`, `bg-accent` are the site's brand colours (warm yellow, deeper yellow, cream) (shadcn uses `secondary`/`accent` as subtle surfaces), `text-muted` is a text colour and `bg-muted` is **not** defined as a surface, and the `rounded-*` scale is Tailwind's default (shadcn's `--radius` is defined but not mapped). See the `use-shadcn-tokens` skill.

## Changing Colors

Yellow (sunflower, `primary`) is a detail colour: never use `text-primary` for text on the paper background; use `text-link`/`text-ochre` (clay), `text-heading` or `text-default`. On photos and dark `bg-umber` sections use `text-cream` and the `btn-light` button; elsewhere `btn-primary` (umber box, cream text).

Edit `src/components/CustomStyles.astro`:

```css
:root {
  --aw-color-primary: rgb(245 197 24); /* #F5C518 sunflower, detail only */
  --aw-color-accent: rgb(242 232 214); /* #F2E8D6 cream surface */
  --aw-color-ochre: rgb(138 83 40); /* #8A5328 clay, accent text */
  --aw-color-concrete: rgb(228 216 196); /* #E4D8C4 sand */
  --aw-color-cream: rgb(250 238 214); /* #FAEED6 text on photos / umber */
  --aw-color-umber: rgb(52 36 24); /* #342418 dark sections, buttons */
  --aw-color-text-heading: rgb(43 30 20);
  --aw-color-bg-page: rgb(251 246 236); /* #FBF6EC paper */
}
```

Tailwind v4 resolves `@theme` tokens on `:root`, so to recolour a subtree (like the header over the hero) override the `--color-*` tokens there as well, not only `--aw-color-*`.

There is only the `:root` palette; there is no `.dark` block.

## Changing Fonts

Fonts use Astro's native Fonts API (no `@fontsource` packages):

1. In `astro.config.ts`, edit the `fonts` array (provider, `name`, `cssVariable`, weights, subsets). Example: `fontProviders.google()` with `name: 'Poppins'` and `cssVariable: '--font-poppins'`.
2. In `src/layouts/Layout.astro`, update `<Font cssVariable="--font-poppins" preload />`.
3. In `src/components/CustomStyles.astro`, point `--aw-font-sans`, `--aw-font-serif` and `--aw-font-heading` at the new variable.

## Adding a New Theme Color

1. Add the CSS variable in `CustomStyles.astro` under `:root`
2. Register in `tailwind.css` under `@theme`: `--color-yourcolor: var(--aw-color-yourcolor);`
3. Use as `bg-yourcolor`, `text-yourcolor`, etc.
