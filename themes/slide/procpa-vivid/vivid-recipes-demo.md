---
marp: true
theme: procpa-vivid
paginate: true
header: ''
footer: 'PROCPA · 컴포넌트 레시피 데모'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 컴포넌트 레시피 데모

## v8.1 CORE — 아카이브 레이아웃을 대체하는 조합 표준 R-01 ~ R-12

2026.07

---

# R-01 · 병렬 개념 카드 — 舊 grid-3/block-features 대체

핵심은 하나입니다. **AI가 잘하는 일과 사람이 잘하는 일을 구분**하는 것.

<div class="cols-3">
<div class="card top-rule"><h4>전략 1</h4><h3>자가 검증</h3><p>산출물을 AI가 스스로 교차 검증하는 하네스 구성. 합계 대사·건수 체크를 규칙으로 강제</p></div>
<div class="card top-rule"><h4>전략 2</h4><h3>암묵지 문서화</h3><p>머릿속 판단 기준을 마크다운 위키로 외재화. AI가 읽을 수 있는 형태가 곧 자산</p></div>
<div class="card top-rule"><h4>전략 3</h4><h3>도메인 결합</h3><p>회계 지식 × AI 도구 — 개발자도, AI 단독도 못 하는 실무자만의 조합</p></div>
</div>

<div class="callout success"><strong>포인트</strong> — 병렬 개념은 3개 단위가 기본. 번호 요약이면 <code>.card > .num</code>, 아이콘이면 <code>.ico</code>로 순환.</div>

---

# R-02 · 주장 + 근거 — 舊 lead-support/big-insight 대체

## 결국 AI 활용은 <span class="accent">'불확정성'</span>을 다루는 능력으로 귀결됩니다

<div class="cols-3">
<div class="card"><h4>근거 1</h4><h3>확률 모델</h3><p>같은 프롬프트도 매번 다른 결과 — 본질적으로 통제 불가능한 영역이 존재</p></div>
<div class="card"><h4>근거 2</h4><h3>무관용 도메인</h3><p>재무·회계는 오차 허용이 0에 수렴 — 90% 정확도는 실무에서 0점</p></div>
<div class="card"><h4>근거 3</h4><h3>검증이 격차</h3><p>검증 체계를 갖춘 실무자만 생산성 격차를 만든다 — 도구는 이미 평준화</p></div>
</div>

<div class="note">숫자 근거가 있으면 카드 대신 <code>.stat</code>을 소량 섞는다 — 단, KPI 밴드 전면 배치는 하지 않음 (v8.1).</div>

---

# R-03 · 문제 → 해결 — 舊 problem-solution/gap-analysis 대체

계정별원장 3만 행, 시트 47개. 어디서부터 시작해야 할까요?

<div class="cols-2">
<div class="card"><h4>문제</h4><h3>시트 분할 원장</h3><p>계정과목별로 시트가 나뉘어 있어 전체 통합 분석이 <strong>불가능</strong>. 수작업 병합은 이틀, 휴먼 에러는 덤</p></div>
<div class="card accent"><h4 class="eyebrow">해결</h4><h3>단일 테이블 통합</h3><p>클로드 엑셀로 시트를 병합하고 피벗 구조로 재편. 계정 코드 표준화까지 <strong>10분</strong></p></div>
</div>

<div class="callout">반복 수작업(시트 병합)은 AI가, <strong>계정 매핑 판단</strong>은 사람이.</div>

---

# R-04 · 장단점 ✓/✗ — 舊 pros-cons 대체

<div class="vs">
<div class="vs-side accent"><h4>클로드 엑셀</h4><h3>자연어 제어</h3>

- ✓ 자연어로 수식·서식 제어
- ✓ 시트 전체 맥락 이해
- ✓ 반복 작업 일괄 처리
- ✓ 작업 과정 로그가 남음

</div>
<div class="vs-mid"></div>
<div class="vs-side"><h4>수작업</h4><h3>전통 방식</h3>

- ✗ 계정 1,000개 수동 매핑
- ✗ 휴먼 에러 누적
- ✗ 담당자 교체 시 인수인계 공백
- ✓ 판단이 필요한 예외 처리

</div>
</div>

<div class="callout warn"><strong>⚠️ 주의</strong> — 어느 쪽이든 최종 검토 책임은 사람에게 있습니다. AI 산출물도 대사(Cross-check) 없이 제출 금지.</div>

---

# R-05 · 본문 + 참고 박스 — 舊 situation-insight 대체

<div class="split-7-5">
<div>

**감사 조서 자동화의 현재 상황**

- **데이터 조회**: MCP 연동으로 베타 조회 서비스 직접 수집
- **문서 생성**: 워드·엑셀 테마 스킬로 서식 일관성 확보
- **검증**: 독립 서브에이전트가 산출물 교차 검토
- **잔여 수작업**: 예외 항목 판단, 거래처 소명 대응
- **다음 단계**: 조서 리뷰 코멘트 자동 회신 초안

</div>
<div class="panel accent"><h4>시사점</h4><h3>조서의 절반은 이미 자동화 가능</h3><p>남은 절반이 실무자의 부가가치 영역. 여기에 시간을 재배치하는 것이 핵심입니다.</p></div>
</div>

---

# R-06 · 흐름 3~5단계 — 舊 flow-arrow/timeline 대체

