/* Khamryn's Big Adventures — reliable cover renderer
   Safari/iOS can restore index.html from the back-forward cache after an
   adventure page. Re-run the cover fallback on pageshow so the real covers
   are restored even when the document is not freshly loaded. */
(function () {
  'use strict';

  function decodeEmbeddedCover(img) {
    if (!img || !img.src || !/\.svg(?:\?|#|$)/i.test(img.src)) return;
    if (img.dataset.coverFallbackRunning === '1') return;
    img.dataset.coverFallbackRunning = '1';

    fetch(img.src, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('Cover request failed');
        return response.text();
      })
      .then(function (svgText) {
        var match = svgText.match(/data:image\/(jpeg|jpg|png);base64,([^"']+)/i);
        if (!match) throw new Error('Embedded cover artwork not found');

        var mime = match[1].toLowerCase() === 'png' ? 'image/png' : 'image/jpeg';
        var bytes = Uint8Array.from(atob(match[2]), function (char) {
          return char.charCodeAt(0);
        });
        var blobUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));

        img.addEventListener('load', function () {
          setTimeout(function () { URL.revokeObjectURL(blobUrl); }, 1000);
        }, { once: true });

        img.src = blobUrl;
      })
      .catch(function () {
        img.dataset.coverFallbackRunning = '0';
      });
  }

  function init() {
    document.querySelectorAll('#books .cover-art img').forEach(decodeEmbeddedCover);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  /* Critical for iPhone/Safari when Home is restored from bfcache. */
  window.addEventListener('pageshow', function () {
    document.querySelectorAll('#books .cover-art img').forEach(function (img) {
      img.dataset.coverFallbackRunning = '0';
    });
    setTimeout(init, 0);
    setTimeout(init, 250);
  });
})();
