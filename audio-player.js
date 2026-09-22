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
  }
  }

  standardizeAdventureEnding();
  startWinningPlayImmediately();
  const observer = new MutationObserver(standardizeAdventureEnding);
  observer.observe(document.body, { childList: true, subtree: true });
})();
