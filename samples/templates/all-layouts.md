---
marp: true
theme: tech-modern
paginate: true
size: 16:9
header: 'Marp Template — All Layouts'
footer: '© 2026 · MD to PPT'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Marp 슬라이드 자동화

## 15 테마 × 26 레이아웃 마스터 템플릿

작성자 · Tech Lab · 2026

---

<!-- _class: agenda -->

# 오늘 다룰 내용

1. 레이아웃 시스템 개요
2. 콘텐츠 레이아웃 13종
3. 인용·코드 레이아웃 3종
4. 이미지 레이아웃 5종
5. 클로징 레이아웃 4종

---

<!-- _class: section -->
<!-- _header: '' -->

# 01

## 콘텐츠 레이아웃

---

<!-- _class: split -->

# Before vs 비교

<div class="col">

### 기존 워크플로우

- 수동 슬라이드 분절
- 디렉티브 수기 입력
- 디자인 일관성 결여
- 반복 작업 부담

</div>
<div class="col">

### 자동 워크플로우

- H1/H2 기준 자동 분절
- 휴리스틱 클래스 매칭
- 15 테마 일관 시스템
- 한 줄 명령으로 변환

</div>

---

<!-- _class: grid-3 -->

# 세 가지 핵심 가치

<div class="col">

### Speed
원본 마크다운에서 슬라이드까지 한 줄 명령으로 완성.

</div>
<div class="col">

### Quality
26개 레이아웃과 15 테마가 일관된 디자인 토큰을 공유.

</div>
<div class="col">

### Reusable
스킬·에이전트로 자산화되어 새 세션에서도 동일하게 작동.

</div>

---

<!-- _class: cards -->

# 기능 카드

<div class="card">

### 자동 분절
H1/H2 단위로 슬라이드를 자동 분리하며 8줄 룰을 적용.

</div>
<div class="card">

### 배지화
`*Tag*` 문법을 인라인 배지로 자동 변환.

</div>
<div class="card">

### bg-right
이미지를 우측에 배치하면 본문은 좌측 60%에 자동 정렬.

</div>
<div class="card">

### 자동 매칭
패턴 분석을 통해 26개 레이아웃 중 가장 적합한 것 선택.

</div>

---

<!-- _class: cards -->

# 요금제

<div class="card">

### Free
- 5 슬라이드
- 기본 테마 3종
- 커뮤니티 지원

</div>
<div class="card featured">

### Pro
- 무제한 슬라이드
- 15 테마 전체
- 우선 지원

</div>
<div class="card">

### Team
- Pro 모든 기능
- 팀 공유 워크스페이스
- SSO 연동

</div>

---

<!-- _class: stats -->

# 임팩트 한눈에

<div class="tile">

### 92%
발표 만족도

</div>
<div class="tile">

### 3.4×
슬라이드 생산성

</div>
<div class="tile">

### 26
레이아웃 종류

</div>
<div class="tile">

### 1h
평균 변환 시간

</div>

---

<!-- _class: kpi-row -->

# 분기 임팩트

<div class="kpi-list">

<div class="kpi">

### 1.2M
월 활성 사용자

</div>
<div class="kpi">

### 38%
YoY 매출 성장

</div>
<div class="kpi">

### 4.8
앱 평점

</div>

</div>

---

<!-- _class: big-number -->

# 발표 만족도

## 92%

3개월간 진행된 사내 발표 240건 청중의 만족도 평균치.

---

# 콜아웃 4종

<div class="callout info">

**INFO**
알아두면 좋은 부가 정보. 핵심 흐름에는 영향이 없지만 컨텍스트로 유용한 메모.

</div>

<div class="callout success">

**TIP**
실무에서 도움이 되는 권장 사항. 성공·체크리스트 마커를 한 곳에 묶었습니다.

</div>

<div class="callout warn">

**WARNING**
주의가 필요한 사항. 무시하면 결과가 어긋날 수 있는 가드레일.

</div>

<div class="callout danger">

**DANGER**
실행 전 반드시 확인. 손실·되돌릴 수 없는 작업이 포함된 항목.

</div>

---

<!-- _class: icon-list -->

# 주요 특징

- *Fast* 즉각 변환과 watch 모드로 빠른 피드백
- *Safe* 회귀 없는 CSS append, 자기완결형 테마
- *Open* 표준 Marp 문법만 사용, 외부 의존 최소
- *Pretty* 15 테마 모두 동일 토큰 베이스 위에서 일관성 유지

---

<!-- _class: timeline -->

# 4단계 변환 파이프라인

