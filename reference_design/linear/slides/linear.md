---
marp: true
theme: linear
paginate: true
size: 16:9
header: 'Linear Theme — Ultra-Minimal Dark'
footer: '© 2026 · MD to PPT'
---

<!-- _class: void-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="eyebrow">— v2.4 — Cycle handbook</div>

# Project management for engineers.

## Fifteen brand-unique layouts in near-black, violet, and surface ladder.

build out loud · 2026

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## Near-black canvas + 60pt headline + 2px violet top border.

handle · @linear

---

<!-- _class: violet-section -->
<!-- _header: '' -->

# 01

## Foundations — surface ladder, single violet, no shadows.

---

# Basic content slide

The base typography uses **Linear Display + Linear Text** (Inter fallback) on a near-black canvas `#010102`. Inline `code` sits in a `surface-2` chip with a hairline. *Tag pills* take mono uppercase with subtle violet border.

- Body copy stays at **16pt** on dark — high contrast `#f7f8f8` over near-black.
- Depth comes from a **surface ladder** (`#0f1011` → `#18191a`) + hairlines (`#23252a` → `#3e3e44`).
- The brand rejects: gradients, drop shadows, pill-rounded buttons, second accents.

---

<!-- _class: issue-list -->

# This cycle — top of the backlog

<div class="list">
<div class="head"><div></div><div>Issue</div><div>Title</div><div>Label</div><div>Owner</div></div>
<div class="row"><div class="icon progress"></div><div class="id">ENG-412</div><div class="title">Migrate the changelog renderer to MDX</div><div><span class="label feature">Feature</span></div><div class="assignee">M</div></div>
<div class="row"><div class="icon review"></div><div class="id">ENG-409</div><div class="title">Race condition in webhook delivery</div><div><span class="label bug">Bug</span></div><div class="assignee">K</div></div>
<div class="row"><div class="icon todo"></div><div class="id">ENG-415</div><div class="title">Investigate audit-log retention policy</div><div><span class="label spike">Spike</span></div><div class="assignee">J</div></div>
<div class="row"><div class="icon done"></div><div class="id">ENG-401</div><div class="title">SSO group sync — partial rollout</div><div><span class="label feature">Feature</span></div><div class="assignee">N</div></div>
<div class="row"><div class="icon done"></div><div class="id">ENG-398</div><div class="title">Fix overflow in dashboard sidebar</div><div><span class="label bug">Bug</span></div><div class="assignee">O</div></div>
</div>

---

<!-- _class: status-board -->

# Cycle 31 · board view

<div class="board">
<div class="col todo">
<div class="title">Todo<span class="count">4</span></div>
<div class="card"><span class="id">ENG-420</span>Document the new diff renderer</div>
<div class="card"><span class="id">ENG-422</span>Add status filter to issue list</div>
<div class="card"><span class="id">ENG-423</span>Schema migration · cycles v2</div>
</div>
<div class="col progress">
<div class="title">In&nbsp;Progress<span class="count">2</span></div>
<div class="card"><span class="id">ENG-412</span>Migrate the changelog renderer to MDX</div>
<div class="card"><span class="id">ENG-414</span>Refactor the cycle widget</div>
</div>
<div class="col review">
<div class="title">In&nbsp;Review<span class="count">2</span></div>
<div class="card"><span class="id">ENG-409</span>Race condition in webhook delivery</div>
<div class="card"><span class="id">ENG-411</span>Improve search relevance for projects</div>
</div>
<div class="col done">
<div class="title">Done<span class="count">5</span></div>
<div class="card"><span class="id">ENG-401</span>SSO group sync — partial rollout</div>
<div class="card"><span class="id">ENG-398</span>Fix overflow in dashboard sidebar</div>
<div class="card"><span class="id">ENG-395</span>Bump the markdown grammar</div>
</div>
</div>

---

<!-- _class: surface-grid -->

# Three principles that hold the system together

<div class="grid">
<div class="card">
<div class="glyph"></div>

### Surface ladder
Five stops of near-black create depth without shadows. The hairline does the rest.

</div>
<div class="card">
<div class="glyph"></div>

