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

Every home-page section links through to its detail page.

The seven HTML files are **generated** by `tools/build_pages.py`, which holds the
shared header/footer and all page copy in one place. Run `python tools/build_pages.py`
from anywhere to rewrite them. You can also edit the HTML directly — just know
that re-running the generator overwrites it, so put lasting changes in the
generator.

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
| `--ink` | `#080C12` | dark sections, footer, primary buttons |
| `--paper` | `#F4F2ED` | page background |
| `--accent` | `#1B5CE8` | eyebrow dots, CTAs, active states |
| `--accent-lt` | `#7FA8FF` | emphasised words on dark backgrounds |
| `--r-sm / md / lg / xl` | `4 / 8 / 10 / 12px` | the small-corner "premium" radii |
| `--shell` | `1300px` | content max width |

Corners are deliberately tight across the whole system, buttons included. If you
ever want the pill buttons back, it is one line — set `border-radius:100px` on
`.btn`.

Typeface is **Plus Jakarta Sans** (Google Fonts), matching the geometric
grotesque in the supplied Framer / Synthorix references.

### Type scale

A modular scale, ratio **1.25 (major third)**, anchored on a 17px body:
17 · 21.25 · 26.6 · 33.2 · 41.5 · 51.9 · 64.8 · 81. Two half-steps (15 and 19)
are deliberate — the jump straight from body to h3 is too abrupt for
content-heavy pages. Every text group in the site draws from these tokens; no
one-off font sizes.

| Token | Size | Used for |
|---|---|---|
| `--fs-label` | 11px | field labels, footer headings, legends |
| `--fs-eyebrow` | 12.5px | eyebrows, breadcrumbs, cite lines |
| `--fs-xs` | 13.5px | captions, form notes, spec chips |
| `--fs-sm` | 15px | card and UI body *(half-step)* |
| `--fs-base` | 17px | body |
| `--fs-md` | 16→19px | section subheads *(half-step)* |
| `--fs-lg` | 18→21.25px | h3 / card titles |
| `--fs-xl` | 20→26.6px | lead paragraphs |
| `--fs-2xl` | 25→33.2px | CTA and band headings |
| `--fs-3xl` | 29→41.5px | section titles |
| `--fs-4xl` | 33→51.9px | page titles |
| `--fs-5xl` | 30→76px | hero display |

**Optical sizing** is applied as the scale climbs: tracking tightens
(`--tr-display` −0.032em → `--tr-title` −0.02em → body 0) and leading shortens
(`--lh-display` 0.98 → `--lh-body` 1.6). Negative tracking is reserved for
display sizes; small uppercase labels take *positive* tracking (`--tr-label`
0.18em). This follows standard practice — body 1.5–1.7 leading, headlines
1.0–1.25, and negative tracking only where type is genuinely large.

If anything ever feels too loud, the two dials are heading weight and `--accent`.

### Patterns

Four CSS-only decorative layers give each section texture without imagery.
Add one as `<div class="pattern pattern--grid" aria-hidden="true">` inside a
`position:relative` section; `.shell` already sits above them on `z-index:1`.

| Class | Look | Currently on |
|---|---|---|
| `.pattern--grid` | 76px architectural grid, radially masked | core, industries, benefits card, page intros, plain sections |
| `.pattern--dots` | 30px dot matrix, light-on-dark | products |
| `.pattern--rules` | six evenly spaced column rules | statement, process, detail rows |
| `.pattern--hatch` | 45° diagonal hatch, corner-masked | CTA bands |

Ink is `--pat-light` / `--pat-dark` (7% alpha) — deliberately at the edge of
perception. If a pattern reads as wallpaper rather than texture, lower the alpha
rather than removing it.

### Hero

The hero is required to resolve in **one screen** — headline, subcopy, both CTAs
and the full stat strip visible without scrolling. It uses `min-height:100svh`,
and `--fs-5xl` is capped by `min(7.2vw, 8.2vh)` so a short viewport shrinks the
display type instead of pushing the strip below the fold. On phones the CTAs are
forced onto one row and the strip holds two columns for the same reason.
Verified at 17 viewport sizes from 1920×1080 down to 360×640.

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
- Hero one-screen fit verified at 17 viewport sizes (1920×1080 → 360×640).
- Images are full-resolution 2048px JPEGs. Compress and generate `srcset`
  variants when you swap in the licensed originals.
