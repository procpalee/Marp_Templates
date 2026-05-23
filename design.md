# Tech Modern — Slide Design System (Single Source of Truth)

본 프로젝트(`MD to PPT`)의 **공식 슬라이드 디자인 시스템**.
모든 변환 결과물은 이 문서의 토큰·타입스케일·템플릿을 따른다.
대응 CSS: [`samples/themes/tech-modern.css`](samples/themes/tech-modern.css)
변환 스킬: [`.claude/skills/md-to-marp/SKILL.md`](.claude/skills/md-to-marp/SKILL.md)

---

## §0. 한 줄 요약

**Tech Modern** — Light/Dark 혼용, 모던하고 전문적인 톤. Pretendard + Inter + JetBrains Mono.
Vercel-스러운 라이트 + macOS-style 코드 + 차분한 블루 액센트. 16:9.

---

## §1. Brand & Tone

- **용도:** 기술 발표, 제품 데모, 팀 공유, 컨퍼런스, 사내 강의
- **톤:** modern · professional · technical · readable
- **종횡비:** 16:9 (1280×720 기준, --html은 자동 16:9)
- **타깃 청중:** 개발자/디자이너/PM/경영진 혼합. 전 슬라이드 22pt 이상으로 원거리 가독성 확보

---

## §2. Color Tokens

### Light (기본)
| Token | HEX | 용도 |
|---|---|---|
| `--bg-base` | `#F8FAFC` | 슬라이드 배경 |
| `--bg-elevated` | `#FFFFFF` | 카드, blockquote |
| `--bg-code` | `#0F172A` | 코드 블록 (어두운 코드) |
| `--fg-default` | `#0F172A` | 본문 |
| `--fg-muted` | `#475569` | 보조 텍스트 |
| `--fg-subtle` | `#94A3B8` | 캡션, 페이지 번호, header/footer |
| `--border` | `#E2E8F0` | 구분선, 표 헤더, 코드 배경 |
| `--accent` | `#2563EB` | 강조, 링크, h3, 강조 배경 |
| `--accent-secondary` | `#DB2777` | 인라인 code 색, 보조 강조 |
| `--accent-soft` | `rgba(37, 99, 235, 0.08)` | strong 형광펜, badge 배경 |

### Dark (`section.dark`)
| Token | HEX | 용도 |
|---|---|---|
| `--bg-base` | `#0B0F19` | 슬라이드 배경 |
| `--bg-elevated` | `#161B2C` | 카드, blockquote |
| `--bg-code` | `#05070C` | 코드 블록 |
| `--fg-default` | `#F8FAFC` | 본문 |
| `--fg-muted` | `#94A3B8` | 보조 텍스트 |
| `--fg-subtle` | `#64748B` | 캡션 |
| `--border` | `#1E293B` | 구분선 |
| `--accent` | `#38BDF8` | 강조 (다크에서 더 밝게) |
| `--accent-secondary` | `#F472B6` | 보조 강조 |
| `--accent-soft` | `rgba(56, 189, 248, 0.12)` | 강조 배경 |

### 의미 컬러 (callout 등)
| Token | HEX | 용도 |
|---|---|---|
| `--info` | `#3B82F6` | INFO callout |
| `--success` | `#10B981` | SUCCESS callout |
| `--warning` | `#F59E0B` | WARN callout |
| `--danger` | `#EF4444` | DANGER callout |

---

## §3. Typography

- `--font-sans`: `Pretendard, Inter, -apple-system, sans-serif`
- `--font-mono`: `'JetBrains Mono', 'Fira Code', monospace`

| Role | Size | Weight | letter-spacing | line-height |
|---|---|---|---|---|
| h1 cover | 54pt | 800 | -0.04em | 1.1 |
| h1 section | 68pt | 800 | -0.04em | 1.05 |
| h1 content | 38pt | 800 | -0.03em | 1.2 |
| h2 content | 26pt | 700 | -0.02em | 1.3 |
| h2 cover | 22pt | 500 | normal | 1.4 |
| h3 | 20pt | 600 | normal | 1.3 |
| body / li | 18pt | 400 | normal | 1.6 |
| em(badge) | 13pt | 700 | normal | 1.4 |
| code (inline) | 0.85em | 500 | normal | inherit |
| pre code | 14pt | 400 | normal | 1.5 |
| table th | 14pt | 700 | -0.01em | 1.4 |
| table td | 16pt | 400 | normal | 1.5 |
| header | 12pt | 600 | 0.05em uppercase | 1 |
| footer / page | 11pt | 500 | normal | 1 |

