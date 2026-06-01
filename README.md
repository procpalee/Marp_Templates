# MD to PPT — Marp 슬라이드 자동 변환 워크플로우

옵시디언에서 작성한 블로그 글·실무 가이드·강의 자료를 한 줄 명령으로 **propca-notion-style** Marp HTML 슬라이드로 변환하는 Claude Code 워크플로우. 카드뉴스(4:5 Threads/Instagram) 모드도 지원.

---

## 사용법

Claude Code에서 이 폴더를 연 뒤:

```text
/marp sample/1. 클로드 엑셀 소개.md
```

watch 모드 (수정할 때마다 HTML 자동 재빌드):

```text
/marp sample/2. 설치 및 기본설정.md watch
```

카드뉴스 모드 (purpose에 `인스타`/`쓰레드`/`카드뉴스`/`sns` 키워드 매치 시 자동 분기):

```text
/marp content.md 인스타 카드뉴스용 7장
```

자동으로 다음이 일괄 수행됩니다:

1. **옵시디언 전처리** — `[[wikilinks]]`, `![[embeds]]`, `> [!NOTE]` 콜아웃, frontmatter, `#tag` 블록 등 정리 + 이미지 자산을 `output/<slug>/assets/`로 복사
2. **레이아웃 자동 매칭** — propca-notion-style 33 전용 레이아웃 + 8 인라인 헬퍼(`.callout`/`.tag`/`.kbd` 등) 휴리스틱 매칭
3. **Marp HTML 빌드** — `npx @marp-team/marp-cli`
4. **품질 QA** — 독립 컨텍스트 에이전트(marp-reviewer)가 검증
5. **자동 수정 재시도** — 이슈 발견 시 최대 2회 재빌드·재QA
6. **(선택) watch 프로세스 background 시작**

산출물 디렉토리(`output/<slug>/`)는 자기완결적:

```
output/<slug>/
  <slug>.cleaned.md   ← 옵시디언 정리본 (감사 추적)
  <slug>.marp.md      ← Marp 마크다운
  <slug>.html         ← 최종 HTML
  <slug>.qa.md        ← QA 리포트
  assets/             ← 복사된 이미지
```

다른 폴더로 옮겨도 이미지 깨지지 않음.

---

## 핵심 컴포넌트

| 컴포넌트 | 경로 | 역할 |
|---|---|---|
| 오케스트레이터 | `.claude/skills/md-to-marp/` | 모드 선택 + md-to-marp-propca 호출 + 빌드 + QA + 재시도 + watch |
| 변환 스킬 (통합) | `.claude/skills/md-to-marp-propca/` | 옵시디언 전처리 + propca-notion-style 33 레이아웃·8 헬퍼 자동 매칭 (한 스킬에서 일괄) |
| 검증 에이전트 | `.claude/agents/marp-reviewer.md` | 독립 컨텍스트 QA. theme front matter로 propca/card-news 분기 |
| 슬래시 명령 | `.claude/commands/marp.md` | `/marp <file> [watch] [용도]` 원샷 |
| 카드뉴스 캡션 | `.claude/commands/caption.md` | `/caption <slug>` Threads/LinkedIn용 캡션 초안 |
| 테마 폴더 | `themes/slide/<theme>/` | 테마별 design.md + slides/{css,md,html} 트리플 |
| 카드뉴스 폴더 | `themes/card-news/tech-modern/` | 4:5 카드뉴스 design.md + tech-modern-cards.css + sample.md |
| 빌드 인프라 | `build/` | `package.json` + `build.cmd` (marp-cli 래퍼) |

---

## 테마 카탈로그

| 테마 | 톤 | 자동 매칭 |
|---|---|---|
| `propca-notion-style` | 노션 + Navy + 보라색 액센트 (강의·교육·발표) | ✅ md-to-marp-propca (33 레이아웃) |
| `tech-modern` | 라이트 블루 (베이스, 일반 테크 발표) | ❌ 수동 `<!-- _class -->` |
| `vercel` | 모노크롬 블랙앤화이트 + 0070f3 (프론트엔드·배포·Next.js) | ❌ 수동 |
| `notion` | 퍼플 + 파스텔 카드 (문서·위키·워크스페이스) | ❌ 수동 |
| `claude` | 따뜻한 크림 + 코랄 세리프 (AI·리서치·에디토리얼) | ❌ 수동 |
| `spotify` | 다크 + 비비드 그린 (미디어·엔터테인먼트·콘텐츠) | ❌ 수동 |
| `stripe` | 프리미엄 인디고 + 그라데이션 메시 (핀테크·결제·SaaS B2B) | ❌ 수동 |
| `figma` | 블랙앤화이트 + 8색 파스텔 블록 (디자인 시스템·콜라보) | ❌ 수동 |
| `apple` | 화이트 + parchment + 단일 Action Blue (제품 키노트) | ❌ 수동 |
| `linear` | 다크 near-black + 라일락 + surface ladder (툴체인·생산성) | ❌ 수동 |
| `cursor` | 따뜻한 cream + 오렌지 + IDE mockup (AI-증강 IDE) | ❌ 수동 |
| `raycast` | 다크 + 4-step surface + 레드 stripe (런처·생산성) | ❌ 수동 |
| `supabase` | 화이트 + 민트 그린 + SQL/터미널 mockup (OSS 백엔드) | ❌ 수동 |
| `airbnb` | 코랄 + 사진 우선 + 64pt rating (호스피탈리티·마켓플레이스) | ❌ 수동 |
| `nvidia` | 풀블랙/화이트 + brand green + corner squares (하드웨어 AI) | ❌ 수동 |
| `tesla` | 화이트/카본 + Electric Blue + 풀-viewport hero (자동차) | ❌ 수동 |
| `tech-modern-cards` | 4:5 카드뉴스 (Threads/Instagram) | ✅ md-to-marp 오케스트레이터 (7 카드 레이아웃) |

