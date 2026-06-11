# Notion — Slide Design System

**출처:** [VoltAgent/awesome-design-md / Notion](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/notion.css`](slides/notion.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃(`split`/`grid-3`/`stats`/`timeline` 등)은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Notion** — 퍼플 `#5645d4` + 6색 파스텔 펠릿 + 네이비 hero + 워크스페이스 mockup. 16:9.
문서·위키·내부 공유·노트·지식 베이스에 어울리는 친근하고 구조화된 톤.

---

## §1. Brand & Tone

- **용도:** 팀 워크스페이스 공유, 문서/위키 발표, 지식 베이스 소개, 내부 핸드북
- **톤:** friendly · structured · approachable · soft
- **타깃 청중:** PM/디자이너/지식근로자/문서 작업자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--purple` | `#5645d4` | 강조, link 보더, 강조 텍스트, featured |
| `--purple-pressed` | `#4534b3` | 호버/액티브 |
| `--purple-deep` | `#3a2a99` | 텍스트 deep variant |
| `--pink` | `#ff64c8` | 보조 강조, gradient pair |
| `--orange` | `#dd5b00` | 액센트 회전 |
| `--teal` | `#2a9d99` | 액센트 회전 |
| `--green` | `#1aae39` | success / check |
| `--link` | `#0075de` | 링크 (강조 purple와 구분) |
| `--navy` / `--navy-deep` | `#0a1530` / `#070f24` | hero band, signup-end |
| `--canvas` | `#ffffff` | 슬라이드 배경 |
| `--canvas-soft` | `#fafaf9` | cover/end 배경 |
| `--canvas-card` | `#f6f5f4` | 카드/콜아웃 |
| `--hairline` | `#e5e3df` | 헤어라인 |
| `--ink` / `--ink-mute` / `--ink-sub` | `#191918` / `#5a5a55` / `#8b8a84` | 본문 3단계 |

### 파스텔 펠릿
| 토큰 | HEX | sticky-note / pastel-blocks 회전순 |
|---|---|---|
| `--pastel-peach` | `#ffe8d4` | 1 |
| `--pastel-rose` | `#fde0ec` | 2 |
| `--pastel-mint` | `#d9f3e1` | 3 |
| `--pastel-lavender` | `#e6e0f5` | 4 |
| `--pastel-sky` | `#dcecfa` | 5 |
| `--pastel-yellow` | `#f9e79f` | 6 |

`yellow-banner` 와 일반 `<table>` 셀의 인라인 `.tag` 헬퍼도 동일 펠릿 사용.

---

## §3. Typography

- `--font-sans`: `'Notion Sans', 'Inter', 'Pretendard', -apple-system, sans-serif`
  - Notion Sans는 비공개, Inter로 fallback
- `--font-mono`: `'JetBrains Mono', 'SFMono-Regular', monospace`
- `--font-serif`: `'Fraunces', 'Georgia', serif` — `pastel-quote` 큰 따옴표 장식 한정
- 헤드라인 자간: `-0.02em` (적당한 음수, Vercel처럼 극단적이지 않음)
- 본문 17pt / 1.55

---

## §4. Signature 요소

### 직사각 8~12px radius
- 카드/블록 12px
- 버튼/태그 4~8px
- 알약 999px (CTA, 페이지 번호)

### Navy hero
`cover` 와 `signup-end` 가 navy 그라데이션 공유. workspace mockup glyph는 우상단 코너 64×64 보라 그라데이션 박스.

### Purple section divider
`purple-section`은 풀 보라 배경 + 흰 96pt 챕터 번호. tech-modern의 그라데이션과 다른 솔리드 보라.

### Sticky note 회전
`sticky-notes` 의 카드들은 `-4° / +3° / -2° / +5°` 회전 + 그림자로 종이 메모 느낌.

### Yellow banner
`yellow-banner` 는 풀블리드 `#f9e79f` — 강조 슬라이드 전용. 본문엔 노란 배경 금지.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `navy-cover` | navy 그라데이션 hero 표지 + 우상단 mockup glyph |
| 2 | `purple-section` | 풀 보라 챕터 디바이더 |
| 3 | `sticky-notes` | 4장 회전 파스텔 메모 카드 |
| 4 | `feature-compare` | 2~3 항목 다중 특성 비교표 (상태 컬럼 없음, ✓/✗ 자동 강조) |
| 5 | `pastel-blocks` | 6 파스텔 블록 그리드 |
| 6 | `yellow-banner` | 풀블리드 노란 강조 슬라이드 |
| 7 | `workspace-split` | 좌 280px 사이드바 + 우 본문 — 워크스페이스 mockup |
| 8 | `toggle-list` | 토글 ▶ heading + 들여쓰기 item 리스트 |
| 9 | `block-features` | 1×N 아이콘 원 + 제목 + 본문 block grid |
| 10 | `pastel-quote` | 파스텔 카드 안의 인용 + author block (avatar + name) |
| 11 | `pricing-blocks` | 3 가격 블록 (직사각 8px, featured 2px 보라) |
| 12 | `signup-end` | navy 폐막 + 보라 알약 CTA + 핸들/URL pill |
| 13 | `step-image-guide` | 좌 단계 ol + 우 스크린샷 (튜토리얼·설치 가이드) |
| 14 | `definition-cards` | 도구·개념 카드형 정의 (H3 자동 카드화 + 좌측 보라 라인) |
| 15 | `compare-cards` | 2 항목 카드 비교 + 중앙 **VS 뱃지** (좌우 카드 사이) |
| 16 | `compare-table` | 2 항목 표 비교 (행=속성, 컬럼=A/B, navy 헤더) |
| 17 | `concept-list` | 5~10 개념 큰 번호 (좌측 28pt 보라) + 우측 제목·본문 |
| 18 | `concept-table` | 용어 사전 표 (좌측 30% 용어 보라 / 우측 정의) |
| 19 | `comparison-3up` | 3~4 항목 매트릭스 카드 (보라 헤더 + ul 비교 항목) |
| 20 | `story-arc` | 좌측 거대 따옴표 인용부호 + 본문 3단락 + 우하단 마무리 |
| 21 | `example-case` | 좌상단 `CASE` 라벨 + 본문 + 우측 보조 박스 (시나리오 1건) |
| 22 | `pull-quote` | 중앙 큰 따옴표 + 32pt 인용 + 출처 (외부 인용 강조) |
| 23 | `pros-cons` | 장단점 2 컬럼 (좌 ✓ 녹색 / 우 ✗ 빨강 자동 강조) |
| 24 | `checklist` | GFM 태스크 리스트 시각화 (`- [ ]`→☐ / `- [x]`→☑) |

### 셸 3개 (shell)
- `cover` — 부드러운 캔버스 + 잉크 (기본 표지)
- `section` — 카드색 배경 + 72pt 챕터 번호 (기본 디바이더)
- `end` — `cover`와 동일 톤 (기본 폐막)

---

## §6. Don'ts

- 퍼플 `--purple`을 본문 텍스트에 직접 쓰지 말 것 (link/포커스/featured 전용)
- 알약 라벨에 음의 자간 사용 금지 (Notion은 자연 정렬)
- pastel-cards/sticky-notes를 6장 초과하지 말 것 (회전 펠릿 한 사이클)
- navy hero를 일반 콘텐츠 슬라이드 배경으로 사용 금지 (cover/signup-end 한정)
- Yellow banner는 한 데크당 1회만 사용 (강조의 강조)
- 카드에 강한 그림자 사용 금지 — hairline + soft elevation만 (sticky-notes 예외)

---

## §7. Lecture / Presentation Adaptation

Notion의 워밍 톤 + 12px radius + sticky-note 회전은 **사내 문서 발표 · 워크스페이스 온보딩 · 학생용 강의**에 자연스럽게 적응한다.

- **Pretendard 한글 1순위** — lecture-* 5 클래스는 `'Pretendard', 'Notion Sans', 'Inter'` 순서로 한글 가독성 보장.
- **단일 orange accent로 통일** — Notion은 8 컬러 액센트 시스템이지만 lecture 슬라이드에서는 `--orange` `#dd5b00`만 사용. 정답/오답 빨강·녹색 추가 금지.
- **sticky-note 회전 금지 영역** — lecture-* 카드는 회전 없는 정렬된 hairline 12px-radius 카드. workspace 친근감보다 강의 가독성 우선.
- **navy hero 보존** — `--navy` `#0a1530`는 lecture-example의 결과 카드에만 사용 (다크 contrast로 결과 강조).
- **백-로우 가독성** — lecture-* 본문 19~26pt. 강당 발표 시 navy-cover/purple-section을 보조로 활용해 핵심 메시지 키운다.

---

## §8. Universal Slide Type Mapping

Russell-cell PPT-Design-Prompt 7 universal type을 Notion 어휘에 매핑.

| Universal Type | 이 테마의 매핑 클래스 (우선/보조) |
|---|---|
| Cover | `navy-cover` (다크 hero) / `cover` (plain) |
| Divider | `purple-section` (purple chapter) / `section` (plain) |
| Concept | `block-features` (3 블록 컨셉) / `toggle-list` (toggle 확장) |
| Comparison | `workspace-split` (좌/우 50/50) / `feature-compare` (속성 비교) |
| Data | 일반 `<table>` (테이블) / `pricing-blocks` (3 컬럼 KPI) |
| System | `workspace-split` (sidebar + content mockup) / `sticky-notes` (회전 카드 보드) |
| Closing | `signup-end` (CTA + ul) / `end` (plain) / `pastel-quote` (manifesto) |
| **Lecture: Definition** | `lecture-definition` — 큰 용어 + 정의 + 예시 카드 |
| **Lecture: Objective** | `lecture-objective` — "By end of class" + 화살표 리스트 |
| **Lecture: Example** | `lecture-example` — Step 1/2/3 카드 + navy 결과 카드 |
| **Lecture: Takeaway** | `lecture-takeaway` — orange 좌측 보더 인용 박스 |
| **Lecture: Quiz** | `lecture-quiz` — 질문 + A/B/C/D 옵션 카드 + 힌트 |

---

## §9. Agent Prompt Templates

이미지 생성 모델에 전달할 prompt 7 템플릿. fill-in-the-blank.

```
[Cover — Notion] mood: warm workspace, navy hero, friendly pastel rotation
  thesis: {{ ONE_SENTENCE }} | cue: navy #0a1530 + sticky chips ±2° rotation
  avoid: pure black, sharp shadows, sub-12px radius
[Divider — Notion] full-bleed purple #5645d4, white 96pt numeral, 12px radius
[Concept — Notion] 3 blocks with ▸ toggle, orange eyebrow + ink heading
[Comparison — Notion] workspace-split sidebar(35%) + content(65%), pastel status pills
[Data — Notion] 일반 table OR pricing-blocks 3-col; one orange highlight
[System — Notion] workspace mockup: sidebar pages + main block stack + coral callout
[Closing — Notion] signup-end warm canvas + 64pt + orange pill CTA + links ul
```

이 7 템플릿 + lecture-* 5 클래스(§8)로 Notion 테마에서 강의 슬라이드 생성을 일관되게 호출할 수 있다.

---

## §10. 2026.05 확장 — 표지 / 공통 헬퍼 / 카테고리 구조

### 표지 (Cover)
단일 변형만 유지한다. 우상단 장식 박스(이전 `::before` 그라데이션 사각형)는 제거됨.

| 클래스 | 톤 | 핵심 요소 |
|---|---|---|
| `cover` | Navy Refined | navy 그라데이션 배경 + 좌상단 procpa 흰색 로고(`filter: brightness(0) invert(1)`) + H1 아래 1px 흰색 헤어라인 + 우하단 메타데이터(절대 위치) |

로고 자산: 프로젝트 루트 `procpa_logo_dark.png` (다크 배경에서는 CSS filter로 흰색 처리). `--font-mono` 토큰은 `--font-sans`와 동일하게 alias되어 있어 메타데이터·페이지 번호·`.kbd`·`.chip` 등 모든 모노스페이스 사용처가 Pretendard / NotoSans로 렌더된다.

### 공통 인라인 헬퍼 (어디서나 `<div class>` / `<span class>` 호출)

| 클래스 | 용도 |
|---|---|
| `.callout info/success/example/warn/danger` | 5단계 콜아웃 — **단일 톤 통일**: 좌측 컬러바·라벨 모두 `--purple`(시그니처 보라). 종류 구분은 좌측 4px 색상이 아닌 **아이콘 + 굵은 라벨**(`**참고**`/`**예시**`/`**중요**`/`**경고**`)로 표현. `.danger`만 예외적으로 `--danger` 좌측바 유지 (정말 위험 신호 시) |
| `.tag green/yellow/purple/rose/sky/peach/navy` | 전역 인라인 상태 배지 (표 셀·괄호·ul 항목 끝 어디서나 사용) |
| `.chip` / `.chip.solid` / `.chip.outline` | 풀필(pill) 라벨 |
| `.kbd` | 키보드 키 캡 |
| `.divider` / `.divider.strong` / `.divider.purple` | 가로 구분선 3종 |
| `.note` | 콜아웃보다 조용한 회색 보조 메모 |
| `.cols-2` / `.cols-3` | 본문 일부만 다단 분할 (전용 split 없이) |
| `<figure>` + `<figcaption>` | 이미지+캡션 표준화 |

### image-quote 수정사항
- blockquote `width: 40%` → `width: 100%` (Marp `![bg left:60%]`가 이미 우측 40%로 제한하므로 100%가 정상)
- 쇼케이스에서 `<!-- _paginate: false -->` 제거하여 페이지 번호 노출

### 쇼케이스 카테고리 (6 + 표지/목차)
쇼케이스 MD는 ToC 6 카테고리에 맞춰 슬라이드를 그룹화하고, 각 카테고리 진입 시 `<!-- header: '...' -->` 디렉티브로 좌상단 헤더에 카테고리명을 자동 표시한다. 표지·목차·section divider·closing 슬라이드는 `<!-- _header: '' -->`로 헤더를 숨긴다.

| # | 카테고리 | 헤더 값 | 포함 레이아웃 |
|---|---|---|---|
| 01 | 공통 지원 컴포넌트 | `01. 공통 지원 컴포넌트` | 텍스트강조·리스트·테이블·코드·콜아웃·태그·칩+kbd·디바이더+노트·cols·figure |
| 02 | 콘텐츠 분할 | `02. 전용 레이아웃 — 콘텐츠 분할` | `compare` · `two-image` · `before-after` · `cards` |
| 03 | 비교 / 정의 | `03. 전용 레이아웃 — 비교 / 정의` | `feature-compare` · `step-image-guide` · `definition-cards` |
| 04 | 시각 강조 / 인용 | `04. 전용 레이아웃 — 시각 강조 / 인용` | `image-quote` · `hero-quote` · `pastel-blocks` |
| 05 | 프로세스 / 리스트 | `05. 전용 레이아웃 — 프로세스 / 리스트` | `timeline` · `vertical-timeline` · `roadmap` · `toggle-list` · `icon-list` · `block-features` |
| 06 | 마무리 | `06. 마무리` | `session-break` · `qa` · `thanks-contact` · `end` |

### 2026.05 작업에서 제거된 레이아웃
다음 레이아웃은 CSS·MD에서 모두 삭제되었다 (요구 범위가 노션 워크스페이스 톤과 어울리지 않아 보류):

`pyramid` · `stats` · `kpi-grid` · `executive-summary` · `matrix-2x2` · `risk-heatmap` · `methodology`

추가로 다음 표지 변형도 제거되어 기본 `cover`만 남는다: `cover-executive` · `cover-split` · `cover-band`.

### 글로벌 폰트 정책
- `--font-sans`: `'Pretendard', 'Noto Sans KR', 'Notion Sans', 'Inter', -apple-system, sans-serif`
- `--font-mono`: `'Pretendard', 'Noto Sans KR', 'Inter', -apple-system, sans-serif` (sans와 동일 alias)
- `--font-serif`: `'Fraunces', 'Georgia', serif` (pastel-quote 큰따옴표 한정)

CSS의 `var(--font-mono)` 호출은 그대로 두고 토큰 정의만 sans로 재할당했다. 모노스페이스가 필요해지면 한 줄 복원만으로 전체 모노스페이스 사용처가 동시에 살아난다.

---

## §11. Cover 변형 6종 (2026-05)

기본 `cover` 외 5종의 표지 디자인을 추가. 모두 propca 시그니처(좌상단 procpa 흰 로고 + 우하단 연월) 유지.

| # | 클래스 | 톤 | 적합 컨텍스트 |
|---|---|---|---|
| 1 | `cover` (기본) | Navy 그라데이션 | 회계법인·자문사 정통 발표 |
| 2 | `cover-image` | 배경 이미지 + Navy 오버레이 (72~82% alpha) | 키노트 컨퍼런스·런칭 |
| 3 | `cover-split` | 좌 50% 이미지 / 우 50% navy 텍스트 | 인물·제품 비주얼 표지 |
| 4 | `cover-minimal` | 흰 배경 + 거대 H1 (88pt) + 좌하단 부제·메타 | 메시지 강조·아카이브 |
| 5 | `cover-band` | 상단 8px purple 띠 + 흰 배경 + H1 위 보라 액센트 바 | 회계법인·정통 보고서 |
| 6 | `cover-photo-full` | 풀블리드 사진 + 하단 navy 그라데이션 텍스트 | 브랜드 캠페인·시리즈 첫 화 |

시각 카탈로그: [`cover-variants.md`](cover-variants.md) / [`cover-variants.html`](cover-variants.html). `cover-image`는 `--cover-bg-image` CSS 변수 또는 Marp `_backgroundImage` 디렉티브로 배경 지정. `cover-photo-full`은 Marp `![bg](url)` 디렉티브 사용.

---

## §12. 색상 테마 변형 6종 (카탈로그)

시각 카탈로그: [`color-variants.md`](color-variants.md) / [`color-variants.html`](color-variants.html). 실제 테마 적용은 별도 .css 파일 분기로 후속 작업.

| 톤 | 시그니처 (--purple) | Hero (--navy) | 적합 컨텍스트 |
|---|---|---|---|
| **CURRENT** | `#5645d4` | `#0a1530` | 회계·자문·기본 (시그니처) |
| **ROSE** | `#d14d72` | `#1f1018` | 마케팅·라이프스타일 |
| **EMERALD** | `#10a37f` | `#0a1f1a` | 환경·헬스케어 |
| **AMBER** | `#e09b3d` | `#1f1607` | 출판·저널·문화 |
| **SLATE** | `#64748b` | `#1e293b` | 법률·미니멀·B2B |
| **OCEAN** | `#0072c6` | `#062335` | 테크·SaaS·핀테크 |

핵심 swap 토큰 7개: `--purple`, `--navy`, `--navy-deep`, `--canvas-card`, `--pastel-*` 6 펠릿 중 강조 1~3개. 이 토큰만 변경하면 다른 레이아웃 영향 없이 톤 전환 가능.

---

## §13. 용도별 레이아웃 분류 (8 메가 카테고리)

AI 변환 시 가장 먼저 참고할 결정 트리는 [`.claude/skills/md-to-marp-propca/SKILL.md`](../../../.claude/skills/md-to-marp-propca/SKILL.md) §2.D 참조.

| 카테고리 | 포함 레이아웃 |
|---|---|
| **A. 2개 비교** | `compare` / `two-image` / `compare-cards` / `compare-table` |
| **B. 3+ 비교** | `comparison-3up` / `feature-compare` |
| **C. 개념 정의·설명·Q&A** | `definition-cards` / `concept-list` / `concept-table` / `faq` (의문문 H3 쌍) |
| **D. 단계·튜토리얼·일정** | `timeline` / `vertical-timeline` / `step-image-guide` / `step-text` (텍스트 절차) / `roadmap` / `schedule` (날짜 행) |
| **E. 시각 강조·인용** | `hero-quote` / `image-quote` / `pull-quote` / `pastel-blocks` / `pastel-quote` / `gallery-grid` (이미지 3~6) |
| **F. 일화·사례·예시** | `story-arc` / `example-case` |
| **G. 리스트 변형** | `icon-list` / `toggle-list` / `checklist` / `block-features` / `cards` / `pros-cons` |
| **H. 셸 (입출구)** | `cover` (+5 변형) / `section` / `session-break` / `qa` / `thanks-contact` / `end` / `signup-end` |
| **I. 코드·사이드바** | `code-focus` (코드 중심) / `content-sidebar` (본문 + 보조 박스) |

각 레이아웃의 "언제 사용 / 피해야 할 경우" 가이드는 SKILL.md §2.D 표 참조.

---

## §14. 신규 레이아웃 6종 + 고도화 4종 (2026-06)

### 신규 6종 — 글 구조 갭 보강

| 클래스 | 용도 | 인접 레이아웃과의 구분 |
|---|---|---|
| `faq` | 본문 Q&A 쌍 2~5개 (H3 의문문 + 답변 자동 카드화, Q 칩) | 셸 `qa`(마감 Q&A 슬라이드)와 별개. 명사형 개념은 `definition-cards` |
| `code-focus` | 코드가 주역인 슬라이드 (14pt 확대 + 에디터 헤더 바) | 보조 코드 조각은 일반 content의 `pre` |
| `step-text` | 텍스트 절차 3~5단계 카드 스택 + purple 번호 배지 | 이미지 동반 → `step-image-guide`, 한 줄 요약 → `timeline` |
| `gallery-grid` | 이미지 3~6장 가변 그리드 (한 단락 연속 작성) | 2×2 고정 → `gallery-4`, 2장 → `two-image` |
| `content-sidebar` | 좌 본문(.main) + 우 340px 사이드 박스(.side, 상단 purple 보더) | 짧은 메모 → `.note` 인라인 헬퍼 |
| `schedule` | 구체 날짜 행 단위 일정표 (첫 컬럼 mono purple) + `.tag` 조합 | 분기/Phase 그룹 → `roadmap`, 수직 마커 → `milestone-timeline` |

### 고도화 4종 — 시각 무게 보강 (DOM 불변, CSS만 변경)

| 클래스 | 변경 전 | 변경 후 |
|---|---|---|
| `toggle-list` | hairline 행 + ▶ 문자 | canvas-card 카드 그룹화 + purple 칩 ▶ (definition-cards 이음 기법) |
| `concept-list` | 텍스트 큰 번호 | pastel-lavender 44×44 라운드 사각 번호 배지 |
| `agenda` | 레거시 토큰 + counter 번호만 | notion 토큰 + canvas-card 카드 + purple 칩 번호. `toc`(흰 카드)보다 한 단계 무거운 위계 |
| `lecture-objective` | hairline 행 + → 문자 | canvas-card 카드 스택 + orange 칩 → (강의 계열 orange 유지) |

기존 마크다운/변환물은 무수정 재빌드만으로 새 디자인이 적용된다 (셀렉터·DOM 호환 유지).

---

## §15. 톤 프리셋 3종 (2026-06) — 발표 대상 축

§12 색상 변형(브랜드 색 축, 카탈로그만)과 **별개의 축**: 톤 프리셋은 같은 propca 시그니처 안에서 발표 **대상·상황**에 맞춰 강조 색·채도만 조정하는 **실구현 클래스**다. 시각 카탈로그: [`tone-variants.md`](tone-variants.md).

| 프리셋 | 대상 | 토큰 오버라이드 |
|---|---|---|
| `tone-exec` | 임원·이사회 보고 | `--purple` → `#22307a` (navy 계열 절제) + 파스텔 6색 저채도화 |
| `tone-lecture` | 강의·교육 | `--purple` → `#dd5b00` (orange — lecture-* 톤 전덱 확장) |
| `tone-seminar` | 대외 세미나·컨퍼런스 | `--canvas-card` → lavender 틴트 + blockquote 보더 `--pink` |

### 적용 방법 (Marpit 제약)

슬라이드별 `<!-- _class: ... -->`(spot directive)는 front matter `class:`를 **대체**하므로 이중 적용이 필요:

1. front matter: `class: tone-exec`
2. 모든 spot directive에 합성: `<!-- _class: cards tone-exec -->`

md-to-marp-propca의 `tone=` 인자가 이를 자동 수행 (SKILL.md §3.F). purpose 키워드(임원/강의/세미나)로 md-to-marp 오케스트레이터가 자동 선택.

### PROCPA 정체성 가드

- `cover`/`section`/`end` 셸의 `--navy` hero + procpa 로고는 3톤 공통 **불변** (셸 규칙이 navy를 직접 참조하므로 자동 보장)
- 강조색 ≤2종 정책(쇼케이스 규칙 8)은 톤과 무관하게 유지
- 톤 클래스가 일부 슬라이드에만 합성되면 marp-reviewer가 medium 이슈로 검출

참고: 신규/톤 클래스는 base `h1`(28pt) 스타일을 상속하므로 LAYOUT HEADERS UNIFICATION 블록에 추가하지 않는다 — 톤 클래스를 그 블록에 넣으면 cover의 56pt h1이 28pt로 강제되는 부작용이 있다.
