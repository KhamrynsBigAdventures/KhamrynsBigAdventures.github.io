/* Khamryn's Big Adventures — FINAL book CTA artwork mapping */
(function () {
  'use strict';

  const ASSET_BASE = 'https://khamrynsbigadventures.github.io/';

  /* The basketball hero artwork is navigation, not a purchase CTA. */
  document.addEventListener('click', function (event) {
    const image = event.target && event.target.closest
      ? event.target.closest('img[src*="big-game-exact.png"]')
      : null;
    if (!image) return;

    const hero = image.closest('.hero-football-kham');
    if (!hero) return;

    const target = document.getElementById('book-big-game');
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#book-big-game');
  }, true);

  const books = [
    { index: 1, className: 'football-link', href: 'https://www.amazon.com/dp/B0F2465NHT', image: 'images/big-game-exact.png', alt: "Get Khamryn's Big Game" },
    { index: 2, className: 'bike-link', href: 'https://www.amazon.com/dp/B0FB34CP6R', image: 'images/big-bike-exact.png', alt: "Get Khamryn's Big Bike Adventure" },
    { index: 3, className: 'cruise-link', href: 'https://www.amazon.com/dp/B0FHP5157W', image: 'images/cruise-adventures-exact.png', alt: "Get Khamryn's Cruise Adventures" },
    { index: 4, className: 'soccer-link', href: 'https://www.amazon.com/dp/B0FLXF1VJX', image: 'images/final-kickoff-exact.png', alt: "Get Khamryn's Final Kickoff" },
    { index: 5, className: 'winning-play-link', href: 'https://www.amazon.com/dp/B0GXLHT5F2', image: 'images/winning-play-exact.png', alt: "Get Khamryn's Winning Play" }
  ];

  function addObjects() {
    const cards = document.querySelectorAll('#books .book-card');
    if (!cards.length) return;

    books.forEach(book => {
      const info = cards[book.index - 1]?.querySelector('.book-info');
      if (!info) return;

      const old = info.querySelector('.object-link');
      if (old) old.remove();

      const link = document.createElement('a');
      link.className = `object-link ${book.className}`;
      link.href = book.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', book.alt);

      const img = document.createElement('img');
      img.className = 'object-art';
      img.src = `${ASSET_BASE}${book.image}?v=20260823-canonical-root`;
      img.alt = book.alt;
      img.loading = 'eager';
      img.decoding = 'async';

      const label = document.createElement('span');
      label.className = 'object-label';
      label.textContent = 'GET THE BOOK →';

      link.append(img, label);
      info.appendChild(link);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addObjects, { once: true });
  } else {
    addObjects();
  }
})();