**원칙:** 본문 18pt 미만 금지. h1과 body 사이 최소 2단계 차이.

---

## §4. Spacing

- **slide padding:** `70px 90px` (top/right/bottom/left)
- **vertical rhythm:** `8 / 16 / 24 / 40 / 64`
- **grid gap:** `40px` (2/3-column)
- **컴포넌트 padding:** card/callout `24px`, code `24px`

---

## §5. Slide Templates

### 1) cover
큰 제목 + 부제 + 발표자/소속. 우상단 radial accent.

```markdown
<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Next-Gen Tech Presentation
## 가독성과 미학을 고려한 모던 프레젠테이션
홍길동 · Tech & Design Lab
```

### 2) section divider
챕터 시작. 큰 숫자 + 제목, 가운데 정렬, 그라데이션 배경.

```markdown
<!-- _class: section dark -->
<!-- _header: '' -->

# 01
## 새로운 디자인 경험
```

### 3) content (기본)
좌측 정렬 제목 + 본문/리스트/혼합.

```markdown
# 가독성을 극대화한 타이포그래피
모든 텍스트는 **Pretendard**와 **Inter** 폰트를 조합하여 설계되었습니다.

### 핵심 디자인 특징
- *Color* **풍부한 대비**: 라이트·다크 모두 눈이 편안한 팔레트
- *Focus* **시각적 강조**: strong 태그로 자연스러운 형광펜 효과
- *Ease* **마크다운 네이티브**: 복잡한 HTML 없이 슬라이드 완성
```

### 4) code
코드 블록 + 설명. macOS 윈도우 컨트롤러(빨/노/초 점) 자동 적용.

````markdown
# 개발자를 위한 모던 코드 블록
코드 블록은 깔끔하고 선명하게 렌더링됩니다.

```typescript
import { loadTheme } from 'presentation-core';
const slideConfig = { theme: 'tech-modern', layout: '16:9' };
export const presentation = loadTheme(slideConfig);
```
````

### 5) split (2열)
좌우 동등 분할. `<!-- _class: split -->` + `<div class="col">` 두 개.

```markdown
<!-- _class: split -->

# 비교: Before vs After

<div class="col">

### Before
- 수동 슬라이드 분절
- 디렉티브 수기 입력
- 일관성 부재

</div>
<div class="col">

### After
- 자동 분절
- 레이아웃 휴리스틱
- 디자인 토큰 통일

</div>
```

### 6) grid-3 (3열)
세 개의 카드/포인트. h3 + 본문 3쌍.

```markdown
<!-- _class: grid-3 -->

# 세 가지 핵심 가치

<div class="col">

### Speed
빠른 변환과 즉각 미리보기

</div>
<div class="col">

### Quality
디자인 시스템 준수

</div>
<div class="col">

### Reusable
스킬로 자산화

</div>
```

### 7) stats (KPI 타일 4개)
큰 숫자 + 짧은 레이블.

```markdown
<!-- _class: stats -->

# 임팩트 한눈에 보기

<div class="tile"><h3>92%</h3><p>발표 만족도</p></div>
<div class="tile"><h3>3.4×</h3><p>슬라이드 생산성</p></div>
<div class="tile"><h3>12</h3><p>레이아웃 종류</p></div>
<div class="tile"><h3>1h</h3><p>평균 변환 시간</p></div>
```

### 8) timeline (가로 진행)
ol → step. dot connector 자동.

```markdown
<!-- _class: timeline -->

# 4단계 변환 파이프라인

1. **원본 분석** — H1/H2/H3 계층 + 코드/표/이미지 추출
2. **분절 + 매칭** — 8줄 룰과 레이아웃 휴리스틱 적용
3. **Marp 출력** — front matter + 디렉티브 자동 삽입
4. **빌드 + 검증** — HTML 미리보기 후 PDF 산출
```

### 9) icon-list
ul 각 항목 첫 단어가 *badge* 형태.

```markdown
<!-- _class: icon-list -->

# 주요 특징

- *Fast* 즉각 변환과 watch 모드 미리보기
- *Safe* 회귀 없는 append-only CSS 확장
- *Open* 마크다운 + 표준 Marp 문법만 사용
- *Pretty* Tech Modern 토큰으로 일관된 룩앤필
```

### 10) compare (좌/우 vs)
중앙 vs 구분.

