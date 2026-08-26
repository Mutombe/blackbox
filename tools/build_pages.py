# -*- coding: utf-8 -*-
"""Generates the Blackbox Investments static pages with shared chrome."""
import io, os

import os.path
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NAV = [
    ("about.html",       "About"),
    ("products.html",    "Products"),
    ("industries.html",  "Industries"),
    ("why-blackbox.html","Why Blackbox"),
    ("process.html",     "Process"),
]

ICON = {
 "shield":'<path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
 "star":  '<path d="M12 3l2.5 5.3 5.5.8-4 4 .9 5.7L12 16.1 7.1 18.8 8 13.1l-4-4 5.5-.8L12 3Z"/>',
 "truck": '<path d="M3 17V7a1 1 0 0 1 1-1h9v11H3Z"/><path d="M13 10h4l4 4v3h-8v-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
 "plant": '<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
 "flask": '<path d="M9 3v7L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L15 10V3"/><path d="M8 3h8"/>',
 "drum":  '<path d="M6 3h12v18H6z"/><path d="M6 8h12M6 16h12"/>',
 "leaf":  '<path d="M3 12a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/><path d="M3 12h18"/>',
 "peak":  '<path d="m3 18 6-12 3 5 3-3 6 10H3Z"/>',
 "doc":   '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',
 "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 "people":'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 6.2A3 3 0 0 1 16 12"/><path d="M18 20a6 6 0 0 0-2-4.5"/>',
 "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>',
}
def svg(name):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
            'stroke-linecap="round" stroke-linejoin="round">%s</svg>' % ICON[name])

EMAIL = "sales@blackboxinvestments.co.zw"
TEL   = "+263000000000"
TELD  = "+263 00 000 0000"


def head(title, desc, active):
    nav = "\n".join(
        '      <a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if h == active else "", l)
        for h, l in NAV)
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="theme-color" content="#0B1017">
<meta property="og:type" content="website">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:image" content="assets/img/hero-refinery.jpg">
<link rel="icon" href="assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="siteHeader">
  <div class="shell header-inner">
    <a class="brand" href="index.html" aria-label="Blackbox Investments &mdash; home">
      <img src="assets/img/logo-white.png" alt="Blackbox Investments" class="brand-mark brand-mark--light">
      <img src="assets/img/logo.png" alt="" aria-hidden="true" class="brand-mark brand-mark--dark">
    </a>

    <nav class="nav" id="primaryNav" aria-label="Primary">
%(nav)s
    </nav>

    <div class="header-actions">
      <a class="btn btn--pill" href="contact.html">Contact us</a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="primaryNav" aria-label="Open menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<main id="main">
""" % {"title": title, "desc": desc, "nav": nav}


FOOT = """</main>

<footer class="site-footer">
  <div class="shell">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="assets/img/logo-white.png" alt="Blackbox Investments">
        <p>Supplying the raw materials that keep Zimbabwe&rsquo;s manufacturers
           producing. Trading since 2014.</p>
      </div>

      <nav class="footer-nav" aria-label="Footer">
        <div>
          <h4>Company</h4>
          <a href="about.html">About</a>
          <a href="process.html">Process</a>
          <a href="why-blackbox.html">Why Blackbox</a>
        </div>
        <div>
          <h4>Supply</h4>
          <a href="products.html">Products</a>
          <a href="industries.html">Industries</a>
          <a href="contact.html">Request a quote</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:%(email)s">Email us</a>
          <a href="tel:%(tel)s">%(teld)s</a>
          <span>Harare, Zimbabwe</span>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <p>&copy; <span id="year">2026</span> Blackbox Investments. All rights reserved.</p>
      <p>Harare &middot; Zimbabwe</p>
    </div>
  </div>
</footer>

<script src="assets/js/main.js"></script>
</body>
</html>
""" % {"email": EMAIL, "tel": TEL, "teld": TELD}


def page_hero(img, alt, crumb, title, lead):
    return """
<section class="page-hero">
  <div class="page-hero-bg"><img src="assets/img/%s" alt="%s" fetchpriority="high"></div>
  <div class="shell">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a><span class="sep" aria-hidden="true">/</span><span aria-current="page">%s</span>
    </nav>
    <h1 class="page-title reveal">%s</h1>
    <p class="page-lead reveal" data-delay="1">%s</p>
  </div>
</section>
""" % (img, alt, crumb, title, lead)


def cta(title, body, primary=("contact.html", "Request a quote"), secondary=None):
    sec = ('<a class="btn btn--ghost" href="%s">%s</a>' % secondary) if secondary else ""
    return """
<section class="cta-band">
  <div class="shell cta-inner">
    <div class="reveal">
      <h2>%s</h2>
      <p>%s</p>
    </div>
    <div class="cta-actions reveal" data-delay="1">
      <a class="btn btn--primary" href="%s">%s <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      %s
    </div>
  </div>
</section>
""" % (title, body, primary[0], primary[1], sec)


def detail_row(no, img, alt, h, body, specs=None):
    sp = ""
    if specs:
        sp = '\n      <ul class="spec-list" role="list">%s</ul>' % "".join(
            "<li>%s</li>" % x for x in specs)
    return """
  <article class="detail-row reveal">
    <figure class="detail-figure"><img src="assets/img/%s" alt="%s" loading="lazy"></figure>
    <div class="detail-body">
      <span class="detail-no">%s</span>
      <h2>%s</h2>
      <p>%s</p>%s
    </div>
  </article>
