/* Khamryn's Big Adventures — persistent site soundtrack + seamless internal navigation */
(function(){
  'use strict';

  const SOURCE = './Khamryn%E2%80%99s%20Big%20Adventures%202.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_WAS_PLAYING = 'khamrynMusicPlaying';
  const KEY_VOLUME = 'khamrynMusicVolume';
  const PLAYER_ID = 'khamryn-music';
  const AUDIO_ID = 'khamryn-site-music';

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{position:fixed;right:14px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:9px;padding:7px 8px 7px 12px;border:1px solid rgba(255,217,120,.38);border-radius:999px;background:linear-gradient(135deg,rgba(29,14,75,.94),rgba(64,35,126,.9));backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 10px 30px rgba(0,0,0,.3),0 0 24px rgba(157,111,255,.16);color:#fff;font:700 12px Arial,sans-serif}
    #khamryn-music .music-mark{width:27px;height:27px;display:grid;place-items:center;border:1px solid rgba(255,217,120,.5);border-radius:50%;color:#ffd978;font-size:13px;background:radial-gradient(circle at 35% 30%,rgba(164,126,255,.55),rgba(29,14,75,.7));box-shadow:inset 0 0 10px rgba(255,217,120,.08)}
    #khamryn-music .label{display:flex;flex-direction:column;line-height:1.05;gap:2px;min-width:108px;white-space:nowrap}
    #khamryn-music .label strong{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#ffd978}
    #khamryn-music .label span{font-size:10px;opacity:.78}
    #khamryn-music button{border:0;border-radius:999px;background:#ffd978;color:#170a3b;font:900 12px Arial,sans-serif;padding:9px 12px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.18)}
    #khamryn-music button:active{transform:scale(.97)}
    @media(max-width:520px){#khamryn-music{right:10px;bottom:10px;padding:6px 7px 6px 9px;gap:7px}#khamryn-music .label{min-width:92px}#khamryn-music .label strong{font-size:10px}#khamryn-music .label span{font-size:9px}#khamryn-music button{padding:8px 10px}}
  `;
  document.head.appendChild(style);

  // Create the player only once. This same document stays alive while
  // internal pages are swapped in, so the song never has to restart.
  const audio = document.createElement('audio');
  audio.id = AUDIO_ID;
  audio.src = SOURCE;
  audio.preload = 'auto';
  audio.loop = true;
  audio.playsInline = true;
  audio.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack");
  document.body.appendChild(audio);

  const bar = document.createElement('div');
  bar.id = PLAYER_ID;
  bar.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack controls");
  bar.innerHTML = `<span class="music-mark" aria-hidden="true">✦</span><span class="label"><strong>Adventure Soundtrack</strong><span>Five books. One journey.</span></span><button type="button" id="khamryn-play">▶ Play</button>`;
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
      // IMPORTANT: do not call audio.load() here. load() resets the media
      // element and can abort the play() promise on iPhone/Safari.
      await audio.play();
      try{
        sessionStorage.setItem(KEY_WAS_PLAYING,'1');
        localStorage.setItem(KEY_VOLUME,String(audio.volume));
      }catch(e){}
      return true;
    }catch(e){
      updateButton();
      return false;
    }
  }

  play.addEventListener('click', e=>{
    e.preventDefault();
    e.stopPropagation();
    if(audio.paused) startMusic();
    else audio.pause();
  });

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('playing', updateButton);
  audio.addEventListener('error', ()=>{
    play.textContent = '▶ Play';
    play.title = 'Soundtrack could not be loaded.';
  });
  audio.addEventListener('timeupdate', ()=>{
    try{ sessionStorage.setItem(KEY_TIME,String(audio.currentTime)); }catch(e){}
  });
  audio.addEventListener('volumechange', ()=>{
    try{ localStorage.setItem(KEY_VOLUME,String(audio.volume)); }catch(e){}
  });

  // iPhone/Safari may block autoplay until the visitor interacts with the
  // site. The first real tap anywhere is therefore allowed to start it.
  function activate(){ startMusic(); }
  window.addEventListener('pointerdown', activate, {once:true, passive:true});
  window.addEventListener('keydown', activate, {once:true});

  // Try autoplay, but never pretend it worked if the browser blocks it.
  startMusic();

  /*
   * Seamless internal navigation.
   * Normal <a href="game.html"> navigation destroys the document and its
   * <audio> element. That is why the old player stopped whenever a visitor
   * opened another screen. We intercept same-site HTML links, fetch the next
   * page, swap its body into the current document, and KEEP this audio element.
   */
  const navState = {busy:false};
  const INTERNAL = /^(?:index\.html|game\.html|connect\.html)(?:#.*)?$/i;

  function isInternalLink(a){
    if(!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    const raw = a.getAttribute('href');
    if(!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return false;
    let url;
    try{ url = new URL(raw, location.href); }catch(e){ return false; }
    return url.origin === location.origin && INTERNAL.test(url.pathname.split('/').pop() + url.hash);
  }

  function sameDocumentHash(url){
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    const nextFile = url.pathname.split('/').pop() || 'index.html';
    return currentFile.toLowerCase() === nextFile.toLowerCase() && !!url.hash;
  }

  function restorePersistentPlayer(newBody){
    const oldBody = document.body;
    oldBody.replaceWith(newBody);
    document.body.appendChild(audio);
    document.body.appendChild(bar);
  }

  function addMissingHeadAssets(nextDoc){
    nextDoc.head.querySelectorAll('link[rel="stylesheet"]').forEach(link=>{
      const href = link.href;
      if(!href) return;
      const already = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).some(existing=>existing.href === href);
      if(!already){
        const copy = document.createElement('link');
        copy.rel = 'stylesheet';
        copy.href = href;
        document.head.appendChild(copy);
      }
    });

    nextDoc.head.querySelectorAll('style').forEach(sourceStyle=>{
      const copy = document.createElement('style');
      copy.textContent = sourceStyle.textContent;
      document.head.appendChild(copy);
    });
  }

  function runPageScripts(newBody){
    const scripts = Array.from(newBody.querySelectorAll('script'));
    scripts.forEach(oldScript=>{
      const src = oldScript.getAttribute('src') || '';
      // audio-player.js is intentionally NOT re-run; its audio element is
      // the persistent element we are preserving.
      if(src.includes('audio-player.js')) return;

      const script = document.createElement('script');
      for(const attr of oldScript.attributes){
        if(attr.name !== 'src') script.setAttribute(attr.name, attr.value);
      }
      if(src){
        script.src = src;
        script.async = false;
      }else{
        script.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(script);
    });
  }

  async function navigate(url, push){
    if(navState.busy) return;
    navState.busy = true;
    try{
      const response = await fetch(url.href, {credentials:'same-origin'});
      if(!response.ok) throw new Error('Navigation failed');
      const html = await response.text();
      const parser = new DOMParser();
      const nextDoc = parser.parseFromString(html,'text/html');

      addMissingHeadAssets(nextDoc);
      document.title = nextDoc.title || document.title;
      const nextBody = nextDoc.body;
      restorePersistentPlayer(nextBody);
      runPageScripts(document.body);

      if(push) history.pushState({},'',url.href);
      else history.replaceState({},'',url.href);

      window.scrollTo({top:0,left:0,behavior:'instant'});
      if(url.hash){
        requestAnimationFrame(()=>{
          const target = document.querySelector(url.hash);
          if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        });
      }
    }catch(e){
      // If a future page is not compatible with the seamless loader, use
      // ordinary navigation rather than trapping the visitor.
      location.href = url.href;
    }finally{
      navState.busy = false;
      updateButton();
    }
  }

  document.addEventListener('click', e=>{
    const a = e.target.closest && e.target.closest('a');
    if(!isInternalLink(a)) return;
    const url = new URL(a.getAttribute('href'), location.href);

    if(sameDocumentHash(url)){
      e.preventDefault();
      const target = document.querySelector(url.hash);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      history.pushState({},'',url.href);
      return;
    }

    e.preventDefault();
    // This tap is also a legitimate user gesture, so if music was paused by
    // the browser we make one immediate attempt to resume it.
    if(audio.paused && sessionStorage.getItem(KEY_WAS_PLAYING) === '1') startMusic();
    navigate(url,true);
  });

  window.addEventListener('popstate',()=>{
    const url = new URL(location.href);
    navigate(url,false);
  });

  window.addEventListener('pagehide',()=>{
    try{
      sessionStorage.setItem(KEY_TIME,String(audio.currentTime));
      sessionStorage.setItem(KEY_WAS_PLAYING,audio.paused ? '0' : '1');
    }catch(e){}
  });

  updateButton();
})();
