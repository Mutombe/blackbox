# Blackbox Investments — Website

Static marketing site for Blackbox Investments, a Zimbabwean raw-material and
industrial-chemical supplier trading since 2014.

No build step, no dependencies. Open `index.html`, or serve the folder:

```bash
python -m http.server 8000
```

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, statement, mission, products, photo band, industries, benefits, process, quote |
| `about.html` | Company story, the four values, positioning |
| `products.html` | The six material categories in detail, each with typical lines |
| `industries.html` | The five sectors served, deep-linkable (`#manufacturing`, `#detergents`, `#coatings`, `#agriculture`, `#mining`) |
| `why-blackbox.html` | Supply continuity, handling & compliance, account teams — plus the smaller differentiators |
| `process.html` | The four fulfilment steps expanded, and what ships with every order |
| `contact.html` | Contact details, enquiry form, what to include |

Every home-page section links through to its detail page. Header and footer
markup is duplicated across the files (the trade-off for having no build step) —
if you change the nav, change it in all seven.

## Structure

```
*.html                the seven pages
assets/css/styles.css design system + all components
assets/js/main.js     sticky header, mobile nav, scroll reveal, form validation
assets/img/           logo (black + white) and photography
```

`main.js` is shared by every page; each block no-ops where its markup is absent.

## Design system

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#0B1017` | dark sections, footer, primary buttons |
| `--paper` | `#F5F3EF` | page background |
| `--accent` | `#1B62E8` | eyebrow dots, CTAs, active states |
| `--r-sm / md / lg / xl` | `4 / 8 / 10 / 12px` | the small-corner "premium" radii |
| `--shell` | `1240px` | content max width |

Corners are deliberately tight across the whole system, buttons included. If you
ever want the pill buttons back, it is one line — set `border-radius:100px` on
`.btn`.

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
2. **Fill in the real contact details.** Placeholders appear in the footer of
   all seven pages, in `contact.html`, and in the `mailto:` target in
   `assets/js/main.js`. Currently `sales@blackboxinvestments.co.zw` and
   `+263 00 000 0000`.
3. **Wire the contact form to a backend.** It validates client-side and then
   hands off to the visitor's mail client so nothing is silently dropped. Swap
   that block in `main.js` for a POST to Formspree, Netlify Forms, or your own
   endpoint.
4. **Confirm the product and industry copy.** The six product categories, their
   material lines, and the five industries are written to be accurate for a
   supplier of this type, but they were not supplied — check them against the
   real catalogue.
5. **Check the hero stats.** "7+ industries", "60+ material lines" and
   "Nationwide" are plausible placeholders, not verified figures.

## Accessibility & performance notes

- Skip link, visible focus rings, breadcrumbs, one `<h1>` per page,
  `aria-current="page"` on the active nav link, `aria-expanded` on the menu,
  `aria-live` on form feedback, labelled inputs.
- `prefers-reduced-motion` disables the hero drift and scroll reveals.
- Verified headless across all seven pages at 1440px and 390px: no console
  errors, no broken internal links, no missing images, no horizontal overflow.
- Images are full-resolution 2048px JPEGs. Compress and generate `srcset`
  variants when you swap in the licensed originals.