""" % (img, alt, no, h, body, sp)


def tile(icon, h, body, checks=None):
    ch = ""
    if checks:
        ch = '\n    <ul class="checks" role="list">%s</ul>' % "".join(
            "<li>%s</li>" % c for c in checks)
    return """
  <article class="tile reveal">
    <span class="feature-icon" aria-hidden="true">%s</span>
    <h3>%s</h3>
    <p>%s</p>%s
  </article>
""" % (svg(icon), h, body, ch)


# =====================================================================
# INDUSTRY DATA  (shared between home cards and the industries page)
# =====================================================================
INDUSTRIES = [
 ("plant", "Manufacturing &amp; Processing", "manufacturing", "worker-aisle.jpg",
  "Warehouse aisle stacked with palletised chemical containers",
  "Bulk inputs for continuous production lines, held locally and replenished against your run rate.",
  ["Process solvents", "Acids &amp; alkalis", "Cleaning chemistry", "Lubricants"]),
 ("flask", "Detergents &amp; Personal Care", "detergents", "jerrycans-white.jpg",
  "Stacked white chemical jerrycans on pallets in a warehouse bay",
  "Surfactants, builders and actives for household, industrial and personal care formulations.",
  ["Anionic &amp; non-ionic surfactants", "Builders", "Thickeners", "Preservatives"]),
 ("drum", "Paints, Coatings &amp; Inks", "coatings", "drums-mixed.jpg",
  "Chemical drums and jerrycans with hazard labels on a pallet",
  "Pigments, binders, extenders and solvent systems for coatings and ink manufacturers.",
  ["Titanium dioxide", "Resins &amp; binders", "Extenders", "Solvent blends"]),
 ("leaf", "Agriculture &amp; Agro-processing", "agriculture", "rail-tanker.jpg",
  "Two logistics engineers inspecting rail tanker wagons",
  "Season-on-season supply for the agro value chain, planned around planting and processing cycles.",
  ["Fertiliser inputs", "Processing aids", "Storage chemistry", "Packaging consumables"]),
 ("peak", "Mining &amp; Water Treatment", "mining", "hazmat-pair.jpg",
  "Two technicians in protective suits and respirators inside a plant",
  "Reagents, flocculants and coagulants for mineral processing and effluent handling.",
  ["Flocculants", "Coagulants", "pH adjustment", "Reagent chemistry"]),
]


def ind_card(icon, name, anchor, img, alt, blurb, _specs):
    return """
    <article class="ind-card reveal">
      <figure><img src="assets/img/%s" alt="%s" loading="lazy"></figure>
      <div class="ind-card-body">
        <span class="ind-icon" aria-hidden="true">%s</span>
        <h3>%s</h3>
        <p>%s</p>
        <a class="link-arrow" href="industries.html#%s">Learn more <span aria-hidden="true">&rarr;</span></a>
      </div>
    </article>
""" % (img, alt, svg(icon), name, blurb, anchor)


# =====================================================================
# HOME
# =====================================================================
PRODUCTS = [
 ("01", "Industrial Chemicals",
  "Solvents, acids, alkalis and process chemicals in drum, IBC and bulk quantities."),
 ("02", "Detergent &amp; Cleaning Inputs",
  "Surfactants, builders, thickeners and actives for household and industrial cleaning lines."),
 ("03", "Food &amp; Beverage Ingredients",
  "Food-grade additives, preservatives, acidulants and processing aids with full traceability."),
 ("04", "Polymers &amp; Plastics",
  "Resins, masterbatch and compounding additives for moulders, extruders and packaging plants."),
 ("05", "Paints, Coatings &amp; Inks",
  "Pigments, binders, extenders and solvent blends for coatings manufacturers."),
 ("06", "Mining &amp; Water Treatment",
  "Flocculants, coagulants and reagent chemistry for processing and effluent handling."),
]

home = head(
 "Blackbox Investments &mdash; Raw Material Supply for Zimbabwe&rsquo;s Manufacturers",
 "Since 2014, Blackbox Investments has supplied industrial chemicals and raw materials to "
 "manufacturing companies across Zimbabwe.", None)

home += """
<section class="hero" id="top">
  <div class="hero-media">
    <img src="assets/img/hero-refinery.jpg" alt="Aerial view of a petrochemical processing plant at sunrise" fetchpriority="high">
    <div class="hero-scrim" aria-hidden="true"></div>
  </div>

  <div class="shell hero-inner">
    <p class="eyebrow eyebrow--light reveal"><span class="dot"></span> Trading in Zimbabwe since 2014</p>
    <h1 class="hero-title reveal" data-delay="1">
      The Raw Materials<br>Behind Zimbabwean<br><em>Manufacturing</em>
    </h1>
    <p class="hero-sub reveal" data-delay="2">
      We supply the industrial chemicals and raw inputs that keep production lines
      moving &mdash; sourced globally, stocked locally, and delivered by a team that
      treats your schedule as its own.
    </p>
    <div class="hero-cta reveal" data-delay="3">
      <a class="btn btn--primary" href="contact.html">Request a quote <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      <a class="btn btn--ghost" href="products.html">View our products</a>
    </div>
  </div>

  <div class="shell hero-strip reveal" data-delay="4">
    <div class="strip-item"><strong>2014</strong><span>Trading since</span></div>
    <div class="strip-item"><strong>7+</strong><span>Industries served</span></div>
    <div class="strip-item"><strong>60+</strong><span>Material lines</span></div>
    <div class="strip-item"><strong>Nationwide</strong><span>Delivery footprint</span></div>
  </div>
