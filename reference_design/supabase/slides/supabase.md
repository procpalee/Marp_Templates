---
marp: true
theme: supabase
paginate: true
size: 16:9
header: 'Supabase Theme — OSS Backend Mint'
footer: '© 2026 · MD to PPT'
---

<!-- _class: mint-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="eyebrow">Backend infrastructure · 2026</div>

# Build in a weekend. Scale to millions.

## Fifteen brand-unique layouts for an OSS backend — white canvas, single emerald, dev-tool tone.

postgres · auth · storage · realtime · vector

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## White canvas + 64pt Circular for everyday title slides.

dev handbook · 2026

---

<!-- _class: night-section -->
<!-- _header: '' -->

# 01

## The stack — Postgres, end-to-end.

---

# Basic content slide

The base typography uses **Circular** (Inter fallback) on white. Inline `code` rests on a soft canvas chip, and *mono labels* take uppercase tracking. The single brand voltage is **emerald `#3ecf8e`** — reserved for CTAs, dots, and chart accents.

- Body copy stays at **16pt** with 1.55 line-height.
- Code blocks use the deep night surface `#1c1c1c` with 6px radius (square, not pill).
- Composited product mockups (SQL editor, dashboard, log stream) carry the marketing voice — not illustration.

---

<!-- _class: sql-editor -->

# SQL is the API.

<div class="editor">
<div class="toolbar">
<div class="run">▶ Run</div>
<div>main.sql</div>
<div class="file">db.example.supabase.co · postgres@v15</div>
</div>
<div class="query">
<span class="kw">select</span> id, email, plan_tier<br/>
<span class="kw">from</span> profiles<br/>
<span class="kw">where</span> created_at &gt; <span class="str">'2026-01-01'</span><br/>
<span class="kw">order by</span> created_at <span class="kw">desc</span>;
</div>
<div class="result">
<div class="head"><div>id</div><div>email</div><div>plan_tier</div><div>created_at</div></div>
<div class="row"><div class="id">912</div><div>marie@orbit.dev</div><div><span class="badge">team</span></div><div>2026-03-14 10:18</div></div>
<div class="row"><div class="id">911</div><div>kai@kestrel.io</div><div><span class="badge">free</span></div><div>2026-03-14 09:42</div></div>
<div class="row"><div class="id">910</div><div>jess@halcyon.tech</div><div><span class="badge">pro</span></div><div>2026-03-13 22:05</div></div>
<div class="row"><div class="id">909</div><div>nori@lattice.app</div><div><span class="badge">team</span></div><div>2026-03-13 18:51</div></div>
</div>
<div class="footer">
<span class="ok">Success</span>
<span>4 rows · 38ms</span>
</div>
</div>

---

<!-- _class: schema-grid -->

# Three tables, one ledger.

<div class="grid">
<div class="table">
<div class="name">profiles</div>
<div class="col">id <span class="type">uuid</span> <span class="key">PK</span></div>
<div class="col">email <span class="type">text</span></div>
<div class="col">plan_tier <span class="type">enum</span></div>
<div class="col">created_at <span class="type">timestamptz</span></div>
<div class="col">updated_at <span class="type">timestamptz</span></div>
</div>
<div class="table">
<div class="name">workspaces</div>
<div class="col">id <span class="type">uuid</span> <span class="key">PK</span></div>
<div class="col">owner_id <span class="type">uuid</span> <span class="key">FK</span></div>
<div class="col">name <span class="type">text</span></div>
<div class="col">region <span class="type">enum</span></div>
<div class="col">created_at <span class="type">timestamptz</span></div>
</div>
<div class="table">
<div class="name">members</div>
<div class="col">workspace_id <span class="type">uuid</span> <span class="key">FK</span></div>
<div class="col">profile_id <span class="type">uuid</span> <span class="key">FK</span></div>
<div class="col">role <span class="type">enum</span></div>
<div class="col">joined_at <span class="type">timestamptz</span></div>
<div class="col">last_seen <span class="type">timestamptz</span></div>
</div>
</div>

---

<!-- _class: dashboard-stack -->

# Project health, at a glance.

<div class="stack">
<div class="panel">
<div class="head"><div class="title">REQUESTS · LAST 7d</div><div class="delta">+12.4% wow</div></div>
<div class="figure">38.2M</div>
<div class="chart"></div>
</div>
<div class="panel table">
<div class="head"><div class="title">SLOW QUERIES · TOP 4</div><div class="delta">all under 250ms</div></div>
<div class="rows">
<div class="row"><div>SELECT FROM profiles JOIN members</div><div>p99 · 198ms</div><div class="ok">healthy</div></div>
<div class="row"><div>SELECT FROM events WHERE workspace_id</div><div>p99 · 142ms</div><div class="ok">healthy</div></div>
<div class="row"><div>UPDATE profiles SET last_seen</div><div>p99 · 96ms</div><div class="ok">healthy</div></div>
<div class="row"><div>DELETE FROM sessions WHERE expired</div><div>p99 · 74ms</div><div class="ok">healthy</div></div>
</div>
</div>
</div>

