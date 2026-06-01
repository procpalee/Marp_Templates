# NVIDIA — Slide Design System

**출처:** [VoltAgent/awesome-design-md / nvidia](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/nvidia.css`](slides/nvidia.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**NVIDIA** — NVIDIA Green `#76b900` + 풀블랙 hero / 화이트 body 교차 + 12×12px **corner squares** 시그니처 + 큰 numerics + hairline only. 16:9.
하드웨어·GPU·AI 컴퓨트·데이터센터·spec sheet 발표용.

---

## §1. Brand & Tone

- **용도:** 하드웨어/GPU launch, AI 컴퓨트 발표, spec sheet, benchmark, GTC 키노트, technical doc, 솔루션 deck
- **톤:** industrial · precision · hardware-first · two-mode (black/white)
- **타깃 청중:** 엔지니어/AI 인프라/하드웨어 PM/데이터센터 설계자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--green` | `#76b900` | NVIDIA Green — corner squares, large numerics, CTA, accent |
| `--green-dark` | `#5a8d00` | 호버, link, strong |
| `--green-pale` | `#bff230` | accent variant |
| `--green-glow` | `rgba(118,185,0,0.18)` | highlight row, badge bg |
| `--canvas` | `#ffffff` | 슬라이드 배경 (body chapter) |
| `--canvas-soft` | `#f7f7f7` | section divider, soft surface |
| `--dark` | `#000000` | hero/footer chapter (pure black) |
| `--dark-elev` | `#1a1a1a` | 다크 elevated surface |
| `--dark-soft` | `#2a2a2a` | (예비) |
| `--ink` | `#000000` | 본문 헤드라인 (pure black) |
| `--ink-body` | `#1a1a1a` | 본문 |
| `--ink-mute` | `#555555` | 보조 |
| `--ink-sub` | `#888888` | 캡션 |
| `--on-dark` | `#ffffff` | 다크 위 텍스트 |
| `--on-dark-mute` | `#aaaaaa` | 다크 보조 |
| `--hairline` | `#cccccc` | 1px 보더 (라이트) |
| `--hairline-soft` | `#e0e0e0` | 미세 분리선 |
| `--hairline-strong` | `#5e5e5e` | 다크 보더 |
| `--link-blue` | `#0046a4` | 본문 prose link 한정 |

---

## §3. Typography

- `--font-display`: `'NVIDIA-EMEA', 'Inter', 'Pretendard', Arial, Helvetica, sans-serif`
  - NVIDIA-EMEA 비공개. Arial로 fallback (시그니처 sans-serif feel)
- `--font-text`: 동일
- `--font-mono`: `'JetBrains Mono', 'SF Mono', ui-monospace, monospace`
- **weights 400/700 only** — italic 없음, display variant 없음
- 헤드라인 weight 700 + 음의 자간 `-0.02em ~ -0.04em`
- 본문 16pt / 1.5
- Large numerics: 72~220pt 700 weight green

---

## §4. Signature 요소

### Corner squares (브랜드 identity ornament)
12×12px solid NVIDIA Green 정사각형이 카드/슬라이드의 **4 코너에 위치**. `::before` + `::after` + `box-shadow`로 4 코너 마커 구현.
- `hardware-cover`, `void-section`, `void-end`, `hardware-hero`, `white-feature` — 슬라이드 4 코너에 1280×720 기준
- `corner-card-grid` — 각 카드에 4 코너에

### Two-mode 교차 페이싱
black `#000000` hero/footer chapter ↔ white `#ffffff` body chapter (64px section 간격). 보더 없이 surface 대비로 페이지 리듬.

### Large numerics
display 200pt+ green numeric (large-numeric, void-section)이 hero. spec/benchmark는 모두 green으로 강조.

### Hairline borders only (no shadows)
1px solid `#cccccc` (라이트) / `#5e5e5e` (다크). 모든 카드/표/패널은 hairline으로 구분. **그림자 절대 금지**.

### 64px section padding
모든 페이지·섹션 간 64px (technical documentation pacing).

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `hardware-cover` | 풀블랙 + 4 corner squares + 64pt + GPU 다이 placeholder (우측) |
| 2 | `void-section` | 풀블랙 + 4 corner squares + 168pt green 챕터 번호 |
| 3 | `benchmark-bars` | bar chart with single green highlight ("4× faster") |
| 4 | `spec-table` | dense spec table (TFLOPS/Memory/Bandwidth/TDP) + green highlight row |
| 5 | `corner-card-grid` | 3-up 화이트 카드 + 각 카드 4 corner squares |
| 6 | `large-numeric` | 단일 220pt green numeric 가운데 + super caption |
| 7 | `hardware-hero` | 좌 copy + 우 GPU 다이 placeholder (다크 + corner squares) |
| 8 | `dual-chapter` | 50/50 다크 hero + 화이트 spec table |
| 9 | `link-row` | 6-col dense footer-style 링크 그리드 |
| 10 | `green-stat` | 4 KPI row + 72pt green numerics + 상단 green 2px border |
| 11 | `white-feature` | 화이트 + 4 corner squares + 52pt + green 사각 CTA |
| 12 | `void-end` | 풀블랙 + 4 corner squares + green eyebrow + 72pt + "Read more →" |

### 셸 3개 (shell)
- `cover` — 화이트 + 60pt (기본 표지)
- `section` — canvas-soft + hairline + 96pt 챕터
- `end` — 화이트 + 60pt (기본 폐막)

---

## §6. Don'ts

- 그림자 추가 금지 — 모든 깊이는 hairline 또는 surface 대비
- 그라데이션 사용 금지 (GPU 다이 placeholder 내부 grid pattern 예외 — 데이터 표현)
- NVIDIA Green `--green` 외 액센트 컬러 추가 금지 (단일 voltage)
- italic 사용 금지 (시스템에 italic variant 없음)
- 풀-블랙 외 다크 사용 금지 (`#000000` 표준, `#272729` 같은 회색 다크 금지)
- mid-gray 텍스트 위계 만들지 말 것 — `--ink-mute`/`--ink-sub` 토큰 사용
- corner squares를 부분적으로 (1, 2 개) 만들지 말 것 — 4 코너 모두 또는 0개
- 알약(pill) 버튼 사용 금지 — 사각 0~4px radius
