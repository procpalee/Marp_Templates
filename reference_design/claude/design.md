# Claude — Slide Design System

**출처:** [VoltAgent/awesome-design-md / Claude](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/claude.css`](slides/claude.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Claude** — 따뜻한 크림 `#faf9f5` + 코랄 `#cc785c` + 세리프 헤드라인. 16:9.
AI·리서치·에디토리얼·따뜻한 톤의 매거진형 프레젠테이션.

---

## §1. Brand & Tone

- **용도:** AI 제품 데모, 리서치 발표, 에디토리얼 공유, 인터뷰/케이스 스터디
- **톤:** warm · editorial · serif · grounded
- **타깃 청중:** 리서처/AI 빌더/콘텐츠 전략가/에디터

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--coral` | `#cc785c` | 강조 · h3 · link · 단일 액션 컬러 |
| `--coral-active` | `#a9583e` | strong, 호버 |
| `--coral-soft` | `#e6dfd8` | 비활성 |
| `--teal` | `#5db8a6` | 보조 강조 |
| `--amber` | `#e8a55a` | 예시/노트 |
| `--cream` | `#faf9f5` | 슬라이드 배경 (warm cream) |
| `--cream-soft` | `#f5f0e8` | end 배경 |
| `--cream-card` | `#efe9de` | 카드, blockquote |
| `--cream-strong` | `#e8e0d2` | 강한 카드 |
| `--dark` | `#181715` | section/dark surface |
| `--dark-elev` | `#252320` | 다크 카드 elevation |
| `--dark-soft` | `#1f1e1b` | 다크 보조 |
| `--ink-strong` | `#141413` | h1 |
| `--ink` | `#252523` | 본문 |
| `--ink-mute` | `#6c6a64` | 보조 |
| `--ink-sub` | `#8e8b82` | 캡션 |
| `--hairline` | `#e6dfd8` | 구분선 |
| `--on-dark` | `#faf9f5` | 다크 위 텍스트 |

---

## §3. Typography

- `--font-serif`: `'Copernicus', 'Tiempos Headline', 'Fraunces', 'Georgia', 'Noto Serif KR', serif`
  - Copernicus 비공개. Fraunces가 자유 라이선스 fallback (Google Fonts)
  - **헤드라인 전용** (h1, h2, blockquote, large numerals)
- `--font-sans`: `'StyreneB', 'Inter', 'Pretendard', -apple-system, sans-serif` — 본문, h3 (uppercase), UI
- `--font-mono`: `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace`
- 헤드라인 자간 `-0.025em`, weight 400 (가는 세리프)
- 본문 17pt / 1.65 (editorial leading)

---

## §4. Signature 요소

### 컬러 블로킹 (no shadow)
모든 카드·콜아웃에 `box-shadow: none`. 톤 대비(cream/dark/coral)로만 깊이 표현.

### Coral 단일 액션 컬러
링크 · h3 · KPI 상단 보더 · CTA 모두 `--coral` 하나로 통일.
보조 컬러(teal/amber)는 거의 사용하지 않음.

### Editorial pacing
- 슬라이드당 본문 길이가 길어도 OK (editorial 톤)
- 매거진형 2단/단단 spread, drop cap, italic numerals 적극 사용
- pull-quote-drop, editorial-spread는 본문 200자 이상 권장

### Serif italic numerals
- KPI/숫자는 sans bold가 아니라 **세리프 italic 300weight**
- `serif-kpi` 의 84pt italic Copernicus

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `serif-cover` | 80pt 세리프 헤드라인 + italic 부제 (cream) |
| 2 | `editorial-section` | 다크 surface + 160pt 코랄 챕터 번호 + italic 부제 |
| 3 | `editorial-spread` | 2단 본문 (좌 prose + drop cap, 우 인용 카드) |
| 4 | `pull-quote-drop` | 140pt 코랄 drop cap + 36pt 세리프 인용 |
| 5 | `coral-fullbleed` | 풀블리드 코랄 슬라이드 + 크림 세리프 헤드라인 |
| 6 | `numbered-toc` | italic 세리프 큰 번호(01~05) + sans 항목 |
| 7 | `tri-band` | 가로 3밴드 cream/dark/coral, 각 band에 한 줄 메시지 |
| 8 | `dark-mockup-card` | 다크 카드 + 모노 코드 + 코랄 ✱ 스파이크 마크 |
| 9 | `author-bio` | 좌 세리프 바이오 + 우 큰 이니셜 portrait 카드 |
| 10 | `coral-vs-dark` | 50/50 coral/dark 분할 — 두 컨셉 대비 |
| 11 | `serif-kpi` | KPI 4개 italic 84pt 세리프 + 코랄 상단 보더 |
| 12 | `coral-thanks` | 풀블리드 코랄 폐막 + 88pt "Thank you." |

### 셸 3개 (shell)
- `cover` — cream + 세리프 (기본 표지)
- `section` — cream-card + 96pt 코랄 챕터 번호
- `end` — cream-soft + 세리프 (기본 폐막)

---

## §6. Don'ts

- 헤드라인에 sans 폰트 사용 금지 (반드시 `--font-serif`)
- 본문에 세리프 폰트 사용 금지 (h3 이하는 sans, 단 `editorial-spread` body 예외 가능)
- 그림자 추가 금지 — 컬러 블로킹으로만 깊이 표현
- 차가운 블루/시안을 accent로 도입 금지 (cream/dark/coral 3톤 + teal/amber 보조만)
- KPI를 sans bold로 만들지 말 것 — 반드시 italic 세리프
- 보조 컬러(teal/amber)를 강조 컬러로 격상 금지 — coral만 단일 액션
