/**
 * threads.js — Meta Threads Graph API 캐러셀 게시
 *
 * 시퀀스:
 *  1. (선행) image-host로 PNG 7장 → 공개 URL 7개
 *  2. POST /{user_id}/threads × 7 (media_type=IMAGE, image_url, is_carousel_item=true)
 *     → 자식 container ID 7개
 *  3. POST /{user_id}/threads (media_type=CAROUSEL, children=[ids], text=캡션)
 *     → 캐러셀 container ID
 *  4. POST /{user_id}/threads_publish (creation_id=carousel_id)
 *     → 최종 게시 ID
 *
 * Refs: https://developers.facebook.com/docs/threads/posts (carousel posts)
 *
 * Rate limit: 250 posts / 24h per user. container 생성도 카운트.
 * 429 응답 시 Retry-After 헤더 honor, exp backoff 3회 limit.
 */

'use strict';

const API_BASE = 'https://graph.threads.net/v1.0';

function envRequired(name) {
  const v = process.env[name];
  if (!v) {
    const err = new Error(`threads: env ${name} required`);
    err.code = 'THREADS_ENV_MISSING';
    throw err;
  }
  return v;
}

async function backoffSleep(attempt, retryAfterSec) {
  const ms = retryAfterSec
    ? Number(retryAfterSec) * 1000
    : Math.min(60000, 1000 * Math.pow(2, attempt));
  await new Promise((r) => setTimeout(r, ms));
}

/** Wrap fetch with 429/5xx retry (exp backoff, max 3). Returns parsed JSON. */
async function apiCall(method, urlPath, params, opts = {}) {
  const accessToken = opts.accessToken || envRequired('THREADS_ACCESS_TOKEN');
  const url = new URL(API_BASE + urlPath);

  let body;
  let headers = { 'User-Agent': 'MD-to-PPT-publish/1.0' };

  // Threads API accepts params either as query or as form-encoded body.
  // We use query for GET, form-encoded for POST (more reliable for long text).
  if (method === 'GET') {
    url.searchParams.set('access_token', accessToken);
    for (const [k, v] of Object.entries(params || {})) {
      url.searchParams.set(k, String(v));
    }
  } else {
    const form = new URLSearchParams();
    form.set('access_token', accessToken);
    for (const [k, v] of Object.entries(params || {})) {
      form.set(k, String(v));
    }
    body = form;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { method, headers, body });

    if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
      const retryAfter = res.headers.get('Retry-After');
      lastErr = new Error(
        `threads: HTTP ${res.status} (attempt ${attempt + 1}/3)`
      );
      await backoffSleep(attempt, retryAfter);
      continue;
    }

    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }

    if (!res.ok) {
      const err = new Error(
        `threads: HTTP ${res.status} — ${(json.error && json.error.message) || text.slice(0, 300)}`
      );
      err.code = 'THREADS_API_ERROR';
      err.status = res.status;
      err.body = json;
      throw err;
    }
    return json;
  }
  throw lastErr;
}

/** GET /me — verify token validity. Returns { id, username }. */
async function pingToken() {
  return apiCall('GET', '/me', { fields: 'id,username' });
}

/**
 * Create one IMAGE carousel-item container.
 * @param {string} userId
 * @param {string} imageUrl - publicly accessible PNG URL
 * @returns {Promise<string>} container ID
 */
async function createImageContainer(userId, imageUrl) {
  const res = await apiCall('POST', `/${encodeURIComponent(userId)}/threads`, {
    media_type: 'IMAGE',
    image_url: imageUrl,
    is_carousel_item: 'true',
  });
  if (!res.id) throw new Error('threads: image container missing id: ' + JSON.stringify(res));
  return res.id;
}

/**
 * Create a CAROUSEL container with children.
 * @param {string} userId
 * @param {string[]} childIds
 * @param {string}   text - composed caption body (text + hashtags)
 * @returns {Promise<string>} carousel container ID
 */
async function createCarouselContainer(userId, childIds, text) {
  const res = await apiCall('POST', `/${encodeURIComponent(userId)}/threads`, {
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    text,
  });
  if (!res.id) throw new Error('threads: carousel container missing id: ' + JSON.stringify(res));
  return res.id;
}

/**
 * Publish a container (must be CAROUSEL or already-complete media).
 * @returns {Promise<string>} published post ID
 */
async function publishContainer(userId, creationId) {
  const res = await apiCall('POST', `/${encodeURIComponent(userId)}/threads_publish`, {
    creation_id: creationId,
  });
  if (!res.id) throw new Error('threads: publish missing id: ' + JSON.stringify(res));
  return res.id;
}

/**
 * Full carousel publish flow.
 *
 * @param {object} args
 * @param {string[]} args.imageUrls   - public URLs of 7 PNGs (Threads allows 2-20 children)
 * @param {string}   args.text        - composed caption body
 * @param {object}   [args.logger]    - optional { info(msg), warn(msg) }
 * @returns {Promise<{postId: string, carouselId: string, childIds: string[], permalink?: string}>}
 */
async function publishCarousel(args) {
  const userId = envRequired('THREADS_USER_ID');
  const log = args.logger || { info: () => {}, warn: () => {} };

  if (!args.imageUrls || args.imageUrls.length < 2 || args.imageUrls.length > 20) {
    throw new Error(`threads: carousel needs 2-20 images, got ${args.imageUrls && args.imageUrls.length}`);
  }

  log.info(`threads: token ping...`);
  const me = await pingToken();
  log.info(`threads: authed as ${me.username || me.id}`);

  log.info(`threads: creating ${args.imageUrls.length} image containers...`);
  const childIds = [];
  for (let i = 0; i < args.imageUrls.length; i++) {
    const id = await createImageContainer(userId, args.imageUrls[i]);
    childIds.push(id);
    log.info(`  [${i + 1}/${args.imageUrls.length}] container ${id}`);
  }

  log.info(`threads: creating carousel container...`);
  const carouselId = await createCarouselContainer(userId, childIds, args.text);
  log.info(`threads: carousel ${carouselId}`);

  // Threads API: containers may need a brief "processing" window before publish.
  // Per docs, 30s is recommended; we wait 10s + retry on FINISHED check.
  log.info(`threads: waiting for carousel to be ready (10s)...`);
  await new Promise((r) => setTimeout(r, 10000));

  log.info(`threads: publishing...`);
  const postId = await publishContainer(userId, carouselId);
  log.info(`threads: published post ${postId}`);

  return { postId, carouselId, childIds };
}

module.exports = {
  publishCarousel,
  pingToken,
  // exposed for tests / index.js dry-run accounting
  createImageContainer,
  createCarouselContainer,
  publishContainer,
};