</section>

<section class="statement" id="about">
  <div class="shell">
    <p class="statement-text reveal">
      Blackbox Investments exists to put dependable raw materials in the hands of
      the companies that build things in Zimbabwe. <span>Consistent grades, honest
      lead times, and a sales floor that picks up the phone.</span>
    </p>
    <div class="statement-meta reveal" data-delay="1">
      <span class="rule" aria-hidden="true"></span>
      <p>Established 2014 &middot; Harare, Zimbabwe</p>
    </div>
  </div>
</section>

<section class="core">
  <div class="shell">
    <div class="core-head">
      <p class="eyebrow reveal"><span class="dot"></span> Our core thing</p>
      <p class="core-lead reveal" data-delay="1">
        Our mission is to supply manufacturing companies with the materials they
        depend on &mdash; at the quality they specified, on the day they planned for &mdash;
        so their operations never stall waiting on a shipment.
      </p>
    </div>

    <div class="core-main">
      <div class="core-visual reveal">
        <figure>
          <img src="assets/img/lab-pipette.jpg" alt="Laboratory pipette dispensing a sample into a test tube" loading="lazy">
        </figure>
        <div class="core-badge">
          <strong>2014</strong>
          <span>Supplying Zimbabwe&rsquo;s<br>manufacturers since</span>
        </div>
      </div>

      <div class="core-features">
        <article class="core-feature reveal">
          <span class="feature-icon" aria-hidden="true">%(shield)s</span>
          <div>
            <h3>Reliability</h3>
            <p>A dependable, repeatable supply of raw materials so your production
               schedule holds. We plan stock around your run rates, not ours.</p>
          </div>
        </article>

        <article class="core-feature reveal" data-delay="1">
          <span class="feature-icon" aria-hidden="true">%(star)s</span>
          <div>
            <h3>Quality</h3>
            <p>We supply and transport to strict industry standards, with
               documentation and specification sheets on every consignment.</p>
          </div>
        </article>

        <article class="core-feature reveal" data-delay="2">
          <span class="feature-icon" aria-hidden="true">%(truck)s</span>
          <div>
            <h3>Momentum</h3>
            <p>A vibrant, motivated commercial team built on aggressive sales and
               marketing &mdash; the reason our customer base keeps expanding.</p>
          </div>
        </article>

        <a class="btn btn--primary reveal" data-delay="3" href="about.html">More about Blackbox <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>
""" % {"shield": svg("shield"), "star": svg("star"), "truck": svg("truck")}

home += """
<section class="products" id="products">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow eyebrow--light reveal"><span class="dot"></span> What we supply</p>
      <h2 class="section-title section-title--light reveal" data-delay="1">
        Materials for every<br>stage of production
      </h2>
      <p class="section-sub section-sub--light reveal" data-delay="2">
        From bulk solvents to specialist additives, we hold and source the inputs
        Zimbabwean manufacturers order most.
      </p>
    </div>

    <div class="product-grid">"""
for i, (no, h, b) in enumerate(PRODUCTS):
    d = ' data-delay="%d"' % i if i else ""
    home += """
      <article class="product-card reveal"%s>
        <span class="product-index">%s</span>
        <h3>%s</h3>
        <p>%s</p>
      </article>""" % (d, no, h, b)
home += """
      <article class="product-card product-card--media reveal" data-delay="2">
        <img src="assets/img/drums-flammable.jpg" alt="Rows of chemical containers bearing flammable-liquid hazard labels" loading="lazy">
        <div class="pc-media-label">
          <strong>60+ material lines</strong>
          <span>Held locally, sourced to specification, delivered nationwide.</span>
        </div>
      </article>
    </div>

    <p class="products-note reveal">
      Looking for something not listed? Sourcing to specification is part of the service.
      <a href="products.html">See the full range &rarr;</a>
    </p>
  </div>
</section>
"""

# --- the photo band (was the industries backdrop) ---
home += """
<section class="field-band">
  <div class="field-bg"><img src="assets/img/worker-aisle.jpg" alt="" loading="lazy"></div>
  <div class="shell">
    <p class="eyebrow eyebrow--light reveal"><span class="dot"></span> On the ground</p>
    <h2 class="band-title reveal" data-delay="1">Stock you can see,<br>moving when you <em>need it</em></h2>
    <p class="band-sub reveal" data-delay="2">
      Material sitting in a warehouse two months away is not supply. We hold
      working stock locally and turn it against your forecast, so the reorder is
      already moving before you notice the drum is light.
    </p>
    <div class="band-stats reveal" data-delay="3">
      <div><strong>Local</strong><span>Warehousing</span></div>
      <div><strong>Bulk &amp; drum</strong><span>Pack sizes</span></div>
      <div><strong>Scheduled</strong><span>Replenishment</span></div>
      <div><strong>Documented</strong><span>Every consignment</span></div>
    </div>
  </div>
</section>
"""

# --- industries as their own section ---
home += """
<section class="industries" id="industries">
  <div class="shell">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow reveal"><span class="dot"></span> Who we serve</p>
        <h2 class="section-title reveal" data-delay="1">Industries we<br><em>support</em></h2>
      </div>
      <p class="section-sub reveal" data-delay="2">
        Different plants, different chemistry, same requirement &mdash; the right
        material, correctly documented, on the day it was promised.
      </p>
    </div>

    <div class="ind-grid">"""
for row in INDUSTRIES:
    home += ind_card(*row)
home += """
    </div>

    <div class="section-foot reveal">
      <a class="btn btn--primary" href="industries.html">Explore all industries <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
