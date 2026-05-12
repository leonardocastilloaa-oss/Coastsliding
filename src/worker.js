const PHONE_REPLACEMENTS = [
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

function normalizePhones(text) {
  return PHONE_REPLACEMENTS.reduce((value, pair) => value.replace(pair[0], pair[1]), text);
}

function shouldRewrite(contentType) {
  return /text\/html|application\/javascript|text\/javascript|application\/json|text\/plain|application\/xml|text\/xml/i.test(contentType || '');
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (!shouldRewrite(contentType)) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');

    return new Response(normalizePhones(await response.text()), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
