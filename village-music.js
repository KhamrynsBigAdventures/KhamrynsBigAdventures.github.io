/* The Still Becoming Village Circle — persistent soundtrack + shared navigation */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC__) return;
    window.__TSBVC_MUSIC__ = true;

    const PLAYER_ID = 'villageSoundtrack';
    const NAV_PAGES = new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','events.html','contact.html','coaching.html','kitta.html']);
    const CANONICAL_PAGES = { 'events.html': 'experiences.html' };
    const BOOKING_URL = 'https://calendly.com/thestillbecomingvillagecircle/30min';
    const MUSIC_SRC = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';

    function removeLegacyPlayers() {
        document.querySelectorAll('#soundtrack, .soundtrack, #musicBubble, .music-bubble').forEach(function (el) { el.remove(); });
    }

    function addStyles() {
        if (document.getElementById('village-music-styles')) return;
        const style = document.createElement('style');
        style.id = 'village-music-styles';
        style.textContent = `
            #${PLAYER_ID}{position:fixed;right:18px;bottom:18px;width:112px;height:112px;border-radius:50%;background:radial-gradient(circle at 28% 22%,rgba(255,255,255,.92) 0 8%,rgba(255,255,255,.35) 9%,rgba(210,255,250,.34) 28%,rgba(94,215,207,.24) 56%,rgba(22,170,169,.18) 76%,rgba(255,255,255,.08));border:1px solid rgba(255,255,255,.85);box-shadow:0 12px 35px rgba(40,120,120,.18),inset -10px -12px 22px rgba(22,170,169,.13),inset 9px 8px 18px rgba(255,255,255,.8);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);z-index:99999;display:flex;align-items:center;justify-content:center;animation:villageBubbleFloat 4.5s ease-in-out infinite;cursor:pointer;overflow:hidden}
            #${PLAYER_ID}::before{content:'';position:absolute;inset:8px;border-radius:50%;border:1px solid rgba(255,255,255,.35);box-shadow:inset 3px 4px 7px rgba(255,255,255,.55);pointer-events:none}
            #${PLAYER_ID}::after{content:'';position:absolute;width:13px;height:7px;border-radius:50%;top:16px;left:25px;background:rgba(255,255,255,.7);transform:rotate(-25deg);filter:blur(.3px);pointer-events:none}
            #${PLAYER_ID}.open{width:min(390px,calc(100vw - 24px));height:auto;min-height:245px;border-radius:30px;animation:none;padding:16px;cursor:default;background:rgba(225,255,251,.92);box-shadow:0 18px 55px rgba(40,120,120,.24),inset 7px 7px 18px rgba(255,255,255,.9)}
            #${PLAYER_ID} .closed{display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:relative;z-index:2}
            #${PLAYER_ID}.open .closed{display:none}
            #${PLAYER_ID} .bubble-icon{font-size:34px;line-height:1;filter:drop-shadow(0 3px 5px rgba(40,120,120,.16));text-shadow:0 1px 0 rgba(255,255,255,.9)}
            #${PLAYER_ID} .bubble-note{position:absolute;font-size:18px;right:24px;top:31px;opacity:.9;transform:rotate(8deg)}
            #${PLAYER_ID} .bubble-label{position:absolute;bottom:13px;left:0;right:0;text-align:center;font:700 8px Arial,sans-serif;letter-spacing:.6px;color:#285f61;opacity:.78}
            #${PLAYER_ID} .content{position:absolute;left:1px;top:1px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
            #${PLAYER_ID}.open .content{position:static;width:100%;height:auto;opacity:1;pointer-events:auto;overflow:visible}
            #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
            #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
            #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
            #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
            .conversation-link,.becoming-journey-link{margin-top:10px!important;padding:13px 24px;border:0;border-radius:52% 48% 45% 55% / 48% 55% 45% 52%;background:rgba(22,170,169,.10);color:#16aaa9;font-family:inherit;font-size:inherit;font-weight:700;line-height:1.4;cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:0 10px 24px rgba(40,120,120,.08);transition:transform .25s ease,background .25s ease}
            .conversation-link:hover,.becoming-journey-link:hover{background:rgba(22,170,169,.16);text-decoration:none!important;transform:translateY(-2px)}
            @keyframes villageBubbleFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.025)}}
            @media(max-width:600px){#${PLAYER_ID}{width:94px;height:94px;right:10px;bottom:10px}#${PLAYER_ID}.open{width:calc(100vw - 20px);min-height:240px;right:10px;bottom:10px}#${PLAYER_ID} .bubble-icon{font-size:29px}#${PLAYER_ID} .bubble-note{font-size:15px;right:20px;top:27px}#${PLAYER_ID} .bubble-label{font-size:7px;bottom:10px}}
        `;
        document.head.appendChild(style);
    }

    function setupSoundtrackLoop() {
        const iframe = document.querySelector(`#${PLAYER_ID} .soundcloud-frame`);
        if (!iframe || iframe.dataset.loopBound === 'true') return;

        function bindWidget() {
            if (!window.SC || !window.SC.Widget) return;
            const widget = window.SC.Widget(iframe);
            widget.bind(window.SC.Widget.Events.READY, function () {
                if (iframe.dataset.loopBound === 'true') return;
                iframe.dataset.loopBound = 'true';
                widget.bind(window.SC.Widget.Events.FINISH, function () {
                    widget.seekTo(0);
                    widget.play();
                });
            });
        }

        if (window.SC && window.SC.Widget) { bindWidget(); return; }
        let api = document.getElementById('soundcloud-widget-api');
        if (!api) {
            api = document.createElement('script');
            api.id = 'soundcloud-widget-api';
            api.src = 'https://w.soundcloud.com/player/api.js';
            api.async = true;
            api.onload = bindWidget;
            document.head.appendChild(api);
        } else api.addEventListener('load', bindWidget, { once: true });
    }

    function createPlayer() {
        if (document.getElementById(PLAYER_ID)) return;
        const el = document.createElement('div');
        el.id = PLAYER_ID;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', 'Open The Village Soundtrack');
        el.innerHTML = `<div class="closed"><div class="bubble-icon">🎷</div><div class="bubble-note">♪</div><div class="bubble-label">VILLAGE SOUNDTRACK</div></div><div class="content" onclick="event.stopPropagation()"><div class="title">🫧 The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
        document.body.appendChild(el);
        el.querySelector('.closed').addEventListener('click', function () { el.classList.add('open'); el.setAttribute('aria-label', 'The Village Soundtrack player'); });
        el.querySelector('.close').addEventListener('click', function () { el.classList.remove('open'); el.setAttribute('aria-label', 'Open The Village Soundtrack'); });
        setupSoundtrackLoop();
    }

    function initFloatingBubble(root) {
        const bubble = root.querySelector ? root.querySelector('#floatingBubble') : document.getElementById('floatingBubble');
        const message = root.querySelector ? root.querySelector('#floatingMessage') : document.getElementById('floatingMessage');
        if (!bubble || !message || bubble.dataset.villageBubbleInitialized === 'true') return;
        bubble.dataset.villageBubbleInitialized = 'true';
        const messages = ['🫧 You belong before you bloom.',"🫧 Healing isn't linear.",'🫧 Rest is productive.','🫧 Curiosity creates connection.','🫧 Becoming takes courage.',"🫧 It's okay to begin again.",'🫧 You are allowed to change.',"🫧 You don't have to rush becoming."];
        let index = 0, x = 12, y = 62, targetX = 12, targetY = 62;
        function choosePosition() { const maxX = window.innerWidth < 600 ? 68 : 78; const maxY = window.innerWidth < 600 ? 78 : 84; targetX = 8 + Math.random() * (maxX - 8); targetY = 14 + Math.random() * (maxY - 14); }
        function animate() { if (!document.body.contains(bubble)) return; x += (targetX - x) * 0.0028; y += (targetY - y) * 0.0028; bubble.style.left = x + '%'; bubble.style.top = y + '%'; requestAnimationFrame(animate); }
        function change() { if (!document.body.contains(bubble)) return; bubble.classList.remove('visible'); setTimeout(function () { if (!document.body.contains(bubble)) return; index = (index + 1) % messages.length; message.textContent = messages[index]; choosePosition(); bubble.classList.add('visible'); }, 1800); }
        choosePosition();
        setTimeout(function () { if (document.body.contains(bubble)) bubble.classList.add('visible'); }, 1200);
        setInterval(change, 9000);
        animate();
    }

    function normalizeNavigation() {
        document.querySelectorAll('a[href]').forEach(function (link) {
            const raw = link.getAttribute('href');
            if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
            try {
                const target = new URL(raw, location.href);
                if (target.origin !== location.origin) return;
                const page = target.pathname.split('/').pop() || 'index.html';
                if (CANONICAL_PAGES[page]) { target.pathname = target.pathname.replace(page, CANONICAL_PAGES[page]); link.setAttribute('href', target.href); }
            } catch (error) {}
        });
    }

    function normalizeBookingLinks() {
        document.querySelectorAll('a[href*="calendly.com"]').forEach(function (link) { link.href = BOOKING_URL; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
    }

    function cleanLegacyLanguage(root) {
        const replacements = [
            [/honest conversations/gi, 'honest reflection'],
            [/creative conversations/gi, 'creative exploration'],
            [/the conversation to begin/gi, 'the connection to begin'],
            [/start the conversation here/gi, 'start here'],
            [/A conversation\./g, 'An exploration.'],
            [/conversations/gi, 'exploration'],
            [/conversation/gi, 'exploration']
        ];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(function (textNode) {
            if (!textNode.nodeValue.trim()) return;
            let value = textNode.nodeValue;
            replacements.forEach(function (pair) { value = value.replace(pair[0], pair[1]); });
            if (value !== textNode.nodeValue) textNode.nodeValue = value;
        });
    }

    function applyVillageFixes() {
        normalizeNavigation();
        normalizeBookingLinks();
        cleanLegacyLanguage(document.body);
        const journey = document.querySelector('.conversation-link');
        const footprints = document.getElementById('conversation');
        if (journey && footprints) {
            journey.textContent = '🌱 Let’s Take a Journey Into Your Becoming  →';
            journey.classList.remove('conversation-link');
            journey.classList.add('becoming-journey-link');
            journey.onclick = function (event) { event.preventDefault(); footprints.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
        }
        const footprintSection = document.getElementById('conversation');
        if (footprintSection) footprintSection.id = 'journey';
        const word = document.querySelector('.word-box h2');
        if (word && /Epistemic Humility/i.test(word.textContent)) {
            word.textContent = 'Liminality';
            const definition = document.querySelector('.word-definition');
            if (definition) definition.textContent = 'noun — the state of being between one stage, condition, identity, or place and another';
        }
    }

    function replacePageStyles(parsed) {
        document.head.querySelectorAll('style:not(#village-music-styles)').forEach(function (style) { style.remove(); });
        parsed.head.querySelectorAll('style').forEach(function (style) { document.head.insertBefore(document.importNode(style, true), document.getElementById('village-music-styles')); });
    }

    async function navigate(url, push) {
        const target = new URL(url, location.href);
        let page = target.pathname.split('/').pop() || 'index.html';
        if (CANONICAL_PAGES[page]) { page = CANONICAL_PAGES[page]; target.pathname = target.pathname.replace(target.pathname.split('/').pop(), page); }
        if (target.origin !== location.origin || !NAV_PAGES.has(page)) return false;
        const response = await fetch(target.href, { credentials: 'same-origin', cache: 'no-store' });
        if (!response.ok) throw new Error('Navigation failed: ' + response.status);
        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        const player = document.getElementById(PLAYER_ID);
        if (!player) return false;
        document.title = parsed.title || document.title;
        replacePageStyles(parsed);
        const incoming = [...parsed.body.children].filter(function (child) { return child.id !== PLAYER_ID && child.id !== 'soundtrack' && child.id !== 'musicBubble' && !child.classList.contains('soundtrack') && !child.classList.contains('music-bubble'); });
        [...document.body.children].forEach(function (child) { if (child !== player) child.remove(); });
        incoming.forEach(function (child) { document.body.insertBefore(document.importNode(child, true), player); });
        removeLegacyPlayers();
        applyVillageFixes();
        initFloatingBubble(document);
        if (push) history.pushState({ village: true }, '', target.href);
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.dispatchEvent(new CustomEvent('village:pagechange', { detail: { url: target.href } }));
        return true;
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest && event.target.closest('a[href]');
        if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = new URL(link.href, location.href);
        const page = target.pathname.split('/').pop() || 'index.html';
        if (target.origin !== location.origin || !NAV_PAGES.has(page) || target.pathname === location.pathname) return;
        event.preventDefault();
        navigate(target.href, true).catch(function () { location.href = target.href; });
    });

    window.addEventListener('popstate', function () { navigate(location.href, false).catch(function () {}); });

    function init() { removeLegacyPlayers(); addStyles(); createPlayer(); applyVillageFixes(); initFloatingBubble(document); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
