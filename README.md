# Blackbox Investments — Website

Static marketing site for Blackbox Investments, a Zimbabwean raw-material and
industrial-chemical supplier trading since 2014.

No build step, no dependencies. Open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

## Structure

```
index.html            all sections, single page
assets/css/styles.css design system + all section styles
assets/js/main.js     sticky header, mobile nav, scroll reveal,
                      industries image swap, form validation
assets/img/           logo (black + white) and photography
```

## Design system

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#0B1017` | dark sections, footer, primary buttons |
| `--paper` | `#F5F3EF` | page background |
| `--accent` | `#1B62E8` | eyebrow dots, CTAs, active states |
| `--shell` | `1240px` | content max width |

Typeface is **Plus Jakarta Sans** (Google Fonts), matching the geometric
grotesque in the supplied Framer / Synthorix references. Headings use weight
500–600 with a heavier `<em>` for the emphasised phrase, as in the references.

## Before this goes live

1. **Replace the photography.** Every image in `assets/img/` except the logos
   is a watermarked iStock *preview*. They carry a visible "iStock / Credit:"
   overlay and are not licensed for publication. Buy the licensed versions (the
   iStock IDs are preserved in the original filenames in `Downloads/blackbox/`)
   or substitute your own photos of Blackbox's actual warehouse, stock and team
   — the latter will serve the brand better regardless.
2. **Fill in the real contact details.** Placeholders live in three places:
   `index.html` contact section, the footer, and the `mailto:` target in
   `assets/js/main.js`. Currently `sales@blackboxinvestments.co.zw` and
   `+263 00 000 0000`.
3. **Wire the contact form to a backend.** It validates client-side and then
   hands off to the visitor's mail client so nothing is silently dropped. Swap
   that block in `main.js` for a POST to Formspree, Netlify Forms, or your own
   endpoint.
4. **Confirm the product and industry copy.** The six product categories and
   five industries are written to be accurate for a supplier of this type, but
   they were not supplied — check them against the real catalogue.
5. **Check the hero stats.** "7+ industries", "60+ material lines" and
   "Nationwide" are plausible placeholders, not verified figures.

## Sections

Hero · Statement · Core mission · Products · Industries (interactive) ·
Benefits · Process · Quote band · Contact · Footer

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-expanded` on the menu, `aria-live` on
  form feedback, labelled inputs.
- `prefers-reduced-motion` disables the hero drift, scroll reveals and image
  crossfades.
- Verified headless at 1440px and 390px: no console errors, no failed requests,
  no horizontal overflow.
- Images are full-resolution 2048px JPEGs. Compress and generate `srcset`
  variants when you swap in the licensed originals.