실습·사례는 이 4단계로 슬라이드를 나눕니다. 흐름 요약 장에서는 `.process` 하나로:

<div class="process">
<div class="process-step"><span class="n">01</span><h3>상황 정의</h3><p>원장 구조와 목표 산출물을 명시. 제약 조건(마감·서식)까지 문서화</p></div>
<div class="process-step"><span class="n">02</span><h3>프롬프트</h3><p>스킬·컨텍스트를 붙여 지시. 검증 기준을 프롬프트에 포함</p></div>
<div class="process-step"><span class="n">03</span><h3>자가 검증</h3><p>합계 대사·건수 체크 자동 수행. 불일치 시 AI가 스스로 재시도</p></div>
<div class="process-step"><span class="n">04</span><h3>최종 검토</h3><p>사람이 예외 항목만 확인. 검토 시간 80% 절감</p></div>
</div>

<div class="note">단계가 5개를 넘거나 설명이 길면 세로형 <code>steps</code> 레이아웃으로 전환.</div>

---

# R-07 · 용어 정의 — 舊 definition 대체

이번 강의에서 가장 중요한 개념 하나만 꼽으라면 이것입니다.

<div class="panel accent"><h4>용어</h4><h3>하네스 엔지니어링 (Harness Engineering)</h3><p>AI가 스스로 검증하고 반복하도록 작업 환경(도구·규칙·피드백 루프)을 설계하는 것. 프롬프트 한 줄보다 환경 설계가 결과 품질을 좌우합니다. 프롬프트가 '말'이라면 하네스는 '시스템'입니다.</p></div>

<div class="cols-2">
<div class="card"><h4>나쁜 예</h4><p>"엑셀 정리해줘" — 매번 다른 결과, 검증 없음</p></div>
<div class="card accent"><h4 class="eyebrow">좋은 예</h4><p>합계 대사 시트 자동 생성 규칙 + 불일치 시 재시도 루프</p></div>
</div>

---

# R-08 · Q&A 목록 — 舊 faq 대체

<div class="stack">
<div class="panel"><h4>Q. AI가 회계사를 대체하나요?</h4><p>반은 맞고 반은 틀립니다. 대체되는 것은 '작업'이지 '책임'이 아닙니다. 서명하는 사람은 여전히 회계사입니다.</p></div>
<div class="panel"><h4>Q. 비개발자도 시작할 수 있나요?</h4><p>자연어 지시가 기본이라 가능합니다. 다만 산출물을 그대로 믿지 않는 검증 습관이 필수입니다.</p></div>
<div class="panel"><h4>Q. 보안은 어떻게 하나요?</h4><p>민감 데이터는 마스킹 후 투입 — 다만 이는 기술적 방안일 뿐 법적 안전을 보장하지는 않습니다.</p></div>
<div class="panel"><h4>Q. 어디서부터 시작하죠?</h4><p>매주 반복하는 작업 하나를 골라 자동화 → 검증 → 표준화. 이 사이클을 한 바퀴 돌리는 것이 시작입니다.</p></div>
</div>

---

# R-09 · 이미지 2장 병렬 — 舊 two-image/before-after 대체

<div class="cols-2">
<figure><img src="assets/placeholder-shot.svg" alt="" /><figcaption>Before — 수작업 원장 정리 화면 (시트 47개, 이틀 소요)</figcaption></figure>
<figure><img src="assets/placeholder-shot.svg" alt="" /><figcaption>After — 클로드 엑셀 통합 결과 (단일 테이블, 10분)</figcaption></figure>
</div>

<div class="callout success"><strong>포인트</strong> — 이미지 1장 + 본문이면 <code>split</code> 레이아웃이 기본값. 2장 병렬 비교일 때만 이 레시피.</div>

---

<!-- _class: checklist -->

# R-11 · 체크리스트 — `checklist` 레이아웃 (v8.1 CORE 복귀)

<ul>
<li class="done"><strong>원장 데이터 정규화</strong> — 시트 병합·계정 코드 표준화 완료</li>
<li class="done"><strong>검증 시트 자동 생성</strong> — 합계 대사 규칙을 스킬에 반영</li>
<li class="done"><strong>MCP 데이터 연동</strong> — 베타 조회 서비스 직접 수집 전환</li>
<li><strong>조서 서식 연동</strong> — word-theme 스킬 연결 예정</li>
<li><strong>리뷰 코멘트 자동 회신</strong> — 차기 분기 검토</li>
</ul>

---

# R-12 · 인용 + 해설 — 舊 quote 대체

<div class="quote-block"><p>"사내 코드의 30% 이상을 이미 AI가 작성하고 있다"</p><span class="cite">— 순다르 피차이, Alphabet</span></div>

코드가 그렇다면, 정형화된 회계 문서는 더 빠르게 같은 경로를 밟습니다.

<div class="cols-2">
<div class="card"><h4>이미 일어난 일</h4><p>표준 분개·증빙 대사·조서 초안의 자동 생성</p></div>
<div class="card"><h4>아직 사람의 일</h4><p>회계 판단, 예외 처리, 그리고 서명의 책임</p></div>
</div>

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다

## 레시피 전체 정의 — vivid-recipes.md · R-10은 결번(KPI 밴드 삭제)

PROCPA · 2026.07
