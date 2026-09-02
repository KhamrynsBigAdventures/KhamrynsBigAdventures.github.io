/* FINAL HOMEPAGE PALETTE LOCK — exact visual language of supplied Khamryn artwork. */
(function(){
  function apply(){
    if(document.getElementById('reference-lock-runtime')) return;
    const s=document.createElement('style');
    s.id='reference-lock-runtime';
    s.textContent=`
      .site-header{background:linear-gradient(145deg,#078F9E,#12AAA8)!important;border:3px solid #FFD43D!important;color:#FFF9E8!important}
      .site-header a{color:#FFF9E8!important}.site-header .brand-star{color:#FFD43D!important}
      .hero,.intro,.books,.adventures,.connect{background:linear-gradient(145deg,#078A99 0%,#0BA3AB 45%,#19B7AE 100%)!important}
      .hero h1,.page-hero h1,.book-hero h1{color:#FFD43D!important;text-shadow:3px 4px 0 #07356F!important}
      h1 span{color:#FFD43D!important;text-shadow:3px 4px 0 #07356F!important}
      .book-card,.connect-card{background:linear-gradient(145deg,rgba(255,249,232,.99),rgba(255,255,255,.96))!important;border:3px solid rgba(255,212,61,.94)!important}
      .book-card h3,.book-card p,.connect-card h2,.connect-card p{color:#0A3F86!important}
      .book-art{background:rgba(255,249,232,.10)!important}
      .book-football{background:linear-gradient(145deg,#075B86,#0A9EAB)!important}.book-bike{background:linear-gradient(145deg,#176D52,#45A96D)!important}.book-cruise{background:linear-gradient(145deg,#075B86,#0BA7B3)!important}.book-soccer,.book-winning{background:linear-gradient(145deg,#087F7A,#16AAA0)!important}
      .hero-orbit .orbit{border:2px solid rgba(255,212,61,.78)!important;box-shadow:none!important}
      .button-gold,.button,.button-gold:visited{background:#FFF9E8!important;color:#0A3F86!important;border:3px solid #FFD43D!important}
      .button-outline{background:rgba(255,249,232,.14)!important;color:#FFF9E8!important;border:2px solid #FFD43D!important}
    `;
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();
