# Deploy to Cloudflare (Workers static assets)

The site is fully static (`output: 'static'`) and hosted on Cloudflare Workers as plain assets. `wrangler.jsonc` sets `assets.directory: "./dist"` and `not_found_handling: "404-page"`; no adapter is installed.

## Deploy

1. `npm run build && npx wrangler deploy` (the first run asks you to log in). The Worker name (`apartman`) is set in `wrangler.jsonc`.
2. Or connect the Git repository to the Worker in the Cloudflare dashboard (Workers Builds) with build command `npm run build` and deploy command `npx wrangler deploy`, so every push deploys.
3. Attach the real domain to the Worker in the Cloudflare dashboard (custom domain) and set the same domain in `site.site` in `src/config.yaml`.

## Headers and indexing

`public/_headers` is copied to `dist/` and read by Cloudflare:

- `/_astro/*` gets a long immutable cache header.
- `/*` currently sends `X-Robots-Tag: noindex, nofollow` so previews are not indexed. Remove that block at launch together with `metadata.robots` in `src/config.yaml`.

## Server-side code (only if needed later)

If a feature needs code running on request (e.g. reading a private calendar with a secret key), add the adapter: `npx astro add cloudflare`, keep `output: 'static'` so pages stay prerendered, and follow https://developers.cloudflare.com/workers/frameworks/framework-guides/astro/. Keep `astro` and `@astrojs/cloudflare` at compatible versions.

## Images

| `imageService`      | Behaviour                                                                       | Use when                        |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------------- |
| `compile` (default) | Sharp optimises images at build time for prerendered pages                      | This site (recommended)         |
| `cloudflare`        | `<img srcset>` points at `/cdn-cgi/image/...`, resized by Cloudflare at runtime | On-demand pages, Images enabled |
| `passthrough`       | No optimisation                                                                 | Debugging                       |

Do **not** route SVGs through `imageService: 'cloudflare'`: Cloudflare Image Resizing does not transform SVG and the request loops with `ERROR 9421 The origin server redirected too many times`.

## Verify locally

```bash
npm run build
npx astro preview      # or: npx wrangler dev
```

Check `/` (local images, anchors), `/privacy`, `/terms` and a missing URL (should show the 404 page).
