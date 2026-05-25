#!/usr/bin/env node
/**
 * index.js — publish:cards 오케스트레이션 진입점
 *
 * Usage: node scripts/publish/index.js <slug> [--dry-run] [--threads-only] [--linkedin-only] [--force]
 *
 * 사전 조건:
 *   1. 카드뉴스 PNG 7장이 이미 빌드되어 있음 (output/<slug>-cards/ 또는 themes/card-news/tech-modern/<slug>/)
 *   2. <slug>.caption.md 가 같은 폴더에 있음 (없으면 /caption <slug> 안내)
 *   3. .env 에 THREADS_*, LINKEDIN_* 토큰
 *
 * 산출:
 *   - PDF 자동 빌드 (없거나 stale일 때)
 *   - Threads 캐러셀 게시
 *   - LinkedIn document share 게시
 *   - publish.log append
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');

// Load .env from project root.
try {
  require('dotenv').config({ path: path.join(PROJECT_ROOT, '.env') });
} catch {
  console.error('[fatal] dotenv missing. Run: cd build && npm install');
  process.exit(2);
}

const { parseCaptionFile, composePostBody, LIMITS } = require('./caption');
const { buildPdf } = require('./pdf');
const { hostImages, PROVIDER: HOST_PROVIDER } = require('./image-host');
const threads = require('./threads');
const linkedin = require('./linkedin');
const log = require('./log');

/* ---------- argv ---------- */

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { slug: null, dryRun: false, threadsOnly: false, linkedinOnly: false, force: false };
  for (const a of args) {
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--threads-only') opts.threadsOnly = true;
    else if (a === '--linkedin-only') opts.linkedinOnly = true;
    else if (a === '--force') opts.force = true;
    else if (a.startsWith('--')) { console.error(`unknown flag: ${a}`); process.exit(2); }
    else if (!opts.slug) opts.slug = a;
    else { console.error(`unexpected positional: ${a}`); process.exit(2); }
  }
  if (!opts.slug) {
    console.error('usage: npm run publish:cards <slug> [-- --dry-run|--threads-only|--linkedin-only|--force]');
    process.exit(2);
  }
  return opts;
}

/* ---------- slug → paths ---------- */

/**
 * Try candidate locations for a slug's built card-news assets.
 * Returns { cardDir, sourceMd, pdfPath, captionPath, pngs[] } or throws.
 */
function resolveSlug(slug) {
  // Strip a trailing "-cards" if user passed e.g. "ai-coding-tips-cards"
  const baseSlug = slug.replace(/-cards$/, '');

  const candidates = [
    // Standard pipeline: output/<slug>-cards/
    {
      cardDir: path.join(PROJECT_ROOT, 'output', `${baseSlug}-cards`),
      sourceMd: path.join(PROJECT_ROOT, 'output', `slides-${baseSlug}-cards.md`),
      pdfName: `${baseSlug}-cards.pdf`,
      captionName: `${baseSlug}-cards.caption.md`,
      pngPrefix: `${baseSlug}-cards`,
    },
    // Theme folder direct: themes/card-news/tech-modern/<slug>/
    {
      cardDir: path.join(PROJECT_ROOT, 'themes', 'card-news', 'tech-modern', baseSlug),
      sourceMd: path.join(PROJECT_ROOT, 'themes', 'card-news', 'tech-modern', `${baseSlug}.md`),
      pdfName: `${baseSlug}.pdf`,
      captionName: `${baseSlug}.caption.md`,
      pngPrefix: baseSlug,
    },
    // sample-<slug> convention
    {
      cardDir: path.join(PROJECT_ROOT, 'themes', 'card-news', 'tech-modern', `sample-${baseSlug}`),
      sourceMd: path.join(PROJECT_ROOT, 'themes', 'card-news', 'tech-modern', `sample-${baseSlug}.md`),
      pdfName: `sample-${baseSlug}.pdf`,
      captionName: `sample-${baseSlug}.caption.md`,
      pngPrefix: `sample-${baseSlug}`,
    },
  ];

  for (const c of candidates) {
    if (!fs.existsSync(c.cardDir)) continue;
    const pngs = fs.readdirSync(c.cardDir)
      .filter((f) => f.startsWith(c.pngPrefix) && /\.\d{3}\.png$/.test(f))
      .sort()
      .map((f) => path.join(c.cardDir, f));
    if (pngs.length < 2) continue;  // need at least 2 for Threads carousel

    // PDF lives next to the source MD (or alongside the card dir for theme path)
    const pdfPath = fs.existsSync(c.sourceMd)
      ? path.join(path.dirname(c.sourceMd), c.pdfName)
      : path.join(c.cardDir, '..', c.pdfName);

    return {
      cardDir: c.cardDir,
      sourceMd: c.sourceMd,
      pdfPath,
      captionPath: path.join(c.cardDir, c.captionName),
      pngs,
    };
  }

  const err = new Error(
    `slug "${slug}" not found in any candidate location:\n` +
    candidates.map((c) => `  - ${path.relative(PROJECT_ROOT, c.cardDir)}`).join('\n') +
    `\nDid you build the card news first? Try /deck or /caption.`
  );
  err.code = 'SLUG_NOT_FOUND';
  throw err;
}

/* ---------- preflight ---------- */

