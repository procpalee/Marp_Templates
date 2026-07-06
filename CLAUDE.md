# MD to PPT — Project Working Rules

이 프로젝트는 마크다운 → Marp 슬라이드 → HTML 변환 도구체인입니다.
각 테마는 [`themes/slide/<theme>/`](./themes/) 폴더에 자기완결형으로 존재하며, 디자인 시스템은 `themes/slide/<theme>/design.md`에 기술됩니다.

---

## 슬라이드 변환 요청 처리 (필수)

사용자가 다음 중 어느 표현을 쓰든 **반드시 `md-to-marp` 스킬(오케스트레이터)을 가장 먼저 호출**하세요:

- "이 파일/문서/마크다운을 슬라이드로 변환"
- "발표 자료로 만들어줘"
- "강의 자료로"
- "Marp으로 변환"
- "PPT / 덱 / 프레젠테이션으로"
- "/marp" 슬래시 명령

**금지**:
- `anthropic-skills:pptx` 호출 (이 프로젝트는 .pptx를 산출하지 않음, Marp HTML이 산출)
- `anthropic-skills:theme-factory` 호출 (자체 테마 시스템 사용)
- `web-artifacts-builder` 호출 (HTML은 Marp CLI가 생성)
- 새로 스킬을 검색하거나 다른 변환기 추천 (`md-to-marp`가 이미 존재함)

---

## 핵심 컴포넌트

| 컴포넌트 | 경로 | 역할 |
|---|---|---|
| 오케스트레이터 | `.claude/skills/md-to-marp/` | 모드 선택 + md-to-marp-propca 호출 + 빌드 + QA + 재시도 + watch |
| 변환 스킬 (통합) | `.claude/skills/md-to-marp-propca/` | 옵시디언 전처리(`[[wikilinks]]`/`![[embeds]]`/콜아웃/frontmatter/태그 + 이미지 자산 복사) + propca-notion-style 레이아웃(40 매칭 규칙)·8 인라인 헬퍼·톤 프리셋 3종(tone-exec/tone-lecture/tone-seminar) 자동 매칭. 변환은 [`themes/slide/propca-notion-style/propca-notion-style.md`](themes/slide/propca-notion-style/propca-notion-style.md) 쇼케이스 패턴 준수 — cover의 H1+H2+연월, section의 #=숫자/##=제목, 본문 슬라이드 # 헤더 우선, 인용 신중 사용, 여백 최소화 |
| 검증 에이전트 | `.claude/agents/marp-reviewer.md` | 독립 컨텍스트 QA. theme front matter로 propca/card-news 분기 |
| 슬래시 명령 | `.claude/commands/marp.md` | `/marp <file> [watch] [용도]` — 원샷 빌드 + 선택 watch |
| 테마 폴더 | `themes/slide/<theme>/` | 테마별 design.md + slides/{css,md,html} 트리플 |
| 카드뉴스 폴더 | `themes/card-news/propca-notion-style/` | 4:5 카드뉴스 design.md + propca-notion-style-cards.css + sample.md |
| 빌드 인프라 | `build/` | `package.json` + `build.cmd` (marp-cli 래퍼) |

---

## 테마 카탈로그

