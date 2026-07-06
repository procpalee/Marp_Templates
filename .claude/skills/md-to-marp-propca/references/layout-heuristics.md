# propca-notion-style — 레이아웃 매핑 휴리스틱 (40 규칙)

표준 마크다운의 슬라이드 단위 콘텐츠를 분석해 propca-notion-style 레이아웃 중 하나로 매칭한다. 우선순위는 셸(cover/end/qa/section/session-break) → 네비게이션(toc-split) → 콘텐츠.

---

## 매칭 우선순위

1. **셸 강제 매칭** — 첫 슬라이드 / 마지막 H1 / `***` 가로선
2. **네비게이션** — toc-split / section
3. **시각 강조** — hero-quote / image-quote / gallery-grid (이미지 3~6)
4. **코드 중심** — code-focus (fenced code 지배)
5. **2 컬럼 비교** — compare / two-image / before-after
6. **카드 / 그리드** — cards / pastel-blocks / definition-cards
7. **비교 / 정의 / Q&A** — feature-compare (특성 비교표) / definition-cards (개념 정의 카드) / faq (의문문 H3 쌍)
8. **튜토리얼** — step-image-guide (단계 + 이미지) / step-text (단계 텍스트만)
9. **데이터 표시** — 일반 `<table>` + 인라인 `.tag` / schedule (날짜 첫 컬럼)
10. **순서 / 흐름** — timeline / vertical-timeline / roadmap
11. **리스트 변형** — toggle-list / icon-list / block-features
12. **사이드바** — content-sidebar (본문 + 보조 블록)
13. **폴백** — 평범 content (no `_class`)

각 슬라이드는 위 순서대로 매칭 시도. 첫 매치에서 확정.

---

## 매핑 표 (전체 40행)

