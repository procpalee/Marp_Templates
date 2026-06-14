---
marp: true
theme: procpa-vivid
paginate: true
size: 16:9
header: 'procpa-vivid — Modern Editorial'
footer: '© 2026 · procpa.co.kr'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="eyebrow">procpa-vivid · Slide system</div>

# 회계와 AI 생산성을, 더 선명하게.

## 화이트 캔버스 · Vivid Blue 단일 강조색 · 헤어라인 에디토리얼 레이아웃 — 블로그(procpa.co.kr) 디자인 시스템을 슬라이드로.

build with clarity · 2026

---

<!-- _class: toc -->
<!-- _header: '' -->

# 목차

1. 디자인 원칙 <em>화이트 + 단일 블루 + 여백</em>
2. 핵심 지표 <em>tabular-num KPI</em>
3. 레이아웃 어휘 <em>카드 · 비교 · 코드 · 단계</em>
4. 인용과 마무리 <em>callout · CTA</em>

---

<!-- _class: section -->
<!-- _header: '' -->

# 01

## 디자인 원칙 — Vivid Blue editorial

---

# 기본 콘텐츠 슬라이드

본문은 **Pretendard**로 18pt / line-height 1.6에 음의 자간(-0.011em)을 적용해 프리미엄 가독성을 냅니다. 제목 아래 **헤어라인 구분선**이 에디토리얼 리듬을 만듭니다.

- 강조색은 **Vivid Blue `#2563eb` 단 한 종** — 파스텔·네이비를 쓰지 않습니다.
- 인라인 `code`는 muted 배경의 토큰칩으로 처리됩니다.
- 깊이는 그림자가 아니라 **헤어라인 + 여백**에서 옵니다.

> 인용은 좌측 3px 블루 바 + soft blue wash 콜아웃으로 렌더됩니다.

---

<!-- _class: metric-row -->

# 한눈에 보는 임팩트

<div class="metrics">
<div class="metric">
<div class="num">3.2<span class="unit">×</span></div>
<div class="label">문서 작성 속도</div>
<div class="desc">AI 초안 + 검토 워크플로</div>
</div>
<div class="metric">
<div class="num">87<span class="unit">%</span></div>
<div class="label">반복 작업 자동화</div>
<div class="desc">계정과목별 에이전트</div>
</div>
<div class="metric">
<div class="num">12<span class="unit">h</span></div>
<div class="label">주당 절감 시간</div>
<div class="desc">결산·조서 작성 기준</div>
</div>
</div>

---

<!-- _class: feature-cards -->

# 레이아웃 어휘 — 카드

<div class="cards">
<div class="card">
<h4>Structure</h4>
<h3>헤어라인 섹션</h3>
<p>제목 아래 1px 구분선과 넉넉한 여백으로 에디토리얼 위계를 만듭니다.</p>
</div>
<div class="card">
<h4>Accent</h4>
<h3>단일 블루</h3>
<p>강조는 색 한 종으로 제한해 시선을 분산시키지 않습니다.</p>
</div>
<div class="card">
<h4>Type</h4>
<h3>Pretendard</h3>
<p>숫자는 tabular-nums로 정렬해 지표 가독성을 높입니다.</p>
</div>
</div>

---

<!-- _class: split -->

# 분할 레이아웃

<div class="cols">
<div>

#### 기존 방식

계정과목별 담당자가 데이터를 수기로 검증하고, 인차지·매니저·파트너가 순차 검토합니다.

</div>
<div>

#### AI 증강 방식

각 계정 에이전트가 1차 수행하고 **독립 검증 에이전트**가 교차 확인, 사람은 최종 서명만.

</div>
</div>

---

<!-- _class: comparison -->

# 비교 — 보더 테이블

| 속성 | 기존 감사 | AI 증강 감사 |
|---|---|---|
| 1차 검증 | 담당 회계사 | 계정별 에이전트 |
| 교차 검증 | 순차 리뷰 | 독립 검증 에이전트 |
| 사람의 역할 | 전 과정 | 최종 검토·서명 |
| 소요 시간 | 기준 100% | 약 40% |

---

<!-- _class: code-focus -->

# 코드 중심 슬라이드

```python
class AuditAgent:
    def __init__(self, account: str):
        self.account = account

    def verify(self, ledger: Ledger) -> Result:
        anomalies = self.scan(ledger)
        return Result(self.account, anomalies)
```

---

<!-- _class: steps -->

# 도입 단계

1. **환경 설정** — 애드인 설치 + 플랜 활성화
2. **가이드 작성** — 회사 업무 매뉴얼을 User Instructions로
3. **도구 연결** — DART MCP·ERP 커넥터 연동
4. **검증 루프** — 독립 검증 에이전트로 교차 확인

---

<!-- _class: callout-hero -->

> AI는 회계사를 대체하지 않습니다. AI를 쓰는 회계사가 그렇지 않은 회계사를 대체합니다.
>
> 2026 회계업계 AI 컨퍼런스 기조연설

---

<!-- _class: quote -->

> 신뢰는 숫자가 아니라 공시의 명료성에서 시작합니다.

Big 4 Audit Methodology Handbook

---

<!-- _class: statement -->

# 본질은 사라지지 않습니다. <strong>제3자의 독립성</strong>이 감사 제도의 핵심입니다.

ProcPA — 최신 AI 인사이트

---

<!-- _class: image-split -->

![bg left](https://picsum.photos/seed/procpa/1000/1200)

<div class="body">

<div class="eyebrow">Field note</div>

# 실무에서 검증된 워크플로

현장 감사 조서 작성부터 분석적 검토까지, 단계별 에이전트가 사람의 판단을 보조합니다.

</div>

---

<!-- _class: closing-cta -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<span class="pill">구독하기</span>

# 더 많은 인사이트를 procpa.co.kr에서.

procpa.co.kr · @procpalee

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다.

## 한국공인회계사 이재현 · 회계 × AI 생산성

procpa.co.kr · 2026
