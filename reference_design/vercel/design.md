# Vercel — Slide Design System

**출처:** [VoltAgent/awesome-design-md / Vercel](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/vercel.css`](slides/vercel.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃(`split`/`grid-3`/`stats`/`timeline` 등)은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Vercel** — 순수 블랙앤화이트 미니멀리즘 + `#0070f3` 블루 + 메시 그라데이션. 16:9.
프론트엔드·배포·Next.js·디벨로퍼 풍의 정통 컬러스킴.

---

## §1. Brand & Tone

- **용도:** 프론트엔드 발표, 클라우드/배포 데모, Next.js 워크숍, 디벨로퍼 컨퍼런스
- **톤:** monochrome · technical · sharp · confident
- **타깃 청중:** 개발자/엔지니어/디자인 시스템 빌더

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--ink` | `#000000` | 최강 잉크 (cover/end 배경, h1) |
| `--ink-soft` | `#171717` | 본문 헤드라인 |
| `--ink-mute` | `#4d4d4d` | 본문 |
| `--ink-sub` | `#888888` | 캡션, 페이지 번호 |
| `--canvas` | `#fafafa` | 슬라이드 배경 |
| `--canvas-card` | `#ffffff` | 카드, blockquote |
| `--hairline` | `#ebebeb` | 헤어라인 시그니처 |
| `--hairline-strong` | `#c4c4c4` | 진한 보더 |
| `--accent` | `#0070f3` | Vercel blue — 강조, link, code |
| `--accent-cyan` | `#50e3c2` | 메시 그라데이션 cyan stop |
| `--accent-violet` | `#7928ca` | 메시 그라데이션 violet stop |
| `--accent-pink` | `#ff0080` | 메시 그라데이션 pink stop |
| `--accent-amber` | `#f9cb28` | (예비) ship-stage gradient |

### 메시 그라데이션 (`--mesh-bg`)
```css
radial-gradient(ellipse 60% 70% at 8% 90%, rgba(0,112,243,0.65) 0%, transparent 55%),
radial-gradient(ellipse 55% 65% at 92% 12%, rgba(121,40,202,0.55) 0%, transparent 55%),
radial-gradient(ellipse 40% 50% at 60% 90%, rgba(255,0,128,0.35) 0%, transparent 55%),
#000000
```
cover/mesh-cover/mesh-band/mesh-end 4개 슬라이드에서만 사용.

---

## §3. Typography

- `--font-sans`: `'Geist', 'Inter', 'Pretendard', -apple-system, sans-serif`
  - Geist는 OFL/CDN 부재 시 Inter로 fallback
- `--font-mono`: `'Geist Mono', 'JetBrains Mono', ui-monospace, monospace`
- **자간**: `--tracking-tight: -0.04em` (display), `--tracking-loose: 0.08em` (mono uppercase)
- 본문 17pt / 1.55, h1 44pt 600 weight, section h1 96pt

---

## §4. Signature 요소

### Multi-stack shadow (카드)
세 가지 shadow 토큰:
- `--shadow-card-1` — 기본 카드
- `--shadow-card-2` — 코드 윈도우, 강조 카드
- `--shadow-float` — `stack-shadow-feature`, `code-window`

### 헤어라인 우선
대부분의 카드/컬럼 분리는 `1px solid var(--hairline)`만 사용 (`hairline-grid`, `digit-marquee`). 그림자는 강조용으로만.

### Pill badge (`em` → uppercase)
`*Tag*` 마크다운은 `Geist Mono` uppercase + hairline 보더 알약. tech-modern의 액센트 배경 chips과 완전 다른 처방.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `mesh-cover` | 메시 그라데이션 표지. 화려한 hero. |
| 2 | `polarity-section` | 좌 100% 풀블랙 + 큰 챕터 번호 / 우 100% 화이트 부제. 분할 디바이더. |
| 3 | `mono-statement` | 가운데 단일 큰 문장 + 헤어라인 위/아래. 44pt 인용. |
| 4 | `code-window` | macOS chrome (점 3개 + 파일명 탭) + 다크 코드 카드. |
| 5 | `hairline-grid` | 3×3 헤어라인 카드. 그림자 없음, 보더만. |
| 6 | `polarity-pair` | 좌 다크 카드 + 우 라이트 카드. before/after. |
| 7 | `stack-shadow-feature` | 중앙 떠 있는 단일 카드 (multi-stack shadow). 신제품 launch용. |
| 8 | `mesh-band` | 슬라이드 중앙 가로 띠가 메시. 위·아래 화이트. |
| 9 | `digit-marquee` | 가로 큰 모노 디지트 4~5개. KPI 대안. |
| 10 | `code-pair` | 두 코드 블록 좌우 (old/new diff). 우측에 그린/블루 글로우. |
| 11 | `gradient-quote` | 큰 인용에 그라데이션 텍스트 fill. 다크 배경. |
| 12 | `mesh-end` | 메시 풀스크린 폐막. 112pt "Thanks." |

### 셸 3개 (shell)
- `cover` — 풀블랙 + 흰 헤드라인 (기본 표지)
- `section` — 화이트 배경 + 헤어라인 위/아래 + 96pt 챕터 번호
- `end` — 풀블랙 + 흰 헤드라인 (기본 폐막)

---

## §6. Don'ts

- `--accent`(#0070f3) 를 본문 텍스트에 직접 쓰지 말 것 (코드/링크/액션 전용)
- 그림자 블러를 `> 48px`로 키우지 말 것 — multi-stack 정수배율 유지
- 헤드라인 자간 `> -0.02em`(완화) 금지
- 풀블랙 hex `#000000`를 본문/카드 배경으로 쓰지 말 것 (cover/end/hero 전용)
- 메시 그라데이션을 일반 콘텐츠 슬라이드에 재사용 금지 (cover/mesh-cover/mesh-band/mesh-end 4개로 한정)
- 둥근 모서리 16px 초과 금지 (Vercel 14px 카드, 12px 코드, 8px 작은 요소)

---

## §7. Lecture / Presentation Adaptation

Vercel의 monochrome + 단일 blue 시스템은 **개발자 컨퍼런스/워크숍/사내 기술 발표**에 그대로 적용 가능하다. 강의/발표 용도로 적응시킬 때 다음 가이드를 따른다.

- **백-로우 가독성** — 본문 최소 28pt 유지. lecture-* 클래스는 자체 본문 19~26pt 사용하지만, 강당/대회의실 발표 시 mono-statement(44pt) 또는 polarity-section(140pt)을 보조로 활용해 핵심 메시지를 키운다.
- **한 슬라이드 한 메시지** — Vercel은 본래 "deliberate restraint" 철학. lecture 슬라이드도 단일 thesis (한 문장 명제) 원칙 유지. hairline-grid 9-cell 같은 dense layout은 강의 중반 정리용으로만.
- **Pretendard 한글 본문** — lecture-* 5 클래스는 `font-family: 'Pretendard', 'Geist', 'Inter', ...`로 한글 가독성을 1순위로 강제한다. Geist는 라틴 글리프만 풍부하므로 한글 발표에는 Pretendard fallback이 자동 활성화된다.
- **단일 accent blue 유지** — 강의 강조도 `--accent` `#0070f3` 하나로 통일. 다른 정답/오답 빨강·초록 추가 금지 (Vercel 시스템의 deliberate monochrome 유지).
- **mesh 그라데이션 금지 영역** — 강의 슬라이드(lecture-*)는 흰 캔버스 위 hairline 보더만 사용. mesh는 cover/divider 용 4 슬라이드에만 한정.

---

## §8. Universal Slide Type Mapping

Russell-cell PPT-Design-Prompt의 7 universal slide type을 Vercel 14 어휘(12 브랜드 + 셸 cover/section/end는 §5 참조)에 매핑.

| Universal Type | 이 테마의 매핑 클래스 (우선/보조) |
|---|---|
| Cover | `mesh-cover` (hero) / `cover` (plain) |
| Divider | `polarity-section` (split chapter) / `section` (plain) |
| Concept | `mono-statement` (단일 thesis) / `stack-shadow-feature` (single feature card) |
| Comparison | `polarity-pair` (before/after dark vs light) / `code-pair` (diff) |
| Data | `digit-marquee` (KPI digits) / `hairline-grid` (3×3 surfaces) |
| System | `code-window` (macOS chrome + code) / `mesh-band` (status band) |
| Closing | `mesh-end` (splashy) / `end` (plain) / `gradient-quote` (manifesto) |
| **Lecture: Definition** | `lecture-definition` — 큰 용어 + 정의 + 예시 카드 |
| **Lecture: Objective** | `lecture-objective` — "By end of class" + 화살표 리스트 |
| **Lecture: Example** | `lecture-example` — Step 1/2/3 카드 + 다크 결과 카드 |
| **Lecture: Takeaway** | `lecture-takeaway` — accent-blue 좌측 보더 인용 박스 |
| **Lecture: Quiz** | `lecture-quiz` — 질문 + A/B/C/D 옵션 카드 + 힌트 |

---

## §9. Agent Prompt Templates

이미지 생성 모델(또는 슬라이드 디자인 에이전트)에 전달할 prompt 7 템플릿. fill-in-the-blank.

```
[Cover slide — Vercel]
- Brand mood: monochrome minimalism, mesh gradient hero, deliberate restraint
- Thesis: {{ ONE_SENTENCE_THESIS }}
- Visual cue: pure black canvas + radial mesh (blue/violet/pink stops), white 72pt headline
- Avoid: warm colors, drop shadows on text, rounded corners > 16px
```

```
[Divider — Vercel]
- Layout: 50/50 split, left pure black + huge 140pt chapter numeral, right white + 30pt subhead
- Hairline 1px borders, no shadows
- Visual cue: deliberate polarity flip
```

```
[Concept — Vercel]
- Single sentence centered between hairline borders, 44pt weight 500, tracking -0.04em
- Background: #fafafa canvas
- One thesis per frame — no bullet lists, no decorative imagery
```

```
[Comparison — Vercel]
- Two side-by-side cards, left dark (#000) + right light (#fff + hairline)
- Mono-uppercase eyebrow ("Before" / "After"), 24pt body weight 500
- accent-blue (#0070f3) only on the right card's eyebrow
```

```
[Data — Vercel]
- 4-5 huge Geist Mono digits in a row, 84pt weight 600, hairline divider between
- Below each: 11pt mono uppercase caption with tracking +0.08em
- No chart axes, no color fills — digits speak alone
```

```
[System — Vercel]
- macOS chrome card (3 traffic-light dots + filename tab) + dark code panel
- Multi-stack shadow (border + soft + ambient), border-radius 14px
- Geist Mono 13pt, syntax color reserved for keywords
```

```
[Closing — Vercel]
- Full mesh-gradient canvas, 112pt headline weight 600 (e.g. "Thanks.")
- Sub-line: rgba(255,255,255,0.7) 22pt weight 400
- Contact line: Geist Mono 13pt uppercase tracking +0.08em
- Avoid: warm shadows, gradient text on light bg, multiple CTAs
```

이 7 템플릿 + lecture-* 5 클래스(§5에 없음, §8 참조)로 Vercel 테마에서 강의/발표 슬라이드 image generation을 일관되게 호출할 수 있다.
