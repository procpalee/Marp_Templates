# procpa-vivid — Slide Design System (단일 레퍼런스)

**출처:** procpa.co.kr 블로그 디자인 시스템 (저장소 [`procpalee/procpa_obsidian_style`](https://github.com/procpalee/procpa_obsidian_style), `src/app/globals.css`).
**혈통:** Apple × CMDS 에디토리얼 문서 구조를 vivid-blue 아이덴티티로 retone. 브랜드 로고·상표는 사용하지 않음.
**데모(시각 예시):** [`procpa-vivid.md`](procpa-vivid.md) → 빌드 시 `procpa-vivid.html`. 이 문서가 토큰·컴포넌트·레이아웃의 **단일 출처**다.

---

## §0. 한 줄 요약

procpa-vivid — 화이트 캔버스 + Vivid Blue `#2563eb` 단일 강조색 + 헤어라인 에디토리얼. 모던·전문 발표(회계·재무·AI 생산성)용. **컴포넌트 우선(components-first)**: 일상 슬라이드는 공통 컴포넌트로 조립하고, 전용 레이아웃은 임팩트가 필요할 때만 꺼낸다.

---

## §1. Brand & Tone

- **용도:** 모던/전문 발표, 제품·전략 브리핑, 기술 강연, 블로그(procpa.co.kr) 톤 일관성
- **톤:** 미니멀·에디토리얼·신뢰감. 그림자 없음, 여백과 헤어라인으로 깊이
- **타깃 청중:** 임원·전문가·일반 청중 공통 (고대비 화이트 + 큰 타입)

---

## §2. Color Tokens (LIGHT — "Vivid Blue")

| Token | HEX | 용도 |
|---|---|---|
| `--canvas` | `#ffffff` | 기본 슬라이드 배경 |
| `--canvas-soft` | `#f4f6f9` | muted 표면 (코드·thead·section 배경·`.note`/`.chip`/`.kbd`/`.panel.soft`) |
| `--card` | `#ffffff` | 카드 배경 |
| `--ink` | `#0c0e12` | 본문 (쿨 near-black) |
| `--ink-mute` | `#4a5160` | 보조 텍스트 |
| `--ink-sub` | `#8a90a0` | 라벨·메타 (3차) |
| `--blue` | `#2563eb` | **단일 강조색** — 링크·eyebrow·콜아웃·CTA |
| `--blue-hover` | `#3b82f6` | hover / 다크 위 강조어 |
| `--blue-soft` | `#eff5ff` | accent wash (콜아웃·배지·`.quote-block`/`.panel.accent` 배경) |
| `--hairline` | `#e6e9ee` | 보더·구분선 |
| `--hairline-strong` | `#d4d8df` | 강조 보더·연결선 |
| `--destructive` | `#c2410c` | 경고 · pros-cons ✗ · callout.danger · problem |
| `--success` | `#15803d` | 의미 토큰 — callout.success (절제 사용) |
| `--warn` | `#b45309` | 의미 토큰 — callout.warn |
| `--chart-1..5` | `#2563eb→#3b82f6→#60a5fa→#94a3b8→#cbd5e1` | 차트 ramp |

다크 "Bright Royal"(`#5b9cff` on `#0b0e13`)은 **별도 변형 테마 `procpa-vivid-dark`로 구현됨** — §8 참조.

---

## §3. Typography

- `--font-sans`: `'Pretendard Variable', Pretendard, 'Noto Sans KR', ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `var(--font-sans)` (모노=sans alias, 숫자에 `tabular-nums`)
- 본문: 18pt / line-height 1.6 / letter-spacing -0.011em
- h1(콘텐츠 타이틀): 34pt / 700 / **하단 헤어라인** (에디토리얼 구분)
- h2: 22pt / 600 / ink-mute · h3: 18pt / 600
- h4 = **대문자 eyebrow 라벨** (12pt, +0.06em, ink-sub) — 또는 `.eyebrow`(블루)
- 셸 타이틀: cover/end 56pt, section 88pt 챕터 번호

라디우스 스케일: `--radius` 11px 기준 sm 7 / md 9 / lg 11 / xl 16.

---

## §4. Signature 요소 (블로그 globals.css 충실 이식)

1. **헤어라인 타이틀** — 콘텐츠 슬라이드 h1 아래 1px 구분선 + 큰 여백
2. **eyebrow 라벨** — 대문자 + tracking, 블루(`.eyebrow`) 또는 grey(h4)
3. **블루 콜아웃 blockquote** — 좌 3px `--blue` + `color-mix(blue 8%)` wash + 우측만 radius, 비이탤릭
4. **토큰칩 인라인 코드** — `--canvas-soft` 배경 + 헤어라인 보더 + radius-sm (블루 아님)
5. **보더 테이블** — 보더 + thead `--canvas-soft` + overflow-hidden, th 대문자 라벨
6. **tabular-nums** — KPI·페이지번호·번호 배지 숫자 정렬
7. **링크 밑줄 채움** — 30% 밑줄 → hover 시 full
8. **단일 강조색** — Vivid Blue 1종. 그림자·그라데이션 없음. **카드 표면 = 흰 배경 + 헤어라인 보더**(회색 fill 지양). `--canvas-soft` 회색은 코드·테이블 헤더·섹션 구분·`.note`/`.chip`/`.kbd`/`.panel.soft` 등 *보조 표면*에만.
9. **코드 하이라이트** — highlight.js 토큰을 테마 토큰으로 채색(키워드 `--blue` / 문자열 `--success` / 숫자·클래스 `--warn` / 주석 `--ink-sub` italic / 함수 `--ink`). 전부 토큰 기반이라 `procpa-vivid-dark`에서 자동 반전. 단일 강조색 규칙의 **기능적 예외**.

> 본문 오버플로 가드: `section { overflow: hidden }`로 어떤 콘텐츠도 슬라이드 밖(=footer 아래)으로 유출되지 않음. footer 표시 슬라이드의 본문은 약 570px 안에 유지(박스형 항목 ≤5~6), 넘으면 슬라이드 분할.

---

## §5. 컴포넌트 우선 모델 — TIER 1 컴포넌트 · TIER 2 임팩트 레이아웃

CSS는 4계층 배너로 구성된다(`procpa-vivid.css`): **Tokens/Base → TIER 1 COMPONENTS → TIER 2 IMPACT LAYOUTS → SHELLS → PROJECT LAYOUTS**. 모든 색은 `:root` 토큰 → `procpa-vivid-dark` 자동 반전.

### 결정 규칙 (한 문장)
> **한 장을 공통 컴포넌트로 조립할 수 있으면 컴포넌트로 만든다. 컴포넌트로 못 그리거나 화면을 통째로 강조해야 할 때만 임팩트 레이아웃을 쓴다. 같은 역할이 반복되면 다른 것으로 돌려쓴다.**

스킬 자동 매칭 규칙은 [`.claude/skills/md-to-marp-propca/references/procpa-vivid-matching.md`](../../../.claude/skills/md-to-marp-propca/references/procpa-vivid-matching.md).

> **v8 레이아웃 다이어트 (2026-07)**: 실사용 데이터 기반으로 section 레이아웃을 **CORE 세트(19종)**로 축소했다. 나머지 32종은 `[ARCHIVE]`로 강등 — CSS에 남아 렌더링은 되지만(기존 덱 호환) **신규 변환에는 쓰지 않는다**(§5-A). 아카이브가 담당하던 표현은 컴포넌트 레시피([`vivid-recipes.md`](../../../.claude/skills/md-to-marp-propca/references/vivid-recipes.md))로 대체한다.

### 콘텐츠 신호 → 클래스 퀵맵 (CORE + 레시피)

| 콘텐츠 신호 | 1순위 | 비고 |
|---|---|---|
| 핵심 숫자·KPI | `.stat`(본문에 소량, R-02) | KPI 밴드·metric-row는 미사용(v8.1 아카이브) |
| A vs B 비교 | `.vs` / `comparison-vs`(전면) | 표 형태면 `comparison` |
| 장단점 | `.vs` 좌우에 ✓/✗ 리스트 | 레시피 R-04 |
| 문제→해결 | `.cols-2` + `.card` vs `.card.accent` | 레시피 R-03 |
| 절차·순서 | `.process`(가로 3~5) / `steps`(세로 번호) | 연혁·로드맵은 `vertical-timeline`(v8.2 복귀) |
| 핵심 주장 한 문장 | `statement`(잉크) / `takeaway`(화이트 결론) | punctuation — 덱당 1~2장 |
| 용어 정의 | `.panel.accent`(h4 용어 + 본문) | 레시피 R-07 |
| 체크리스트·판단 기준 | `checklist` 레이아웃 (✓/○, v8.1 복귀) | `li.done`=✓ |
| 예상 질문 (Q&A) | `faq` 레이아웃 (Q 배지, v8.2 복귀) | 소형 2쌍 이하는 `.stack`+`.panel`(R-08) |
| 코드 | `.code-block`(본문 중) | 투사용은 `code-lg` 합성 |
| 인용 | `.quote-block` / `callout-hero`(전면) | |
| 스크린샷·이미지 | `.shot` / `split` + 이미지 / `.cols-2` + `figure` | |
| 병렬 개념 3~4개 | `.cols-3` + `.card` / `feature-cards` | |
| 칸반·분류 보드 | `.board`(`.two`/`.four`) | 전용 레이아웃 없음 |
| 본문 + 참고 정보 | `content-sidebar` | 실사용 1위권 |

(제작 취향 축적본은 볼트 `.claude/harness/lessons/slides.md` — `/to-slides`가 필독)

### TIER 1 · 공통 컴포넌트

전역(un-scoped) 클래스. 두 갈래로 구분한다 (v7.2):

- **인라인 컴포넌트** — 본문과 섞거나 슬라이드 중간에 끼워도 자연스러운 것. **항상 유지 권장.**
- **블록 컴포넌트** — 구조 블록(카드·보드·지표 등). 한 장 전체를 채우는 흔한 경우는 **전용 레이아웃을 쓰는 편이 더 깔끔**하고(예: 3카드 → `feature-cards`, 1:1 → `comparison-vs`), 이질적 내용을 한 장에 섞을 때만 `.cols-*`에 블록을 조합한다.

**조합 래퍼(블록용):** `.cols-2` · `.cols-3` · `.cols-4` · `.stack`(세로) · `.split-7-5`(비대칭 1.4:1)

#### 인라인 컴포넌트 (본문과 함께)
| 컴포넌트 | 용도 |
|---|---|
| `.callout` | 좌측 바 박스 — `success`/`warn`/`danger`/`example` |
| `.quote-block` | 인용 블록 (좌 블루 바 + `.cite` 출처) |
| `.code-block` | 파일명/언어 헤더 코드 (`<div class="code-head">app.py<span class="lang">python</span></div>` + 빈줄 + 펜스 + 빈줄). 본문 중 삽입용(전면은 `code-focus`) |
| `.table-block` | 표 컴포넌트 — 회계 스타일(가로 룰, 지브라 없음). `.compact` + `.cap`/`figcaption` 캡션. 숫자열은 markdown `---:`로 우측정렬 |
| `.mark` | 블루 하이라이트 (본문 강조) |
| `.tag` | 상태 배지 — `.success`/`.warn`/`.danger`/`.muted` |
| `.shot` | 프레임 스크린샷 — `<img class="shot">`(중앙·높이 380px·헤어라인-strong 보더·라운드). `.split`·`content-sidebar .main` 안 이미지는 자동 적용 |
| `.chip`·`.kbd`·`.note`·`.divider`·`figure` | mono 라벨 · 키캡 · 회색 메모 · 구분선 · 이미지+캡션 |
| `.eyebrow`·`.accent`·`.muted` | 텍스트 라벨·강조·약화 |

#### 블록 컴포넌트 (`.cols-*`에 조합 — 섞을 때만; 풀슬라이드는 레이아웃 권장)
| 컴포넌트 | 용도 / 풀슬라이드 레이아웃 대안 |
|---|---|
| `.card`(+`.accent`/`.featured`/`.top-rule`/`.num`/`.ico`) | 카드 → `feature-cards`/`grid-3`/`block-features`/`conclusion-cards` |
| `.stat` | KPI 블록 → `metric-row` |
| `.vs` | 1:1 비교 → `comparison-vs` |
| `.board`(`.two`/`.four`) | 칸반(To-Do/진행/완료) — 전용 레이아웃 없음, 블록으로만 |
| `.panel`(`.accent`/`.soft`) | 제목 박스 → `definition`·`content-sidebar` |
| `.process` | A→B→C → `flow-arrow`·`steps` |

### CORE 레이아웃 — 본문 7종 (`<!-- _class: X -->`, 한 장 한 레이아웃)

실사용 상위 레이아웃. 컴포넌트로 조립하기 애매하거나, 한 장 전체가 단일 구조일 때 사용한다.

| 클래스 | 용도 / 마크업 키 | 실사용 근거 |
|---|---|---|
| `split` | 50/50 2열 + 중앙 헤어라인 (`.cols`) — 본문+이미지의 기본형. 이미지 자동 프레임 | 1위 (39장 중 10회) |
| `feature-cards` | `.cards` 아래 `.card` N개 자동 그리드 — 특징·전략 3~4개 | 3위 |
| `content-sidebar` | `.layout > .main / .aside` — 본문 + 우측 참고 박스 | 4위 |
| `comparison-vs` | 1:1 대형 비교 카드 + 중앙 VS 배지 (`.vs-row > .vs-card/.vs-divider>.vs-badge`) — `.compact` 지원 | 5위 |
| `comparison` | 보더 테이블 비교(첫 컬럼 강조) — `.compact` 지원 | 사용 |
| `steps` | 번호 단계 스택 + 블루 원형 배지 (`ol`) | 사용 |
| `icon-list` | 카드 행 리스트 + `em` mono 배지 — `.compact` 지원 | 사용 |
| `checklist` | ✓(`li.done`)/○ 행 리스트 — 판단 기준·점검 목록 (고정 행 간격) | v8.1 복귀 |
| `faq` | Q&A — 블루 Q 배지 (`.qa > h3 + p`) | v8.2 복귀 |
| `vertical-timeline` | `ol` 좌측 수직 레일 + 원형 블루 번호 배지 — 연혁·로드맵 | v8.2 복귀 |

### CORE 레이아웃 — 임팩트 3종 (덱당 1~3장, "한방"용)

| 클래스 | 용도 / 마크업 키 |
|---|---|
| `statement` | ink 캔버스 대형 선언 + 블루 강조어. **`statement light`** = 화이트 변형(`<p class="accent">` 대형 블루 줄) |
| `takeaway` | 화이트 결론 강조 — 블루 액센트 바 + 대형 h1 + 보조 p |
| `callout-hero` | 전면 블루 콜아웃 인용 (blockquote 대형) |

### SHELLS (덱 골격 — CORE)

- **커버 3종** — `cover`(기본, 상단 2px 블루) · `cover-image`(`_backgroundImage`+다크 스크림) · `cover-split`(`![bg left:50%]` 사진 분할, v8.1 복귀)
- **전환/목차** — `section`(88pt 챕터 번호) · `toc`(헤어라인 번호 행, `<li class="current">`로 진행 강조)
- **폐막 3종 + 휴식** — `end`(cover 미러) · `qa`(거대 `?` 워터마크) · `thanks-contact`(연락 리스트 + QR, 값 텍스트 검정) · `session-break`(`BREAK` eyebrow, 긴 강의 휴식 — v8.2 복귀)
- **썸네일** — `thumb`(블로그/OG, §썸네일 시스템 참조)

> 사진 커버(`cover-image`) 스크림은 **고정 다크 리터럴**(`rgba(8,11,16,…)`) — `--ink`를 쓰면 다크 테마에서 밝아져 흰-on-흰이 되므로 의도적 테마 독립. QR 흰 배경(`thanks-contact`)도 동일.

### §5-A · ARCHIVE (32종) — 신규 사용 금지, 렌더링 호환만

아래 레이아웃은 CSS에 `[ARCHIVE]` 마커와 함께 남아 있어 **기존 덱은 계속 빌드되지만, 신규 변환·신규 덱에서는 선택하지 않는다.** 같은 표현이 필요하면 우측 대안을 쓴다. (6개월 후 재집계에서도 미사용이면 삭제 검토.)

| ARCHIVE | 신규 덱에서의 대안 |
|---|---|
| `problem-solution` · `gap-analysis` | `.cols-2` + `.card`/`.card.accent` (레시피 R-03) |
| `pros-cons` | `.vs` 좌우 ✓/✗ 리스트 (레시피 R-04) |
| `timeline` · `roadmap` | `.process` / `steps` / `vertical-timeline` (레시피 R-06) |
| `definition` | `.panel.accent` (레시피 R-07) |
| `toggle-list` | `icon-list` / `checklist` |
| `metric-row` | 미사용 (v8.1 — 숫자 강조는 `.stat` 소량만, R-02) |
| `code-focus` | `.code-block` + `code-lg` modifier |
| `image-split` · `gallery` · `before-after` · `two-image` | `split` + 이미지 / `.cols-2` + `figure` |
| `grid-3` · `block-features` · `conclusion-cards` | `feature-cards` 또는 `.cols-3` + `.card`(`.num`/`.ico`) |
| `conclusion-split` · `situation-insight` | `.split-7-5` + `.panel.accent` (레시피 R-05) |
| `conclusion-actions` | `.cols-4` + `.card` |
| `lead-support` · `big-insight` | `takeaway` 또는 `# 주장` + `.cols-3`/`.stat` (레시피 R-02) |
| `quote` | `callout-hero` / `.quote-block` |
| `flow-arrow` | `.process` |
| `comparison-three` | `.cols-3` + `.card.featured` |
| `closing-cta` | `end`/`qa` |
| `cover-minimal` · `cover-band` · `cover-photo-full` | `cover` / `cover-image` / `cover-split` |

> v8.1 (2026-07): `checklist`·`cover-split` CORE 복귀, `metric-row` 아카이브 이동.
> v8.2 (2026-07): `faq`·`vertical-timeline`·`session-break` CORE 복귀 (사용자 선택). ARCHIVE 28종.

> 아카이브 레이아웃의 마크업 골격은 데모 [`procpa-vivid.md`](procpa-vivid.md)에 남아 있다(호환 확인용).

### 여백/밀도

- **자동 균형** — 컨텐츠 래퍼는 `margin:auto`/`flex:1`로 잔여 공간에서 수직 중앙정렬. 짧으면 균형 여백, 길면 상단정렬(채움).
- **밀도 모디파이어** — `.compact`(패딩·폰트 ↓) / `.roomy`(여백 ↑). 합성: `<!-- _class: faq compact -->`. v7.3에서 `.compact`가 `comparison`(표 15pt)·`comparison-vs`(카드 16pt)·`icon-list`(촘촘)까지 커버.
- **강의 modifier (v7.3, 한공회 덱 기준)** — `.code-lg`(`_class`에 합성 → 코드 18.5pt 투사용) · `statement light`(화이트 선언) · `.shot`(프레임 스크린샷). `content-sidebar` aside는 기본 16pt(가독성). 이 modifier들로 per-slide `<style scoped>` 없이 강의·회계 발표 덱을 만든다.
- **발표 보조** — 페이지네이션 `현재 / 전체`(자동) · 목차 진행(`<li class="current">`) · 섹션 브레드크럼 헤더(`<!-- _header: 'CH 2 · …' -->`).

### 새 레이아웃 추가 절차 (확장)

앞으로 Marp 작업 중 컴포넌트로 안 되는 임팩트 레이아웃이 필요하면 **점진 추가**한다:

1. **CSS** — `procpa-vivid.css` 맨 끝 `PROJECT LAYOUTS` 배너 아래에 `section.<new> { … }`를 추가. **토큰만 사용**(리터럴 색 금지) → 다크 자동 반전.
2. **레퍼런스** — 위 TIER 2 표에 한 줄 추가.
3. **스킬** — `references/procpa-vivid-matching.md` 매핑 표 ② 열에 신호→클래스 한 줄 추가.
4. **데모(선택)** — `procpa-vivid.md` PART 2에 대표 슬라이드 1장.
5. **검증** — `npm run build:procpa-vivid` + `build:procpa-vivid-dark`로 라이트/다크 모두 확인.

> 추가 전 자문: "이게 `.card`/`.panel`/`.board`/`.process` 조합으로 안 되나?" 되면 컴포넌트로. 안 되거나 반복적으로 임팩트가 필요할 때만 새 레이아웃.

---

## §6. Don'ts

- **파스텔·스티키노트·네이비 hero 금지** — 그것은 propca-notion-style. procpa-vivid는 화이트 + 단일 블루
- 강조색 2종 이상 금지 (Vivid Blue 단일; 예외: problem/cons `--destructive`, 코드 하이라이트)
- 그림자·그라데이션 금지 — 깊이는 헤어라인 + 여백
- `statement`의 ink 배경은 punctuation 1~2장 한정 (덱 전체 다크는 `procpa-vivid-dark`)
- 인라인 코드는 블루 텍스트 아님 (토큰칩 = ink + muted 배경)
- **ARCHIVE 레이아웃(§5-A) 신규 사용 금지** — 기존 덱 재빌드만 허용, 신규 변환은 CORE + 레시피로

---

## §7. 빌드

```
cd build
npm run build:procpa-vivid          # 라이트 1회 빌드
npm run watch:procpa-vivid          # 라이트 변경 감지
npm run build:procpa-vivid-dark     # 다크 1회 빌드
npm run watch:procpa-vivid-dark     # 다크 변경 감지
```

`--theme-set ../themes/slide` 재귀 스캔이 `procpa-vivid.css`와 `procpa-vivid-dark.css`(`@import`)를 자동 등록.

---

## §8. Dark variant — `procpa-vivid-dark` (Bright Royal)

라이트 베이스를 `@import 'procpa-vivid'`로 **전체 상속**하고 `:root` 토큰만 교체하는 변형 테마. 베이스의 컴포넌트·레이아웃 변경이 **자동 전파**된다. 덱 단위 적용: front matter `theme: procpa-vivid-dark`.

### 다크 토큰 (override)

| Token | LIGHT | DARK |
|---|---|---|
| `--canvas` | `#ffffff` | `#0b0e13` |
| `--canvas-soft` | `#f4f6f9` | `#151a23` |
| `--card` | `#ffffff` | `#11151c` |
| `--ink` | `#0c0e12` | `#f4f6fa` |
| `--ink-mute` | `#4a5160` | `rgba(244,246,250,0.70)` |
| `--ink-sub` | `#8a90a0` | `rgba(244,246,250,0.50)` |
| `--blue` | `#2563eb` | `#5b9cff` |
| `--blue-hover` | `#3b82f6` | `#7db0ff` |
| `--blue-soft` | `#eff5ff` | `rgba(91,156,255,0.14)` |
| `--on-blue` | `#ffffff` | `#0b0e13` |
| `--hairline` | `#e6e9ee` | `rgba(255,255,255,0.12)` |
| `--hairline-strong` | `#d4d8df` | `rgba(255,255,255,0.22)` |
| `--destructive` | `#c2410c` | `#f87171` |
| `--success` | `#15803d` | `#4ade80` |
| `--warn` | `#b45309` | `#fbbf24` |

### 명시 override (토큰 자동 반전 예외)

`statement`만 베이스에서 리터럴 색(`background: var(--ink); color: #fff`)을 쓰는 "라이트 내 다크 슬라이드"다. 다크에선 `--ink`가 밝아져 흰-on-흰으로 깨지므로 `procpa-vivid-dark.css`에서 `section.statement`를 `--canvas-soft` 패널 + `--ink` 텍스트로 재고정한다. 나머지 모든 컴포넌트·레이아웃은 토큰만 쓰므로 추가 작업 없이 반전된다(신규 `.board`/`.panel`/`.process`/`.quote-block` 포함).
