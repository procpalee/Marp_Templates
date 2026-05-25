# propca Notion Style — Card News Design System (4:5)

본 문서는 **propca Notion Style** 디자인 패밀리의 4:5 세로(1080×1350) 카드뉴스 버전 단일 출처.
- 상위 디자인 시스템(16:9): [`../../slide/propca-notion-style/design.md`](../../slide/propca-notion-style/design.md)
- 대응 CSS: [`propca-notion-style-cards.css`](propca-notion-style-cards.css)
- 변환 스킬: [`../../../.claude/skills/md-to-marp/SKILL.md`](../../../.claude/skills/md-to-marp/SKILL.md) (자동매칭은 표준 7종에만 적용)

상위 디자인 시스템의 **Color·Typography·Spacing·Components 토큰은 100% 그대로 계승**한다.
본 문서는 4:5 비율 대응 변경분(§A-Aspect, §B-Type Scale, §C-Card Templates, §D-Skill Contract)만 정의한다.

---

## §0. 한 줄 요약

**propca Notion Style · Card News** — Notion 워크스페이스 톤(navy hero + purple accent + 6색 pastel)을 그대로 옮긴 4:5 카드뉴스.
Threads / Instagram 캐러셀 ≤10장. **14개 레이아웃** (표준 7 + Notion 확장 7).

---

## §A. Aspect & Sizing

| 항목 | 값 |
|---|---|
| 비율 | 4:5 |
| 해상도 | 1080×1350 px |
| Marp size 토큰 | `sns` (CSS `@size sns 1080px 1350px`) |
| frontmatter | `size: sns`, `theme: propca-notion-style-cards` |
| 슬라이드 padding | `80px 64px` (top/right/bottom/left) — 모바일 안전 영역 |
| 슬라이드 최대 수 | 10장 (캐러셀 상한, 쇼케이스 sample.md 예외) |
| 본문 최대 | 8줄 / 200자 |
| 다크 모드 | **없음** (라이트 전용). navy 배경은 cover/cta/end가 본래 가짐 |

**컬러는 propca 데크 §2 그대로**. Notion alias(`--bg-base`/`--accent` 등)는 자동매칭 휴리스틱 호환용.

---

## §B. Type Scale (4:5 미세 조정)

상위 데크 §3 ref. 가로폭이 좁아져 일부 ↓, 모바일 가독성 위해 본문은 ↑.

| Role | 16:9 base | card-news 4:5 | 변경 |
|---|---|---|---|
| h1 cover | 60pt | **50pt** | ↓ |
| h1 hook (신규) | — | **72pt** | 신규 |
| h1 cta | 64pt | **50pt** | ↓ |
| h1 yellow-banner | 56pt | **60pt** | ↑ |
| h1 end | 62pt | **48pt** | ↓ |
| h1/h2 content | 38pt / 22pt | **34pt / 28pt** | h2↑ 가독성 |
| h2 card-point | 22pt | **36pt** | ↑ 점핑 강조 |
| h3 | 17pt | **20pt** | ↑ |
| body / li | 17pt | **20pt** | ↑ (모바일 최소 보장) |
| card-list 번호 | — | **28pt mono purple** | 신규 |
| quote body | 17pt | **28pt italic** | card-quote |
| pastel-quote body | 28pt | **30pt** | ↑ |
| em (badge) | 0.85em | **14pt** | 고정 pt |

폰트 패밀리(Pretendard / JetBrains Mono / Fraunces)는 §3 그대로.

---

## §C. Card Templates (전용 14종)

상위 16:9 클래스(cover/section/end/database-rows/yellow-banner/toggle-list/pastel-blocks/block-features/pastel-quote 등)는 4:5에서 어색하므로 **사용 금지**.
대신 `<!-- _class: card-* -->` 네임스페이스 14종만 사용.

### 표준 7종 (자동매칭 호환)

`md-to-marp` 카드뉴스 자동매칭 휴리스틱이 직접 출력하는 클래스. tech-modern-cards와 의미 호환.

#### C-1) `card-cover` — 표지

상단 30% navy 그라데이션 + 우상단 64×64 purple→pink 코너 글리프(propca 데크 cover의 시그니처).

```markdown
<!-- _class: card-cover -->
<!-- _paginate: false -->

# 한 줄로 카드뉴스 만들기

마크다운만 있으면 충분합니다

@propca-notion · contact@example.com
```

#### C-2) `card-hook` — 후크 (스와이프 유도)

화면 좌측 거대 후크(72pt) + 미세 보조(22pt). 우상단 pastel-yellow radial accent.

```markdown
<!-- _class: card-hook -->

# 99%는 모르는 사실

마지막 카드까지 보시면 알게 됩니다 →
```

#### C-3) `card-point` — 요점 (반복)

좌상단 purple pill 번호 배지(인라인 코드 `` `01` ``) + H2 36pt + 본문 22pt.

```markdown
<!-- _class: card-point -->

`01`

## 디자인 토큰부터

색·폰트·간격을 변수로 정의하면 카드뉴스도 16:9 슬라이드도 **한 톤**으로 나옵니다.
```

