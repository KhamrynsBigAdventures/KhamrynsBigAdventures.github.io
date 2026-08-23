/* Khamryn's Big Adventures — restore the illustrated GET THE BOOK objects */
(function () {
  'use strict';

  const books = [
    {
      selector: '.book-card:nth-of-type(1) .book-info',
      className: 'football-link',
      href: 'https://www.amazon.com/dp/B0F2465NHT',
      image: 'images/big-game-exact.png',
      alt: "Get Khamryn's Big Game"
    },
    {
      selector: '.book-card:nth-of-type(2) .book-info',
      className: 'bike-link',
      href: 'https://www.amazon.com/dp/B0FB34CP6R',
      image: 'images/big-bike-exact.png',
      alt: "Get Khamryn's Big Bike Adventure"
    },
    {
      selector: '.book-card:nth-of-type(3) .book-info',
      className: 'cruise-link',
      href: 'https://www.amazon.com/dp/B0FHP5157W',
      image: 'images/cruise-adventures-exact.png',
      alt: "Get Khamryn's Cruise Adventures"
    },
    {
      selector: '.book-card:nth-of-type(4) .book-info',
      className: 'soccer-link',
      href: 'https://www.amazon.com/dp/B0FLXF1VJX',
      image: 'images/final-kickoff-exact.png',
      alt: "Get Khamryn's Final Kickoff"
    },
    {
      selector: '.book-card:nth-of-type(5) .book-info',
      className: 'trophy-link',
      href: 'https://www.amazon.com/dp/B0GXLHT5F2',
      image: 'images/winning-play-exact.png',
      alt: "Get Khamryn's Winning Play"
    }
  ];

  function addObjects() {
    books.forEach(book => {
      const info = document.querySelector(book.selector);
      if (!info || info.querySelector('.object-link')) return;

      const link = document.createElement('a');
      link.className = `object-link ${book.className}`;
      link.href = book.href;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', book.alt);

      const object = document.createElement('span');
      object.className = 'object-emoji';
      object.setAttribute('aria-hidden', 'true');
      object.style.backgroundImage = `url('${book.image}')`;
      object.style.backgroundPosition = 'center';
      object.style.backgroundRepeat = 'no-repeat';
      object.style.backgroundSize = 'contain';

      const label = document.createElement('span');
      label.textContent = 'GET THE BOOK →';

      link.append(object, label);
      info.appendChild(link);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addObjects, { once: true });
  } else {
    addObjects();
  }
})();
