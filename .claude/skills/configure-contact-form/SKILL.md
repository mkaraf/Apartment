---
name: configure-contact-form
description: Add or wire up a contact/booking inquiry form with a backend (Formspree, Web3Forms, Cloudflare Worker). Use when a form, inquiry or submission is mentioned.
---

# Configure a Contact Form

The booking inquiry form already exists: `src/components/widgets/BookingSection.astro`, sent to Web3Forms with the access key in `src/booking.ts` (`web3formsAccessKey`; until it is set the form tells guests it is not connected). The steps below apply to any other form added with the `Contact` widget (or `Newsletter`).

`src/components/ui/Form.astro` (used by `src/components/widgets/Contact.astro`) renders the markup only. It ships **without** `action`/`method` on purpose: until you configure it the browser performs a GET to the same page and nothing is stored. Never ship a form without a backend.

## Steps

1. Pick a backend that accepts anonymous submissions from a static site (Cloudflare hosts the site, so Netlify Forms do not apply) and add the attributes to the `<form>` in `src/components/ui/Form.astro`:

   ```html
   <form method="POST" action="https://formspree.io/f/<your-id>"></form>
   ```

   Formspree, Web3Forms, Getform and similar services work the same way. A Cloudflare Worker endpoint is an option if you add the adapter (the `deploy-cloudflare` skill).

2. Pass the fields as `inputs` from `index.astro`. `Form.astro` renders `name`, `label`, `type`, `placeholder`, `autocomplete`; add `required` where the input is rendered if you want validation. Labels in Czech.
3. Add a consent/disclaimer text (`disclaimer`) that links to `/privacy`, since the form collects personal data.
4. Create the page users land on after submitting (e.g. `src/pages/dekujeme.astro`) if your backend redirects.
5. Test on the deployed site, not only in `astro dev`.

## Where things are

| Piece              | File                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| Markup             | `src/components/ui/Form.astro`                                         |
| Card + description | `src/components/widgets/Contact.astro`                                 |
| Content            | `src/pages/index.astro` (`inputs`, `textarea`, `disclaimer`, `button`) |
| Types              | `Form`, `Input`, `Textarea`, `Disclaimer` in `src/types.d.ts`          |

## Notes

- If you prefer to pass `action`/`method` as props instead of editing the component, extend the `Form` interface in `src/types.d.ts` and forward the props from `Contact.astro`.
- Do not put secrets (API keys) in the markup; use a backend that accepts anonymous submissions or a server endpoint.
- The default submit label in `Form.astro` is English (`Contact us`); pass `button="Odeslat"`.
