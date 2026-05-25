---
marp: true
theme: cursor
paginate: true
size: 16:9
header: 'Cursor Theme — Warm Editorial AI IDE'
footer: '© 2026 · MD to PPT'
---

<!-- _class: editorial-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="eyebrow">Cursor · Spring 2026</div>

# The IDE that types with you.

## Fifteen brand-unique layouts for the warm editorial voice of an AI-augmented IDE.

build out loud · made with cream + orange

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## Warm cream + 64pt CursorGothic for everyday title slides.

editorial deck · 2026

---

<!-- _class: ide-section -->
<!-- _header: '' -->

# 01

## Foundations — cream canvas, orange voltage, hairline depth.

<div class="mini-ide">
<div class="col">src</div>
<div class="col">main.ts · cmd K to chat</div>
<div class="col">agent · ready</div>
</div>

---

# Basic content slide

The base typography uses **CursorGothic** (Inter fallback) with weight 400 across display and body — magazine-editorial voice, not tech-bombastic. Inline `code` rests on white with a hairline, and *mono labels* take uppercase tracking.

- Body copy stays at **17pt** with 1.6 line-height (editorial pacing).
- The single brand voltage is **Cursor Orange `#f54e00`** — reserved for primary CTAs.
- Depth is hairline-only. No drop shadows. No elevation tiers.

---

<!-- _class: ide-mockup -->

# Four panes, one conversation.

<div class="ide">
<div class="sidebar">
<div class="group">Files</div>
<div class="item">README.md</div>
<div class="item active">main.ts</div>
<div class="item">config.ts</div>
<div class="item">vercel.ts</div>
<div class="group">Search</div>
<div class="item">⌘ + Shift + F</div>
</div>
<div class="editor">
<div><span class="ln">1</span><span class="kw">export const</span> handler = <span class="kw">async</span> (req) => {</div>
<div><span class="ln">2</span>  <span class="kw">const</span> result = <span class="kw">await</span> agent.run(req);</div>
<div><span class="ln">3</span>  <span class="kw">return</span> <span class="str">'ok'</span>;</div>
<div><span class="ln">4</span>};</div>
<div><span class="ln">5</span></div>
<div><span class="ln">6</span><span class="ghost">// Cursor: extract this into a queue worker?</span></div>
</div>
<div class="chat">
<div class="head">Composer</div>
<div class="msg user">Make this idempotent and add a queue.</div>
<div class="msg ai">Reading main.ts and queue/worker.ts. Adding dedupe key on requestId, wiring to Vercel Queues, and writing a test.</div>
</div>
<div class="term">$ npm run dev — ready on http://localhost:3000</div>
</div>

---

<!-- _class: composer-chat -->

# Talking to the composer.

<div class="chat">
<div class="msg user">
<div class="avatar">M</div>
<div class="body">Refactor the auth middleware to use the new identity SDK and add a 401 fast-path.</div>
</div>
<div class="msg ai">
<div class="avatar">C</div>
<div class="body">Reading <code>middleware.ts</code>, scanning <code>identity-sdk</code> usage across the workspace, and drafting a diff.</div>
</div>
<div class="tool"><strong>grep</strong>  identity-sdk · 12 matches in 4 files</div>
<div class="tool"><strong>read</strong>  middleware.ts · 142 lines</div>
<div class="tool"><strong>edit</strong>  middleware.ts, identity.ts · 3 hunks</div>
<div class="msg ai">
<div class="avatar">C</div>
<div class="body">Wired the SDK and added the 401 fast-path. Tests pass locally — ready for your review.</div>
</div>
<div class="input">Ask anything · the agent is listening</div>
</div>

---

<!-- _class: agent-timeline -->

# A single agent turn, five stages.

## Every reply traces through the same pipeline — visible, inspectable, abortable.

