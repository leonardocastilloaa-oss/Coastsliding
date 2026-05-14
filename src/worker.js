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

const PATCH_CSS = `
/* CoastSlide production fixes */
.nav-links>li>a{padding:8px 12px;font-size:13.5px}.btn-wa{color:#fff!important}.btn-wa:hover{color:#fff!important}.phone-card.btn-wa{background:var(--wa)!important;border-color:var(--wa)!important;color:#fff!important}.phone-card.btn-wa .pc-area,.phone-card.btn-wa .pc-num{color:#fff!important}.rpanel.active{grid-template-columns:.95fr 1.05fr}.rp-photo{background:linear-gradient(145deg,var(--blue-deep),var(--blue) 58%,var(--teal))!important}.rp-photo img{display:none!important}.rp-photo-overlay{background:linear-gradient(160deg,rgba(7,63,95,.96) 0%,rgba(8,125,135,.76) 100%)!important}.rp-photo-content{justify-content:center!important}.form-success.form-error{background:#FFF4F2!important;border-color:#F0B8AC!important;color:#8A2418!important}
@media(max-width:1024px){.rpanel.active{grid-template-columns:1fr}.rp-photo{min-height:280px}}
`;

const CONTACT_FORM_PATCH = `
/* CoastSlide contact form delivery patch */
(function(){
  var PHONE_DISPLAY='(786) 659-3290';
  var FORM_ENDPOINT='https://formsubmit.co/ajax/'+['coastsliding','gmail.com'].join('@');
  function getValue(data,names){for(var i=0;i<names.length;i++){var value=(data.get(names[i])||'').toString().trim();if(value)return value;}return '';}
  function leadFromForm(form){
    var data=new FormData(form);
    return {
      name:getValue(data,['name','home-name','contact-name','cs-field-0-0','cs-field-1-0']),
      phone:getValue(data,['phone','home-phone','contact-phone','cs-field-0-1','cs-field-1-1']),
      email:getValue(data,['email','home-email','contact-email','cs-field-0-2','cs-field-1-2']),
      area:getValue(data,['area','county','city','home-county','contact-area','cs-field-0-3','cs-field-1-3']),
      problem:getValue(data,['problem','repair','issue','home-repair','contact-problem','cs-field-0-4','cs-field-1-4']),
      details:getValue(data,['details','message','notes','home-details','contact-details','cs-field-0-5','cs-field-1-5']),
      company:getValue(data,['company'])
    };
  }
  function messageFor(lead){return ['New CoastSlide contact request','','Name: '+lead.name,'Phone: '+lead.phone,'Email: '+lead.email,'City or Area: '+(lead.area||'Not provided'),'Type of Problem: '+lead.problem,'Details: '+(lead.details||'Not provided'),'Source Page: '+location.href].join('\\n');}
  async function postPrivate(form){var response=await fetch('/api/contact',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});if(!response.ok)throw new Error('private failed');return true;}
  async function postDirect(lead){
    var payload={_subject:'New CoastSlide Contact Request',_template:'table',_captcha:'false',_replyto:lead.email,name:lead.name,phone:lead.phone,email:lead.email,area:lead.area||'Not provided',problem:lead.problem,details:lead.details||'Not provided',message:messageFor(lead),source_page:location.href};
    var response=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});
    var result={};try{result=await response.json();}catch(error){}
    if(!response.ok||String(result.success).toLowerCase()!=='true')throw new Error((result&&result.message)||'direct failed');
    return true;
  }
  document.addEventListener('submit',async function(event){
    var form=event.target;if(!form||form.tagName!=='FORM'||!form.querySelector('input,select,textarea'))return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    if(form.dataset.csSubmitting==='1')return;form.dataset.csSubmitting='1';
    var btn=form.querySelector('button[type=submit]');var status=form.querySelector('.form-success')||document.getElementById('form-success');var original=btn?btn.textContent:'Send Request';
    if(status){status.style.display='none';status.classList.remove('form-error');}
    if(btn){btn.textContent='Sending request...';btn.disabled=true;}
    var lead=leadFromForm(form);
    try{
      if(lead.company)return;
      if(!lead.name||!lead.phone||!lead.email||!lead.problem)throw new Error('Please complete the required fields.');
      try{await postPrivate(form);}catch(error){await postDirect(lead);}
      if(btn){btn.textContent='Sent. We will contact you shortly.';btn.style.background='#27AE60';}
      if(status){status.textContent='Thank you. Your request was sent and CoastSlide will contact you shortly.';status.style.display='block';}
      form.reset();
    }catch(error){
      if(btn){btn.textContent=original;btn.disabled=false;}
      if(status){status.textContent=/activation/i.test(error.message)?'The form needs one-time email activation. Please call or text '+PHONE_DISPLAY+'.':'The form could not be sent right now. Please call or text '+PHONE_DISPLAY+'.';status.classList.add('form-error');status.style.display='block';}
    }finally{form.dataset.csSubmitting='0';}
  },true);
})();
`;