---

<!-- _class: log-stream -->

# Realtime logs — tail them like a terminal.

<div class="term">
<div class="line info"><div class="ts">12:42:01.214</div><div class="lvl">info</div><div class="msg">accept POST <span class="hl">/auth/v1/token</span> 200 · 38ms</div></div>
<div class="line ok"><div class="ts">12:42:01.236</div><div class="lvl">ok</div><div class="msg">issued JWT · profile <span class="hl">marie@orbit.dev</span></div></div>
<div class="line info"><div class="ts">12:42:01.501</div><div class="lvl">info</div><div class="msg">subscribe channel <span class="hl">workspace:912</span></div></div>
<div class="line warn"><div class="ts">12:42:02.118</div><div class="lvl">warn</div><div class="msg">rate near soft limit · 9.6k req/min</div></div>
<div class="line info"><div class="ts">12:42:02.480</div><div class="lvl">info</div><div class="msg">accept POST <span class="hl">/rest/v1/workspaces</span> 201 · 22ms</div></div>
<div class="line err"><div class="ts">12:42:02.512</div><div class="lvl">err</div><div class="msg">reject POST /rest/v1/secrets · <span class="hl">RLS policy denied</span></div></div>
<div class="line ok"><div class="ts">12:42:02.799</div><div class="lvl">ok</div><div class="msg">broadcast <span class="hl">workspace:912</span> · 4 subscribers</div></div>
</div>

---

<!-- _class: night-section -->
<!-- _header: '' -->

# 02

## Developer surface — code, results, stats.

---

<!-- _class: code-result -->

# One call, instant query.

<div class="pair">
<div class="col">
<div class="label">supabase-js · client</div>

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('id, email, plan_tier')
  .gt('created_at', '2026-01-01')
  .order('created_at', { ascending: false });
```

</div>
<div class="col result">
<div class="label run">▶ Result</div>
<div class="box">
<div class="row"><div class="k">data:</div><div>4 rows</div></div>
<div class="row"><div class="k">error:</div><div>null</div></div>
<div class="row"><div class="k">status:</div><div class="ok">200 OK · 38ms</div></div>
<div class="row"><div class="k">cached:</div><div>false</div></div>
</div>
</div>
</div>

---

<!-- _class: mono-stat -->

# Production, by the numbers

<div class="row">
<div><strong>2.8M</strong><small>projects launched</small></div>
<div><strong>99.99%</strong><small>uptime SLA · last 90d</small></div>
<div><strong>16</strong><small>regions worldwide</small></div>
<div><strong>38ms</strong><small>median REST latency</small></div>
</div>

---

<!-- _class: gh-badge -->

# Built in the open.

<div class="badges">
<div class="badge"><div class="ico">★</div><div class="body"><strong>71.4k</strong><small>github stars</small></div></div>
<div class="badge"><div class="ico">⑂</div><div class="body"><strong>7.8k</strong><small>forks</small></div></div>
<div class="badge"><div class="ico">●</div><div class="body"><strong>342</strong><small>open issues</small></div></div>
<div class="badge"><div class="ico">＋</div><div class="body"><strong>1.2k</strong><small>contributors</small></div></div>
</div>

---

<!-- _class: polished-grid -->

# Five primitives that compose to anything

<div class="grid">
<div class="card">
<div class="ico">DB</div>

### Postgres
Full Postgres database with extensions, replication, and PITR.

</div>
<div class="card">
<div class="ico">AU</div>

### Auth
Email, magic link, OAuth, MFA — wired straight into RLS.

</div>
<div class="card">
<div class="ico">RT</div>

### Realtime
Broadcast, presence, and Postgres changes over a single channel.

</div>
</div>

---

<!-- _class: night-section -->
<!-- _header: '' -->

# 03

## Closing — CTA, default end, dot pulse.

---

<!-- _class: green-cta -->

# Spin up a project in two minutes.

## A free tier that's actually useful, not a trial.

<div class="cta">Start a new project →</div>

supabase.com/new · open source · MIT

---

<!-- _class: end -->

# Default ending.

## A simple white close for everyday decks.

handle · @supabase · supabase.com

---

<!-- _class: night-end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Ship it.

## Postgres for the rest of us.

supabase.com · @supabase · contact@example.com
