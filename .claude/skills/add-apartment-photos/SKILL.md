---
name: add-apartment-photos
description: Add, replace or reorder photos of the apartment (hero, Showcase, Gallery, Steps) with correct file naming, Czech alt texts and optimisation. Use when the user brings new photos or wants to change images on the site.
---

# Add or Replace Apartment Photos

Photos live in `src/assets/images/apartman/` and are optimised at build time by Sharp through `~/components/common/Image.astro` (WebP, responsive sizes). Never put them in `public/` (they would not be optimised).

## Steps

1. Copy the photo to `src/assets/images/apartman/` with a lowercase ASCII name without diacritics, describing the room: `loznice.jpg`, `kuchyn-2.jpg`, `balkon.jpg`, `vyhled.jpg`.
2. Keep originals reasonable: JPG, long edge ~2400 px, under ~1 MB (Sharp makes the variants, but huge originals slow the build). Landscape for hero/gallery.
3. Reference it in `src/pages/index.astro` as `{ src: '~/assets/images/apartman/<name>.jpg', alt: '…' }` in the right widget:
   - `WordmarkHero` (`#uvod`): `src` is the landscape shot for wide screens, `portrait` the same scene shot upright (9:16) for phones and tablets held upright; the browser loads only the matching one. Keep calm areas top left and at the bottom for the text.
   - `Showcase` (`#apartman`): 4 photos next to the amenity list.
   - `Gallery` (`#fotogalerie`): all photos, order = order in the array.
   - `Steps` (`#rezervace`): one supporting photo.
4. Write `alt` in Czech, concrete and short ("Ložnice s manželskou postelí", "Kuchyňský kout s varnou deskou"). No "obrázek …", no `[doplnit]` left in alt texts at launch.
5. If a photo is removed, delete it from every widget array and from the folder (unused assets are not shipped, but keep the folder clean).
6. For the social sharing image use the `set-open-graph-image` skill (1200×630 crop).
7. `npm run build && npm run check`, then look at hero and gallery at 375 px and 1280 px.

## Notes

- Do not commit personal data visible in photos (documents, faces of guests, house numbers if the address should stay private).
- The original JPG is also copied to `dist/_astro/` (e.g. `loznice.<hash>.jpg`), so it is public. Strip EXIF/GPS metadata from originals before adding them (e.g. `exiftool -gps:all= photo.jpg` or a photo app with "remove location").