```markdown
<!-- _class: compare -->

# Before vs After

<div class="col">

### Before
수동 작업 + 디렉티브 누락

</div>
<div class="vs">VS</div>
<div class="col">

### After
스킬 한 번이면 끝

</div>
```

### 11) hero-quote
화면 전체 큰 따옴표.

```markdown
<!-- _class: hero-quote -->

> 디자인은 단지 어떻게 보이고 느껴지는가가 아닙니다.
> 디자인은 **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs
```

### 12) cards (N개 카드 그리드)
2~6개. h3 + 본문.

```markdown
<!-- _class: cards -->

# 기능 카드

<div class="card">

### 자동 분절
H1/H2 기준 슬라이드 분리

</div>
<div class="card">

### 배지화
*Tag* 문법으로 카테고리 강조

</div>
<div class="card">

### bg-right
이미지 우측 자동 배치

</div>
```

### 13) agenda
큰 번호 + 항목. ol 기반.

```markdown
<!-- _class: agenda -->

# 오늘 다룰 내용

1. 디자인 시스템 개요
2. 12개 레이아웃 미리보기
3. 변환 스킬 동작 원리
4. 라이브 데모 + Q&A
```

### 14) bg-full (풀블리드 hero)
배경 이미지 풀스크린 + 어두운 오버레이.

```markdown
<!-- _class: bg-full -->

![bg](https://images.unsplash.com/photo-...)

# 새로운 시작
## 슬라이드 자동화의 시대
```

### 15) end (감사/Q&A)
cover dark의 변형. 큰 thanks + 연락처.

```markdown
<!-- _class: end -->
<!-- _paginate: false -->

# 감사합니다
## 질문 환영합니다.
GitHub @tech-modern · contact@example.com
```

---

## §6. Components

### badge
마크다운 `*Text*` → em pill (`var(--accent-soft)` 배경, `var(--accent)` 텍스트, 둥근 모서리).

### callout 4종
blockquote 첫 줄 신호어로 분기.

```markdown
> [!INFO]
> 알아두면 좋은 부가 정보.

> [!SUCCESS]
> 잘 동작했을 때의 결과.

> [!WARN]
> 주의가 필요한 사항.

> [!DANGER]
> 데이터 손실/장애 가능성.
```

### code (macOS dots)
fenced code가 자동으로 좌상단 빨/노/초 점 3개를 갖춤. `pre::before`.

### terminal
`<!-- _class: terminal -->` + fenced code(언어 `bash` 또는 `sh`).

### table
헤더 굵게, 행 교차 배경. 5열 권장 상한.

### tile (stats 내부)
h3(큰 숫자) + p(레이블) 묶음.

### step (timeline 내부)
ol li 자체가 step. counter로 자동 번호 부착.

### card (cards/grid-3 내부)
`<div class="card">` 또는 `<div class="col">`.

---

## §7. Iconography & Imagery

- **아이콘:** Lucide / Tabler (1.5px stroke). 색은 `--fg-default` 또는 `--accent`. 슬라이드 내 직접 SVG inline 가능
- **이미지:** `border-radius: 10px`, `max-width: 100%`, 그림자 `0 8px 24px rgba(0,0,0,0.1)`
- **우측 배경:** `![bg right:40%](url)` — Marp 디렉티브. 본문이 좌측 60%에 자동 정렬
- **풀블리드:** `![bg](url)` — 슬라이드 전체. `<!-- _class: bg-full -->`와 조합해 텍스트 오버레이

---

## §8. Code Highlight

- 베이스 테마: marp-cli 기본 (Prism). 향후 Shiki(`github-dark-default`/`vesper`) 교체 검토
- 인라인 code: `--accent-secondary` 텍스트 + `--border` 배경
- pre code: 다크 (`--bg-code`) 배경 + 흰색 텍스트
- 강조 라인 (필요 시): 좌측 2px `--accent` 바 + `--accent-soft` 배경 (별도 처리 필요, 현재 미적용)

---

## §9. Don'ts

- 본문 18pt 미만 금지
- 한 슬라이드 8줄(또는 약 600자) 초과 금지
- 색상 토큰 3개 초과 동시 사용 금지
- `--accent`를 본문 텍스트에 직접 사용 금지 (강조 전용)
- 풀-블랙 `#000000` 금지 — 다크는 `#0B0F19` 사용
- 그라데이션 남용 금지 (cover, section, end 슬라이드 한정)
- 다크 슬라이드에 light 그림자 사용 금지
- HTML inline style 금지. 클래스 기반으로만

