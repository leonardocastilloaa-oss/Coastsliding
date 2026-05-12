(function () {
  var path = window.location.pathname;
  var ROOT = path.includes('/cities/') || (path.includes('/blog/') && path.replace(/.*\/blog\//, '') !== '')
    ? '../../'
    : path.includes('/pages/')
      ? '../'
      : './';

  function brand() {
    return '<span class="brand-word" aria-hidden="true"><strong>Coast</strong><em>Slide</em></span>';
  }

  function link(href, text, cls) {
    return '<a href="' + ROOT + href + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + text + '</a>';
  }

  var nav = document.getElementById('nav');
  if (nav) {
    nav.innerHTML =
      '<a href="' + ROOT + 'index.html" class="nav-logo" aria-label="CoastSlide home">' + brand() + '</a>' +
      '<ul class="nav-links">' +
      '<li class="has-drop">' + link('pages/services.html', 'Services') +
      '<div class="drop-menu">' +
      link('pages/roller-replacement.html', 'Roller Replacement') +
      link('pages/track-repair.html', 'Track Repair') +
      link('pages/impact-glass.html', 'Impact Glass') +
      link('pages/lock-security.html', 'Lock & Security') +
      link('pages/window-repair.html', 'Window Repair') +
      link('pages/hoa-commercial.html', 'HOA & Commercial') +
      '</div></li>' +
      '<li class="has-drop"><a href="#" aria-label="Service regions">Regions</a>' +
      '<div class="drop-menu">' +
      link('pages/miami-dade.html', 'Miami-Dade County') +
      link('pages/broward.html', 'Broward County') +
      link('pages/palm-beach.html', 'Palm Beach County') +
      link('pages/florida-keys.html', 'Florida Keys') +
      '</div></li>' +
      '<li class="has-mega"><a href="#" aria-label="Service cities">Cities</a>' +
      '<div class="mega-menu">' +
      city('homestead', 'Homestead', 'Miami-Dade') +
      city('miami', 'Miami', 'Miami-Dade') +
      city('miami-beach', 'Miami Beach', 'Miami-Dade') +
      city('hialeah', 'Hialeah', 'Miami-Dade') +
      city('doral', 'Doral', 'Miami-Dade') +
      city('coral-gables', 'Coral Gables', 'Miami-Dade') +
      city('kendall', 'Kendall', 'Miami-Dade') +
      city('aventura', 'Aventura', 'Miami-Dade') +
      city('hollywood', 'Hollywood', 'Broward') +
      city('fort-lauderdale', 'Fort Lauderdale', 'Broward') +
      city('pembroke-pines', 'Pembroke Pines', 'Broward') +
      city('weston', 'Weston', 'Broward') +
      city('coral-springs', 'Coral Springs', 'Broward') +
      city('boca-raton', 'Boca Raton', 'Palm Beach') +
      city('delray-beach', 'Delray Beach', 'Palm Beach') +
      city('west-palm-beach', 'West Palm Beach', 'Palm Beach') +
      city('palm-beach-gardens', 'Palm Beach Gardens', 'Palm Beach') +
      city('jupiter', 'Jupiter', 'Palm Beach') +
      '</div></li>' +
      '<li>' + link('pages/blog.html', 'Blog') + '</li>' +
      '<li>' + link('pages/reviews.html', 'Reviews') + '</li>' +
      '<li>' + link('pages/about.html', 'About') + '</li>' +
      '</ul>' +
      '<div class="nav-right">' +
      '<a href="tel:+13055557543" class="nav-phone"><span aria-hidden="true">&#128222;</span> (305) 555-7543</a>' +
      link('pages/contact.html', 'Free Estimate', 'nav-cta') +
      '<button class="nav-burger" id="burger" type="button" aria-label="Open menu" onclick="csToggleMobile()">&#9776;</button>' +
      '</div>';

    var mobile = document.createElement('div');
    mobile.className = 'mobile-nav';
    mobile.id = 'mob-nav';
    mobile.innerHTML =
      '<div class="mob-section">Services</div>' +
      mob('pages/services.html', 'All Services') +
      mob('pages/roller-replacement.html', 'Roller Replacement') +
      mob('pages/track-repair.html', 'Track Repair') +
      mob('pages/impact-glass.html', 'Impact Glass') +
      mob('pages/lock-security.html', 'Lock & Security') +
      mob('pages/window-repair.html', 'Window Repair') +
      mob('pages/hoa-commercial.html', 'HOA & Commercial') +
      '<div class="mob-section">Regions</div>' +
      mob('pages/miami-dade.html', 'Miami-Dade County') +
      mob('pages/broward.html', 'Broward County') +
      mob('pages/palm-beach.html', 'Palm Beach County') +
      mob('pages/florida-keys.html', 'Florida Keys') +
      '<div class="mob-section">Cities</div>' +
      mob('pages/cities/homestead.html', 'Homestead') +
      mob('pages/cities/miami.html', 'Miami') +
      mob('pages/cities/miami-beach.html', 'Miami Beach') +
      mob('pages/cities/fort-lauderdale.html', 'Fort Lauderdale') +
      mob('pages/cities/boca-raton.html', 'Boca Raton') +
      mob('pages/cities/west-palm-beach.html', 'West Palm Beach') +
      mob('pages/cities/jupiter.html', 'Jupiter') +
      '<div class="mob-section">Company</div>' +
      mob('pages/blog.html', 'Blog') +
      mob('pages/reviews.html', 'Reviews') +
      mob('pages/about.html', 'About Us') +
      mob('pages/faq.html', 'FAQ') +
      mob('pages/contact.html', 'Contact & Free Estimate') +
      '<div style="margin-top:20px;padding-bottom:30px">' +
      '<a href="tel:+13055557543" class="btn btn-blue" style="display:block;text-align:center;margin-bottom:12px">Call (305) 555-7543</a>' +
      '<a href="https://wa.me/13055557543" class="btn btn-wa" style="display:block;text-align:center" target="_blank" rel="noopener">WhatsApp Us</a>' +
      '</div>';
    document.body.appendChild(mobile);
  }

  function city(slug, name, county) {
    return '<a href="' + ROOT + 'pages/cities/' + slug + '.html" class="mega-item"><span class="mi-icon" aria-hidden="true">&#9656;</span><div><div class="mi-name">' + name + '</div><div class="mi-desc">' + county + '</div></div></a>';
  }

  function mob(href, text) {
    return '<a class="mob-link" href="' + ROOT + href + '">' + text + '</a>';
  }

  var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML =
      '<div class="container"><div class="footer-grid">' +
      '<div><a href="' + ROOT + 'index.html" aria-label="CoastSlide home">' + brand() + '</a>' +
      '<p class="footer-desc">South Florida bilingual sliding door and window repair. Miami-Dade NOA certified. Licensed FL contractor. Homestead to Jupiter.</p>' +
      '<div class="footer-socials">' +
      '<a href="#" class="fsoc" aria-label="CoastSlide on Facebook">f</a>' +
      '<a href="#" class="fsoc" aria-label="CoastSlide on Instagram">in</a>' +
      '<a href="#" class="fsoc" aria-label="CoastSlide on YouTube">yt</a>' +
      '<a href="#" class="fsoc" aria-label="CoastSlide Google reviews">g</a>' +
      '</div></div>' +
      footCol('Services', [
        ['pages/roller-replacement.html', 'Roller Replacement'],
        ['pages/track-repair.html', 'Track Repair'],
        ['pages/impact-glass.html', 'Impact Glass'],
        ['pages/lock-security.html', 'Lock & Security'],
        ['pages/window-repair.html', 'Window Repair'],
        ['pages/hoa-commercial.html', 'HOA & Commercial']
      ]) +
      footCol('Cities', [
        ['pages/cities/homestead.html', 'Homestead'],
        ['pages/cities/miami.html', 'Miami'],
        ['pages/cities/miami-beach.html', 'Miami Beach'],
        ['pages/cities/fort-lauderdale.html', 'Fort Lauderdale'],
        ['pages/cities/boca-raton.html', 'Boca Raton'],
        ['pages/cities/west-palm-beach.html', 'West Palm Beach'],
        ['pages/cities/jupiter.html', 'Jupiter']
      ]) +
      footCol('Company', [
        ['pages/about.html', 'About CoastSlide'],
        ['pages/blog.html', 'Blog'],
        ['pages/reviews.html', 'Reviews'],
        ['pages/faq.html', 'FAQ'],
        ['pages/contact.html', 'Contact'],
        ['pages/privacy.html', 'Privacy Policy']
      ]) +
      '</div><div class="footer-bottom">' +
      '<div class="footer-copy">&copy; 2026 CoastSlide LLC &middot; Licensed Florida Contractor &middot; Homestead to Jupiter</div>' +
      '<div class="footer-legal">' + link('pages/privacy.html', 'Privacy') + link('pages/terms.html', 'Terms') + '<a href="' + ROOT + 'sitemap.xml">Sitemap</a></div>' +
      '</div></div>';
  }

  function footCol(title, items) {
    return '<div><div class="footer-heading">' + title + '</div><ul class="footer-links">' +
      items.map(function (item) { return '<li>' + link(item[0], item[1]) + '</li>'; }).join('') +
      '</ul></div>';
  }

  var trust = document.getElementById('trust-bar');
  if (trust) {
    trust.outerHTML = '<div class="trust-bar"><div class="trust-inner">' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#127942;</span> Licensed & Insured</div>' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#9889;</span> Same-Day Service</div>' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#128172;</span> English &amp; Espa&ntilde;ol</div>' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#10003;</span> Miami-Dade NOA</div>' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#128274;</span> Lifetime Warranty</div>' +
      '<div class="trust-item"><span class="ti" aria-hidden="true">&#128656;</span> Parts on Every Truck</div>' +
      '</div></div>';
  }

  var cta = document.getElementById('cta-section');
  if (cta) {
    cta.outerHTML = '<section class="cta-section"><div class="cta-wave"><svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true"><path d="M0,0 C360,60 1080,0 1440,40 L1440,0 L0,0 Z" fill="white"/></svg></div>' +
      '<div class="container"><div class="cta-inner">' +
      '<div class="chip" style="background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.25);color:#fff;margin:0 auto 20px"><span class="dot"></span> Free Estimate - Same Day Available</div>' +
      '<h2 class="title white center">Your Door Fixed.<br/><em>Today.</em></h2>' +
      '<p class="lead center" style="color:rgba(255,255,255,.92);margin:16px auto 0">Flat-rate pricing. Bilingual. Licensed & insured. No surprises.</p>' +
      '<div class="cta-phones"><a href="tel:+13055557543" class="cta-phone"><div class="cta-phone-area">One Number for South Florida</div><div class="cta-phone-num">(305) 555-7543</div></a></div>' +
      '<p class="cta-note">Mon-Sat 7am-8pm &middot; Emergency 24/7 &middot; Text OK &middot; Se Habla Espa&ntilde;ol</p>' +
      '</div></div></section>';
  }

  var wa = document.createElement('a');
  wa.href = 'https://wa.me/13055557543?text=Hello%20CoastSlide!%20I%20need%20a%20free%20estimate%20for%20my%20sliding%20door.';
  wa.className = 'wa-float';
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'WhatsApp CoastSlide');
  wa.innerHTML = '<span aria-hidden="true">&#9742;</span><span class="wa-tooltip">Chat on WhatsApp</span>';
  document.body.appendChild(wa);

  var style = document.createElement('style');
  style.textContent =
    '.brand-word{font-family:Georgia,"Times New Roman",serif;font-size:30px;line-height:1;color:#0A4F6E;letter-spacing:-.5px}.brand-word em{font-style:normal;color:#00B4D8}.footer-heading{font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#fff;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.24)}.footer-desc{color:#eef8fb!important}.footer-links a{color:#f2fbfd!important}.footer-copy{color:#dbeef4!important}.footer-legal a{color:#e9f7fb!important}.cta-note,.bcard-print-note,.breadcrumb,.breadcrumb a,.rp-tag,.rp-stat-l,.cta-phone-area,.bcard-role,.bcard-contact,.bcard-svc,.local-band p,.local-band .seo-list li{color:#fff!important}.page-sub,.lead.center,.pc-area,.hpc-tag{color:#f5fbfe!important}:root{--soft:#405f76}.fsoc{color:#fff!important}.chip[style*="rgba(255,255,255"]{color:#fff!important}.nav-logo:focus,.footer a:focus,a:focus,button:focus,input:focus,select:focus,textarea:focus{outline:3px solid #0AADBB;outline-offset:3px}';
  document.head.appendChild(style);

  function ensureMainLandmark() {
    if (document.querySelector('main, [role="main"]')) return;
    var body = document.body;
    var firstAnchor = document.getElementById('nav') || body.firstElementChild;
    var footerNode = document.getElementById('footer');
    var main = document.createElement('main');
    main.id = 'main-content';
    main.setAttribute('role', 'main');
    if (firstAnchor && firstAnchor.nextSibling) {
      body.insertBefore(main, firstAnchor.nextSibling);
    } else {
      body.insertBefore(main, body.firstChild);
    }
    var node = main.nextSibling;
    while (node && node !== footerNode) {
      var next = node.nextSibling;
      if (node.nodeType !== 1 || (
        node.id !== 'mob-nav' &&
        !node.classList.contains('mobile-nav') &&
        !node.classList.contains('wa-float')
      )) {
        main.appendChild(node);
      }
      node = next;
    }
  }
  ensureMainLandmark();

  window.csToggleMobile = function () {
    var menu = document.getElementById('mob-nav');
    var btn = document.getElementById('burger');
    if (!menu) return;
    menu.classList.toggle('open');
    if (btn) {
      btn.textContent = menu.classList.contains('open') ? 'X' : '\u2630';
      btn.setAttribute('aria-label', menu.classList.contains('open') ? 'Close menu' : 'Open menu');
    }
  };

  window.showReg = function (id) {
    document.querySelectorAll('.rpanel').forEach(function (panel) { panel.classList.remove('active'); });
    document.querySelectorAll('.rtab').forEach(function (tab) { tab.classList.remove('active'); });
    var panel = document.getElementById('rp-' + id);
    if (panel) panel.classList.add('active');
    var tabs = document.querySelectorAll('.rtab');
    var index = ['miami', 'broward', 'palm', 'keys'].indexOf(id);
    if (tabs[index]) tabs[index].classList.add('active');
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form').forEach(function (form, formIndex) {
      form.querySelectorAll('.form-field').forEach(function (field, fieldIndex) {
        var label = field.querySelector('label');
        var control = field.querySelector('input,select,textarea');
        if (!label || !control) return;
        if (!control.id) control.id = 'cs-field-' + formIndex + '-' + fieldIndex;
        label.setAttribute('for', control.id);
        if (!control.name) control.name = control.id;
      });
    });

    document.querySelectorAll('.faq-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (node) { node.classList.remove('open'); });
        if (!open) item.classList.add('open');
      });
    });

    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var btn = form.querySelector('button[type=submit]');
        var ok = document.getElementById('form-success');
        if (btn) {
          btn.textContent = 'Sent! We will call you within 1 hour.';
          btn.style.background = '#27AE60';
          btn.disabled = true;
        }
        if (ok) ok.style.display = 'block';
      });
    }

    if (window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }
  });
})();