**`/marp` 단독 호출은 propca-notion-style 또는 tech-modern-cards만 자동 변환.** 다른 14 브랜드 테마는 사용자가 직접 `<!-- _class -->`를 작성한 MD를 빌드하는 용도로 사용 (쇼케이스 슬라이드 어휘 학습용).

---

## propca-notion-style — 자동 매칭 어휘

deck 모드 기본 테마. 회계법인·자문사 강의/교육/발표 컨텍스트에 특화.

### 21 전용 레이아웃

**셸 (Shell)**: `cover`, `section`, `end`, `qa`, `thanks-contact`, `session-break`

**네비게이션**: `toc-split`

**시각 강조 / 인용**: `hero-quote`, `image-quote`

**비교 / 2 컬럼**: `compare`, `two-image`, `before-after`

**카드 / 블록**: `cards`, `pastel-blocks`, `block-features`

**데이터**: `database-rows`

**순서 / 흐름**: `timeline`, `vertical-timeline`, `roadmap`

**리스트 변형**: `toggle-list`, `icon-list`

### 8 인라인 헬퍼 (어디서나 `<div class>` / `<span class>`로 호출)

| 헬퍼 | 호출법 | 용도 |
|---|---|---|
| `.callout` | `<div class="callout {info\|success\|example\|warn\|danger}">...</div>` | 강조 박스 5종 |
| `.tag` | `<span class="tag {green\|yellow\|purple\|rose\|sky\|peach\|navy}">...</span>` | 상태 배지 7색 |
| `.chip` | `<span class="chip">...</span>` | 작은 라벨 |
| `.kbd` | `<span class="kbd">⌘</span>` | 키보드 키 캡 |
| `.divider` | `<div class="divider"></div>` | 가는 가로 구분선 |
| `.note` | `<div class="note">...</div>` | 조용한 메모 (callout보다 작은 톤) |
| `.cols-2` / `.cols-3` | `<div class="cols-2"><div>L</div><div>R</div></div>` | 인라인 다단 |
| `figure` | `<figure>![](url)<figcaption>...</figcaption></figure>` | 이미지 + 캡션 |

자세한 패턴은 [`themes/slide/propca-notion-style/design.md`](themes/slide/propca-notion-style/design.md), 자동 매칭 규칙은 [`.claude/skills/md-to-marp-propca/references/layout-heuristics.md`](.claude/skills/md-to-marp-propca/references/layout-heuristics.md) 참조.

---

## 폴더 구조

```
.
├── .claude/
│   ├── agents/marp-reviewer.md           # 독립 QA 에이전트
│   ├── commands/
│   │   ├── marp.md                       # /marp 슬래시 명령
│   │   └── caption.md                    # /caption 슬래시 명령 (카드뉴스용)
│   └── skills/
│       ├── md-to-marp/                   # 오케스트레이터
│       └── md-to-marp-propca/            # 옵시디언 전처리 + propca 자동 매칭 (통합)
├── themes/
│   ├── slide/
│   │   ├── propca-notion-style/          # 자동 매칭 가능 deck 테마
│   │   │   ├── design.md
│   │   │   ├── propca-notion-style.css
│   │   │   ├── propca-notion-style.md    # 쇼케이스 (모든 33 레이아웃 데모)
│   │   │   └── propca-notion-style.html
│   │   ├── tech-modern/                  # 베이스 (수동 _class만)
│   │   └── <14 브랜드 테마>/              # vercel / notion / claude / spotify 등
│   └── card-news/tech-modern/            # 4:5 카드뉴스
├── build/
│   ├── build.cmd                         # marp-cli 래퍼
│   ├── publish.cmd                       # Threads/LinkedIn 게시 진입점
│   ├── package.json                      # build:<theme> 스크립트
│   └── node_modules/                     # marp-cli + dotenv
├── sample/                               # 옵시디언 노트 샘플 (테스트용)
├── output/                               # 사용자 변환물 (자기완결적 슬러그 디렉토리)
│   └── <slug>/
│       ├── <slug>.cleaned.md
│       ├── <slug>.marp.md
│       ├── <slug>.html
│       ├── <slug>.qa.md
│       └── assets/
├── procpa_logo_dark.png                  # 로고 (cover 슬라이드용)
├── CLAUDE.md                             # 프로젝트 규칙 (자동 로드)
├── docs/PUBLISH_SETUP.md                 # 카드뉴스 SNS 게시 토큰 설정 가이드
└── .gitignore
```

