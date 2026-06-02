// transitions.js — fredvg.com navigation and animation

/* -----------------------------------------------
   Footer: current year
----------------------------------------------- */
const yearEl = document.querySelector('.js-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -----------------------------------------------
   Homepage hero animation

   First visit: animate in, reveal period at 1.5s.
   Return visit (fvg-hero-played set): skip animation.
----------------------------------------------- */
const period = document.querySelector('.period');

if (document.body.classList.contains('home-template')) {
  if (sessionStorage.getItem('fvg-hero-played')) {
    // Return visit: content visible by default, just show the period
    if (period) period.classList.add('is-visible');
  } else {
    // First visit: hero-animate already set in <head> if appropriate
    if (period) {
      setTimeout(() => {
        period.classList.add('is-visible');
        sessionStorage.setItem('fvg-hero-played', 'true');
      }, 1500);
    }
  }
}

/* -----------------------------------------------
   Menu toggle
----------------------------------------------- */
const menuToggle = document.querySelector('.menu-toggle');
const navDrawer = document.getElementById('nav-drawer');
const navOverlay = document.querySelector('.nav-drawer__overlay');

if (menuToggle && navDrawer) {
  const openMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    navDrawer.classList.add('is-open');
    navOverlay?.classList.add('is-visible');
  };

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navDrawer.classList.remove('is-open');
    navOverlay?.classList.remove('is-visible');
  };

  menuToggle.addEventListener('click', () => {
    menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  navOverlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* -----------------------------------------------
   Tag filter accordion
----------------------------------------------- */
const accordionToggle = document.querySelector('.accordion-toggle');
const accordionContent = document.getElementById('tag-list');
if (accordionToggle && accordionContent) {
  accordionToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    accordionContent.hidden = expanded;
  });
}
