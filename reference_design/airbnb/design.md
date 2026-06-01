# Airbnb — Slide Design System

**출처:** [VoltAgent/awesome-design-md / airbnb](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/airbnb.css`](slides/airbnb.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Airbnb** — Rausch `#ff385c` + 화이트 + 따뜻한 그레이 + 사진 우선 + pill search bar + 64pt rating display. 16:9.
호스피탈리티 마켓플레이스·여행·숙박·리스팅·호스트/게스트 발표용.

---

## §1. Brand & Tone

- **용도:** 호스피탈리티·여행 발표, 마켓플레이스 데모, 호스트/게스트 스토리, 리스팅 갤러리, brand experience
- **톤:** photography-first · friendly · generous whitespace · single voltage
- **타깃 청중:** 일반 청중/마케팅/PM/디자이너/마켓플레이스 빌더

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--rausch` | `#ff385c` | **유일한 브랜드 voltage** — primary CTA, search orb, rating dot |
| `--rausch-active` | `#e00b41` | 호버, link 강조 |
| `--rausch-soft` | `#ffd1da` | 비활성, light wash |
| `--luxe-purple` | `#460479` | sub-brand (Luxe) — gallery/portrait gradient |
| `--plus-magenta` | `#92174d` | sub-brand (Plus) — reservation CTA gradient |
| `--canvas` | `#ffffff` | 슬라이드 배경 (dominant) |
| `--surface-soft` | `#f7f7f7` | section divider, code 배경 |
| `--surface-strong` | `#f2f2f2` | 보조 surface |
| `--ink` | `#222222` | 본문 헤드라인 (Airbnb의 "near-black") |
| `--ink-body` | `#3f3f3f` | 본문 |
| `--ink-mute` | `#6a6a6a` | 보조, 캡션 |
| `--ink-sub` | `#8e8e8e` | 캡션 보조 |
| `--hairline` | `#dddddd` | 1px 보더 |
| `--hairline-soft` | `#ebebeb` | 미세 분리선 |
| `--border-strong` | `#c1c1c1` | 진한 보더 |
| `--error` | `#c13515` | 에러 텍스트 |
| `--link` | `#428bff` | legal 링크 |

---

## §3. Typography

- `--font-display`: `'Airbnb Cereal VF', 'Circular', 'Inter', 'Pretendard', -apple-system, system-ui, sans-serif`
  - Cereal VF 비공개. Circular 대체 fallback (또한 비공개)이나, Inter로 최종 fallback
- `--font-text`: 동일 (display와 text 같은 패밀리 — 의도된 modest scale)
- 헤드라인 weight 700 + 음의 자간 `-0.025em ~ -0.035em` (deliberately modest)
- 본문 16pt / 1.5
- **rating display 144pt 700** (시스템의 가장 큰 typographic moment)
- 시그니처 원칙: "the brand trusts photography and generous whitespace over typographic muscle"

---

## §4. Signature 요소

### 단일 voltage
모든 인터랙티브 요소는 `--rausch` `#ff385c` 하나. sub-brand (`--luxe-purple`, `--plus-magenta`)는 reservation/luxury photo gradient 한정.

### Pill search bar (64px height)
`search-pill` 레이아웃의 시그니처 — `border-radius: 999px` + 3-seg (Where/When/Who) + 48×48 Rausch orb CTA.

### 64pt rating display
`rating-hero`의 시그니처 — 144pt 큰 별점 숫자 + "Guest favorite" 태그.

### 14px radius listing card
`listing-grid`, `experience-tiles` 모두 14px 라운드 사진 카드 + 우상단 heart icon + 좌상단 floating badge.

### 단일 shadow tier
`var(--shadow-hover): rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px, rgba(0,0,0,0.10) 0 4px 8px`. hover-floated 카드와 reservation card에만 사용.

### 64px section / 16px card gutter
모든 섹션 간 64px (SaaS의 80~96px보다 tighter). 카드 간 16px (마켓플레이스 density).

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `photo-cover` | 풀-bleed 사진 hero (Rausch 그라데이션 placeholder) + meta + headline + white pill CTA |
| 2 | `rausch-section` | surface-soft + 18px Rausch dot + 96pt 챕터 |
| 3 | `listing-grid` | 4-up 리스팅 카드 (16:9 photo placeholder + badge + heart + price + rating) |
| 4 | `search-pill` | 큰 pill search bar mockup (Where/When/Who + Rausch orb) |
| 5 | `rating-hero` | 거대 144pt 별점 + "Guest favorite" 태그 + headline |
| 6 | `host-card` | host avatar + Superhost 배지 + Contact CTA |
| 7 | `reservation-split` | 좌 gallery (3-photo collage) + 우 reservation card (가격 + 필드 + Reserve CTA + 합계) |
| 8 | `review-pair` | 2-col author 카드 (avatar + name + stars + excerpt) |
| 9 | `experience-tiles` | 3 tall 4:5 experience 타일 + NEW 배지 + 가격 |
| 10 | `amenity-row` | 2-col amenity 리스트 (icon + 이름 + meta + hairline 분리) |
| 11 | `city-grid` | 6-col 컴팩트 city 그리드 (이름 + 숫자, hairline 위) |
| 12 | `rausch-end` | 폐막 + 96px Rausch orb + headline + CTA |

### 셸 3개 (shell)
- `cover` — 화이트 + 58pt Cereal (기본 표지)
- `section` — surface-soft + 80pt 챕터 + Rausch 부제
- `end` — 화이트 + 56pt + meta (기본 폐막)

---

## §6. Don'ts

- Rausch `--rausch`를 본문 텍스트에 직접 사용 금지 (CTA/orb/dot/icon 전용)
- 단일 voltage 위반 금지 — 다른 액센트 컬러 도입 금지 (sub-brand는 reservation/luxury 한정)
- 알약(pill) 아닌 사각 검색 바 만들지 말 것 (`search-pill`는 999px 시그니처)
- 카드 radius `> 14px` 금지 (Airbnb는 14px 표준)
- mid-gray 위계 만들지 말 것 — `--ink-body`/`--ink-mute`/`--ink-sub` 토큰 사용
- 그림자 다중 tier 사용 금지 (단일 `--shadow-hover` tier만)
- 본문에 typographic muscle 의존 금지 — 사진과 whitespace가 hero
- 64px section padding 줄이지 말 것 (마켓플레이스 페이싱)
