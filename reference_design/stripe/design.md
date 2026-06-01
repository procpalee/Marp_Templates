# Stripe — Slide Design System

**출처:** [VoltAgent/awesome-design-md / stripe](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/stripe.css`](slides/stripe.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Stripe** — 일렉트릭 인디고 `#533afd` + 딥 네이비 `#1c1e54` + 그라데이션 메시 (크림/sherbet/라벤더/인디고/핑크). 16:9.
핀테크·결제·SaaS B2B 프리미엄 발표용.

---

## §1. Brand & Tone

- **용도:** 핀테크/결제 데모, SaaS B2B 피치, IR, 개발자 컨퍼런스, 통합 제품 launch
- **톤:** premium · polished · technical · disciplined
- **타깃 청중:** 개발자/제품 PM/CFO/금융 빌더

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--indigo` | `#533afd` | Primary — 강조, link, CTA, code |
| `--indigo-deep` | `#4434d4` | 호버 |
| `--indigo-press` | `#2e2b8c` | 활성 |
| `--indigo-soft` | `#665efd` | 보조 강조, navy 위 hover |
| `--navy` | `#1c1e54` | 다크 surface (section, end, code, inverted pricing) |
| `--navy-deep` | `#0f1238` | 보조 |
| `--canvas` | `#ffffff` | 슬라이드 배경 |
| `--canvas-soft` | `#f6f9fc` | cover, ledger head |
| `--canvas-cream` | `#f5e9d4` | cream-band, cream-thanks (chromatic interlude) |
| `--hairline` | `#e3e8ee` | 카드/표 보더 |
| `--hairline-strong` | `#c8d2e0` | 진한 보더 |
| `--ink` | `#0a2540` | 본문 헤드라인 |
| `--ink-mute` | `#425466` | 본문 |
| `--ink-sub` | `#8898aa` | 캡션 |

### 그라데이션 메시 (`--mesh-bg`)
5 stop radial — 좌상 cream `#f5e9d4` → 상중 sherbet → 우상 lavender `#c5b0f4` → 우하 indigo `#533afd` → 좌하 pink `#ff3d8b`, 베이스 white.
`mesh-cover` 와 `gradient-band` 2개 슬라이드에서만 사용.

---

## §3. Typography

- `--font-sans`: `'Sohne', 'Inter', 'Pretendard', 'SF Pro Display', system-ui, sans-serif`
  - Sohne는 비공개. Inter로 fallback
- `--font-mono`: `'Sohne Mono', 'JetBrains Mono', 'SF Mono', ui-monospace, monospace`
- **`font-feature-settings: 'ss01'`** (stylistic alternate) 항상 활성
- 헤드라인 weight **300** + 음의 자간 `-0.035em ~ -0.045em` (Stripe 시그니처 가는 헤드)
- 본문 16pt / 1.55
- **`font-variant-numeric: tabular-nums`** — KPI/ledger 슬라이드에서 활성

---

## §4. Signature 요소

### Multi-stack shadow
- `--shadow-card`: `0 1px 3px rgba(0,55,112,0.08)` — 기본 카드
- `--shadow-lift`: dual-layer `0 2px 6px + 0 8px 24px`
- `--shadow-float`: triple-layer `0 4px 12px + 0 24px 48px` — 코드 윈도우, dashboard

### Tabular figures
모든 숫자(KPI, ledger, pricing)는 `tabular-nums`로 자릿수 정렬. 핀테크 DNA의 핵심.

### Cream interlude
풀 cream `#f5e9d4` 슬라이드(`cream-band`/`cream-thanks`)는 indigo/navy/white 페이싱 중간의 "chromatic interlude". 한 덱당 1-2회만.

### Navy + indigo CTA
indigo는 한 슬라이드당 한 번만 (CTA 또는 link). 다중 indigo 금지.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `mesh-cover` | 5-stop 그라데이션 메시 hero (cream/lavender/indigo/pink) |
| 2 | `indigo-section` | 풀 navy + 144pt 인디고 챕터 번호 |
| 3 | `polished-grid` | 3-up hairline 카드 + multi-stack shadow + 인디고 아이콘 |
| 4 | `code-dashboard` | 좌 navy 코드 패널 + 우 white dashboard mockup (KPI + chart) |
| 5 | `cream-band` | 풀 cream interlude + 3 컬럼 feature row |
| 6 | `tabular-stats` | 4 KPI · 72pt 가는 tabular-num |
| 7 | `pricing-tier` | 3 가격 카드 (중앙 navy inverted) |
| 8 | `indigo-cta` | 가운데 단일 indigo pill CTA |
| 9 | `gradient-band` | 슬라이드 중앙 가로 메시 띠 |
| 10 | `dual-mockup` | navy terminal + white chart 카드 페어 |
| 11 | `ledger-row` | 핀테크 ledger 표 (tabular-nums + 상태 칩) |
| 12 | `cream-thanks` | cream 폐막 + 80pt + indigo CTA |

### 셸 3개 (shell)
- `cover` — canvas-soft 배경 (기본 표지)
- `section` — hairline 위/아래 + 88pt 챕터 (기본 디바이더)
- `end` — navy + 흰 헤드라인 (기본 폐막)

---

## §6. Don'ts

- 인디고 `--indigo`를 본문 텍스트 색으로 쓰지 말 것 (CTA/link/code 전용)
- 한 슬라이드에 인디고 CTA 2개 이상 금지 (premium discipline)
- 둥근 카드 radius `> 16px` 금지 (Stripe는 12px 표준)
- 그라데이션 메시를 일반 콘텐츠 슬라이드 배경으로 재사용 금지 (mesh-cover/gradient-band/cream-thanks 한정)
- 숫자에 `tabular-nums` 빠뜨리지 말 것 (ledger/KPI/pricing은 필수)
- cream band를 한 덱당 2회 초과 금지 (interlude의 의미 손상)
- 풀-블랙 `#000000` 금지 — 다크 surface는 navy `#1c1e54`