| 테마 | 톤 / 용도 |
|---|---|
| `tech-modern` | 라이트 블루 (베이스, 일반 테크 발표, fallback) |
| `vercel` | 모노크롬 블랙앤화이트 + 0070f3 (프론트엔드/배포/Next.js) |
| `notion` | 퍼플 + 파스텔 카드 (문서/위키/워크스페이스) |
| `claude` | 따뜻한 크림 + 코랄 세리프 (AI/리서치/에디토리얼) |
| `spotify` | 다크 + 비비드 그린 (미디어/엔터테인먼트/콘텐츠) |
| `stripe` | 프리미엄 인디고 + 그라데이션 메시 (핀테크/결제/SaaS B2B) |
| `figma` | 블랙앤화이트 + 8색 파스텔 블록 (디자인 시스템/콜라보) |
| `apple` | 화이트 + parchment + 단일 Action Blue (제품 키노트) |
| `linear` | 다크 near-black + 단일 라일락 + surface ladder (툴체인/생산성) |
| `cursor` | 따뜻한 cream + 오렌지 + IDE mockup (AI-증강 IDE/에이전트 데모) |
| `raycast` | 다크 + 4-step surface + 레드 stripe + ⌘K 팔레트 (런처/생산성) |
| `supabase` | 화이트 + 민트 그린 + SQL/터미널 mockup (OSS 백엔드/Postgres) |
| `airbnb` | 코랄 + 사진 우선 + 64pt rating (호스피탈리티/마켓플레이스) |
| `nvidia` | 풀블랙/화이트 + brand green + 4 corner squares (하드웨어 AI/spec) |
| `tesla` | 화이트/카본 + Electric Blue + 극단적 whitespace (자동차/럭셔리) |
| `procpa-vivid` | 화이트 + Vivid Blue #2563eb + 헤어라인 에디토리얼 (모던/전문 발표, procpa.co.kr 블로그 톤) |

용도→테마 매핑은 [`.claude/skills/md-to-deck/references/theme-picker.md`](.claude/skills/md-to-deck/references/theme-picker.md) 참조.

`tech-modern` 외 14 테마는 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT)의 DESIGN.md 토큰을 기반. 브랜드 로고·상표는 사용하지 않음.

