/**
 * caption.js — .caption.md frontmatter 파서
 *
 * Spec: 의존성 없음(YAML lib X). 정규식 기반 단순 파서.
 * .caption.md 스키마는 .claude/commands/caption.md §6 참조.
 *
 * 보장:
 *  - threads.text / linkedin.text 줄바꿈 LF 정규화
 *  - hashtags 배열 정규화 (# 접두사 제거, 공백 trim)
 *  - 글자 한도 초과 시 throw (Threads 500, LinkedIn 3000 — 본문만, 해시태그 제외)
 *
 * 사용:
 *  const cap = parseCaptionFile('output/foo-cards/foo-cards.caption.md');
 *  cap.threads.text     // string
 *  cap.threads.hashtags // ['tag1', 'tag2']
 *  cap.linkedin.text    // string
 *  cap.linkedin.hashtags
 */

'use strict';

const fs = require('node:fs');

const LIMITS = {
  threads: { text: 500, hashtags: 5 },
  linkedin: { text: 3000, hashtags: 5 },
};

/** Read file and split into (frontmatter, body). Throws if no frontmatter. */
function splitFrontmatter(raw) {
  // Normalize CRLF -> LF early; spec requires LF on output.
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) {
    throw new Error('caption.md: frontmatter(--- ... ---) not found');
  }
  return { frontmatter: m[1], body: m[2] };
}

/**
 * Minimal YAML-ish parser tailored to our fixed schema:
 *   slug: <string>
 *   generated_at: <string>
 *   threads:
 *     text: |
 *       <multiline>
 *     hashtags: [a, b, c]
 *   linkedin:
 *     text: |
 *       <multiline>
 *     hashtags: [a, b, c]
 *
 * We don't support nested structures beyond this.
 */
function parseCaptionFrontmatter(fm) {
  const lines = fm.split('\n');
  const out = { slug: null, generated_at: null, threads: null, linkedin: null };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // top-level scalar: `key: value`
    const scalarMatch = line.match(/^([a-z_]+):\s*(.*)$/);
    if (scalarMatch && (scalarMatch[1] === 'slug' || scalarMatch[1] === 'generated_at')) {
      out[scalarMatch[1]] = scalarMatch[2].trim();
      i++;
      continue;
    }

    // platform block: `threads:` or `linkedin:`
    if (line === 'threads:' || line === 'linkedin:') {
      const platform = line.slice(0, -1);
      const block = { text: '', hashtags: [] };
      i++;

      while (i < lines.length && /^\s+\S/.test(lines[i])) {
        const childLine = lines[i];

        // text: |
        if (/^\s+text:\s*\|\s*$/.test(childLine)) {
          i++;
          const textLines = [];
          while (i < lines.length && (lines[i] === '' || /^\s{4,}/.test(lines[i]))) {
            // strip the 4-space indent that follows `text: |`
            textLines.push(lines[i].replace(/^\s{4}/, ''));
            i++;
          }
          // remove trailing empty lines, then join
          while (textLines.length && textLines[textLines.length - 1] === '') textLines.pop();
          block.text = textLines.join('\n');
          continue;
        }

        // hashtags: [a, b, c]
        const tagMatch = childLine.match(/^\s+hashtags:\s*\[(.*)\]\s*$/);
        if (tagMatch) {
          block.hashtags = tagMatch[1]
            .split(',')
            .map((t) => t.trim().replace(/^["']|["']$/g, '').replace(/^#/, ''))
            .filter(Boolean);
          i++;
          continue;
        }

        // Unknown nested key — skip silently (forward-compat).
        i++;
      }

      out[platform] = block;
      continue;
    }

    i++;
  }

  return out;
}

function validate(cap) {
  const errors = [];
  for (const p of ['threads', 'linkedin']) {
    if (!cap[p]) {
      errors.push(`${p}: block missing`);
      continue;
    }
    if (!cap[p].text || !cap[p].text.trim()) {
      errors.push(`${p}.text: empty`);
    }
    const len = (cap[p].text || '').length;
    if (len > LIMITS[p].text) {
      errors.push(`${p}.text: ${len} chars exceeds limit ${LIMITS[p].text}`);
    }
    if ((cap[p].hashtags || []).length > LIMITS[p].hashtags) {
      errors.push(`${p}.hashtags: ${cap[p].hashtags.length} tags exceeds limit ${LIMITS[p].hashtags}`);
    }
  }
  if (errors.length) {
    const err = new Error('caption validation failed:\n  - ' + errors.join('\n  - '));
    err.code = 'CAPTION_INVALID';
    throw err;
  }
}

/** Compose final post body = text + blank line + hashtags joined by space. */
function composePostBody(block) {
  const tags = (block.hashtags || []).map((t) => '#' + t).join(' ');
  return tags ? `${block.text}\n\n${tags}` : block.text;
}

function parseCaptionFile(path) {
  if (!fs.existsSync(path)) {
    const err = new Error(`caption file not found: ${path}`);
    err.code = 'CAPTION_MISSING';
    throw err;
  }
  const raw = fs.readFileSync(path, 'utf8');
  const { frontmatter } = splitFrontmatter(raw);
  const cap = parseCaptionFrontmatter(frontmatter);
  validate(cap);
  return cap;
}

module.exports = {
  parseCaptionFile,
  parseCaptionFrontmatter,
  composePostBody,
  LIMITS,
};
