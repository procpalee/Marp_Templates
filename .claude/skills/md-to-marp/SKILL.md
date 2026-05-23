---
name: md-to-marp
description: 임의의 마크다운 원본을 Tech Modern 테마(v2.1, 25 레이아웃)의 Marp 슬라이드 마크다운으로 변환. H1/H2/H3 계층, 코드, 표, 인용, GitHub 콜아웃, YAML frontmatter, 이미지 다중 배치를 슬라이드로 분절하고 25종 레이아웃 클래스(cover/section/agenda/split/grid-3/stats/timeline/icon-list/compare/bg-full/hero-quote/cards/callout/terminal/end + big-number/pricing-card/chart-caption/kpi-row/two-image/image-quote/gallery-4/before-after/qa/thanks-contact/session-break/vertical-timeline/pyramid)를 자동 매칭. 입력은 원본 .md 경로, 출력은 test_markdown_output/slides-<slug>.md.
---

# md-to-marp (v2.1)

원본 마크다운을 **Tech Modern Marp 슬라이드 덱**(25 레이아웃)으로 변환한다.
디자인 시스템 단일 출처는 프로젝트 루트 [`design.md`](../../design.md), CSS는 [`samples/themes/tech-modern.css`](../../samples/themes/tech-modern.css) 와 8 파생 테마(`tm-{blue|green|orange|mono|keynote|business|lecture|demo}.css`).

---

## 입출력 계약

### 입력
- **필수:** 원본 마크다운 파일 경로(절대/상대) 또는 본문 텍스트
- **선택:**
  - `slug` — 출력 파일명. 기본은 입력 파일명에서 추출
  - `header` — front matter `header:` 값. 기본 frontmatter `series`/`book_id`에서 추출, 없으면 `''`
  - `footer` — front matter `footer:` 값. 기본 `''`
  - `presenter` — 표지 발표자 라인. 기본 frontmatter `author`에서 추출
  - `theme` — `tech-modern`(기본) / `tm-blue` / `tm-green` / `tm-orange` / `tm-mono` / `tm-keynote` / `tm-business` / `tm-lecture` / `tm-demo`

### 출력
- **파일 1개:** `test_markdown_output/slides-<slug>.md`
- **빌드 안내:**
  ```cmd
  cd test_markdown_output
  npx --yes @marp-team/marp-cli slides-<slug>.md --html --allow-local-files -o output/<slug>.html --theme-set ../samples/themes
  ```

### 보장 사항
1. front matter는 항상 `theme:` 지정 (인자 또는 `tech-modern`)
2. 첫 슬라이드는 무조건 `<!-- _class: cover -->`
3. 한 슬라이드 본문 8줄(~600자) 이하로 자동 분할
4. 원본의 모든 H2 텍스트가 결과 덱 어딘가에 살아남음
5. fenced code의 언어 태그 보존, 표 셀 내용 변경 금지
6. cover/section/end/qa/thanks-contact는 `_paginate: false`, `_header: ''`, `_footer: ''`
7. GitHub 콜아웃(`> [!INFO]` 등)은 무조건 `<div class="callout xxx">` 로 변환
8. YAML frontmatter는 추출 후 본문에서 제거하고 cover/header에 재배치

### 비보장 (보수적 결정)
- 본문 강조어 자동 추출은 패스 (의도 왜곡 방지)
- 이미지 URL 유효성 검사 안 함
- 사용자 문체/어휘 변경 금지
- 이미지 경로 수정 안 함 (로컬 경로면 빌드 안내 메시지만 출력)

---

## 작업 흐름

### 1) 원본 분석

순서대로 처리:

**1-1) YAML frontmatter 추출**
- 선두 `^---\n` ~ `---\n` 블록 감지
- 키 추출 및 본문에서 제거. 사용 키:
  - `subject` / `title` → 원본에 H1 없을 때 cover H1 으로 사용
  - `author` / `presenter` → cover 발표자 라인
  - `date` / `last_synced` → cover 날짜
  - `book_id` / `series` → front matter `header:` 값

