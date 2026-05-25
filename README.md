# MD to PPT — Marp 슬라이드 자동 변환 워크플로우

마크다운 원본 + 용도 한 줄을 입력하면, 적절한 테마를 자동 선택하고 Marp HTML 슬라이드로 변환하는 Claude Code 워크플로우.

---

## 사용법

Claude Code에서 이 폴더를 연 뒤:

```text
/deck path/to/your-file.md "임원 IR 발표용 30분"
```

또는 자연어:

```text
path/to/your-file.md 를 Vercel 풍 배포 발표용 슬라이드로 만들어줘
```

자동으로 다음이 일괄 수행됩니다:

1. **테마 자동 선택** — 용도에서 키워드 추출 (Vercel → `vercel`, 워크스페이스 → `notion`)
2. **MD → Marp MD 변환** — `tech-modern` 26개 공용 레이아웃에 자동 매칭 (브랜드 테마는 수동 `<!-- _class -->`)
3. **HTML 빌드** — `npx @marp-team/marp-cli`
4. **품질 QA** — 독립 컨텍스트 에이전트가 검증
5. **자동 수정 재시도** — 이슈 발견 시 최대 2회 재빌드

산출물:
- 변환된 Marp 마크다운
- 빌드된 HTML
- QA 리포트

---

## 테마 카탈로그

| 테마 | 톤 | 용도 |
|---|---|---|
| `tech-modern` | 라이트 블루 | 베이스 / 일반 테크 발표 (fallback) |
| `vercel` | 모노크롬 블랙앤화이트 + 0070f3 | 프론트엔드 · 배포 · Next.js |
| `notion` | 퍼플 + 파스텔 카드 | 문서 · 위키 · 워크스페이스 |
| `claude` | 따뜻한 크림 + 코랄 세리프 | AI · 리서치 · 에디토리얼 |
| `spotify` | 다크 + 비비드 그린 | 미디어 · 엔터테인먼트 · 콘텐츠 |
| `stripe` | 프리미엄 인디고 + 그라데이션 메시 | 핀테크 · 결제 · SaaS B2B |
| `figma` | 블랙앤화이트 + 8색 파스텔 블록 | 디자인 시스템 · 콜라보 · 디자인 툴 |
| `apple` | 화이트 + parchment + 단일 Action Blue | 제품 키노트 · 신제품 launch |
| `linear` | 다크 near-black + 라일락 + surface ladder | 툴체인 · 이슈트래커 · 생산성 |
| `cursor` | 따뜻한 cream + 오렌지 + IDE mockup | AI-증강 IDE · 에이전트 데모 |
| `raycast` | 다크 + 4-step surface + 레드 stripe | 런처 · 명령 팔레트 · 키보드 우선 |
| `supabase` | 화이트 + 민트 그린 + SQL/터미널 mockup | OSS 백엔드 · Postgres · 데이터 |
| `airbnb` | 코랄 + 사진 우선 + 64pt rating | 호스피탈리티 · 마켓플레이스 · 여행 |
| `nvidia` | 풀블랙/화이트 + brand green + corner squares | 하드웨어 · GPU · 데이터센터 · spec |
| `tesla` | 화이트/카본 + Electric Blue + 풀-viewport hero | 자동차 · EV · 럭셔리 모노크롬 |

용도 → 테마 매핑은 [`.claude/skills/md-to-deck/references/theme-picker.md`](.claude/skills/md-to-deck/references/theme-picker.md) 참고.

명시적 오버라이드: `theme=cursor` 처럼 지정하면 자동 선택을 건너뜁니다.

---

## 폴더 구조

```
.
├── .claude/
│   ├── agents/marp-deck-reviewer.md   # 독립 QA 에이전트
│   ├── commands/deck.md               # /deck 슬래시 명령
│   └── skills/
│       ├── md-to-deck/                # 오케스트레이터 (테마+빌드+QA)
│       └── md-to-marp/                # MD → Marp MD 변환
├── themes/
│   ├── tech-modern/
│   │   ├── design.md                  # 베이스 디자인 시스템
│   │   └── slides/{tech-modern.css, .md, .html}
│   ├── vercel/                        # VoltAgent Vercel DESIGN.md 기반
│   ├── notion/                        # VoltAgent Notion DESIGN.md 기반
│   ├── claude/                        # VoltAgent Claude DESIGN.md 기반
│   └── spotify/                       # VoltAgent Spotify DESIGN.md 기반
├── build/
│   ├── build.cmd                      # marp-cli 래퍼
│   ├── package.json                   # build:<theme> 스크립트
│   └── node_modules/                  # marp-cli
├── output/                            # 사용자 변환물 출력 (선택)
├── CLAUDE.md                          # 프로젝트 규칙 (자동 로드)
└── .gitignore
```

각 테마는 자기완결형 트리플: `design.md` + `slides/<theme>.css` + `slides/<theme>.md`. 빌드 시 `slides/<theme>.html`이 추가됩니다.

---

## 수동 빌드

```cmd
cd build
npm run build:vercel        # ../themes/slide/vercel/slides/vercel.html
npm run build:notion        # ../themes/slide/notion/slides/notion.html
npm run build:claude        # ../themes/slide/claude/slides/claude.html
npm run build:spotify       # ../themes/slide/spotify/slides/spotify.html
npm run build:tech-modern   # ../themes/slide/tech-modern/slides/tech-modern.html
```

watch 모드 (변경 시 자동 재빌드):
```cmd
cd build
npm run watch:vercel
```

옵션 (직접 호출 시):
- `--theme-set ..\themes` — 폴더 재귀 스캔으로 모든 `<theme>.css` 자동 등록
- `--allow-local-files` 누락 시 PDF에서 로컬 이미지 누락
- `--html` 필수 (인라인 `<div>` 파싱 활성화)

---

## 브랜드 레이아웃 어휘 (셸 3 + 고유 12)

`vercel`, `notion`, `claude`, `spotify` 4 테마는 `tech-modern`을 상속하지 않은 **처음부터 설계된 자기완결형 CSS**다. 26개 공용 레이아웃은 정의되어 있지 않고, 각 테마가 **셸 3개 (`cover`/`section`/`end`) + 브랜드 고유 12개**의 자체 어휘를 가진다.

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

마크다운 사용 예시는 각 테마의 `slides/<theme>.md` 쇼케이스와 [`themes/slide/<theme>/design.md`](./themes/) §5 참조.

---

## 라이선스 / 출처

- 4개 브랜드 테마 (`vercel`, `notion`, `claude`, `spotify`)의 디자인 토큰은 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT) 의 design.md 콜렉션을 참고했습니다. 색·타이포 토큰만 차용했으며, 원본 브랜드 로고·상표는 사용하지 않습니다.
- `tech-modern` 베이스 테마는 자체 제작.

---

## 핵심 컴포넌트

| 컴포넌트 | 경로 | 역할 |
|---|---|---|
| 변환 스킬 | `.claude/skills/md-to-marp/` | MD → Marp MD (tech-modern 26 공용 레이아웃 자동 매칭) |
| 오케스트레이터 | `.claude/skills/md-to-deck/` | 테마 선택 + 빌드 + QA + 재시도 |
| 검증 에이전트 | `.claude/agents/marp-deck-reviewer.md` | 독립 컨텍스트 QA |
| 슬래시 명령 | `.claude/commands/deck.md` | `/deck <file> [용도]` |
| 5 테마 트리플 | `themes/slide/<theme>/{design.md, slides/}` | 디자인 문서 + CSS/MD/HTML |
