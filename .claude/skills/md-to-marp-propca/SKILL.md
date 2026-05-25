---
name: md-to-marp-propca
description: 표준 마크다운을 propca-notion-style 테마의 Marp 슬라이드 마크다운으로 자동 변환. 강의·교육·발표 컨텍스트에 특화 (한국 회계법인 톤). 21 전용 레이아웃(cover, toc-split, section, hero-quote, image-quote, compare, two-image, before-after, cards, database-rows, pastel-blocks, timeline, vertical-timeline, roadmap, toggle-list, icon-list, block-features, session-break, qa, thanks-contact, end)을 휴리스틱으로 자동 매칭하고 8 인라인 헬퍼(.callout/.tag/.chip/.kbd/.divider/.note/.cols-2/figure)를 자동 주입한다. obsidian-cleanup의 표준 MD 출력을 입력으로 받으며, 단독 실행도 가능. 출력은 output/<slug>/<slug>.marp.md.
---

# md-to-marp-propca (v1.0)

표준 마크다운 → **propca-notion-style** Marp 슬라이드 마크다운 자동 변환.

회계법인·자문사 강의/교육/발표 컨텍스트에 특화. 21 전용 레이아웃 + 8 인라인 헬퍼를 휴리스틱으로 자동 매칭한다.

---

## 입출력 계약

### 입력

| 필드 | 필수 | 설명 |
|---|---|---|
| `source` | ✅ | 표준 마크다운 파일 경로 (`obsidian-cleanup` 출력 또는 직접 작성한 MD) |
| `slug` | ❌ | 출력 파일명. 기본은 source 파일명 기반 |
| `header` | ❌ | 슬라이드 헤더 텍스트. 기본 `''` (frontmatter `title`/`series` 있으면 자동 채움) |
| `footer` | ❌ | 슬라이드 푸터 텍스트. 기본 `''` |
| `presenter` | ❌ | 발표자명 (cover 슬라이드 메타데이터). frontmatter `author` 우선 |

### 출력

1. **`output/<slug>/<slug>.marp.md`** — Marp 슬라이드 마크다운 (theme: propca-notion-style)

### 보장 사항

1. front matter는 **고정 스키마** (§3.1)
2. 첫 슬라이드 = `cover`, 마지막 슬라이드 ∈ `{end, qa, thanks-contact}` (마지막 H1 패턴에 따라)
3. 21 레이아웃 어휘 외 클래스명 출력 금지 (tech-modern의 `grid-3`/`stats`/`bg-full` 등 사용 0회)
4. 모든 `<div class>` 블록은 위·아래 빈 줄 (Marp 파싱 요구사항)
5. 8 인라인 헬퍼는 컨텍스트 기반 자동 주입 (§3.4)
6. 장문 본문(>8행 또는 >600자)은 자동 분할 + `(계속 N)` 라벨

---

## 작업 흐름

```
[1] source 읽기 + frontmatter 파싱
     ↓
[2] 슬라이드 분절 (구분자: H1, ---, ***)
     ↓
[3] 슬라이드별 레이아웃 휴리스틱 적용 (21종 — references/layout-heuristics.md)
     ↓
[4] 인라인 헬퍼 자동 주입 (5종 — references/inline-helpers.md)
     ↓
[5] front matter + 슬라이드 본문 조합
     ↓
[6] output/<slug>/<slug>.marp.md 작성
```

---

## 1) source 읽기 + frontmatter 파싱

- frontmatter 키: `title`, `author`, `series`, `date` (옵시디언 cleanup이 이미 정리해둠)
- `title` → 첫 슬라이드 H1 fallback (source에 H1 없을 때)
- `series` → 슬라이드 헤더 후보
- `author` → cover 슬라이드 발표자 메타데이터

---

## 2) 슬라이드 분절

기본 분절자:
- `^# `로 시작하는 H1 → 새 슬라이드 시작
- `^---$` 가로선 → 새 슬라이드 (Marp 표준)
- `^\*\*\*$` 가로선 → **세션 구분** (`<!-- _class: session-break -->` 슬라이드 자동 삽입)

장문 H2 자동 분할:
- 한 H2 본문이 **8행 초과** 또는 **600자 초과** → 슬라이드 분할
- 분할된 슬라이드의 H2는 `## <원본> (계속 N)` 형식
- 분할 후 각 슬라이드는 동일한 휴리스틱 재적용

---

