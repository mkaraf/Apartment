# CLAUDE.md

@AGENTS.md

The import above loads the full project documentation. Everything below is specific to working with Claude Code on this project.

## Communication

- Talk to the user in **Czech**, briefly and structured (short points, details only on request).
- Code, comments, commit messages and docs in `.claude/` / `AGENTS.md` stay in **English**; text visible on the website is **Czech**.

## Skills

Project skills live in `.claude/skills/<name>/SKILL.md` and load automatically by their description. Always follow the matching skill before editing; the most used ones:

| Task                                  | Skill                                  |
| ------------------------------------- | -------------------------------------- |
| Edit texts / sections on the homepage | `edit-one-page-site` (+ `use-widgets`) |
| New or replaced photos                | `add-apartment-photos`                 |
| Colours, layout, Tailwind             | `styling`                              |
| Menu, header buttons                  | `customize-header`                     |
| Deploy to Cloudflare                  | `deploy-cloudflare`                    |
| What is missing before launch         | `pre-launch-checklist`                 |
| Visual redesign, look and feel        | `/frontend-design` (manual only)       |

When a new recurring task appears (e.g. connecting or changing the booking calendar), propose a new skill in the same format (`name` + `description` frontmatter).

## Project state and decisions

- One page only (`src/pages/index.astro`); sections: `#uvod`, `#apartman`, `#fotogalerie`, `#rezervace`, `#lokalita`, `#faqs`, `#kontakt`.
- Palette: umber / cream / clay with sunflower yellow as a detail, light mode only. Never yellow text on paper.
- **Booking (decided):** own availability calendar + inquiry, confirmed manually by the owner. Busy nights come from the private iCal address of the owner's Google Calendar through the Worker `worker/index.ts` (`/api/availability`, secret `CALENDAR_ICAL_URL`); the inquiry is sent by Web3Forms. Settings in `src/booking.ts`, UI in `BookingSection.astro`. Pages stay static; no Astro adapter.
- **Name:** Casa de Girassol (`site.name` in `config.yaml`; the hero wordmark is split as "Casa" / "de Girassol" in `index.astro`).
- **Design (branch `design/editorial`):** editorial style: full-bleed toned photo hero with the name in the corners, Gloock serif headings + Inter text, warm umber/cream palette with sunflower yellow as a detail only, small square buttons with ↗, CSS-only motion that respects reduced motion. The earlier "sunny" version is on `design/modern`. Photos are still low-res placeholders.
- Never invent content: prices, reviews, ratings, addresses, capacities. Leave `[doplnit]` instead.
- Site stays `noindex` until the user explicitly says to launch (`pre-launch-checklist`).

## Environment and workflow

- The user develops on **Windows** in VS Code; npm (not pnpm) is the package manager; Node >= 22.22.3.
- Do not edit generated folders: `dist/`, `.astro/`, `node_modules/`. `vendor/` only when changing the config integration.
- After every change run `npm run build && npm run check`; use `npm run fix` for formatting issues. Visual check at 375 px and 1280 px.
- Git: work on `main` is fine for this personal project, but commit only when asked. Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), short English subject.
- Deployment is manual (`npm run build && npx wrangler deploy`); never deploy without the user's request.
