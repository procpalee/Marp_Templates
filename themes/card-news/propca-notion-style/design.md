# propca Notion Style — Card News Design System (4:5) v2

본 문서는 **propca Notion Style** 디자인 패밀리의 4:5 세로(1080×1350) 카드뉴스 v2 단일 출처.
- 상위 디자인 시스템(16:9): [`../../slide/propca-notion-style/design.md`](../../slide/propca-notion-style/design.md)
- 대응 CSS: [`propca-notion-style-cards.css`](propca-notion-style-cards.css)

v2는 v1 대비 다음을 변경:
1. **slide 시각 언어 100% 일치** — cover 풀블리드 navy / em pastel-yellow / pastel-quote contained card / strong 색상만
2. **카드뉴스 차별화 요소 추가** — 우상단 페이지네이션 pill, card-hook 스와이프 CTA
3. **신규 레이아웃 2종** — `card-summary` (요약), `card-callout` (중간 강조)

상위 디자인 시스템 §2~§3 토큰은 **100% 그대로 계승**.

---

## §0. 한 줄 요약

**propca Notion Style · Card News v2** — Notion 워크스페이스 톤(navy hero + purple accent + 6색 pastel + Pretendard/Fraunces)을 4:5에 100% 옮긴 카드뉴스.
**16개 레이아웃** (표준 7 + Notion 확장 7 + 카드뉴스 신규 2). 자동 페이지네이션·스와이프 CTA로 인스타/스레드 캐러셀 차별화.

---

## §A. Aspect & Sizing

| 항목 | 값 |
|---|---|
| 비율 | 4:5 |
| 해상도 | 1080×1350 px |
| Marp size 토큰 | `sns` (CSS `@size sns 1080px 1350px`) |
| frontmatter | `theme: propca-notion-style-cards`, `size: sns`, `paginate: true` |
| 슬라이드 padding | `80px 64px` (기본). cover/cta/end는 `80px 88px`/`96px 72px` |
| 슬라이드 최대 수 | 10장 (캐러셀 상한, 쇼케이스 예외) |
| 본문 최대 | 8줄 / 200자 |
| 다크 모드 | **없음** (라이트 전용). cover/section/cta/end만 navy/purple 풀블리드 |

`paginate: true`가 v2 기본값. 표지·후크·CTA·엔딩·배너·인용 6종은 CSS `::after { display: none; }` 으로 페이지 배지 자동 숨김.

---

## §B. Type Scale (slide와 일치, v2 갱신)

| Role | Slide 16:9 | Card-News 4:5 | 변경 메모 |
|---|---|---|---|
| h1 base | 38pt 600 | 34pt 600 | 가로폭 좁아서 ↓ |
| h1 card-cover | 60pt 600 | **60pt 600** | v1 50pt 800 → slide 일치 |
| h1 card-hook (신규) | — | 72pt 700 | 4:5 신규 |
| h1 card-cta | 64pt 600 | **54pt 600** | v1 50pt 800 → 600 |
| h1 card-yellow-banner | 56pt 600 | **56pt 600** | slide 일치 |
| h1 card-end | 62pt 600 | 48pt 600 | ↓ |
| h1 card-callout (신규) | — | 44pt 600 | 4:5 신규 |
| h1 card-summary (신규) | — | 36pt 600 | 4:5 신규 |
| h2 base | 22pt 500 | 28pt 500 | ↑ 모바일 가독성 |
| h2 card-point | 22pt 500 | 36pt 600 | ↑ 강조 |
| h3 | 17pt 600 | 20pt 600 | ↑ |
| body / li | 17pt | **20pt** | ↑ 모바일 가독성 |
| card-list ol 번호 | — | 28pt mono purple | decimal-leading-zero |
| card-summary ol 번호 | — | 28pt mono **yellow** | navy 위 yellow stripe와 호응 |
| quote (card-quote) | 17pt italic | 28pt italic | ↑ |
| pastel-quote body | 28pt 500 | 26pt 500 | slide와 ±2pt |
| pastel-quote serif `"` | 110pt 35% | **110pt 35%** | v1 280pt → slide 일치 |
| em (badge) | pastel-yellow + ink 0.85em | **pastel-yellow + ink 0.85em** | v1 purple-soft → slide 일치 |
| strong | purple 색상만 | **purple 색상만** | v1 형광펜 → slide 일치 |

폰트 패밀리 — Pretendard / JetBrains Mono / Fraunces 그대로 (§3 슬라이드 design.md).

