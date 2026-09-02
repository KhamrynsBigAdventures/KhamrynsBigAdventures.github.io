/* Khamryn's Big Adventures — soundtrack temporarily muted */
(function () {
  'use strict';
  const oldAudio = document.getElementById('khamryn-site-music');
  const oldBar = document.getElementById('khamryn-music');
  if (oldAudio) { try { oldAudio.pause(); oldAudio.removeAttribute('src'); oldAudio.load(); } catch (e) {} oldAudio.remove(); }
  if (oldBar) oldBar.remove();

  // Sitewide visual source: supplied Khamryn artwork. Cache-bust whenever palette changes.
  const palette = document.createElement('link');
  palette.rel = 'stylesheet';
  palette.href = 'palette.css?v=20260902-artwork-final2';
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
  standardizeAdventureEnding();
  const observer = new MutationObserver(standardizeAdventureEnding);
  observer.observe(document.body, { childList: true, subtree: true });
})();
