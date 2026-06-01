# Spotify — Slide Design System

**출처:** [VoltAgent/awesome-design-md / Spotify](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/spotify.css`](slides/spotify.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Spotify** — 다크 베이스 `#121212` + 비비드 그린 `#1ed760` + 알약 지오메트리. 16:9.
미디어·엔터테인먼트·오디오·콘텐츠 큐레이션. **다크 전용** — 라이트 모드 없음.

---

## §1. Brand & Tone

- **용도:** 미디어 발표, 엔터테인먼트 피치, 콘텐츠 큐레이션, 오디오 제품 데모
- **톤:** bold · vivid · dark · content-first
- **타깃 청중:** 마케터/콘텐츠 PM/크리에이터/스트리밍 관계자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--green` | `#1ed760` | 강조 · h3 · link · CTA · glow |
| `--green-alt` | `#1db954` | 그라데이션 stop |
| `--blue-info` | `#539df5` | info 액센트 |
| `--warn` | `#ffa42b` | 경고 |
| `--error` | `#f3727f` | 에러 |
| `--near-black` | `#121212` | 슬라이드 배경 |
| `--surface` | `#181818` | 카드 |
| `--surface-mid` | `#1f1f1f` | 행/헤더 background |
| `--surface-card` | `#252525` | 강한 카드 |
| `--surface-card-2` | `#2a2a2a` | elevation 변형 |
| `--ink` | `#ffffff` | 본문 |
| `--ink-mute` | `#b3b3b3` | 보조 (Silver) |
| `--ink-sub` | `#7c7c7c` | 캡션 |
| `--border` | `#4d4d4d` | 진한 보더 |
| `--border-soft` | `#2a2a2a` | 부드러운 보더 |

### Effect tokens
- `--shadow-card`: `0 8px 24px rgba(0,0,0,0.55)` — 카드 무게감
- `--shadow-dialog`: `0 20px 60px rgba(0,0,0,0.7)` — 대화상자
- `--glow-green`: `0 0 28px rgba(30,215,96,0.45)` — 코드/CTA 글로우
- `--glow-green-strong`: `0 0 48px rgba(30,215,96,0.6)` — CTA 강 글로우

---

## §3. Typography

- `--font-sans`: `'CircularSp', 'Inter', 'Pretendard', 'Helvetica Neue', sans-serif`
  - CircularSp 비공개. Inter로 fallback
- `--font-mono`: `'JetBrains Mono', 'SFMono-Regular', monospace`
- 헤드라인 자간 `-0.025em ~ -0.03em`, weight 800 (Spotify 굵기)
- 본문 16pt / 1.55
- **Uppercase label 스타일**: `text-transform: uppercase; letter-spacing: 0.14em; font-weight: 700` — h2, em, 챕터 부제, dock 메타 등

---

## §4. Signature 요소

### Pill geometry (radius 999px)
- 페이지 번호 알약
- CTA 알약 (green-cta)
- pill-cloud 칩
- thanks/contact pill
- em badge

### Green glow
- 헤드라인/숫자/CTA `text-shadow: 0 0 24~50px rgba(30,215,96,0.4~0.6)`
- 코드 블록 `box-shadow` glow
- pulse-end 글로우 dot 3-stop shadow

### Content-first dark
모든 카드는 다크 배경 위. **라이트 배경 사용 금지**.
album-grid의 컬러 타일은 그라데이션 (브랜드 컬러 페어).

### Heavy elevation
카드 그림자가 깊음 (`0 8px 24px rgba(0,0,0,0.55)`). 라이트 테마의 hairline 대신 무게감 있는 그림자.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `glow-cover` | 라디얼 그린 + 블루 글로우 표지. 72pt + text-shadow |
| 2 | `green-section` | 160pt 그린 챕터 번호 + 라디얼 그린 배경 |
| 3 | `album-grid` | 3×2 그라데이션 정사각 타일 (앨범 아트 mockup 톤) |
| 4 | `playlist-rows` | 플레이리스트 mockup (# / 제목 / 아티스트 / 앨범 / 시간) |
| 5 | `now-playing` | 본문 + 하단 96px dock (메타 + 콘트롤 + 진행 바) |
| 6 | `pill-cloud` | 알약 칩 클라우드 (xs/s/m/l/xl 5 사이즈, accent/outline 변형) |
| 7 | `green-cta` | 가운데 큰 그린 알약 CTA + 글로우 |
| 8 | `vinyl-quote` | 480px 원형 vinyl + 가운데 인용 |
| 9 | `lyric-stanza` | 32pt 가운데 가사 스타일 stanza |
| 10 | `chart-toplist` | 번호 매겨진 Top-5 리스트, #1은 그린 강조 + 글로우 |
| 11 | `dark-card-row` | 3 다크 카드 + 하단 그린 progress bar (--progress 변수) |
| 12 | `pulse-end` | 글로우 그린 dot + 88pt uppercase "END" |

### 셸 3개 (shell)
- `cover` — near-black + uppercase 부제 (기본 표지)
- `section` — near-black + 96pt 흰 챕터 번호
- `end` — near-black + 56pt 흰 헤드라인 (기본 폐막)

---

## §6. Don'ts

- 라이트 배경 사용 금지 — Spotify는 항상 다크
- 그린 `--green`을 본문 텍스트에 직접 사용 금지 (포커스/CTA/링크 전용)
- 단조로운 그레이만 사용 금지 — 그린 글로우로 활력 유지
- Uppercase 레이블에 자간 `< 0.10em` 금지 (label voice 손상)
- 코드 블록 라이트 배경 만들지 말 것 (`#000000` + 그린 보더 + 글로우 유지)
- 알약을 사각형으로 변형 금지 — 무조건 `radius: 999px`
- album-grid는 정확히 6장. 그 외 개수는 grid 깨짐
- pill-cloud는 30~50개 권장. 너무 적으면 빈 느낌
