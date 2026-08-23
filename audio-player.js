/* Khamryn's Big Adventures — persistent site soundtrack */
(function(){
  // The uploaded soundtrack is currently stored in the repo root with a colon in its filename.
  const SOURCE = './audio%3Akhamryn-site.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_WAS_PLAYING = 'khamrynMusicPlaying';
  const KEY_VOLUME = 'khamrynMusicVolume';

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{
      position:fixed;right:14px;bottom:16px;z-index:9999;
      display:flex;align-items:center;gap:9px;
      padding:7px 8px 7px 12px;
      border:1px solid rgba(255,217,120,.38);
      border-radius:999px;
      background:linear-gradient(135deg,rgba(29,14,75,.94),rgba(64,35,126,.9));
      backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);
      box-shadow:0 10px 30px rgba(0,0,0,.3),0 0 24px rgba(157,111,255,.16);
      color:#fff;
      font:700 12px Arial,sans-serif;
    }
    #khamryn-music .music-mark{
      width:27px;height:27px;display:grid;place-items:center;
      border:1px solid rgba(255,217,120,.5);border-radius:50%;
      color:#ffd978;font-size:13px;
      background:radial-gradient(circle at 35% 30%,rgba(164,126,255,.55),rgba(29,14,75,.7));
      box-shadow:inset 0 0 10px rgba(255,217,120,.08);
    }
    #khamryn-music .label{
      display:flex;flex-direction:column;line-height:1.05;gap:2px;
      min-width:108px;white-space:nowrap;
    }
    #khamryn-music .label strong{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#ffd978}
    #khamryn-music .label span{font-size:10px;opacity:.78}
    #khamryn-music button{
      border:0;border-radius:999px;
      background:#ffd978;color:#170a3b;
      font:900 12px Arial,sans-serif;
      padding:9px 12px;cursor:pointer;
      box-shadow:0 4px 12px rgba(0,0,0,.18);
    }
    #khamryn-music button:active{transform:scale(.97)}
    #khamryn-music .volume{display:none}
    @media(max-width:520px){
      #khamryn-music{right:10px;bottom:10px;padding:6px 7px 6px 9px;gap:7px}
      #khamryn-music .label{min-width:92px}
      #khamryn-music .label strong{font-size:10px}
      #khamryn-music .label span{font-size:9px}
      #khamryn-music button{padding:8px 10px}
    }
  `;
  document.head.appendChild(style);

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
  bar.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack controls");
  bar.innerHTML = `
    <span class="music-mark" aria-hidden="true">✦</span>
    <span class="label"><strong>Adventure Soundtrack</strong><span>Five books. One journey.</span></span>
    <button type="button" id="khamryn-play">▶ Play</button>
  `;
  document.body.appendChild(bar);

  const play = document.getElementById('khamryn-play');

  try{
    const saved = Number(sessionStorage.getItem(KEY_TIME));
    if(Number.isFinite(saved) && saved > 0) audio.currentTime = saved;
    const savedVolume = Number(localStorage.getItem(KEY_VOLUME));
    audio.volume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1 ? savedVolume : .72;
  }catch(e){ audio.volume = .72; }

  function updateButton(){
    play.textContent = audio.paused ? '▶ Play' : '❚❚ Pause';
    play.setAttribute('aria-label', audio.paused ? 'Play soundtrack' : 'Pause soundtrack');
  }

  async function startMusic(){
    try{
      await audio.play();
      try{sessionStorage.setItem(KEY_WAS_PLAYING,'1')}catch(e){}
      updateButton();
    }catch(e){
      updateButton();
    }
  }

  play.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    if(audio.paused) startMusic(); else audio.pause();
  });

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('error', function(){
    play.textContent = '▶ Play';
    play.title = 'Soundtrack file is not available yet.';
  });
  audio.addEventListener('timeupdate', ()=>{
    try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime))}catch(e){}
  });

  let activated = false;
  function activate(){
    if(activated) return;
    activated = true;
    startMusic();
  }
  window.addEventListener('pointerdown', activate, {once:true, passive:true});
  window.addEventListener('keydown', activate, {once:true});

  startMusic();

  window.addEventListener('pagehide', ()=>{
    try{
      sessionStorage.setItem(KEY_TIME,String(audio.currentTime));
      sessionStorage.setItem(KEY_WAS_PLAYING,audio.paused?'0':'1');
    }catch(e){}
  });

  updateButton();
})();