| # | 입력 패턴 | 출력 클래스 | 신뢰도 | 폴백 |
|---|---|---|---|---|
| 1 | 첫 슬라이드 (H1 + 부제 + 발표자) | `cover` | 高 | — |
| 2 | 첫 3 슬라이드 내 H2 `목차`/`Agenda`/`Outline` + ol/ul 3~6 | `toc-split` | 高 | content |
| 3 | H2 `\d+\. <title>` 솔로 (≤1 본문 행), 형제 3+ | `section` | 高 | content |
| 4 | blockquote 솔로 (≥2행, 마커 없음) — 출처(`— 출처`·URL) 유무 무관 | `hero-quote` | 高 | content |
| 5 | 이미지 1 + blockquote 동일 슬라이드 | `image-quote` (+`![bg left:60%]`) | 高 | inline 이미지 |
| 6 | 2 컬럼 ul/ol + `vs`/`대비`/`비교`/`compare` 키워드 | `compare` | 高 | content |
| 7 | 인라인 이미지 정확히 2 + 본문 ≤3행 | `two-image` | 高 | content |
| 8 | 이미지 2 + `이전`/`이후`/`before`/`after`/`AS-IS`/`TO-BE` | `before-after` | 高 | `two-image` |
| 9 | H3 카드 3~4 (각 + 1~2행 본문) | `cards` | 高 | grid 폴백 |
| 10 | 표 + 상태 컬럼 (`진행중`/`완료`/`대기`/`예정`/`중단`) | 일반 `<table>` + 인라인 `.tag` 자동 주입 | 高 | content |
| 11 | 2~6 개념 블록 단락형 (각 1~2행 본문, hero 톤) | `pastel-blocks` | 中 | cards |
| 12 | ol 3~5 항목, 각 `**bold** —` 리드인 | `timeline` | 高 | content |
| 13 | ol ≥5 항목, 각 부가 설명 1~2행 | `vertical-timeline` | 高 | timeline |
| 14 | H2 + `로드맵`/`roadmap`/`phase`/`Q1`/`Q2` 키워드 + 3~4 그룹 | `roadmap` | 高 | vertical-timeline |
| 15 | ul 항목에 2단계 들여쓰기 부가 설명 (펼침형) | `toggle-list` | 高 | content |
| 16 | ul 각 항목이 이모지/아이콘 + 콜론 (예: `✅ 완료: ...`) | `icon-list` | 高 | content |
| 17 | 3~6 `### Title` + 1행 설명 + 1~2행 본문 | `block-features` | 高 | cards |
| 18 | 단일 큰 숫자/% + 캡션 1행 (`# 87%` + 짧은 설명) | `pastel-blocks` (단일 hero) | 中 | content (propca에 big-number 없음) |
| 19 | 마지막 H1 = `Q&A`/`질문`/`Questions` 솔로 | `qa` | 高 | end |
| 20 | 마지막 H1 = `감사`/`Thanks` + 이메일/`@핸들` | `thanks-contact` | 高 | end |
| 21 | 마지막 H1 = `감사`/`Thanks`/`끝`/`The End` 솔로 | `end` | 高 | — |
| 22 | 마지막 H1 누락 | `end` 자동 추가 | 高 | — |
| 23 | 챕터 사이 `^\*\*\*$` 가로선 | `session-break` 슬라이드 자동 삽입 | 高 | — |
| **24 (신규)** | 표 3+ 컬럼 + 상태 컬럼 없음 + 키워드 ✓/✗ 또는 특성 비교 ("협업"/"무료"/"한국어") | `feature-compare` (2~3 카드 그리드) | 高 | 일반 table |
| **25 (신규)** | ol 3~5 단계 + 각 단계 1+ 이미지 (총 ≥3 이미지) | `step-image-guide` (좌 단계 / 우 이미지) | 高 | vertical-timeline |
| **26 (신규)** | H3 2~6개 + 각 2~3행 본문 + 도구명·개념명 키워드 | `definition-cards` | 中 | cards / block-features |
| **27 (신규)** | H2 + 2 항목 카드 비교 + `vs`/`대비`/`A vs B` 키워드 (각 카드 본문 2~5행) | `compare-cards` (2 카드 + VS 뱃지) | 高 | compare |
| **28 (신규)** | 표 2 컬럼 + 첫 컬럼=속성 라벨, 나머지 2 컬럼=비교 대상 (행 4+) | `compare-table` | 高 | 일반 table |
| **29 (신규)** | ol 5~10 항목 + 각 `**bold** —` 리드인 + 정의·설명 (개념 사전 톤) | `concept-list` | 高 | vertical-timeline |
| **30 (신규)** | 표 2 컬럼 + 첫 컬럼=용어 + 둘째 컬럼=정의 (행 4+) | `concept-table` | 高 | concept-list |
| **31 (신규)** | 3~4개 항목 카드 그리드 + 각 카드 ul 비교 항목 (3~4 항목) | `comparison-3up` | 高 | feature-compare |
| **32 (신규)** | H1 `장단점`/`Pros & Cons` + 2 ul 그룹 (좌측 ✓ 항목 / 우측 ✗ 항목) | `pros-cons` | 高 | compare |
| **33 (신규)** | GFM 태스크 리스트 (`- [ ]` / `- [x]`) ≥3 항목 — Marp Core가 GFM task list를 렌더링하지 않으므로 **반드시** `<ul>` raw HTML의 `<li class="todo">`/`<li class="done">`으로 치환해 출력 | `checklist` | 高 | icon-list |
| **34 (2026-06)** | H3 2~5개가 의문문 (`\?$`·`인가요`·`나요`·`까요`·`어떻게`·`왜`) + 각 1~3행 답변 | `faq` | 高 | definition-cards |
| **35 (2026-06)** | fenced code block ≥6행 + 기타 본문 ≤3행 (코드가 슬라이드 지배) | `code-focus` | 高 | content |
| **36 (2026-06)** | ol 3~5 + `**제목** —` 리드인 + 각 설명 ≥2행 + 절차 키워드(`단계`/`Step`/`먼저`/`다음`) + 이미지 0 | `step-text` | 中 | timeline |
| **37 (2026-06)** | 이미지 3~6 + 본문 ≤2행 | `gallery-grid` | 高 | 슬라이드 분할 |
| **38 (2026-06)** | 본문 ≥4행 + 보조 블록 동반 (`참고`/`Tip`/`주의`/`관련` 헤더의 짧은 ul·blockquote) | `content-sidebar` (main/side div 생성) | 中 | content + callout |
| **39 (2026-06)** | 표 첫 컬럼 날짜 패턴 (`\d{1,2}/\d{1,2}`·`\d{4}-\d{2}`·`N월 N일`·`D-\d+`) 행 3+, 또는 ul 각 `**날짜** —` | `schedule` | 高 | roadmap / 일반 table |
| 40 | (기본) 인식 못한 H2 + 본문 | 평범 content (no `_class`) | — | — |

