# procpa-vivid 컴포넌트 레시피 (R-01 ~ R-12, R-10 결번)

TIER 1 컴포넌트를 조합해 자주 나오는 슬라이드 유형을 만드는 **표준 조립법**이다. v8에서 ARCHIVE로 강등된 레이아웃의 표현은 전부 여기 레시피로 대체한다. `<!-- _class -->` 없이 본문에 그대로 쓴다 (밀도 조절만 `<!-- _class: compact -->` 합성 가능). 시각 데모: [`vivid-recipes-demo.md`](../../../themes/slide/procpa-vivid/vivid-recipes-demo.md).

**여백 원칙**: 레시피 한 개로 슬라이드가 절반밖에 안 차면 잘못 쓴 것 — 항목 수를 늘리거나(카드 3→4, 리스트 2→3), 하단에 `.callout`/`.note` 요약 한 줄을 붙이거나, 다른 컴포넌트를 한 개 더 조합해 캔버스를 채운다.

공통 규칙:
- 래퍼는 `.cols-2/3/4`(그리드) · `.stack`(세로) · `.split-7-5`(비대칭 1.4:1)만 사용.
- 색은 전부 토큰 — 인라인 HEX 금지. 강조는 Vivid Blue 1종.
- 같은 레시피를 연속 2장 이상 반복하지 않는다 (카드 변형 `.accent`/`.top-rule`/`.num`/`.ico`로 순환).

---

## R-01 · 병렬 개념 카드 (3~4개)  — 舊 grid-3/block-features/conclusion-cards 대체

```html
<div class="cols-3">
<div class="card top-rule"><h4>라벨</h4><h3>제목</h3><p>설명 한 줄.</p></div>
<div class="card top-rule"><h4>라벨</h4><h3>제목</h3><p>설명 한 줄.</p></div>
<div class="card top-rule"><h4>라벨</h4><h3>제목</h3><p>설명 한 줄.</p></div>
</div>
```
- 번호 요약이면 `.card` 안 첫 줄에 `<div class="num">01</div>` (舊 conclusion-cards).
- 아이콘 느낌이면 `<div class="ico">◆</div>` (舊 block-features).

## R-02 · 주장 + 근거 / 데이터 + 결론  — 舊 lead-support/big-insight 대체

```markdown
# 핵심 주장을 한 문장으로 <span class="accent">강조어</span>와 함께

<div class="cols-3">
<div class="card"><h4>근거 1</h4><p>…</p></div>
<div class="card"><h4>근거 2</h4><p>…</p></div>
<div class="card"><h4>근거 3</h4><p>…</p></div>
</div>
```
- 데이터가 근거면 `.card` 대신 `.stat` 3개. 결론을 더 세게 치려면 이 장 대신 `takeaway` 1장.

## R-03 · 문제 → 해결 / 현재 → 목표  — 舊 problem-solution/gap-analysis 대체

```html
<div class="cols-2">
<div class="card"><h4>문제</h4><h3>현재 상태</h3><p>…</p></div>
<div class="card accent"><h4 class="eyebrow">해결</h4><h3>목표 상태</h3><p>…</p></div>
</div>
```
- 좌 = 무채 `.card`, 우 = `.card.accent`(블루 좌측 바)로 방향성 표현. 필요 시 하단 `.callout`로 격차 한 줄 요약.

## R-04 · 장단점 ✓/✗  — 舊 pros-cons 대체

```html
<div class="vs">
<div class="vs-side accent"><h4>장점</h4>

- ✓ 항목
- ✓ 항목

</div>
<div class="vs-mid"></div>
<div class="vs-side"><h4>단점</h4>

- ✗ 항목
- ✗ 항목

</div>
</div>
```
- ✓/✗는 리스트 텍스트로 직접. 장점 측만 `.accent`.

## R-05 · 본문 + 참고 박스 (비대칭)  — 舊 situation-insight/conclusion-split 대체