**1-2) 구조 추출**
- 헤딩 트리(H1/H2/H3 위치·텍스트·번호 패턴)
- fenced code 블록(언어, 시작/끝 라인)
- blockquote 블록 (첫 줄 `[!TOKEN]` 검사)
- table 블록 (열·행 수, 셀 길이)
- image 라인 (URL, 인라인 vs 단독)
- ol / ul 리스트 (개수, 항목 길이, `**bold** —` 리드인 여부)
- `→` / `->` 분리자가 있는 인라인 텍스트

### 2) 슬라이드 분절

**분절 우선순위:**
1. **첫 H1** → cover (없으면 frontmatter `title`/`subject` 사용. 둘 다 없으면 파일명 사용)
2. **한국어 `## N.` 패턴 검사**: 형제 H2 중 3개 이상이 `^\d+\.\s+(.+)$` 매칭이면 → 각각 `<!-- _class: section -->` 챕터 divider로 (제목 = `# 0N` + `## {나머지}`). 짝수 번째는 `section dark` 교차
3. **나머지 H2** → 새 슬라이드 시작
4. **H3 다층 번호 `### N.N.N`**: depth ≥3이면 새 슬라이드 시작 안 함. 부모 슬라이드 본문에 `<strong>` 리드인으로 합침
5. **본문 8줄 또는 ~600자 초과** → 다음 슬라이드로 분할. 헤딩 없으면 `H2 (계속)` 형태로
6. **마지막 H1이 `Q&A`/`질문`** → qa 슬라이드
7. **마지막 H1이 `감사합니다`/`Thanks`** + 연락처(email/`@`) → thanks-contact
8. **마지막 H1이 `감사합니다`/`Thanks` 단독** → end
9. **부재** → end 슬라이드 자동 추가

### 3) 레이아웃 자동 매칭 (휴리스틱 26종)

#### 기존 14종

| # | 입력 패턴 | 출력 | 신뢰도 | 폴백 |
|---|---|---|---|---|
| 1 | 첫 H1 + 부제 + 발표자 라인 | `cover` | 高 | — |
| 2 | H2 단독 슬라이드 (본문 ≤ 1줄) | `section` (or `section dark` 짝수번째) | 高 | content |
| 3 | blockquote 첫 줄 `[!TOKEN]` | callout (§2.2 표 참조) | 高 | content |
| 4 | blockquote만 단독 (≥ 2줄, 마커 없음) | `hero-quote` | 高 | content |
| 5 | 첫 슬라이드 직후 ol (3~5항목, 각 ≤ 1줄) | `agenda` | 高 | content |
| 6 | 본문 중간 ol (3~5항목, `**bold** —` 리드인 없음) | `timeline` | 中 | content |
| 7 | H3 카드 3개 연속 (각 H3 + 짧은 본문) | `grid-3` | 高 | cards |
| 8 | H3(숫자 1~4글자, "%", "×" 포함) + 짧은 본문 4쌍 | `stats` | 高 | grid-3 |
| 9 | h2 + ul 두 묶음 대등 + "vs/대비/비교" 키워드 | `compare` | 高 | split |
| 10 | h2 + ul 두 묶음 대등 (양쪽 각 ≥3 항목, 이미지 없음) | `split` | **中** ↓ | grid-3 / cards / icon-list 우선 |
| 11 | ul 모든 항목 첫 단어가 `*tag*` 또는 콜론 종료 카테고리 | `icon-list` | 高 | content |
| 12 | 본문 + 단일 이미지 (본문 4~7줄) | `![bg right:40%]` 일반 | 中 | content |
| 13 | 이미지 단독 + 한두 줄 텍스트 | `bg-full` | 高 | content |
| 14 | 마지막 H1 `감사합니다`/`Thanks`/`Q&A`/없을 시 추가 | `end` / `qa` / `thanks-contact` | 高 | — |

#### v2 신규 11종

