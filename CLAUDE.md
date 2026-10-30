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

When a new recurring task appears (e.g. the Google Calendar booking once it is decided), propose a new skill in the same format (`name` + `description` frontmatter).

## Project state and decisions

- One page only (`src/pages/index.astro`); sections: `#uvod`, `#apartman`, `#fotogalerie`, `#lokalita`, `#rezervace`, `#faqs`, `#cta`, `#kontakt`.
- Palette: warm yellow / deeper yellow / cream, light mode only. Mind contrast of yellow on white.
- **Booking:** planned via Google Calendar, not implemented and the exact approach is not decided yet. Do not pick one silently: propose options (e.g. embedded public availability calendar + inquiry, Google Calendar appointment schedule) and let the user choose. Prefer solutions that keep the site static; a Worker/adapter only if really needed.
- Never invent content: prices, reviews, ratings, addresses, capacities. Leave `[doplnit]` instead.
- Site stays `noindex` until the user explicitly says to launch (`pre-launch-checklist`).

## Environment and workflow

- The user develops on **Windows** in VS Code; npm (not pnpm) is the package manager; Node >= 22.22.3.
- Do not edit generated folders: `dist/`, `.astro/`, `node_modules/`. `vendor/` only when changing the config integration.
- After every change run `npm run build && npm run check`; use `npm run fix` for formatting issues. Visual check at 375 px and 1280 px.
- Git: work on `main` is fine for this personal project, but commit only when asked. Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`), short English subject.
- Deployment is manual (`npm run build && npx wrangler deploy`); never deploy without the user's request.