function patchComponentsJs(text) {
  let next = text.replace(
    "'<li>' + link('pages/about.html', 'About') + '</li>' +\n      '</ul>' +",
    "'<li>' + link('pages/about.html', 'About') + '</li>' +\n      '<li>' + link('pages/contact.html', 'Contact Us') + '</li>' +\n      '</ul>' +"
  );
  next = next.replace("mob('pages/contact.html', 'Contact & Free Estimate') +", "mob('pages/contact.html', 'Contact Us') +");
  next = next.replace(
    /form\.addEventListener\('submit', function \(event\) \{[\s\S]*?if \(ok\) ok\.style\.display = 'block';\n      \}\);/,
    "form.addEventListener('submit', async function (event) {\n        event.preventDefault();\n        var btn = form.querySelector('button[type=submit]');\n        var status = document.getElementById('form-success');\n        var original = btn ? btn.textContent : '';\n        if (status) { status.style.display = 'none'; status.classList.remove('form-error'); }\n        if (btn) { btn.textContent = 'Sending request...'; btn.disabled = true; }\n        try {\n          var response = await fetch('/api/contact', { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });\n          if (!response.ok) throw new Error('Contact request failed');\n          if (btn) { btn.textContent = 'Sent. We will contact you shortly.'; btn.style.background = '#27AE60'; }\n          if (status) { status.textContent = 'Thank you. Your request was sent and CoastSlide will contact you shortly.'; status.style.display = 'block'; }\n          form.reset();\n        } catch (error) {\n          if (btn) { btn.textContent = original || 'Send Request'; btn.disabled = false; }\n          if (status) { status.textContent = 'The form could not be sent right now. Please call or text (786) 659-3290.'; status.classList.add('form-error'); status.style.display = 'block'; }\n        }\n      });"
  );
  if (!next.includes('CoastSlide contact form delivery patch')) next += CONTACT_FORM_PATCH;
  return next;
}

function patchHtml(text) {
  let next = text;
  next = next.replace(/name="county"/g, 'name="area"');
  next = next.replace(/name="repair"/g, 'name="problem" required');
  next = next.replace(/<input id="home-email" name="email" type="email" placeholder=/g, '<input id="home-email" name="email" type="email" required placeholder=');
  next = next.replace(/<button type="submit" class="btn btn-blue" style="width:100%;justify-content:center;font-size:16px;padding:16px">[^<]*Request Free Estimate<\/button>/g, '<button type="submit" class="btn btn-blue" style="width:100%;justify-content:center;font-size:16px;padding:16px">Send Request</button>');
  next = next.replace(/<div class="form-success" id="form-success">[\s\S]*?<\/div>/g, '<div class="form-success" id="form-success" role="status" aria-live="polite"></div>');
  next = next.replace(/class="phone-card btn-wa" style="color:#fff;border:none"/g, 'class="phone-card btn-wa"');
  next = next.replace(/style="color:rgba\(255,255,255,\.7\)">WhatsApp/g, '>WhatsApp');
  return next;
}

