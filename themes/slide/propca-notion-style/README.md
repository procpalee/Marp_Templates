# propca-notion-style — 옵션 카탈로그 (한 장 요약)

propca-notion-style 테마로 슬라이드를 만들 때 선택할 수 있는 **모든 옵션**을 한 페이지로 정리한 카탈로그입니다.
상세 디자인 근거는 [`design.md`](design.md), 자동 매칭 규칙은 [`layout-heuristics.md`](../../../.claude/skills/md-to-marp-propca/references/layout-heuristics.md) 참조.

> **동기화 규칙**: 레이아웃/색상/톤/커버/헬퍼를 추가·제거·변경하면 이 파일의 해당 표를 같은 커밋에서 갱신합니다 (CLAUDE.md 명시).

---

## 1. 색상 테마 (front matter `theme:`으로 선택)

| 테마 | 시그니처 | 적합 컨텍스트 | 상태 |
|---|---|---|---|
| `propca-notion-style` | purple `#5645d4` + navy `#0a1530` | 회계·자문·기본 | ✅ 베이스 (자동 매칭 기본값) |
| `propca-notion-style-emerald` | `#10a37f` | 환경·헬스케어 | ✅ 구현 ([데모](propca-notion-style-emerald.md)) |
| `propca-notion-style-slate` | `#64748b` | 법률·미니멀·B2B | ✅ 구현 ([데모](propca-notion-style-slate.md)) |
| `propca-notion-style-ocean` | `#0072c6` | 테크·SaaS·핀테크 | ✅ 구현 ([데모](propca-notion-style-ocean.md)) |
| ROSE `#d14d72` / AMBER `#e09b3d` | — | 마케팅 / 출판·문화 | 카탈로그만 ([color-variants.md](color-variants.md)) |

- 변형 3종은 베이스를 `@import` 상속 — 베이스 갱신이 자동 전파, 모든 레이아웃·헬퍼·톤 프리셋 동일 동작 (design.md §12)
- **자동 매칭(md-to-marp)은 항상 베이스 사용** — 변형은 사용자가 front matter로 직접 지정

## 2. 톤 프리셋 3종 (`_class` 합성 — 색상 테마와 자유 조합)

| 프리셋 | 대상 | 효과 | 자동 트리거 (purpose 키워드) |
|---|---|---|---|
| `tone-exec` | 임원·이사회 보고 | purple → navy 계열 절제 + 파스텔 저채도 | 임원/이사회/보고 |
| `tone-lecture` | 강의·교육 | purple → orange `#dd5b00` | 강의/교육/수업 |
| `tone-seminar` | 대외 세미나·컨퍼런스 | 카드 lavender 틴트 + 인용 pink 보더 | 세미나/컨퍼런스 |

적용: front matter `class: tone-exec` + 모든 spot directive에 합성(`<!-- _class: cards tone-exec -->`) — md-to-marp-propca `tone=` 인자가 자동 수행. 시각 카탈로그: [tone-variants.md](tone-variants.md). (design.md §15)

## 3. 커버 변형 6종

| 클래스 | 톤 | 적합 컨텍스트 |
|---|---|---|
| `cover` (기본) | Navy 그라데이션 | 회계법인·정통 발표 |
| `cover-image` | 배경 이미지 + navy 오버레이 | 키노트·런칭 |
| `cover-split` | 좌 이미지 / 우 navy | 인물·제품 비주얼 |
| `cover-minimal` | 흰 배경 + 88pt H1 | 메시지 강조 |
| `cover-band` | 상단 8px purple 띠 | 정통 보고서 |
| `cover-photo-full` | 풀블리드 사진 | 브랜드 캠페인 |

시각 카탈로그: [cover-variants.md](cover-variants.md). (design.md §11)

## 4. 레이아웃 37종 (자동 매칭 35 + 수동 전용 2)

자동 매칭 규칙 40개가 아래 클래스로 출력합니다. 표시 없는 것은 모두 자동 매칭 대상.

| 카테고리 | 레이아웃 |
|---|---|
| **셸 (입출구)** | `cover`(+변형 5) · `toc-split` · `section` · `session-break` · `qa` · `thanks-contact` · `end` |
| **2개 비교** | `compare` · `two-image` · `before-after` · `compare-cards`(VS 뱃지) · `compare-table` |
| **3+ 비교** | `feature-compare` · `comparison-3up` |
| **개념 정의·Q&A** | `definition-cards` · `concept-list` · `concept-table` · `faq` |
| **단계·일정** | `timeline` · `vertical-timeline` · `step-image-guide` · `step-text` · `roadmap` · `schedule` |
| **시각 강조·인용** | `hero-quote`(출처 유무 무관) · `image-quote` · `pastel-blocks` · `gallery-grid` |
| **리스트 변형** | `icon-list` · `toggle-list` · `checklist` · `block-features` · `cards` · `pros-cons` |
| **코드·사이드바** | `code-focus` · `content-sidebar` |
| **수동 지정 전용** | `agenda` · `gallery-4`(2×2 고정) |

- 쇼케이스(전 레이아웃 실물): [propca-notion-style.md](propca-notion-style.md) / [propca-notion-style.html](propca-notion-style.html)
- 제거됨 (2026-06): ~~`story-arc`~~ ~~`example-case`~~ ~~`pull-quote`~~ (외부 인용은 hero-quote가 흡수) — design.md §16
- `checklist`는 raw HTML `<li class="todo|done">` 계약 (Marp Core가 GFM task list 미지원)

## 5. 인라인 헬퍼 8종 (어느 슬라이드에서나)

| 헬퍼 | 용도 |
|---|---|
| `.callout info/success/example/warn/danger` | 좌측 purple 바 콜아웃 (danger만 red) |
| `.tag green/yellow/purple/rose/sky/peach/navy` | 인라인 상태 배지 |
| `.chip` / `.chip.solid` / `.chip.outline` | 알약 라벨 |
| `.kbd` | 키보드 키 캡 |
| `.divider` / `.divider.strong` / `.divider.purple` | 가로 구분선 |
| `.note` | 조용한 회색 보조 메모 |
| `.cols-2` / `.cols-3` | 본문 일부 다단 분할 |
| `<figure>` + `<figcaption>` | 이미지+캡션 표준화 |

## 6. 조합 방법

세 축은 독립 — **색상 테마 × 톤 프리셋 × 커버 변형** 자유 조합 가능 (예: OCEAN + tone-exec + cover-band).

```yaml
---
marp: true
theme: propca-notion-style-ocean   # 1축: 색상
class: tone-exec                   # 2축: 톤
---
<!-- _class: cover-band tone-exec -->  # 3축: 커버 (+톤 합성)
```

## 7. 빌드

```
cd build
npm run build:propca-notion-style              # 쇼케이스
npm run build:propca-{emerald,slate,ocean}     # 색상 변형 데모
npm run build:tone-variants                    # 톤 카탈로그
```

## 백로그

- `roadmap` `.tier.featured::before` `'진행 중'` 한글 하드코딩 토큰화
- `two-image` 캡션 스타일 정교화
- KPI/big-number 계열 레이아웃 재도입 검토