| # | 입력 패턴 | 출력 | 신뢰도 | 폴백 |
|---|---|---|---|---|
| 15 | H2 + 단일 숫자/% 라인 + 캡션 ≤1 | `big-number` | 高 | content |
| 16 | 인라인 이미지 정확히 2장 + 본문 ≤3줄 | `two-image` | 高 | content |
| 17 | 인라인 이미지 정확히 4장 + 본문 ≤2줄 | `gallery-4` | 高 | 슬라이드 분할 |
| 18 | 이미지 1 + blockquote (마커 없음) | `image-quote` | 中 | `bg right:40%` |
| 19 | 이미지 2 + `이전`/`이후`/`before`/`after` 키워드 | `before-after` | 高 | `two-image` |
| 20 | 이미지 + "Key Takeaways"/"포인트"/"시사점" 2~3줄 | `chart-caption` | 中 | content |
| 21 | ol ≥5, 각 항목 `**bold** —` 리드인 | `vertical-timeline` | 高 | timeline |
| 22 | grid-3/cards 후보 + 하나에 `(추천)`/`Recommended` 마커 | `cards` + `card featured` | 中 | grid-3 |
| 23 | 마지막 H1 = `Q&A`/`질문` 단독 | `qa` | 高 | end |
| 24 | 마지막 H1 + 연락처 패턴(email/`@handle`) | `thanks-contact` | 高 | end |
| 25 | H2 키워드 `우선순위`/`pyramid` + ol ≤5 | `pyramid` | 低 | timeline |

**v2.1 변경**: `flow-arrow` 레이아웃 deprecated → `timeline` 또는 `vertical-timeline`으로 폴백. timeline은 4단계 초과 시 auto-wrap (220px minmax).

**매칭 신뢰도 낮으면 항상 기본 content 폴백.**

#### split 신뢰도 강등 (v2 핵심 변경)

기존 룰 #10 (split) 발화 조건 강화:
- 좌·우 컬럼 각 ≥3 항목 AND 이미지 없음 일 때만 split
- 그 외엔 우선순위 `grid-3 → cards → icon-list → split` 순서로 폴백

직전 옵시디언 변환에서 split×4 편중 문제 해결.

### 3.1) GitHub 콜아웃 매핑 (신규)

Blockquote 첫 비어있지 않은 줄에 정규식 매칭:
```regex
/^>\s*\[!([a-z]+)\]\s*(.*)$/i
```

| 원본 토큰 (소문자) | 출력 클래스 | 기본 헤딩 |
|---|---|---|
| `info`, `note` | `callout info` | INFO / NOTE |
| `example` | `callout info` | EXAMPLE |
| `tip`, `success`, `check`, `done` | `callout success` | TIP |
| `warning`, `warn`, `caution`, `attention` | `callout warn` | WARNING |
| `danger`, `error`, `fail`, `bug` | `callout danger` | DANGER |
| `quote`, `cite` | 단독이면 `hero-quote`, 아니면 평문 인용 | — |
| `abstract`, `summary`, `tldr` | `callout info` | TL;DR |

마커 라인은 제거. 마커 뒤 텍스트(`> [!info] 알파라이저 매뉴얼`)가 있으면 그 텍스트가 콜아웃 헤딩. 나머지 라인은 콜아웃 본문.

### 3.2) 이미지 결정 트리

```
imageCount(slide):
  0       → no-op
  1 + body ≤3줄    → 인라인 ![](url) 유지
  1 + body 4~7줄   → ![bg right:40%](url)
  1 + body >7줄    → 슬라이드 분할 (이미지는 첫 슬라이드)
  1 + blockquote   → image-quote (![bg left:50%] + 인용)
  2                → two-image (키워드 매치면 before-after)
  3                → split 좌측 본문 + 우측 이미지 스택
  4 + body ≤2줄    → gallery-4
  4 + body >2줄    → 슬라이드 2개로 분할
  ≥5               → 4장씩 분할
```

### 3.3) 표 처리

- 열 ≤5 AND 행 ≤6 → 인라인
- 열 ≤5 AND 행 7~12 → 2슬라이드 분할, 헤더 반복, 제목에 `(1/2)` / `(2/2)`
- 열 ≤5 AND 행 >12 → 경고 + 첫 12행만 + `...외 N행` 푸터
- 열 ≥6 → 경고만 출력, 자동 변환 안 함 (원본 유지)
- 셀 >60자 → 한국어면 절 경계에서 `<br>` 삽입

### 4) Marp 마크다운 생성