## 3) 레이아웃 휴리스틱 적용

전체 21 레이아웃의 매칭 규칙은 [references/layout-heuristics.md](references/layout-heuristics.md). 우선순위(높은 신뢰도부터):

### 3.1) 셸 (Shell) — 우선 강제

| # | 패턴 | 출력 클래스 |
|---|---|---|
| 1 | 첫 슬라이드 | `cover` (강제) |
| 2 | 마지막 H1 = `Q&A`/`질문`/`Questions` 솔로 | `qa` |
| 3 | 마지막 H1 = `감사`/`Thanks` + 이메일/`@핸들` | `thanks-contact` |
| 4 | 마지막 H1 = `감사`/`Thanks`/`끝` 솔로 | `end` |
| 5 | 마지막 H1 누락 | `end` 자동 추가 |
| 6 | `***` 가로선 위치 | `session-break` |

### 3.2) 네비게이션

| # | 패턴 | 출력 |
|---|---|---|
| 7 | 첫 3 슬라이드 내 H2 `목차`/`Agenda`/`Outline` + ol 3~6 | `toc-split` |
| 8 | H2 `N. <title>` 솔로, 형제 챕터 3+ | `section` |

### 3.3) 콘텐츠 (본문 — 본격 매칭)

| # | 패턴 | 출력 |
|---|---|---|
| 9 | H1 + blockquote 솔로 (마커 없음) | `hero-quote` |
| 10 | 이미지 1 + blockquote 동일 슬라이드 | `image-quote` + `![bg left:60%]` 주입 |
| 11 | 2 컬럼 ul/ol + `vs`/`대비`/`비교` 키워드 | `compare` |
| 12 | 인라인 이미지 2 + 본문 ≤3행 | `two-image` |
| 13 | 이미지 2 + `이전`/`이후`/`AS-IS`/`TO-BE` 키워드 | `before-after` |
| 14 | H3 카드 3~4 + 짧은 본문 | `cards` |
| 15 | 상태 컬럼 표 (`진행중`/`완료`/`대기`) | `database-rows` + `.tag` 자동 주입 |
| 16 | 2~6 개념 블록 단락형 (각 1~2행) | `pastel-blocks` |
| 17 | ol 3~5, 각 `**bold** —` 리드인 | `timeline` |
| 18 | ol ≥5, 각 항목 부가 설명 | `vertical-timeline` |
| 19 | H2 + `로드맵`/`Phase`/`Q1` 키워드 | `roadmap` |
| 20 | ul + 2단계 하위 항목 펼침 | `toggle-list` |
| 21 | ul 각 항목 이모지/아이콘 + 콜론 | `icon-list` |
| 22 | 3~6 `### Title` + 1행 설명 + 본문 | `block-features` |
| 23 | 큰 숫자/% + 캡션 1행 (`# 87%`) | `pastel-blocks` (단일 hero) |
| 24 | (기본) 인식 못한 H2 + 본문 | 평범 content (no `_class`) |

> propca-notion-style에 **`big-number` 레이아웃 없음** → 큰 숫자는 `pastel-blocks` (단일 hero 블록)로 표현.

### 3.4) 인라인 헬퍼 자동 주입

전체 규칙은 [references/inline-helpers.md](references/inline-helpers.md). 요약:

| 트리거 | 주입 |
|---|---|
| `<div class="callout">` (cleanup이 이미 주입) | 그대로 통과 |
| 본문 `(진행중\|완료\|대기\|예정\|중단)` 패턴 | `<span class="tag {color}">` |
| 본문 `⌘+K`, `Ctrl+C` 등 단축키 | `<span class="kbd">` 자동 래핑 |
| `참고:` / `Note:` / `cf.` 1줄 blockquote | `<div class="note">` |
| `[NEW]`/`[BETA]` 헤더 라벨 | `<span class="chip">` |

---

## 4) Marp 마크다운 생성

### 4.1) front matter (고정 스키마)

```yaml
---
marp: true
theme: propca-notion-style
paginate: true
size: 16:9
header: '<frontmatter series 또는 인자 또는 "">'
footer: '<인자 또는 "">'
---
```

`header`/`footer`가 빈 문자열이면 propca CSS가 슬라이드 상단 카테고리 헤더만 표시.

### 4.2) 슬라이드 첫 디렉티브

각 슬라이드 첫 줄(H1 직전)에 `<!-- _class: ... -->` 형태로 매칭된 레이아웃 클래스 삽입.

