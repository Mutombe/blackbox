/* =========================================================
   Blackbox Investments — interactions
   Shared by every page; each block no-ops where its markup
   is absent, so index and the detail pages use one file.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- sticky header ---------- */
  var header = document.getElementById('siteHeader');
  var ticking = false;

  function syncHeader() {
    header.classList.toggle('is-stuck', window.scrollY > 40);
    ticking = false;
  }

  if (header) {
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(syncHeader); ticking = true; }
    }, { passive: true });
    syncHeader();
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav && header) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal');

  revealables.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--d', d);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- contact form (contact.html only) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form && note) {
    var fail = function (field, message) {
      field.setAttribute('aria-invalid', 'true');
      note.textContent = message;
      note.className = 'form-note is-err';
      field.focus();
      return false;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;

      [name, email, message].forEach(function (f) { f.removeAttribute('aria-invalid'); });

      if (!name.value.trim()) return fail(name, 'Please tell us your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        return fail(email, 'Please enter a valid email address.');
      }
      if (message.value.trim().length < 10) {
        return fail(message, 'Please add a little more detail about what you need.');
      }

      /* No backend is wired up yet — hand the enquiry to the visitor's mail
         client so nothing is silently dropped. Replace this block with a POST
         to your form endpoint (Formspree, Netlify Forms, your own API, …). */
      var subject = 'Supply enquiry — ' + (form.elements.company.value.trim() || name.value.trim());
      var body =
        'Name: ' + name.value.trim() + '\n' +
        'Company: ' + (form.elements.company.value.trim() || '—') + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Phone: ' + (form.elements.phone.value.trim() || '—') + '\n\n' +
        message.value.trim();

      window.location.href =
        'mailto:sales@blackboxinvestments.co.zw' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      note.textContent = 'Opening your email app to send the enquiry…';
      note.className = 'form-note is-ok';
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
