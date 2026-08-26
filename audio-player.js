/* Khamryn's Big Adventures — soundtrack temporarily muted */
(function () {
  'use strict';

  // Soundtrack is intentionally disabled while licensing is being verified.
  // The games and website remain fully playable without it.
  const oldAudio = document.getElementById('khamryn-site-music');
  const oldBar = document.getElementById('khamryn-music');
  if (oldAudio) {
    try { oldAudio.pause(); oldAudio.removeAttribute('src'); oldAudio.load(); } catch (e) {}
    oldAudio.remove();
  }
  if (oldBar) oldBar.remove();
})();