#### front matter
```yaml
---
marp: true
theme: <인자 또는 tech-modern>
paginate: true
size: 16:9
header: '<frontmatter series/book_id 또는 인자 또는 "">'
footer: '<인자 또는 "">'
---
```

#### 슬라이드 사이 구분자
```
\n\n---\n\n
```

#### 슬라이드 첫 디렉티브
- cover / qa / thanks-contact / end / session-break: `<!-- _class: <name> -->` + `<!-- _paginate: false -->` + `<!-- _header: '' -->` + `<!-- _footer: '' -->`
- section / section dark: `<!-- _class: section -->` (or `section dark` 교차) + `<!-- _header: '' -->`
- 그 외 25개 레이아웃: `<!-- _class: <name> -->` 한 줄

#### div 블록 작성 규칙
- `<div class="col">`, `<div class="card">`, `<div class="tile">`, `<div class="callout xxx">`, `<div class="chart-wrap">`, `<div class="takeaway">`, `<div class="kpi-list">`, `<div class="kpi">`, `<div class="images">`, `<figure>`, `<figcaption>`, `<div class="gallery">`, `<div class="ba-row">`, `<div class="ba-col">`, `<div class="ba-arrow">`
- **빈 줄 필수**: 모든 `<div ...>` 와 `</div>` 위아래로 빈 줄 1개. markdown-it 파싱 누락 방지.

#### 강조어 / 배지 (보수적)
- 원본 `**bold**`은 유지. 자동 추출 안 함
- ul 첫 단어가 `Color:`, `Focus:` 같은 콜론 종료 카테고리면 `*Color*` em 배지로 치환. 그 외 유지

#### 이미지 변환
- §3.2 결정 트리 적용
- 로컬 상대경로면 끝에 빌드 노트 추가:
  ```
  ⚠️ N개 로컬 이미지 참조 감지. 빌드 전 ../assets/ 복사 또는 file:/// 변환 필요.
  ```

#### 코드 블록
- ``` 언어 태그 그대로 유지
- 언어가 `bash`/`sh`/`shell` 이면 `<!-- _class: terminal -->` 적용

### 5) 산출 및 빌드 안내

1. `test_markdown_output/slides-<slug>.md` 작성
2. 산출 통계 출력:
   - 총 슬라이드 수
   - 레이아웃 분포 (각 클래스별 카운트)
   - 사용된 컴포넌트 (callout/code/table/image 개수)
   - 신규 레이아웃 사용 여부 (v2 14종 중 몇 종)
3. 빌드 명령 안내 출력
4. 검증 체크리스트 출력:
   - [ ] split 사용 ≤2회
   - [ ] callout 클래스 ≥1회 (원본에 콜아웃 존재 시)
   - [ ] 신규 레이아웃 ≥1회
   - [ ] H2 텍스트 100% 보존

---

## 출력 예시

원본 "Claude Excel 3.주요기능" (H2×2 + H3×13 + 표×3 + 코드×2 + 이미지×8 + 콜아웃×4) 변환 결과:

```
test_markdown_output/slides-claude-excel-3.md (≈22 slides)
  • cover ×1
  • section ×2 (01 주요기능 / 02 동작원리)
  • content ×8
  • grid-3 ×2 (1.1~1.6 기능 카드)
  • two-image ×1
  • chart-caption ×1
  • callout ×4 (example×2, info, note)
  • table ×3 (인라인)
  • code ×2 (terminal ×1)
  • end ×1
  • new layouts used: chart-caption, two-image (2/14)
```

---

## 참고 자료

- 디자인 시스템: [`../../design.md`](../../design.md)
- 베이스 CSS: [`../../samples/themes/tech-modern.css`](../../samples/themes/tech-modern.css)
- 8 파생 테마: `../../samples/themes/tm-{blue,green,orange,mono,keynote,business,lecture,demo}.css`
- Marp 컨벤션 치트시트 (26 페어): [`references/conventions.md`](references/conventions.md)
- 통합 회귀 덱: [`../../test_markdown_output/showcase/showcase-all-layouts.md`](../../test_markdown_output/showcase/showcase-all-layouts.md)
- 직전 변환 사례: 프로젝트 루트 `옵시디언을 활용한 실무 지식관리( + LLM Wiki)_MARP.md` (v1 변환)
