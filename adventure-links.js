/* Khamryn's Big Adventures — direct hero-to-book navigation */
(function(){
  'use strict';

  function bind(){
    const link = document.querySelector('.hero-football-kham');
    const target = document.getElementById('book-big-game');
    if(!link || !target || link.dataset.bookJumpBound === '1') return;

    link.dataset.bookJumpBound = '1';
    link.addEventListener('click', function(event){
      event.preventDefault();
      event.stopPropagation();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null, '', '#book-big-game');
    }, true);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  } else {
    bind();
  }
})();
