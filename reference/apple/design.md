# Apple — Slide Design System

**출처:** [VoltAgent/awesome-design-md / apple](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/apple.css`](slides/apple.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Apple** — 화이트 + parchment + dark tile 교차 페이싱 + SF Pro Display + 단일 Action Blue `#0066cc`. 16:9.
프로덕트 키노트·신제품 launch·디자인 시스템 발표용. "exactly one drop-shadow" 철학.

---

## §1. Brand & Tone

- **용도:** 신제품 키노트, 프로덕트 launch 발표, 디자인 시스템 공유, 럭셔리·미니멀 톤 전반
- **톤:** photography-first · generous whitespace · disciplined · inevitable
- **타깃 청중:** 일반 청중/소비자/제품 PM/디자인 책임자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--canvas` | `#ffffff` | 슬라이드 배경 (dominant) |
| `--parchment` | `#f5f5f7` | 시그니처 off-white alternate |
| `--pearl` | `#fafafc` | secondary button fill |
| `--ink` | `#1d1d1f` | 본문, 헤드라인 (Apple's "near-black") |
| `--ink-mute` | `#515154` | 보조 |
| `--ink-sub` | `#86868b` | 캡션 |
| `--hairline` | `#d2d2d7` | 미세 보더 |
| `--dark-1` | `#272729` | 다크 section, 메인 dark tile |
| `--dark-2` | `#2a2a2c` | dim section variant |
| `--dark-3` | `#252527` | (예비) |
| `--void` | `#000000` | 글로벌 nav, 영상 배경 한정 |
| `--on-dark` | `#f5f5f7` | 다크 위 텍스트 |
| `--on-dark-mute` | `#86868b` | 다크 보조 텍스트 |
| `--action` | `#0066cc` | **유일한 인터랙티브 액센트 (Action Blue)** |
| `--focus` | `#0071e3` | 키보드 포커스 |
| `--sky` | `#2997ff` | 다크 surface 링크 |

---

## §3. Typography

- `--font-display`: `'SF Pro Display', 'Inter', 'Pretendard', system-ui, -apple-system, sans-serif` — h1, h2 (≥19pt)
- `--font-text`: `'SF Pro Text', 'Inter', 'Pretendard', system-ui, -apple-system, sans-serif` — body, UI
- `--font-mono`: `'SF Mono', ui-monospace, monospace`
- 헤드라인 자간 `-0.025em ~ -0.035em` (Apple tight)
- 본문 17pt / 1.5 (Apple은 17pt, 16pt 아님 — editorial pacing)

---

## §4. Signature 요소

### 단일 액션 컬러
모든 인터랙티브 요소는 `--action` `#0066cc` 하나만. 다른 강조 컬러 사용 금지. 다크 surface에서만 `--sky` `#2997ff` 사용 가능.

### "Exactly one drop-shadow"
프로덕트 렌더에만 `3px 5px 30px rgba(0,0,0,0.22)` 적용. UI 카드/버튼에는 그림자 금지.

### 풀블리드 alternating tile
화이트 → parchment → 화이트 → 다크 교차 페이싱이 섹션 구분 (보더 없이).

### 링크/CTA "›" 시그니처
모든 link/CTA 뒤에 자동 ` ›` 추가 (Apple.com signature).

### 22% scale active state (CSS active 상태)
시스템은 `transform: scale(0.95)`인데 슬라이드는 정적이라 미적용. 단 디자인 의도는 미세한 micro-interaction.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `hero-product` | 가운데 product photo placeholder + 56pt 이름 + 가격 + Learn more |
| 2 | `dark-section` | 다크 `#272729` 가운데 정렬 디바이더 + 80pt 헤드라인 |
| 3 | `oversized-quote` | parchment 가운데 46pt 인용 |
| 4 | `spec-row` | 4-col 1:1 유틸리티 타일 (28pt 숫자 + 캡션) |
| 5 | `parchment-band` | 풀 parchment 가치 제안 + 단일 link |
| 6 | `single-stat` | 220pt 단일 숫자 가운데 + 캡션 |
| 7 | `product-pair` | 2 product tile (one light + one dark) |
| 8 | `comparison-bar` | bar chart with single highlight bar |
| 9 | `palette-show` | 5 컬러 swatch 원형 + 이름 row |
| 10 | `scroll-narrative` | 좌측 정렬 56pt 헤드라인 + 본문 story |
| 11 | `dim-section` | 다크 `#2a2a2c` content 슬라이드 (story 전환) |
| 12 | `soft-end` | 가운데 56pt 폐막 + Action Blue link |

### 셸 3개 (shell)
- `cover` — 화이트 + 76pt 가운데 정렬 (기본 표지)
- `section` — parchment + 92pt 가운데 정렬 챕터
- `end` — 화이트 + 64pt 가운데 정렬 폐막

---

## §6. Don'ts

- Action Blue `--action` 외 인터랙티브 컬러 사용 금지 (Apple은 단일 액센트)
- 그림자를 카드/버튼/UI 요소에 사용 금지 — 프로덕트 렌더 한정
- 본문 16pt 사용 금지 (Apple은 17pt editorial)
- 풀-블랙 `#000000`를 일반 배경으로 쓰지 말 것 (글로벌 nav/영상 한정, 일반은 `#272729`)
- 그라데이션 배경 금지 (Apple은 photography로 깊이 표현)
- mid-gray 텍스트로 위계 만들지 말 것 — size/weight로만
- 본문 문장에 인터랙티브 컬러 wrap 금지 — link/CTA 라인 별도 분리