### 경합 정리 (2026-06 신규 규칙 ↔ 기존 규칙)

- **규칙 12 timeline vs 39 step-text** — 각 항목 설명이 2행 이상이고 절차 키워드가 있으면 `step-text`(카드 스택), 한 줄 요약형이면 `timeline`(수평 흐름).
- **규칙 14 roadmap vs 42 schedule** — 분기/Phase **그룹** 단위면 `roadmap`, 구체 **날짜 행** 단위면 `schedule`.
- **규칙 25 step-image-guide vs 39 step-text** — 단계에 이미지가 있으면 `step-image-guide`, 텍스트만이면 `step-text`.
- **규칙 26 definition-cards vs 37 faq** — H3가 의문문이면 `faq`, 명사형 개념·도구명이면 `definition-cards`.
- **규칙 10 일반 table+tag vs 42 schedule** — 첫 컬럼이 날짜 패턴이면 `schedule`(상태 컬럼이 있어도 `.tag` 주입과 병행), 아니면 일반 table.
- **셸 `qa` vs 37 faq** — 마지막 H1 `Q&A` 솔로(질문 목록 없음)는 셸 `qa`, 본문 중 Q&A 쌍 나열은 `faq`.

---

## 셸 강제 매칭 상세

### cover (강제)

첫 슬라이드 본문이 H1 1개 + 짧은 부제(H2 또는 짧은 1줄) + 발표자/날짜/핸들 1줄 구성이면 그대로 cover.

cover 슬라이드는 propca CSS가 다음을 자동 렌더:
- 좌상단 procpa 로고 (white)
- Navy 그라데이션 배경
- H1 + H2 + 우하단 메타데이터

마크다운 예시 출력:
```markdown
<!-- _class: cover -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->

# 클로드 엑셀 소개

## AI 자동화 가이드

2026.05 · ProcPA
```

### qa / thanks-contact / end

마지막 H1 패턴으로 분기:
- `^# (Q&A|질문|Questions?).?$` → qa
- `^# (감사|Thanks|Thank you).*` + 본문에 이메일(`\w+@\w+\.\w+`) 또는 `@핸들` 포함 → thanks-contact
- 그 외 `감사`/`Thanks`/`끝`/`The End` → end

원본에 마지막 H1이 없으면 자동으로 `end` 슬라이드 추가:
```markdown
<!-- _class: end -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->

# Thank You
```

### session-break

`^\*\*\*$` 라인(가로선 3개)이 슬라이드 경계로 인식되면 그 위치에 `session-break` 슬라이드를 자동 삽입:
```markdown
---

<!-- _class: session-break -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->

# Coffee Break

---
```

(추후 챕터명을 인접 H2에서 추출해 부제로 넣는 것도 가능 — v2 확장.)

---

## 네비게이션 매칭 상세

### toc-split

첫 3 슬라이드 안에서 다음 패턴:
- H2가 `목차`, `Agenda`, `Outline`, `Contents`, `오늘의 흐름`, `Today's Topics` 중 하나
- 또는 ol/ul 3~6 항목 (각 ≤2행, 챕터처럼 보임)

마크다운 예시:
```markdown
<!-- _class: toc-split -->

## 목차

1. 클로드 엑셀이란
2. 설치와 기본 설정
3. 주요 기능
4. 활용 사례
5. Q&A
```

### section

H2가 `^\d+\.\s+`로 시작 (예: `## 1. 사전 준비`) 형제 챕터가 3+:
```markdown
<!-- _class: section -->
<!-- _header: '01. 사전 준비' -->

# 1. 사전 준비

설치 전 확인해야 할 사항
```

> propca는 `section` 단일 변형 (notion-style의 다크/라이트 구분 없음).

---

## 콘텐츠 매칭 상세 — 핵심 규칙

### hero-quote vs image-quote

- 이미지 없음 + blockquote 솔로 → **hero-quote**
- 이미지 있음 + blockquote → **image-quote** (+`![bg left:60%]` 자동 주입)

