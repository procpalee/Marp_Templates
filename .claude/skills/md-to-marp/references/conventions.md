# Marp 컨벤션 치트시트

`md-to-marp` 스킬이 사용하는 Marp 문법과 12종 레이아웃 클래스의 입력/출력 페어.

---

## Front matter (덱 첫 줄)

```yaml
---
marp: true
theme: tech-modern
paginate: true
size: 16:9
header: 'Chapter Title'
footer: '© 2026 · Author'
---
```

- `theme:` 는 `samples/themes/tech-modern.css`의 `/* @theme tech-modern */` 주석과 일치해야 함
- 빌드 시 `--theme-set themes` 플래그로 디렉터리째 등록됨

---

## 디렉티브

| 디렉티브 | 적용 범위 | 예시 |
|---|---|---|
| `<!-- class: name -->` | 이후 모든 슬라이드 | 챕터 단위 일괄 적용 |
| `<!-- _class: name -->` | 현재 슬라이드만 | 가장 자주 씀 |
| `<!-- _paginate: false -->` | 현재 페이지 번호 숨김 | cover/section/end |
| `<!-- _header: '' -->` | 현재 헤더 비움 | cover/section/end |
| `<!-- _footer: '' -->` | 현재 푸터 비움 | cover/section/end |
| `<!-- _backgroundColor: #xxx -->` | 현재 배경색 | hero |
| `<!-- _color: #xxx -->` | 현재 텍스트 색 | 임시 강조 |

**여러 클래스 조합:** `<!-- _class: section dark -->` (공백 구분)

---

## 슬라이드 구분자

```markdown
첫 슬라이드 내용

---

두 번째 슬라이드 내용
```

- `---` 위아래로 반드시 빈 줄
- front matter의 `---` 두 줄과 슬라이드 구분자는 다름 (위치로 구별됨)

---

## 배경 이미지

```markdown
![bg](url)                  → 슬라이드 전체 배경
![bg fit](url)              → 가로/세로 맞춤
![bg cover](url)            → 가득 채움 (잘림 가능)
![bg right:40%](url)        → 우측 40%, 본문은 좌측 60%
![bg left:30%](url)         → 좌측 30%
![bg right vertical](url)   → 우측, 다음 ![bg]는 그 아래로 stacked
```

여러 `![bg]`를 같은 슬라이드에 두면 자동 split.

---

## 12종 레이아웃 입력/출력 페어

### 1) cover (표지)

**원본 마크다운:**
```markdown
# 슬라이드 자동화의 시대
## Markdown을 Marp 슬라이드로 변환하기
홍길동 · Tech Lab
```

**Marp 변환 결과:**
```markdown
<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 슬라이드 자동화의 시대
## Markdown을 Marp 슬라이드로 변환하기
홍길동 · Tech Lab
```

---

### 2) section (챕터 divider)

**원본:**
```markdown
## 01. 디자인 시스템
```

**변환:**
```markdown
<!-- _class: section -->
<!-- _header: '' -->

# 01
## 디자인 시스템
```

---

### 3) split (2열 분할)

**원본:**
```markdown
## Before vs 비교 (split)

좌측:
- 수동 슬라이드 분절
- 디렉티브 수기 입력

우측:
- 자동 분절
- 휴리스틱 매칭
```

**변환:**
```markdown
<!-- _class: split -->

# Before vs 비교

<div class="col">

### 좌측
- 수동 슬라이드 분절
- 디렉티브 수기 입력

</div>
<div class="col">

### 우측
- 자동 분절
- 휴리스틱 매칭

</div>
```

---

### 4) grid-3 (3열 카드)

**원본:**
```markdown
## 세 가지 핵심 가치

### Speed
빠른 변환

### Quality
디자인 시스템 준수

### Reusable
스킬 자산화
```

**변환:**
```markdown
<!-- _class: grid-3 -->

# 세 가지 핵심 가치

<div class="col">

### Speed
빠른 변환

</div>
<div class="col">

### Quality
디자인 시스템 준수

</div>
<div class="col">

### Reusable
스킬 자산화

</div>
```

---

### 5) stats (4 KPI 타일)

**원본:**
```markdown
## 임팩트 한눈에

### 92%
발표 만족도

### 3.4×
슬라이드 생산성

### 12
레이아웃 종류

### 1h
평균 변환 시간
```