</section>
"""

home += """
<section class="benefits" id="benefits">
  <div class="shell">
    <div class="benefits-card">
      <div class="section-head reveal">
        <p class="eyebrow eyebrow--muted">Why manufacturers choose us</p>
        <h2 class="section-title">
          Built on Aggressive<br>Sales &amp; <em>Real Service</em>
        </h2>
        <p class="section-sub">
          Our work ethic was set in 2014 and hasn&rsquo;t softened since &mdash; a vibrant,
          motivated approach to serving an expanding customer base.
        </p>
      </div>

      <div class="benefit-grid">
        <article class="benefit reveal">
          <div class="benefit-media">
            <img src="assets/img/pallet-forklift.jpg" alt="Palletised chemical containers being moved by forklift" loading="lazy">
            <h3>Supply<br>Continuity</h3>
          </div>
          <p>Stock held locally and replenished against your forecast, so a delayed
             import never becomes a stopped production line.</p>
        </article>

        <article class="benefit reveal" data-delay="1">
          <div class="benefit-media">
            <img src="assets/img/hazmat-closeup.jpg" alt="Technician in a protective suit, goggles and respirator" loading="lazy">
            <h3>Handling &amp;<br>Compliance</h3>
          </div>
          <p>Correct packaging, labelling and documentation on every consignment &mdash;
             hazardous goods moved the way regulation requires.</p>
        </article>

        <article class="benefit reveal" data-delay="2">
          <div class="benefit-media">
            <img src="assets/img/team-warehouse.jpg" alt="Warehouse team walking through a chemical storage facility" loading="lazy">
            <h3>Responsive<br>Account Teams</h3>
          </div>
          <p>A named contact who knows your grades, your volumes and your plant &mdash;
             not a queue, a ticket number, or a call-back tomorrow.</p>
        </article>
      </div>

      <div class="section-foot reveal" style="justify-content:center">
        <a class="btn btn--primary" href="why-blackbox.html">See what that means in practice <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>

<section class="process" id="process">
  <div class="shell process-inner">
    <div class="process-head">
      <p class="eyebrow reveal"><span class="dot"></span> How we work</p>
      <h2 class="section-title reveal" data-delay="1">From enquiry to<br>your loading bay</h2>
      <p class="section-sub reveal" data-delay="2">
        Four steps, no surprises. Most repeat orders move without you ever
        needing to chase.
      </p>
      <a class="btn btn--primary reveal" data-delay="3" href="process.html">See the full process <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>
    </div>

    <ol class="steps" role="list">
      <li class="step reveal">
        <span class="step-no">01</span>
        <div>
          <h3>Specification</h3>
          <p>Tell us the grade, volume and cadence. We confirm exactly what you need
             and flag anything that affects handling or lead time.</p>
        </div>
      </li>
      <li class="step reveal" data-delay="1">
        <span class="step-no">02</span>
        <div>
          <h3>Sourcing &amp; quotation</h3>
          <p>We price against our supplier network and come back with landed cost,
             availability and a delivery window you can plan against.</p>
        </div>
      </li>
      <li class="step reveal" data-delay="2">
        <span class="step-no">03</span>
        <div>
          <h3>Quality &amp; documentation</h3>
          <p>Specification sheets, safety data and consignment paperwork are
             prepared before the goods leave &mdash; not after you ask.</p>
        </div>
      </li>
      <li class="step reveal" data-delay="3">
        <span class="step-no">04</span>
        <div>
          <h3>Delivery &amp; replenishment</h3>
          <p>Goods arrive at your site, and we hold the next cycle against your
             forecast so the reorder is already in motion.</p>
        </div>
      </li>
    </ol>
  </div>
</section>

<section class="quote-band">
  <div class="quote-bg" aria-hidden="true"><img src="assets/img/worker-carrying.jpg" alt="" loading="lazy"></div>
  <div class="shell">
    <blockquote class="reveal">
      <p>&ldquo;The company has a work ethic and principle established on aggressive
         sales and marketing. We adopted a vibrant and motivated approach to
         serving the expanding customer base.&rdquo;</p>
      <cite>Blackbox Investments &mdash; since 2014</cite>
    </blockquote>
  </div>
</section>
"""

home += cta("Tell us what your plant <em>runs on</em>",
            "Send the material, grade and volume. You&rsquo;ll hear back from a real "
            "person with pricing and availability.",
            ("contact.html", "Request a quote"),
            ("products.html", "Browse products"))
home += FOOT


# =====================================================================
# ABOUT
# =====================================================================
about = head("About &mdash; Blackbox Investments",
 "Blackbox Investments began trading in Zimbabwe in 2014, supplying raw materials to "
 "manufacturing companies.", "about.html")
about += page_hero("team-warehouse.jpg",
 "Warehouse team walking through a chemical storage facility", "About",
 "Supplying Zimbabwe&rsquo;s makers <em>since 2014</em>",
 "Blackbox Investments initiated trading in Zimbabwe in 2014. The goal was, and "
 "still is, to supply needed raw materials to manufacturing companies.")
about += """
<section class="page-intro">
  <div class="shell page-intro-grid">
    <p class="eyebrow reveal"><span class="dot"></span> Who we are</p>
    <div class="reveal" data-delay="1">
      <p class="page-intro-lead">
        We are a Zimbabwean trading company built around a single, unglamorous
        promise: the material you specified, in the quantity you ordered, on the
        day we said it would arrive.
      </p>
      <p class="page-intro-body">
        Blackbox Investments started trading in 2014 to close a gap that every
        local manufacturer knows well &mdash; inputs that arrive late, arrive short, or
        arrive as something subtly different from what was ordered. Each of those
        outcomes costs a production line more than the material itself.
      </p>
      <p class="page-intro-body">
        The company has a work ethic and principle established on aggressive sales
        and marketing. That is not a slogan about pressure selling; it describes a
        commercial team that chases supply as hard as it chases orders, and that
        would rather call you with a problem early than let a delivery date slip
        quietly past. We adopted a vibrant and motivated approach to serving our
        expanding customer base, and it is the reason that base keeps expanding.
      </p>
    </div>
  </div>