#### C-4) `card-quote` — 인용 / 권위

pastel-lavender 카드 풀배경 + 220pt Fraunces serif `"` (좌상단) + blockquote 28pt italic.

```markdown
<!-- _class: card-quote -->

> 디자인은 **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs
```

#### C-5) `card-list` — 나열형

H2 + decimal-leading-zero 카운터(28pt mono purple). 5개 상한.

```markdown
<!-- _class: card-list -->

## 카드뉴스 만드는 4단계

1. **원본 작성** — H1·H2 위주 짧은 마크다운
2. **레이아웃 매칭** — card-* 휴리스틱 자동 적용
3. **PNG 빌드** — Marp CLI `--images png`
4. **소셜 업로드** — 1080×1350 캐러셀로
```

#### C-6) `card-cta` — 행동 유도

풀배경 purple 그라데이션 + 50pt 화이트 H1 + mono 핸들.

```markdown
<!-- _class: card-cta -->
<!-- _paginate: false -->

# 팔로우하고 저장하세요

다음 카드뉴스는 다음주 월요일

@propca-notion
```

#### C-7) `card-end` — 엔딩

navy 그라데이션 + 좌상단 80×6 purple 스트라이프 + 48pt 화이트 H1.

```markdown
<!-- _class: card-end -->
<!-- _paginate: false -->

# 감사합니다

@propca-notion · contact@example.com
```

---

### Notion 확장 7종 (수동 지정)

`md-to-marp` 자동매칭 대상 아님. 사용자가 `<!-- _class: card-* -->` 명시 필수.
propca 데크의 시그니처 모티프(sticky-notes 회전·6색 pastel·database 행 mockup·yellow callout·toggle ▶·feature 블록·serif quote)를 4:5에 재해석.

#### C-8) `card-sticky-notes` — 회전 pastel 카드 2×2

H2 + `<ul><li>` 4항목. 4색(peach/rose/mint/sky) 배경, ±2~3° 회전, 14px shadow.

```markdown
<!-- _class: card-sticky-notes -->

## Notion 워크스페이스에 메모하기

- **회의록** 회의 직후 즉시 기록, 액션 아이템 강조
- **아이디어** 떠오를 때마다 toss, 매주 정리
- **링크 모음** 읽어볼 글 따로 큐레이션
- **할 일** 오늘/이번 주/이번 달 3단 구분
```

#### C-9) `card-pastel-blocks` — 6색 pastel 블록 2×3

H2 + `<ul><li>` 6항목. peach/rose/mint/lavender/sky/yellow 사이클.

```markdown
<!-- _class: card-pastel-blocks -->

## 카테고리 한눈에

- **회의록** 모든 정기 미팅 기록
- **자산 관리** 참고 이미지·문서
- **로드맵** 분기별 마일스톤
- **위키** 팀 컨벤션 문서
- **링크** 큐레이션 모음
- **회고** 주간/월간 retrospective
```

#### C-10) `card-database-rows` — Notion DB mockup (5행)

H2 + `<ol><li>` 5항목 (각 항목: `<strong>이름</strong>` + `` `상태` ``). 5색 pastel 태그 사이클.

```markdown
<!-- _class: card-database-rows -->

## 이번 주 진행 현황

1. **로그인 리팩터링** `Done`
2. **온보딩 페이지** `진행중`
3. **결제 모듈 분리** `리뷰`
4. **알림 시스템** `대기`
5. **분석 대시보드** `백로그`
```

#### C-11) `card-yellow-banner` — pastel-yellow 풀배경 콜아웃

좌상단 6×96 검정 스트라이프 + H1 60pt. 결정적/강조 메시지 1장.

```markdown
<!-- _class: card-yellow-banner -->

# 결국 한 가지만 기억하세요

좋은 카드뉴스는 디자인이 아니라 **순서**입니다.
```

#### C-12) `card-toggle-list` — Notion 토글 ▶ + ○ 자식

H2 + `<ul><li>` 1차(▶ 헤딩) + 중첩 `<ul><li>`(○ 자식).

```markdown
<!-- _class: card-toggle-list -->

## 자주 묻는 질문

- 변환에 얼마나 걸리나요?
  - 평균 7장 기준 30~60초
  - PNG 빌드 포함
- 어떤 마크다운 문법을 지원하나요?
  - GitHub Flavored Markdown 전체
  - HTML 콜아웃 부분 지원
- Threads에 바로 올릴 수 있나요?
  - `npm run publish:cards <slug>` 한 줄
```

#### C-13) `card-block-features` — 세로 3 스택 (컬러 원 아이콘)

H2 + `<ul><li>` 3~5항목. 각 행: 왼쪽 72×72 컬러 원(purple/pink/teal/orange/green) + 오른쪽 `<strong>` + 본문.

