# procpa-vivid — 용도별 카탈로그 (v8 CORE)

v8 레이아웃 다이어트(2026-07) 이후의 **실사용 카탈로그**다. 여기 없는 section 레이아웃은 전부 `[ARCHIVE]`(design.md §5-A) — 신규 덱에서 쓰지 않는다. 컴포넌트 조합 레시피는 [`vivid-recipes.md`](../../../.claude/skills/md-to-marp-propca/references/vivid-recipes.md).

- **분류 표기**: `(레이아웃)` = `<!-- _class: X -->` 한 장 전용 · `(블록)` = `.cols-*`에 넣는 조합 컴포넌트 · `(인라인)` = 본문과 섞어 쓰는 요소 · `(modifier)` = `_class`에 합성.
- ⭐ = 실사용 상위 (한공회 39장 덱 기준).

---

## 1. 덱 골격 (SHELLS)

| 용도 | 클래스 |
|---|---|
| 표지 | `cover` ⭐ (기본, 상단 블루 라인) · `cover-image` (배경사진 + 스크림) · `cover-split` (좌측 사진 분할, v8.1 복귀) |
| 전환/목차 | `section` ⭐ (88pt 챕터 번호) · `toc` ⭐ (`<li class="current">` 진행 강조) |
| 마무리 | `qa` (거대 ? 워터마크) · `thanks-contact` (연락처 4채널 + QR) · `end` (폐막) · `session-break` (긴 강의 휴식, v8.2 복귀) |
| 썸네일 | `thumb` (블로그/OG — 썸네일 시스템은 `themes/thumbnail/procpa-vivid/` 참조) |

## 2. 본문 레이아웃 (CORE 10종)

| 용도 | 클래스 | 비고 |
|---|---|---|
| 본문 + 이미지/스크린샷 | `split` ⭐⭐ | 실사용 1위. 이미지 자동 프레임. `code-lg` 합성 가능 |
| 특징·전략 3~4개 | `feature-cards` ⭐ | `.cards` 아래 `.card` N개 |
| 본문 + 참고 박스 | `content-sidebar` ⭐ | `.layout > .main / .aside` |
| 1:1 대형 비교 | `comparison-vs` ⭐ | `.compact` 지원 |
| 표 비교 | `comparison` | `.compact` 지원 |
| 번호 단계 | `steps` | `ol` 자동 배지 |
| 배지 리스트 | `icon-list` | `em`=mono 배지, `.compact` 지원 |
| 체크/점검 목록 | `checklist` | `li.done`=✓, v8.1 복귀 (고정 행 간격) |
| Q&A 3쌍+ | `faq` | Q 배지, v8.2 복귀 |
| 연혁·시간축 | `vertical-timeline` | 수직 레일 + 번호 배지, v8.2 복귀 |

## 3. 임팩트 (덱당 1~3장)

| 용도 | 클래스 |
|---|---|
| 대형 선언 (다크) | `statement` / `statement light` (화이트 + `<p class="accent">`) |
| 핵심 결론 | `takeaway` |
| 전면 인용 | `callout-hero` |

## 4. 블록 컴포넌트 (`.cols-*` 조합 — 컴포넌트 우선의 본체)

- 래퍼: `.cols-2` / `.cols-3` / `.cols-4` / `.stack` / `.split-7-5` ⭐
- `.card` ⭐ (+`.accent`/`.featured`/`.top-rule`/`.num`/`.ico`) · `.stat` · `.vs` ⭐ · `.board`(`.two`/`.four`) · `.panel`(`.accent`/`.soft`) · `.process`

## 5. 인라인 컴포넌트

`.callout`(5종) ⭐ · `.quote-block` · `.code-block` · `.table-block` · `.mark` · `.tag`(4변형) · `.chip` · `.kbd` · `.note` · `.divider` · `figure` · `.shot` ⭐ · `.eyebrow` ⭐ · `.accent` · `.muted`

## 6. Modifier

`compact` · `roomy` · `code-lg` ⭐ — `<!-- _class: split code-lg -->`처럼 합성.

---

> 유지 규칙: 이 카탈로그·design.md §5·`procpa-vivid-matching.md`·`vivid-recipes.md`는 **같은 커밋에서 함께 갱신**한다. 사용 빈도 재집계는 `build/count-usage.mjs`.
