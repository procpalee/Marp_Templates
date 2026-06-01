# Tesla — Slide Design System

**출처:** [VoltAgent/awesome-design-md / tesla](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/tesla.css`](slides/tesla.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Tesla** — 화이트/카본 모노크롬 + 단일 Electric Blue `#3E6AE1` + 극단적 whitespace + 풀-viewport 차량 hero + 4px barely-rounded + no shadows. 16:9.
자동차·럭셔리 모노크롬·풀-viewport 갤러리 페이싱 발표용.

---

## §1. Brand & Tone

- **용도:** 자동차/EV launch, 럭셔리 미니멀 발표, 갤러리/카탈로그, 인베스터 데이, 신모델 공개
- **톤:** monochrome + 단일 blue · gallery pacing · extreme whitespace · unembellished · luxury signal
- **타깃 청중:** 일반 소비자/투자자/오토 인더스트리/EV 빌더

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--electric` | `#3E6AE1` | **유일한 chromatic** — primary CTA, link, blue gauge |
| `--electric-press` | `#1d4ec4` | 호버, press |
| `--canvas` | `#ffffff` | 슬라이드 배경 (dominant) |
| `--light-ash` | `#F4F4F4` | alternate surface, section divider, category tile |
| `--cloud` | `#EEEEEE` | secondary CTA fill, frosted pill |
| `--carbon` | `#171A20` | 본문 헤드라인, dark surface (section/dashboard) |
| `--graphite` | `#393C41` | 본문 |
| `--pewter` | `#5C5E62` | 보조 |
| `--silver` | `#8E8E8E` | 캡션, placeholder |
| `--on-dark` | `#ffffff` | 다크 위 텍스트 |
| `--on-dark-mute` | `rgba(255,255,255,0.78)` | 다크 보조 |
| `--hairline` | `#d8d8d8` | 1px 보더 |
| `--hairline-strong` | `#c1c1c1` | 진한 보더 |

**No semantic colors** — 에러/성공/경고 별도 컬러 없음. 시스템은 deliberately 모노크롬 + 1 blue.

---

## §3. Typography

- `--font-display`: `'Universal Sans Display', 'Inter', 'Pretendard', -apple-system, Arial, sans-serif`
  - Universal Sans 비공개. Inter/Arial fallback
- `--font-text`: `'Universal Sans Text', 'Inter', 'Pretendard', -apple-system, Arial, sans-serif`
- 헤드라인 weight 500 + 자간 `-0.005em ~ -0.015em` (modest 음수)
- 본문 16pt / 1.5
- **italic 없음, OpenType feature 없음** (시스템 deliberately unembellished)
- 거대 numeric: 120~240pt weight 300

---

## §4. Signature 요소

### Extreme whitespace (luxury signal)
모든 슬라이드 padding 96px 120px (다른 테마 대비 +50%). "one message per screen" 철학.

### Full-viewport vehicle hero
`vehicle-cover`, `gallery-hero` 모두 100vh (Marp 1280×720 고정 안에서) 풀-bleed 차량 placeholder + 그라데이션 background.

### 4px barely-rounded
모든 버튼/카드 `border-radius: 4px` (CTA), 12px (category 카드). 알약(pill) 사용 안 함 (단 frosted nav pill 예외).

### 단일 Electric Blue
모든 인터랙티브 요소는 `--electric` `#3E6AE1` 하나. secondary CTA는 항상 `--carbon` 또는 `--cloud`.

### No shadows anywhere
모든 깊이는 z-index layering + opacity transparency로. drop-shadow 절대 금지.

### Side-by-side CTA pair
대부분의 hero 슬라이드에 "Order now / View inventory" 두 CTA 페어 (primary blue + secondary white/dark).

### Frosted nav
`frosted-nav` 레이아웃의 상단 nav는 `rgba(255,255,255,0.78) + backdrop-filter: blur(12px)` — Tesla 시그니처.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `vehicle-cover` | 풀-bleed vehicle photo placeholder + topnav + 56pt + 2 CTA pair |
| 2 | `carbon-section` | Carbon Dark + 96pt 가운데 + uppercase 부제 + blue link |
| 3 | `gallery-hero` | 풀-bleed 차량 다크 grad + 48pt + 2 CTA pair (center) |
| 4 | `category-2up` | 큰 좌 light tile + 작은 우 dark tile (asymmetric) |
| 5 | `spec-strip` | 4-col specs (0-60 / Range / Top Speed / Charging) + footnote |
| 6 | `vehicle-3up` | 3 vehicle nav 카드 (PNG-style ride placeholder + 가격 + 2 CTA) |
| 7 | `dashboard-mockup` | 다크 dashboard UI mockup (큰 speed + 4 gauge bar) |
| 8 | `feature-callout` | 가운데 단일 60pt + 2 CTA pair |
| 9 | `velocity-stat` | 240pt 단일 숫자 (0-60 s 등) + caption |
| 10 | `chart-pair` | 2-up 차트 (acceleration + range) — blue line |
| 11 | `frosted-nav` | 상단 floating frosted nav + body content |
| 12 | `monochrome-end` | 풀화이트 폐막 + 60pt + 2 CTA pair |

### 셸 3개 (shell)
- `cover` — 화이트 + 80pt 가운데 정렬 (기본 표지)
- `section` — light-ash + 96pt 가운데 챕터
- `end` — 화이트 + 56pt + Blue link "Learn more ›"

---

## §6. Don'ts

- Electric Blue `--electric` 외 chromatic 컬러 금지 (단일 voltage)
- 그림자 추가 금지 — 모든 깊이는 layering으로
- italic 사용 금지 (시스템 unembellished)
- 알약(pill) CTA 만들지 말 것 — 4px sharp rectangle (단 frosted nav pill 예외)
- semantic color (success green, warn yellow) 추가 금지
- mid-gray 텍스트 위계 만들지 말 것 — `--graphite`/`--pewter`/`--silver` 토큰 사용
- 본문 부피를 줄이지 말 것 — 96px 120px padding 유지 (luxury signal 손실)
- one message per screen — 슬라이드 하나에 컨셉 둘 이상 넣지 말 것
