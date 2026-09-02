/* Khamryn's Big Adventures — reader-powered future adventure selector. */
(function () {
  'use strict';

  function initFutureAdventureSelector() {
    const orbit = document.querySelector('.hero-orbit');
    const core = document.querySelector('.hero-core');
    if (!orbit || !core || document.querySelector('.future-adventure-panel')) return;

    core.outerHTML = `
      <button class="future-adventure-moon" type="button" aria-expanded="false" aria-controls="future-adventure-panel">
        <span class="moon-glow" aria-hidden="true"></span>
        <span class="moon-craters" aria-hidden="true"></span>
        <span class="moon-star" aria-hidden="true">✦</span>
        <strong>WHAT ADVENTURE<br>SHOULD KHAMRYN<br>EXPLORE NEXT?</strong>
        <small>TAP THE MOON TO IMAGINE IT</small>
      </button>
      <div class="future-adventure-panel" id="future-adventure-panel" hidden>
        <div class="moon-rock-burst" aria-hidden="true">
          <i>◆</i><i>✦</i><i>●</i><i>◆</i><i>✧</i><i>●</i><i>✦</i><i>◆</i>
        </div>
        <div class="future-adventure-card">
          <p class="future-kicker">✨ A NEW BIG ADVENTURE IS WAITING…</p>
          <h2>Where should Khamryn go next?</h2>
          <p>Pick an adventure you would LOVE to see Khamryn explore. These are brand-new ideas — not adventures he has already taken!</p>
          <div class="future-adventure-options" role="group" aria-label="Choose a future Khamryn adventure">
            ${[
              ['Roller Skating','🛼'],['Ice Skating','⛸️'],['Baseball','⚾'],['Bowling','🎳'],
              ['Swimming','🏊🏾'],['Horseback Riding','🐎'],['Space Adventure','🚀'],['Camping Adventure','🏕️']
            ].map(([name, icon]) => `<button type="button" class="future-choice" data-adventure="${name}"><span>${icon}</span>${name}</button>`).join('')}
          </div>
          <div class="future-adventure-message" aria-live="polite" hidden>
            <div class="future-khamryn-wrap">
              <img src="images/winning-play-exact.png" alt="Khamryn standing and waving hello" class="future-khamryn">
              <span class="future-wave" aria-hidden="true">👋🏾</span>
            </div>
            <p><strong>Your idea might inspire Khamryn’s next BIG adventure! ✨</strong></p>
            <p>Keep reading to see which adventure is next… it could be…</p>
            <p>See you there! 👋🏾</p>
            <a class="future-contact" href="https://link.me/kjmills" target="_blank" rel="noopener">Tell Khamryn your idea →</a>
          </div>
        </div>
      </div>`;

    const moon = orbit.querySelector('.future-adventure-moon');
    const panel = orbit.querySelector('.future-adventure-panel');
    const message = orbit.querySelector('.future-adventure-message');

    moon.addEventListener('click', function () {
      const open = panel.hidden;
      panel.hidden = !open;
      moon.setAttribute('aria-expanded', String(open));
      orbit.classList.toggle('future-adventures-open', open);
      if (open) setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    });

    panel.querySelectorAll('.future-choice').forEach(function (choice) {
      choice.addEventListener('click', function () {
        panel.querySelectorAll('.future-choice').forEach(btn => btn.classList.remove('selected'));
        choice.classList.add('selected');
        message.hidden = false;
        message.dataset.selectedAdventure = choice.dataset.adventure;
        message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  }

  function addStyles() {
    if (document.getElementById('future-adventure-styles')) return;
    const style = document.createElement('style');
    style.id = 'future-adventure-styles';
    style.textContent = `
      .future-adventure-moon{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:clamp(190px,20vw,270px);height:clamp(190px,20vw,270px);margin:auto;border:2px solid rgba(255,212,71,.75);border-radius:50%;background:radial-gradient(circle at 35% 28%,#f9fff8 0,#bceee2 20%,#55c9b1 48%,#138f91 72%,#075b78 100%);color:#063b58;box-shadow:0 0 0 12px rgba(255,255,255,.07),0 0 55px rgba(91,224,191,.5),inset -22px -26px 40px rgba(0,38,75,.28);cursor:pointer;overflow:visible;z-index:12;transition:transform .35s ease,box-shadow .35s ease}.future-adventure-moon:hover,.future-adventure-moon:focus-visible{transform:scale(1.045);box-shadow:0 0 0 14px rgba(255,255,255,.09),0 0 75px rgba(91,224,191,.7),inset -22px -26px 40px rgba(0,38,75,.28);outline:3px solid #ffd447;outline-offset:5px}.future-adventure-moon strong{position:relative;font-family:Georgia,serif;font-size:clamp(.82rem,1.2vw,1.08rem);line-height:1.18;letter-spacing:.04em;text-align:center;text-shadow:0 1px rgba(255,255,255,.6)}.future-adventure-moon small{position:relative;margin-top:10px;font-size:.55rem;font-weight:900;letter-spacing:.13em}.moon-star{position:absolute;top:20%;right:21%;color:#fff7ae;font-size:1.2rem;animation:moonTwinkle 1.8s ease-in-out infinite}.moon-glow{position:absolute;inset:-18px;border-radius:50%;border:1px dashed rgba(255,255,255,.35);animation:moonSpin 14s linear infinite}.moon-craters:before,.moon-craters:after{content:'';position:absolute;border-radius:50%;background:rgba(0,75,105,.15)}.moon-craters:before{width:32px;height:32px;left:22%;top:25%;box-shadow:65px 55px 0 10px rgba(0,75,105,.12),-20px 70px 0 4px rgba(0,75,105,.12)}.moon-craters:after{width:14px;height:14px;right:20%;bottom:24%;box-shadow:-55px 25px 0 5px rgba(0,75,105,.1)}.future-adventure-panel{position:absolute;left:50%;top:50%;width:min(650px,92vw);transform:translate(-50%,18%);z-index:30}.future-adventure-card{position:relative;padding:25px;border-radius:28px;background:linear-gradient(145deg,rgba(7,77,116,.98),rgba(12,135,132,.98));border:2px solid rgba(255,212,71,.8);box-shadow:0 24px 70px rgba(0,0,0,.4);text-align:center;color:#fff}.future-kicker{color:#ffd447;font-weight:900;letter-spacing:.12em;font-size:.68rem}.future-adventure-card h2{margin:.35rem 0 .5rem;font-family:Georgia,serif;font-size:clamp(1.35rem,3vw,2rem);color:#fff}.future-adventure-card>p:not(.future-kicker){max-width:540px;margin:.4rem auto 1rem;line-height:1.55;color:#e9fbf8}.future-adventure-options{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.future-choice{border:2px solid rgba(255,255,255,.24);border-radius:16px;background:rgba(255,255,255,.1);color:#fff;padding:12px 10px;font-weight:900;cursor:pointer;transition:transform .2s ease,background .2s ease,border-color .2s ease}.future-choice span{font-size:1.35rem;margin-right:6px}.future-choice:hover,.future-choice:focus-visible,.future-choice.selected{transform:translateY(-2px);background:#ffd447;color:#073a58;border-color:#ffd447;outline:none}.future-adventure-message{margin-top:18px;padding:20px;border-radius:22px;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.2)}.future-adventure-message p{margin:.55rem 0;color:#fff}.future-adventure-message strong{color:#ffd447}.future-khamryn-wrap{position:relative;height:145px;margin:-5px auto 5px;display:flex;align-items:flex-end;justify-content:center}.future-khamryn{height:145px;width:auto;max-width:130px;object-fit:contain;filter:drop-shadow(0 8px 10px rgba(0,0,0,.25))}.future-wave{position:absolute;top:10px;margin-left:110px;font-size:2rem;animation:waveBounce .9s ease-in-out infinite alternate}.future-contact{display:inline-flex;margin-top:9px;padding:10px 17px;border-radius:999px;background:#fff;color:#075b78;text-decoration:none;font-weight:900}.moon-rock-burst{position:absolute;inset:-90px;pointer-events:none;z-index:-1}.moon-rock-burst i{position:absolute;color:#ffd447;font-style:normal;font-size:1.4rem;text-shadow:0 0 10px rgba(255,212,71,.7);animation:rockFloat 2.8s ease-out infinite}.moon-rock-burst i:nth-child(1){left:7%;top:34%;animation-delay:.1s}.moon-rock-burst i:nth-child(2){left:18%;top:5%;animation-delay:.35s}.moon-rock-burst i:nth-child(3){left:48%;top:0;animation-delay:.55s}.moon-rock-burst i:nth-child(4){right:9%;top:18%;animation-delay:.8s}.moon-rock-burst i:nth-child(5){right:0;top:52%;animation-delay:.25s}.moon-rock-burst i:nth-child(6){right:22%;bottom:0;animation-delay:.65s}.moon-rock-burst i:nth-child(7){left:38%;bottom:-5%;animation-delay:.4s}.moon-rock-burst i:nth-child(8){left:2%;bottom:18%;animation-delay:.9s}@keyframes moonSpin{to{transform:rotate(360deg)}}@keyframes moonTwinkle{50%{transform:scale(1.35) rotate(12deg);opacity:.55}}@keyframes rockFloat{0%{transform:scale(.2) rotate(0);opacity:0}35%{opacity:1}100%{transform:translate(var(--x,0),-18px) scale(1.15) rotate(160deg);opacity:.35}}@keyframes waveBounce{to{transform:rotate(14deg) translateY(-5px)}}@media(max-width:720px){.future-adventure-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-45%);max-height:88vh;overflow:auto}.future-adventure-card{padding:20px 14px}.future-adventure-options{grid-template-columns:1fr 1fr}.future-adventure-moon{width:185px;height:185px}.future-adventure-moon strong{font-size:.78rem}.future-adventure-moon small{font-size:.48rem}}@media(prefers-reduced-motion:reduce){.future-adventure-moon,.moon-glow,.moon-star,.moon-rock-burst i,.future-wave{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function start() { addStyles(); initFutureAdventureSelector(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