function preflight(paths, opts) {
  const errors = [];
  if (paths.pngs.length < 2 || paths.pngs.length > 20) {
    errors.push(`PNG count ${paths.pngs.length} outside 2-20 (Threads carousel range)`);
  }
  if (!fs.existsSync(paths.captionPath)) {
    errors.push(`caption file missing: ${path.relative(PROJECT_ROOT, paths.captionPath)}\n   Run: /caption ${path.basename(paths.cardDir)}`);
  }
  if (!fs.existsSync(paths.sourceMd)) {
    errors.push(`source markdown missing (needed for PDF rebuild): ${path.relative(PROJECT_ROOT, paths.sourceMd)}`);
  }
  // Env keys (skip in dry-run when --*-only filters out the platform)
  const needThreads = !opts.linkedinOnly;
  const needLinkedin = !opts.threadsOnly;
  if (needThreads) {
    for (const k of ['THREADS_USER_ID', 'THREADS_ACCESS_TOKEN']) {
      if (!process.env[k]) errors.push(`env missing: ${k}`);
    }
  }
  if (needLinkedin) {
    for (const k of ['LINKEDIN_AUTHOR_URN', 'LINKEDIN_ACCESS_TOKEN']) {
      if (!process.env[k]) errors.push(`env missing: ${k}`);
    }
  }
  if (errors.length) {
    console.error('Preflight failed:\n  - ' + errors.join('\n  - '));
    process.exit(3);
  }
}

/* ---------- main ---------- */

async function main() {
  const opts = parseArgs(process.argv);
  console.log(`[publish:cards] slug=${opts.slug} dry=${opts.dryRun} threads-only=${opts.threadsOnly} linkedin-only=${opts.linkedinOnly}`);

  const paths = resolveSlug(opts.slug);
  console.log(`[OK]   cardDir: ${path.relative(PROJECT_ROOT, paths.cardDir)}`);
  console.log(`[OK]   PNG: ${paths.pngs.length} files`);

  preflight(paths, opts);

  // Caption
  const cap = parseCaptionFile(paths.captionPath);
  console.log(`[OK]   caption: threads(${cap.threads.text.length}/${LIMITS.threads.text}), linkedin(${cap.linkedin.text.length}/${LIMITS.linkedin.text})`);

  // Duplicate guard
  const logPath = path.join(paths.cardDir, 'publish.log');
  if (!opts.force && !opts.dryRun) {
    const dups = [];
    if (!opts.linkedinOnly && log.isRecentSuccess(logPath, opts.slug, 'threads')) dups.push('threads');
    if (!opts.threadsOnly && log.isRecentSuccess(logPath, opts.slug, 'linkedin')) dups.push('linkedin');
    if (dups.length) {
      console.error(`[ABORT] already published in last 24h: ${dups.join(', ')}. Use --force to override.`);
      process.exit(4);
    }
  }

  // PDF build (needed for LinkedIn even in dry-run for fidelity)
  let pdfInfo = null;
  if (!opts.threadsOnly) {
    const themeSet = path.join(PROJECT_ROOT, 'themes', 'card-news', 'tech-modern');
    pdfInfo = buildPdf({
      sourceMd: paths.sourceMd,
      outPdf: paths.pdfPath,
      themeSet,
      force: opts.force,
    });
    console.log(`[OK]   PDF: ${pdfInfo.cached ? 'cache hit' : 'built'} (${Math.round(pdfInfo.size / 1024)}KB)`);
  }

  // Dry-run: stop before any external API call
  if (opts.dryRun) {
    console.log('---');
    if (!opts.linkedinOnly) {
      console.log(`[DRY]  threads: would host ${paths.pngs.length} PNGs via ${HOST_PROVIDER}, then ${paths.pngs.length + 2} API calls`);
    }
    if (!opts.threadsOnly) {
      console.log(`[DRY]  linkedin: would 1 register + 1 PUT + 1 ugcPosts = 3 API calls`);
    }
    console.log('DRY RUN — no posts published.');
    return;
  }

  // Threads
  let threadsResult = null;
  if (!opts.linkedinOnly) {
    console.log('---');
    console.log(`[Threads] hosting ${paths.pngs.length} PNGs via ${HOST_PROVIDER}...`);
    const { urls } = await hostImages(paths.pngs);
    console.log(`[Threads] hosted: ${urls.length} URLs`);
    threadsResult = await threads.publishCarousel({
      imageUrls: urls,
      text: composePostBody(cap.threads),
      logger: { info: (m) => console.log('  ' + m), warn: (m) => console.warn('  ' + m) },
    });
    log.appendEvent(logPath, { slug: opts.slug, platform: 'threads', status: 'ok', postId: threadsResult.postId });
  }

  // LinkedIn
  let linkedinResult = null;
  if (!opts.threadsOnly) {
    console.log('---');
    console.log(`[LinkedIn] publishing document...`);
    linkedinResult = await linkedin.publishDocument({
      pdfPath: paths.pdfPath,
      text: composePostBody(cap.linkedin),
      title: opts.slug,
      logger: { info: (m) => console.log('  ' + m), warn: (m) => console.warn('  ' + m) },
    });
    log.appendEvent(logPath, { slug: opts.slug, platform: 'linkedin', status: 'ok', postId: linkedinResult.postUrn });
  }

  console.log('---');
  console.log('✓ publish:cards complete');
  if (threadsResult) console.log(`  Threads post: ${threadsResult.postId}`);
  if (linkedinResult) console.log(`  LinkedIn post: ${linkedinResult.postUrn || '(no URN in response)'}`);
  console.log(`  Log: ${path.relative(PROJECT_ROOT, logPath)}`);
}

main().catch((err) => {
  console.error(`[error] ${err.message}`);
  // Best-effort failure log
  try {
    const paths = resolveSlug(parseArgs(process.argv).slug);
    log.appendEvent(path.join(paths.cardDir, 'publish.log'), {
      slug: parseArgs(process.argv).slug,
      platform: 'system',
      status: 'fail',
      error: err.message,
    });
  } catch { /* slug resolution itself may have failed */ }
  process.exit(1);
});