`image-quote`는 좌측 60% 이미지 / 우측 40% 텍스트 분할이 propca CSS의 약속. 마크다운 출력 예시:
```markdown
<!-- _class: image-quote -->
<!-- _header: '' -->
<!-- _footer: '' -->

![bg left:60%](assets/screen.png)

> 클로드 엑셀은 회계 업무의 80% 반복 작업을 자동화한다.
> — 사용자 후기

```

### compare vs two-image vs before-after

- 2 컬럼 분량 ul/ol + "vs", "대비", "비교" 키워드 → **compare**
- 정확히 이미지 2개 + 본문 ≤3행 → **two-image**
- 위 + "이전/이후/AS-IS/TO-BE/before/after" 키워드 → **before-after**

### cards vs pastel-blocks vs block-features

이 3 레이아웃은 비슷해 보이지만 신호가 다르다:

| 클래스 | 트리거 | 톤 |
|---|---|---|
| `cards` | H3 3~4개 + 각 1~2행 짧은 카드 | 균일한 카드 그리드 |
| `pastel-blocks` | 단락형 2~6 hero 블록 | 시각적 임팩트 (개념 정리 / hero) |
| `block-features` | H3 3~6개 + 각 1행 설명 + 1~2행 본문 | 기능 소개형 |
| `definition-cards` (신규) | H3 2~6개 + 각 2~3행 본문 + 도구명·개념명 키워드 | 도구·개념 정의 카드 |

매칭 우선: cards (가장 빈번, 짧음) → definition-cards (도구명·개념명 키워드 매치 시) → block-features (기능 톤) → pastel-blocks (단락형 hero) → fallback to plain content.

### 표(table) + tag 자동 — 일반 table 사용 (database-rows 삭제됨)

표가 다음 조건이면 **일반 마크다운 table 그대로** 사용하고 상태 셀에만 `.tag` 인라인 자동 주입:
- 컬럼 헤더에 `상태`/`Status` 포함
- 셀에 `진행중`/`완료`/`대기`/`예정`/`중단` 값

마크다운 출력:
```markdown
# 작업 진행 상태

| 작업 | 담당 | 상태 |
|---|---|---|
| 데이터 수집 | 김◯◯ | <span class="tag green">완료</span> |
| 모델 학습 | 박◯◯ | <span class="tag yellow">진행중</span> |
| 결과 검토 | 이◯◯ | <span class="tag sky">예정</span> |
```

### feature-compare — 특성 비교 (신규)

표가 다음 조건이면 `feature-compare` 카드 그리드로 변환:
- 컬럼 3+ 개 + 상태 컬럼 **없음**
- 셀에 ✓/✗ 또는 특성 키워드(협업·무료·한국어·통합도구 등)

마크다운 출력:
```markdown
<!-- _class: feature-compare -->

# AI IDE 비교

<div class="compare-grid">

### Claude Cowork
- 협업: 다중 에이전트
- 무료: 없음
- 한국어: 우수

### Antigravity
- 협업: 단일 에이전트
- 무료: 있음
- 한국어: 보통

</div>
```

표 마크다운을 자동 변환할 수도 있고, 사용자가 명시적으로 `<div class="compare-grid">`를 작성해도 통과.

### step-image-guide — 단계 + 이미지 (신규)

ol 3~5 단계 + 각 단계 1+ 이미지(총 ≥3 이미지) 패턴 검출 시 `step-image-guide`로 변환:

```markdown
<!-- _class: step-image-guide -->

# Step 1 — 설치

<div class="step-grid">
<div class="steps">

1. `홈` → `추가기능` 메뉴
2. Claude 검색 → **Add** 클릭
3. 라이선스 확인

</div>
<div class="img">

![설치 화면](assets/install.png)

</div>
</div>
```

본문 ol이 5+ 단계라도 한 슬라이드에 3~4 단계로 압축하고 나머지는 다음 슬라이드로 분할.

### definition-cards — 개념 정의 (신규)

H3 2~6개 + 각 2~3행 본문 + 도구명·개념명 키워드(`Gemini`, `Claude`, `Antigravity` 등) 검출 시:

```markdown
<!-- _class: definition-cards -->

# AI 도구 카탈로그

### Gemini
Google의 멀티모달 AI. 1M 토큰 컨텍스트 지원.

### Claude
Anthropic의 코딩·문서 작업 특화 AI. Skills/MCP 생태계.
```

