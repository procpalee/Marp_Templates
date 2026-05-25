# Raycast — Slide Design System

**출처:** [VoltAgent/awesome-design-md / raycast](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/raycast.css`](slides/raycast.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Raycast** — near-black `#07080a` + 4-step surface ladder + 화이트 CTA + 4색 액센트 + 대각선 red stripe (1× per page). 16:9. **다크 전용**.
프로덕티비티 launcher · 명령 팔레트 · 확장 마켓·키보드 우선 발표용.

---

## §1. Brand & Tone

- **용도:** 런처/명령 팔레트 데모, 키보드 우선 워크플로우, 확장 마켓 launch, 생산성 도구 launch
- **톤:** dark · launcher-first · marketing-as-product · keyboard
- **타깃 청중:** 개발자/디자이너/파워유저/생산성 빌더

---

## §2. Color Tokens (Dark only)

| Token | HEX | 용도 |
|---|---|---|
| `--canvas` | `#07080a` | 슬라이드 배경 (near-black with faint blue tint) |
| `--surface-1` | `#0d0d0d` | 카드, palette body |
| `--surface-2` | `#101111` | active row, code |
| `--surface-3` | `#121212` | keycap fill, hover |
| `--primary` | `#ffffff` | **유일한 CTA 컬러** (white pill) |
| `--primary-press` | `#e8e8e8` | 호버 |
| `--on-primary` | `#000000` | white CTA 위 텍스트 |
| `--accent-red` | `#ff6161` | Slack/Apple 카테고리, error semantic |
| `--accent-yellow` | `#ffc533` | Hacker News, warning |
| `--accent-green` | `#59d499` | productivity, success |
| `--accent-blue` | `#57c1ff` | info, link |
| `--ink` | `#ffffff` | 본문 |
| `--ink-mute` | `#cdcdcd` | 보조 |
| `--ink-sub` | `#8b8d8e` | 캡션 |
| `--ink-soft` | `#5a5c5d` | line number, ghost |
| `--hairline` | `#242728` | 1px 보더 (universal) |

### Brand Stripe (hero only)
- `--stripe-start` `#ff5757` → `--stripe-end` `#a1131a` (대각선 그라데이션)
- 한 데크당 1회 한정 (chrome의 유일한 chromatic gradient)

---

## §3. Typography

- `--font-sans`: `'Inter', 'Pretendard', system-ui, -apple-system, sans-serif`
- `--font-mono`: `'JetBrains Mono', 'SF Mono', ui-monospace, monospace`
- **`font-feature-settings: 'calt', 'kern', 'liga', 'ss03'`** — ss03 alternate single-story `g`가 시그니처 stylistic set
- 헤드라인 weight 700 + 음의 자간 `-0.035em ~ -0.045em`
- 본문 16pt / 1.5

---

## §4. Signature 요소

### 그림자 없음 (절대)
모든 깊이는 surface ladder + hairline으로. `box-shadow` 사용 금지 (cover stripe 그라데이션 제외).

### Marketing-as-product
`palette-hero`, `command-result`, `feature-split`, `extension-row` 모두 실제 Raycast UI mockup. 마케팅 chrome이 곧 product UI.

### Keycap glyphs
`keycap-feature`, `keycap-end`의 키 글리프 — mono font + surface-3 + 1px hairline + 3px bottom edge (raised key 효과).

### Diagonal red stripe
`stripe-cover` 또는 `red-stripe` 슬라이드에만 사용. 한 데크당 1회 한정 (system rule).

### 96px section rhythm
모든 섹션 간 96px (generous monochrome dark).

### 단일 CTA
모든 primary CTA는 흰색 알약 (`background: white; color: black; border-radius: 999px`). 다른 컬러 CTA 없음.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `stripe-cover` | 상단 대각선 red stripe + 72pt 다크 cover |
| 2 | `surface-section` | surface-2 + 144pt 흰 챕터 번호 + 레드 부제 |
| 3 | `palette-hero` | 풀 command palette mockup (search + 5 result rows + ⌘ shortcut keys) |
| 4 | `extension-row` | 2×2 extension 카드 (48px 아이콘 + 메타 + Install pill) |
| 5 | `keycap-feature` | 가운데 큰 keycap 행 (⌘ + space) |
| 6 | `app-grid` | 4×3 컬러 앱 아이콘 타일 (4 액센트 회전) |
| 7 | `pill-tabs` | segment chip control + 필터된 row 리스트 |
| 8 | `red-stripe` | 풀 대각선 레드 stripe 슬라이드 (announcement) |
| 9 | `command-result` | 단일 command result mockup (확대) |
| 10 | `dark-stat` | 4 KPI row (mono 큰 숫자, 4 액센트 컬러 회전) |
| 11 | `feature-split` | 좌 copy + 우 mini palette mockup 50/50 |
| 12 | `keycap-end` | 폐막 + ⌘/↵ floating glyphs 배경 |

### 셸 3개 (shell)
- `cover` — canvas + 60pt 헤드라인 (기본 표지)
- `section` — surface-1 + 96pt 챕터 + uppercase 부제
- `end` — canvas + 60pt + uppercase 부제 (기본 폐막)

---

## §6. Don'ts

- 라이트 배경 사용 금지 — Raycast는 다크 전용
- 그림자 추가 금지 (cover의 stripe 그라데이션은 chrome으로 간주)
- 알약(pill) CTA에 액센트 컬러 (red/yellow/green/blue) 사용 금지 — 화이트 단일 primary
- 액센트 컬러를 chrome (보더/배경)에 사용 금지 — 아이콘/카테고리 데코 전용
- diagonal red stripe를 한 데크에 2회 이상 사용 금지 (system rule)
- mid-gray 텍스트 위계 만들지 말 것 — `--ink-mute`/`--ink-sub` 토큰 사용
- 본문에 `--accent-blue` 직접 사용 금지 (link 한정)
- `ss03` feature-settings 빼지 말 것 (브랜드 시그니처 손실)
