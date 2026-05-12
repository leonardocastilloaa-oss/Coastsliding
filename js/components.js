/* ═══════════════════════════════════════
   COASTSLIDE — Shared Components v2
   Fixed nav, correct paths, no template bugs
═══════════════════════════════════════ */
(function() {
  var path = window.location.pathname;
  var ROOT;
  if (path.includes('/cities/') || (path.includes('/blog/') && path.replace(/.*\/blog\//, '') !== '')) {
    ROOT = '../../';
  } else if (path.includes('/pages/')) {
    ROOT = '../';
  } else {
    ROOT = './';
  }

  function logo(dark) {
    var c1 = dark ? '#90E0EF' : '#0A4F6E';
    var nameColor = dark ? '#ffffff' : '#0A4F6E';
    var opa = dark ? '0.18' : '0.9';
    var opa2 = dark ? '0.1' : '0.4';
    var shOpa = dark ? '0.15' : '0.25';
    var waveOpa = dark ? '0.4' : '0.35';
    var fill2 = dark ? '#90E0EF' : '#0A4F6E';
    var fill2opa = dark ? '0.2' : '0.25';
    var taglineColor = dark ? '#90E0EF' : '#0A4F6E';
    var taglineOpa = dark ? '0.55' : '0.75';
    var h = dark ? '52' : '46';
    var id = dark ? 'd' : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 120" height="' + h + '" style="display:block">'
      + '<defs>'
      + '<linearGradient id="og' + id + '" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="' + c1 + '"/><stop offset="100%" stop-color="#00B4D8"/></linearGradient>'
      + '<linearGradient id="wg' + id + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00B4D8"/><stop offset="100%" stop-color="#90E0EF"/></linearGradient>'
      + '<linearGradient id="gg' + id + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#CAF0F8" stop-opacity="' + opa + '"/><stop offset="100%" stop-color="#90E0EF" stop-opacity="' + opa2 + '"/></linearGradient>'
      + '<filter id="sf' + id + '"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0A4F6E" flood-opacity="' + shOpa + '"/></filter>'
      + '</defs>'
      + '<rect x="10" y="15" width="78" height="90" rx="4" fill="none" stroke="url(#og' + id + ')" stroke-width="3.5"/>'
      + '<rect x="14" y="19" width="35" height="82" rx="2" fill="url(#gg' + id + ')" stroke="#00B4D8" stroke-width="1.5" opacity="0.6"/>'
      + '<rect x="34" y="19" width="50" height="82" rx="2" fill="url(#gg' + id + ')" stroke="url(#og' + id + ')" stroke-width="2"/>'
      + '<clipPath id="cp' + id + '"><rect x="34" y="19" width="50" height="82" rx="2"/></clipPath>'
      + '<g clip-path="url(#cp' + id + ')">'
      + '<path d="M30 75 Q45 62 60 72 Q75 82 90 68 L90 105 L30 105 Z" fill="#00B4D8" opacity="' + waveOpa + '"/>'
      + '<path d="M30 82 Q48 70 63 79 Q78 88 92 76 L92 105 L30 105 Z" fill="' + fill2 + '" opacity="' + fill2opa + '"/>'
      + '<line x1="36" y1="35" x2="82" y2="35" stroke="#00B4D8" stroke-width="1" opacity="0.5"/>'
      + '<line x1="36" y1="45" x2="82" y2="45" stroke="#00B4D8" stroke-width="0.8" opacity="0.3"/>'
      + '</g>'
      + '<rect x="62" y="54" width="4" height="14" rx="2" fill="url(#og' + id + ')"/>'
      + '<path d="M76 58 L83 58 M80 54 L84 58 L80 62" fill="none" stroke="#00B4D8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>'
      + '<rect x="10" y="103" width="78" height="3" rx="1.5" fill="url(#og' + id + ')" opacity="0.6"/>'
      + '<circle cx="28" cy="104.5" r="3" fill="none" stroke="url(#og' + id + ')" stroke-width="1.5"/>'
      + '<circle cx="70" cy="104.5" r="3" fill="none" stroke="url(#og' + id + ')" stroke-width="1.5"/>'
      + '<text x="108" y="58" font-family="Georgia,serif" font-size="38" font-weight="700" letter-spacing="-1" filter="url(#sf' + id + ')">'
      + '<tspan fill="' + nameColor + '">Coast</tspan><tspan fill="#00B4D8">Slide</tspan></text>'
      + '<path d="M108 66 Q145 59 182 66 Q219 73 256 66 Q293 59 330 66" fill="none" stroke="url(#wg' + id + ')" stroke-width="2.5" stroke-linecap="round"/>'
      + '<text x="109" y="88" font-family="Trebuchet MS,sans-serif" font-size="11.5" letter-spacing="2.5" fill="' + taglineColor + '" opacity="' + taglineOpa + '">WINDOWS · DOORS · SOUTH FLORIDA</text>'
      + '</svg>';
  }

  /* ── NAV ── */
  var navEl = document.getElementById('nav');
  if (navEl) {
    navEl.innerHTML =
      '<a href="' + ROOT + 'index.html" class="nav-logo">' + logo(false) + '</a>'
      + '<ul class="nav-links">'
      + '<li class="has-drop"><a href="' + ROOT + 'pages/services.html">Services</a>'
      + '<div class="drop-menu">'
      + '<a href="' + ROOT + 'pages/roller-replacement.html">&#9881;&#65039; Roller Replacement</a>'
      + '<a href="' + ROOT + 'pages/track-repair.html">&#128644; Track Repair</a>'
      + '<a href="' + ROOT + 'pages/impact-glass.html">&#128737;&#65039; Impact Glass</a>'
      + '<a href="' + ROOT + 'pages/lock-security.html">&#128274; Lock &amp; Security</a>'
      + '<a href="' + ROOT + 'pages/window-repair.html">&#129695; Window Repair</a>'
      + '<a href="' + ROOT + 'pages/hoa-commercial.html">&#127970; HOA &amp; Commercial</a>'
      + '</div></li>'
      + '<li class="has-drop"><a href="#">Regions</a>'
      + '<div class="drop-menu">'
      + '<a href="' + ROOT + 'pages/miami-dade.html">&#127750; Miami-Dade County</a>'
      + '<a href="' + ROOT + 'pages/broward.html">&#127796; Broward County</a>'
      + '<a href="' + ROOT + 'pages/palm-beach.html">&#9971;&#65039; Palm Beach County</a>'
      + '<a href="' + ROOT + 'pages/florida-keys.html">&#127965;&#65039; Florida Keys</a>'
      + '</div></li>'
      + '<li class="has-mega"><a href="#">Cities</a>'
      + '<div class="mega-menu">'
      + '<a href="' + ROOT + 'pages/cities/homestead.html" class="mega-item"><span class="mi-icon">&#127968;</span><div><div class="mi-name">Homestead</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/miami.html" class="mega-item"><span class="mi-icon">&#127750;</span><div><div class="mi-name">Miami</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/miami-beach.html" class="mega-item"><span class="mi-icon">&#127958;</span><div><div class="mi-name">Miami Beach</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/hialeah.html" class="mega-item"><span class="mi-icon">&#127751;</span><div><div class="mi-name">Hialeah</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/doral.html" class="mega-item"><span class="mi-icon">&#9992;&#65039;</span><div><div class="mi-name">Doral</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/coral-gables.html" class="mega-item"><span class="mi-icon">&#127795;</span><div><div class="mi-name">Coral Gables</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/kendall.html" class="mega-item"><span class="mi-icon">&#127969;</span><div><div class="mi-name">Kendall</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/aventura.html" class="mega-item"><span class="mi-icon">&#128717;</span><div><div class="mi-name">Aventura</div><div class="mi-desc">Miami-Dade</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/hollywood.html" class="mega-item"><span class="mi-icon">&#127796;</span><div><div class="mi-name">Hollywood</div><div class="mi-desc">Broward</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/fort-lauderdale.html" class="mega-item"><span class="mi-icon">&#9973;</span><div><div class="mi-name">Fort Lauderdale</div><div class="mi-desc">Broward</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/pembroke-pines.html" class="mega-item"><span class="mi-icon">&#127968;</span><div><div class="mi-name">Pembroke Pines</div><div class="mi-desc">Broward</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/weston.html" class="mega-item"><span class="mi-icon">&#127807;</span><div><div class="mi-name">Weston</div><div class="mi-desc">Broward</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/coral-springs.html" class="mega-item"><span class="mi-icon">&#127864;</span><div><div class="mi-name">Coral Springs</div><div class="mi-desc">Broward</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/boca-raton.html" class="mega-item"><span class="mi-icon">&#9971;&#65039;</span><div><div class="mi-name">Boca Raton</div><div class="mi-desc">Palm Beach</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/delray-beach.html" class="mega-item"><span class="mi-icon">&#127940;</span><div><div class="mi-name">Delray Beach</div><div class="mi-desc">Palm Beach</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/west-palm-beach.html" class="mega-item"><span class="mi-icon">&#127796;</span><div><div class="mi-name">West Palm Beach</div><div class="mi-desc">Palm Beach</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/palm-beach-gardens.html" class="mega-item"><span class="mi-icon">&#127802;</span><div><div class="mi-name">Palm Beach Gardens</div><div class="mi-desc">Palm Beach</div></div></a>'
      + '<a href="' + ROOT + 'pages/cities/jupiter.html" class="mega-item"><span class="mi-icon">&#128640;</span><div><div class="mi-name">Jupiter</div><div class="mi-desc">Palm Beach</div></div></a>'
      + '</div></li>'
      + '<li><a href="' + ROOT + 'pages/blog.html">Blog</a></li>'
      + '<li><a href="' + ROOT + 'pages/reviews.html">Reviews</a></li>'
      + '<li><a href="' + ROOT + 'pages/about.html">About</a></li>'
      + '</ul>'
      + '<div class="nav-right">'
      + '<a href="tel:+13055557543" class="nav-phone"><span>&#128222;</span> (305) 555-7543</a>'
      + '<a href="' + ROOT + 'pages/contact.html" class="nav-cta">Free Estimate</a>'
      + '<button class="nav-burger" id="burger" onclick="csToggleMobile()">&#9776;</button>'
      + '</div>';

    var mob = document.createElement('div');
    mob.className = 'mobile-nav';
    mob.id = 'mob-nav';
    mob.innerHTML =
      '<div class="mob-section">Services</div>'
      + '<a class="mob-link" href="' + ROOT + 'pages/services.html">All Services</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/roller-replacement.html">Roller Replacement</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/track-repair.html">Track Repair</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/impact-glass.html">Impact Glass</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/lock-security.html">Lock &amp; Security</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/window-repair.html">Window Repair</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/hoa-commercial.html">HOA &amp; Commercial</a>'
      + '<div class="mob-section">Regions</div>'
      + '<a class="mob-link" href="' + ROOT + 'pages/miami-dade.html">Miami-Dade County</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/broward.html">Broward County</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/palm-beach.html">Palm Beach County</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/florida-keys.html">Florida Keys</a>'
      + '<div class="mob-section">Cities</div>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/homestead.html">Homestead</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/miami.html">Miami</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/miami-beach.html">Miami Beach</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/fort-lauderdale.html">Fort Lauderdale</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/boca-raton.html">Boca Raton</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/west-palm-beach.html">West Palm Beach</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/cities/jupiter.html">Jupiter</a>'
      + '<div class="mob-section">Company</div>'
      + '<a class="mob-link" href="' + ROOT + 'pages/blog.html">Blog</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/reviews.html">Reviews</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/about.html">About Us</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/faq.html">FAQ</a>'
      + '<a class="mob-link" href="' + ROOT + 'pages/contact.html">Contact &amp; Free Estimate</a>'
      + '<div style="margin-top:20px;padding-bottom:30px">'
      + '<a href="tel:+13055557543" class="btn btn-blue" style="display:block;text-align:center;margin-bottom:12px">Call (305) 555-7543</a>'
      + '<a href="https://wa.me/13055557543" class="btn btn-wa" style="display:block;text-align:center" target="_blank">WhatsApp Us</a>'
      + '</div>';
    document.body.appendChild(mob);
  }

  /* ── FOOTER ── */
  var footEl = document.getElementById('footer');
  if (footEl) {
    footEl.innerHTML =
      '<div class="container"><div class="footer-grid">'
      + '<div><a href="' + ROOT + 'index.html">' + logo(true) + '</a>'
      + '<p class="footer-desc">South Florida bilingual sliding door and window repair. Miami-Dade NOA certified. Licensed FL contractor. Homestead to Jupiter.</p>'
      + '<div class="footer-socials"><a href="#" class="fsoc">f</a><a href="#" class="fsoc">in</a><a href="#" class="fsoc">yt</a><a href="#" class="fsoc">g</a></div></div>'
      + '<div><h5>Services</h5><ul class="footer-links">'
      + '<li><a href="' + ROOT + 'pages/roller-replacement.html">Roller Replacement</a></li>'
      + '<li><a href="' + ROOT + 'pages/track-repair.html">Track Repair</a></li>'
      + '<li><a href="' + ROOT + 'pages/impact-glass.html">Impact Glass</a></li>'
      + '<li><a href="' + ROOT + 'pages/lock-security.html">Lock &amp; Security</a></li>'
      + '<li><a href="' + ROOT + 'pages/window-repair.html">Window Repair</a></li>'
      + '<li><a href="' + ROOT + 'pages/hoa-commercial.html">HOA &amp; Commercial</a></li>'
      + '</ul></div>'
      + '<div><h5>Cities</h5><ul class="footer-links">'
      + '<li><a href="' + ROOT + 'pages/cities/homestead.html">Homestead</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/miami.html">Miami</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/miami-beach.html">Miami Beach</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/fort-lauderdale.html">Fort Lauderdale</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/boca-raton.html">Boca Raton</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/west-palm-beach.html">West Palm Beach</a></li>'
      + '<li><a href="' + ROOT + 'pages/cities/jupiter.html">Jupiter</a></li>'
      + '</ul></div>'
      + '<div><h5>Company</h5><ul class="footer-links">'
      + '<li><a href="' + ROOT + 'pages/about.html">About CoastSlide</a></li>'
      + '<li><a href="' + ROOT + 'pages/blog.html">Blog</a></li>'
      + '<li><a href="' + ROOT + 'pages/reviews.html">Reviews</a></li>'
      + '<li><a href="' + ROOT + 'pages/faq.html">FAQ</a></li>'
      + '<li><a href="' + ROOT + 'pages/contact.html">Contact</a></li>'
      + '<li><a href="' + ROOT + 'pages/privacy.html">Privacy Policy</a></li>'
      + '</ul></div>'
      + '</div>'
      + '<div class="footer-bottom">'
      + '<div class="footer-copy">© 2026 CoastSlide LLC · Licensed Florida Contractor · Homestead to Jupiter</div>'
      + '<div class="footer-legal">'
      + '<a href="' + ROOT + 'pages/privacy.html">Privacy</a>'
      + '<a href="' + ROOT + 'pages/terms.html">Terms</a>'
      + '<a href="' + ROOT + 'sitemap.xml">Sitemap</a>'
      + '</div></div></div>';
  }

  /* ── WHATSAPP BUTTON ── */
  var wa = document.createElement('a');
  wa.href = 'https://wa.me/13055557543?text=Hello%20CoastSlide!%20I%20need%20a%20free%20estimate%20for%20my%20sliding%20door.';
  wa.className = 'wa-float';
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'WhatsApp CoastSlide');
  wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.52.68 4.88 1.87 6.92L2 30l7.26-1.84A13.93 13.93 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.18 19.61c-.3.84-1.76 1.6-2.42 1.7-.62.09-1.4.13-2.26-.14a20.7 20.7 0 01-2.05-.76c-3.6-1.56-5.95-5.2-6.13-5.44-.18-.24-1.47-1.96-1.47-3.74 0-1.78.93-2.65 1.26-3.01.33-.36.72-.45.96-.45h.69c.22 0 .52-.08.81.62l1.04 2.57c.1.24.17.52.02.82-.15.3-.23.48-.46.74-.23.26-.48.58-.69.78-.23.22-.47.46-.2.9.27.44 1.19 1.97 2.56 3.19 1.76 1.57 3.24 2.05 3.7 2.28.46.23.73.19.99-.12.27-.31 1.12-1.31 1.42-1.76.3-.45.6-.37 1.01-.22.41.15 2.6 1.23 3.05 1.45.45.22.74.33.85.51.11.19.11 1.03-.19 1.87z"/></svg>'
    + '<span class="wa-tooltip">Chat on WhatsApp</span>';
  document.body.appendChild(wa);

  /* ── TRUST BAR ── */
  var tb = document.getElementById('trust-bar');
  if (tb) {
    tb.outerHTML = '<div class="trust-bar"><div class="trust-inner">'
      + '<div class="trust-item"><span class="ti">&#127942;</span> Licensed &amp; Insured</div>'
      + '<div class="trust-item"><span class="ti">&#9889;</span> Same-Day Service</div>'
      + '<div class="trust-item"><span class="ti">&#128172;</span> English &amp; Español</div>'
      + '<div class="trust-item"><span class="ti">&#10003;</span> Miami-Dade NOA</div>'
      + '<div class="trust-item"><span class="ti">&#128274;</span> Lifetime Warranty</div>'
      + '<div class="trust-item"><span class="ti">&#128656;</span> Parts on Every Truck</div>'
      + '</div></div>';
  }

  /* ── CTA ── */
  var ctaEl = document.getElementById('cta-section');
  if (ctaEl) {
    ctaEl.outerHTML = '<section class="cta-section">'
      + '<div class="cta-wave"><svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0 C360,60 1080,0 1440,40 L1440,0 L0,0 Z" fill="white"/></svg></div>'
      + '<div class="container"><div class="cta-inner">'
      + '<div class="chip" style="background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.25);color:#fff;margin:0 auto 20px"><span class="dot"></span> Free Estimate — Same Day Available</div>'
      + '<h2 class="title white center">Your Door Fixed.<br/><em>Today.</em></h2>'
      + '<p class="lead center" style="color:rgba(255,255,255,.8);margin:16px auto 0">Flat-rate pricing. Bilingual. Licensed &amp; insured. No surprises.</p>'
      + '<div class="cta-phones">'
      + '<a href="tel:+13055557543" class="cta-phone"><div class="cta-phone-area">One Number for South Florida</div><div class="cta-phone-num">(305) 555-7543</div></a>'
      + '</div>'
      + '<p class="cta-note">Mon–Sat 7am–8pm · Emergency 24/7 · Text OK · Se Habla Español</p>'
      + '</div></div></section>';
  }

  /* ── MOBILE TOGGLE ── */
  window.csToggleMobile = function() {
    var m = document.getElementById('mob-nav');
    var b = document.getElementById('burger');
    if (!m) return;
    m.classList.toggle('open');
    if (b) b.textContent = m.classList.contains('open') ? 'X' : '☰';
  };

  /* ── REGION TABS ── */
  window.showReg = function(id) {
    document.querySelectorAll('.rpanel').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.rtab').forEach(function(t) { t.classList.remove('active'); });
    var p = document.getElementById('rp-' + id);
    if (p) p.classList.add('active');
    var map = ['miami','broward','palm','keys'];
    var idx = map.indexOf(id);
    var tabs = document.querySelectorAll('.rtab');
    if (tabs[idx]) tabs[idx].classList.add('active');
  };

  /* ── INIT ON DOM READY ── */
  document.addEventListener('DOMContentLoaded', function() {
    /* FAQ accordion */
    document.querySelectorAll('.faq-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });

    /* Contact form */
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('button[type=submit]');
        var ok = document.getElementById('form-success');
        if (btn) { btn.textContent = 'Sent! We will call you within 1 hour.'; btn.style.background = '#27AE60'; btn.disabled = true; }
        if (ok) ok.style.display = 'block';
      });
    }

    /* Scroll reveal */
    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
    }

    /* Active nav link highlight */
    var cur = window.location.pathname.split('/').pop();
    if (cur) {
      document.querySelectorAll('.drop-menu a, .nav-links > li > a').forEach(function(a) {
        var href = a.getAttribute('href') || '';
        if (href && href.split('/').pop() === cur) a.classList.add('active');
      });
    }
  });

})();
