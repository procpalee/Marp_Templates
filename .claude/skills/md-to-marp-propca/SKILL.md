---
name: md-to-marp-propca
description: 옵시디언 또는 표준 마크다운을 propca-notion-style 테마의 Marp 슬라이드 마크다운으로 한 번에 변환. 강의·교육·발표 컨텍스트(한국 회계법인 톤)에 특화. 내부 2단계 — (1) 옵시디언 전처리(wikilinks/embeds/콜아웃/frontmatter/태그 블록 정리 + 이미지 자산 복사), (2) propca-notion-style 21 전용 레이아웃 + 8 인라인 헬퍼 자동 매칭. 변환은 propca-notion-style.md(테마 쇼케이스)의 패턴을 그대로 따른다 — cover의 H1+H2+연월 구조, section의 #=숫자/##=제목 패턴, 본문 슬라이드의 # 헤더 우선, 인용 신중 사용, 여백 최소화. 출력은 output/<slug>/<slug>.marp.md + <slug>.cleaned.md(감사 추적) + assets/(이미지 복사본).
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
4. 21 propca 어휘 외 클래스명 출력 금지 (tech-modern의 `grid-3`/`stats` 등 0회)
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
[4] 슬라이드별 레이아웃 휴리스틱 적용 (21 레이아웃 — references/layout-heuristics.md)
     ↓
[5] 인라인 헬퍼 자동 주입 (8 헬퍼 — references/inline-helpers.md)
     ↓
[6] 쇼케이스 패턴 적용 (§2.A — 5 핵심 규칙)
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

전체 21 레이아웃 매핑은 [references/layout-heuristics.md](references/layout-heuristics.md), 인라인 헬퍼 주입은 [references/inline-helpers.md](references/inline-helpers.md).

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
| `database-rows` | 표 형태 + 상태/카테고리 컬럼 |
| `toggle-list` | 2단계 들여쓰기형 (펼침) |
| `icon-list` | 이모지/아이콘 + 콜론 시작 항목 ≥3 |

**판단 가이드**:
- 카드성 짧은 항목 3~4 → **cards**
- 기능 소개·번호 매김 3~6 → **block-features**
- 카테고리 + 상태 표시 → **database-rows**
- 그 외 단순 ul 나열이 길어지면 → **icon-list** 또는 분할

#### 규칙 7: 태그 색상은 정말 필요할 때만

- `.tag green/yellow/rose/sky/peach/purple/navy`는 **상태 표시·카테고리 구분**처럼 의미가 명확할 때만 사용
- 슬라이드당 **태그 최대 2~3종 색상**까지. 그 이상은 표 안(`database-rows`)으로 한정
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

### 2.B) 21 레이아웃 매핑 우선순위

1. **셸 강제 매칭** — 첫/마지막 슬라이드, `***` 가로선
2. **네비게이션** — toc-split / section
3. **시각 강조** — hero-quote / image-quote (규칙 4 준수)
4. **2 컬럼 비교** — compare / two-image / before-after
5. **카드 / 블록** — cards / pastel-blocks / block-features
6. **데이터** — database-rows (+ .tag 자동 주입)
7. **순서 / 흐름** — timeline / vertical-timeline / roadmap
8. **리스트 변형** — toggle-list / icon-list
9. **폴백** — 평범 content (no `_class`)

세부 표는 [references/layout-heuristics.md](references/layout-heuristics.md) §매핑 표 24행.

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
  ≥3                    → 본문/이미지 슬라이드 분할
```

**중요**: 인용 레이아웃 사용 조건은 §2.A 규칙 4를 따른다. 본문 강조 문장만 있는 슬라이드의 이미지는 **인라인** (`![w:720](url)`) 로 처리.

### 3.E) 옵시디언 전처리 산출물 보존

`output/<slug>/<slug>.cleaned.md`는 디스크에 보존해 감사 추적·재실행에 활용. 변환 리포트에서 cross-check 가능.

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
    database-rows : 1
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
- 21 레이아웃 매핑 표 + 이미지 결정 트리: [references/layout-heuristics.md](references/layout-heuristics.md)
- 8 인라인 헬퍼 자동 주입 규칙: [references/inline-helpers.md](references/inline-helpers.md)
- 오케스트레이터: [`../md-to-marp/SKILL.md`](../md-to-marp/SKILL.md)
