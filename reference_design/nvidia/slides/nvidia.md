---
marp: true
theme: nvidia
paginate: true
size: 16:9
header: 'NVIDIA Theme — Hardware AI Green'
footer: '© 2026 · MD to PPT'
---

<!-- _class: hardware-cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="meta">RTX · AI · Data Center · 2026</div>

# The accelerated computing platform.

## Fifteen brand-unique layouts with corner-square identity, large numerics, and pure-black hero chapters.

GTC keynote · spring 2026

<div class="die"></div>

---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Default cover

## White canvas + 60pt for everyday title slides.

NVIDIA Developer · 2026

---

<!-- _class: void-section -->
<!-- _header: '' -->

# 01

## Compute — the silicon, the rack, the cluster.

---

# Basic content slide

The base typography uses **NVIDIA-EMEA** (Arial/Inter fallback) with weights 400/700 only — no italic, no display variants. Inline `code` uses a bordered chip in green, and *mono labels* take uppercase tracking.

- Body copy stays at **16pt** with 1.5 line-height.
- The single brand voltage is **NVIDIA Green `#76b900`** — for large numerics, accents, and CTAs.
- Depth is **hairline-only** (`#cccccc` on light, `#5e5e5e` on dark). No shadows anywhere.

---

<!-- _class: benchmark-bars -->

# Training throughput · Llama 3 70B

## tokens per second · same model, same dataset

<div class="bars">
<div class="label">Generation X</div>
<div class="bar" style="--w: 22%"></div>
<div class="value">312</div>

<div class="label">Last gen</div>
<div class="bar" style="--w: 38%"></div>
<div class="value">540</div>

<div class="label">Competitor</div>
<div class="bar" style="--w: 56%"></div>
<div class="value">792</div>

<div class="label">This gen</div>
<div class="bar hl" style="--w: 100%"></div>
<div class="value hl">1,408</div>
</div>

---

<!-- _class: spec-table -->

# Datasheet · this generation

<div class="table">
<div class="head"><div>Model</div><div>FP8 TFLOPS</div><div>Memory</div><div>Bandwidth</div><div>TDP</div></div>
<div class="row"><div class="name">A40</div><div>312</div><div>48 GB GDDR6</div><div>696 GB/s</div><div>300 W</div></div>
<div class="row"><div class="name">L40</div><div>540</div><div>48 GB GDDR6</div><div>864 GB/s</div><div>350 W</div></div>
<div class="row"><div class="name">H100</div><div>989</div><div>80 GB HBM3</div><div>3.35 TB/s</div><div>700 W</div></div>
<div class="row hl"><div class="name">B200</div><div>2,250</div><div>192 GB HBM3e</div><div>8.0 TB/s</div><div>1,000 W</div></div>
</div>

---

<!-- _class: corner-card-grid -->

# Three pillars of the platform

<div class="grid">
<div class="card">
<div class="label">Silicon</div>

### Blackwell architecture
The accelerator at the core of training and inference.

</div>
<div class="card">
<div class="label">Networking</div>

### NVLink + Spectrum-X
Lossless fabric that lets one model span thousands of GPUs.

</div>
<div class="card">
<div class="label">Software</div>

### CUDA + cuDNN + TensorRT
The stack every framework already optimizes for.

</div>
</div>

---

<!-- _class: large-numeric -->

# Speedup at scale

<div class="num">4<small>×</small></div>

## End-to-end Llama 3 training, B200 vs H100.

Measured on the same cluster, identical model, identical dataset — at NVIDIA labs, Q1 2026.

---

<!-- _class: void-section -->
<!-- _header: '' -->

# 02

## Architecture — the silicon up close.

---

<!-- _class: hardware-hero -->

<div class="copy">

## The accelerator

# Blackwell, two reticles on one die.

Two reticles fused with a 10 TB/s chip-to-chip link present as a single GPU to software. No driver changes, no model partitioning.

<div class="learn">Read the architecture white paper</div>

</div>
<div class="die"></div>

---

<!-- _class: dual-chapter -->

<div class="hero">

## Storage subsystem

# Built for tensors, not files.

Direct GPU storage paths cut PCIe round-trips and let the accelerator pull from disk without staging through host memory.

</div>
<div class="spec">

### Specifications

<div class="row"><div class="k">Form factor</div><div class="v">SXM5</div></div>
<div class="row"><div class="k">Memory</div><div class="v">192 GB HBM3e</div></div>
<div class="row"><div class="k">Bandwidth</div><div class="v">8.0 TB/s</div></div>
<div class="row"><div class="k">NVLink</div><div class="v">1.8 TB/s</div></div>
<div class="row"><div class="k">TDP</div><div class="v">1,000 W</div></div>
<div class="row"><div class="k">Process</div><div class="v">TSMC 4NP</div></div>
</div>

---

<!-- _class: void-section -->
<!-- _header: '' -->

# 03

## Numbers and resources.

---

<!-- _class: green-stat -->

# Production at scale

<div class="row">
<div><strong>2.25</strong><small>petaFLOPS · FP8 per GPU</small></div>
<div><strong>192</strong><small>GB HBM3e per GPU</small></div>
<div><strong>10</strong><small>TB/s chip-to-chip</small></div>
<div><strong>72</strong><small>GPUs per NVL72 rack</small></div>
</div>

---

<!-- _class: link-row -->

# Resources

<div class="grid">
<div class="col">
<h3>Products</h3>
<div class="item">RTX</div>
<div class="item">Data Center</div>
<div class="item">Edge AI</div>
<div class="item">Robotics</div>
</div>
<div class="col">
<h3>Software</h3>
<div class="item">CUDA Toolkit</div>
<div class="item">cuDNN</div>
<div class="item">TensorRT</div>
<div class="item">NeMo</div>
</div>
<div class="col">
<h3>Resources</h3>
<div class="item">White papers</div>
<div class="item">Benchmarks</div>
<div class="item">Reference designs</div>
<div class="item">Developer guides</div>
</div>
<div class="col">
<h3>Company</h3>
<div class="item">About</div>
<div class="item">Investors</div>
<div class="item">Press</div>
<div class="item">Careers</div>
</div>
<div class="col">
<h3>Solutions</h3>
<div class="item">Healthcare</div>
<div class="item">Automotive</div>
<div class="item">Finance</div>
<div class="item">Energy</div>
</div>
<div class="col">
<h3>Support</h3>
<div class="item">Contact</div>
<div class="item">Documentation</div>
<div class="item">Forums</div>
<div class="item">Service</div>
</div>
</div>

---

<!-- _class: white-feature -->

## NVIDIA Developer

# Build with the platform every framework already targets.

Free access to CUDA, cuDNN, TensorRT, and the model registry — start where you already are.

<div class="cta">Join Developer Program</div>

---

<!-- _class: end -->

# Default ending.

## A clean white close for everyday decks.

handle · @nvidia · nvidia.com

---

<!-- _class: void-end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

## GTC 2026

# Accelerate everything.

Read every keynote announcement, technical deep dive, and benchmark report from this year's GTC.

<div class="learn">Read more</div>
