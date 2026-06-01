---
marp: true
theme: vercel
paginate: true
size: 16:9
header: 'Vercel Theme — Mono-Geometric'
footer: '© 2026 · MD to PPT'
---

<!-- _class: mesh-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Build and deploy on the AI Cloud.

## 15 brand-unique layouts, designed from scratch for the Vercel design language.

frontend cloud · 2026

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## A simpler black-on-canvas shell for plain title slides.

handle · @vercel

---

<!-- _class: polarity-section -->
<!-- _header: '' -->

# 01

## Foundations — typography, color, and the polarity-flip.

---

# Basic content slide

The base typography uses **Geist + Inter**, negative letter-spacing `-0.04em`, and hairline `#ebebeb` dividers. Body copy stays at **17pt** for readability without crowding.

- *Tag* Mono-uppercase pill badges replace tech-modern's pill chips.
- Inline `code` uses the neutral hairline background.
- Numbers and KPI live in `Geist Mono` for the editorial cadence.

---

<!-- _class: mono-statement -->

> Sentence-case headlines with deliberate periods.

---

<!-- _class: code-window -->

# macOS-style code window

<div class="window">
<div class="chrome"><span>vercel.ts</span></div>

```typescript
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  rewrites: [routes.rewrite('/api/(.*)', 'https://api.example.com/$1')],
  crons: [{ path: '/api/cleanup', schedule: '0 0 * * *' }],
};
```

</div>

---

<!-- _class: hairline-grid -->

# Nine product surfaces

<div class="grid">
<div><strong>Functions</strong><span>Fluid Compute</span></div>
<div><strong>Edge Config</strong><span>Read-anywhere</span></div>
<div><strong>Blob</strong><span>Public + private</span></div>
<div><strong>Queues</strong><span>Public beta</span></div>
<div><strong>Sandbox</strong><span>Firecracker</span></div>
<div><strong>AI Gateway</strong><span>Multi-provider</span></div>
<div><strong>BotID</strong><span>GA · Jun 2025</span></div>
<div><strong>Rolling</strong><span>Canary releases</span></div>
<div><strong>Workflow</strong><span>Durable steps</span></div>
</div>

---

<!-- _class: polarity-section -->
<!-- _header: '' -->

# 02

## Surfaces — the polarity rhythm in motion.

---

<!-- _class: polarity-pair -->

# Before vs after the Cloud move

<div class="pair">
<div class="dark">

### Before

Ten teams maintained their own runtimes, container images, and ad-hoc cron schedulers.

</div>
<div class="light">

### After

One pipeline, one runtime, one observability surface — measured in active CPU.

</div>
</div>

---

<!-- _class: stack-shadow-feature -->

<div class="feature">

*New* GA — November 2025

# Sign in with Vercel is now generally available.

OAuth identity for every third-party app deployed on the platform. No identity provider lock-in, no infra to babysit.

</div>

---

<!-- _class: mesh-band -->

# What changed this quarter

<div class="band">

Active CPU pricing across every plan, every region, every runtime.

</div>

Q1 2026 release notes · vercel.com/changelog

---

<!-- _class: digit-marquee -->

# Production metrics

<div class="row">
<div><strong>92</strong><span>NPS · enterprise</span></div>
<div><strong>3.4×</strong><span>cold-start drop</span></div>
<div><strong>12k</strong><span>functions per region</span></div>
<div><strong>1h</strong><span>median ttfd</span></div>
</div>

---

<!-- _class: code-pair -->

# Migration diff at a glance

<div class="pair">
<div class="left">

### Old API

```typescript
export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};
```

</div>
<div class="right">

### vercel.ts (recommended)

```typescript
import type { VercelConfig } from '@vercel/config/v1';
export const config: VercelConfig = {
  framework: 'nextjs',
};
```

</div>
</div>

---

<!-- _class: polarity-section -->
<!-- _header: '' -->

# 03

## Closing — quote, thanks, end.

---

<!-- _class: gradient-quote -->

> The web should be **fast by default** — not after you've optimized it.

frontend cloud manifesto · 2026

---

<!-- _class: end -->

# Wrapping up.

## A plain dark close for everyday decks.

handle · @vercel · vercel.com

---

<!-- _class: mesh-end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Thanks.

## Ship the web. Forever.

vercel.com · @vercel · contact@example.com

---

<!-- _class: lecture-definition -->

# 함수형 프로그래밍

## Functional Programming · CS 101

<div class="def-body">
함수형 프로그래밍은 <strong>순수 함수</strong>와 <strong>불변 데이터</strong>로 프로그램을 구성하는 패러다임이다. 동일한 입력에 항상 동일한 출력을 보장하며, 부수효과(side-effect)를 격리한다.
</div>

<div class="def-example">JavaScript의 <code>Array.map</code>은 원본을 변형하지 않고 새 배열을 반환한다.</div>

---

<!-- _class: lecture-objective -->

# 학습 목표

## Learning Objectives

1. <strong>순수 함수</strong>와 <strong>부수효과</strong>의 차이를 설명할 수 있다
2. <strong>불변 데이터</strong>를 다루는 방법을 코드로 구현할 수 있다
3. <strong>고차 함수</strong>(map / filter / reduce)를 적재적소에 활용할 수 있다
4. <strong>함수 합성</strong>으로 복잡한 변환을 단순한 단위로 분해할 수 있다

---

<!-- _class: lecture-example -->

# 고차 함수 예제 풀이

<div class="steps">
<div><span class="num">Step 1</span><span class="body">배열에서 짝수만 골라낸다 (<code>filter</code>)</span></div>
<div><span class="num">Step 2</span><span class="body">각 값을 제곱한다 (<code>map</code>)</span></div>
<div><span class="num">Step 3</span><span class="body">전부 더한다 (<code>reduce</code>)</span></div>
</div>

<div class="result">[1,2,3,4,5] → filter → [2,4] → map → [4,16] → reduce → 20</div>

---

<!-- _class: lecture-takeaway -->

# 핵심 요약

> 함수형 프로그래밍의 <strong>본질</strong>은 "데이터 변환을 작은 함수의 합성으로 표현"하는 것이다.

CS 101 · Week 4 · 2026

---

<!-- _class: lecture-quiz -->

# 다음 중 순수 함수가 아닌 것은?

## Quiz · 5초 안에 답해보세요

<div class="options">
<div data-opt="A"><code>(x, y) => x + y</code></div>
<div data-opt="B"><code>arr => arr.map(x => x*2)</code></div>
<div data-opt="C"><code>() => Date.now()</code></div>
<div data-opt="D"><code>str => str.toUpperCase()</code></div>
</div>

<div class="hint">힌트: <strong>동일한 입력 → 동일한 출력</strong>이 유지되지 않는 함수를 찾으세요.</div>