**변환:**
```markdown
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

### 12
레이아웃 종류

</div>
<div class="tile">

### 1h
평균 변환 시간

</div>
```

---

### 6) timeline (가로 진행)

**원본:**
```markdown
## 4단계 변환 파이프라인

1. **원본 분석** — H1/H2/H3 추출
2. **분절 + 매칭** — 8줄 룰 적용
3. **Marp 출력** — 디렉티브 삽입
4. **빌드 + 검증** — HTML 미리보기
```

**변환:**
```markdown
<!-- _class: timeline -->

# 4단계 변환 파이프라인

1. **원본 분석** — H1/H2/H3 추출
2. **분절 + 매칭** — 8줄 룰 적용
3. **Marp 출력** — 디렉티브 삽입
4. **빌드 + 검증** — HTML 미리보기
```

---

### 7) icon-list (배지 리스트)

**원본:**
```markdown
## 주요 특징

- Fast: 즉각 변환과 watch 모드
- Safe: 회귀 없는 CSS append
- Open: 표준 Marp 문법만 사용
- Pretty: Tech Modern 토큰 일관
```

**변환:**
```markdown
<!-- _class: icon-list -->

# 주요 특징

- *Fast* 즉각 변환과 watch 모드
- *Safe* 회귀 없는 CSS append
- *Open* 표준 Marp 문법만 사용
- *Pretty* Tech Modern 토큰 일관
```

---

### 8) compare (좌 vs 우)

**원본:**
```markdown
## Before vs After 비교

Before:
- 수동
- 비일관

After:
- 자동
- 시스템
```

**변환:**
```markdown
<!-- _class: compare -->

# Before vs After

<div class="col">

### Before
- 수동
- 비일관

</div>
<div class="vs">VS</div>
<div class="col">

### After
- 자동
- 시스템

</div>
```

---

### 9) bg-full (풀블리드 hero)

**원본:**
```markdown
## 새로운 시작

![](https://images.unsplash.com/photo-...)

슬라이드 자동화의 시대
```

**변환:**
```markdown
<!-- _class: bg-full -->

![bg](https://images.unsplash.com/photo-...)

# 새로운 시작
## 슬라이드 자동화의 시대
```

---

### 10) hero-quote (큰 인용)

**원본:**
```markdown
> 디자인은 단지 어떻게 보이고 느껴지는가가 아닙니다.
> 디자인은 **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs
```

**변환:**
```markdown
<!-- _class: hero-quote -->

> 디자인은 단지 어떻게 보이고 느껴지는가가 아닙니다.
> 디자인은 **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs
```

---

### 11) cards (N개 카드 그리드)

**원본:**
```markdown
## 기능 카드

### 자동 분절
H1/H2 기준 분리

### 배지화
*Tag* 문법으로 강조

### bg-right
이미지 우측 배치
```

**변환:**
```markdown
<!-- _class: cards -->

# 기능 카드

<div class="card">

### 자동 분절
H1/H2 기준 분리

</div>
<div class="card">

### 배지화
*Tag* 문법으로 강조

</div>
<div class="card">

### bg-right
이미지 우측 배치

</div>
```

---

### 12) agenda (TOC)

**원본 (덱 두 번째 슬라이드):**
```markdown
## 오늘 다룰 내용

1. 디자인 시스템 개요
2. 12개 레이아웃 미리보기
3. 변환 스킬 동작 원리
4. 라이브 데모 + Q&A
```

**변환:**
```markdown
<!-- _class: agenda -->

# 오늘 다룰 내용

1. 디자인 시스템 개요
2. 12개 레이아웃 미리보기
3. 변환 스킬 동작 원리
4. 라이브 데모 + Q&A
```

---

### 13) callout 4종

**원본:**
```markdown
> [!INFO]
> 알아두면 좋은 부가 정보.

> [!WARN]
> 주의가 필요한 사항.
```

**변환:**
```markdown
<div class="callout info">

**INFO**
알아두면 좋은 부가 정보.

</div>

<div class="callout warn">

**WARN**
주의가 필요한 사항.

</div>
```

`info` / `success` / `warn` / `danger` 4종.

---

### 14) end (Thanks / Q&A)

**원본 (마지막):**
```markdown
## 감사합니다
질문 환영합니다.
GitHub @tech-modern · contact@example.com
```

**변환:**
```markdown
<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다
## 질문 환영합니다.
GitHub @tech-modern · contact@example.com
```

---

## v2 신규 레이아웃 14종 입력/출력 페어