<div class="steps">
<div class="step">
<div class="pill">Thinking</div>
<div class="label">Plan the turn</div>
<div class="desc">Pick which tools the request needs.</div>
</div>
<div class="step">
<div class="pill">Grep</div>
<div class="label">Find the code</div>
<div class="desc">Scan the workspace for symbols.</div>
</div>
<div class="step">
<div class="pill">Read</div>
<div class="label">Load context</div>
<div class="desc">Pull the relevant files in full.</div>
</div>
<div class="step">
<div class="pill">Edit</div>
<div class="label">Write the change</div>
<div class="desc">Apply diffs across affected files.</div>
</div>
<div class="step">
<div class="pill">Done</div>
<div class="label">Hand back</div>
<div class="desc">Summarize and surface review hooks.</div>
</div>
</div>

---

<!-- _class: diff-suggest -->

# Every edit lands as a reviewable diff.

<div class="diff">
<span class="line ctx">  export async function handler(req: Request) {</span>
<span class="line del">-   const user = await session.get(req);</span>
<span class="line del">-   if (!user) return new Response('forbidden', { status: 403 });</span>
<span class="line add">+   const user = await identity.verify(req);</span>
<span class="line add">+   if (!user) return new Response(null, { status: 401 });</span>
<span class="line ctx">    return new Response(JSON.stringify(await load(user.id)));</span>
<span class="line ctx">  }</span>
</div>
<div class="actions">
<div class="chip primary">Accept all</div>
<div class="chip">Reject</div>
<div class="chip">Open in editor</div>
</div>

---

<!-- _class: ide-section -->
<!-- _header: '' -->

# 02

## Tooling — three principles that hold the editor together.

<div class="mini-ide">
<div class="col">tools</div>
<div class="col">3 principles · always-on</div>
<div class="col">composer</div>
</div>

---

<!-- _class: cream-grid -->

# Three principles

<div class="grid">
<div class="card">
<div class="label">Predictable</div>

### Same pipeline every turn
Every agent run goes through the same five stages so you can intervene at any step.

</div>
<div class="card">
<div class="label">Reviewable</div>

### Every edit is a diff
The agent never writes silently. You see every line before it lands.

</div>
<div class="card">
<div class="label">Local-first</div>

### The repo is the source of truth
No cloud project, no hidden state. Your codebase is the workspace.

</div>
</div>

---

<!-- _class: mono-feature -->

> The best AI in the editor is the one you forget is there.

<div class="caption">A note from the design team</div>

---

<!-- _class: tab-stack -->

# Tabs you'd write yourself.

<div class="stack">
<div class="tabs">
<div class="tab">README.md</div>
<div class="tab active">middleware.ts</div>
<div class="tab">identity.ts</div>
<div class="tab">queue/worker.ts</div>
</div>

```typescript
export async function middleware(req: Request) {
  const user = await identity.verify(req);
  if (!user) return new Response(null, { status: 401 });
  req.headers.set('x-user-id', user.id);
  return next();
}
```

</div>

---

<!-- _class: editor-pair -->

# Reviewing the diff side-by-side.

<div class="pair">
<div class="editor left">
<div class="title">middleware.ts · before</div>

```typescript
const user = await session.get(req);
if (!user) return new Response('forbidden', {
  status: 403,
});
```

</div>
<div class="editor right">
<div class="title">middleware.ts · after</div>

```typescript
const user = await identity.verify(req);
if (!user) return new Response(null, {
  status: 401,
});
```

</div>
</div>

---

<!-- _class: ide-section -->
<!-- _header: '' -->

# 03

## Closing — CTA, default end, editorial wordmark.

<div class="mini-ide">
<div class="col">close</div>
<div class="col">three slides · cta + end + wordmark</div>
<div class="col">⌘ + return</div>
</div>

---

<!-- _class: orange-cta -->

# Try it on a project you already know.

## The agent learns the codebase the moment you open it.

<div class="cta">Download Cursor →</div>

cursor.com · made for keyboards

---

<!-- _class: end -->

# Default ending.

## A simpler cream close for everyday decks.

handle · @cursor

---

<!-- _class: editorial-end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="wordmark">Cursor — Spring 2026</div>

# Until next time.

## Build out loud. Talk to the editor.

cursor.com · @cursor · contact@example.com
