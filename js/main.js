/* ============================================================
   OA GROUP — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ── SCROLL REVEAL ── */

(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ── STICKY NAV ── */

(function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── ACCORDION (FAQ) ── */

(function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item    = trigger.closest('.accordion__item');
      const panel   = item.querySelector('.accordion__panel');
      const inner   = item.querySelector('.accordion__panel-inner');
      const isOpen  = item.classList.contains('open');

      // Close all siblings
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion__item.open').forEach(openItem => {
          if (openItem !== item) {
            const p = openItem.querySelector('.accordion__panel');
            openItem.classList.remove('open');
            openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            p.style.height = '0';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.height = '0';
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.height = inner.scrollHeight + 'px';
      }
    });

    // Keyboard support
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
})();


/* ── TABS ── */

(function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels  = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
          p.classList.remove('active');
          p.hidden = true;
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panel = document.querySelector('[data-tab-panel="' + target + '"]');
        if (panel) {
          panel.classList.add('active');
          panel.hidden = false;
        }
      });

      // Keyboard navigation
      btn.addEventListener('keydown', e => {
        const allBtns = Array.from(buttons);
        const idx = allBtns.indexOf(btn);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          allBtns[(idx + 1) % allBtns.length].focus();
          allBtns[(idx + 1) % allBtns.length].click();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          allBtns[(idx - 1 + allBtns.length) % allBtns.length].focus();
          allBtns[(idx - 1 + allBtns.length) % allBtns.length].click();
        }
      });
    });
  });
})();


/* ── FILTER BUTTONS ── */

(function initFilters() {
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const btns  = bar.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('[data-filter]');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filterValue || 'all';

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.filter === filter) {
            card.hidden = false;
            card.style.display = '';
          } else {
            card.hidden = true;
            card.style.display = 'none';
          }
        });
      });
    });
  });
})();


/* ── COOKIE CONSENT ── */

(function initCookie() {
  const COOKIE_KEY = 'oa_cookie_consent';
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  if (!localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => banner.classList.add('visible'), 1200);
  }

  const accept = banner.querySelector('[data-cookie-accept]');
  const decline = banner.querySelector('[data-cookie-decline]');

  if (accept) accept.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.remove('visible');
  });

  if (decline) decline.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.remove('visible');
  });
})();


/* ── COMING SOON TOOLTIP FOR ENTITY LINKS ── */

(function initComingSoon() {
  document.querySelectorAll('[data-status="coming-soon"]').forEach(el => {
    el.addEventListener('click', e => {
      // Allow click but indicate site isn't live
    });
  });
})();


/* ── ANIMATED COUNTERS ── */

(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el   = e.target;
      const end  = parseInt(el.dataset.count, 10);
      const dur  = 1800;
      const step = 16;
      const total = Math.ceil(dur / step);
      let current = 0;

      const timer = setInterval(() => {
        current++;
        const val = Math.round(easeOut(current / total) * end);
        el.textContent = el.dataset.suffix ? val + el.dataset.suffix : val;
        if (current >= total) clearInterval(timer);
      }, step);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
})();


/* ── CONTACT FORM HANDLING ── */

(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;

    // Simple validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    const privacyCheck = form.querySelector('#privacyConsent');
    if (privacyCheck && !privacyCheck.checked) {
      privacyCheck.closest('.form-checkbox').style.outline = '2px solid #e53e3e';
      valid = false;
    } else if (privacyCheck) {
      privacyCheck.closest('.form-checkbox').style.outline = '';
    }

    if (!valid) {
      const firstError = form.querySelector('.error, [style*="outline"]');
      if (firstError) firstError.focus();
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2D7D46';
      form.reset();
      setTimeout(() => {
        btn.textContent = origText;
        btn.disabled = false;
        btn.style.background = '';
      }, 4000);
    }, 1500);
  });
})();


/* ── 404 SEARCH ── */

(function init404Search() {
  const searchForm = document.querySelector('.page-404__search');
  if (!searchForm) return;

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = searchForm.querySelector('input').value.trim();
    if (q) {
      window.location.href = '/search?q=' + encodeURIComponent(q);
    }
  });
})();


/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
