/**
 * linkedin.js — LinkedIn Document Share (PDF) UGC post
 *
 * 시퀀스:
 *  1. POST /v2/assets?action=registerUpload
 *      recipe: urn:li:digitalmediaRecipe:feedshare-document
 *      → { value: { asset, uploadMechanism: { ...: { uploadUrl, headers } } } }
 *  2. PUT <uploadUrl> with PDF binary
 *  3. POST /v2/ugcPosts
 *      author: urn:li:person:<id>
 *      lifecycleState: PUBLISHED
 *      specificContent: ShareContent with media[]=[{status:READY, media:asset, title, description}]
 *      shareMediaCategory: ARTICLE  (LinkedIn treats document share like rich media)
 *
 * Refs: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api
 *
 * OAuth scope: w_member_social  (+ openid profile for /v2/userinfo when bootstrapping URN)
 * Token TTL: 60 days.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const API_BASE = 'https://api.linkedin.com';
const RECIPE_DOCUMENT = 'urn:li:digitalmediaRecipe:feedshare-document';

function envRequired(name) {
  const v = process.env[name];
  if (!v) {
    const err = new Error(`linkedin: env ${name} required`);
    err.code = 'LINKEDIN_ENV_MISSING';
    throw err;
  }
  return v;
}

function authHeaders(accessToken) {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0',
    'LinkedIn-Version': '202405',
    'User-Agent': 'MD-to-PPT-publish/1.0',
  };
}

async function pingToken() {
  const accessToken = envRequired('LINKEDIN_ACCESS_TOKEN');
  const res = await fetch(`${API_BASE}/v2/userinfo`, {
    headers: { ...authHeaders(accessToken), Accept: 'application/json' },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`linkedin: token ping failed HTTP ${res.status} ${body.slice(0, 300)}`);
  }
  return res.json();
}

/**
 * Step 1: register an upload slot for a document asset.
 * @returns {Promise<{asset: string, uploadUrl: string, uploadHeaders: object}>}
 */
async function registerDocumentUpload(authorUrn, accessToken) {
  const url = `${API_BASE}/v2/assets?action=registerUpload`;
  const body = {
    registerUploadRequest: {
      recipes: [RECIPE_DOCUMENT],
      owner: authorUrn,
      serviceRelationships: [
        {
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent',
        },
      ],
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders(accessToken), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`linkedin: registerUpload HTTP ${res.status} ${errBody.slice(0, 400)}`);
  }
  const data = await res.json();
  const v = data && data.value;
  if (!v || !v.asset) {
    throw new Error('linkedin: registerUpload response missing asset: ' + JSON.stringify(data).slice(0, 300));
  }

  // Pick the first upload mechanism (LinkedIn returns a dict keyed by mechanism class name).
  const mech = v.uploadMechanism || {};
  const mechKeys = Object.keys(mech);
  if (!mechKeys.length) {
    throw new Error('linkedin: registerUpload missing uploadMechanism');
  }
  const upload = mech[mechKeys[0]];
  if (!upload || !upload.uploadUrl) {
    throw new Error('linkedin: uploadMechanism missing uploadUrl');
  }

  return {
    asset: v.asset,
    uploadUrl: upload.uploadUrl,
    uploadHeaders: upload.headers || {},
  };
}

/** Step 2: PUT PDF bytes to the upload URL. */
async function uploadPdf(uploadUrl, uploadHeaders, pdfPath, accessToken) {
  const buf = fs.readFileSync(pdfPath);
  const headers = {
    ...uploadHeaders,
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/pdf',
    'User-Agent': 'MD-to-PPT-publish/1.0',
  };
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers,
    body: buf,
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`linkedin: PDF upload HTTP ${res.status} ${errBody.slice(0, 300)}`);
  }
  return { bytes: buf.length };
}

/** Step 3: create the UGC document share post. */
async function createUgcDocumentPost(authorUrn, asset, accessToken, args) {
  const { commentary, title, description } = args;
  const url = `${API_BASE}/v2/ugcPosts`;
  const body = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: commentary },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            media: asset,
            title: { text: title || 'Card News' },
            description: { text: description || '' },
          },
        ],
      },
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders(accessToken), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`linkedin: ugcPosts HTTP ${res.status} ${errBody.slice(0, 400)}`);
  }
  // ID is typically returned in the x-restli-id header.
  const idHeader = res.headers.get('x-restli-id') || res.headers.get('X-RestLi-Id');
  let postUrn = idHeader || null;
  // Fallback: parse from body
  if (!postUrn) {
    const txt = await res.text();
    try { postUrn = JSON.parse(txt).id || null; } catch {}
  }
  return { postUrn };
}

/**
 * Full document share publish flow.
 *
 * @param {object} args
 * @param {string} args.pdfPath     - local PDF path
 * @param {string} args.text        - composed caption body (text + hashtags)
 * @param {string} [args.title]     - document title shown in feed (default: "Card News")
 * @param {object} [args.logger]
 * @returns {Promise<{postUrn: string|null, asset: string, bytes: number}>}
 */
async function publishDocument(args) {
  const accessToken = envRequired('LINKEDIN_ACCESS_TOKEN');
  const authorUrn = envRequired('LINKEDIN_AUTHOR_URN');
  const log = args.logger || { info: () => {}, warn: () => {} };

  if (!args.pdfPath || !fs.existsSync(args.pdfPath)) {
    throw new Error(`linkedin: pdf not found at ${args.pdfPath}`);
  }

  log.info('linkedin: token ping...');
  const me = await pingToken();
  log.info(`linkedin: authed as ${me.name || me.sub}`);

  log.info('linkedin: registering document upload...');
  const { asset, uploadUrl, uploadHeaders } =
    await registerDocumentUpload(authorUrn, accessToken);
  log.info(`linkedin: asset ${asset}`);

  log.info('linkedin: uploading PDF...');
  const { bytes } = await uploadPdf(uploadUrl, uploadHeaders, args.pdfPath, accessToken);
  log.info(`linkedin: uploaded ${bytes} bytes`);

  log.info('linkedin: creating UGC post...');
  const { postUrn } = await createUgcDocumentPost(authorUrn, asset, accessToken, {
    commentary: args.text,
    title: args.title || path.basename(args.pdfPath, '.pdf'),
    description: '',
  });
  log.info(`linkedin: posted ${postUrn || '(no urn in response)'}`);

  return { postUrn, asset, bytes };
}

module.exports = { publishDocument, pingToken };
