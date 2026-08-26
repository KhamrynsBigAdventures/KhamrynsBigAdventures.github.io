/* Khamryn's Big Adventures — soundtrack
   Keep normal browser navigation intact. The previous version intercepted
   every internal HTML link and performed SPA body swaps; that caused Safari
   to return to the homepage with stale/missing book-cover state.
   The website now uses normal page navigation so every live link opens the
   actual destination reliably. */
(function () {
  'use strict';
  const SOURCE = 'https://khamrynsbigadventures.github.io/Khamryn%E2%80%99s%20Big%20Adventures%202.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_VOLUME = 'khamrynMusicVolume';

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{position:fixed;right:16px;bottom:18px;z-index:9999;display:grid;place-items:center;width:64px;height:64px;border:1px solid rgba(255,212,71,.72);border-radius:50%;background:radial-gradient(circle at 35% 28%,rgba(73,185,107,.82),rgba(22,103,168,.98) 58%,rgba(8,45,79,.99) 82%);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 28px rgba(73,185,107,.34);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    #khamryn-music button{width:100%;height:100%;padding:0;border:0;border-radius:50%;background:transparent;color:#ffd447;font-size:30px;line-height:1;cursor:pointer;display:grid;place-items:center;text-shadow:0 2px 8px rgba(0,0,0,.35)}
    #khamryn-music.playing button{animation:khamrynRocketGlow 1.8s ease-in-out infinite}
    #khamryn-music .music-label{position:absolute;right:72px;bottom:8px;padding:7px 10px;border:1px solid rgba(255,212,71,.3);border-radius:12px;background:rgba(8,45,79,.94);color:#fff9e8;font:700 10px Arial,sans-serif;white-space:nowrap;opacity:0;pointer-events:none;transform:translateX(5px);transition:opacity .2s ease,transform .2s ease}
    #khamryn-music:hover .music-label,#khamryn-music:focus-within .music-label{opacity:1;transform:translateX(0)}
    @keyframes khamrynRocketGlow{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-2px) rotate(2deg)}}
    @media(max-width:520px){#khamryn-music{right:12px;bottom:12px;width:58px;height:58px}#khamryn-music button{font-size:27px}#khamryn-music .music-label{right:66px}}
  `;
  document.head.appendChild(style);

  if (document.getElementById('khamryn-site-music')) return;

  const audio = document.createElement('audio');
  audio.id = 'khamryn-site-music';
  audio.src = SOURCE;
  audio.preload = 'auto';
  audio.loop = true;
  audio.playsInline = true;
  audio.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack");
  document.body.appendChild(audio);

  const bar = document.createElement('div');
  bar.id = 'khamryn-music';
  bar.innerHTML = `<span class="music-label">Adventure Soundtrack · Five books. One journey.</span><button type="button" id="khamryn-play" aria-label="Play soundtrack" title="Play Khamryn's Adventure Soundtrack">🚀</button>`;
  document.body.appendChild(bar);
  const play = document.getElementById('khamryn-play');

  try {
    const savedTime = Number(sessionStorage.getItem(KEY_TIME));
    if (Number.isFinite(savedTime) && savedTime > 0) audio.currentTime = savedTime;
    const savedVolume = Number(localStorage.getItem(KEY_VOLUME));
    audio.volume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1 ? savedVolume : .72;
  } catch (e) { audio.volume = .72; }

  function updateButton() {
    const playing = !audio.paused;
    play.setAttribute('aria-label', playing ? 'Pause soundtrack' : 'Play soundtrack');
    play.title = playing ? "Pause Khamryn's Adventure Soundtrack" : "Play Khamryn's Adventure Soundtrack";
    bar.classList.toggle('playing', playing);
  }

  async function startMusic() {
    try { await audio.play(); } catch (e) {}
    updateButton();
  }

  play.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (audio.paused) startMusic(); else audio.pause();
  });
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('playing', updateButton);
  audio.addEventListener('timeupdate', function () {
    try { sessionStorage.setItem(KEY_TIME, String(audio.currentTime)); } catch (e) {}
  });
  audio.addEventListener('volumechange', function () {
    try { localStorage.setItem(KEY_VOLUME, String(audio.volume)); } catch (e) {}
  });
  window.addEventListener('pagehide', function () {
    try { sessionStorage.setItem(KEY_TIME, String(audio.currentTime)); } catch (e) {}
  });

  window.addEventListener('pointerdown', function () { if (audio.paused) startMusic(); }, { once: true, passive: true });
  window.addEventListener('touchstart', function () { if (audio.paused) startMusic(); }, { once: true, passive: true });
  window.addEventListener('keydown', function () { if (audio.paused) startMusic(); }, { once: true });
  updateButton();
  startMusic();
})();
