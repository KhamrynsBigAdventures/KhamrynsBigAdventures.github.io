/* FINAL HOMEPAGE PALETTE LOCK — supplied Khamryn artwork. */
(function(){
  function apply(){
    if(document.getElementById('reference-lock-runtime')) return;
    const s=document.createElement('style');
    s.id='reference-lock-runtime';
    s.textContent=`
      .site-header{background:linear-gradient(145deg,#057F95,#20AAAC)!important;border:3px solid #FFD84A!important;color:#FFF9E8!important}
      .site-header a{color:#FFF9E8!important}.site-header .brand-star{color:#FFD84A!important}
      .hero,.intro,.books,.adventures,.connect{background:linear-gradient(145deg,#057F95 0%,#068C9D 45%,#20AAAC 100%)!important}
      .hero h1,.page-hero h1,.book-hero h1{color:#FFD84A!important;text-shadow:3px 4px 0 #063E76!important}
      h1 span{color:#FFD84A!important;text-shadow:3px 4px 0 #063E76!important}
      .book-card,.connect-card{background:linear-gradient(145deg,rgba(255,249,232,.99),rgba(255,255,255,.96))!important;border:3px solid rgba(255,216,74,.94)!important}
      .book-card h3,.book-card p,.connect-card h2,.connect-card p{color:#064682!important}
      .book-art{background:rgba(255,249,232,.10)!important}
      .book-football{background:linear-gradient(145deg,#064682,#068C9D)!important}.book-bike{background:linear-gradient(145deg,#176D52,#45A96D)!important}.book-cruise{background:linear-gradient(145deg,#064682,#20AAAC)!important}.book-soccer,.book-winning{background:linear-gradient(145deg,#087F7A,#20AAAC)!important}
      .hero-orbit .orbit{border:2px solid rgba(255,216,74,.78)!important;box-shadow:none!important}
      .button-gold,.button,.button-gold:visited{background:#FFF9E8!important;color:#064682!important;border:3px solid #FFD84A!important}
      .button-outline{background:rgba(255,249,232,.14)!important;color:#FFF9E8!important;border:2px solid #FFD84A!important}
    `;
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();
