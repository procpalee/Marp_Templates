# procpa-vivid 매칭 규칙 (theme 분기용) — 컴포넌트 우선 · v8 CORE

사용자가 **procpa-vivid**(화이트 + Vivid Blue 단일강조 + 헤어라인 에디토리얼)를 타깃으로 요청하면, propca-notion-style 40 규칙 대신 **이 결정 규칙**을 적용하고 출력 front matter를 `theme: procpa-vivid`로 한다. 전체 어휘·컴포넌트 API·스니펫은 [`themes/slide/procpa-vivid/design.md`](../../../themes/slide/procpa-vivid/design.md)가 단일 출처. 조합 레시피는 [`vivid-recipes.md`](vivid-recipes.md), 사용자 문체·밀도 규칙은 [`user-style-profile.md`](user-style-profile.md)를 **함께 로드**한다.

> **v8 (2026-07)**: 레이아웃이 CORE 세트(아래 표에 나오는 것 전부)로 축소됐다. `[ARCHIVE]` 레이아웃(하단 금지 목록)은 CSS에 남아 있어도 **출력 금지** — 같은 표현은 레시피로 조립한다.

## 핵심 원칙 — 컴포넌트로 먼저 조립, 레이아웃은 임팩트에만

슬라이드마다 아래 순서로 판단한다:

1. **셸 먼저** — 첫 장은 `cover`(사진 있으면 `cover-image`), 큰 단락 전환은 `section`, 목차는 `toc`, 마지막은 `qa`/`thanks-contact`/`end`.
2. **공통 컴포넌트로 조립할 수 있나?** — **가능하면 무조건 컴포넌트**. `<!-- _class -->` 없이 본문에 컴포넌트를 배치하고, 여러 개면 `.cols-2/3/4`·`.stack`·`.split-7-5` 래퍼에 담는다. 한 장에 여러 컴포넌트 OK. 전형적 조합은 [`vivid-recipes.md`](vivid-recipes.md)의 R-01~R-12를 그대로 따른다.
   - 컴포넌트: `.card`(+`.accent`/`.featured`/`.top-rule`/`.num`/`.ico`) · `.stat`(KPI) · `.vs`(1:1) · `.board`(칸반) · `.panel`(제목 박스) · `.process`(A→B→C) · `.quote-block`(인용) · `.callout`(5종) · `.code-block`(파일명 헤더 코드) · `.table-block`(표, 회계 스타일/`.compact`) · 인라인 `.eyebrow`/`.accent`/`.muted`/`.mark`/`.tag`(+변형)/`.chip`/`.kbd`/`.note`/`.divider`/`figure`/`.shot`.
3. **CORE 본문 레이아웃 10종** — 한 장 전체가 단일 구조일 때: `split` · `feature-cards` · `content-sidebar` · `comparison-vs` · `comparison` · `steps` · `icon-list` · `checklist` · `faq` · `vertical-timeline`.
4. **임팩트 3종은 덱당 1~3장** — `statement`(+`light`) · `takeaway` · `callout-hero`. "여기서만 화면을 통째로 쓰겠다"는 의도가 있을 때만.
5. **맞는 표현이 없으면** → 레시피로 최대한 근사하고, 반복적으로 필요하면 **신규 레이아웃 후보로 표시**(design.md §"새 레이아웃 추가" → CSS `PROJECT LAYOUTS`). ARCHIVE를 되살리지 않는다.
6. **반복 회피** — 같은 역할이 2회 이상이면 다른 컴포넌트/레시피로 돌려쓴다(예: 카드 → `.card` / `.card.top-rule` / `.card.ico` 순환).

## MD 신호 → ① 1순위 컴포넌트·레시피 / ② CORE 레이아웃(전면 구조일 때)