</section>

<section class="plain-section plain-section--paper">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow reveal"><span class="dot"></span> What we stand on</p>
      <h2 class="section-title reveal" data-delay="1">Four things we<br>refuse to trade away</h2>
    </div>
    <div class="tile-grid">"""
about += tile("shield", "Reliability",
  "A dependable, repeatable supply of raw materials so your production schedule holds.",
  ["Stock planned around your run rate", "Forecast-led replenishment", "Early warning when something moves"])
about += tile("star", "Quality",
  "We supply and transport exclusively to strict industry standards.",
  ["Specification sheets on every line", "Safety data supplied as standard", "Grades confirmed before dispatch"])
about += tile("truck", "Momentum",
  "A vibrant, motivated commercial team that treats your deadline as the deadline.",
  ["Quotes turned around fast", "Named account contacts", "Problems raised, not buried"])
about += tile("people", "Partnership",
  "We would rather hold one customer for ten years than win ten for one order.",
  ["Repeat-supply relationships", "Volume terms as you grow", "Sourcing to specification"])
about += """
    </div>
  </div>
</section>

<section class="field-band">
  <div class="field-bg"><img src="assets/img/hero-refinery.jpg" alt="" loading="lazy"></div>
  <div class="shell">
    <p class="eyebrow eyebrow--light reveal"><span class="dot"></span> Where we sit</p>
    <h2 class="band-title reveal" data-delay="1">Between the world&rsquo;s producers<br>and <em>your plant</em></h2>
    <p class="band-sub reveal" data-delay="2">
      We source from established international and regional producers, carry the
      import, handling and storage risk, and present you with a single local
      supplier, a single invoice and a single point of contact.
    </p>
    <div class="band-stats reveal" data-delay="3">
      <div><strong>2014</strong><span>Trading since</span></div>
      <div><strong>7+</strong><span>Industries served</span></div>
      <div><strong>60+</strong><span>Material lines</span></div>
      <div><strong>Harare</strong><span>Base of operations</span></div>
    </div>
  </div>
</section>
"""
about += cta("Let&rsquo;s talk about what <em>you run on</em>",
 "Whether it is one drum a month or a container a quarter, start with a conversation.",
 ("contact.html", "Get in touch"), ("products.html", "See our products"))
about += FOOT


# =====================================================================
# PRODUCTS
# =====================================================================
PROD_DETAIL = [
 ("01", "drums-flammable.jpg", "Rows of grey chemical containers bearing flammable-liquid hazard labels",
  "Industrial Chemicals",
  "The workhorse chemistry behind most production floors &mdash; supplied in the pack "
  "size that suits your handling setup, from 20L jerrycans through drums and IBCs "
  "to bulk deliveries.",
  ["Solvents", "Mineral &amp; organic acids", "Caustics &amp; alkalis", "Peroxides", "Process aids", "Bulk / IBC / drum"]),
 ("02", "jerrycans-white.jpg", "Stacked white chemical jerrycans on pallets in a warehouse bay",
  "Detergent &amp; Cleaning Inputs",
  "Everything a cleaning-products line consumes, from the surfactant base through "
  "to the additives that make the finished product perform and hold on shelf.",
  ["Anionic surfactants", "Non-ionic surfactants", "Builders", "Thickeners", "Preservatives", "Fragrance carriers"]),
 ("03", "lab-tubes.jpg", "Blue-lit laboratory test tubes with a pipette",
  "Food &amp; Beverage Ingredients",
  "Food-grade materials handled and documented to the standard that food and "
  "beverage production demands, with traceability back to the producer.",
  ["Additives", "Preservatives", "Acidulants", "Sweeteners", "Processing aids", "Food-grade certification"]),
 ("04", "barrels-black.jpg", "Two industrial storage barrels on a plain background",
  "Polymers &amp; Plastics",
  "Raw polymer and the additive package around it, for moulders, extruders, film "
  "lines and packaging converters.",
  ["Resins", "Masterbatch", "Compounding additives", "Stabilisers", "Plasticisers"]),
 ("05", "drums-mixed.jpg", "Chemical drums and jerrycans with hazard labels on a pallet",
  "Paints, Coatings &amp; Inks",
  "Pigment, binder and solvent systems for coatings manufacturers &mdash; supplied to "
  "the consistency a formulation depends on batch after batch.",
  ["Titanium dioxide", "Pigments", "Resins &amp; binders", "Extenders", "Solvent blends", "Driers"]),
 ("06", "hazmat-pair.jpg", "Two technicians in protective suits and respirators inside a plant",
  "Mining &amp; Water Treatment",
  "Reagent and treatment chemistry for mineral processing operations and for the "
  "effluent side that regulation increasingly turns on.",
  ["Flocculants", "Coagulants", "pH adjustment", "Reagents", "Disinfection", "Scale control"]),
]

products = head("Products &mdash; Blackbox Investments",
 "Industrial chemicals, detergent inputs, food-grade ingredients, polymers, coatings "
 "raw materials and water-treatment chemistry supplied across Zimbabwe.", "products.html")
products += page_hero("pallet-forklift.jpg",
 "Palletised chemical containers being moved by forklift", "Products",
 "Materials for every<br>stage of <em>production</em>",
 "Six core categories, and a sourcing desk for everything that falls outside them. "
 "Pack sizes from 20L jerrycans to bulk.")
products += """
<section class="page-intro">
  <div class="shell page-intro-grid">
    <p class="eyebrow reveal"><span class="dot"></span> The range</p>
    <div class="reveal" data-delay="1">
      <p class="page-intro-lead">
        We hold and source the inputs Zimbabwean manufacturers order most &mdash; and
        we will go and find the ones they order rarely.
      </p>
      <p class="page-intro-body">
        The categories below describe where our stock and supplier relationships
        are deepest. They are not a closed list. If a formulation calls for
        something we do not carry, sourcing to specification is part of the
        service rather than a favour &mdash; tell us the grade and the volume and we
        will come back with landed cost and availability.
      </p>
    </div>
  </div>
