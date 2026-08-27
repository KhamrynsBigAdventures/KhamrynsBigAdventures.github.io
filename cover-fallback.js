/* Khamryn's Big Adventures — stable cover handling + interactive book library. */
(function () {
  'use strict';

  function initBookLibrary() {
    const main = document.querySelector('main');
    const books = document.querySelector('.books');
    if (!main || !books || books.dataset.flipLibraryReady === 'true') return;
    books.dataset.flipLibraryReady = 'true';
    main.appendChild(books);

    const heading = books.querySelector('.section-heading');
    if (heading) heading.innerHTML = '<div><p class="section-kicker">THE COLLECTION</p><h2>Explore Khamryn\'s Books</h2><p class="flip-library-intro">Click a book cover to flip it over and discover the story behind the adventure.</p></div>';
    const seeAll = books.querySelector('.section-heading .text-link');
    if (seeAll) seeAll.remove();

    const summaries = {
      'book-big-game': {title:"Khamryn's Big Game",summary:"Khamryn faces a disappointing tryout, but he keeps practicing and refuses to let one setback define him. With encouragement from his older cousin and friends, he prepares for a school 3-on-3 tournament and discovers that heart and hustle matter alongside talent. His journey includes a crucial semifinal shot and a lesson that perseverance can create its own kind of victory—even when the final scoreboard does not say champion.",cta:'Enter the Big Game Adventure →',href:'big-game-adventure.html'},
      'book-big-bike': {title:"Let's Go for a Ride!",summary:"Khamryn dreams of a sleek matte black dirt bike with vibrant neon yellow accents, but his old red bike is getting too small and he does not have enough money yet. Instead of giving up, he saves the way he does in the story: through kind, helpful work for his mom and his neighbor, Mr. Rico. The adventure turns saving into a lesson about patience, responsibility, effort, and working toward a goal one step—or coin—at a time.",cta:"Let's Go for a Ride →",href:'big-bike-adventure.html'},
      'book-cruise-adventures': {title:"Khamryn's Cruise Adventures",summary:"Khamryn and Kendall set sail for a journey built around curiosity and exploration. Their cruise adventure takes them through six experiences—Carnival, Royal Caribbean, Celebrity, Norwegian, Margaritaville, and MSC—where each stop brings a new kid-friendly activity and a new opportunity to learn. Players collect six passport stamps by answering questions about the adventures, turning the story into a playful voyage of discovery.",cta:'All Aboard the Cruise Adventure! →',href:'cruise-adventure-game.html'},
      'book-final-kickoff': {title:"Khamryn's Final Kickoff",summary:"Khamryn steps into a soccer adventure filled with energy, movement, and determination. The story centers the excitement of the game and the mindset it takes to keep moving forward, making the field a place where effort, focus, and determination matter. The interactive adventure brings that soccer spirit to life and invites young readers to test what they remember from Khamryn's journey.",cta:'Final Kickoff! Start the Adventure →',href:'final-kickoff-adventure-music.html'},
      'book-winning-play': {title:"Khamryn's Winning Play",summary:"Khamryn wants to help the Cowboys win the championship, but the biggest lesson is not about doing everything himself. Through his football journey, he learns to make smart team-player decisions, trust his teammates, practice together, and look for the play that helps the whole team. The adventure builds toward a winning play and a reminder that sometimes the best play is not about doing it alone—it is about doing it together.",cta:'Win the Winning Play! →',href:'winning-play-adventure.html'}
    };

    const grid = books.querySelector('.book-grid');
    if (!grid) return;
    grid.className = 'book-flip-grid';

    [...grid.querySelectorAll('.book-card')].forEach(card => {
      const data = summaries[card.id];
      const cover = card.querySelector('.book-cover-frame');
      const iframe = cover && cover.querySelector('iframe');
      if (!data || !cover || !iframe) return;

      card.className = 'book-flip-card';
      card.innerHTML = '';

      const flip = document.createElement('button');
      flip.type = 'button';
      flip.className = 'book-flip';
      flip.setAttribute('aria-expanded', 'false');
      flip.setAttribute('aria-label', `Flip ${data.title} to read its summary and adventure`);

      const front = document.createElement('span');
      front.className = 'book-face book-front';
      const visual = iframe.cloneNode(true);
      visual.removeAttribute('loading');
      visual.setAttribute('aria-hidden', 'true');
      visual.setAttribute('tabindex', '-1');
      visual.style.pointerEvents = 'none';
      front.appendChild(visual);

      const back = document.createElement('span');
      back.className = 'book-face book-back';
      back.innerHTML = `<span class="book-back-kicker">THE STORY BEHIND THE ADVENTURE</span><strong>${data.title}</strong><span class="book-summary">${data.summary}</span>`;

      flip.appendChild(front);
      flip.appendChild(back);
      card.appendChild(flip);

      flip.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const open = flip.classList.toggle('is-flipped');
        flip.setAttribute('aria-expanded', String(open));
      });

      const cta = document.createElement('a');
      cta.className = 'book-game-link';
      cta.href = data.href;
      cta.textContent = data.cta;
      cta.setAttribute('aria-label', data.cta);
      cta.addEventListener('click', event => event.stopPropagation());
      back.appendChild(cta);
    });

    const style = document.createElement('style');
    style.textContent = `
      .flip-library-intro{color:var(--muted,#e7f3f7);max-width:620px;margin:.6rem 0 0;line-height:1.6}
      .book-flip-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px;align-items:stretch}
      .book-flip-card{min-width:0;perspective:1200px;background:transparent;position:relative}
      .book-flip{position:relative;display:block;width:100%;height:430px;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;perspective:1200px;text-align:left;-webkit-tap-highlight-color:transparent;touch-action:manipulation;z-index:10}
      .book-face{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform .75s cubic-bezier(.2,.75,.2,1),box-shadow .35s ease}
      .book-front{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.2);transform:rotateY(0deg);box-shadow:0 18px 45px rgba(0,0,0,.22);padding:12px;pointer-events:none}
      .book-front iframe{display:block;width:100%;height:100%;border:0;border-radius:14px;background:transparent;pointer-events:none}
      .book-back{transform:rotateY(180deg);background:linear-gradient(145deg,rgba(13,94,168,.98),rgba(5,53,95,.98));border:2px solid rgba(255,212,71,.68);padding:24px 18px;text-align:center;box-shadow:0 18px 45px rgba(0,0,0,.28);pointer-events:none}
      .book-back-kicker{color:#ffd447;font-weight:900;letter-spacing:.1em;font-size:.65rem;line-height:1.3;margin-bottom:12px}
      .book-back strong{font-family:Georgia,serif;color:#fffdf2;font-size:1.45rem;line-height:1.05;margin-bottom:14px}
      .book-summary{color:#e7f3f7;font-size:.86rem;line-height:1.5;overflow:auto;max-height:265px;padding-right:3px}
      .book-game-link{display:inline-flex;align-items:center;justify-content:center;margin-top:18px;color:#0b2f4f;background:#ffd447;text-decoration:none;border:2px solid #ffd447;border-radius:999px;padding:11px 18px;font-size:.78rem;font-weight:900;line-height:1.15;pointer-events:auto;white-space:normal;text-align:center;box-shadow:0 8px 18px rgba(0,0,0,.18)}
      .book-game-link:hover,.book-game-link:focus-visible{background:#fff0a8;border-color:#fff0a8;color:#0b2f4f;outline:none}
      .book-flip.is-flipped .book-front{transform:rotateY(-180deg)}
      .book-flip.is-flipped .book-back{transform:rotateY(0deg);pointer-events:auto}
      @media(max-width:1100px){.book-flip-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:720px){.book-flip-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 18px;-webkit-overflow-scrolling:touch}.book-flip-card{flex:0 0 74vw;max-width:300px;scroll-snap-align:center}.book-flip{height:430px}}
      @media(prefers-reduced-motion:reduce){.book-face{transition:none}}
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBookLibrary, {once:true});
  else initBookLibrary();
})();

/* HERO NAVIGATION FIX — each floating Khamryn must use its own adventure URL. */
(function () {
  'use strict';
  function bindHeroAdventureNavigation() {
    document.querySelectorAll('.hero-orbit .adventure-hero').forEach(function (link) {
      if (link.dataset.navigationFixed === 'true') return;
      const destination = link.getAttribute('href');
      if (!destination) return;
      link.dataset.navigationFixed = 'true';
      link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        window.location.assign(destination);
      }, true);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindHeroAdventureNavigation, {once:true});
  else bindHeroAdventureNavigation();
})();
