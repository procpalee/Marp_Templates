/**
 * image-host.js — Threads Graph API용 PNG 공개 URL 발급
 *
 * Threads API의 IMAGE container는 `image_url` 파라미터로 공개 URL을 요구한다.
 * 로컬 PNG를 그대로 못 올리므로 단기 호스팅이 필요.
 *
 * 지원 provider (env IMAGE_HOST_PROVIDER로 분기):
 *  - "0x0"     (default): https://0x0.st 무료 호스팅, expires=1일
 *  - "github" : GITHUB_TOKEN + GITHUB_HOST_REPO 사용해 임시 브랜치에 push → raw URL
 *
 * 반환: Promise<{ urls: string[], provider: string }>
 *
 * 의존성: 없음 (Node 18+ native fetch / FormData / Blob).
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PROVIDER = (process.env.IMAGE_HOST_PROVIDER || '0x0').toLowerCase();

/* ---------- 0x0.st ---------- */

async function upload0x0(filePath) {
  const buf = fs.readFileSync(filePath);
  const name = path.basename(filePath);

  // Node 18+ native FormData/Blob/File available globally.
  const form = new FormData();
  // expires: integer hours (max 730 for unauthenticated). 24h is plenty.
  form.set('expires', '24');
  form.set('file', new Blob([buf], { type: 'image/png' }), name);

  const res = await fetch('https://0x0.st', {
    method: 'POST',
    body: form,
    headers: {
      // 0x0.st requires a User-Agent string; rejects empty/default UA.
      'User-Agent': 'MD-to-PPT-publish/1.0 (https://github.com/)',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`0x0.st upload failed: HTTP ${res.status} ${body.slice(0, 200)}`);
  }
  const url = (await res.text()).trim();
  if (!/^https:\/\/0x0\.st\/\S+$/.test(url)) {
    throw new Error(`0x0.st returned unexpected body: ${url.slice(0, 200)}`);
  }
  return url;
}

/* ---------- GitHub raw (fallback) ---------- */

async function uploadGithub(filePath, opts) {
  const { token, repo, branch = 'card-news-host' } = opts;
  if (!token || !repo) {
    throw new Error('github image-host: GITHUB_TOKEN and GITHUB_HOST_REPO required');
  }
  const buf = fs.readFileSync(filePath);
  const content = buf.toString('base64');
  const name = path.basename(filePath);
  const apiPath = `images/${Date.now()}-${name}`;

  const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(apiPath)}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'MD-to-PPT-publish/1.0',
  };

  const body = {
    message: `card-news host: ${name}`,
    content,
    branch,
  };

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`github upload failed: HTTP ${res.status} ${errBody.slice(0, 300)}`);
  }
  const data = await res.json();
  // Use raw.githubusercontent.com URL (Meta API needs direct image bytes)
  return `https://raw.githubusercontent.com/${repo}/${branch}/${apiPath}`;
}

/* ---------- main ---------- */

/**
 * Upload local PNG files and return public URLs (one per input, same order).
 *
 * @param {string[]} pngPaths
 * @returns {Promise<{urls: string[], provider: string}>}
 */
async function hostImages(pngPaths) {
  if (!pngPaths || !pngPaths.length) {
    throw new Error('image-host: no PNG paths provided');
  }
  for (const p of pngPaths) {
    if (!fs.existsSync(p)) {
      throw new Error(`image-host: file not found: ${p}`);
    }
  }

  let urls;
  switch (PROVIDER) {
    case '0x0':
      // Sequential to be polite to a free service; 7 PNGs ~7s.
      urls = [];
      for (const p of pngPaths) {
        urls.push(await upload0x0(p));
      }
      break;

    case 'github':
      urls = [];
      for (const p of pngPaths) {
        urls.push(
          await uploadGithub(p, {
            token: process.env.GITHUB_TOKEN,
            repo: process.env.GITHUB_HOST_REPO,
            branch: process.env.GITHUB_HOST_BRANCH || 'card-news-host',
          })
        );
      }
      break;

    default:
      throw new Error(`image-host: unknown provider "${PROVIDER}". Use "0x0" or "github".`);
  }

  return { urls, provider: PROVIDER };
}

module.exports = { hostImages, PROVIDER };