</section>

<section class="detail-rows">
  <div class="shell">"""
for row in PROD_DETAIL:
    products += detail_row(*row)
products += """
  </div>
</section>
"""
products += cta("Can&rsquo;t see what your <em>line needs?</em>",
 "Send us the specification. Sourcing what is not on the shelf is a normal part of the job.",
 ("contact.html", "Send a specification"), ("industries.html", "See industries"))
products += FOOT


# =====================================================================
# INDUSTRIES
# =====================================================================
industries = head("Industries &mdash; Blackbox Investments",
 "Manufacturing, detergents and personal care, coatings, agriculture and mining &mdash; "
 "the sectors Blackbox Investments supplies across Zimbabwe.", "industries.html")
industries += page_hero("worker-aisle.jpg",
 "Warehouse worker carrying chemical containers down a storage aisle", "Industries",
 "The sectors we <em>keep running</em>",
 "Different plants, different chemistry, same requirement &mdash; the right material, "
 "correctly documented, on the day it was promised.")
industries += """
<section class="detail-rows" style="background:var(--white)">
  <div class="shell">"""
for i, (icon, name, anchor, img, alt, blurb, specs) in enumerate(INDUSTRIES):
    body = blurb + (
      " We build the stock plan around your production calendar rather than our "
      "import cycle, so the material is on the ground before you need it.")
    industries += detail_row("%02d" % (i + 1), img, alt, name, body, specs).replace(
      '<article class="detail-row reveal">',
      '<article class="detail-row reveal" id="%s">' % anchor)
industries += """
  </div>
</section>

<section class="plain-section plain-section--paper">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow reveal"><span class="dot"></span> Whatever the sector</p>
      <h2 class="section-title reveal" data-delay="1">What every customer<br>gets from us</h2>
    </div>
    <div class="tile-grid">"""
industries += tile("doc", "Documentation as standard",
  "Specification sheets, safety data and consignment paperwork prepared before dispatch.")
industries += tile("clock", "Lead times you can plan against",
  "A delivery window quoted honestly, and a call the moment anything threatens it.")
industries += tile("globe", "Sourcing beyond the shelf",
  "If a formulation needs something we do not stock, we go and find it to specification.")
industries += """
    </div>
  </div>
</section>
"""
industries += cta("Supplying your <em>sector?</em>",
 "Tell us what your plant consumes and we will tell you what we can hold for you.",
 ("contact.html", "Start a conversation"), ("products.html", "Browse products"))
industries += FOOT


# =====================================================================
# WHY BLACKBOX
# =====================================================================
why = head("Why Blackbox &mdash; Blackbox Investments",
 "Supply continuity, correct handling and compliance, and account teams that answer "
 "&mdash; what working with Blackbox Investments actually means.", "why-blackbox.html")
why += page_hero("hazmat-closeup.jpg",
 "Technician in a protective suit, goggles and respirator", "Why Blackbox",
 "Built on aggressive sales<br>and <em>real service</em>",
 "Our work ethic was set in 2014 and hasn&rsquo;t softened since &mdash; a vibrant, motivated "
 "approach to serving an expanding customer base.")
why += """
<section class="page-intro">
  <div class="shell page-intro-grid">
    <p class="eyebrow reveal"><span class="dot"></span> The difference</p>
    <div class="reveal" data-delay="1">
      <p class="page-intro-lead">
        Any trader can quote you a price. The question worth asking is what
        happens in the six weeks after you accept it.
      </p>
      <p class="page-intro-body">
        Raw-material supply fails in predictable ways: the shipment slips and
        nobody calls; the grade is close enough but not the same; the paperwork
        arrives a week after the goods and the audit is next Tuesday. Each one is
        a choice a supplier made about how much trouble to take. The three
        commitments below are the ones we take.
      </p>
    </div>
  </div>
</section>