### Single accent
One violet, never two. Status colors are functional, never decorative.

</div>
<div class="card">
<div class="glyph"></div>

### Dense product
The marketing surface is the product surface. No mockup ever looks fake.

</div>
</div>

---

<!-- _class: violet-section -->
<!-- _header: '' -->

# 02

## Product — palette, shortcuts, milestones, cycles.

---

<!-- _class: command-palette -->

# ⌘K is the canonical surface

<div class="palette">
<div class="input"><span class="typed">migrate</span><span class="ghost"> the changelog renderer to MDX</span></div>
<div class="results">
<div class="item"><span class="icon"></span>Search issues<span class="shortcut">↵</span></div>
<div class="item active"><span class="icon"></span>Create issue · "Migrate the changelog renderer to MDX"<span class="shortcut">⌘ ↵</span></div>
<div class="item"><span class="icon"></span>Switch to cycle view<span class="shortcut">G C</span></div>
<div class="item"><span class="icon"></span>Open project · Changelog<span class="shortcut">O P</span></div>
<div class="item"><span class="icon"></span>Toggle dark mode<span class="shortcut">⌘ ⇧ L</span></div>
</div>
</div>

---

<!-- _class: keyboard-shortcut -->

# Speed comes from your hands.

## Quick-create issues with one keystroke.

<div class="keys">
<div class="key">⌘</div>
<div class="plus">+</div>
<div class="key wide">N</div>
</div>

Press anywhere in the app — Linear opens the issue draft inline.

---

<!-- _class: milestone-timeline -->

# Cycle 31 — milestones

## February 24 → March 17

<div class="timeline">
<div class="milestone done">
<div class="date">FEB 24</div>
<div class="title">Cycle start</div>
<div class="desc">Backlog groomed, owners assigned, dependencies mapped.</div>
</div>
<div class="milestone done">
<div class="date">MAR 03</div>
<div class="title">Mid-cycle check</div>
<div class="desc">Burndown reviewed at engineering sync.</div>
</div>
<div class="milestone active">
<div class="date">MAR 14</div>
<div class="title">Feature freeze</div>
<div class="desc">Only bugs and polish accepted past this point.</div>
</div>
<div class="milestone">
<div class="date">MAR 17</div>
<div class="title">Cycle close</div>
<div class="desc">Demo, retrospective, next-cycle planning.</div>
</div>
</div>

---

<!-- _class: cycle-progress -->

# Cycle 31 · progress

<div class="row">
<div class="ring">
<div class="pct">68<small>%</small></div>
</div>
<div class="meta">
<div class="label">PROJECT · CHANGELOG MIGRATION</div>
<div class="title">Migrate the changelog renderer to MDX</div>
<div class="stats">
<div><strong>14</strong>scope</div>
<div><strong>9</strong>completed</div>
<div><strong>2</strong>in review</div>
<div><strong>3</strong>in progress</div>
<div><strong>0</strong>blocked</div>
<div><strong>5d</strong>remaining</div>
</div>
</div>
</div>

---

<!-- _class: surface-quote -->

<div class="card">

> The fastest team is the one that doesn't argue about the tool. The tool gets out of the way and the work happens.

<div class="author">
<div class="avatar">M</div>
<div><strong>Marie Aoki</strong> · Engineering lead</div>
</div>
</div>

---

<!-- _class: integration-row -->

# Connected to where the work already lives.

## Eight first-party integrations, plus a public API.

<div class="logos">
<div class="tile">github</div>
<div class="tile">slack</div>
<div class="tile">figma</div>
<div class="tile">notion</div>
<div class="tile">sentry</div>
<div class="tile">vercel</div>
<div class="tile">zendesk</div>
<div class="tile">discord</div>
</div>

---

<!-- _class: violet-section -->
<!-- _header: '' -->

# 03

## Closing — surface end, void end.

---

<!-- _class: end -->

# Default ending.

## A simple near-black close with a 2px violet bar.

handle · @linear · linear.app

---

<!-- _class: void-end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Ship it.

## Built for the team that wants the work to be the point.

linear.app · @linear · contact@example.com
