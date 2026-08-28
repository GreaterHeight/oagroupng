/* ============================================================
   OA GROUP — NAVIGATION JAVASCRIPT
   ============================================================ */

'use strict';

(function initNavigation() {

  /* ── DROPDOWN ── */

  const dropdownTrigger = document.querySelector('.nav__dropdown-trigger');
  const dropdownPanel   = document.querySelector('.nav__dropdown-panel');

  if (dropdownTrigger && dropdownPanel) {

    const openDropdown = () => {
      dropdownPanel.classList.add('open');
      dropdownTrigger.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      dropdownPanel.classList.remove('open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    };

    dropdownTrigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdownPanel.classList.contains('open');
      isOpen ? closeDropdown() : openDropdown();
    });

    dropdownTrigger.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown();
        const first = dropdownPanel.querySelector('.nav__dropdown-item');
        if (first) first.focus();
      }
    });

    // Arrow key nav inside dropdown
    dropdownPanel.querySelectorAll('.nav__dropdown-item').forEach((item, i, all) => {
      item.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeDropdown(); dropdownTrigger.focus(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); all[(i+1) % all.length].focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); all[(i-1+all.length) % all.length].focus(); }
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!dropdownTrigger.contains(e.target) && !dropdownPanel.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape globally
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });
  }


  /* ── MOBILE HAMBURGER ── */

  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileMenu  = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Mobile submenu toggle
    document.querySelectorAll('.nav__mobile-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const submenu = trigger.nextElementSibling;
        const isOpen  = submenu && submenu.classList.contains('open');
        if (submenu) {
          submenu.classList.toggle('open', !isOpen);
          trigger.setAttribute('aria-expanded', String(!isOpen));
        }
      });
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

})();