---

## §C. Card Templates (16종)

### 표준 7 (자동매칭 호환)

| # | 클래스 | 설명 |
|---|---|---|
| 1 | `card-cover` | **풀블리드 navy 그라데이션** + 우상단 64×64 purple→pink 코너 글리프 + 화이트 H1 60pt + mono 핸들 (slide.cover 동일) |
| 2 | `card-hook` | pastel-yellow radial accent + 72pt 후크 + 좌하단 mono **"스와이프 →"** CTA (v2 신규) |
| 3 | `card-point` | 좌상단 purple pill 번호 배지(인라인 코드 `` `01` ``) + H2 36pt + 본문 22pt |
| 4 | `card-quote` | pastel-lavender 풀배경 + 220pt Fraunces serif `"` + blockquote 28pt italic |
| 5 | `card-list` | decimal-leading-zero 28pt purple mono 번호 + 본문 22pt (5개 상한) |
| 6 | `card-cta` | 풀배경 purple 그라데이션 + 화이트 H1 54pt + mono 핸들 |
| 7 | `card-end` | navy 그라데이션 + 좌상단 80×6 purple 스트라이프 + 화이트 H1 48pt |

### Notion 확장 7 (수동 지정)

| # | 클래스 | 설명 |
|---|---|---|
| 8 | `card-sticky-notes` | `<ul>` 4항목 → 2×2 회전 pastel 카드 (peach/rose/mint/sky, ±2~3° tilt, 14px shadow) |
| 9 | `card-pastel-blocks` | `<ul>` 6항목 → 2×3 6색 pastel 블록 (peach/rose/mint/lavender/sky/yellow) |
| 10 | `card-database-rows` | `<ol>` 5항목 → Notion DB mockup (이름 + 5색 pastel 상태 태그) |
| 11 | `card-yellow-banner` | 풀배경 pastel-yellow + **center 정렬** H1 56pt + 보조 24pt (slide.yellow-banner 동일) |
| 12 | `card-toggle-list` | `<ul>` 1차(▶ purple) + 중첩 `<ul>`(○ ink-sub) — Notion 토글 mockup |
| 13 | `card-block-features` | `<ul>` 3~5항목 → 세로 스택 (72×72 컬러 원: purple/pink/teal/orange/green) + H3 + 본문 |
| 14 | `card-pastel-quote` | **white canvas 안에** rounded lavender 카드 + 110pt Fraunces `"` + 26pt 인용 + 보라 원형 avatar (slide.pastel-quote 동일) |

### 카드뉴스 신규 2 (v2)

| # | 클래스 | 설명 |
|---|---|---|
| 15 | `card-summary` | **CTA 직전 요약 슬라이드**. navy 풀블리드 + 좌상단 yellow 스트라이프 + H2 36pt + `<ol>` 3~5 bullet (yellow mono 번호 + 화이트 텍스트). 핵심 정리 → 행동 유도 사이의 다리 |
| 16 | `card-callout` | **인용보다 가벼운 중간 강조**. pastel 풀배경 + 좌측 8px purple 스트라이프 + H1/H2 44pt + 본문 22pt. 기본 mint, 추가 클래스로 색상 변형 가능 (`<!-- _class: card-callout peach -->`, `.rose`, `.lavender`, `.sky`, `.yellow`). card-yellow-banner는 결정적·강조 1장 / card-callout은 흐름 중간의 톤 변화 |

---

## §D. Skill Contract

### 자동 모드 (표준 7종)

- `theme: propca-notion-style-cards` 지정 시 휴리스틱은 tech-modern-cards와 동일
- 출력 클래스는 표준 7종만 (`card-cover` / `card-hook` / `card-point` / `card-quote` / `card-list` / `card-cta` / `card-end`)

### 수동 모드 (확장 9종)

- 작성자가 명시: `<!-- _class: card-sticky-notes -->`, `<!-- _class: card-summary -->`, `<!-- _class: card-callout peach -->` 등
- 자동 변환 휴리스틱이 추론하지 않음

### 출력 보장

