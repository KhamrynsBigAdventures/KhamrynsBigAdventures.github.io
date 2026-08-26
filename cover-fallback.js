/* Khamryn's Big Adventures — cover safety
   Keep the real SVG cover as the source of truth.
   Never replace it with a Blob URL: Safari/iOS can restore a cached page
   with a stale Blob URL and leave the cover area blank. */
(function () {
  'use strict';

  function rememberAndRestore() {
    document.querySelectorAll('#books .cover-art img').forEach(function (img) {
      var original = img.getAttribute('data-cover-src');
      if (!original) {
        original = img.getAttribute('src') || '';
        if (!/\.svg(?:\?|#|$)/i.test(original)) return;
        img.setAttribute('data-cover-src', original);
      }
      if (img.getAttribute('src') !== original) {
        img.setAttribute('src', original);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rememberAndRestore, { once: true });
  } else {
    rememberAndRestore();
  }

  window.addEventListener('pageshow', function () {
    rememberAndRestore();
    setTimeout(rememberAndRestore, 100);
    setTimeout(rememberAndRestore, 500);
  });
})();