`cards`와 구분 기준:
- 본문 1~2행 짧은 카드 → **cards**
- 본문 2~3행 + 도구명·개념명 → **definition-cards**
- 단락형 hero 톤 → **pastel-blocks**

### timeline vs vertical-timeline vs roadmap

- ol 3~5 + `**bold** —` 리드인 → **timeline** (수평)
- ol ≥5 + 각 부가 설명 → **vertical-timeline** (수직)
- H2 + 로드맵/Phase/Q1/Q2 키워드 + 3~4 그룹 → **roadmap**

### toggle-list vs icon-list

- ul 들여쓰기 2단계 (각 항목에 부속 설명) → **toggle-list**
- ul 각 항목 시작이 이모지/이모티콘 + 콜론 (`✅ 완료: ...`) → **icon-list**

### faq — Q&A 쌍 나열 (2026-06)

H3 2~5개가 의문문(`?` 종결, `~인가요`/`~나요`/`~까요`/`어떻게`/`왜`) + 각 1~3행 답변이면 `faq`:

```markdown
<!-- _class: faq -->

# 자주 묻는 질문

### 도입 비용은 어느 정도인가요?
인당 월 구독료 외에 초기 교육 비용이 발생합니다.

### 기존 매크로와 충돌하지 않나요?
별도 추가기능으로 동작하므로 독립적입니다.
```

`### 질문` + 인접 `p`(또는 `ul`)가 자동 카드화된다. 마지막 H1 `Q&A` 솔로는 셸 `qa`로 — faq는 본문용.

### code-focus — 코드 중심 (2026-06)

fenced code block ≥6행이고 코드 외 본문이 ≤3행이면 `code-focus`. 코드가 14pt로 확대되고 에디터 헤더 바 장식이 붙는다. 하단 ul은 `#` 마커 주석 톤:

```markdown
<!-- _class: code-focus -->

# 감가상각 계산 함수

​```python
def calculate_depreciation(...):
    ...
​```

- 정액법 기준 연 상각액 산출
- 반환값은 연도별 장부가액 리스트
```

### step-text — 텍스트 단계 가이드 (2026-06)

ol 3~5 항목 + 각 `**제목** — 설명` 리드인 + 설명 ≥2행 + 절차 키워드 + **이미지 없음**이면 `step-text` (카드 스택 + 번호 배지). 이미지가 있으면 `step-image-guide`, 한 줄 요약이면 `timeline`:

```markdown
<!-- _class: step-text -->

# 도입 절차

1. **업무 절차서 정비** — 반복 업무의 단계·산출물·검증 기준을 문서화합니다. 표준화 없이는 결과 편차가 큽니다.
2. **스킬 변환** — 절차서를 AI 스킬로 변환하고 샘플 데이터로 일관성을 검증합니다.
3. **파일럿 운영** — 한 팀에서 1개월 병행 운영하며 오류 유형을 수집합니다.
```

### gallery-grid — 이미지 그리드 (2026-06)

이미지 3~6장 + 본문 ≤2행이면 `gallery-grid`. **이미지들을 한 단락에 연속 작성**해야 단일 `p` 안에 grid로 정렬된다 (이미지 사이 빈 줄 금지):

```markdown
<!-- _class: gallery-grid -->

# 화면 구성

![1](assets/a.png) ![2](assets/b.png) ![3](assets/c.png) ![4](assets/d.png)

대시보드 주요 화면 4종
```

### content-sidebar — 본문 + 사이드 박스 (2026-06)

본문 ≥4행 + 보조 블록(`참고`/`Tip`/`주의`/`관련` 헤더가 붙은 짧은 ul·blockquote)이 동반되면 `content-sidebar`. 본문은 `.main`, 보조 블록은 `.side`로 분리:

```markdown
<!-- _class: content-sidebar -->

# 업무 표준화 우선 원칙

<div class="main">

본문 단락들...

</div>
<div class="side">

### 참고 자료

- 절차서 표준 양식
- 보안 검토 체크리스트

</div>
```

### schedule — 날짜 기반 일정 (2026-06)

