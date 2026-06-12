---
name: md-to-marp-propca
description: 옵시디언 또는 표준 마크다운을 propca-notion-style 테마의 Marp 슬라이드 마크다운으로 한 번에 변환. 강의·교육·발표 컨텍스트(한국 회계법인 톤)에 특화. 내부 2단계 — (1) 옵시디언 전처리(wikilinks/embeds/콜아웃/frontmatter/태그 블록 정리 + 이미지 자산 복사), (2) propca-notion-style 전용 레이아웃(43 매칭 규칙) + 8 인라인 헬퍼 자동 매칭 + 톤 프리셋 3종(tone-exec/tone-lecture/tone-seminar) 합성. 변환은 propca-notion-style.md(테마 쇼케이스)의 패턴을 그대로 따른다 — cover의 H1+H2+연월 구조, section의 #=숫자/##=제목 패턴, 본문 슬라이드의 # 헤더 우선, 인용 신중 사용, 여백 최소화. 출력은 output/<slug>/<slug>.marp.md + <slug>.cleaned.md(감사 추적) + assets/(이미지 복사본).
---

# md-to-marp-propca (v2.0)

옵시디언 또는 표준 마크다운 → **propca-notion-style** Marp 슬라이드 마크다운 자동 변환.

회계법인·자문사 강의/교육/발표 컨텍스트에 특화. **옵시디언 전처리 + propca 자동 매칭을 한 스킬에서 일괄 처리**.

> **변환은 항상 [`themes/slide/propca-notion-style/propca-notion-style.md`](../../../themes/slide/propca-notion-style/propca-notion-style.md) (테마 쇼케이스)의 슬라이드 패턴을 그대로 따른다.** 모든 의문은 그 파일을 우선 참조.

---

## 입출력 계약

### 입력

| 필드 | 필수 | 설명 |
|---|---|---|
| `source` | ✅ | 마크다운 파일 경로 (옵시디언 또는 표준 형식 모두 지원) |
| `slug` | ❌ | 출력 파일명. 기본은 source 파일명 기반 kebab-case (한글 보존) |
| `vault_root` | ❌ | 옵시디언 vault 루트. 미지정 시 `.obsidian/` 폴더 자동 탐색 |
| `header` | ❌ | 슬라이드 헤더 텍스트 기본값. 카테고리별 `<!-- header: 'NN. 제목' -->` 디렉티브가 우선 |
| `footer` | ❌ | 슬라이드 푸터 텍스트 |
| `tone` | ❌ | 톤 프리셋: `tone-exec`(임원 보고) / `tone-lecture`(강의·교육) / `tone-seminar`(대외 세미나). 미지정 시 기본 purple 톤. 적용 방식은 §3.F |
| `force` | ❌ | 캐시 무시 강제 재생성 |

### 출력

```
output/<slug>/
  <slug>.cleaned.md    ← 옵시디언 정리본 (감사 추적용)
  <slug>.marp.md       ← Marp 슬라이드 마크다운 (theme: propca-notion-style)
  assets/              ← vault에서 복사된 이미지 자산
```

### 보장 사항

1. 옵시디언 마커(`[[`, `![[`, `> [!`, `#tag` 블록, `^block-id`) 잔재 0
2. front matter는 **고정 스키마** (§3)
3. 첫 슬라이드 = `cover`, 마지막 슬라이드 ∈ `{end, qa, thanks-contact}`
4. propca 어휘(43 매칭 규칙의 출력 클래스 + 톤 프리셋 3종) 외 클래스명 출력 금지 (tech-modern의 `grid-3`/`stats` 등 0회)
5. **쇼케이스 패턴 준수** — 5가지 핵심 규칙 (§2.A)
6. 결과 디렉토리는 자기완결적 — 다른 폴더로 옮겨도 이미지 깨지지 않음
7. 멱등성: source mtime ≤ cleaned.md mtime이면 skip (force=true 제외)

---

## 작업 흐름

```
[1] source 읽기 + slug 결정 + vault_root 탐색
     ↓
[2] 옵시디언 전처리 (15 규칙 — references/obsidian-prep.md)
     - frontmatter 정리, wikilinks/embeds 변환, 콜아웃 매핑
     - 이미지 자산 복사 (vault → output/<slug>/assets/)
     - 결과: output/<slug>/<slug>.cleaned.md
     ↓
[3] 슬라이드 분절 (구분자: `^# `, `^---$`, `^\*\*\*$`)
     ↓