1. frontmatter `theme: propca-notion-style-cards`, `size: sns`, **`paginate: true`** (v2 기본)
2. 첫 슬라이드 = `card-cover` (페이지 배지 자동 숨김)
3. 마지막 슬라이드 = `card-cta` 또는 `card-end` (페이지 배지 자동 숨김)
4. 슬라이드 ≤ 10장 (쇼케이스만 예외)
5. 본문 ≤ 8줄, ≤ 200자/슬라이드
6. 본문 폰트 ≥ 20pt
7. 컬러는 §2 토큰만 사용 (인라인 색상 금지)
8. 페이지네이션 pill은 9 종(cover/hook/cta/end/yellow-banner/pastel-quote 6 + 표지·CTA·엔딩 3 중복)에서 자동 숨김. 나머지는 노출.

---

## §E. Marp Authoring Conventions

### Front matter (v2 갱신)

```yaml
---
marp: true
theme: propca-notion-style-cards
size: sns
paginate: true            # v2 기본 (v1은 false였음)
_header: ''
_footer: ''
---
```

### 슬라이드 구분자
- 빈 줄 + `---` + 빈 줄
- `<!-- _class: card-* -->` 슬라이드 첫 부분
- 표지·CTA·엔딩에서 페이지 배지 강제 숨김 필요 시 `<!-- _paginate: false -->` 추가 (CSS가 이미 hide 처리하므로 생략 가능, 명시는 가독성용)

### 강조 표기 (v2 slide 일치)
- `**굵게**` = `--purple` 색상만 (형광펜 X)
- `*배지*` = `--pastel-yellow` bg + `--ink` 텍스트 (따뜻한 노란 pill)
- `` `code` `` = purple soft bg + purple 텍스트 인라인
- `card-point`의 ``` `01` ``` (단독) = purple pill 번호 배지

---

## §F. Don'ts

- 본문 20pt 미만 금지
- 슬라이드 8줄/200자 초과 금지
- 슬라이드 10장 초과 금지 (쇼케이스 예외만)
- 16:9 데크 클래스(`cover`/`section`/`end`/`navy-cover`/`purple-section`/`yellow-banner`/`pastel-blocks`/`database-rows`/`toggle-list`/`block-features`/`pastel-quote` 등) 사용 금지
- 컬러 토큰 외 인라인 HEX 금지
- 다크 클래스 금지 (propca 카드뉴스는 라이트 전용)
- v1 잔재(card-cover 30% navy stripe, em purple-soft, pastel-quote 280pt full-bleed, strong 형광펜) 사용 금지 — v2 시각 언어로 통일

---

## §G. CSS Mapping (v2)

| Design Token | CSS Variable | propca-notion-style-cards.css 위치 |
|---|---|---|
| Aspect | `@size sns 1080px 1350px` | 헤더 (2행) |
| propca 데크 §2 토큰 | (동일 복제) | `:root` (45~76행) |
| tech-modern alias | `--bg-base`/`--accent` 등 | `:root` (78~88행) |
| 폰트 패밀리 | `--font-sans`/`--font-mono`/`--font-serif` | `:root` (90~92행) |
| 페이지네이션 pill (v2 신규) | `section::after { content: attr(...) }` | 195~210행 |
| 표준 7 카드 | `section.card-cover` ~ `section.card-end` | 212~432행 |
| Notion 확장 7 카드 | `section.card-sticky-notes` ~ `section.card-pastel-quote` | 438~690행 |
| 신규 2 카드 (v2) | `section.card-summary` / `section.card-callout` | 696~775행 |
| 16:9 guard | `outline: 2px dashed var(--pink)` | 781~810행 |

CSS와 design.md가 어긋나면 **CSS 정답**. design.md 후행 업데이트.

---

## §H. 빌드 명령

```cmd
cd build

:: 쇼케이스 sample.md (16장 — 모든 레이아웃)
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample.md ^
  --html --allow-local-files --no-stdin ^
  -o ..\themes\card-news\propca-notion-style\sample.html ^
  --theme-set ..\themes\card-news\propca-notion-style
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample.md ^
  --images png --allow-local-files --no-stdin ^
  -o ..\themes\card-news\propca-notion-style\sample.png ^
  --theme-set ..\themes\card-news\propca-notion-style

:: 실제 컨텐츠 sample-ai-insight.md (11장)
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample-ai-insight.md ^
  --html --allow-local-files --no-stdin ^
  -o ..\themes\card-news\propca-notion-style\sample-ai-insight.html ^
  --theme-set ..\themes\card-news\propca-notion-style
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample-ai-insight.md ^
  --images png --allow-local-files --no-stdin ^
  -o ..\themes\card-news\propca-notion-style\sample-ai-insight.png ^
  --theme-set ..\themes\card-news\propca-notion-style
```
