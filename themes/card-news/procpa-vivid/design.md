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
---
```

- `paginate: true` → **하단 중앙** "n / N" pill (cover·outro는 자동 숨김)
- 브랜드 = **로고 자동 삽입**: cover 좌상단(잉크 반전) · outro 하단 중앙(화이트 원본). 텍스트 footer 폐지 — frontmatter에 `footer` 넣지 않는다. 로고 원본: 레포 루트 `procpa_logo_dark.png`, CSS에 data-URI 임베드(교체 시 base64 재주입)

## §2. 레이아웃 12종 (한 카드 = 한 클래스)

| 클래스 | 용도 | 마크업 키 |
|---|---|---|
| `card-cover` | 표지 — **포토 커버**(배경 사진 + 다크 스크림 + 화이트 타이포 + 좌상단 로고). 썸네일과 동일 언어 | `![bg](경로)` 한 줄(썸네일 배경 `Attachments/thumb-bg/<slug>.jpg` 재사용 권장, 없으면 잉크 폴백) + `.eyebrow` + `# 제목` + p(부제) |
| `card-intro` | 2장 목차형 A — 리드 + agenda 칩 | `.eyebrow` + `# 제목` + `<p class="lead">` + `<div class="agenda"><div class="item"><span class="idx">01</span><span class="txt">항목<small>보조</small></span></div>…</div>` |
| `intro-toc` / `intro-tiles` / `intro-timeline` | 2장 목차형 B/C/D — 매거진 목차 / 3열 타일 / 수직 타임라인 | `.toc>.item>.no+.body` / `.tiles>.tile>.no+h3+p` / `.tl>.item>.no+.body` (데모: `intro-variants.md`) |
| `intro-chat` / `intro-split` / `intro-ask` | **2장 운띄우기형 E/F/G(권장)** — 말풍선 대화 / 기대vs현실 반전 / 대형 질문+? 워터마크 | `.chat>.bub.them/.me/.real` / `.hype>.q`+`.turn`+`ul.real` / `# 질문`+`.lead`+`.dashes>p` (데모: `intro-new-variants.md`) |
| `card-hook` | 2장 훅 — 대형 질문/도발(가벼운 버전) | `# 훅` + p |
| (없음/`card-content`) | 기본 — 헤어라인 h1 + 블루 닷 불릿 | `.eyebrow`? + `# 제목` + ul/p |
| `card-statement` | 라이트 펀치(blue-soft + 좌측 블루 바, 덱 중간 1장) | `# 선언` |
| `card-stat` | 대형 숫자 KPI | `<div class="n">5/5</div>` + `## 라벨` + p |
| `card-quote` | 인용 — 블루 바 + blue-soft | `> 인용문` + `<span class="cite">출처</span>` |
| `card-vs` | 좌우 비교 (우측=강조) | `.vs-row > .a / .mid / .b`, 각 `<h3>`+`<p>` |
| `card-check` | 경계선 체크리스트 | **ul 전체를 raw HTML로**: `<ul><li>…</li><li class="open">…</li></ul>` (li=✓ 블루, `.open`=○ 회색. markdown `-` 리스트에 HTML li 혼용 금지 — 파싱 깨짐) |
| `card-steps` | 번호 단계 — 블루 원형 배지 | `1. …` ol |
| `card-summary` | 아웃트로 직전 정리 — blue-soft 풀배경 | `# 정리` + ul/p |
| `card-outro` | 마무리(기본) — 잉크 + 하단 중앙 로고 + CTA/링크 | `# 마무리 문장` + `<div class="cta">CTA</div>` |
| `outro-card` | **마무리 변형(권장)** — 좌상단 로고 + '더 읽어보기' 명함 패널 | `.eyebrow` + `# 문장` + `<div class="panel"><div class="row"><span class="k">사이트</span><span class="v">procpa.co.kr</span></div>…</div>` |
| `outro-hero` | **마무리 변형 — procpa.co.kr 히어로 미러**(배경사진+스크림+중앙 브랜드 헤드라인+CTA. 표지와 같은 이미지로 북엔드) | `![bg](…jpg)` + `# 헤드라인` + `<p class="tag">` + `<div class="cta-row"><span class="pill">…</span><span class="pill ghost">…</span></div>` + `<div class="sub">` |
| `outro-cta` / `outro-chips` / `outro-thanks` | 마무리 변형 — 블루 풀블리드 CTA / 칩 태그 / 중앙 핸들 | 각각 `.pill`+`.handles` / `.chips>.chip` / `.eyebrow`+`.handle-lg`+`.site` (데모: `outro-variants.md`) |
| `card-flow` | 수직 프로세스 A↓B↓C | `.flow > .step / .arr(↓) / .step.hi(강조)` |
| `card-grid` | 2×2(·`.cols-3`) 미니 카드 | `.grid > .cell > (.swatch?)+h3+p`, `.cell.accent` |
| `card-table` | 보더 테이블 | markdown 표 그대로 (th 대문자 헤더) |
| `card-qa` | Q&A — 블루 Q 배지 | `.qa > h3 + p` 반복 2~3개 |
| `card-metric` | KPI 2~3개 나란히 | `.metrics > .m > .v(숫자)+.l(라벨)` |
| 모디파이어 | `.center`(중앙정렬) `.compact`(밀도↓) | `<!-- _class: card-stat center -->` |

**워터마크(`.wm`)** — 기본 사용 안 함. 우하단 대형 저채도 글리프가 필요할 때만 `<div class="wm">≠</div>` 식으로 명시 삽입(섹션 번호 01/02는 산만해 보여 기본 덱에서는 뺀다).

**밀도 부품 (v1.1 — 빈약해 보이지 않게)**

- `<p class="lead">…</p>` — h1 바로 아래 리드 문단 (ink-mute 36px). content 카드는 리드 1문장 권장
- `<span class="li-sub">…</span>` — 불릿 안 둘째 줄 보조 설명 (31px ink-mute). 주장(li 본문) + 근거(li-sub) 2단 구성
- content 카드 기준 분량: 리드 1문장 + 불릿 2~4개(각각 li-sub 가능) — 3요소 미만이면 카드가 비어 보임

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