function patchCss(text) {
  if (text.includes('CoastSlide production fixes')) return text;
  return text + PATCH_CSS;
}

function normalizeText(text, contentType = '') {
  let next = REPLACEMENTS.reduce((value, pair) => value.replace(pair[0], pair[1]), text);
  if (/javascript/i.test(contentType)) next = patchComponentsJs(next);
  if (/text\/html/i.test(contentType)) next = patchHtml(next);
  if (/text\/css/i.test(contentType)) next = patchCss(next);
  return next;
}

function shouldRewrite(contentType) {
  return /text\/html|text\/css|application\/javascript|text\/javascript|application\/json|text\/plain|application\/xml|text\/xml/i.test(contentType || '');
}

function clean(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 1200);
}

function firstFormValue(form, names) {
  for (const name of names) {
    const value = clean(form.get(name));
    if (value) return value;
  }
  return '';
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

function buildLeadMessage(lead, request) {
  return [
    'New CoastSlide contact request',
    '',
    'Name: ' + lead.name,
    'Phone: ' + lead.phone,
    'Email: ' + lead.email,
    'City or Area: ' + (lead.area || 'Not provided'),
    'Type of Problem: ' + lead.problem,
    'Details: ' + (lead.details || 'Not provided'),
    'Source Page: ' + (request.headers.get('referer') || 'Direct website form')
  ].join('\n');
}

async function sendLeadWithFormSubmit(lead, request) {
  const payload = {
    _subject: 'New CoastSlide Contact Request',
    _template: 'table',
    _captcha: 'false',
    _replyto: lead.email,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    area: lead.area || 'Not provided',
    problem: lead.problem,
    details: lead.details || 'Not provided',
    message: buildLeadMessage(lead, request),
    source_page: request.headers.get('referer') || 'Direct website form'
  };

  const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'https://coastslide.com',
      'Referer': 'https://coastslide.com/pages/contact.html'
    },
    body: JSON.stringify(payload)
  });

  let result = null;
  try {
    result = await response.json();
  } catch (error) {
    result = { success: String(response.ok), message: 'No JSON response from email service' };
  }

  const ok = response.ok && String(result.success).toLowerCase() === 'true';
  return { ok, status: response.status, result };
}

async function handleContact(request) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  const form = await request.formData();
  if (clean(form.get('company'))) return json({ ok: true });

  const lead = {
    name: firstFormValue(form, ['name', 'home-name', 'contact-name', 'cs-field-0-0', 'cs-field-1-0']),
    phone: firstFormValue(form, ['phone', 'home-phone', 'contact-phone', 'cs-field-0-1', 'cs-field-1-1']),
    email: firstFormValue(form, ['email', 'home-email', 'contact-email', 'cs-field-0-2', 'cs-field-1-2']),
    area: firstFormValue(form, ['area', 'county', 'city', 'home-county', 'contact-area', 'cs-field-0-3', 'cs-field-1-3']),
    problem: firstFormValue(form, ['problem', 'repair', 'issue', 'home-repair', 'contact-problem', 'cs-field-0-4', 'cs-field-1-4']),
    details: firstFormValue(form, ['details', 'message', 'notes', 'home-details', 'contact-details', 'cs-field-0-5', 'cs-field-1-5'])
  };

  if (!lead.name || !lead.phone || !lead.email || !lead.problem) {
    return json({ ok: false, error: 'Missing required fields' }, 400);
  }

  const delivery = await sendLeadWithFormSubmit(lead, request);
  if (!delivery.ok) {
    const message = clean(delivery.result && delivery.result.message);
    const activationRequired = /activation/i.test(message);
    return json({
      ok: false,
      error: activationRequired ? 'activation_required' : 'email_service_failed',
      message: activationRequired ? 'The email form needs one-time activation.' : 'Email service failed.'
    }, activationRequired ? 503 : 502);
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

    if (url.pathname === '/api/contact') return handleContact(request);

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!shouldRewrite(contentType)) return response;

    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(normalizeText(await response.text(), contentType), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
