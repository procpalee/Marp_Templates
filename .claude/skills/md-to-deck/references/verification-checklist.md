# 검증 체크리스트 (verification-checklist)

`marp-deck-reviewer` 에이전트가 사용할 검증 항목 명세.

---

## A. Rule-based (자동, 100% 실행)

### A-1. Front matter
- [ ] `marp: true` 존재
- [ ] `theme:` 존재 + 값이 12 테마 중 하나
- [ ] `paginate: true`
- [ ] `size: 16:9`

### A-2. 슬라이드 구조
- [ ] 첫 슬라이드 `<!-- _class: cover -->`
- [ ] 마지막 슬라이드 `<!-- _class: (end|qa|thanks-contact) -->`
- [ ] 슬라이드 ≥ 3개
- [ ] 모든 `<div ...>` 와 `</div>` 위아래 빈 줄

### A-3. 원본 보존
- [ ] 원본의 모든 H2 텍스트가 결과 어딘가에 존재 (substring 검색)
- [ ] 원본 fenced code 개수 == 결과 fenced code 개수
- [ ] 원본 표 개수 == 결과 표 개수

### A-4. 빌드물 검증
- [ ] HTML 파일 존재
- [ ] HTML 파일 크기 ≥ 80KB (CSS 인라인 확인)
- [ ] HTML 내 `section.cover {` CSS 규칙 존재
- [ ] HTML 내 사용된 클래스의 CSS 규칙 존재 (예: grid-3 사용 시 `section.grid-3 {`)

### A-5. Placeholder 부재
- [ ] `TODO`, `TBD`, `XXX`, `FIXME` 부재
- [ ] `<placeholder>`, `<여기에 ...>` 형태 부재
- [ ] `Lorem ipsum` 부재

---

## B. Visual (HTML 분석, 슬라이드별)

### B-1. 레이아웃 무결성
- [ ] grid-3/cards: `.col`/`.card` 정확히 3개 (grid-3) / 정의된 개수 (cards)
- [ ] stats: `.tile` 정확히 4개
- [ ] split/compare: `.col` 정확히 2개 (+ compare는 `.vs` 1개)
- [ ] gallery-4: 이미지 정확히 4개

### B-2. 텍스트 overflow
- [ ] 슬라이드당 본문 라인 ≤ 8
- [ ] 본문 글자 수 ≤ 600
- [ ] 코드블록 내 한 줄 ≤ 80자 (overflow 위험)

### B-3. 콘트라스트 (CSS 트리 검사)
- [ ] cover/section/end의 배경이 다크면 글자색 라이트 확인
- [ ] terminal pre의 배경↔글자 조합 OK
- [ ] callout 4종 배경↔글자 OK

### B-4. 헤더/푸터 충돌
- [ ] cover/end/qa/thanks-contact/session-break/bg-full/image-quote 슬라이드:
  - `_header: ''` 명시
  - `_footer: ''` 명시
  - `_paginate: false` 명시

### B-5. 빈 콘텐츠
- [ ] 본문 0줄 슬라이드 없음 (cover 제외)
- [ ] H1만 있고 본문/컴포넌트 없음 없음

---

## C. Severity 분류

| 등급 | 정의 | 예시 | 자동 수정 |
|---|---|---|---|
| **high** | 빌드 깨짐 또는 의미 손실 | front matter 없음, H2 누락, build fail | 차단 |
| **medium** | 시각적 결함 또는 위치 어긋남 | 카드 폭 불균등, overflow, 헤더 겹침 | 시도 |
| **low** | 미관 개선 | 콘트라스트 약함, 빈 줄 누락 | 알림만 |

`max_retries` 카운트는 high + medium 합산. low는 무한 허용 (알림만).

---

## D. 자동 수정 매핑

검출된 이슈 → 패치 액션:

| 이슈 | 패치 |
|---|---|
| `_header` / `_footer` 누락 (cover/end) | 디렉티브 라인 삽입 |
| grid-3 카드가 `<div>` 없이 평면 | 각 H3 블록을 `<div class="col">` 래핑 |
| 슬라이드 본문 > 8줄 | 슬라이드 중간 `---` 삽입, 제목에 `(계속)` |
| placeholder 발견 | 사용자 알림 + 그대로 두기 (자동 수정 안 함) |
| terminal pre 다크 강제 | CSS에서 처리 (스킬 외부) |
| HTML < 80KB | base CSS 인라인 실패 → 테마 파일 재확인 안내 |

---

## E. 출력 스키마 (고정)

```markdown
# QA Report — <slug>

**Verdict:** PASS | FAIL
**Theme:** <theme>
**Slides:** <N>
**Build:** <KB>
**Retries used:** <K> / <max>

## Rule-based (A)
- [x] A-1 front matter
- [x] A-2 slide structure
- [FAIL] A-3 H2 preservation (missing: "도입 배경")
- [x] A-4 build artifact
- [x] A-5 placeholders

## Visual (B)
### Slide 7 (grid-3)
- B-1 카드 개수: FAIL (2개만 검출, 3개 기대) — high
- B-2 텍스트 길이: OK

### Slide 14 (stats)
- B-1 tile 개수: OK
- B-2 KPI 중 빈 항목: 1 — medium

## Auto-fix attempts
- slide 7 grid-3 → `<div class="col">` 래핑 추가 ✓
- slide 14 빈 KPI → 사용자 알림 (자동 수정 안 함)

## Verdict reasoning
medium 이슈 1건 남았으나 high 이슈 없음 → PASS

## Recommendations
- slide 14의 빈 KPI를 채우거나 stats → kpi-row로 전환 권장
```
