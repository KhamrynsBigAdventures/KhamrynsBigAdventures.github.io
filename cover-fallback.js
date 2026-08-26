/* Khamryn's Big Adventures — reliable cover renderer
   Safari/iOS can restore index.html from the back-forward cache after an
   adventure page. The previous fallback replaced the SVG with a temporary
   Blob URL and revoked it, which could leave a restored cover blank.
   Keep the original SVG as the source of truth and rebuild the artwork. */
(function () {
  'use strict';

  function decodeEmbeddedCover(img) {
    if (!img) return;

    var originalSrc = img.dataset.coverOriginalSrc;
    if (!originalSrc) {
      originalSrc = img.getAttribute('src') || '';
      if (!/\.svg(?:\?|#|$)/i.test(originalSrc)) return;
      img.dataset.coverOriginalSrc = originalSrc;
    }

    if (img.dataset.coverFallbackRunning === '1') return;
    img.dataset.coverFallbackRunning = '1';

    fetch(originalSrc, { cache: 'no-store' })
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

        var oldBlobUrl = img.dataset.coverBlobUrl;
        if (oldBlobUrl && oldBlobUrl !== blobUrl) {
          try { URL.revokeObjectURL(oldBlobUrl); } catch (e) {}
        }
        img.dataset.coverBlobUrl = blobUrl;

        /* Keep this Blob URL alive while the page is cached by Safari. */
        img.src = blobUrl;
      })
      .catch(function () {
        /* If conversion fails, restore the real SVG rather than a blank src. */
        img.src = originalSrc;
      })
      .finally(function () {
        img.dataset.coverFallbackRunning = '0';
      });
  }

  function init() {
    document.querySelectorAll('#books .cover-art img').forEach(decodeEmbeddedCover);
  }

  function restoreCovers() {
    document.querySelectorAll('#books .cover-art img').forEach(function (img) {
      var originalSrc = img.dataset.coverOriginalSrc;
      if (originalSrc) {
        img.dataset.coverFallbackRunning = '0';
        img.src = originalSrc;
      }
    });
    init();
    setTimeout(init, 150);
    setTimeout(init, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('pageshow', restoreCovers, false);
  window.addEventListener('focus', restoreCovers, false);
})();
