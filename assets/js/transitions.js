// transitions.js — fredvg.com navigation and animation

/* -----------------------------------------------
   Footer: current year
----------------------------------------------- */
const yearEl = document.querySelector('.js-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* -----------------------------------------------
   Homepage hero animation

   First visit (hero-animate on <html>): name fades in via CSS,
   then the dot drops and rolls via CSS keyframe animation
   (dot-move-x / dot-move-y in custom.css).

   Return visit / reduced-motion: dot is visible immediately —
   no hero-animate class means no animation, dot at natural position.
----------------------------------------------- */
if (document.body.classList.contains('home-template') &&
    !sessionStorage.getItem('fvg-hero-played')) {

  // Measure the dot's natural Y so the drop starts just above the viewport.
  // Runs within the 1s animation-delay window — well before the keyframe fires.
  const dotY = document.querySelector('.dot-y');
  if (dotY && document.documentElement.classList.contains('hero-animate')) {
    // Temporarily suppress the animation to read the layout (no transform offset).
    dotY.style.animation = 'none';
    void dotY.offsetHeight;
    const rect = dotY.getBoundingClientRect();
    // rect.bottom ≈ bottom of line box = where the period glyph sits.
    // Set --dot-start-y so the glyph starts ~10 px above the viewport top.
    document.documentElement.style.setProperty(
      '--dot-start-y', `${-(rect.bottom + 10)}px`
    );
    dotY.style.animation = '';
    void dotY.offsetHeight; // restart animation with the new var in effect
  }

  // Mark as played after the full sequence: 1s name fade + 1.8s dot animation
  setTimeout(() => {
    sessionStorage.setItem('fvg-hero-played', 'true');
  }, 2800);
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

  // "Filter by tag" link in the header sentence opens this accordion
  const navFilterToggle = document.querySelector('.js-filter-toggle');
  if (navFilterToggle) {
    navFilterToggle.addEventListener('click', () => {
      accordionContent.hidden = false;
      accordionToggle.setAttribute('aria-expanded', 'true');
      accordionToggle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