<section class="detail-rows">
  <div class="shell">"""
why += detail_row("01", "pallet-forklift.jpg",
 "Palletised chemical containers being moved by forklift",
 "Supply continuity",
 "Stock held locally and replenished against your forecast, so a delayed import "
 "never becomes a stopped production line. We would rather carry the inventory "
 "risk ourselves than hand you a shortage and an apology.",
 ["Local working stock", "Forecast-led reordering", "Early warning on delays", "Buffer for repeat lines"])
why += detail_row("02", "hazmat-portrait.jpg",
 "Technician in protective coveralls and a respirator inside an industrial building",
 "Handling &amp; compliance",
 "Correct packaging, labelling and documentation on every consignment &mdash; hazardous "
 "goods moved the way regulation requires, not the way that happens to be "
 "cheapest that week.",
 ["Compliant packaging", "Correct hazard labelling", "Safety data sheets", "Consignment paperwork"])
why += detail_row("03", "team-warehouse.jpg",
 "Warehouse team walking through a chemical storage facility",
 "Responsive account teams",
 "A named contact who knows your grades, your volumes and your plant &mdash; not a "
 "queue, a ticket number, or a call-back tomorrow. The person who quotes you is "
 "the person who follows the order through.",
 ["Named account contact", "Fast quotation turnaround", "One point of escalation", "Continuity across orders"])
why += """
  </div>
</section>

<section class="plain-section">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow reveal"><span class="dot"></span> And beyond that</p>
      <h2 class="section-title reveal" data-delay="1">The smaller things<br>that decide it</h2>
    </div>
    <div class="tile-grid">"""
why += tile("globe", "Sourcing to specification",
  "Materials outside our stocked range are sourced against your spec, priced landed, and quoted honestly.")
why += tile("clock", "Quotes that come back",
  "A fast, complete quotation with cost, availability and a delivery window &mdash; not a holding email.")
why += tile("doc", "Paperwork before goods",
  "Specification and safety documentation is prepared ahead of dispatch, so your audit trail is never behind.")
why += tile("people", "Terms that grow with you",
  "Volume and payment terms that reflect the relationship rather than the size of a single order.")
why += """
    </div>
  </div>
</section>

<section class="quote-band">
  <div class="quote-bg" aria-hidden="true"><img src="assets/img/worker-carrying.jpg" alt="" loading="lazy"></div>
  <div class="shell">
    <blockquote class="reveal">
      <p>&ldquo;The company has a work ethic and principle established on aggressive
         sales and marketing. We adopted a vibrant and motivated approach to
         serving the expanding customer base.&rdquo;</p>
      <cite>Blackbox Investments &mdash; since 2014</cite>
    </blockquote>
  </div>
</section>
"""
why += cta("Put it to the <em>test</em>",
 "Send us a line you are currently unhappy with and see what comes back.",
 ("contact.html", "Request a quote"), ("process.html", "See how we work"))
why += FOOT


# =====================================================================
# PROCESS
# =====================================================================
process = head("Process &mdash; Blackbox Investments",
 "From specification and quotation through quality documentation to delivery and "
 "replenishment &mdash; how Blackbox Investments fulfils an order.", "process.html")
process += page_hero("rail-tanker.jpg",
 "Two logistics engineers inspecting rail tanker wagons", "Process",
 "From enquiry to<br>your <em>loading bay</em>",
 "Four steps, no surprises. Most repeat orders move without you ever needing to chase.")
process += """
<section class="page-intro">
  <div class="shell page-intro-grid">
    <p class="eyebrow reveal"><span class="dot"></span> How it runs</p>
    <div class="reveal" data-delay="1">
      <p class="page-intro-lead">
        The process exists so that the second order takes a fraction of the
        effort of the first, and the tenth takes almost none.
      </p>
      <p class="page-intro-body">
        The first time we supply a material we do the work of pinning down the
        specification properly &mdash; grade, purity, pack size, handling constraints,
        and the cadence you actually consume at. After that, replenishment runs
        against your forecast, and the paperwork is already patterned.
      </p>
    </div>
  </div>
</section>

<section class="detail-rows">
  <div class="shell">"""
process += detail_row("01", "lab-pipette.jpg",
 "Laboratory pipette dispensing a sample into a test tube",
 "Specification",
 "Tell us the grade, volume and cadence. We confirm exactly what you need and "
 "flag anything that affects handling, storage or lead time before it becomes "
 "your problem rather than a question.",
 ["Grade &amp; purity", "Pack size", "Volume &amp; cadence", "Handling constraints"])
process += detail_row("02", "hero-refinery.jpg",
 "Aerial view of a petrochemical processing plant at sunrise",
 "Sourcing &amp; quotation",
 "We price against our supplier network and come back with landed cost, "
 "availability and a delivery window you can plan against &mdash; including the "
 "cases where the honest answer is that the timing does not work.",
 ["Landed cost", "Availability", "Delivery window", "Alternatives where relevant"])
process += detail_row("03", "drums-flammable.jpg",
 "Rows of grey chemical containers bearing flammable-liquid hazard labels",
 "Quality &amp; documentation",
 "Specification sheets, safety data and consignment paperwork are prepared "
 "before the goods leave &mdash; not after you ask, and not the week your auditor "
 "does.",
 ["Specification sheets", "Safety data sheets", "Hazard labelling", "Consignment paperwork"])
process += detail_row("04", "worker-carrying.jpg",
 "Warehouse worker carrying two chemical containers",
 "Delivery &amp; replenishment",
 "Goods arrive at your site, and we hold the next cycle against your forecast so "
 "the reorder is already in motion. You should notice the drum is light after we "
 "have already scheduled its replacement.",
 ["Site delivery", "Forecast-held stock", "Scheduled reorder", "Named contact throughout"])
process += """
  </div>
