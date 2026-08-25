/* Khamryn's Big Adventures — adventure hero navigation + book CTA mapping */
(function () {
  'use strict';

  const ASSET_BASE = 'https://khamrynsbigadventures.github.io/';

  // Hero artwork is navigation to the matching existing book card.
  const heroTargets = {
    'big-game-exact.png': 'book-big-game',
    'big-bike-exact.png': 'book-big-bike',
    'cruise-adventures-exact.png': 'book-cruise-adventures',
    'final-kickoff-exact.png': 'book-final-kickoff',
    'winning-play-exact.png': 'book-winning-play'
  };

  // Book covers open the interactive experience for that book.
  // Keep purchase links on the GET THE BOOK artwork/CTA instead.
  const bookAdventureTargets = {
    'book-big-game': 'big-game-adventure.html'
  };

  document.addEventListener('click', function (event) {
    const image = event.target && event.target.closest ? event.target.closest('img') : null;
    if (!image) return;

    const filename = image.getAttribute('src')?.split('/').pop()?.split('?')[0];
    const targetId = heroTargets[filename];
    const hero = image.closest('.adventure-hero');
    if (!targetId || !hero) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + targetId);
  }, true);

  const books = [
    { index: 1, className: 'football-link', href: 'https://www.amazon.com/dp/B0F2465NHT', image: 'images/big-game-exact.png', alt: "Get Khamryn's Big Game", id: 'book-big-game' },
    { index: 2, className: 'bike-link', href: 'https://www.amazon.com/dp/B0FB34CP6R', image: 'images/big-bike-exact.png', alt: "Get Khamryn's Big Bike Adventure", id: 'book-big-bike' },
    { index: 3, className: 'cruise-link', href: 'https://www.amazon.com/dp/B0FHP5157W', image: 'images/cruise-adventures-exact.png', alt: "Get Khamryn's Cruise Adventures", id: 'book-cruise-adventures' },
    { index: 4, className: 'soccer-link', href: 'https://www.amazon.com/dp/B0FLXF1VJX', image: 'images/final-kickoff-exact.png', alt: "Get Khamryn's Final Kickoff", id: 'book-final-kickoff' },
    { index: 5, className: 'winning-play-link', href: 'https://www.amazon.com/dp/B0GXLHT5F2', image: 'images/winning-play-exact.png', alt: "Get Khamryn's Winning Play", id: 'book-winning-play' }
  ];

  function makeCoverInteractive(card, book) {
    const destination = bookAdventureTargets[book.id];
    const cover = card.querySelector('.book-art.cover-art');
    if (!destination || !cover || cover.querySelector('.book-adventure-link')) return;

    const image = cover.querySelector('img');
    if (!image) return;

    const link = document.createElement('a');
    link.className = 'book-adventure-link';
    link.href = destination;
    link.setAttribute('aria-label', `Enter ${book.alt.replace(/^Get /, '')} adventure`);
    link.setAttribute('title', `Enter ${book.alt.replace(/^Get /, '')} adventure`);

    cover.replaceChildren(link);
    link.appendChild(image);
  }

  function addObjects() {
    const cards = document.querySelectorAll('#books .book-card');
    if (!cards.length) return;

    books.forEach(book => {
      const card = cards[book.index - 1];
      if (!card) return;
      card.id = book.id;

      // The Big Game book cover is the doorway into its interactive adventure.
      makeCoverInteractive(card, book);

      const info = card.querySelector('.book-info');
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
      img.src = `${ASSET_BASE}${book.image}?v=20260825-adventure-nav`;
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
