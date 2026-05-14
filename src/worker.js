const PRIMARY_HOST = 'coastslide.com';
const OLD_HOSTS = new Set(['coastsliding.com', 'www.coastsliding.com', 'www.coastslide.com']);
const CONTACT_EMAIL = 'coastsliding@gmail.com';

const REPLACEMENTS = [
  [/https:\/\/coastsliding\.com/g, 'https://coastslide.com'],
  [/http:\/\/coastsliding\.com/g, 'https://coastslide.com'],
  [/www\.coastsliding\.com/g, 'coastslide.com'],
  [/coastsliding\.com/g, 'coastslide.com'],
  [/\+1-305-555-7543/g, '+17866593290'],
  [/\+13055557543/g, '+17866593290'],
  [/13055557543/g, '17866593290'],
  [/3055557543/g, '17866593290'],
  [/\(305\) 555-7543/g, '(786) 659-3290'],
  [/\(954\) 555-7543/g, '(786) 659-3290'],
  [/\(561\) 555-7543/g, '(786) 659-3290'],
  [/305-555-7543/g, '786-659-3290'],
  [/954-555-7543/g, '786-659-3290'],
  [/561-555-7543/g, '786-659-3290'],
  [/305\.555\.7543/g, '786.659.3290']
];

function normalizeText(text) {
  let next = REPLACEMENTS.reduce((value, pair) => value.replace(pair[0], pair[1]), text);
  next = next.replace(
    "'<li>' + link('pages/about.html', 'About') + '</li>' +\n      '</ul>' +",
    "'<li>' + link('pages/about.html', 'About') + '</li>' +\n      '<li>' + link('pages/contact.html', 'Contact Us') + '</li>' +\n      '</ul>' +"
  );
  next = next.replace(
    "mob('pages/contact.html', 'Contact & Free Estimate') +",
    "mob('pages/contact.html', 'Contact Us') +"
  );
  next = next.replace(
    /form\.addEventListener\('submit', function \(event\) \{[\s\S]*?if \(ok\) ok\.style\.display = 'block';\n      \}\);/,
    "form.addEventListener('submit', async function (event) {\n        event.preventDefault();\n        var btn = form.querySelector('button[type=submit]');\n        var status = document.getElementById('form-success');\n        var original = btn ? btn.textContent : '';\n        if (status) {\n          status.style.display = 'none';\n          status.style.background = '#F0FBF4';\n          status.style.borderColor = '#A8E6C0';\n          status.style.color = '#1A6A3A';\n        }\n        if (btn) {\n          btn.textContent = 'Sending request...';\n          btn.disabled = true;\n        }\n        try {\n          var response = await fetch('/api/contact', {\n            method: 'POST',\n            headers: { 'Accept': 'application/json' },\n            body: new FormData(form)\n          });\n          if (!response.ok) throw new Error('Contact request failed');\n          if (btn) {\n            btn.textContent = 'Sent. We will contact you shortly.';\n            btn.style.background = '#27AE60';\n          }\n          if (status) {\n            status.textContent = 'Thank you. Your request was sent and CoastSlide will contact you shortly.';\n            status.style.display = 'block';\n          }\n          form.reset();\n        } catch (error) {\n          if (btn) {\n            btn.textContent = original || 'Request Callback';\n            btn.disabled = false;\n          }\n          if (status) {\n            status.textContent = 'The form could not be sent right now. Please call or text (786) 659-3290.';\n            status.style.background = '#FFF4F2';\n            status.style.borderColor = '#F0B8AC';\n            status.style.color = '#8A2418';\n            status.style.display = 'block';\n          }\n        }\n      });"
  );
  return next;
}

function shouldRewrite(contentType) {
  return /text\/html|application\/javascript|text\/javascript|application\/json|text\/plain|application\/xml|text\/xml/i.test(contentType || '');
}

function clean(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 1200);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

async function handleContact(request) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  const form = await request.formData();
  if (clean(form.get('company'))) return json({ ok: true });

  const lead = {
    name: clean(form.get('name')),
    phone: clean(form.get('phone')),
    email: clean(form.get('email')),
    area: clean(form.get('area')),
    problem: clean(form.get('problem')),
    details: clean(form.get('details'))
  };

  if (!lead.name || !lead.phone || !lead.email || !lead.problem) {
    return json({ ok: false, error: 'Missing required fields' }, 400);
  }

  const payload = new FormData();
  payload.set('_subject', 'New CoastSlide Contact Request');
  payload.set('_template', 'table');
  payload.set('_captcha', 'false');
  payload.set('Name', lead.name);
  payload.set('Phone', lead.phone);
  payload.set('Email', lead.email);
  payload.set('City or Area', lead.area || 'Not provided');
  payload.set('Type of Problem', lead.problem);
  payload.set('Details', lead.details || 'Not provided');
  payload.set('Source Page', request.headers.get('referer') || 'Direct website form');

  const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: payload
  });

  if (!response.ok) {
    return json({ ok: false, error: 'Email service failed' }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (OLD_HOSTS.has(url.hostname)) {
      url.hostname = PRIMARY_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/api/contact') {
      return handleContact(request);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (!shouldRewrite(contentType)) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(normalizeText(await response.text()), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
