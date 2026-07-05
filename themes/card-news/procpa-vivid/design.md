# procpa-vivid-cards — Card News Design System (단일 레퍼런스)

**혈통:** [`themes/slide/procpa-vivid/design.md`](../../slide/procpa-vivid/design.md)의 토큰·시각 언어를 100% 계승한 **카드뉴스(SNS) 변형 테마**. 슬라이드(procpa-vivid)와 카드가 같은 브랜드로 보이는 것이 목적 — OSMU(원소스 멀티유즈)의 카드 축.
**데모:** [`sample.md`](sample.md) → `npm run vivid-cards:png`로 PNG 확인.

---

## §0. 한 줄 요약

화이트 캔버스 + Vivid Blue `#2563eb` 단일 강조 + 헤어라인 에디토리얼을 **1080px 카드 규격**으로. 잉크 카드(statement/outro)는 punctuation — 덱당 1~2장.

---

## §1. 규격

| size | 크기 | 용도 |
|---|---|---|
| `square` | 1080×1080 (1:1) | **기본** — 디스코드·스레드·인스타 피드 |
| `sns` | 1080×1350 (4:5) | 인스타 세로 최적화 |

덱 frontmatter:

```yaml
---
marp: true
theme: procpa-vivid-cards
size: square
paginate: true
footer: 'PROCPA'
---
```

- `paginate: true` → 우하단 "n / N" pill (cover·outro는 자동 숨김)
- `footer: 'PROCPA'` → 좌하단 브랜드 (잉크 카드에서 자동 반전)

## §2. 레이아웃 12종 (한 카드 = 한 클래스)

| 클래스 | 용도 | 마크업 키 |
|---|---|---|
| `card-cover` | 표지 — 상단 12px 블루 밴드 | `.eyebrow` + `# 제목` + p(부제) |
| `card-hook` | 2장 훅 — 대형 질문/도발 + '밀어서 계속 →' 자동 | `# 훅` + p |
| (없음/`card-content`) | 기본 — 헤어라인 h1 + 블루 닷 불릿 | `.eyebrow`? + `# 제목` + ul/p |
| `card-statement` | 잉크 펀치 카드 (덱 중간 1장) | `# 선언` (+ `.wm` 글리프) |
| `card-stat` | 대형 숫자 KPI | `<div class="n">5/5</div>` + `## 라벨` + p |
| `card-quote` | 인용 — 블루 바 + blue-soft | `> 인용문` + `<span class="cite">출처</span>` |
| `card-vs` | 좌우 비교 (우측=강조) | `.vs-row > .a / .mid / .b`, 각 `<h3>`+`<p>` |
| `card-check` | 경계선 체크리스트 | **ul 전체를 raw HTML로**: `<ul><li>…</li><li class="open">…</li></ul>` (li=✓ 블루, `.open`=○ 회색. markdown `-` 리스트에 HTML li 혼용 금지 — 파싱 깨짐) |
| `card-steps` | 번호 단계 — 블루 원형 배지 | `1. …` ol |
| `card-summary` | 아웃트로 직전 정리 — blue-soft 풀배경 | `# 정리` + ul/p |
| `card-outro` | 마무리 — 잉크 + 블루 pill CTA | `# 마무리 문장` + `<div class="cta">CTA</div>` |
| 모디파이어 | `.center`(중앙정렬) `.compact`(밀도↓) | `<!-- _class: card-stat center -->` |

**워터마크** — 어느 카드든 `<div class="wm">03</div>` 또는 `<div class="wm">≠</div>` 한 줄로 우하단 대형 8% 블루 글리프. 섹션 번호·핵심 기호에 사용.

## §3. 덱 리듬 규칙 (밋밋함 방지)

- **같은 레이아웃 3연속 금지.** 기본 구성(9장): cover → hook → content → **stat/vs**(앵커) → **statement**(반전) → content → check/steps → summary → outro
- 잉크 카드(statement)는 덱 중간(4~6번째)에 1장 — 스크롤 리듬의 변곡점
- 숫자가 있으면 최우선으로 `card-stat` (텍스트 불릿보다 강함)
- 카드 텍스트: 제목 20자 내외, 불릿 ≤3개 각 30자 내외, 본문 카드당 ≤120자

## §4. Don'ts (슬라이드 vivid와 동일)

- 파스텔·스티키노트·네이비 hero 금지 (그건 propca-notion-style)
- 강조색 2종 이상 금지 — Vivid Blue 단일
- 그림자·그라데이션 금지 — 깊이는 헤어라인 + 여백
- 잉크 카드 3장 이상 금지 (punctuation은 희소해야 힘이 있다)

## §5. 빌드

```
cd build
npm run build:vivid-cards     # sample.md → sample.html
npm run vivid-cards:png       # sample.md → sample.NNN.png
```

볼트 파이프라인(`Obsidian_Vault/.scripts/render-cards.mjs`)은 이 테마를 `--theme-set`으로 참조해 `cards.md → png/card-NN.png`를 만든다 (`/to-cards` 커맨드가 호출).