[4] 슬라이드별 레이아웃 휴리스틱 적용 (43 매칭 규칙 — references/layout-heuristics.md)
     ↓
[5] 인라인 헬퍼 자동 주입 (8 헬퍼 — references/inline-helpers.md)
     ↓
[6] 쇼케이스 패턴 적용 (§2.A — 8 핵심 규칙) + 톤 프리셋 합성 (§3.F)
     ↓
[7] front matter + 슬라이드 본문 조합 → output/<slug>/<slug>.marp.md
     ↓
[8] 변환 리포트 반환
```

---

## 1) 슬라이드 분절 + slug

- `slug` 미지정 시: source 파일명에서 `(\d+\.)?\s*(.*)\.md` → kebab-case (한글 그대로 + 공백/특수문자만 `-`)
- 슬라이드 구분자:
  - `^# ` H1 (새 슬라이드 시작)
  - `^---$` 가로선 (Marp 표준)
  - `^\*\*\*$` 가로선 (세션 구분 — `session-break` 슬라이드 자동 삽입)

장문 본문 자동 분할:
- 슬라이드 본문 라인 수 > 8 또는 글자 수 > 600 → 자동 분할
- 분할된 슬라이드의 H1은 `# <원본> (계속 N)`

---

## 2) 레이아웃 휴리스틱 + 쇼케이스 패턴

전체 레이아웃 매핑(43 규칙)은 [references/layout-heuristics.md](references/layout-heuristics.md), 인라인 헬퍼 주입은 [references/inline-helpers.md](references/inline-helpers.md).

### 2.A) 쇼케이스 5 핵심 규칙 (반드시 준수)

> 이 5 규칙은 propca-notion-style.md 쇼케이스의 관습이며, 모든 변환에 적용된다.

#### 규칙 1: Cover 슬라이드 = `# 타이틀 + ## 부제 + 연월`

```markdown
<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 클로드 엑셀 소개
## AI 자동화 가이드 시리즈 #1

2026.05
```

- H1: 메인 타이틀
- H2: 부제 (시리즈명 / 부제목)
- 메타: **연월만** (예: `2026.05`). 발표자명/회사명/날짜 형식 ❌ — 로고는 CSS `::before`가 자동 삽입
- ❌ "2026.05 · ProcPA", ❌ "2026년 5월 25일", ❌ "발표자: 홍길동"

#### 규칙 2: Section 슬라이드 = `# NN + ## 카테고리명`

```markdown
<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '01. 들어가며' -->

# 01
## 들어가며
```

- H1: **챕터 숫자 두 자리**만 (`01`, `02`, …)
- H2: 챕터 제목
- ❌ `# 1. 들어가며` 같은 일반 텍스트 ❌
- 그 다음 본문 슬라이드들에는 `<!-- header: '01. 들어가며' -->` 디렉티브 상속 (Marp `header:` 디렉티브는 다음 section까지 유지)

#### 규칙 3: 본문 슬라이드의 제목은 **H1(`#`) 우선**

```markdown
<!-- header: '01. 들어가며' -->

# 엑셀과 AI, 어디까지 왔나
본문 텍스트...
```

- 본문 슬라이드 제목은 기본적으로 `#` (H1)
- `##` (H2)로 시작하는 슬라이드는 cover/section의 부제 외에는 사용 자제
- 예외: `block-features` 같이 의도적으로 H1+H3 카드 구조를 쓰는 경우만 H2/H3 사용

#### 규칙 4: 인용 레이아웃(`hero-quote`/`image-quote`)은 **명확한 인용문구**일 때만

- `> "출처가 분명한 인용구"` 또는 `> 권위자 발언` 같은 **별도 인용문구**가 있을 때만 사용
- 본문에서 가져온 강조 문장은 인용 레이아웃 ❌ — 본문 일부로 유지
- 이미지가 슬라이드 핵심이면 `image-quote` 대신 본문 슬라이드에 **인라인 이미지** (`![w:720](url)` 또는 `![bg right:40%]`) 로 처리

#### 규칙 5: 한 슬라이드 여백 최소화