`cover`, `end`, `qa`, `thanks-contact`, `session-break`, `image-quote`, `hero-quote` 등 풀블리드 셸 슬라이드에는 추가로:
```
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->
```

본문 콘텐츠 슬라이드에는 `_paginate: true` 유지 (front matter `paginate: true`가 상속).

### 4.3) div 블록 작성 규칙

`<div class="...">` 위·아래 빈 줄 필수:

```markdown
적당한 본문.

<div class="callout info">

**참고**

본문 내용.

</div>

다음 본문.
```

### 4.4) 슬라이드 구분자

각 슬라이드 사이는 `^---$` (Marp 표준). 첫 슬라이드 앞에는 구분자 생략 (frontmatter `---`가 이미 있음).

### 4.5) 이미지 변환

source의 `![](assets/image.png)` 형태는 그대로 통과. 단:
- `image-quote` 슬라이드: `![bg left:60%](...)` 디렉티브로 자동 변환
- 본문 ≤3행 + 단일 이미지: 인라인 유지
- 본문 4~7행 + 단일 이미지: `![bg right:40%](...)` (자동)
- 본문 >7행 + 단일 이미지: 슬라이드 2개로 분할 (이미지 슬라이드 + 본문 슬라이드)

세부 결정 트리는 [references/layout-heuristics.md](references/layout-heuristics.md) §이미지 결정 트리.

### 4.6) 코드 블록

source의 ```` ```...``` ```` 코드 블록은 그대로 통과. 슬라이드 안에 1개 코드 블록 + 본문 ≤4행 권장. 초과 시 분할.

---

## 5) 산출

`output/<slug>/<slug>.marp.md` 작성. 빌드는 `md-to-marp` 오케스트레이터가 담당:

```cmd
cd build
npx --yes @marp-team/marp-cli ^
    ../output/<slug>/<slug>.marp.md ^
    --html --allow-local-files ^
    -o ../output/<slug>/<slug>.html ^
    --theme-set ../themes/slide
```

---

## 출력 예시

```
사용자: "output/2-설치-및-기본설정/2-설치-및-기본설정.cleaned.md 슬라이드로"

Claude:
  → Skill(md-to-marp-propca)
  → 분절: 18 슬라이드
  → 휴리스틱 매칭:
       slide 1 → cover
       slide 2 → toc-split (목차 ol 5개)
       slide 3~5 → section (1. 사전 준비, 2. 설치, 3. 기본 설정)
       slide 6 → icon-list (✅ 항목 리스트)
       slide 7 → block-features (### 3개 + 본문)
       slide 8 → image-quote (스크린샷 + 인용)
       slide 9~13 → vertical-timeline (절차 7단계)
       slide 14 → cards (### 3개 짧은 카드)
       slide 15 → database-rows (상태 컬럼 표)
       slide 16 → compare (vs 키워드)
       slide 17 → pastel-blocks (개념 정리)
       slide 18 → thanks-contact (감사 + 이메일)
  → 인라인 헬퍼 주입:
       .callout info ×2 (cleanup이 미리 주입)
       .tag ×5 (진행중/완료 자동 감지)
       .kbd ×3 (⌘+K, Ctrl+S 등)
  → 출력: output/2-설치-및-기본설정/2-설치-및-기본설정.marp.md
```

---

## 참고 자료

- 21 레이아웃 매핑 표 + 이미지 결정 트리: [references/layout-heuristics.md](references/layout-heuristics.md)
- 5종 인라인 헬퍼 자동 주입 규칙: [references/inline-helpers.md](references/inline-helpers.md)
- propca-notion-style 디자인 시스템: [`../../../themes/slide/propca-notion-style/design.md`](../../../themes/slide/propca-notion-style/design.md)
- propca-notion-style CSS: [`../../../themes/slide/propca-notion-style/propca-notion-style.css`](../../../themes/slide/propca-notion-style/propca-notion-style.css)
- 쇼케이스 (모든 21 레이아웃 데모): [`../../../themes/slide/propca-notion-style/propca-notion-style.md`](../../../themes/slide/propca-notion-style/propca-notion-style.md)
- 입력 전처리 스킬: [`../obsidian-cleanup/SKILL.md`](../obsidian-cleanup/SKILL.md)
- 오케스트레이터: [`../md-to-marp/SKILL.md`](../md-to-marp/SKILL.md)
