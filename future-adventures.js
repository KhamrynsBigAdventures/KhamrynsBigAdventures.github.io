/* Khamryn's Big Adventures — future-adventure moon portal. */
(function () {
  'use strict';

  function initFutureAdventurePortal() {
    const orbit = document.querySelector('.hero-orbit');
    const core = document.querySelector('.hero-core');
    if (!orbit || !core || document.querySelector('.future-adventure-moon')) return;

    core.outerHTML = `
      <button class="future-adventure-moon" type="button" aria-label="Open the future adventure ideas">
        <span class="moon-glow" aria-hidden="true"></span>
        <span class="moon-craters" aria-hidden="true"></span>
        <span class="moon-star" aria-hidden="true">✦</span>
        <strong>WHAT ADVENTURE<br>SHOULD KHAMRYN<br>EXPLORE NEXT?</strong>
        <small>TAP THE MOON TO IMAGINE IT</small>
        <span class="moon-rock-burst" aria-hidden="true">
          <i>◆</i><i>✦</i><i>●</i><i>◆</i><i>✧</i><i>●</i><i>✦</i><i>◆</i>
        </span>
        <span class="moon-crack moon-crack-one" aria-hidden="true"></span>
        <span class="moon-crack moon-crack-two" aria-hidden="true"></span>
        <span class="moon-crack moon-crack-three" aria-hidden="true"></span>
      </button>`;

    const moon = orbit.querySelector('.future-adventure-moon');
    moon.addEventListener('click', function () {
      if (moon.classList.contains('moon-exploding')) return;
      moon.classList.add('moon-exploding');
      orbit.classList.add('moon-portal-opening');
      window.setTimeout(function () {
        window.location.href = 'future-adventure.html';
      }, 1250);
    });
  }

  function addStyles() {
    if (document.getElementById('future-adventure-styles')) return;
    const style = document.createElement('style');
    style.id = 'future-adventure-styles';
    style.textContent = `
      .future-adventure-moon{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;width:clamp(190px,20vw,270px);height:clamp(190px,20vw,270px);margin:0;border:3px solid #ffd447;border-radius:50%;background:radial-gradient(circle at 34% 25%,#8ee6d1 0,#31b8aa 32%,#087c89 63%,#075077 100%);color:#073b59;box-shadow:0 0 0 10px rgba(255,212,71,.10),0 0 70px rgba(49,184,170,.45),inset -24px -28px 40px rgba(0,38,75,.28);cursor:pointer;overflow:visible;z-index:12;transition:transform .35s ease,box-shadow .35s ease}.future-adventure-moon:hover,.future-adventure-moon:focus-visible{transform:translate(-50%,-50%) scale(1.045);box-shadow:0 0 0 14px rgba(255,212,71,.13),0 0 85px rgba(49,184,170,.62),inset -24px -28px 40px rgba(0,38,75,.28);outline:3px solid #ffd447;outline-offset:5px}.future-adventure-moon strong{position:relative;z-index:4;font-family:Georgia,serif;font-size:clamp(.82rem,1.2vw,1.08rem);line-height:1.18;letter-spacing:.04em;text-align:center;text-shadow:0 1px rgba(255,255,255,.6)}.future-adventure-moon small{position:relative;z-index:4;margin-top:10px;font-size:.55rem;font-weight:900;letter-spacing:.13em}.moon-star{position:absolute;z-index:5;top:18%;right:21%;color:#fff4a8;font-size:1.25rem;animation:moonTwinkle 1.8s ease-in-out infinite}.moon-glow{position:absolute;inset:-18px;border-radius:50%;border:1px dashed rgba(255,255,255,.38);animation:moonSpin 14s linear infinite}.moon-craters:before,.moon-craters:after{content:'';position:absolute;border-radius:50%;background:rgba(0,70,95,.16)}.moon-craters:before{width:34px;height:34px;left:20%;top:24%;box-shadow:65px 55px 0 10px rgba(0,70,95,.12),-20px 70px 0 4px rgba(0,70,95,.12)}.moon-craters:after{width:15px;height:15px;right:20%;bottom:23%;box-shadow:-55px 25px 0 5px rgba(0,70,95,.1)}
      .moon-crack{position:absolute;z-index:6;background:#ffd447;border-radius:99px;transform-origin:left center;opacity:.9}.moon-crack-one{width:38px;height:3px;left:23%;top:45%;transform:rotate(22deg)}.moon-crack-two{width:30px;height:3px;right:22%;top:54%;transform:rotate(-28deg)}.moon-crack-three{width:27px;height:3px;left:42%;bottom:22%;transform:rotate(-18deg)}
      .moon-rock-burst{position:absolute;inset:-70px;pointer-events:none;z-index:7}.moon-rock-burst i{position:absolute;color:#ffd447;font-style:normal;font-size:1.5rem;opacity:0;text-shadow:0 0 12px rgba(255,212,71,.9)}.moon-rock-burst i:nth-child(1){left:4%;top:42%}.moon-rock-burst i:nth-child(2){left:16%;top:4%}.moon-rock-burst i:nth-child(3){left:48%;top:-4%}.moon-rock-burst i:nth-child(4){right:8%;top:18%}.moon-rock-burst i:nth-child(5){right:-1%;top:53%}.moon-rock-burst i:nth-child(6){right:20%;bottom:-4%}.moon-rock-burst i:nth-child(7){left:39%;bottom:-7%}.moon-rock-burst i:nth-child(8){left:0;bottom:19%}
      .moon-exploding{animation:moonExplode 1.15s cubic-bezier(.2,.8,.2,1) forwards!important}.moon-exploding .moon-crack{animation:crackFlash .35s ease-in forwards}.moon-exploding .moon-glow{animation:none}.moon-exploding .moon-rock-burst i{animation:rockBurst 1.1s cubic-bezier(.15,.8,.2,1) forwards}.moon-exploding .moon-rock-burst i:nth-child(1){--rx:-95px;--ry:-45px}.moon-exploding .moon-rock-burst i:nth-child(2){--rx:-65px;--ry:-105px}.moon-exploding .moon-rock-burst i:nth-child(3){--rx:0px;--ry:-125px}.moon-exploding .moon-rock-burst i:nth-child(4){--rx:75px;--ry:-85px}.moon-exploding .moon-rock-burst i:nth-child(5){--rx:105px;--ry:-10px}.moon-exploding .moon-rock-burst i:nth-child(6){--rx:70px;--ry:95px}.moon-exploding .moon-rock-burst i:nth-child(7){--rx:0px;--ry:115px}.moon-exploding .moon-rock-burst i:nth-child(8){--rx:-85px;--ry:80px}.moon-portal-opening .adventure-hero{animation-play-state:paused;opacity:.25;transition:opacity .35s ease}.moon-portal-opening .orbit{opacity:.2;transition:opacity .35s ease}
      @keyframes moonSpin{to{transform:rotate(360deg)}}@keyframes moonTwinkle{50%{transform:scale(1.35) rotate(12deg);opacity:.55}}@keyframes moonExplode{0%{transform:translate(-50%,-50%) scale(1);opacity:1}38%{transform:translate(-50%,-50%) scale(1.08);box-shadow:0 0 0 22px rgba(255,212,71,.24),0 0 120px rgba(255,212,71,.75)}70%{transform:translate(-50%,-50%) scale(.88);opacity:.7}100%{transform:translate(-50%,-50%) scale(.08);opacity:0}}@keyframes crackFlash{to{opacity:0;box-shadow:0 0 18px #ffd447}}@keyframes rockBurst{0%{transform:translate(0,0) scale(.15) rotate(0);opacity:0}18%{opacity:1;transform:translate(calc(var(--rx)*.35),calc(var(--ry)*.35)) scale(1.1) rotate(60deg)}100%{transform:translate(var(--rx),var(--ry)) scale(.72) rotate(240deg);opacity:0}}
      @media(max-width:560px){.future-adventure-moon{width:185px;height:185px}.future-adventure-moon strong{font-size:.78rem}.future-adventure-moon small{font-size:.48rem}.moon-rock-burst{inset:-48px}.moon-exploding .moon-rock-burst i:nth-child(1){--rx:-55px;--ry:-28px}.moon-exploding .moon-rock-burst i:nth-child(2){--rx:-40px;--ry:-65px}.moon-exploding .moon-rock-burst i:nth-child(3){--rx:0px;--ry:-75px}.moon-exploding .moon-rock-burst i:nth-child(4){--rx:45px;--ry:-55px}.moon-exploding .moon-rock-burst i:nth-child(5){--rx:58px;--ry:-5px}.moon-exploding .moon-rock-burst i:nth-child(6){--rx:42px;--ry:58px}.moon-exploding .moon-rock-burst i:nth-child(7){--rx:0px;--ry:70px}.moon-exploding .moon-rock-burst i:nth-child(8){--rx:-52px;--ry:48px}}
      @media(prefers-reduced-motion:reduce){.future-adventure-moon,.moon-glow,.moon-star,.moon-rock-burst i{animation:none!important}.moon-exploding{opacity:0!important}}
    `;
    document.head.appendChild(style);
  }

  function start(){addStyles();initFutureAdventurePortal();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();