- 본문이 너무 짧으면(2~3줄) 인접 슬라이드와 **합치거나** ul/ol/콜아웃으로 보강
- 매우 긴 슬라이드는 분할하되, 각 분할이 4~7줄 본문을 갖도록 균형
- 짧은 슬라이드 후보를 발견하면 다음 중 하나 적용:
  - 직전·직후 슬라이드와 합치기
  - 본문에 bullet 3~5개 추가해 시각 밀도 확보
  - block-features / cards / pastel-blocks 레이아웃으로 시각 카드화

#### 규칙 6: 항목 나열은 단순 H3 반복 ❌ → 레이아웃 활용

**❌ 나쁜 예** — H1 아래 `### 항목1` / `### 항목2` / `### 항목3` 단순 반복 (여백 많고 단조)
**✅ 좋은 예** — 다음 6 레이아웃 중 적절한 것 선택:

| 레이아웃 | 사용 케이스 |
|---|---|
| `cards` | 3~4개의 짧은 카드 (제목 + 1~2행 본문) |
| `block-features` | 3~6개의 기능 소개형 (아이콘/번호 + 제목 + 설명) |
| `pastel-blocks` | 2~6개 개념 hero (단락형 / 강조 톤) |
| `feature-compare` (신규) | 2~3 항목 다중 특성 비교 카드 그리드 (상태 컬럼 없음) |
| `step-image-guide` (신규) | 좌 단계 ol + 우 스크린샷 (튜토리얼·설치 가이드) |
| `definition-cards` (신규) | 도구·개념을 카드형으로 정의 (H3 2~6 + 본문 2~3행) |
| `toggle-list` | 2단계 들여쓰기형 (펼침) |
| `icon-list` | 이모지/아이콘 + 콜론 시작 항목 ≥3 |

**판단 가이드**:
- 카드성 짧은 항목 3~4 → **cards**
- 기능 소개·번호 매김 3~6 → **block-features**
- 카테고리 + 상태 표시 → **일반 table + 인라인 .tag**
- 상태 컬럼 없는 특성 비교(✓/✗, "협업"/"무료"/"한국어" 등) → **feature-compare**
- 도구·개념 정의 (도구명 + 2~3행 설명) → **definition-cards**
- 단계 + 스크린샷 튜토리얼 → **step-image-guide**
- 그 외 단순 ul 나열이 길어지면 → **icon-list** 또는 분할

#### 규칙 7: 태그 색상은 정말 필요할 때만

- `.tag green/yellow/rose/sky/peach/purple/navy`는 **상태 표시·카테고리 구분**처럼 의미가 명확할 때만 사용
- 슬라이드당 **태그 최대 2~3종 색상**까지. 그 이상은 일반 표 셀 안으로 한정
- 단순 강조 목적은 **굵은 글씨** 또는 인라인 `` `code` ``로 충분 — 색상 태그 ❌
- 본문 평문 단어의 우발적 매치(`완료`/`진행중` 등)도 슬라이드 의미상 상태가 아니면 wrapping 금지
- 자동 주입은 표 셀 / 괄호 안 / ul·ol 항목 끝 컨텍스트에서만 적용 (§2.D 참고)

#### 규칙 8: 색상 조화·밸런스 — 한 슬라이드 강조색 ≤2종

