# Cursor — Slide Design System

**출처:** [VoltAgent/awesome-design-md / cursor](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/cursor.css`](slides/cursor.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Cursor** — 따뜻한 cream `#f7f7f4` + 시그니처 Cursor Orange `#f54e00` + 매거진-에디토리얼 보이스 + AI-증강 IDE mockup hero. 16:9.
AI IDE · 에이전트 데모 · 개발 환경 공유 발표용.

---

## §1. Brand & Tone

- **용도:** AI IDE 데모, 에이전트 워크플로우 공유, 코딩 에이전트 launch, 개발자 컨퍼런스 키노트
- **톤:** warm · editorial · calm · keyboard-first
- **타깃 청중:** 개발자/엔지니어/AI 빌더/툴 빌더

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--orange` | `#f54e00` | Cursor Orange — primary CTA, wordmark, accent dot |
| `--orange-active` | `#d04200` | 호버/액티브, inline code 텍스트 |
| `--cream` | `#f7f7f4` | 슬라이드 배경 (warm cream canvas) |
| `--cream-soft` | `#fafaf7` | IDE pane background, section divider |
| `--canvas-card` | `#ffffff` | 카드, code block, mockup card |
| `--surface-strong` | `#e6e5e0` | 배지, sidebar 활성 item |
| `--ink` | `#26251e` | 본문/헤드라인 (warm near-black) |
| `--ink-mute` | `#5a5852` | 본문 보조 |
| `--ink-sub` | `#807d72` | 캡션 |
| `--ink-soft` | `#a09c92` | line number, ghost text |
| `--hairline` | `#e6e5e0` | 1px 보더 (기본) |
| `--hairline-soft` | `#efeee8` | 미세 분리선 |
| `--hairline-strong` | `#cfcdc4` | 진한 보더 |

### Agent Timeline Pills (in-product only)
| Token | HEX | 단계 |
|---|---|---|
| `--pill-peach` | `#dfa88f` | THINKING |
| `--pill-mint` | `#9fc9a2` | GREP |
| `--pill-blue` | `#9fbbe0` | READ |
| `--pill-lavender` | `#c0a8dd` | EDIT |
| `--pill-gold` | `#c08532` | DONE |

> 이 5색은 `agent-timeline` 레이아웃 전용 — system action color로 절대 사용 금지.

### Semantic
- `--success` `#1f8a65` — diff `+` 라인
- `--error` `#cf2d56` — diff `-` 라인

---

## §3. Typography

- `--font-display`: `'CursorGothic', 'Inter', 'Pretendard', system-ui, sans-serif`
  - CursorGothic 비공개. Inter로 fallback
- `--font-text`: 동일 (display와 text 같은 패밀리 사용 — magazine voice)
- `--font-mono`: `'JetBrains Mono', 'SF Mono', ui-monospace, monospace`
- 헤드라인 weight **400** + 음의 자간 `-0.03em ~ -0.04em` — magazine-editorial
- 본문 17pt / 1.6 (editorial pacing)

---

## §4. Signature 요소

### Hairline-only depth
모든 카드·코드 블록·IDE 패널은 `1px solid hairline`만으로 깊이 표현. **그림자 절대 금지**.

### IDE mockup hero
`ide-mockup` 레이아웃은 4-pane (sidebar + editor + chat composer + terminal)을 12px radius 화이트 카드 안에 담음. Cursor 마케팅의 hero 패턴.

### Agent Timeline (5 pastel pills)
peach → mint → blue → lavender → gold 순서의 알약 5개가 에이전트 한 turn을 나타냄. system color가 아닌 product-only signal.

### Scoped Cursor Orange
`#f54e00`는 한 슬라이드당 한 번만 (CTA 또는 wordmark dot). 다중 orange 금지 — "noise" 회피.

### 80px section rhythm
모든 섹션 간 80px (editorial calm).

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `editorial-cover` | cream + 80pt CursorGothic + 작은 orange dot eyebrow |
| 2 | `ide-section` | section divider + 132pt 챕터 번호 + 미니 IDE 스트립 |
| 3 | `ide-mockup` | 4-pane IDE hero (sidebar + editor + chat + terminal) |
| 4 | `composer-chat` | 에이전트 chat 패널 + user/AI msg + tool 로그 + ⌘K input |
| 5 | `agent-timeline` | 5-step 파스텔 알약 timeline + label + desc |
| 6 | `diff-suggest` | diff view (-/+ 라인) + Accept/Reject/Open chip |
| 7 | `cream-grid` | 3-up white 카드 + label eyebrow + hairline only |
| 8 | `mono-feature` | 가운데 단일 56pt 문장 + uppercase mono caption |
| 9 | `tab-stack` | IDE 탭 바 (active highlight) + 코드 패널 |
| 10 | `editor-pair` | 좌우 코드 에디터 (before/after compare) |
| 11 | `orange-cta` | 가운데 단일 Cursor Orange pill CTA |
| 12 | `editorial-end` | cream 폐막 + 88pt + orange wordmark eyebrow |

### 셸 3개 (shell)
- `cover` — cream + 64pt CursorGothic (기본 표지)
- `section` — cream-soft + hairline 위/아래 + 92pt 챕터 + orange 부제
- `end` — cream + 64pt + mono 캡션 (기본 폐막)

---

## §6. Don'ts

- 그림자 추가 금지 — 모든 깊이는 hairline + cream-to-white 대비로
- Cursor Orange `#f54e00`를 본문 텍스트에 직접 사용 금지 (CTA/wordmark/link/inline code 한정)
- 다크 IDE convention 사용 금지 — Cursor의 차별점은 "warm cream editorial canvas"
- Timeline pill 5색을 system action color로 격상 금지 (product-only)
- 헤드라인을 sans bold로 만들지 말 것 — 반드시 weight 400 + 음의 자간
- 한 슬라이드에 Cursor Orange CTA 2개 이상 금지
- 풀-블랙 `#000000` 사용 금지 — `--ink` `#26251e` 사용 (warm near-black)