### 15) big-number (거대 숫자)

**원본:**
```markdown
## 발표 만족도

92%

발표를 들은 청중의 만족도.
```

**변환:**
```markdown
<!-- _class: big-number -->

# 발표 만족도

## 92%

발표를 들은 청중의 만족도.
```

---

### 16) pricing-card (cards + featured)

**원본:**
```markdown
## 요금제

### Free
- 5 슬라이드

### Pro (추천)
- 무제한
- 우선 지원

### Team
- Pro 포함
- 팀 공유
```

**변환:**
```markdown
<!-- _class: cards -->

# 요금제

<div class="card">

### Free
- 5 슬라이드

</div>
<div class="card featured">

### Pro
- 무제한
- 우선 지원

</div>
<div class="card">

### Team
- Pro 포함
- 팀 공유

</div>
```

---

### 17) chart-caption (이미지 + Key Takeaways)

**원본:**
```markdown
## 매출 성장

![](https://.../chart.png)

Key Takeaways:
- YoY 38% 성장
- 리텐션 92% 유지
```

**변환:**
```markdown
<!-- _class: chart-caption -->

# 매출 성장

<div class="chart-wrap">

![](https://.../chart.png)

<div class="takeaway">

### Key Takeaways

- YoY 38% 성장
- 리텐션 92% 유지

</div>

</div>
```

---

### 18) kpi-row (3 KPI inline)

**원본:**
```markdown
## 임팩트

### 1.2M
월 활성 사용자

### 38%
YoY 매출 성장

### 4.8
앱 평점
```

**변환:**
```markdown
<!-- _class: kpi-row -->

# 임팩트

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
```

---

### 19) two-image (이미지 2장 50:50)

**원본:**
```markdown
## 비교

![](url-a)
기존 워크플로우

![](url-b)
개선된 워크플로우
```

**변환:**
```markdown
<!-- _class: two-image -->

# 비교

<div class="images">

<figure>

![](url-a)

<figcaption>기존 워크플로우</figcaption>
</figure>

<figure>

![](url-b)

<figcaption>개선된 워크플로우</figcaption>
</figure>

</div>
```

---

### 20) image-quote (이미지 좌 + 인용 우)

**원본:**
```markdown
## 영감

![](https://.../portrait.jpg)

> Obsidian is the **IDE**.
> The LLM is the **programmer**.
>
> — Andrej Karpathy
```

**변환:**
```markdown
<!-- _class: image-quote -->

![bg left:50%](https://.../portrait.jpg)

> Obsidian is the **IDE**.
> The LLM is the **programmer**.
>
> — Andrej Karpathy
```

---

### 21) gallery-4 (2×2 갤러리)

**원본:**
```markdown
## 갤러리

![](url-1)
![](url-2)
![](url-3)
![](url-4)
```

**변환:**
```markdown
<!-- _class: gallery-4 -->

# 갤러리

<div class="gallery">

![](url-1)

![](url-2)

![](url-3)

![](url-4)

</div>
```

---

### 22) before-after (이미지 좌 → 우)

**원본:**
```markdown
## 이전 vs 이후

이전:
![](url-before)

이후:
![](url-after)
```

**변환:**
```markdown
<!-- _class: before-after -->

# 이전 vs 이후

<div class="ba-row">

<div class="ba-col">

### Before

![](url-before)

</div>

<div class="ba-arrow">→</div>

<div class="ba-col">

### After

![](url-after)

</div>

</div>
```

---

### 23) qa (Q&A 슬라이드)

**원본:**
```markdown
## Q&A
질문 환영합니다
```

**변환:**
```markdown
<!-- _class: qa -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Q&A
## 질문 환영합니다
```

---

### 24) thanks-contact (감사 + 연락처 pill)

**원본:**
```markdown
## 감사합니다
연락처:
- contact@example.com
- @handle
```

**변환:**
```markdown
<!-- _class: thanks-contact -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다
## 함께 더 나은 슬라이드를

- contact@example.com
- @handle
```

---

### 25) session-break (인터미션)

**원본:**
```markdown
## 잠시 휴식
15:00 ~ 15:15
```

**변환:**
```markdown
<!-- _class: session-break -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 15:00 ~ 15:15
## Coffee Break
```

---

### 26) vertical-timeline (세로 진행, **bold** 리드인)

