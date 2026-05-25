# Linear — Slide Design System

**출처:** [VoltAgent/awesome-design-md / linear.app](https://github.com/VoltAgent/awesome-design-md) (MIT). 디자인 토큰만 차용, 브랜드 로고·상표는 사용하지 않음.

대응 CSS: [`slides/linear.css`](slides/linear.css)

> **참고**: 이 테마는 `tech-modern`을 상속하지 않은 **처음부터 작성된** CSS다. 26개 공용 레이아웃은 정의되어 있지 않다. 대신 아래 §5 "12 브랜드 레이아웃"이 어휘 전부.

---

## §0. 한 줄 요약

**Linear** — 근사-검정 `#010102` + 단일 lavender `#5e6ad2` + surface ladder + hairline-only. 16:9.
**다크 모드 전용** (Linear의 시그니처). 툴체인·이슈트래커·생산성·엔지니어링 발표용.

---

## §1. Brand & Tone

- **용도:** 엔지니어링 워크플로우 발표, 프로덕트 데모, 사내 핸드북, 이슈트래커·생산성 도구
- **톤:** ultra-minimal · precise · dense · no decoration
- **타깃 청중:** 엔지니어/PM/제품 빌더

---

## §2. Color Tokens (Dark only)

| Token | HEX | 용도 |
|---|---|---|
| `--canvas` | `#010102` | 슬라이드 배경 (near-black + faint blue tint) |
| `--surface-1` | `#0f1011` | section divider, 카드 |
| `--surface-2` | `#141516` | 강한 카드, status board |
| `--surface-3` | `#18191a` | mockup chip |
| `--surface-4` | `#1c1d1f` | (예비) |
| `--hairline` | `#23252a` | 1px 보더 (기본) |
| `--hairline-strong` | `#34343a` | 강한 보더 |
| `--hairline-third` | `#3e3e44` | (예비) keyboard key bottom edge |
| `--ink` | `#f7f8f8` | 본문 |
| `--ink-mute` | `#b4b8c0` | 보조 |
| `--ink-sub` | `#6f747e` | 캡션, id, label |
| `--violet` | `#5e6ad2` | **유일한 브랜드 액센트** |
| `--violet-hover` | `#828fff` | 호버, link |
| `--violet-focus` | `#5e69d1` | 포커스 |
| `--violet-deep` | `#4a55b3` | avatar bg |
| `--success` | `#27a644` | status: done |
| `--warn` | `#c88a5b` | label: spike |
| `--error` | `#e6533d` | label: bug |

### Status palette (functional only)
| Token | HEX |
|---|---|
| `--status-todo` | `#6f747e` (회색 ring) |
| `--status-progress` | `#f2c94c` (옐로우 채움) |
| `--status-review` | `#828fff` (라일락) |
| `--status-done` | `#27a644` (그린) |
| `--status-canceled` | `#6f747e` 40% (희미) |

---

## §3. Typography

- `--font-display`: `'Linear Display', 'Inter', 'Pretendard', 'SF Pro Display', system-ui, sans-serif`
  - Linear Display 비공개. Inter로 fallback
- `--font-text`: `'Linear Text', 'Inter', 'Pretendard', system-ui, sans-serif`
- `--font-mono`: `'Linear Mono', 'JetBrains Mono', 'SF Mono', ui-monospace, monospace`
- 헤드라인 자간 `-0.03em ~ -0.05em` (140pt section은 -0.05em)
- 본문 16pt / 1.55
- weight 범위 400–700, weight 500이 헤딩 기본

---

## §4. Signature 요소

### 그림자 없음 (절대)
모든 카드는 surface ladder + hairline으로 깊이 표현. `box-shadow` 사용 금지.

### Single accent 규율
violet 외 인터랙티브 컬러 없음. status color는 기능적 (decorative 아님).

### Surface ladder
`#010102 → #0f1011 → #141516 → #18191a` 4단계 surface로 깊이 표현. 각 단계는 거의 안 보이는 차이지만 합쳐서 페이지 리듬을 만든다.

### Hairline three-tone
`#23252a` → `#34343a` → `#3e3e44`. 미세 보더 위계 — 카드 < 강한 카드 < 키보드 bottom edge.

### Status icons
- ○ (todo, hollow circle)
- 🟡 (in progress, yellow filled)
- 🟣 (in review, lilac filled)
- 🟢 (done, green filled)

### Issue list 메타포
issue-list, status-board, command-palette는 모두 실제 Linear UI 모방.

---

## §5. 12 Brand Layouts

| # | 클래스 | 용도 |
|---|---|---|
| 1 | `void-cover` | near-black 좌측 정렬 + 상단 hairline + violet eyebrow |
| 2 | `violet-section` | surface-1 + 140pt 보라 챕터 번호 |
| 3 | `issue-list` | Linear 이슈 리스트 mock (5행, status icon + id + title + label + assignee) |
| 4 | `status-board` | 4-col kanban (Todo/Progress/Review/Done, 카드 in 각 컬럼) |
| 5 | `surface-grid` | 3-up surface 카드 + violet glyph (hairline-only) |
| 6 | `command-palette` | ⌘K 모달 mock (search input + result list + shortcut) |
| 7 | `keyboard-shortcut` | 큰 키보드 키 pill (Mac key style with bottom edge) |
| 8 | `milestone-timeline` | 가로 milestone 4개 (◆ + 날짜 + 제목 + desc, hairline rail) |
| 9 | `cycle-progress` | 240px 원형 violet conic progress + 6 stat grid |
| 10 | `surface-quote` | surface card + 3px 좌측 violet 바 + 26pt 인용 + avatar |
| 11 | `integration-row` | 8 통합 로고 placeholder 그리드 |
| 12 | `void-end` | near-black 가운데 + violet pulse dot + 72pt 헤드 |

### 셸 3개 (shell)
- `cover` — canvas + 60pt + 상단 2px violet bar (기본 표지)
- `section` — surface-1 + 96pt 챕터 번호 (기본 디바이더)
- `end` — canvas + 60pt + 상단 2px violet bar (기본 폐막)

---

## §6. Don'ts

- 라이트 배경 사용 금지 — Linear는 다크 전용 (light-mode variant 명시적 거부)
- 그림자 추가 금지 (모든 깊이는 surface ladder + hairline)
- 그라데이션 사용 금지 (cycle-progress conic만 예외 — 데이터 표현)
- violet 외 인터랙티브 액센트 추가 금지 (단일 액센트 규율)
- 알약(pill) 버튼 만들지 말 것 — `radius: 8px` 표준
- 본문 텍스트에 violet 사용 금지 (link/code/icon 전용)
- status 색을 decorative하게 쓰지 말 것 (functional만)
- 본문 텍스트를 opacity로 흐리지 말 것 — `--ink-mute`/`--ink-sub` 토큰 사용
