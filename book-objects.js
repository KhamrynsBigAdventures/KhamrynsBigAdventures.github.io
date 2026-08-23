/* Khamryn's Big Adventures — illustrated GET THE BOOK objects */
(function () {
  'use strict';

  /* Hard-stop the old CSS-drawn football/trophy/etc. shapes. */
  const style = document.createElement('style');
  style.id = 'khamryn-object-final-fix';
  style.textContent = `
    .book-info .object-link,
    .book-info a.object-link {
      position:relative!important;display:flex!important;flex-direction:column!important;
      align-items:center!important;justify-content:flex-start!important;width:190px!important;
      min-height:150px!important;height:auto!important;margin:18px auto 0!important;padding:0!important;
      background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;
      clip-path:none!important;overflow:visible!important;text-decoration:none!important;color:inherit!important;
    }
    .book-info .object-link::before,.book-info .object-link::after,
    .book-info .object-link .object-emoji::before,.book-info .object-link .object-emoji::after,
    .book-info .object-link>span:last-child::before,.book-info .object-link>span:last-child::after {
      content:none!important;display:none!important;background:none!important;border:0!important;box-shadow:none!important;
    }
    .book-info .object-link .object-emoji {
      display:block!important;position:relative!important;width:190px!important;height:112px!important;
      flex:0 0 112px!important;margin:0 auto!important;padding:0!important;background-color:transparent!important;
      background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;
      border:0!important;border-radius:0!important;box-shadow:none!important;font-size:0!important;line-height:0!important;
      opacity:1!important;visibility:visible!important;transform:translateZ(0)!important;
    }
    .book-info .object-link>span:last-child {
      display:block!important;position:relative!important;margin:6px 0 0!important;padding:0!important;
      background:transparent!important;border:0!important;box-shadow:none!important;font-size:.95rem!important;
      line-height:1.15!important;font-weight:800!important;letter-spacing:.03em!important;color:#ffd978!important;
      white-space:nowrap!important;text-align:center!important;
    }
    .book-info .object-link:hover .object-emoji,.book-info .object-link:focus-visible .object-emoji {
      transform:translateY(-4px) scale(1.04)!important;filter:drop-shadow(0 10px 14px rgba(0,0,0,.28))!important;
    }
    @media(max-width:600px){
      .book-info .object-link,.book-info a.object-link{width:175px!important;min-height:140px!important;margin-top:16px!important}
      .book-info .object-link .object-emoji{width:175px!important;height:104px!important;flex-basis:104px!important}
      .book-info .object-link>span:last-child{font-size:.88rem!important;margin-top:5px!important}
    }
  `;
  document.head.appendChild(style);

  const books = [
    { selector: '.book-card:nth-of-type(1) .book-info', className: 'football-link', href: 'https://www.amazon.com/dp/B0F2465NHT', image: 'images/big-game-exact.png', alt: "Get Khamryn's Big Game" },
    { selector: '.book-card:nth-of-type(2) .book-info', className: 'bike-link', href: 'https://www.amazon.com/dp/B0FB34CP6R', image: 'images/big-bike-exact.png', alt: "Get Khamryn's Big Bike Adventure" },
    { selector: '.book-card:nth-of-type(3) .book-info', className: 'cruise-link', href: 'https://www.amazon.com/dp/B0FHP5157W', image: 'images/cruise-adventures-exact.png', alt: "Get Khamryn's Cruise Adventures" },
    { selector: '.book-card:nth-of-type(4) .book-info', className: 'soccer-link', href: 'https://www.amazon.com/dp/B0FLXF1VJX', image: 'images/final-kickoff-exact.png', alt: "Get Khamryn's Final Kickoff" },
    { selector: '.book-card:nth-of-type(5) .book-info', className: 'trophy-link', href: 'https://www.amazon.com/dp/B0GXLHT5F2', image: 'images/winning-play-exact.png', alt: "Get Khamryn's Winning Play" }
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addObjects, { once: true });
  else addObjects();
})();
