// count-usage.mjs — output/ 산출물에서 레이아웃·컴포넌트 사용 빈도 집계
// 사용: node count-usage.mjs [--theme procpa-vivid]
// 목적: v8 레이아웃 다이어트를 데이터 기반으로 유지 (재집계 → ARCHIVE 삭제/부활 판단)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const OUTPUT = join(ROOT, 'output');
const themeFilter = process.argv.includes('--theme')
  ? process.argv[process.argv.indexOf('--theme') + 1]
  : null;

function* walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (e.endsWith('.md')) yield p;
  }
}

const classCount = new Map();
const compCount = new Map();
const files = [];
const COMPONENTS = [
  'card', 'stat', 'vs', 'board', 'panel', 'process', 'quote-block', 'callout',
  'code-block', 'table-block', 'cols-2', 'cols-3', 'cols-4', 'stack', 'split-7-5',
  'mark', 'tag', 'chip', 'kbd', 'note', 'shot', 'eyebrow', 'divider',
];

for (const f of walk(OUTPUT)) {
  const text = readFileSync(f, 'utf8');
  const fm = text.slice(0, 500);
  const themeMatch = fm.match(/^theme:\s*(\S+)/m);
  if (!themeMatch) continue;
  const theme = themeMatch[1];
  if (themeFilter && !theme.startsWith(themeFilter)) continue;
  files.push({ file: relative(ROOT, f), theme });

  // <!-- _class: a b --> 토큰 집계
  for (const m of text.matchAll(/<!--\s*_class:\s*([^>]*?)-->/g)) {
    for (const token of m[1].trim().split(/\s+/)) {
      if (token) classCount.set(token, (classCount.get(token) || 0) + 1);
    }
  }
  // 컴포넌트 div class 집계
  for (const m of text.matchAll(/class="([^"]+)"/g)) {
    for (const token of m[1].trim().split(/\s+/)) {
      if (COMPONENTS.includes(token)) compCount.set(token, (compCount.get(token) || 0) + 1);
    }
  }
}

const sorted = (map) => [...map.entries()].sort((a, b) => b[1] - a[1]);
console.log(`# 사용 빈도 집계 — output/ 기준 ${files.length}개 파일${themeFilter ? ` (theme: ${themeFilter}*)` : ''}\n`);
console.log('## 파일');
for (const { file, theme } of files) console.log(`- ${file} (${theme})`);
console.log('\n## _class 레이아웃 (빈도순)');
for (const [k, v] of sorted(classCount)) console.log(`${String(v).padStart(4)}  ${k}`);
console.log('\n## 컴포넌트 (빈도순)');
for (const [k, v] of sorted(compCount)) console.log(`${String(v).padStart(4)}  ${k}`);
