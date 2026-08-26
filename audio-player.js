/* Khamryn's Big Adventures — persistent soundtrack */
(function () {
  'use strict';
  const SOURCE = 'https://khamrynsbigadventures.github.io/Khamryn%E2%80%99s%20Big%20Adventures%202.mp3';
  const KEY_TIME = 'khamrynMusicTime';
  const KEY_VOLUME = 'khamrynMusicVolume';
  const PLAYER_SCRIPT_RE = /(^|\/)audio-player\.js(?:\?|$)/i;

  const style = document.createElement('style');
  style.textContent = `
    #khamryn-music{position:fixed;right:16px;bottom:18px;z-index:99999;display:grid;place-items:center;width:64px;height:64px;border:1px solid rgba(255,212,71,.72);border-radius:50%;background:radial-gradient(circle at 35% 28%,rgba(73,185,107,.82),rgba(22,103,168,.98) 58%,rgba(8,45,79,.99) 82%);box-shadow:0 10px 28px rgba(0,0,0,.35),0 0 28px rgba(73,185,107,.34);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
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
  audio.id = 'khamryn-site-music'; audio.src = SOURCE; audio.preload = 'auto'; audio.loop = true; audio.playsInline = true;
  audio.setAttribute('aria-label', "Khamryn's Big Adventures soundtrack"); document.body.appendChild(audio);

  const bar = document.createElement('div'); bar.id = 'khamryn-music';
  bar.innerHTML = `<span class="music-label">Adventure Soundtrack · Five books. One journey.</span><button type="button" id="khamryn-play" aria-label="Play soundtrack" title="Play Khamryn's Adventure Soundtrack">🚀</button>`;
  document.body.appendChild(bar); const play = document.getElementById('khamryn-play');

  try {
    const t=Number(sessionStorage.getItem(KEY_TIME)); if(Number.isFinite(t)&&t>0) audio.currentTime=t;
    const v=Number(localStorage.getItem(KEY_VOLUME)); audio.volume=Number.isFinite(v)&&v>=0&&v<=1?v:.72;
  } catch(e){audio.volume=.72;}
  function updateButton(){const playing=!audio.paused;play.setAttribute('aria-label',playing?'Pause soundtrack':'Play soundtrack');play.title=playing?"Pause Khamryn's Adventure Soundtrack":"Play Khamryn's Adventure Soundtrack";bar.classList.toggle('playing',playing)}
  async function startMusic(){try{await audio.play()}catch(e){}updateButton()}

  /* Live-site launcher for Winning Play. The page currently has an empty #gameArea,
     so this creates the actual playable game when START THE ADVENTURE is tapped. */
  function initWinningPlayGame(){
    const area=document.getElementById('gameArea'),start=document.querySelector('.start-game'),progress=document.getElementById('progress'),pop=document.getElementById('footballPop');
    if(!area||!start||!progress||area.dataset.wpBound==='true')return;
    area.dataset.wpBound='true';
    const questions=[
      {q:'Khamryn wants the Cowboys to win the championship. What is the best way to help a team reach a big goal?',a:['Everyone works together','One player does everything','Only the coach works','Players stop practicing'],c:'Everyone works together'},
      {q:'Khamryn first thinks he has to carry the team by himself. What does he learn?',a:['Football is a team sport','He should never pass','Practice does not matter','Teammates slow him down'],c:'Football is a team sport'},
      {q:'Coach G and Josiah help Khamryn understand the value of what?',a:['Trusting his teammates','Playing alone','Skipping practice','Winning every play himself'],c:'Trusting his teammates'},
      {q:'The Cowboys are getting ready for the championship. Which choice shows good team-player behavior?',a:['Practice and encourage your teammates','Ignore the team','Keep every play to yourself','Give up when a play is hard'],c:'Practice and encourage your teammates'},
      {q:'Khamryn has the ball and sees a teammate open for a big play. What should a team player think about?',a:['How the team can make the best play','How to keep the ball no matter what','How to avoid passing','How to stop the play'],c:'How the team can make the best play'},
      {q:'In the final game, what is Khamryn’s winning play?',a:['He passes the touchdown to Josiah','He leaves the game','He tries to win without his teammates','He stops the play'],c:'He passes the touchdown to Josiah'}
    ];
    let index=0,locked=false;
    function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
    function burst(){for(let i=0;i<18;i++){const s=document.createElement('span');s.className='ball-burst show';s.textContent=i%3===0?'⭐':'🏈';const ang=Math.random()*Math.PI*2,d=85+Math.random()*300;s.style.setProperty('--x',Math.cos(ang)*d+'px');s.style.setProperty('--y',Math.sin(ang)*d+'px');s.style.setProperty('--r',(Math.random()*720-360)+'deg');s.style.animationDelay=Math.random()*120+'ms';document.body.appendChild(s);setTimeout(()=>s.remove(),1050)}}
    function celebrate(){if(pop){pop.classList.remove('show');void pop.offsetWidth;pop.classList.add('show')}burst()}
    function render(){locked=false;const item=questions[index];progress.textContent=index+' / '+questions.length;area.innerHTML='<div class="question-number">Play '+(index+1)+' of '+questions.length+'</div><h2 class="question">'+item.q+'</h2><div class="answers" id="answers"></div><div class="feedback" id="feedback" aria-live="polite"></div><button class="next" id="next" type="button" hidden>Next Play →</button>';const box=document.getElementById('answers');shuffle(item.a).forEach(text=>{const b=document.createElement('button');b.className='answer';b.type='button';b.textContent=text;b.addEventListener('click',()=>choose(b,text,item));box.appendChild(b)});area.scrollIntoView({behavior:'smooth',block:'start'})}
    function choose(btn,text,item){if(locked)return;const f=document.getElementById('feedback');if(text!==item.c){btn.classList.add('wrong');f.textContent='Not quite! Take another look at the play and try again. 🏈';return}locked=true;document.querySelectorAll('#answers .answer').forEach(b=>b.disabled=true);btn.classList.add('correct');progress.textContent=(index+1)+' / '+questions.length;celebrate();if(index===questions.length-1){f.textContent='THAT’S THE WINNING PLAY! TOUCHDOWN! 🏈🏆';showFinal()}else{f.textContent='Great play! You trusted your team. 🏈';const next=document.getElementById('next');next.hidden=false;next.onclick=()=>{index++;render()}}}
    function showFinal(){area.innerHTML='<div class="question-number">Championship Play</div><h2 class="win-title">TOUCHDOWN! 🏈</h2><div class="final-field run"><div class="final-lines"></div><div class="touchdown-zone">TOUCHDOWN</div><div class="runner" aria-label="Khamryn running the football">🏃🏾‍♂️</div><div class="final-football">🏈</div></div><div class="feedback win">Khamryn made the winning play with his team!</div><div class="book-reveal show"><h2 class="win-title">Khamryn’s Winning Play</h2><p class="copy">You made the winning play. Now discover the full story.</p><a class="book-btn" href="winning-play-book.html">GET THE BOOK →</a></div>';progress.textContent=questions.length+' / '+questions.length;area.scrollIntoView({behavior:'smooth',block:'start'})}
    start.addEventListener('click',function(e){e.preventDefault();startMusic();render()});
  }

  play.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(audio.paused)startMusic();else audio.pause()});
  audio.addEventListener('play',updateButton); audio.addEventListener('pause',updateButton); audio.addEventListener('playing',updateButton);
  audio.addEventListener('timeupdate',function(){try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime))}catch(e){}});
  audio.addEventListener('volumechange',function(){try{localStorage.setItem(KEY_VOLUME,String(audio.volume))}catch(e){}});
  window.addEventListener('pagehide',function(){try{sessionStorage.setItem(KEY_TIME,String(audio.currentTime))}catch(e){}});

  function isInternalHtmlLink(a){if(!a||!a.href||a.target==='_blank'||a.hasAttribute('download'))return false;const url=new URL(a.href,location.href);return url.origin===location.origin&&url.pathname.endsWith('.html')}
  async function loadPage(url,push){
    const response=await fetch(url,{credentials:'same-origin'});if(!response.ok)throw new Error('Page request failed: '+response.status);const html=await response.text();const doc=new DOMParser().parseFromString(html,'text/html');
    const preservedAudio=audio,preservedBar=bar;Array.from(document.body.children).forEach(el=>{if(el!==preservedAudio&&el!==preservedBar)el.remove()});document.title=doc.title||document.title;
    const headNodes=Array.from(doc.head.children);Array.from(document.head.children).forEach(el=>{if(el!==style&&!PLAYER_SCRIPT_RE.test(el.getAttribute('src')||''))el.remove()});headNodes.forEach(node=>{if(node.tagName==='SCRIPT'&&PLAYER_SCRIPT_RE.test(node.getAttribute('src')||''))return;document.head.appendChild(document.importNode(node,true))});if(!document.head.contains(style))document.head.appendChild(style);
    Array.from(doc.body.childNodes).forEach(node=>{if(node.nodeType===Node.ELEMENT_NODE&&node.tagName==='SCRIPT')return;document.body.appendChild(document.importNode(node,true))});document.body.appendChild(preservedAudio);document.body.appendChild(preservedBar);
    for(const oldScript of Array.from(doc.body.querySelectorAll('script'))){if(PLAYER_SCRIPT_RE.test(oldScript.src||''))continue;const s=document.createElement('script');for(const attr of oldScript.attributes)s.setAttribute(attr.name,attr.value);if(oldScript.src){await new Promise(resolve=>{s.onload=resolve;s.onerror=resolve;document.body.appendChild(s)})}else{s.textContent=oldScript.textContent;document.body.appendChild(s)}}
    initWinningPlayGame();if(push)history.pushState({musicPage:true},'',url);window.scrollTo(0,0);updateButton()
  }
  document.addEventListener('click',function(e){const a=e.target.closest&&e.target.closest('a');if(!isInternalHtmlLink(a))return;const url=new URL(a.href,location.href);if(url.pathname===location.pathname&&url.search===location.search)return;e.preventDefault();startMusic();loadPage(url.href,true).catch(()=>{location.href=url.href})},true);
  window.addEventListener('popstate',function(){loadPage(location.href,false).catch(()=>location.reload())});
  window.addEventListener('pointerdown',function(){if(audio.paused)startMusic()},{once:true,passive:true});
  window.addEventListener('touchstart',function(){if(audio.paused)startMusic()},{once:true,passive:true});
  window.addEventListener('keydown',function(){if(audio.paused)startMusic()},{once:true});
  updateButton();startMusic();initWinningPlayGame();
})();
