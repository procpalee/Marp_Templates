---
marp: true
theme: stripe
paginate: true
size: 16:9
header: 'Stripe Theme — Premium Indigo'
footer: '© 2026 · MD to PPT'
---

<!-- _class: mesh-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Financial infrastructure for the internet.

## Fifteen brand-unique layouts in indigo, navy, and cream.

payments platform · 2026

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## Cool off-white shell for everyday title slides.

team handbook · 2026

---

<!-- _class: indigo-section -->
<!-- _header: '' -->

# 01

## Foundations — gradient mesh, navy product, tabular numerals.

---

# Basic content slide

The base typography uses **Sohne weight 300** (Inter fallback) with negative letter-spacing. Inline `code` rests on a soft indigo wash, and *tag pills* mark categories in uppercase mono.

- Body copy stays at **16pt** with `font-feature-settings: ss01`.
- Numbers use **tabular figures** (`tnum`) for ledger alignment.
- Indigo is sparing — one CTA per band, never decorative.

---

<!-- _class: polished-grid -->

# Three primitives, one platform

<div class="grid">
<div class="card"><div class="ico">P</div>

### Payments
Accept any payment method, anywhere, with a single integration.

</div>
<div class="card"><div class="ico">I</div>

### Issuing
Create, distribute, and manage physical or virtual cards.

</div>
<div class="card"><div class="ico">C</div>

### Connect
Build a platform that pays out to thousands of accounts.

</div>
</div>

---

<!-- _class: code-dashboard -->

# One integration, two surfaces

<div class="composite">
<div class="code-panel">
<div class="filebar">checkout.ts · server</div>

```typescript
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: 'price_1Q', quantity: 1 }],
  mode: 'payment',
  success_url: 'https://example.com/ok',
  ui_mode: 'embedded',
});
```

</div>
<div class="dashboard">
<div class="label">GROSS VOLUME · LAST 7 DAYS</div>
<div class="figure">$2,418,302<small>+12.4%</small></div>
<div class="chart"></div>
</div>
</div>

---

<!-- _class: cream-band -->

# A chromatic interlude.

<div class="row">
<div>

### Identity
Verify customers and combat fraud with a single SDK.

</div>
<div>

### Tax
Calculate, collect, and remit sales tax in 70 countries.

</div>
<div>

### Climate
Direct a fraction of revenue to remove carbon from the atmosphere.

</div>
</div>

---

<!-- _class: tabular-stats -->

# Production volume — Q1 2026

<div class="row">
<div><strong>$1.4T</strong><small>processed YTD</small></div>
<div><strong>99.999%</strong><small>uptime SLA</small></div>
<div><strong>147</strong><small>countries</small></div>
<div><strong>2.4ms</strong><small>p50 latency</small></div>
</div>

---

<!-- _class: indigo-section -->
<!-- _header: '' -->

# 02

## Commercial — pricing, ledger, mockups.

---

<!-- _class: pricing-tier -->

# Plans for every business

<div class="tiers">
<div class="tier">

### Starter
<div class="price">2.9%<small> + 30¢</small></div>
Pay-as-you-go for new businesses.

- Online + in-person
- 24/7 support
- Issuing add-on
</div>
<div class="tier inverted">

### Scale
<div class="price">Custom</div>
Volume discounts and dedicated success.

- Negotiated rates
- Multi-region routing
- Dedicated success
- Priority on-call
</div>
<div class="tier">

### Enterprise
<div class="price">Contact</div>
For platforms and marketplaces.

- White-label Connect
- Custom contracts
- Procurement options
</div>
</div>

---

<!-- _class: ledger-row -->

# This week's payouts

<div class="ledger">
<div class="head"><div>Description</div><div>Customer</div><div>Method</div><div>Status</div><div class="amount">Amount</div></div>
<div class="row"><div>Subscription · Annual</div><div>orbit.dev</div><div>Card · 4242</div><div><span class="status paid">Paid</span></div><div class="amount">$12,480.00</div></div>
<div class="row"><div>Invoice INV-1042</div><div>kestrel.io</div><div>ACH</div><div><span class="status pending">Pending</span></div><div class="amount">$2,930.00</div></div>
<div class="row"><div>Refund · REF-994</div><div>halcyon.tech</div><div>Card · 0019</div><div><span class="status refund">Refund</span></div><div class="amount">−$430.00</div></div>
<div class="row"><div>Subscription · Annual</div><div>lattice.app</div><div>Card · 8830</div><div><span class="status paid">Paid</span></div><div class="amount">$1,200.00</div></div>
<div class="row"><div>Payout · Connected</div><div>nori.studio</div><div>Bank</div><div><span class="status paid">Paid</span></div><div class="amount">$8,612.40</div></div>
</div>

---

<!-- _class: indigo-cta -->

# Start accepting payments in minutes.

## No setup fees, no monthly fees, no hidden fees.

<div class="cta">Create an account →</div>

stripe.com/start

---

<!-- _class: gradient-band -->

# What the mesh signals

<div class="band">

Premium financial infrastructure, designed for the people who ship money on the internet.

</div>

stripe brand book · 2026

---

<!-- _class: dual-mockup -->

# Build and observe.

<div class="pair">
<div class="terminal">
<div class="ttybar">$ stripe listen --forward-to localhost:4242</div>

```bash
$ stripe listen --forward-to localhost:4242
Ready! Webhook signing secret: whsec_31a...
2026-03-14 13:42:01 → payment_intent.succeeded
2026-03-14 13:42:01 → charge.succeeded
2026-03-14 13:42:02 → invoice.paid
```

</div>
<div class="chart">

### Volume · 7d
<div class="meta">USD · gross</div>
<div class="bars">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>
</div>
</div>

---

<!-- _class: indigo-section -->
<!-- _header: '' -->

# 03

## Closing — section default, navy end, cream thanks.

---

<!-- _class: end -->

# Default ending.

## A navy close for everyday decks.

handle · @stripe · stripe.com

---

<!-- _class: cream-thanks -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Thank you.

## Build something great with us.

<div class="cta">Start free →</div>

stripe.com · @stripe · contact@example.com