---

## §10. Marp CSS Mapping

| Design Token | CSS Variable | tech-modern.css 위치 |
|---|---|---|
| Light bg-base | `--bg-base #f8fafc` | `:root` |
| Light fg-default | `--fg-default #0f172a` | `:root` |
| Light accent | `--accent #2563eb` | `:root` |
| Dark bg-base | `--bg-base #0b0f19` | `section.dark` |
| Dark accent | `--accent #38bdf8` | `section.dark` |
| font-sans | `--font-sans` | `:root` |
| font-mono | `--font-mono` | `:root` |

CSS와 design.md가 어긋나면 **CSS를 정답으로 본다.** design.md를 후행 업데이트.

---

## §11. Marp Authoring Conventions (변환 규칙)

### Front matter (모든 슬라이드 덱 첫 줄)

```yaml
---
marp: true
theme: tech-modern
paginate: true
size: 16:9
header: '프로젝트 이름 또는 챕터'
footer: '© 2026 · Author'
---
```

### 슬라이드 구분자

- 슬라이드 사이는 빈 줄 + `---` + 빈 줄
- `_class`, `_paginate`, `_header`, `_footer`는 슬라이드 첫 부분에 HTML 주석으로 (`<!-- _class: cover -->`)
- 언더스코어(`_`) 접두사가 있으면 **현재 슬라이드에만** 적용. 없으면 이후 모든 슬라이드에 적용

### `<!-- _class: ... -->` 카탈로그

| 클래스 | 용도 |
|---|---|
| `cover` | 표지 |
| `section` | 챕터 divider |
| `dark` | 다크 변형 (다른 클래스와 조합) |
| `split` | 2열 |
| `grid-3` | 3열 |
| `stats` | KPI 4타일 |
| `timeline` | 가로 진행 |
| `icon-list` | 배지 리스트 |
| `compare` | 좌/우 vs |
| `bg-full` | 풀블리드 hero |
| `hero-quote` | 큰 인용 |
| `cards` | 카드 그리드 |
| `agenda` | TOC |
| `end` | 감사/Q&A |
| `terminal` | 터미널 스타일 코드 |

### 배경 이미지

- `![bg](url)` — 슬라이드 전체 배경
- `![bg right:40%](url)` — 우측 40% 배경
- `![bg left:30%](url)` — 좌측 30% 배경
- `![bg fit](url)`, `![bg cover](url)` — fit/cover 모드
- 여러 `![bg]`를 연달아 쓰면 자동으로 분할

### 강조 표기

- **굵게 강조** = `**중요 단어**` (자동 형광펜 배경)
- *배지* = `*카테고리*` (em → pill UI)
- ~~취소선~~ = `~~제거된 항목~~`
- `인라인 코드` = `` `code` ``

---

## §12. Skill Contract (md-to-marp 입출력 계약)

### 입력
- **필수:** 마크다운 파일 경로 (절대 또는 상대) 또는 마크다운 본문 텍스트
- **선택:** 출력 파일명 슬러그(`slug`), 헤더/푸터 텍스트, 발표자 메타

### 출력
- Marp용 마크다운 파일 1개: `samples/slides-<slug>.md`
- 빌드 안내 메시지(npx marp-cli 명령 한 줄)

### 보장 사항
1. front matter는 `theme: tech-modern` 고정
2. 첫 H1은 무조건 cover 슬라이드
3. 한 슬라이드 본문 8줄 이하 (자동 분할)
4. 모든 H2는 슬라이드 어딘가에 살아남음(정보 손실 없음)
5. 코드 펜스 언어 태그 보존
6. 표 셀 내용 변경 금지 (5열 초과 시 분할 또는 그대로 두기)
7. cover/section/end 슬라이드는 `_paginate: false` 및 `_header: ''`, `_footer: ''`

### 비보장 (스킬이 보수적으로 결정)
- 본문 강조어 자동 추출은 신뢰도 낮을 시 패스 (원본 유지)
- 이미지가 외부 URL이면 그대로 보존, 깨진 링크 검사 안 함
- 사용자 어조나 어휘는 변경 금지 (마크다운 구조만 재배열)

### 레이아웃 자동 매칭 휴리스틱 (우선순위 순)