```markdown
<!-- _class: card-block-features -->

## 세 가지 핵심 기능

- **자동 매칭** 마크다운 구조를 보고 7개 카드 레이아웃 중 가장 맞는 것을 자동 선택합니다.
- **시각 검증** marp-deck-reviewer 에이전트가 빌드 직후 톤·여백·강조를 독립 검수합니다.
- **2-pass 빌드** HTML(검수)과 PNG(업로드) 양쪽을 한 번에 산출합니다.
```

#### C-14) `card-pastel-quote` — pastel-lavender 풀배경 + 거대 serif 인용

280pt Fraunces `"` (좌상단) + blockquote 30pt + 마지막 줄 author(보라 원형 avatar).

```markdown
<!-- _class: card-pastel-quote -->

> Notion 톤 카드뉴스 덕분에 팀 내부 공지가 훨씬 빠르게 도달합니다.
>
> — 김민수, 프로덕트 리드
```

---

## §D. Skill Contract (md-to-marp · `mode: card-news`)

### 자동 모드 (표준 7종 한정)

- 입력 `theme: propca-notion-style-cards` 시에도 휴리스틱은 tech-modern-cards와 동일.
- 출력 클래스는 표준 7종(`card-cover`/`card-hook`/`card-point`/`card-quote`/`card-list`/`card-cta`/`card-end`)만.

### 수동 모드 (확장 7종)

- 작성자가 `<!-- _class: card-sticky-notes -->` 등 명시.
- 자동 변환 도구는 이를 추론하지 않음. propca 톤을 살리려면 손으로 골라 넣어야 함.

### 출력 보장

1. frontmatter `theme: propca-notion-style-cards`, `size: sns`, `paginate: false`
2. 첫 슬라이드 = `card-cover`
3. 마지막 슬라이드 = `card-cta` 또는 `card-end`
4. 슬라이드 ≤ 10장 (쇼케이스 sample.md만 예외, 14장)
5. 본문 ≤ 8줄, ≤ 200자/슬라이드
6. 본문 폰트 ≥ 20pt
7. 컬러는 데크 §2 토큰만 사용 (인라인 색상 금지)

---

## §E. Marp Authoring Conventions

### Front matter

```yaml
---
marp: true
theme: propca-notion-style-cards
size: sns
paginate: false
_header: ''
_footer: ''
---
```

### 슬라이드 구분자
- 빈 줄 + `---` + 빈 줄
- `<!-- _class: card-* -->` 슬라이드 첫 부분

### 강조 표기
- `**굵게**` = purple 형광펜 (`linear-gradient(transparent 60%, rgba(86,69,212,0.16) 60%)`)
- `*배지*` = em pill (`--accent-soft` 배경 + purple 텍스트)
- `` `code` `` = purple 인라인 (rgba(86,69,212,0.10) 배경)

---

## §F. Don'ts

- 본문 20pt 미만 금지
- 슬라이드 8줄/200자 초과 금지
- 슬라이드 10장 초과 금지 (쇼케이스 sample.md만 예외)
- 16:9 데크 클래스(`cover`/`section`/`end`/`navy-cover`/`purple-section`/`yellow-banner`/`pastel-blocks`/`database-rows`/`toggle-list`/`block-features`/`pastel-quote` 등) 사용 금지 — `card-*` 네임스페이스만
- 컬러 토큰 외 인라인 HEX 금지
- `<!-- _paginate: true -->` 금지
- 다크 클래스(`section.card-* dark`) 금지 — propca 카드뉴스는 라이트 전용

---

## §G. CSS Mapping

| Design Token | CSS Variable | propca-notion-style-cards.css 위치 |
|---|---|---|
| Aspect | `@size sns 1080px 1350px` | 파일 헤더 (2행) |
| propca 데크 §2 토큰 | (동일 복제) | `:root` (24~51행) |
| tech-modern alias | `--bg-base`/`--accent`/`--accent-soft` 등 | `:root` (53~64행) |
| 폰트 패밀리 | `--font-sans`/`--font-mono`/`--font-serif` | `:root` (66~68행) |
| 표준 7 카드 | `section.card-cover`~`section.card-end` | 178~440행 |
| Notion 확장 7 카드 | `section.card-sticky-notes`~`section.card-pastel-quote` | 446~720행 |
| 16:9 클래스 guard | `outline: 2px dashed var(--pink)` | 726~750행 |

CSS와 design.md가 어긋나면 **CSS 정답**. design.md 후행 업데이트.

---

## §H. 빌드 명령

```cmd
cd build

:: HTML (검수용)
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample.md ^
  --html --allow-local-files ^
  -o ..\themes\card-news\propca-notion-style\sample.html ^
  --theme-set ..\themes\card-news\propca-notion-style

:: PNG (1080×1350 카드 14장)
npx --yes @marp-team/marp-cli ^
  ..\themes\card-news\propca-notion-style\sample.md ^
  --images png --allow-local-files ^
  -o ..\themes\card-news\propca-notion-style\sample.png ^
  --theme-set ..\themes\card-news\propca-notion-style
```

`--theme-set`은 16:9 deck 모드와 **다른 경로**(`themes/card-news/propca-notion-style/`)를 사용.
