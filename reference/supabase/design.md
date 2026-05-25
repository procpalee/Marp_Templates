# Supabase — Slide Design System

**출처:** [VoltAgent/awesome-design-md / supabase](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/supabase.css`](slides/supabase.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Supabase** — 화이트 canvas + 단일 emerald `#3ecf8e` + 다크 night `#1c1c1c` 코드 surface + SQL/dashboard/log mockup 중심 dev-tool 톤. 16:9.
오픈소스 백엔드·Postgres·BaaS·개발자 컨퍼런스 발표용.

---

## §1. Brand & Tone

- **용도:** 오픈소스 백엔드 데모, Postgres/DB 발표, 개발자 컨퍼런스, BaaS launch, RLS·realtime·vector 데모
- **톤:** open-source · dev-first · monochrome + 단일 emerald · 코드/UI mockup 중심
- **타깃 청중:** 풀스택 개발자/백엔드 엔지니어/스타트업 CTO

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--emerald` | `#3ecf8e` | **유일한 브랜드 액센트** — CTA, dot, chart, accent |
| `--emerald-deep` | `#24b47e` | 호버, strong, link |
| `--emerald-soft` | `#4ade80` | 보조 chart |
| `--emerald-glow` | `rgba(62,207,142,0.18)` | 글로우, badge bg |
| `--canvas` | `#ffffff` | 슬라이드 배경 (브랜드는 화이트에 commit) |
| `--canvas-soft` | `#fafafa` | section divider, code chip |
| `--night` | `#1c1c1c` | 코드 블록, dark surface |
| `--night-soft` | `#202020` | terminal variant |
| `--night-elev` | `#2a2a2a` | (예비) |
| `--ink` | `#171717` | 본문/헤드라인 |
| `--ink-mute` | `#707070` | 본문 보조 |
| `--ink-faint` | `#b2b2b2` | 캡션, table 보조 |
| `--on-night` | `#ededed` | 다크 위 텍스트 |
| `--on-night-mute` | `#8b8b8b` | 다크 보조 |
| `--on-primary` | `#171717` | emerald CTA 위 텍스트 (near-black, not white) |
| `--hairline` | `#dfdfdf` | 1px 보더 |
| `--hairline-cool` | `#ededed` | 미세 분리선 |
| `--hairline-night` | `#2a2a2a` | 다크 보더 |
| `--semantic-blue` | `#3ecbff` | log info |
| `--semantic-red` | `#ed4444` | log error |

---

## §3. Typography

- `--font-display`: `'Circular', 'Inter', 'Pretendard', system-ui, sans-serif`
  - Circular 비공개. Inter로 fallback
- `--font-text`: 동일
- `--font-mono`: `'Menlo', 'Monaco', 'JetBrains Mono', 'Consolas', ui-monospace, monospace` (system mono 우선)
- 헤드라인 weight 500 + 음의 자간 `-0.035em ~ -0.045em`
- 본문 16pt / 1.55

---

## §4. Signature 요소

### "The brand commits to white"
- 그라데이션·photography·다크 마케팅 트랙 없음
- 단 코드 블록과 `night-section`/`night-end` 셸 변형은 의도적 dark surface

### 정사각 6px radius (no pill)
모든 버튼은 사각 6px (`green-cta`도 알약 아님). 알약은 Supabase 디자인 어휘에 없음.

### 단일 emerald accent
emerald는 한 슬라이드에 한 번만 (CTA, chart line, dot, badge 중 1개). 다중 emerald 금지.

### Composited product mockups
`sql-editor`, `schema-grid`, `dashboard-stack`, `log-stream`, `code-result` 모두 실제 Supabase Studio UI 모방. 마케팅의 핵심 데코.

### 64–96px section padding
모든 섹션 간 64~96px (`tech-modern` 70px과 다름).

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `mint-cover` | white + 76pt + 작은 emerald dot (글로우) eyebrow |
| 2 | `night-section` | 풀 night `#1c1c1c` + 144pt emerald 챕터 번호 |
| 3 | `sql-editor` | SQL editor mockup (toolbar + query + result table + footer) |
| 4 | `schema-grid` | 3 스키마 table 박스 (이름 + 컬럼 row + PK/FK key icon) |
| 5 | `dashboard-stack` | 2 stacked dashboard 패널 (chart + table) |
| 6 | `log-stream` | 터미널 log mockup (timestamp + level + msg + highlight) |
| 7 | `code-result` | supabase-js 코드 + 실행 result box 페어 |
| 8 | `mono-stat` | 4 KPI row + emerald mono numerals + hairline 위 |
| 9 | `gh-badge` | 4 GitHub 배지 (star/fork/issue/contributor) |
| 10 | `polished-grid` | 3-up white 카드 + hairline + 6px radius + emerald glyph |
| 11 | `green-cta` | 가운데 emerald 정사각 6px CTA |
| 12 | `night-end` | 다크 폐막 + emerald dot 펄스 (글로우 shadow) |

### 셸 3개 (shell)
- `cover` — white + 64pt Circular (기본 표지)
- `section` — canvas-soft + hairline 위/아래 + 88pt 챕터
- `end` — white + 60pt (기본 폐막)

---

## §6. Don'ts

- 알약(pill) 버튼 만들지 말 것 — 모든 CTA는 `radius: 6px` 사각
- emerald 외 인터랙티브 액센트 추가 금지 (단일 액센트 규율)
- 그라데이션 배경 사용 금지 (chart fill 글로우 예외)
- 마케팅 photography 사용 금지 (UI mockup 중심)
- 다크 마케팅 트랙 만들지 말 것 (cover/end는 화이트 우선, night는 section/end 한정)
- mid-gray로 위계 만들지 말 것 — `--ink-mute`/`--ink-faint` 토큰 사용
- 코드 블록을 라이트 배경으로 만들지 말 것 (`--night` 유지)
- emerald CTA 위 텍스트를 흰색으로 만들지 말 것 (near-black `--on-primary` 사용)
