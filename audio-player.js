/* Khamryn's Big Adventures — persistent site soundtrack */
(function(){
  const SOURCE = 'audio/khamryn-big-adventures.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_WAS_PLAYING = 'khamrynMusicPlaying';
  const KEY_MUTED = 'khamrynMusicMuted';

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{position:fixed;right:14px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(20,10,55,.82);backdrop-filter:blur(14px);box-shadow:0 10px 30px rgba(0,0,0,.28);color:#fff;font:700 12px Arial,sans-serif}
    #khamryn-music button{border:0;border-radius:999px;background:#ffd978;color:#170a3b;font:900 13px Arial,sans-serif;padding:8px 12px;cursor:pointer}
    #khamryn-music .label{opacity:.9;white-space:nowrap}
    #khamryn-music .volume{width:70px;accent-color:#ffd978}
    @media(max-width:520px){#khamryn-music{right:10px;bottom:10px}.volume{display:none!important}.label{max-width:105px;overflow:hidden;text-overflow:ellipsis}}
  `;
  document.head.appendChild(style);

  const audio = document.createElement('audio');
  audio.id = 'khamryn-site-music';
  audio.src = SOURCE;
  audio.preload = 'auto';
  audio.loop = true;
  audio.playsInline = true;
  audio.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack");
  audio.volume = .72;
  document.body.appendChild(audio);

  const bar = document.createElement('div');
  bar.id = 'khamryn-music';
  bar.innerHTML = `<span class="label">🎵 Khamryn's soundtrack</span><button type="button" id="khamryn-play">▶ Play</button><input class="volume" id="khamryn-volume" type="range" min="0" max="1" step=".01" value=".72" aria-label="Music volume">`;
  document.body.appendChild(bar);

  const play = document.getElementById('khamryn-play');
  const volume = document.getElementById('khamryn-volume');

  try {
    const saved = Number(sessionStorage.getItem(KEY_TIME));
    if (Number.isFinite(saved) && saved > 0) audio.currentTime = saved;
    if (sessionStorage.getItem(KEY_MUTED) === '1') audio.muted = true;
  } catch(e) {}

  function updateButton(){ play.textContent = audio.paused ? '▶ Play' : '❚❚ Pause'; }
  async function startMusic(){
    try{
      await audio.play();
      try{ sessionStorage.setItem(KEY_WAS_PLAYING,'1'); }catch(e){}
      updateButton();
    }catch(e){ updateButton(); }
  }

  play.addEventListener('click', startMusic);
  volume.addEventListener('input', ()=>{ audio.volume = Number(volume.value); audio.muted = false; try{sessionStorage.setItem(KEY_MUTED,'0')}catch(e){} });
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('timeupdate', ()=>{ try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime))}catch(e){} });

  // Browsers block audible autoplay until the visitor interacts. The first
  // tap/click anywhere on the site becomes the activation gesture.
  let activated = false;
  function activate(){ if(activated) return; activated=true; startMusic(); }
  window.addEventListener('pointerdown', activate, {once:true, passive:true});
  window.addEventListener('keydown', activate, {once:true});

  // Try immediately too; this succeeds on browsers/domains that already
  // permit autoplay and harmlessly fails where a gesture is required.
  startMusic();

  // Preserve the position across normal page-to-page navigation.
  window.addEventListener('pagehide', ()=>{ try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime)); sessionStorage.setItem(KEY_WAS_PLAYING,audio.paused?'0':'1')}catch(e){} });
})();
