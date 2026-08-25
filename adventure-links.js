/* Khamryn's Big Adventures — direct hero-to-book navigation */
(function(){
  'use strict';

  function bind(){
    const link = document.querySelector('.hero-football-kham');
    const target = document.getElementById('book-big-game');
    if(!link || !target || link.dataset.bookJumpBound === '1') return;

    link.dataset.bookJumpBound = '1';
    link.setAttribute('href', '#book-big-game');
    link.setAttribute('aria-label', "Explore Khamryn's Big Game");

    function openBook(event){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation) event.stopImmediatePropagation();

      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 18;

      window.scrollTo({top: Math.max(0, top), left: 0, behavior: 'smooth'});
      history.replaceState(null, '', '#book-big-game');
    }

    // Capture the tap before the site's global navigation handler can process it.
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
