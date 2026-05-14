import { EmailMessage } from "cloudflare:email";

const PRIMARY_HOST = 'coastslide.com';
const OLD_HOSTS = new Set(['coastsliding.com', 'www.coastsliding.com', 'www.coastslide.com']);
const CONTACT_EMAIL = 'coastsliding@gmail.com';
const FROM_EMAIL = 'noreply@coastslide.com';

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
  return REPLACEMENTS.reduce((value, pair) => value.replace(pair[0], pair[1]), text);
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
      'cache-control': 'no-store',
      'access-control-allow-origin': '*'
    }
  });
}

function buildLead(form, request) {
  return {
    name: firstFormValue(form, ['name', 'home-name', 'contact-name', 'cs-field-0-0', 'cs-field-1-0']),
    phone: firstFormValue(form, ['phone', 'home-phone', 'contact-phone', 'cs-field-0-1', 'cs-field-1-1']),
    email: firstFormValue(form, ['email', 'home-email', 'contact-email', 'cs-field-0-2', 'cs-field-1-2']),
    area: firstFormValue(form, ['area', 'county', 'city', 'home-county', 'contact-area', 'cs-field-0-3', 'cs-field-1-3']),
    problem: firstFormValue(form, ['problem', 'repair', 'issue', 'home-repair', 'contact-problem', 'cs-field-0-4', 'cs-field-1-4']),
    details: firstFormValue(form, ['details', 'message', 'notes', 'home-details', 'contact-details', 'cs-field-0-5', 'cs-field-1-5']),
    source: request.headers.get('referer') || 'Direct website form'
  };
}

function leadBody(lead) {
  return [
    'New CoastSlide contact request',
    '',
    'Name: ' + lead.name,
    'Phone: ' + lead.phone,
    'Email: ' + lead.email,
    'City or Area: ' + (lead.area || 'Not provided'),
    'Type of Problem: ' + lead.problem,
    'Details: ' + (lead.details || 'Not provided'),
    'Source Page: ' + lead.source
  ].join('\n');
}

function emailRaw(lead) {
  const subject = 'New CoastSlide Contact Request';
  const replyTo = lead.email.replace(/[<>\r\n]/g, '');
  return [
    'From: CoastSlide Website <' + FROM_EMAIL + '>',
    'To: CoastSlide Leads <' + CONTACT_EMAIL + '>',
    'Reply-To: ' + replyTo,
    'Subject: ' + subject,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    leadBody(lead)
  ].join('\r\n');
}

async function sendLeadWithCloudflare(lead, env) {
  if (!env.LEAD_EMAIL || typeof env.LEAD_EMAIL.send !== 'function') {
    return { ok: false, skipped: true, message: 'Missing Cloudflare Email binding' };
  }

  const message = new EmailMessage(FROM_EMAIL, CONTACT_EMAIL, emailRaw(lead));
  await env.LEAD_EMAIL.send(message);
  return { ok: true };
}

async function sendLeadWithFormSubmit(lead) {
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
    message: leadBody(lead),
    source_page: lead.source
  };

  const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let result = {};
  try {
    result = await response.json();
  } catch (error) {
    result = { success: String(response.ok), message: 'No JSON response from email service' };
  }

  return {
    ok: response.ok && String(result.success).toLowerCase() === 'true',
    status: response.status,
    result
  };
}

async function handleContact(request, env) {
  if (request.method === 'OPTIONS') return json({ ok: true });
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  const form = await request.formData();
  if (clean(form.get('company'))) return json({ ok: true });

  const lead = buildLead(form, request);
  if (!lead.name || !lead.phone || !lead.email || !lead.problem) {
    return json({ ok: false, error: 'missing_required_fields' }, 400);
  }

  try {
    const cloudflareDelivery = await sendLeadWithCloudflare(lead, env);
    if (cloudflareDelivery.ok) return json({ ok: true, delivery: 'cloudflare_email' });
  } catch (error) {
    console.log('Cloudflare Email failed:', error && error.message ? error.message : error);
  }

  const formSubmitDelivery = await sendLeadWithFormSubmit(lead);
  if (formSubmitDelivery.ok) return json({ ok: true, delivery: 'formsubmit' });

  const message = clean(formSubmitDelivery.result && formSubmitDelivery.result.message);
  const activationRequired = /activation/i.test(message);
  return json({
    ok: false,
    error: activationRequired ? 'activation_required' : 'email_delivery_failed',
    message: activationRequired ? 'The email form needs one-time activation.' : 'Email delivery failed.'
  }, activationRequired ? 503 : 502);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (OLD_HOSTS.has(url.hostname)) {
      url.hostname = PRIMARY_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/api/contact') return handleContact(request, env);

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!shouldRewrite(contentType)) return response;

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
