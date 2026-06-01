# Notion — Slide Design System

**출처:** [VoltAgent/awesome-design-md / Notion](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/notion.css`](slides/notion.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃(`split`/`grid-3`/`stats`/`timeline` 등)은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Notion** — 퍼플 `#5645d4` + 6색 파스텔 펠릿 + 네이비 hero + 워크스페이스 mockup. 16:9.
문서·위키·내부 공유·노트·지식 베이스에 어울리는 친근하고 구조화된 톤.

---

## §1. Brand & Tone

- **용도:** 팀 워크스페이스 공유, 문서/위키 발표, 지식 베이스 소개, 내부 핸드북
- **톤:** friendly · structured · approachable · soft
- **타깃 청중:** PM/디자이너/지식근로자/문서 작업자

---

## §2. Color Tokens

| Token | HEX | 용도 |
|---|---|---|
| `--purple` | `#5645d4` | 강조, link 보더, 강조 텍스트, featured |
| `--purple-pressed` | `#4534b3` | 호버/액티브 |
| `--purple-deep` | `#3a2a99` | 텍스트 deep variant |
| `--pink` | `#ff64c8` | 보조 강조, gradient pair |
| `--orange` | `#dd5b00` | 액센트 회전 |
| `--teal` | `#2a9d99` | 액센트 회전 |
| `--green` | `#1aae39` | success / check |
| `--link` | `#0075de` | 링크 (강조 purple와 구분) |
| `--navy` / `--navy-deep` | `#0a1530` / `#070f24` | hero band, signup-end |
| `--canvas` | `#ffffff` | 슬라이드 배경 |
| `--canvas-soft` | `#fafaf9` | cover/end 배경 |
| `--canvas-card` | `#f6f5f4` | 카드/콜아웃 |
| `--hairline` | `#e5e3df` | 헤어라인 |
| `--ink` / `--ink-mute` / `--ink-sub` | `#191918` / `#5a5a55` / `#8b8a84` | 본문 3단계 |

### 파스텔 펠릿
| 토큰 | HEX | sticky-note / pastel-blocks 회전순 |
|---|---|---|
| `--pastel-peach` | `#ffe8d4` | 1 |
| `--pastel-rose` | `#fde0ec` | 2 |
| `--pastel-mint` | `#d9f3e1` | 3 |
| `--pastel-lavender` | `#e6e0f5` | 4 |
| `--pastel-sky` | `#dcecfa` | 5 |
| `--pastel-yellow` | `#f9e79f` | 6 |

`yellow-banner` 와 `database-rows` 의 status 태그도 동일 펠릿 사용.

---

## §3. Typography

- `--font-sans`: `'Notion Sans', 'Inter', 'Pretendard', -apple-system, sans-serif`
  - Notion Sans는 비공개, Inter로 fallback
- `--font-mono`: `'JetBrains Mono', 'SFMono-Regular', monospace`
- `--font-serif`: `'Fraunces', 'Georgia', serif` — `pastel-quote` 큰 따옴표 장식 한정
- 헤드라인 자간: `-0.02em` (적당한 음수, Vercel처럼 극단적이지 않음)
- 본문 17pt / 1.55

---

## §4. Signature 요소

### 직사각 8~12px radius
- 카드/블록 12px
- 버튼/태그 4~8px
- 알약 999px (CTA, 페이지 번호)

### Navy hero
`cover` 와 `signup-end` 가 navy 그라데이션 공유. workspace mockup glyph는 우상단 코너 64×64 보라 그라데이션 박스.

### Purple section divider
`purple-section`은 풀 보라 배경 + 흰 96pt 챕터 번호. tech-modern의 그라데이션과 다른 솔리드 보라.

### Sticky note 회전
`sticky-notes` 의 카드들은 `-4° / +3° / -2° / +5°` 회전 + 그림자로 종이 메모 느낌.

### Yellow banner
`yellow-banner` 는 풀블리드 `#f9e79f` — 강조 슬라이드 전용. 본문엔 노란 배경 금지.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `navy-cover` | navy 그라데이션 hero 표지 + 우상단 mockup glyph |
| 2 | `purple-section` | 풀 보라 챕터 디바이더 |
| 3 | `sticky-notes` | 4장 회전 파스텔 메모 카드 |
| 4 | `database-rows` | 노션 DB 행 mockup (header + 4 rows, 상태 태그 컬러) |
| 5 | `pastel-blocks` | 6 파스텔 블록 그리드 |
| 6 | `yellow-banner` | 풀블리드 노란 강조 슬라이드 |
| 7 | `workspace-split` | 좌 280px 사이드바 + 우 본문 — 워크스페이스 mockup |
| 8 | `toggle-list` | 토글 ▶ heading + 들여쓰기 item 리스트 |
| 9 | `block-features` | 1×N 아이콘 원 + 제목 + 본문 block grid |
| 10 | `pastel-quote` | 파스텔 카드 안의 인용 + author block (avatar + name) |
| 11 | `pricing-blocks` | 3 가격 블록 (직사각 8px, featured 2px 보라) |
| 12 | `signup-end` | navy 폐막 + 보라 알약 CTA + 핸들/URL pill |

### 셸 3개 (shell)
- `cover` — 부드러운 캔버스 + 잉크 (기본 표지)
- `section` — 카드색 배경 + 72pt 챕터 번호 (기본 디바이더)
- `end` — `cover`와 동일 톤 (기본 폐막)

---

## §6. Don'ts

- 퍼플 `--purple`을 본문 텍스트에 직접 쓰지 말 것 (link/포커스/featured 전용)
- 알약 라벨에 음의 자간 사용 금지 (Notion은 자연 정렬)
- pastel-cards/sticky-notes를 6장 초과하지 말 것 (회전 펠릿 한 사이클)
- navy hero를 일반 콘텐츠 슬라이드 배경으로 사용 금지 (cover/signup-end 한정)
- Yellow banner는 한 데크당 1회만 사용 (강조의 강조)
- 카드에 강한 그림자 사용 금지 — hairline + soft elevation만 (sticky-notes 예외)

---

## §7. Lecture / Presentation Adaptation

Notion의 워밍 톤 + 12px radius + sticky-note 회전은 **사내 문서 발표 · 워크스페이스 온보딩 · 학생용 강의**에 자연스럽게 적응한다.

- **Pretendard 한글 1순위** — lecture-* 5 클래스는 `'Pretendard', 'Notion Sans', 'Inter'` 순서로 한글 가독성 보장.
- **단일 orange accent로 통일** — Notion은 8 컬러 액센트 시스템이지만 lecture 슬라이드에서는 `--orange` `#dd5b00`만 사용. 정답/오답 빨강·녹색 추가 금지.
- **sticky-note 회전 금지 영역** — lecture-* 카드는 회전 없는 정렬된 hairline 12px-radius 카드. workspace 친근감보다 강의 가독성 우선.
- **navy hero 보존** — `--navy` `#0a1530`는 lecture-example의 결과 카드에만 사용 (다크 contrast로 결과 강조).
- **백-로우 가독성** — lecture-* 본문 19~26pt. 강당 발표 시 navy-cover/purple-section을 보조로 활용해 핵심 메시지 키운다.

---

## §8. Universal Slide Type Mapping

Russell-cell PPT-Design-Prompt 7 universal type을 Notion 어휘에 매핑.

| Universal Type | 이 테마의 매핑 클래스 (우선/보조) |
|---|---|
| Cover | `navy-cover` (다크 hero) / `cover` (plain) |
| Divider | `purple-section` (purple chapter) / `section` (plain) |
| Concept | `block-features` (3 블록 컨셉) / `toggle-list` (toggle 확장) |
| Comparison | `workspace-split` (좌/우 50/50) / `database-rows` (속성 비교) |
| Data | `database-rows` (테이블) / `pricing-blocks` (3 컬럼 KPI) |
| System | `workspace-split` (sidebar + content mockup) / `sticky-notes` (회전 카드 보드) |
| Closing | `signup-end` (CTA + ul) / `end` (plain) / `pastel-quote` (manifesto) |
| **Lecture: Definition** | `lecture-definition` — 큰 용어 + 정의 + 예시 카드 |
| **Lecture: Objective** | `lecture-objective` — "By end of class" + 화살표 리스트 |
| **Lecture: Example** | `lecture-example` — Step 1/2/3 카드 + navy 결과 카드 |
| **Lecture: Takeaway** | `lecture-takeaway` — orange 좌측 보더 인용 박스 |
| **Lecture: Quiz** | `lecture-quiz` — 질문 + A/B/C/D 옵션 카드 + 힌트 |

---

## §9. Agent Prompt Templates

이미지 생성 모델에 전달할 prompt 7 템플릿. fill-in-the-blank.

```
[Cover — Notion] mood: warm workspace, navy hero, friendly pastel rotation
  thesis: {{ ONE_SENTENCE }} | cue: navy #0a1530 + sticky chips ±2° rotation
  avoid: pure black, sharp shadows, sub-12px radius
[Divider — Notion] full-bleed purple #5645d4, white 96pt numeral, 12px radius
[Concept — Notion] 3 blocks with ▸ toggle, orange eyebrow + ink heading
[Comparison — Notion] workspace-split sidebar(35%) + content(65%), pastel status pills
[Data — Notion] database-rows table OR pricing-blocks 3-col; one orange highlight
[System — Notion] workspace mockup: sidebar pages + main block stack + coral callout
[Closing — Notion] signup-end warm canvas + 64pt + orange pill CTA + links ul
```

이 7 템플릿 + lecture-* 5 클래스(§8)로 Notion 테마에서 강의 슬라이드 생성을 일관되게 호출할 수 있다.