표 첫 컬럼이 날짜 패턴(`6/15`, `2026-06`, `6월 15일`, `D-7`)이고 행 3+이면 `schedule`. 상태 컬럼이 있으면 `.tag` 주입과 병행. 분기/Phase 그룹은 `roadmap`:

```markdown
<!-- _class: schedule -->

# 추진 일정

| 날짜 | 일정 | 상태 |
|---|---|---|
| 6/15(월) | 킥오프 | <span class="tag green">완료</span> |
| 7/06(월) | 파일럿 시작 | <span class="tag sky">예정</span> |
```

ul 폴백: 각 항목이 `**6/15(월)** — 항목` 형식이어도 매칭.

---

## 톤 프리셋 합성 (2026-06)

`tone=` 인자(tone-exec / tone-lecture / tone-seminar)가 주어지면:

1. front matter에 `class: tone-X` 추가 (디렉티브 없는 평문 슬라이드 커버)
2. **모든** `<!-- _class: ... -->` spot 디렉티브에 톤 클래스를 합성 기입 — Marpit의 `_class`는 front matter `class`를 병합이 아니라 **대체**하므로 합성하지 않으면 톤이 유실된다:

```markdown
<!-- _class: cards tone-exec -->
<!-- _class: schedule tone-exec -->
```

토큰 오버라이드 방식이므로 레이아웃 매칭 결과에는 영향 없음. cover/section/end 셸의 navy + 로고는 톤과 무관하게 불변 (PROCPA 정체성 가드).

---

## 이미지 결정 트리

슬라이드 내 이미지 개수와 본문 길이에 따라 처리:

```
imageCount(slide):
  0                     → no-op (이미지 없는 슬라이드 그대로)
  1 + 본문 ≤3행          → 인라인 ![](url) 유지
  1 + 본문 4~7행         → ![bg right:40%](url) 디렉티브 자동 주입
  1 + 본문 >7행          → 슬라이드 2개로 분할 (이미지 풀블리드 1 + 본문만 1)
  1 + 인접 blockquote   → image-quote (![bg left:60%] + blockquote)
  2                     → two-image (키워드 매치 시 before-after)
  3~6 + 본문 ≤2행        → gallery-grid (가변 그리드 — 이미지들을 한 단락에 연속 작성)
  3~6 + 본문 >2행        → 슬라이드 분할 (이미지 gallery-grid 1 + 본문 1) 또는 슬라이드당 2 이미지씩
  ≥7                    → 슬라이드당 4~6 이미지 gallery-grid로 분할
```

> 참고: 2×2 고정 그리드가 필요하면 `gallery-4`(기존 레이아웃)를 수동 지정할 수 있다. 자동 매칭은 가변 `gallery-grid`를 사용.

`![bg right:40%]`나 `![bg left:60%]` 디렉티브는 Marp의 백그라운드 이미지 문법이며, propca CSS가 그에 맞춰 텍스트 영역을 조정한다 (image-quote의 경우 우측 40% 영역에 blockquote 중앙 정렬).

---

## 장문 본문 자동 분할

한 H2 본문이 다음 임계치 초과 시 분할:
- 본문 라인 수 > 8
- 본문 글자 수 > 600

분할 알고리즘:
1. 본문을 단락 단위로 분할
2. 각 슬라이드에 4~6행/300~400자 채울 만큼 단락 배분
3. 두 번째 슬라이드부터 H2를 `## <원본> (계속 2)`, `## <원본> (계속 3)` 형식으로
4. 분할된 슬라이드 각각에 휴리스틱 재적용 (예: 분할 후 짧아진 슬라이드가 cards 매칭에 들어맞을 수도 있음)

---

## 검증

각 슬라이드의 매칭 결과는 결정성 있어야 함. 동일 input → 동일 output. 다음 항목을 호출 결과 리포트에 기록:

```
✓ md-to-marp-propca — <slug>
  Slides: 18
  Layout breakdown:
    cover         : 1
    toc-split     : 1
    section       : 3
    cards         : 2
    block-features: 1
    image-quote   : 2
    vertical-timeline: 1
    feature-compare: 1
    compare       : 1
    pastel-blocks : 2
    icon-list     : 2
    thanks-contact: 1
  Inline helpers injected:
    .callout: 2
    .tag    : 5
    .kbd    : 3
  Long body splits: 0
```
