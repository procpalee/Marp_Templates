# propca-notion-style — 21 레이아웃 매핑 휴리스틱

표준 마크다운의 슬라이드 단위 콘텐츠를 분석해 21 propca-notion-style 레이아웃 중 하나로 매칭한다. 우선순위는 셸(cover/end/qa/section/session-break) → 네비게이션(toc-split) → 콘텐츠.

---

## 매칭 우선순위

1. **셸 강제 매칭** — 첫 슬라이드 / 마지막 H1 / `***` 가로선
2. **네비게이션** — toc-split / section
3. **시각 강조** — hero-quote / image-quote
4. **2 컬럼 비교** — compare / two-image / before-after
5. **카드 / 그리드** — cards / pastel-blocks / definition-cards
6. **비교 / 정의** — feature-compare (특성 비교표) / definition-cards (개념 정의 카드)
7. **튜토리얼** — step-image-guide (단계 + 이미지)
8. **데이터 표시** — 일반 `<table>` + 인라인 `.tag` (database-rows 제거됨)
9. **순서 / 흐름** — timeline / vertical-timeline / roadmap
10. **리스트 변형** — toggle-list / icon-list / block-features
11. **폴백** — 평범 content (no `_class`)

각 슬라이드는 위 순서대로 매칭 시도. 첫 매치에서 확정.

---

## 매핑 표 (전체 37행)

| # | 입력 패턴 | 출력 클래스 | 신뢰도 | 폴백 |
|---|---|---|---|---|
| 1 | 첫 슬라이드 (H1 + 부제 + 발표자) | `cover` | 高 | — |
| 2 | 첫 3 슬라이드 내 H2 `목차`/`Agenda`/`Outline` + ol/ul 3~6 | `toc-split` | 高 | content |
| 3 | H2 `\d+\. <title>` 솔로 (≤1 본문 행), 형제 3+ | `section` | 高 | content |
| 4 | H1 + blockquote 솔로 (≥2행, 마커 없음) | `hero-quote` | 高 | content |
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
| **32 (신규)** | 본문 시작이 `최근`/`예전에`/`한 번은`/`경험` 같은 회상 톤 + 단락형 3개 (배경→사건→결과) | `story-arc` | 中 | content |
| **33 (신규)** | 본문 시작이 `예를 들어`/`사례`/`Case` + 단일 시나리오 본문 + 보조 인용/설명 | `example-case` | 中 | content |
| **34 (신규)** | blockquote 솔로 (≥2행) + 외부 출처 명시 (이메일·URL·`— 출처` 패턴) | `pull-quote` | 高 | hero-quote |
| **35 (신규)** | H1 `장단점`/`Pros & Cons` + 2 ul 그룹 (좌측 ✓ 항목 / 우측 ✗ 항목) | `pros-cons` | 高 | compare |
| **36 (신규)** | GFM 태스크 리스트 (`- [ ]` / `- [x]`) ≥3 항목 | `checklist` | 高 | icon-list |
| 37 | (기본) 인식 못한 H2 + 본문 | 평범 content (no `_class`) | — | — |

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
  3                     → 본문을 2 슬라이드로 분할
  4 + 본문 ≤2행          → 경고 리포트 (propca에 gallery-4 없음 — 슬라이드 분할 권장)
  ≥4 + 본문 >2행         → 슬라이드당 2 이미지씩 분할
```

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