**원본:**
```markdown
## 변환 파이프라인

1. **수집** — 원본 마크다운 분석
2. **분절** — H2 단위 분리
3. **매칭** — 휴리스틱 룰 적용
4. **출력** — Marp 디렉티브 삽입
5. **빌드** — HTML/PDF 산출
```

**변환:**
```markdown
<!-- _class: vertical-timeline -->

# 변환 파이프라인

1. **수집** — 원본 마크다운 분석
2. **분절** — H2 단위 분리
3. **매칭** — 휴리스틱 룰 적용
4. **출력** — Marp 디렉티브 삽입
5. **빌드** — HTML/PDF 산출
```

---

### 27) [removed] flow-arrow

v2.1에서 deprecated. 가로 단계 표현은 `timeline` (4단계 이하) 또는 `vertical-timeline` (5단계 이상)으로 폴백한다.

---

### 28) pyramid (우선순위 피라미드)

**원본:**
```markdown
## 우선순위

1. 사용자 가치
2. 비즈니스 목표
3. 기술 구현
4. 운영 자동화
5. 문서화
```

**변환:**
```markdown
<!-- _class: pyramid -->

# 우선순위

1. 사용자 가치
2. 비즈니스 목표
3. 기술 구현
4. 운영 자동화
5. 문서화
```

---

## GitHub 콜아웃 7종 → 4 CSS 클래스 매핑

| 원본 마커 (대소문자 무시) | 출력 CSS 클래스 | 기본 헤딩 |
|---|---|---|
| `[!INFO]` `[!info]` `[!note]` | `callout info` | INFO / NOTE |
| `[!example]` | `callout info` | EXAMPLE |
| `[!tip]` `[!success]` `[!check]` `[!done]` | `callout success` | TIP |
| `[!warning]` `[!warn]` `[!caution]` `[!attention]` | `callout warn` | WARNING |
| `[!danger]` `[!error]` `[!fail]` `[!bug]` | `callout danger` | DANGER |
| `[!quote]` `[!cite]` (단독 슬라이드) | `hero-quote` | — |
| `[!abstract]` `[!summary]` `[!tldr]` | `callout info` | TL;DR |

**예시 (입력):**
```markdown
> [!INFO] 알아두면 좋은 정보
> 본문이 여기 들어간다.
> 두 번째 줄도 OK.

> [!WARNING]
> 헤딩 없이도 가능. WARNING이 기본 타이틀.

> [!success] TIP 마커
> 성공/추천 정보.
```

**변환:**
```markdown
<div class="callout info">

**알아두면 좋은 정보**
본문이 여기 들어간다.
두 번째 줄도 OK.

</div>

<div class="callout warn">

**WARNING**
헤딩 없이도 가능. WARNING이 기본 타이틀.

</div>

<div class="callout success">

**TIP 마커**
성공/추천 정보.

</div>
```

---

## 흔히 놓치는 함정

1. **`<div>` 안에 마크다운**을 쓰려면 div 태그 위아래로 **빈 줄 필수**. 안 그러면 markdown-it이 파싱 안 함
2. `_class` 디렉티브는 슬라이드 **첫 줄들**에 (H1 위에) 놓아야 안전
3. `header:` / `footer:` 값이 비어있으면 빈 문자열 `''`로 명시 (생략 X)
4. Marp는 단일 `_class: section dark`처럼 **공백 구분** 다중 클래스 지원
5. PDF 출력 시 외부 폰트(Pretendard CDN)는 인터넷 연결 필요 — 오프라인은 로컬 임베드
6. `--allow-local-files` 플래그 빠뜨리면 PDF/이미지가 일부 누락
7. **`image-quote`**: 인용 본문이 있어야 보임. 빈 `>` 만 두면 quote-side가 빈 박스가 됨
8. **`gallery-4`**: 정확히 4장 이미지에 최적화. 3장/5장은 분할되거나 빈 셀 발생
9. **`before-after`**: `<div class="ba-arrow">→</div>` 가 가운데 들어가야 좌우 정렬됨
10. **`pyramid`**: ol 정확히 5항목까지만 nth-child 매핑됨. 6번째부터는 가장 넓은 행으로 떨어짐
11. **`flow-arrow`**: 항목이 6개 이상이면 wrap되어 2줄 됨. 화살표는 그래도 그려짐
12. **파생 테마(`tm-*`)**: `@import url('tech-modern.css')` 로 베이스 import. 색상만 바꾸려면 `:root` 만 override
