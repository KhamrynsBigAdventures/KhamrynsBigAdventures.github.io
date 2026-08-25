/* Khamryn's Big Adventures — reliable cover renderer
   Some iOS/Safari versions do not render the supplied SVG covers when the
   SVG contains an embedded JPEG data URI. Decode the supplied cover artwork
   to its original JPEG at runtime so the live site shows the real covers. */
(function () {
  'use strict';

  function decodeEmbeddedCover(img) {
    if (!img || !img.src || !/\.svg(?:\?|#|$)/i.test(img.src)) return;

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
        /* Leave the original image in place if the fallback cannot run. */
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
})();