</section>

<section class="plain-section plain-section--paper">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow reveal"><span class="dot"></span> What you receive</p>
      <h2 class="section-title reveal" data-delay="1">Every order, every time</h2>
    </div>
    <div class="tile-grid">"""
process += tile("doc", "Complete documentation",
  "Nothing leaves without the paperwork that lets you receive it, store it and account for it.",
  ["Specification sheet", "Safety data sheet", "Delivery note &amp; invoice"])
process += tile("shield", "Correct handling",
  "Packaging and labelling appropriate to the classification of what is inside.",
  ["Compliant packaging", "Hazard labelling", "Segregation on transport"])
process += tile("clock", "A window you can plan on",
  "A quoted delivery date, and a phone call the moment anything threatens it.",
  ["Confirmed dispatch", "Delivery window", "Proactive delay warning"])
process += """
    </div>
  </div>
</section>
"""
process += cta("Ready to start <em>step one?</em>",
 "Send the grade, the volume and how often you order. That is all we need to begin.",
 ("contact.html", "Start an enquiry"), ("why-blackbox.html", "Why Blackbox"))
process += FOOT


# =====================================================================
# CONTACT
# =====================================================================
contact = head("Contact &mdash; Blackbox Investments",
 "Request a quote or talk to the Blackbox Investments supply team in Harare, Zimbabwe.",
 "contact.html")
contact += page_hero("hazmat-portrait.jpg",
 "Technician in protective coveralls and a respirator inside an industrial building",
 "Contact",
 "Tell us what your<br>plant <em>runs on</em>",
 "Send the material, the grade and the volume. You&rsquo;ll hear back from a real person "
 "with pricing and availability.")
contact += """
<section class="contact" style="background:var(--white)">
  <div class="shell contact-inner">
    <div class="contact-copy">
      <p class="eyebrow reveal"><span class="dot"></span> Get in touch</p>
      <h2 class="section-title reveal" data-delay="1">Talk to the<br>supply desk</h2>
      <p class="section-sub reveal" data-delay="2">
        The more detail you can give us up front, the faster and more accurate the
        quote comes back.
      </p>

      <ul class="contact-details reveal" data-delay="3" role="list">
        <li>
          <span class="c-label">Email</span>
          <a href="mailto:%(email)s">%(email)s</a>
        </li>
        <li>
          <span class="c-label">Phone</span>
          <a href="tel:%(tel)s">%(teld)s</a>
        </li>
        <li>
          <span class="c-label">Office</span>
          <span>Harare, Zimbabwe</span>
        </li>
        <li>
          <span class="c-label">Hours</span>
          <span>Mon &ndash; Fri, 08:00 &ndash; 17:00 CAT</span>
        </li>
      </ul>
    </div>

    <form class="contact-form reveal" data-delay="2" id="contactForm" novalidate>
      <div class="field">
        <label for="f-name">Full name</label>
        <input id="f-name" name="name" type="text" autocomplete="name" required placeholder="Jane Moyo">
      </div>
      <div class="field">
        <label for="f-company">Company</label>
        <input id="f-company" name="company" type="text" autocomplete="organization" placeholder="Your manufacturing company">
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-email">Email</label>
          <input id="f-email" name="email" type="email" autocomplete="email" required placeholder="you@company.co.zw">
        </div>
        <div class="field">
          <label for="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+263 &hellip;">
        </div>
      </div>
      <div class="field">
        <label for="f-message">What do you need?</label>
        <textarea id="f-message" name="message" rows="5" required placeholder="Material, grade, volume and how often you order."></textarea>
      </div>
      <button class="btn btn--primary btn--block" type="submit">Send enquiry <span class="btn-arrow" aria-hidden="true">&rarr;</span></button>
      <p class="form-note" id="formNote" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>

<section class="plain-section plain-section--paper">
  <div class="shell">
    <div class="section-head">
      <p class="eyebrow reveal"><span class="dot"></span> Helps us help you</p>
      <h2 class="section-title reveal" data-delay="1">What to include<br>in an enquiry</h2>
    </div>
    <div class="tile-grid">""" % {"email": EMAIL, "tel": TEL, "teld": TELD}
contact += tile("flask", "The material and grade",
  "The technical grade matters as much as the name. If you have a spec sheet, send it.")
contact += tile("drum", "Volume and pack size",
  "How much, and in what container &mdash; jerrycan, drum, IBC or bulk. It changes the price.")
contact += tile("clock", "How often you order",
  "A one-off and a monthly repeat are priced differently. Tell us which this is.")
contact += """
    </div>
  </div>
</section>
"""
contact += cta("Prefer to <em>talk?</em>",
 "Call the supply desk during office hours and speak to someone who can quote there and then.",
 ("tel:" + TEL, TELD), ("mailto:" + EMAIL, "Email instead"))
contact += FOOT


# =====================================================================
PAGES = {
 "index.html": home, "about.html": about, "products.html": products,
 "industries.html": industries, "why-blackbox.html": why,
 "process.html": process, "contact.html": contact,
}
for fn, html in PAGES.items():
    io.open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n").write(html)
    print("wrote %-20s %6d bytes" % (fn, len(html)))