---

## 수동 빌드

쇼케이스 / 테마 개발용:

```cmd
cd build
npm run build:propca-notion-style    # ../themes/slide/propca-notion-style/propca-notion-style.html
npm run build:tech-modern            # ../themes/slide/tech-modern/slides/tech-modern.html
npm run build:vercel                 # ../themes/slide/vercel/slides/vercel.html
npm run build:notion                 # ../themes/slide/notion/slides/notion.html
npm run build:claude                 # ../themes/slide/claude/slides/claude.html
:: ... 그 외 15 테마 모두 동일 패턴
```

watch 모드 (테마 CSS 수정 시 자동 재빌드):
```cmd
cd build
npm run watch:propca-notion-style
```

옵션 (직접 `npx` 호출 시):
- `--theme-set ..\themes\slide` — 폴더 재귀 스캔으로 모든 `<theme>.css` 자동 등록
- `--allow-local-files` — 로컬 이미지·CSS 접근 허용 (필수)
- `--html` — 인라인 `<div>` 파싱 활성화 (필수)

---

## 카드뉴스 모드 (4:5 Threads/Instagram)

별도 파이프라인. tech-modern 디자인 토큰을 계승하면서 1080×1350 세로 카드를 산출.

### 7 카드 레이아웃

| 클래스 | 역할 | 트리거 |
|---|---|---|
| `card-cover` | 표지 | 첫 슬라이드 (강제) |
| `card-hook` | 후크/스와이프 유도 | H1 단독 + 본문 ≤1줄 + 후속 ≥3 |
| `card-point` | 요점 (반복) | H2 + 본문/ul/ol (기본 분기) |
| `card-quote` | 인용/권위 | blockquote 단독 |
| `card-list` | 나열형 (1~5) | ol 3~5 항목 |
| `card-cta` | 행동 유도 | 마지막 H1 + 팔로우/저장/@핸들/URL |
| `card-end` | 엔딩 | 마지막 슬라이드 (CTA 미해당) |

### 워크플로

```
/marp <원본.md> 인스타 카드뉴스   →  PNG 7장 + HTML 빌드
/caption <slug>                   →  .caption.md 초안 (LLM 자동 + 사용자 수정)
npm run publish:cards <slug>      →  PDF 빌드 + Threads + LinkedIn 게시 + log
```

### 산출물

| 파일 | 위치 |
|---|---|
| Threads 캐러셀 (PNG) | `output/<slug>-cards/<slug>-cards.NNN.png` |
| LinkedIn Document Share (PDF) | `output/<slug>-cards/<slug>-cards.pdf` |
| 캡션 (플랫폼별) | `output/<slug>-cards/<slug>-cards.caption.md` |
| 게시 이력 | `output/<slug>-cards/publish.log` |

SNS 자동 게시(Threads + LinkedIn) 토큰 설정: [`docs/PUBLISH_SETUP.md`](./docs/PUBLISH_SETUP.md).

---

## 브랜드 테마 어휘 (수동 `_class` 전용)

`tech-modern`을 제외한 14 브랜드 테마는 **처음부터 설계된 자기완결형 CSS**다. 공용 레이아웃(split/grid-3 등)은 정의되어 있지 않고, 각 테마가 **셸 3개 (`cover`/`section`/`end`) + 브랜드 고유 12개**의 자체 어휘를 가진다.

| 테마 | 12 브랜드 어휘 |
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

마크다운 예시는 각 테마의 `slides/<theme>.md` 쇼케이스와 [`themes/slide/<theme>/design.md`](./themes/) §5 참조.

---

## 검증 원칙

`marp-reviewer` 에이전트는 **독립 컨텍스트로 실행**됩니다:
- 같은 세션의 변환 컨텍스트를 공유하지 않음 (합리화 편향 회피)
- Agent 도구로 호출하고 결과(리포트)만 수령
- 파일 수정 권한은 reviewer에게 주지 않음 (Read/Grep/Glob/Bash만)
- theme 인지 분기: `propca-notion-style` / `tech-modern-cards`별 다른 체크리스트
- **어휘 방화벽**: tech-modern 26 클래스명(`grid-3`/`stats`/`bg-full` 등) 등장 시 즉시 FAIL

---

## 라이선스 / 출처

- 14 브랜드 테마(`vercel`/`notion`/`claude`/`spotify`/`stripe`/`figma`/`apple`/`linear`/`cursor`/`raycast`/`supabase`/`airbnb`/`nvidia`/`tesla`)의 디자인 토큰은 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT)의 design.md 콜렉션을 참고. 색·타이포 토큰만 차용했으며 원본 브랜드 로고·상표는 사용하지 않음.
- `tech-modern` 베이스 테마와 `propca-notion-style` deck 테마는 자체 제작.
- ProcPA 로고(`procpa_logo_dark.png`)는 propca-notion-style cover 슬라이드에서만 사용.
