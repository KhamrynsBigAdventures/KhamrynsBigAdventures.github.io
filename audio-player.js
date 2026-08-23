/* Khamryn's Big Adventures — persistent site soundtrack + seamless internal navigation */
(function(){
  'use strict';

  // Canonical GitHub Pages root. Do NOT use the old /Kharyms-big-adventures/ path.
  const SOURCE = 'https://khamrynsbigadventures.github.io/Khamryn%E2%80%99s%20Big%20Adventures%202.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_WAS_PLAYING = 'khamrynMusicPlaying';
  const KEY_VOLUME = 'khamrynMusicVolume';
  const PLAYER_ID = 'khamryn-music';
  const AUDIO_ID = 'khamryn-site-music';

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{position:fixed;right:16px;bottom:18px;z-index:9999;display:grid;place-items:center;width:64px;height:64px;border:1px solid rgba(255,217,120,.55);border-radius:50%;background:radial-gradient(circle at 35% 28%,rgba(164,126,255,.7),rgba(42,18,91,.96) 68%);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 28px rgba(164,126,255,.28);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    #khamryn-music button{width:100%;height:100%;padding:0;border:0;border-radius:50%;background:transparent;color:#ffd978;font-size:30px;line-height:1;cursor:pointer;display:grid;place-items:center;text-shadow:0 2px 8px rgba(0,0,0,.35);transition:transform .18s ease,filter .18s ease}
    #khamryn-music button:hover{transform:scale(1.06);filter:brightness(1.08)}
    #khamryn-music button:active{transform:scale(.94)}
    #khamryn-music.playing{box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 34px rgba(255,217,120,.38)}
    #khamryn-music.playing button{animation:khamrynRocketGlow 1.8s ease-in-out infinite}
    #khamryn-music .music-label{position:absolute;right:72px;bottom:8px;padding:7px 10px;border:1px solid rgba(255,217,120,.25);border-radius:12px;background:rgba(20,8,52,.92);color:#fff;font:700 10px Arial,sans-serif;white-space:nowrap;opacity:0;pointer-events:none;transform:translateX(5px);transition:opacity .2s ease,transform .2s ease;box-shadow:0 8px 22px rgba(0,0,0,.25)}
    #khamryn-music:hover .music-label,#khamryn-music:focus-within .music-label{opacity:1;transform:translateX(0)}
    @keyframes khamrynRocketGlow{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-2px) rotate(2deg)}}
    @media(max-width:520px){#khamryn-music{right:12px;bottom:12px;width:58px;height:58px}#khamryn-music button{font-size:27px}#khamryn-music .music-label{right:66px}}
  `;
  document.head.appendChild(style);

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
  bar.innerHTML = `<span class="music-label">Adventure Soundtrack · Five books. One journey.</span><button type="button" id="khamryn-play" aria-label="Play soundtrack" title="Play Khamryn's Adventure Soundtrack">🚀</button>`;
  document.body.appendChild(bar);
  const play = document.getElementById('khamryn-play');

  try{
    const saved = Number(sessionStorage.getItem(KEY_TIME));
    if(Number.isFinite(saved) && saved > 0) audio.currentTime = saved;
    const savedVolume = Number(localStorage.getItem(KEY_VOLUME));
    audio.volume = Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1 ? savedVolume : .72;
  }catch(e){ audio.volume = .72; }

  function updateButton(){
    const playing = !audio.paused;
    play.textContent = '🚀';
    play.setAttribute('aria-label', playing ? 'Pause soundtrack' : 'Play soundtrack');
    play.title = playing ? 'Pause Khamryn\'s Adventure Soundtrack' : 'Play Khamryn\'s Adventure Soundtrack';
    bar.classList.toggle('playing', playing);
  }

  async function startMusic(){
    try{
      await audio.play();
      try{
        sessionStorage.setItem(KEY_WAS_PLAYING,'1');
        localStorage.setItem(KEY_VOLUME,String(audio.volume));
      }catch(e){}
      updateButton();
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
  audio.addEventListener('error', ()=>{ play.textContent='🚀'; play.title='Soundtrack could not be loaded.'; });
  audio.addEventListener('timeupdate', ()=>{ try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime));}catch(e){} });
  audio.addEventListener('volumechange', ()=>{ try{localStorage.setItem(KEY_VOLUME,String(audio.volume));}catch(e){} });

  // Autoplay when the browser allows it. On iPhone/iPad, audio autoplay can be
  // blocked until the first user gesture; the first tap anywhere then starts it.
  function activate(){ startMusic(); }
  window.addEventListener('pointerdown', activate, {once:true, passive:true});
  window.addEventListener('touchstart', activate, {once:true, passive:true});
  window.addEventListener('keydown', activate, {once:true});
  startMusic();

  const navState = {busy:false};
  function isInternalLink(a){
    if(!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    const raw = a.getAttribute('href');
    if(!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return false;
    let url;
    try{url=new URL(raw,location.href);}catch(e){return false;}
    if(url.origin!==location.origin)return false;
    const path=url.pathname.split('/').pop() || 'index.html';
    return /\.html$/i.test(path) || path === '';
  }

  function sameDocumentHash(url){
    const currentFile=location.pathname.split('/').pop()||'index.html';
    const nextFile=url.pathname.split('/').pop()||'index.html';
    return currentFile.toLowerCase()===nextFile.toLowerCase() && !!url.hash;
  }

  function restorePersistentPlayer(newBody){
    const oldBody=document.body;
    oldBody.replaceWith(newBody);
    document.body.appendChild(audio);
    document.body.appendChild(bar);
  }

  function addMissingHeadAssets(nextDoc){
    nextDoc.head.querySelectorAll('link[rel="stylesheet"]').forEach(link=>{
      const href=link.href;
      if(!href)return;
      const already=Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).some(existing=>existing.href===href);
      if(!already){const copy=document.createElement('link');copy.rel='stylesheet';copy.href=href;document.head.appendChild(copy);}
    });
    nextDoc.head.querySelectorAll('style').forEach(sourceStyle=>{const copy=document.createElement('style');copy.textContent=sourceStyle.textContent;document.head.appendChild(copy);});
  }

  function runPageScripts(newBody){
    Array.from(newBody.querySelectorAll('script')).forEach(oldScript=>{
      const src=oldScript.getAttribute('src')||'';
      if(src.includes('audio-player.js'))return;
      const script=document.createElement('script');
      for(const attr of oldScript.attributes){if(attr.name!=='src')script.setAttribute(attr.name,attr.value);}
      if(src){script.src=src;script.async=false;}else{script.textContent=oldScript.textContent;}
      oldScript.replaceWith(script);
    });
  }

  async function navigate(url,push){
    if(navState.busy)return;
    navState.busy=true;
    try{
      const response=await fetch(url.href,{credentials:'same-origin'});
      if(!response.ok)throw new Error('Navigation failed');
      const nextDoc=new DOMParser().parseFromString(await response.text(),'text/html');
      addMissingHeadAssets(nextDoc);
      document.title=nextDoc.title||document.title;
      restorePersistentPlayer(nextDoc.body);
      runPageScripts(document.body);
      if(push)history.pushState({},'',url.href);else history.replaceState({},'',url.href);
      window.scrollTo({top:0,left:0,behavior:'instant'});
      if(url.hash)requestAnimationFrame(()=>{const target=document.querySelector(url.hash);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});});
    }catch(e){location.href=url.href;}
    finally{navState.busy=false;updateButton();}
  }

  document.addEventListener('click',e=>{
    const a=e.target.closest&&e.target.closest('a');
    if(!isInternalLink(a))return;
    const url=new URL(a.getAttribute('href'),location.href);
    if(sameDocumentHash(url)){
      e.preventDefault();
      const target=document.querySelector(url.hash);
      if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
      history.pushState({},'',url.href);
      return;
    }
    e.preventDefault();
    if(audio.paused&&sessionStorage.getItem(KEY_WAS_PLAYING)==='1')startMusic();
    navigate(url,true);
  });

  window.addEventListener('popstate',()=>navigate(new URL(location.href),false));
  window.addEventListener('pagehide',()=>{try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime));sessionStorage.setItem(KEY_WAS_PLAYING,audio.paused?'0':'1');}catch(e){}});
  updateButton();
})();
