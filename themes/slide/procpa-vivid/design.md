# procpa-vivid — Slide Design System

**출처:** procpa.co.kr 블로그 디자인 시스템 (저장소 [`procpalee/procpa_obsidian_style`](https://github.com/procpalee/procpa_obsidian_style), `src/app/globals.css`).
**혈통:** Apple × CMDS 에디토리얼 문서 구조를 vivid-blue 아이덴티티로 retone. 브랜드 로고·상표는 사용하지 않음.

---

## §0. 한 줄 요약

procpa-vivid — 화이트 캔버스 + Vivid Blue `#2563eb` 단일 강조색 + 헤어라인 에디토리얼 레이아웃. 모던·전문 발표(회계·재무·AI 생산성)용. propca-notion-style(파스텔·스티키·네이비, 친근형)과 **별개의 미감** — 깔끔·미니멀.

---

## §1. Brand & Tone

- **용도:** 모던/전문 발표, 제품·전략 브리핑, 기술 강연, 블로그(procpa.co.kr) 톤 일관성
- **톤:** 미니멀·에디토리얼·신뢰감. 그림자 없음, 여백과 헤어라인으로 깊이
- **타깃 청중:** 임원·전문가·일반 청중 공통 (고대비 화이트 + 큰 타입)

---

## §2. Color Tokens (LIGHT — "Vivid Blue")

| Token | HEX | 용도 |
|---|---|---|
| `--canvas` | `#ffffff` | 기본 슬라이드 배경 |
| `--canvas-soft` | `#f4f6f9` | muted 표면 (코드·thead·section 배경) |
| `--card` | `#ffffff` | 카드 배경 |
| `--ink` | `#0c0e12` | 본문 (쿨 near-black) |
| `--ink-mute` | `#4a5160` | 보조 텍스트 |
| `--ink-sub` | `#8a90a0` | 라벨·메타 (3차) |
| `--blue` | `#2563eb` | **단일 강조색** — 링크·eyebrow·콜아웃·CTA |
| `--blue-hover` | `#3b82f6` | hover / 다크 위 강조어 |
| `--blue-soft` | `#eff5ff` | accent wash (콜아웃·단계 배지 배경) |
| `--hairline` | `#e6e9ee` | 보더·구분선 |
| `--hairline-strong` | `#d4d8df` | 강조 보더 |
| `--destructive` | `#c2410c` | 경고 (예약) |
| `--chart-1..5` | `#2563eb→#3b82f6→#60a5fa→#94a3b8→#cbd5e1` | 차트 ramp |

다크 "Bright Royal"(`#5b9cff` on `#0b0e13`)은 블로그에 존재하나 본 테마 1차 범위에서 제외 (후속).

---

## §3. Typography

- `--font-sans`: `'Pretendard Variable', Pretendard, 'Noto Sans KR', ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `var(--font-sans)` (모노=sans alias, 숫자에 `tabular-nums`)
- 본문: 18pt / line-height 1.6 / letter-spacing -0.011em
- h1(콘텐츠 타이틀): 34pt / 700 / **하단 헤어라인** (에디토리얼 구분)
- h2: 22pt / 600 / ink-mute
- h3: 18pt / 600
- h4 = **대문자 eyebrow 라벨** (12pt, +0.06em, ink-sub) — 또는 `.eyebrow`(블루)
- 셸 타이틀: cover/end 56pt, section 88pt 챕터 번호

라디우스 스케일: `--radius` 11px 기준 sm 7 / md 9 / lg 11 / xl 16.

---

## §4. Signature 요소 (블로그 globals.css 충실 이식)

1. **헤어라인 타이틀** — 콘텐츠 슬라이드 h1 아래 1px 구분선 + 큰 여백 (블로그 h2 border-top 리듬을 슬라이드 타이틀로 적응)
2. **eyebrow 라벨** — 대문자 + tracking, 블루(`.eyebrow`) 또는 grey(h4)
3. **블루 콜아웃 blockquote** — 좌 3px `--blue` + `color-mix(blue 8%)` wash + 우측만 radius, 비이탤릭
4. **토큰칩 인라인 코드** — `--canvas-soft` 배경 + 헤어라인 보더 + radius-sm (블루 아님)
5. **보더 테이블** — 보더 + thead `--canvas-soft` + overflow-hidden, th 대문자 라벨
6. **tabular-nums** — KPI·페이지번호·번호 배지 숫자 정렬
7. **링크 밑줄 채움** — 30% 밑줄 → hover 시 full
8. **단일 강조색** — Vivid Blue 1종. 그림자·그라데이션 없음.

---

## §5. 12 Brand Layouts (+ 셸 3)

수동 `<!-- _class: -->` 지정. 자동매칭(md-to-marp) 비대상 — 후속 과제.

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `toc` | 에디토리얼 목차 — 헤어라인 구분 번호 행 (제목 + em 설명) |
| 2 | `statement` | ink 캔버스 대형 선언 슬라이드 + 블루 강조어 (punctuation) |
| 3 | `metric-row` | 2~4 대형 tabular-num KPI + eyebrow 라벨 + 캡션 |
| 4 | `callout-hero` | 블루 콜아웃 전면 인용 (출처 행 포함) |
| 5 | `split` | 50/50 2단 + 중앙 헤어라인 (`.cols > div × 2`) |
| 6 | `feature-cards` | 3 보더 카드 (`.cards > .card`, 카드별 블루 eyebrow) |
| 7 | `comparison` | 보더 테이블 비교 (첫 컬럼 속성 강조) |
| 8 | `code-focus` | 대형 코드 카드 + 에디터 상단 바(신호등 점) |
| 9 | `steps` | 번호 단계 스택 + 블루 원형 배지 + 헤어라인 |
| 10 | `quote` | 출처 동반 인용 (상단 블루 액센트 바) |
| 11 | `image-split` | `![bg left]` + 우측 `.body` 본문 (에디토리얼) |
| 12 | `closing-cta` | 블루 pill 버튼 + 핸들/URL (상단 블루 헤어라인) |

### 셸 3개 (shell)
- `cover` — 화이트 + 상단 2px 블루 헤어라인 + eyebrow + 56pt 타이틀 + 메타
- `section` — `--canvas-soft` 배경 + 88pt 챕터 번호 + 블루 subhead
- `end` — cover 미러 폐막

---

## §6. Don'ts

- **파스텔·스티키노트·네이비 hero 금지** — 그것은 propca-notion-style. procpa-vivid는 화이트 + 단일 블루
- 강조색 2종 이상 금지 (Vivid Blue 단일)
- 그림자·그라데이션 금지 — 깊이는 헤어라인 + 여백
- `statement`의 ink 배경은 punctuation 1~2장 한정 (다크 모드 아님)
- 인라인 코드는 블루 텍스트 아님 (토큰칩 = ink + muted 배경)
- `image-split`에서 `.body`에 별도 width 지정 금지 (Marpit `![bg left]`가 이미 우측 절반으로 제한)

---

## §7. 빌드

```
cd build
npm run build:procpa-vivid     # 1회 빌드
npm run watch:procpa-vivid     # 변경 감지
```

`--theme-set ../themes/slide` 재귀 스캔이 `procpa-vivid.css`를 자동 등록.