| MD 신호 | ① 컴포넌트·레시피 (기본) | ② CORE 레이아웃 |
|---|---|---|
| 첫 슬라이드 (H1+H2+날짜) | — | `cover` (전면 사진: `cover-image`, 좌측 사진 분할: `cover-split`) |
| `# 숫자` + `## 제목` 단독 | — | `section` |
| 목차/아젠다 ol | — | `toc` |
| 본문 + 스크린샷/이미지 | `.shot`(본문 중 1장) | `split` (기본값 — 실사용 1위) |
| 특징/요소 3~4개 | `.cols-3`/`.cols-4` + `.card`(R-01) | `feature-cards` |
| 본문 + 참고/사양 박스 | `.split-7-5` + `.panel`(R-05) | `content-sidebar` |
| "A vs B" 1:1 | `.vs` (✓/✗ 리스트는 R-04) | `comparison-vs`(+`compact`) |
| 3+ 옵션 비교 | `.cols-3` + `.card.featured` | `comparison`(표, +`compact`) |
| 2~4 큰 숫자 + 라벨 | `.cols-2/3/4` + `.stat` 소량(R-02) | — (KPI 밴드 미사용, v8.1) |
| 문제→해결 / 현재→목표 | `.cols-2` + `.card`/`.card.accent`(R-03) | — |
| A→B→C 흐름 | `.process`(R-06) | `steps`(세로 번호) |
| 연혁·시간축·로드맵 | — | `vertical-timeline`(v8.2 복귀) |
| 분류·진행 보드 | `.board`(+`.two`/`.four`) | — |
| 한 문장 핵심/결론 | `.quote-block` + `.eyebrow` | `takeaway` → `statement`/`statement light` |
| 인용/권위 | `.quote-block` | `callout-hero`(전면) |
| 체크/점검 목록 (✓/○) | — | `checklist`(`li.done`=✓, v8.1 복귀) |
| 배지+설명 나열 | — | `icon-list`(+`compact`) |
| 강조 메모/주의 | `.callout`(info/success/warn/danger/example) | — |
| 용어 + 정의 | `.panel.accent`(R-07) | — |
| Q&A 쌍 3개+ | — | `faq`(Q 배지, v8.2 복귀) |
| Q&A 쌍 1~2개 (본문 중) | `.stack` + `.panel`(R-08: h4=Q, p=A) | — |
| 2단 본문 | `.cols-2` · `.split-7-5` | `split` |
| 표 데이터 | `.table-block`(`.compact`/캡션, 숫자열 `---:`) | `comparison` |
| 코드 펜스 | `.code-block`(파일명/언어 헤더) | 투사 시 `_class`에 `code-lg` 합성 |
| 이미지 2+ | `.cols-2` + `figure`(R-09) | — |
| 마지막 (Q&A/연락/폐막) | — | `qa` / `thanks-contact` / `end` |
| 긴 강의 휴식 안내 | — | `session-break`(v8.2 복귀) |

## 금지

- **ARCHIVE 레이아웃 출력 ❌** (28종, v8.2): `problem-solution` `gap-analysis` `pros-cons` `timeline` `roadmap` `definition` `code-focus` `image-split` `gallery` `before-after` `grid-3` `quote` `toggle-list` `block-features` `two-image` `comparison-three` `conclusion-cards` `conclusion-split` `conclusion-actions` `situation-insight` `lead-support` `flow-arrow` `big-insight` `metric-row` `closing-cta` `cover-minimal` `cover-band` `cover-photo-full`
- propca 전용 클래스(`pastel-blocks`/`yellow-banner`/`tone-*` 등) 출력 ❌. procpa-vivid 어휘만.
- 강조색은 Vivid Blue 1종(예외: `.callout.danger`·`.tag.danger`의 `--destructive`, 코드 하이라이트).

## 출력 규약

- front matter: `theme: procpa-vivid`, `paginate: true`, `size: 16:9`.
- 첫/마지막 슬라이드 `_paginate: false` + `_header/_footer ''`.
- 마크업 골격·컴포넌트 스니펫은 [`design.md`](../../../themes/slide/procpa-vivid/design.md)와 데모 [`procpa-vivid.md`](../../../themes/slide/procpa-vivid/procpa-vivid.md)의 예시를 그대로 따른다.
- 문체·밀도·강조 정책(불릿 형식, 볼드 규칙, 콜아웃 사용법)은 [`user-style-profile.md`](user-style-profile.md)를 따른다.
