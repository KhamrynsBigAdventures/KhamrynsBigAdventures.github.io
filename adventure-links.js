/* Khamryn's Big Adventures — basketball hero opens Big Game card */
(function(){
  'use strict';

  function bind(){
    const link = document.querySelector('.hero-football-kham');
    const target = document.getElementById('book-big-game');
    if(!link || !target || link.dataset.bookJumpBound === '1') return;

    link.dataset.bookJumpBound = '1';

    function openBook(event){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation) event.stopImmediatePropagation();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', '#book-big-game');
    }

    // Keep the real href as a no-JavaScript fallback, while intercepting
    // the tap before any other site handler can redirect the hero image.
    link.setAttribute('href', '#book-big-game');
    link.setAttribute('aria-label', "Explore Khamryn's Big Game book");
    link.addEventListener('click', openBook, true);
    link.addEventListener('keydown', function(event){
      if(event.key === 'Enter' || event.key === ' '){
        openBook(event);
      }
    }, true);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  } else {
    bind();
  }
})();