| # | 입력 패턴 | 출력 레이아웃 |
|---|---|---|
| 1 | 첫 H1 + 부제 + 발표자 라인 | `cover` |
| 2 | H2 단독 슬라이드 (본문 ≤ 1줄) | `section` |
| 3 | blockquote 첫 줄에 `[!INFO]`/`[!SUCCESS]`/`[!WARN]`/`[!DANGER]` | callout (해당 색상) |
| 4 | blockquote만 단독 (≥ 2줄) | `hero-quote` |
| 5 | ol 4개 이하 + 각 항목 짧음 (≤ 1줄) | `timeline` 또는 `agenda` (TOC 위치면 agenda) |
| 6 | H3 카드 3개 연속 | `grid-3` |
| 7 | H3(숫자 1~4글자) + 본문(짧음) 4쌍 | `stats` |
| 8 | h2 + ul 두 묶음 대등 | `split` 또는 `compare` (vs 키워드 있으면 compare) |
| 9 | ul 첫 단어가 모두 `*tag*` 형태 | `icon-list` |
| 10 | 본문 + 단일 이미지 (≥ 200자 본문) | `![bg right:40%]` 일반 content |
| 11 | 이미지 단독 + 한두 줄 텍스트 | `bg-full` |
| 12 | 마지막 H1 (`감사합니다`, `Thanks`, `Q&A`) | `end` |
| 0 | 어디에도 매칭 안 됨 | 기본 content |

매칭 신뢰도가 낮으면 항상 **기본 content**로 폴백. 사용자가 후속으로 클래스만 수정하면 되도록 보수적으로.

---

## §13. 신규 3 테마 (GitHub design.md 기반)

다음 3개 테마는 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT 라이선스) 의 디자인 토큰을 기반으로 추가되었다.

### tm-stripe — 프리미엄 인디고/네이비
**출처:** Stripe DESIGN.md  
**용도:** 핀테크, 결제, SaaS 프리미엄, B2B 발표

```css
:root {
  --accent: #635bff;
  --accent-secondary: #1c1e54;
  --bg-base: #ffffff;
  --bg-elevated: #f6f9fc;
  --fg-default: #0a2540;
  --fg-muted: #425466;
  --border: #e3e8ee;
  --radius-card: 12px;
}
```
- 커버: `linear-gradient(135deg, #1c1e54 0%, #635bff 100%)` + 흰 글씨 + h2 italic
- 카드: `box-shadow: 0 4px 8px rgba(10,37,64,0.04), 0 24px 48px rgba(10,37,64,0.06)`
- `section.cards .card` 좌측 4px accent 보더 (Stripe signature)

### tm-shopify — 다크 틸 (대시보드/커머스)
**출처:** Shopify DESIGN.md  
**용도:** 대시보드, 이커머스, 관리자 UI, 운영 보고

```css
:root {
  --accent: #00a96e;
  --accent-secondary: #5c6ac4;
  --bg-base: #0a0e1a;
  --bg-elevated: #1e2c31;
  --fg-default: #ffffff;
  --fg-muted: #a8b3bd;
  --border: #2a3540;
}
```
- 커버: `radial-gradient(ellipse at top, #1e2c31 0%, #0a0e1a 70%)` + 그린 글로우
- 카드: 다크 + 액센트 그린 보더 + `box-shadow: 0 8px 24px rgba(0,0,0,0.35)`
- terminal pre: 검정 유지 + 액센트 글로우

### tm-linear — 미니멀 보라 (툴체인/생산성)
**출처:** Linear DESIGN.md  
**용도:** 워크플로우 도구, 이슈트래커, 생산성, B2B SaaS 보수적

```css
:root {
  --accent: #5e6ad2;
  --accent-secondary: #95a2ff;
  --bg-base: #ffffff;
  --bg-elevated: #fafafa;
  --fg-default: #0e0e10;
  --fg-muted: #6b6b76;
  --border: #ebebed;
  --radius-card: 8px;
}
```
- 커버: 흰 배경 + 상단 4px accent 보더 (그라데이션 없음, no shadow)
- 카드: `box-shadow: none` (Linear는 그림자를 거의 쓰지 않음)
- 페이지 번호: 배경 투명, 보더만 (미니멀)

### 라이선스 노트
세 테마 모두 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 의 디자인 토큰을 참조했다. 해당 콜렉션은 MIT 라이선스이며, 색상/타이포그래피 토큰을 차용했다. 원본 브랜드(Stripe / Shopify / Linear)의 로고나 상표는 사용하지 않으며, 어디까지나 디자인 시스템 참고용 토큰 추출이다.
