# Edit the One-Page Site

The whole site is `src/pages/index.astro`: a sequence of widget sections, each with an `id` used as an anchor (`#kontakt`, …). Other pages are only `/privacy`, `/terms` and `404`.

## Steps

1. Add, remove or reorder sections in `src/pages/index.astro`. See `use-widgets.md` for the catalogue and props.
2. Give every section a Czech, lowercase, ASCII `id` without diacritics (`cenik`, `vybaveni`, `kontakt`, `okoli`) so buttons and the header can link to it.
3. Link to sections with plain anchors: `href: '#kontakt'` in widget actions, and `{ text: 'Kontakt', href: getPermalink('/#kontakt') }` in `src/navigation.ts`. In the header use `/#…` (not `#…`) so the links also work from `/privacy` and `/terms`.
4. Keep one `<h1>` (the hero); widgets render `<h2>`/`<h3>`.
5. Write user-facing text in Czech. Mark unfinished copy with `[doplnit]` so it is easy to find.
6. Point every button at a real destination (an anchor or a page). No `href="#"`.
7. Run `npm run build && npm run check`, then look at the page at 375 px and 1280 px (the site is light mode only).

## Choosing sections

- Hero: `Hero` (centred) or `Hero2` (split). `HeroText` when there is no image worth showing.
- The apartment: `Content` (text + image + list), `Features`/`Features2`/`Features3` for amenities, `Gallery` for photos.
- Prices: `Pricing`, and `Comparison` when seasons or variants differ in many details.
- How it works (booking, arrival): `Steps` (with image) or `Steps2`; `Timeline` when the order matters.
- Proof: `Testimonials` or a single `Quote` (real guest reviews only); `SocialProof` for ratings.
- Questions: `FAQs` (add `schema` once the answers are real).
- Close: `CallToAction`, then the contact section.

## Content rules

- Numbers, ratings and reviews must be real. Remove a section rather than ship invented values.
- Say what happens after the click: where the booking goes, how it is confirmed, how to cancel.
- Structured data (`FAQs` `schema`, `add-structured-data.md`) only for content that is true for the apartment.
