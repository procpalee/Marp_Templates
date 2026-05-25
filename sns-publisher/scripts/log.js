/**
 * log.js — publish.log append-only writer + duplicate-guard reader
 *
 * Log format: one JSON line per event.
 *   { ts, slug, platform, status, postId?, error? }
 *
 * Used by index.js for:
 *  - audit trail (after each publish step)
 *  - duplicate-guard: warn if same slug published to same platform within 24h
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

function appendEvent(logPath, event) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const line = JSON.stringify({ ts: new Date().toISOString(), ...event }) + '\n';
  fs.appendFileSync(logPath, line, 'utf8');
}

/** Read recent events. Returns events newer than `sinceMs` (default: 24h). */
function recentEvents(logPath, sinceMs = 24 * 3600 * 1000) {
  if (!fs.existsSync(logPath)) return [];
  const cutoff = Date.now() - sinceMs;
  const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);
  const events = [];
  for (const l of lines) {
    try {
      const e = JSON.parse(l);
      if (new Date(e.ts).getTime() >= cutoff) events.push(e);
    } catch { /* skip malformed */ }
  }
  return events;
}

/** Return true if (slug, platform) was published successfully within the window. */
function isRecentSuccess(logPath, slug, platform, sinceMs) {
  return recentEvents(logPath, sinceMs).some(
    (e) => e.slug === slug && e.platform === platform && e.status === 'ok'
  );
}

module.exports = { appendEvent, recentEvents, isRecentSuccess };