```html
<div class="split-7-5">
<div>

본문 마크다운 (불릿·문단)

</div>
<div class="panel accent"><h4>시사점</h4><h3>핵심 한 줄</h3><p>보조 설명.</p></div>
</div>
```
- 참고 정보가 길면 이 레시피 대신 `content-sidebar` 레이아웃.

## R-06 · 흐름/시간축 (가로 3~5단계)  — 舊 flow-arrow/timeline/roadmap 대체

```html
<div class="process">
<div class="process-step"><span class="n">01</span><h3>단계</h3><p>설명.</p></div>
<div class="process-step"><span class="n">02</span><h3>단계</h3><p>설명.</p></div>
<div class="process-step"><span class="n">03</span><h3>단계</h3><p>설명.</p></div>
</div>
```
- 연월이 중요하면 `n`에 `2026.07`처럼 시점 표기. 단계가 5개를 넘거나 설명이 길면 `steps` 레이아웃(세로).

## R-07 · 용어 정의  — 舊 definition 대체

```html
<div class="panel accent"><h4>용어</h4><h3>하네스 엔지니어링 (Harness Engineering)</h3><p>정의 문장.</p></div>
<div class="note">예: 실무 적용 예시 한 줄.</div>
```

## R-08 · Q&A 목록 (소형 — 1~2쌍이 본문에 섞일 때만)

> v8.2에서 `faq` 레이아웃이 CORE로 복귀 — **Q&A가 3쌍 이상이거나 한 장 전체면 `<!-- _class: faq -->`**(`.qa > h3 + p`)를 쓴다. 이 레시피는 본문 중 소형 Q&A 전용.

```html
<div class="stack">
<div class="panel"><h4>Q. 질문?</h4><p>답변 한두 문장.</p></div>
<div class="panel"><h4>Q. 질문?</h4><p>답변 한두 문장.</p></div>
</div>
```
- 3쌍 이하 권장. 넘으면 슬라이드 분할.

## R-09 · 이미지 2장 비교/병렬  — 舊 two-image/before-after/gallery 대체

```html
<div class="cols-2">
<figure><img src="a.png" alt="" /><figcaption>Before — 설명</figcaption></figure>
<figure><img src="b.png" alt="" /><figcaption>After — 설명</figcaption></figure>
</div>
```
- 이미지 1장 + 본문이면 `split` 레이아웃이 기본값.

## R-10 · (결번 — 2026-07 삭제)

KPI 밴드 레시피는 실사용이 없어 삭제했다(`metric-row` 레이아웃도 동시에 ARCHIVE). 숫자를 강조할 때는 R-02처럼 `.stat`을 근거 자리에 소량 섞는 것까지만.

## R-11 · 체크리스트  — `checklist` 레이아웃 사용 (v8.1 CORE 복귀)

콜아웃 조합이 아니라 **전용 레이아웃**을 쓴다:

```html
<!-- _class: checklist -->

# 도입 전 점검 목록

<ul>
<li class="done">원장 데이터 정규화 — 시트 병합·계정 코드 표준화</li>
<li class="done">검증 시트 자동 생성 — 합계 대사 규칙 반영</li>
<li>조서 서식 연동 — word-theme 스킬 연결 예정</li>
</ul>
```
- 완료 = `class="done"`(블루 ✓), 미완료 = 기본(○). 행이 슬라이드 높이를 균등 분할한다.

## R-12 · 인용 + 해설  — 舊 quote 대체

```html
<div class="quote-block"><p>"인용문."</p><span class="cite">— 출처</span></div>

<div class="callout">이 발언이 실무에 의미하는 것 한 줄.</div>
```
- 인용 한 문장으로 장 전체를 치려면 `callout-hero` 레이아웃.

---

> 유지 규칙: 레시피 추가/변경 시 `procpa-vivid-matching.md` 표의 R-번호 참조와 design.md §5 퀵맵을 같은 커밋에서 갱신한다.
