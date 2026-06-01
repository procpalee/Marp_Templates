# Figma — Slide Design System

**출처:** [VoltAgent/awesome-design-md / figma](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/figma.css`](slides/figma.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Figma** — 순수 블랙앤화이트 + 8색 saturated 파스텔 블록 + 알약 버튼 + 프레임/멀티플레이어 메타포. 16:9.
디자인 툴·디자인 시스템·콜라보레이션·창의적 워크숍 발표용.

---

## §1. Brand & Tone

- **용도:** 디자인 시스템 공유, 프로덕트 디자인 발표, 디자인 툴 데모, 콜라보레이션 워크숍
- **톤:** technical + joyful · serious-yet-playful · color-confident
- **타깃 청중:** 디자이너/디자인 엔지니어/PM/창작자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--ink` | `#000000` | 본문, 헤드라인, CTA — 단 하나의 hero 컬러 |
| `--ink-mute` | `#1f1f1f` | 보조 (rare) |
| `--on-ink` | `#ffffff` | 다크 위 텍스트 |
| `--canvas` | `#ffffff` | 슬라이드 배경 |
| `--canvas-soft` | `#f7f7f5` | 보조 surface, template tile |
| `--hairline` | `#e6e6e6` | 1px form/card 보더 |
| `--magenta` | `#ff3d8b` | 프로모 CTA 전용 (lilac-promo 1회) |
| `--green` | `#1ea64a` | 비교 표 체크마크 |

### 컬러 블록 (의도된 saturated 파스텔)
| Token | HEX | 용도 |
|---|---|---|
| `--block-lime` | `#dceeb1` | systems / faq |
| `--block-lilac` | `#c5b0f4` | hero / promo |
| `--block-navy` | `#1f1d3d` | 다크 story (footer 위만) |
| `--block-cream` | `#f5e9d4` | FigJam interludes |
| `--block-mint` | `#c4f0d0` | onboarding |
| `--block-pink` | `#ffd8e2` | soft promo |
| `--block-coral` | `#ff7262` | closing / dev story |
| `--block-yellow` | `#ffe45e` | divider variant |

### 멀티플레이어 커서 컬러
red `#f24e1e`, purple `#a259ff`, blue `#1abcfe`, green `#0acf83`, pink `#ff7262`. 캔버스 mockup·comment-thread 아바타에 사용.

---

## §3. Typography

- `--font-sans`: `'figmaSans', 'Inter', 'Pretendard', 'SF Pro Display', system-ui, sans-serif`
  - figmaSans는 variable 비공개. Inter로 fallback
- `--font-mono`: `'figmaMono', 'JetBrains Mono', 'SF Mono', menlo, monospace`
- 헤드라인 weight 700, **음의 자간 `-0.04em ~ -0.045em` (aggressive negative tracking)**
- 본문 17pt / 1.45 (tight)
- **위계는 weight로만** — opacity로 색을 흐리는 것 금지 (no mid-gray text)

---

## §4. Signature 요소

### Pill button
모든 CTA는 `border-radius: 999px` 알약. 사각 버튼 없음.
- primary: 검정 알약 + 흰 텍스트
- secondary: 흰 알약 + 검정 텍스트 + 헤어라인
- promo: `#ff3d8b` magenta (lilac-promo 한정)

### 컬러 블록이 elevation을 대체
그림자 거의 없음. 색 블록 대비로 깊이/구분을 표현.
드물게 `0 4px 16px rgba(0,0,0,0.06)` 가 template tile에 적용.

### Frame badge (시그니처)
`frame-badge` 레이아웃은 슬라이드 자체를 Figma frame처럼 다룬다 (좌상 "Frame 01" 배지 + 점선/실선 보더 + 좌하 dimension 라벨).

### Marquee strip
`marquee-strip` 상단 56px 검정 ribbon (Figma marketing 시그니처). 회전 customer logo 자리.

### Multiplayer cursors
`multiplayer-cursors` 레이아웃은 캔버스 frame 위에 5개의 컬러 커서 라벨이 떠 있는 모습. Figma의 핵심 collaborative DNA.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `mono-cover` | 풀블랙 hero + 86pt 흰 헤드라인 |
| 2 | `block-section` | 풀 컬러 블록 디바이더 (lime / lilac / coral / navy / yellow 변형) |
| 3 | `color-blocks` | 6 컬러 블록 그리드 (각각 다른 펠릿) |
| 4 | `marquee-strip` | 상단 56px 검정 ribbon (customer list) + 본문 |
| 5 | `frame-badge` | Figma frame mockup — 좌상 "Frame N" 배지 + 점선 보더 |
| 6 | `multiplayer-cursors` | 캔버스 위 5개 컬러 커서 라벨 (협업 메타포) |
| 7 | `lilac-promo` | 풀 lilac + 마젠타 promo CTA |
| 8 | `comment-thread` | Figma 코멘트 버블 mockup (avatar + name + ts + reaction) |
| 9 | `template-tiles` | 4 off-white 템플릿 타일 (thumbnail + name + meta) |
| 10 | `mono-quote` | 46pt 검정 인용 + uppercase 모노 attribution |
| 11 | `navy-product` | 다크 navy 블록 + 라이트 코드/UI mockup 내장 |
| 12 | `coral-end` | 풀 coral 폐막 + 96pt + uppercase 모노 핸들 |

### 셸 3개 (shell)
- `cover` — 화이트 + 80pt 헤드라인 (기본 표지)
- `section` — canvas-soft + 104pt 챕터 번호
- `end` — 화이트 + 72pt 헤드라인 (기본 폐막)

---

## §6. Don'ts

- mid-gray 본문 텍스트 금지 — 위계는 weight로만
- 사각 버튼 금지 — 모든 CTA는 `radius: 999px` 알약
- 코드 블록을 라이트 배경으로 만들지 말 것 (`--ink` 검정 유지)
- 컬러 블록에 그림자 추가 금지 (색 자체가 elevation)
- 마젠타 `--magenta`를 promo CTA 외 사용 금지 (lilac-promo 1회 한정)
- navy block을 메인 콘텐츠 슬라이드 배경으로 쓰지 말 것 (footer 위 dark story 전용)
- 한 덱에 8개 컬러 블록 모두 사용 금지 — 적당히 골라 페이싱