**propca 시그니처**: navy(#0a1530) + purple(#5645d4) + 무채(canvas/hairline). 이 톤이 **주역**.

한 슬라이드에서 동시 등장하는 강조 색상은 **최대 2종**(시그니처 외 보조 강조 1종만):
- ✅ navy + purple + 옅은 회색만 사용
- ✅ navy + purple + 1개 pastel 태그 색상
- ❌ pastel mint + pastel rose + pastel yellow 동시 등장 (3종 이상 발산 색)
- ❌ 콜아웃 5종 색상별로 분산 사용 (CSS는 이미 단일 톤이지만 마크업 자체에서도 변형 남발 ❌)

**알록달록한 페이지는 propca 톤과 어울리지 않음.** 의심스러우면 강조색 1개 제거하는 쪽으로 보수적 결정.

### 2.B) 레이아웃 매핑 우선순위

1. **셸 강제 매칭** — 첫/마지막 슬라이드, `***` 가로선
2. **네비게이션** — toc-split / section
3. **시각 강조·인용** — hero-quote / image-quote / **pull-quote** (규칙 4 준수) / **gallery-grid** (이미지 3~6)
4. **코드 중심** — **code-focus** (fenced code ≥6행 + 기타 본문 ≤3행)
5. **2개 비교** — compare / two-image / before-after / **compare-cards** / **compare-table**
6. **3+ 비교** — feature-compare / **comparison-3up**
7. **개념 정의 / Q&A** — definition-cards / **concept-list** / **concept-table** / **faq** (의문문 H3 쌍)
8. **일화·사례·예시** — **story-arc** / **example-case**
9. **카드 / 블록** — cards / pastel-blocks / block-features
10. **데이터** — 일반 `<table>` (상태 셀에 .tag 자동 주입) / **schedule** (첫 컬럼 날짜 패턴)
11. **튜토리얼** — step-image-guide (이미지) / **step-text** (텍스트만)
12. **순서 / 흐름** — timeline / vertical-timeline / roadmap
13. **리스트 변형** — toggle-list / icon-list / **checklist** / **pros-cons**
14. **사이드바** — **content-sidebar** (본문 ≥4행 + 보조 블록)
15. **폴백** — 평범 content (no `_class`)

세부 표는 [references/layout-heuristics.md](references/layout-heuristics.md) §매핑 표 (현재 43행, 경합 정리 절 포함).

### 2.D) 용도별 결정 트리 ★ AI가 가장 먼저 참고

> 입력 슬라이드를 받았을 때 다음 3 질문을 순차로 던져 최적 레이아웃을 결정한다.

#### 질문 1 — 슬라이드 핵심 의도?

```
A. 2개 항목 비교         → compare / two-image / compare-cards / compare-table
B. 3개 이상 항목 비교    → comparison-3up / feature-compare
C. 개념 정의·설명        → definition-cards / concept-list / concept-table
D. 단계·절차·튜토리얼    → timeline / vertical-timeline / step-image-guide / step-text / roadmap
E. 시각 강조·인용        → hero-quote / image-quote / pull-quote / pastel-blocks / gallery-grid
F. 일화·사례·예시        → story-arc / example-case
G. 리스트 변형          → icon-list / toggle-list / checklist / block-features / cards / pros-cons
H. 셸 (입출구)           → cover / section / session-break / qa / thanks-contact / end
I. 코드 중심            → code-focus
J. 질문-답변 나열        → faq (본문 Q&A 쌍 — 마감 Q&A는 셸 qa)
K. 일정·날짜 행          → schedule
L. 본문 + 보조 박스      → content-sidebar
```

#### 질문 2 — 항목 수?

```
1개  → hero-quote / pull-quote / story-arc (단일 키 메시지)
2개  → compare / two-image / compare-cards / compare-table / pros-cons
2-5개 → faq (의문문 H3 쌍)
3-4개 → cards / block-features / comparison-3up / definition-cards
3-5개 → step-text (절차 카드 스택) / gallery-grid (이미지 3~6)
5-7개 → vertical-timeline / concept-list / icon-list / checklist
8+   → 분할 검토 또는 concept-table
```

#### 질문 3 — 형식?

```
카드 그리드   → cards / block-features / definition-cards / compare-cards / comparison-3up
카드 스택    → step-text / faq
표 형태      → compare-table / concept-table / feature-compare / schedule (첫 컬럼 날짜)
ol/ul 리스트  → concept-list / icon-list / checklist / timeline / vertical-timeline
단락형       → pastel-blocks / story-arc / example-case / content-sidebar (보조 블록 동반)
좌-우 분할   → compare / two-image / cover-split / content-sidebar
인용형       → hero-quote / image-quote / pull-quote
코드 블록    → code-focus
이미지 그리드 → gallery-grid (가변 3~6) / gallery-4 (2x2 고정, 수동)
```

#### 각 레이아웃 "언제 사용 / 피해야 할 경우" 가이드

| 레이아웃 | 언제 사용 | 피해야 할 경우 |
|---|---|---|
| `compare` | 2 그룹의 ul/ol 본문이 길고 텍스트 위주 비교 | 항목별 속성이 다양하고 표가 더 자연스러울 때 (→ compare-table) |
| `two-image` | 시각 1:1 비교 (사진·차트 2장) | 본문 길이가 4행+ (→ before-after 또는 일반 image-quote) |
| `compare-cards` | 2 카드형 비교에 VS 강조가 필요할 때 | 속성 행이 5+개 (→ compare-table) |
| `compare-table` | 다양한 속성을 행별로 두 항목 비교 | 본문이 단락형 텍스트 위주 (→ compare-cards) |
| `comparison-3up` | 3~4개 항목 매트릭스 카드 비교 | 5+ 항목 (→ feature-compare 또는 분할) |
| `feature-compare` | 3+ 항목 + ✓/✗ 키워드 비교 | 자유 텍스트 비교 (→ comparison-3up) |
| `definition-cards` | 도구·개념 카드형 정의 (2~6개) | 사전식 용어집 (→ concept-table) |
| `concept-list` | 5~10개 개념 큰 번호 나열 | 정의가 길어 표가 더 적합 (→ concept-table) |
| `concept-table` | 행별 용어 + 정의 표 (사전식) | 시각 임팩트 필요 (→ definition-cards) |
| `story-arc` | 개인 경험·일화·회상 톤 | 객관적 사실 전달 (→ 일반 content) |
| `example-case` | "예를 들어 ~" 구체적 사례 1건 | 사례 3+개 (→ cards / comparison-3up) |
| `pull-quote` | 외부 출처 인용 강조 (저자·출처 명시) | 본문 일부 강조 (→ 굵게 또는 hero-quote) |
| `pros-cons` | 장단점 명시 비교 (✓/✗) | 3개 이상 옵션 (→ feature-compare) |
| `checklist` | 할 일·확인 항목 (GFM `- [ ]`/`- [x]`) | 단순 ul 나열 (→ icon-list) |
| `hero-quote` | 한 줄 강조 인용 (저자 표기 옵션) | 외부 출처 있음 (→ pull-quote) |
| `image-quote` | 이미지 + 인용 결합 (좌 이미지 / 우 텍스트) | 이미지·인용 둘 다 강할 때 (→ 별도 슬라이드 분할) |
| `pastel-blocks` | 2~6 개념 hero 블록 단락형 | 표 비교 (→ concept-table) |
| `step-image-guide` | 단계 + 이미지 튜토리얼 | 이미지 없는 절차 (→ vertical-timeline) |
| `cards` | 3~4 짧은 카드 (1~2행) | 본문 2~3행+ (→ definition-cards 또는 block-features) |
| `block-features` | 3~6 기능 소개 (아이콘 + 제목 + 본문) | 정의 사전 (→ definition-cards) |
| `timeline` | 3~5 단계 수평 흐름 | 단계 5+ (→ vertical-timeline) |
| `vertical-timeline` | 5+ 단계 수직 흐름 + 부가 설명 | 짧은 단계 (→ timeline) |
| `roadmap` | 분기/Phase 기반 일정 | 구체 날짜 행 단위 (→ schedule) |
| `toggle-list` | 2단계 들여쓰기 펼침형 | 평탄 ul (→ icon-list) |
| `icon-list` | 이모지·아이콘 + 콜론 형식 | GFM 체크박스 (→ checklist) |
| `faq` | 본문 Q&A 쌍 2~5개 (의문문 H3) | 마감 Q&A 슬라이드 (→ 셸 qa) / 명사형 개념 (→ definition-cards) |
| `code-focus` | 코드가 주역 (fenced code ≥6행) | 코드가 보조 자료 (→ 일반 content의 pre) |
| `step-text` | 텍스트 절차 3~5단계 + 설명 ≥2행 | 이미지 동반 (→ step-image-guide) / 한 줄 요약 (→ timeline) |
| `gallery-grid` | 이미지 3~6장 + 본문 ≤2행 | 정확히 2장 (→ two-image) / 본문 길 때 (→ 분할) |
| `content-sidebar` | 본문 + 참고·팁 보조 블록 | 보조 블록 없는 평문 (→ content) / 짧은 메모 (→ .note) |
| `schedule` | 구체 날짜 행 단위 일정 | 분기/Phase 그룹 (→ roadmap) |

### 2.C) 인라인 헬퍼 자동 주입

| 트리거 | 주입 |
|---|---|
| `> [!NOTE]` 계열 | `<div class="callout {info\|success\|example\|warn\|danger}">` |
| 본문 `(완료\|진행중\|예정\|대기\|중단)` 상태어 (의미상 상태일 때만) | `<span class="tag {green\|yellow\|sky\|peach\|rose}">` |
| `⌘+K`, `Ctrl+C` 등 단축키 | `<span class="kbd">` |
| `참고:`/`Note:`/`cf.` 짧은 blockquote | `<div class="note">` |
| `[NEW]`/`[BETA]` 헤더 라벨 | `<span class="chip">` |

세부 규칙은 [references/inline-helpers.md](references/inline-helpers.md).

#### 콜아웃 사용 정책 (단일 톤 + 빈도 절제)

CSS 측: 콜아웃 5종(info/success/example/warn/danger)이 모두 **시그니처 보라(`--purple`) 단일 톤**으로 통일됨. 종류 구분은 좌측 컬러바가 아닌 **아이콘 + 굵은 라벨**(`**참고**`/`**예시**`/`**중요**`/`**경고**`)로 표현. `.danger`만 예외적으로 `--danger` 좌측바 유지.

마크업 측 (md-to-marp-propca가 준수):
- **콜아웃 사용 빈도 절제** — 슬라이드당 **최대 1개** 권장 (꼭 필요할 때만)
- 일반 보조 메모는 `<div class="note">` 또는 본문 단락으로 처리
- 콜아웃 종류는 의미가 정말 명확할 때만 — `> [!NOTE]` 옵시디언 마커 출처 외에 평문 본문을 추측해서 콜아웃으로 감싸지 말 것
- 단일 톤이라도 페이지에 콜아웃이 2개 이상이면 시각 무게가 무거워짐 → 둘 이상이면 그중 하나를 `.note` 또는 본문 단락으로 강등 검토

---

## 3) Marp 마크다운 생성

### 3.A) front matter (고정 스키마)

```yaml
---
marp: true
theme: propca-notion-style
paginate: true
size: 16:9
header: ''
footer: '<인자 또는 series 또는 "">'
---
```

`header`는 빈 문자열로 두고, 카테고리별로 `<!-- header: 'NN. 제목' -->` 디렉티브가 슬라이드 단위로 헤더를 갱신.

### 3.B) 셸 슬라이드 — `_class` + 헤더/푸터/페이지번호 끄기

`cover`, `end`, `qa`, `thanks-contact`, `session-break`, `image-quote`, `hero-quote` 슬라이드는:
```markdown
<!-- _class: <레이아웃> -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->
```

### 3.C) div 블록 작성

`<div class="...">` 위·아래 반드시 빈 줄:
```markdown
적당한 본문.

<div class="callout info">

**참고**

본문.

</div>

다음 본문.
```

### 3.D) 이미지 결정 트리

```
imageCount(slide):
  0                     → no-op
  1 + 본문 ≤3행          → 인라인 ![](url)
  1 + 본문 4~7행         → ![bg right:40%](url)
  1 + 본문 >7행          → 슬라이드 2개로 분할
  1 + 명확한 인용문구    → image-quote (![bg left:60%] + blockquote)
  2                     → two-image (키워드 매치 → before-after)
  3~6 + 본문 ≤2행        → gallery-grid (이미지들을 한 단락에 연속 작성 — 빈 줄 금지)
  3~6 + 본문 >2행        → 슬라이드 분할 (gallery-grid + 본문) 또는 슬라이드당 2 이미지씩
  ≥7                    → 슬라이드당 4~6 이미지 gallery-grid로 분할
```

**중요**: 인용 레이아웃 사용 조건은 §2.A 규칙 4를 따른다. 본문 강조 문장만 있는 슬라이드의 이미지는 **인라인** (`![w:720](url)`) 로 처리.

### 3.E) 옵시디언 전처리 산출물 보존

`output/<slug>/<slug>.cleaned.md`는 디스크에 보존해 감사 추적·재실행에 활용. 변환 리포트에서 cross-check 가능.

### 3.F) 톤 프리셋 합성 (`tone=` 인자)

`tone` 인자가 주어지면 **이중 방식**으로 적용한다 (Marpit의 `_class` spot 디렉티브는 front matter `class`를 병합이 아니라 **대체**하므로 둘 다 필요):

1. front matter에 `class: <tone>` 추가:

```yaml
---
marp: true
theme: propca-notion-style
class: tone-exec
...
---
```

2. 모든 `<!-- _class: ... -->` 디렉티브에 톤 클래스를 **합성 기입**:

```markdown
<!-- _class: cover tone-exec -->
<!-- _class: schedule tone-exec -->
<!-- _class: cards tone-exec -->
```

| 프리셋 | 용도 | 효과 |
|---|---|---|
| `tone-exec` | 임원·이사회 보고 | 강조색 navy 계열(#22307a) 절제 + 파스텔 저채도화 |
| `tone-lecture` | 강의·교육 | orange(#dd5b00) accent 전덱 확장 (lecture-* 톤 계승) |
| `tone-seminar` | 대외 세미나·컨퍼런스 | purple 유지 + 파스텔 활성 (카드 lavender 틴트) |

토큰 오버라이드 방식이므로 레이아웃 매칭에 영향 없음. cover/section/end 셸의 navy + procpa 로고는 톤과 무관하게 불변 (PROCPA 정체성 가드). 시각 카탈로그: [`tone-variants.md`](../../../themes/slide/propca-notion-style/tone-variants.md).

---

## 4) 산출 + 빌드 안내

`output/<slug>/<slug>.marp.md` 생성 후 빌드는 `md-to-marp` 오케스트레이터(상위 스킬)가 담당:

```cmd
cd build
npx --yes @marp-team/marp-cli ^
    ../output/<slug>/<slug>.marp.md ^
    --html --allow-local-files ^
    -o ../output/<slug>/<slug>.html ^
    --theme-set ../themes/slide
```

---

## 변환 리포트

```
✓ md-to-marp-propca — <slug>
  Source: <source>
  Vault root: <vault_root>
  
  Obsidian prep:
    Wikilinks stripped:   12
    Image embeds resolved: 4 / 4
    Callouts converted:    3 (info: 1, warn: 1, example: 1)
    Hashtag blocks: 1
    Footnotes preserved: 2
    Warnings: 0
  
  Slides: 18
  Layout breakdown:
    cover         : 1
    section       : 3
    toc-split     : 1
    block-features: 1
    cards         : 2
    image-quote   : 0   ← 인용문구 없으므로 사용 안 함 (규칙 4)
    vertical-timeline: 1
    feature-compare: 1
    definition-cards: 1
    step-image-guide: 1
    pastel-blocks : 2
    icon-list     : 2
    end           : 1
  
  Inline helpers injected:
    .callout: 2 (info: 1, warn: 1)
    .tag    : 5
    .kbd    : 3
    .note   : 1
  
  쇼케이스 규칙 준수:
    Cover format (H1+H2+연월): ✓
    Section format (#NN+##제목): ✓ (3 sections)
    H1 prefix on content slides: ✓ (12 slides)
    Quote layout 신중 사용: ✓
    Empty space minimized: ✓
```

---

## 참고 자료

- **쇼케이스 (최우선 참조)**: [`../../../themes/slide/propca-notion-style/propca-notion-style.md`](../../../themes/slide/propca-notion-style/propca-notion-style.md)
- propca 디자인 시스템: [`../../../themes/slide/propca-notion-style/design.md`](../../../themes/slide/propca-notion-style/design.md)
- propca CSS: [`../../../themes/slide/propca-notion-style/propca-notion-style.css`](../../../themes/slide/propca-notion-style/propca-notion-style.css)
- 옵시디언 전처리 규칙: [references/obsidian-prep.md](references/obsidian-prep.md)
- 이미지 vault 경로 해석: [references/vault-resolution.md](references/vault-resolution.md)
- 레이아웃 매핑 표 (43 규칙) + 이미지 결정 트리: [references/layout-heuristics.md](references/layout-heuristics.md)
- 톤 프리셋 카탈로그: [`../../../themes/slide/propca-notion-style/tone-variants.md`](../../../themes/slide/propca-notion-style/tone-variants.md)
- 8 인라인 헬퍼 자동 주입 규칙: [references/inline-helpers.md](references/inline-helpers.md)
- 오케스트레이터: [`../md-to-marp/SKILL.md`](../md-to-marp/SKILL.md)
