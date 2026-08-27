/* Khamryn's Big Adventures — adventure hero navigation + book CTA mapping */
(function () {
  'use strict';

  const ASSET_BASE = 'https://khamrynsbigadventures.github.io/';
  const COVER_VERSION = '20260825-covers4';

  const heroAdventureTargets = {
    'hero-winning-kham': 'winning-play-adventure.html',
    'hero-football-kham': 'big-game-adventure.html',
    'hero-cruise-kham': 'cruise-adventure-game.html',
    'hero-soccer-kham': 'final-kickoff-adventure-music.html',
    'hero-bike-kham': 'big-bike-adventure.html'
  };

  const bookAdventureTargets = {
    'book-big-game': 'big-game-adventure.html',
    'book-big-bike': 'big-bike-adventure.html',
    'book-cruise-adventures': 'cruise-adventure-game.html',
    'book-final-kickoff': 'final-kickoff-adventure-music.html',
    'book-winning-play': 'winning-play-adventure.html'
  };

  /*
     HERO NAVIGATION:
     Use the hero's actual class as the source of truth.
     Do not infer the destination from the image filename because several
     image assets are reused elsewhere on the page.
  */
  document.addEventListener('click', function (event) {
    const target = event.target && event.target.closest
      ? event.target.closest('.adventure-hero')
      : null;
    if (!target) return;

    let destination = null;
    for (const className of Object.keys(heroAdventureTargets)) {
      if (target.classList.contains(className)) {
        destination = heroAdventureTargets[className];
        break;
      }
    }
    if (!destination) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    window.location.href = destination;
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
    if (!cover) return;
    const image = cover.querySelector('img');
    if (!image) return;

    image.setAttribute('loading', 'eager');
    image.setAttribute('decoding', 'async');
    image.setAttribute('fetchpriority', 'high');
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');

    if (!destination || cover.querySelector('.book-adventure-link')) return;
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
      img.src = `${ASSET_BASE}${book.image}?v=${COVER_VERSION}`;
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
