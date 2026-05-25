/**
 * pdf.js — Marp `--pdf` 빌드 + mtime 캐시
 *
 * Spec:
 *  - 입력: { sourceMd, outPdf, themeSet } (모두 절대 경로 또는 cwd 상대)
 *  - 출력: { built: bool, cached: bool, pdfPath, size }
 *  - 캐시: out PDF가 source .md보다 mtime 신선하면 skip
 *  - 빌드 실패 시 throw with stderr
 *
 * 의존성: child_process(spawnSync), fs, path. 외부 라이브러리 없음.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function isCacheHit(sourceMd, outPdf) {
  if (!fs.existsSync(outPdf)) return false;
  const srcStat = fs.statSync(sourceMd);
  const dstStat = fs.statSync(outPdf);
  return dstStat.mtimeMs >= srcStat.mtimeMs;
}

/**
 * Build PDF from Marp markdown.
 * @param {object} opts
 * @param {string} opts.sourceMd - path to slides-<slug>-cards.md
 * @param {string} opts.outPdf   - path to output PDF
 * @param {string} opts.themeSet - dir to pass as --theme-set
 * @param {boolean} [opts.force] - bypass cache
 * @param {string}  [opts.cwd]   - working dir for npx (default: build/)
 * @returns {{built:boolean, cached:boolean, pdfPath:string, size:number}}
 */
function buildPdf(opts) {
  const { sourceMd, outPdf, themeSet, force = false, cwd } = opts;

  if (!fs.existsSync(sourceMd)) {
    const err = new Error(`pdf: source markdown not found: ${sourceMd}`);
    err.code = 'PDF_SOURCE_MISSING';
    throw err;
  }

  if (!force && isCacheHit(sourceMd, outPdf)) {
    return {
      built: false,
      cached: true,
      pdfPath: outPdf,
      size: fs.statSync(outPdf).size,
    };
  }

  ensureDir(outPdf);

  // Use the build/ directory as cwd so the bundled marp-cli is picked up.
  const buildDir = cwd || path.join(__dirname, '..', '..');

  // Make paths relative to buildDir to keep marp-cli happy on Windows.
  const rel = (p) => path.relative(buildDir, path.resolve(p));

  const args = [
    '--yes',
    '@marp-team/marp-cli',
    rel(sourceMd),
    '--pdf',
    '--allow-local-files',
    '-o', rel(outPdf),
    '--theme-set', rel(themeSet),
  ];

  const result = spawnSync('npx', args, {
    cwd: buildDir,
    encoding: 'utf8',
    shell: process.platform === 'win32', // .cmd shim on Windows
  });

  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    const stdout = (result.stdout || '').trim();
    const err = new Error(
      `pdf: marp --pdf failed (exit ${result.status})\n${stderr || stdout}`
    );
    err.code = 'PDF_BUILD_FAILED';
    throw err;
  }

  if (!fs.existsSync(outPdf)) {
    const err = new Error(`pdf: marp succeeded but PDF not found at ${outPdf}`);
    err.code = 'PDF_OUTPUT_MISSING';
    throw err;
  }

  return {
    built: true,
    cached: false,
    pdfPath: outPdf,
    size: fs.statSync(outPdf).size,
  };
}

module.exports = { buildPdf, isCacheHit };
