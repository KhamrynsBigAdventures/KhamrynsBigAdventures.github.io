/* Khamryn's Big Adventures — sitewide adventure fixes */
(function () {
  'use strict';

  // Sitewide visual source: supplied Khamryn artwork. Cache-bust whenever palette changes.
  const palette = document.createElement('link');
  palette.rel = 'stylesheet';
  palette.href = 'palette.css?v=20260907-clean-palette';
  palette.dataset.sitewidePalette = 'true';
  document.head.appendChild(palette);

  function standardizeAdventureEnding() {
    const bookButtons = document.querySelectorAll('.book-reveal .cta, .book-reveal .book-btn, .finish .book-cta');
    bookButtons.forEach((button) => { if (button.textContent !== 'GET THE BOOK →') button.textContent = 'GET THE BOOK →'; });
    const backButtons = document.querySelectorAll('.book-reveal .back, .book-reveal .back-btn, .finish .button-outline, .success .secondary');
    backButtons.forEach((button) => { if (button.textContent !== '← Back Home') button.textContent = '← Back Home'; if (button.getAttribute('href') !== 'index.html') button.setAttribute('href', 'index.html'); });
    if (location.pathname.endsWith('winning-play-adventure.html')) {
      const reveal = document.querySelector('#bookReveal');
      if (reveal && !reveal.querySelector('.book-purchase-link')) {
        const back = reveal.querySelector('a.back');
        const bookLink = document.createElement('a');
        bookLink.className = 'next book-purchase-link';
        bookLink.href = 'https://www.amazon.com/dp/B0GXLHT5F2';
        bookLink.target = '_blank';
        bookLink.rel = 'noopener noreferrer';
        bookLink.textContent = 'GET THE BOOK →';
        if (back) reveal.insertBefore(bookLink, back); else reveal.appendChild(bookLink);
      }
    }
  }

  function startWinningPlayImmediately() {
    if (!location.pathname.endsWith('winning-play-adventure.html')) return;
    const start = document.getElementById('startGame');
    if (!start) return;
    const instructions = document.querySelector('.how-to-play span');
    if (instructions) instructions.innerHTML = 'Read each play and tap the answer you think is best. Choose correctly and you\'ll automatically move to the next play. Get all 6 right to run the winning play! 🏈';
    start.hidden = true;
    start.click();
  }

  standardizeAdventureEnding();
  startWinningPlayImmediately();
  const observer = new MutationObserver(standardizeAdventureEnding);
  observer.observe(document.body, { childList: true, subtree: true });
})();