1. **원본 분석** — H1/H2/H3 추출과 콘텐츠 패턴 인식
2. **분절 + 매칭** — 8줄 룰 + 26개 레이아웃 휴리스틱
3. **Marp 출력** — 디렉티브 삽입 + `<div>` 래퍼 정렬
4. **빌드 + 검증** — HTML/PDF + 독립 QA 에이전트

---

<!-- _class: vertical-timeline -->

# 변환 파이프라인

1. **수집** — 원본 마크다운 분석 및 메타 추출
2. **분절** — H2 단위로 슬라이드 분리 + 본문 줄 수 검사
3. **매칭** — 휴리스틱 룰 적용으로 적합 레이아웃 선택
4. **출력** — Marp 디렉티브 삽입과 `<div>` 래퍼 작성
5. **빌드** — `--theme-set`으로 15 테마 HTML/PDF 산출

---

<!-- _class: pyramid -->

# 우선순위

1. 사용자 가치
2. 비즈니스 목표
3. 기술 구현 품질
4. 운영 자동화
5. 문서화·전파

---

<!-- _class: compare -->

# 도입 전 vs 도입 후

<div class="col">

### Before

- 수동으로 PowerPoint 작성
- 슬라이드별 톤·여백 차이
- 반복 발표 자료 재작성
- 변경사항 동기화 어려움

</div>
<div class="vs">VS</div>
<div class="col">

### After

- 마크다운 한 번 작성
- 테마로 톤 일관성 보장
- 동일 원본을 다용도 활용
- 변경은 원본만 수정

</div>

---

<!-- _class: section -->
<!-- _header: '' -->

# 02

## 인용·코드 레이아웃

---

<!-- _class: hero-quote -->

> 디자인은 단지 어떻게 보이고 느껴지는가가 아닙니다.
> 디자인은 **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs

---

<!-- _class: image-quote -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->

![bg left:50%](https://picsum.photos/seed/portrait1/900/1200)

> Obsidian is the **IDE**.
> The LLM is the **programmer**.
>
> — Andrej Karpathy

---

<!-- _class: terminal -->

# 빌드 명령

```bash
$ cd test_markdown_output
$ npx --yes @marp-team/marp-cli slides-demo.md \
    --html --allow-local-files \
    -o output/demo.html \
    --theme-set ../samples/themes
[  INFO ] Converting 1 markdown...
[  INFO ] slides-demo.md => output/demo.html
$ open output/demo.html
```

---

<!-- _class: section -->
<!-- _header: '' -->

# 03

## 이미지 레이아웃

---

<!-- _class: bg-full -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _paginate: false -->

![bg](https://picsum.photos/seed/hero-bg/1920/1080)

# 새로운 시작
## 슬라이드 자동화의 시대

---

<!-- _class: two-image -->

# 워크플로우 비교

<div class="images">

<figure>

![](https://picsum.photos/seed/before-flow/900/600)

<figcaption>기존 워크플로우</figcaption>
</figure>

<figure>

![](https://picsum.photos/seed/after-flow/900/600)

<figcaption>개선된 워크플로우</figcaption>
</figure>

</div>

---

<!-- _class: before-after -->

# 이전 vs 이후

<div class="ba-row">

<div class="ba-col">

### Before

![](https://picsum.photos/seed/ba-before/800/600)

</div>

<div class="ba-arrow">→</div>

<div class="ba-col">

### After

![](https://picsum.photos/seed/ba-after/800/600)

</div>

</div>

---

<!-- _class: gallery-4 -->

# 시각 자료 갤러리

<div class="gallery">

![](https://picsum.photos/seed/g1/800/600)

![](https://picsum.photos/seed/g2/800/600)

![](https://picsum.photos/seed/g3/800/600)

![](https://picsum.photos/seed/g4/800/600)

</div>

---

<!-- _class: chart-caption -->

# 매출 성장

<div class="chart-wrap">

![](https://picsum.photos/seed/chart1/1200/700)

<div class="takeaway">

### Key Takeaways

- YoY 38% 성장
- 리텐션 92% 유지
- 신규 사용자 22% 증가
- 이탈률 5% 감소

</div>

</div>

---

<!-- _class: section -->
<!-- _header: '' -->

# 04

## 클로징 레이아웃

---

<!-- _class: session-break -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 15:00 ~ 15:15
## Coffee Break

---

<!-- _class: qa -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Q&A
## 질문 환영합니다

---

<!-- _class: thanks-contact -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다
## 함께 더 나은 슬라이드를

- contact@example.com
- @tech-modern
- github.com/tech-modern

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Thanks
## See you next time.

contact@example.com · @tech-modern