`procpa-vivid`는 사용자 블로그(procpa.co.kr, [`procpalee/procpa_obsidian_style`](https://github.com/procpalee/procpa_obsidian_style) `globals.css`)의 "Vivid Blue" 디자인 시스템을 이식한 **라이브 자기완결형 테마**다 (`themes/slide/procpa-vivid/`, 빌드 가능). 14 브랜드 테마(레퍼런스 전용, 자동 매칭 없음)와 달리 `npm run build:procpa-vivid`로 빌드된다. **v7부터 컴포넌트 우선(components-first) 모델**: CSS는 4계층(TIER 1 공통 컴포넌트 → TIER 2 임팩트 레이아웃 → 셸 → PROJECT LAYOUTS)으로 구성. **TIER 1 컴포넌트**(`.card`/`.stat`/`.vs`/`.board`/`.panel`/`.process`/`.quote-block`/`.callout`/`.code-block`(파일명 헤더 코드)/`.table-block`(표, 회계 스타일/compact) + `.cols-2/3/4`·`.stack`·`.split-7-5` + 인라인 헬퍼 `.mark`/`.tag`(상태 변형)/`.chip`/`.kbd`/`.note`/`figure`)로 한 장에 여러 개 조합하는 것이 기본이고, **v8 레이아웃 다이어트 (2026-07, v8.2 조정)**: 실사용 데이터 기반으로 section 레이아웃을 **CORE 세트**로 축소 — 셸 10종(`cover`/`cover-image`/`cover-split`/`section`/`toc`/`end`/`qa`/`thanks-contact`/`session-break`/`thumb`) + 본문 10종(`split`/`feature-cards`/`content-sidebar`/`comparison-vs`/`comparison`/`steps`/`icon-list`/`checklist`/`faq`/`vertical-timeline`) + 임팩트 3종(`statement`(+`light`)/`takeaway`/`callout-hero`) + modifier(`compact`/`roomy`/`code-lg`). 나머지 28종은 CSS에 `[ARCHIVE]` 마커로 잔존(기존 덱 재빌드 호환)하되 **신규 변환 사용 금지** — 대체는 컴포넌트 레시피 [references/vivid-recipes.md](.claude/skills/md-to-marp-propca/references/vivid-recipes.md) R-01~R-12. 카탈로그는 design.md §5·§5-A와 [layouts-by-purpose.md](themes/slide/procpa-vivid/layouts-by-purpose.md). `md-to-marp-propca` 스킬이 `theme: procpa-vivid` 타깃 분기(컴포넌트 우선 라우팅, [references/procpa-vivid-matching.md](.claude/skills/md-to-marp-propca/references/procpa-vivid-matching.md))를 지원하고, 변환 시 **사용자 스타일 프로파일**([references/user-style-profile.md](.claude/skills/md-to-marp-propca/references/user-style-profile.md) — 문체 3단 스위칭·밀도·강조·덱 골격)을 필수 로드한다(원고 작성 가이드: [references/authoring-guide.md](.claude/skills/md-to-marp-propca/references/authoring-guide.md)). marp-reviewer는 Phase 1C(vivid 분기)에서 ARCHIVE 어휘 방화벽을 검사. 사용 빈도 재집계는 `build/`에서 `npm run usage:vivid`. **새 레이아웃이 필요하면 CSS의 `PROJECT LAYOUTS` 섹션에 토큰 전용으로 추가**(design.md §5 "새 레이아웃 추가 절차"). **v7.3 강의 modifier**(한공회 발표 덱 기준): `.shot`(프레임 스크린샷)·`code-lg`(대형 투사 코드)·`statement light`(화이트 선언)·`.compact` 밀도(comparison/comparison-vs/icon-list)·content-sidebar aside 16pt — per-slide `<style scoped>` 없이 강의·회계 발표 덱 작성. 단일 레퍼런스=[`design.md`](themes/slide/procpa-vivid/design.md), 데모=[`procpa-vivid.md`](themes/slide/procpa-vivid/procpa-vivid.md). 다크 변형 `procpa-vivid-dark`("Bright Royal" `#5b9cff` on `#0b0e13`)는 `@import` + 토큰 override로 베이스를 상속 — front matter `theme: procpa-vivid-dark`, `npm run build:procpa-vivid-dark`로 빌드.

**썸네일 시스템 (`themes/thumbnail/procpa-vivid/`)**: procpa-vivid 토큰을 계승한 자기완결형 썸네일 테마 `procpa-vivid-thumb` — 사이즈 프리셋 3종(**16:9 1280×720이 주 산출물** / `size: sq` 1:1 1080×1080 / `size: sns` 4:5 1080×1350, ratio 클래스 `sq`/`tall`을 `_class`에 합성) × 레이아웃 변형 5종(**`thumb-photo`가 기본(메인) — `_backgroundImage` cover + 다크 스크림** / `thumb-typo`/`thumb-ink`/`thumb-band`/`thumb-badge`). 16:9는 콘텐츠를 중앙 1:1(720×720) 세이프 존에 유지하며 **전 비율 텍스트 가운데 정렬 + 브랜드 마커(로고/PROCPA)는 하단 중앙 고정**. 빌드: `npm run build:thumb`(HTML 검수) / `thumb:png-169`·`thumb:png-sq`·`thumb:png-45`·`thumb:all`(PNG). md-to-marp 오케스트레이터 purpose에 "썸네일" 키워드 → `mode: thumbnail`, **"풀세트" 키워드 → `mode: full-set`(덱+카드뉴스+썸네일 일괄, procpa-vivid 계열 고정 — SKILL.md §4.5)** 자동 분기. 상세: [themes/thumbnail/procpa-vivid/design.md](themes/thumbnail/procpa-vivid/design.md) — **Marpit 주의**: `section::after`는 content 제거 + `padding: inherit` 주입되므로 로고 pseudo에 `padding: 0` 필수. 컴포넌트 레시피 시각 데모: [vivid-recipes-demo.md](themes/slide/procpa-vivid/vivid-recipes-demo.md) (`recipes-demo-png/`).

---

## 산출물 위치 규칙

| 종류 | 위치 |
|---|---|
| 테마 CSS | `themes/slide/<theme>/slides/<theme>.css` |
| 쇼케이스 MD | `themes/slide/<theme>/slides/<theme>.md` |
| 빌드 HTML | `themes/slide/<theme>/slides/<theme>.html` |
| 디자인 문서 | `themes/slide/<theme>/design.md` |

사용자 변환물(`/deck` 워크플로 산출)은 별도 `output/<slug>.html` 형태로 저장될 수 있습니다 (md-to-deck SKILL.md 참조).

---

## 빌드 명령

```cmd
cd build
npm run build:<theme>      # 1회 빌드
npm run watch:<theme>      # 변경 감지 + 자동 빌드
```

수동 호출:
```cmd
cd build
npx --yes @marp-team/marp-cli ^
  ..\themes\slide\<theme>\slides\<theme>.md ^
  --html --allow-local-files ^
  --theme-set ..\themes ^
  -o ..\themes\slide\<theme>\slides\<theme>.html
```

- `--theme-set ..\themes`는 폴더를 재귀 스캔해 모든 `<theme>.css` 자동 등록
- `--allow-local-files` 누락 시 PDF에서 로컬 이미지 누락
- `--html` 필수 (인라인 `<div>` 파싱)

---

## CSS 변경 시 주의

- 각 테마는 **자기완결형** (`@import` 사용 안 함). 베이스 변경이 다른 테마로 자동 전파되지 않음
  - **예외**: propca 색상 변형 3종(`propca-notion-style-{emerald,slate,ocean}.css`)은 Marpit `@import` 상속으로 베이스를 공유 — propca 변경이 자동 전파됨 (design.md §12)
- **propca 옵션 카탈로그 동기화 (필수)**: propca-notion-style의 옵션(레이아웃/색상 변형/톤 프리셋/커버 변형/인라인 헬퍼)을 추가·제거·변경하면 [`themes/slide/propca-notion-style/README.md`](themes/slide/propca-notion-style/README.md)의 해당 표를 같은 커밋에서 갱신할 것
- 베이스(`themes/slide/tech-modern/slides/tech-modern.css`) 수정 시 다른 테마 파생본도 함께 갱신해야 회귀 일관성 보장
- 새 레이아웃 추가 위치:
  - 모든 테마 공용 → `tech-modern.css` 끝에 append + 다른 테마들에도 동일 append
  - 특정 테마 전용 → 해당 테마 CSS 끝에만 append
- 새 테마 추가 절차:
  1. `themes/slide/<brand>/` 폴더 + `slides/` 서브폴더 생성
  2. `tech-modern/slides/tech-modern.css` 복사 → `slides/<brand>.css` (첫 줄 `/* @theme <brand> */`로 치환)
  3. 파일 끝에 브랜드 토큰 override CSS append
  4. `tech-modern.md` 복사 → `slides/<brand>.md` (front matter `theme: <brand>`로 치환)
  5. `build/package.json`에 `build:<brand>` / `watch:<brand>` 스크립트 2행 추가
  6. `themes/slide/<brand>/design.md` 생성 (출처 + 토큰 요약)
  7. 위 테마 카탈로그 + theme-picker.md 키워드 매핑 갱신

---

## 브랜드 레이아웃 모델 (14 브랜드 테마)

`tech-modern`을 제외한 14 브랜드 테마는 **처음부터 설계된 자기완결형 CSS**다. 26개 공용 레이아웃(split/grid-3/stats/timeline 등)은 정의되어 있지 않다. 대신 각 테마가 **셸 3개 (`cover`/`section`/`end`) + 브랜드 고유 12개 레이아웃**의 자체 어휘를 가진다.

| 테마 | 브랜드 고유 12개 어휘 |
|---|---|
| `vercel` | mesh-cover, polarity-section, mono-statement, code-window, hairline-grid, polarity-pair, stack-shadow-feature, mesh-band, digit-marquee, code-pair, gradient-quote, mesh-end |
| `notion` | navy-cover, purple-section, sticky-notes, database-rows, pastel-blocks, yellow-banner, workspace-split, toggle-list, block-features, pastel-quote, pricing-blocks, signup-end |
| `claude` | serif-cover, editorial-section, editorial-spread, pull-quote-drop, coral-fullbleed, numbered-toc, tri-band, dark-mockup-card, author-bio, coral-vs-dark, serif-kpi, coral-thanks |
| `spotify` | glow-cover, green-section, album-grid, playlist-rows, now-playing, pill-cloud, green-cta, vinyl-quote, lyric-stanza, chart-toplist, dark-card-row, pulse-end |
| `stripe` | mesh-cover, indigo-section, polished-grid, code-dashboard, cream-band, tabular-stats, pricing-tier, indigo-cta, gradient-band, dual-mockup, ledger-row, cream-thanks |
| `figma` | mono-cover, block-section, color-blocks, marquee-strip, frame-badge, multiplayer-cursors, lilac-promo, comment-thread, template-tiles, mono-quote, navy-product, coral-end |
| `apple` | hero-product, dark-section, oversized-quote, spec-row, parchment-band, single-stat, product-pair, comparison-bar, palette-show, scroll-narrative, dim-section, soft-end |
| `linear` | void-cover, violet-section, issue-list, status-board, surface-grid, command-palette, keyboard-shortcut, milestone-timeline, cycle-progress, surface-quote, integration-row, void-end |
| `cursor` | editorial-cover, ide-section, ide-mockup, composer-chat, agent-timeline, diff-suggest, cream-grid, mono-feature, tab-stack, editor-pair, orange-cta, editorial-end |
| `raycast` | stripe-cover, surface-section, palette-hero, extension-row, keycap-feature, app-grid, pill-tabs, red-stripe, command-result, dark-stat, feature-split, keycap-end |
| `supabase` | mint-cover, night-section, sql-editor, schema-grid, dashboard-stack, log-stream, code-result, mono-stat, gh-badge, polished-grid, green-cta, night-end |
| `airbnb` | photo-cover, rausch-section, listing-grid, search-pill, rating-hero, host-card, reservation-split, review-pair, experience-tiles, amenity-row, city-grid, rausch-end |
| `nvidia` | hardware-cover, void-section, benchmark-bars, spec-table, corner-card-grid, large-numeric, hardware-hero, dual-chapter, link-row, green-stat, white-feature, void-end |
| `tesla` | vehicle-cover, carbon-section, gallery-hero, category-2up, spec-strip, vehicle-3up, dashboard-mockup, feature-callout, velocity-stat, chart-pair, frosted-nav, monochrome-end |

자세한 정의는 각 [`themes/slide/<theme>/design.md`](./themes/) §5 참조.

**자동 매칭 가능 deck 테마**: `propca-notion-style` (md-to-marp-propca 스킬, 37 전용 레이아웃 + 8 인라인 헬퍼 + 톤 프리셋 3종). 강의·교육·발표 컨텍스트 특화. 2026-06 신규 6종: `faq`/`code-focus`/`step-text`/`gallery-grid`/`content-sidebar`/`schedule`. 톤 프리셋(`tone-exec`/`tone-lecture`/`tone-seminar`)은 purpose 키워드(임원/강의/세미나)로 자동 선택. 색상 변형 3종(EMERALD/SLATE/OCEAN)은 front matter `theme:` 수동 지정 — [`themes/slide/propca-notion-style/design.md`](themes/slide/propca-notion-style/design.md) §14·§15 참조.

기존 14 브랜드 테마(`vercel`/`notion`/`claude`/`spotify`/`stripe`/`figma`/`apple`/`linear`/`cursor`/`raycast`/`supabase`/`airbnb`/`nvidia`/`tesla`)는 **자동 매칭 부재** — 사용자가 `<!-- _class -->`를 수동으로 작성한 MD에서만 사용 가능. `tech-modern`은 이번 워크플로 개편으로 자동 매칭 대상에서 제외됨 (구 `md-to-marp` tech-modern 휴리스틱 제거).

카드뉴스 모드는 `propca-notion-style-cards` 단일 테마 + 7 표준 카드 레이아웃(+ 14 확장), `md-to-marp` 오케스트레이터에 내장된 휴리스틱으로 매칭. 링크드인 키워드 매치 시 PDF 캐러셀 추가 산출.

---

## 카드뉴스 모드 (4:5 Threads/Instagram/LinkedIn)

위 16:9 deck 모드와 **별개의 파이프라인**. propca-notion-style 디자인 토큰(purple/navy/파스텔)을 그대로 계승하면서 1080×1350 세로 카드를 산출한다.

### 트리거 키워드

`purpose`에 다음 중 하나라도 매치되면 자동으로 `mode: card-news` 분기:
- 인스타 / insta / instagram / 쓰레드 / threads
- 카드뉴스 / card news / sns / 소셜 / social 카드
- 링크드인 / linkedin — 추가로 `output=pdf` (LinkedIn 문서 캐러셀용 PDF 병행 산출)

명시적 `/deck` 호출 시 `mode=card-news` 인자로도 지정 가능.

### 7개 카드 레이아웃

| 클래스 | 역할 | 트리거 |
|---|---|---|
| `card-cover` | 표지 | 첫 슬라이드 (강제) |
| `card-hook` | 후크/스와이프 유도 | H1 단독 + 본문 ≤1줄 + 후속 ≥3 |
| `card-point` | 요점 (반복) | H2 + 본문/ul/ol (기본 분기) |
| `card-quote` | 인용/권위 | blockquote 단독 |
| `card-list` | 나열형 (1~5) | ol 3~5 항목 |
| `card-cta` | 행동 유도 | 마지막 H1 + 팔로우/저장/@핸들/URL |
| `card-end` | 엔딩 | 마지막 슬라이드 (CTA 미해당) |

### 산출물 위치

| 종류 | 위치 |
|---|---|
| 변환물 | `output/slides-<slug>-cards.md` |
| 검수 HTML | `output/<slug>-cards.html` |
| 카드 PNG (1080×1350) | `output/<slug>-cards/<slug>-cards.NNN.png` |
| LinkedIn PDF (output=pdf) | `output/<slug>-cards.pdf` |
| QA 리포트 | `output/<slug>-cards.qa.md` |
| 디자인 출처 | `themes/card-news/propca-notion-style/design.md` |
| CSS | `themes/card-news/propca-notion-style/propca-notion-style-cards.css` |
| 샘플 원본 | `themes/card-news/propca-notion-style/sample.md` |

### 빌드 명령 (`build/`에서 — Windows/Linux 공통 한 줄)

```
# 1) HTML (검수용)
npx --yes @marp-team/marp-cli ../output/slides-<slug>-cards.md --html --allow-local-files -o ../output/<slug>-cards.html --theme-set ../themes/card-news/propca-notion-style

# 2) PNG 카드 (Threads/Instagram 업로드)
npx --yes @marp-team/marp-cli ../output/slides-<slug>-cards.md --images png --allow-local-files -o ../output/<slug>-cards/<slug>-cards.png --theme-set ../themes/card-news/propca-notion-style

# 3) PDF (LinkedIn 문서 캐러셀 — output=pdf일 때)
npx --yes @marp-team/marp-cli ../output/slides-<slug>-cards.md --pdf --allow-local-files -o ../output/<slug>-cards.pdf --theme-set ../themes/card-news/propca-notion-style
```

npm 스크립트(샘플 대상): `npm run build:cards` / `npm run cards:png` / `npm run cards:pdf` / `npm run watch:cards`.

`--theme-set`은 16:9 deck 모드와 **다른 경로**(`themes/card-news/propca-notion-style/`)를 사용. 두 CSS는 같은 폴더에 두지 않는다.

### 카드뉴스 모드 금지

- 16:9 클래스(`cover`/`section`/`split`/`grid-3`/`stats`/`timeline`/`compare`/`cards`/`agenda`/`bg-full`/`end`) 사용 금지 — `card-*` 네임스페이스만
- 슬라이드 10장 초과 금지 (캐러셀 상한)
- 본문 200자/8줄 초과 금지
- 본문 20pt 미만 폰트 금지 (모바일 가독성)
- CSS 토큰 외 인라인 HEX 색상 금지

## 검증 원칙

`marp-reviewer` 에이전트는 **독립 컨텍스트로 실행**되어야 합니다.
- 같은 세션의 변환 컨텍스트를 공유하지 말 것 (합리화 편향 회피)
- Agent 도구로 호출하고 결과(리포트)만 수령
- 파일 수정 권한은 reviewer에게 주지 말 것 (Read/Grep/Glob/Bash만)
