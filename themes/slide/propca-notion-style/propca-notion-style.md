---
marp: true
theme: propca-notion-style
paginate: true
size: 16:9
header: ''
footer: 'Notion-Style 테마 사용 가이드'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Notion Style 테마 사용 가이드
## 공통 지원 요소 및 레이아웃 클래스 사전

2026.05

---

<!-- _class: toc-split -->
<!-- _header: '' -->

<div class="toc-aside">

# Table<br>Of<br>Contents
</div>
<div class="toc-main">

1. **공통 지원 컴포넌트** <em>슬라이드 어디서나 호출 가능한 인라인 요소</em>
2. **전용 레이아웃 — 콘텐츠 분할** <em>compare · two-image · before-after · cards · content-sidebar</em>
3. **전용 레이아웃 — 비교 / 정의** <em>feature-compare · step-image-guide · definition-cards · faq</em>
4. **전용 레이아웃 — 시각 강조 / 인용** <em>image-quote · hero-quote · pastel-blocks · gallery-grid · code-focus</em>
5. **전용 레이아웃 — 프로세스 / 리스트** <em>timeline · vertical-timeline · step-text · roadmap · schedule · toggle-list · icon-list · block-features</em>
6. **마무리** <em>session-break · qa · thanks-contact · end</em>
</div>

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '01. 공통 지원 컴포넌트' -->

# 01
## 공통 지원 컴포넌트 (Universal Components)

---

# 공통 요소 1 — 텍스트 강조 & 인라인 코드
기본 슬라이드 폰트는 Notion 고유의 친근한 **Rounded Sans** 기반의 Pretendard 및 Noto Sans KR을 탑재하고 있습니다.
- **굵은 글씨**는 테마의 시그니처 보라색 `#5645d4`로 자동 강조 표시됩니다.
- *이태릭체* 문법은 노란색 인라인 배지 태그로 자동 치환 및 렌더링됩니다.
- 인라인 `` `code` `` 문법은 연한 보라색 배경에 보라색 텍스트로 표기됩니다.
- 본문 텍스트는 **17pt** 크기로 가독성이 우수합니다.

---

# 공통 요소 2 — 리스트 문법 & 블록 인용구
마크다운의 기본 문법을 통해 리스트 구조와 중요 구절을 효과적으로 배치할 수 있습니다.
- 글머리 기호(Unordered List) 마커는 보라색으로 강조됩니다.
  - 서브 리스트 항목 역시 들여쓰기가 깔끔하게 맞춰집니다.
1. 숫자 리스트(Ordered List)를 사용하여 순차적인 단계나 순위를 명확하게 보여줄 수 있습니다.
- 블록 인용구(`blockquote`)는 다음과 같이 렌더링됩니다.
> Notion 테마는 단순한 문서 작성을 넘어, 팀의 지식이 자연스럽게 흐르는 공간을 지향합니다.

---

# 공통 요소 3 — 테이블 (Table)
마크다운 기본 테이블 표기법을 통해 정보를 일목요연한 행/열 구조로 표현할 수 있습니다.
| 구분 | 지원 범위 | 설명 |
| :--- | :--- | :--- |
| 기본 텍스트 | 모든 레이아웃 | 강조, 인라인 코드, 이태릭 배지 지원 |
| 블록 인용구 | 모든 레이아웃 | 보라색 왼쪽 하이라이트 라인 및 카드 배경 적용 |
| 코드 블록 | 모든 레이아웃 | GitHub Light 기반 구문 강조 적용 |
| 콜아웃 | 모든 레이아웃 | 4가지 상태별 노션 시그니처 테두리 상자 렌더링 |

---

# 공통 요소 4 — 코드 블록 (Code Block)
기본 `pre` 및 `code` 블록에는 GitHub Light 테마의 배경/테두리 색상과 구문 강조(Syntax Highlighting) 기능이 자동으로 탑재되어 가독성이 뛰어납니다.
```python
# 1. 환영 메시지 출력 함수 정의
def greet_user(name: str) -> str:
    """사용자에게 노션 테마 환영 인사 반환"""
    message = f"Welcome, {name}! Let's build slides."
    print("[INFO] Greeting has been generated.")
    return message

# 2. 함수 실행 예시
greeting = greet_user("Antigravity")
```

---

# 공통 요소 5 — 콜아웃 4종
정보의 중요도나 종류에 따라 알맞은 콜아웃을 자유롭게 활용할 수 있습니다.
<div class="callout info">

**INFO** 알아두면 좋은 정보. 본문 내용 외의 부가적인 배경 설명이나 팁을 제공합니다.
</div>
<div class="callout success">

**TIP** 성공 사례나 권장 사항. 권장 체크리스트나 핵심 조언을 강조합니다.
</div>
<div class="callout example">

**EXAMPLE** 사례·시나리오 예시. 추상적 개념을 구체적인 케이스로 보충합니다.
</div>
<div class="callout warn">

**WARNING** 주의 사항. 잘못된 설정이나 실수로 결과가 비틀어질 수 있는 상황을 방지합니다.
</div>

---

# 공통 요소 6 — 인라인 태그 `.tag`
`<span class="tag green|yellow|purple|rose|sky|peach|navy">`로 상태·라벨 배지를 어디서나 표현합니다.
- 진행 상태 예시: <span class="tag green">완료</span> <span class="tag yellow">진행 중</span> <span class="tag sky">검토 중</span> <span class="tag rose">P0</span> <span class="tag purple">P1</span>
- 부서·태그 예시: <span class="tag peach">감사 1팀</span> <span class="tag navy">기밀</span> <span class="tag purple">2026.Q1</span>
- 본문 안에서 <span class="tag green">통과</span> 또는 <span class="tag rose">미흡</span> 처럼 흐름에 자연스럽게 삽입할 수 있습니다.
- 7가지 색상은 모두 노션 파스텔 펠릿(`--pastel-*`)에 매핑되어 톤이 일관됩니다.

---

# 공통 요소 7 — 칩 `.chip` & 키보드 `.kbd`
**칩(.chip)**은 태그보다 더 작은 풀필(pill) 라벨, **키보드(.kbd)**는 단축키 표기에 사용합니다.
- 칩 기본형: <span class="chip">베타</span> <span class="chip">Q1</span> <span class="chip">Audit</span>
- 칩 강조형: <span class="chip solid">NEW</span> <span class="chip outline">DRAFT</span>
- 키보드 단축키: <span class="kbd">⌘</span>+<span class="kbd">K</span> 로 빠른 검색, <span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">P</span> 로 명령 팔레트
- 본문 중간에 자연스럽게 삽입 가능: 자료 저장은 <span class="kbd">⌘</span>+<span class="kbd">S</span>, 슬라이드 추가는 <span class="kbd">Enter</span>.

---

# 공통 요소 8 — 디바이더 `.divider` & 노트 `.note`
슬라이드 내부에서 가벼운 구분선과 보조 메모를 표시할 때 사용합니다.

기본 디바이더 (가는 헤어라인)
<div class="divider"></div>

강조 디바이더 (`.divider.strong`)
<div class="divider strong"></div>

보라 액센트 디바이더 (`.divider.purple`)
<div class="divider purple"></div>

<div class="note">

콜아웃보다 가벼운 보조 설명. 강조 아이콘과 색 배경 없이 회색 카드로 묶어 본문 흐름을 유지합니다.
</div>

---

# 공통 요소 9 — 인라인 컬럼 `.cols-2` / `.cols-3`
전용 split·grid 레이아웃 없이도 본문 일부만 2단·3단 분할이 가능합니다.

<div class="cols-2">
<div>

**왼쪽 컬럼** — 결산 검토 절차 중 1차 분석 결과 요약. 가중 평균 대비 편차를 식별하고 핵심 계정 과목 별로 변동 원인을 정리합니다.
</div>
<div>

**오른쪽 컬럼** — 추가 검토 대상 식별. 외부 감사 의견과의 정합성을 확인하고 누락된 공시 사항을 보완합니다.
</div>
</div>

<div class="cols-3">
<div>

**1단계** 자료 수집
</div>
<div>

**2단계** 사전 분석
</div>
<div>

**3단계** 결론 도출
</div>
</div>

---

# 공통 요소 10 — 이미지 + 캡션 `<figure>`
표준 `<figure>` + `<figcaption>` 구조로 이미지와 설명을 묶을 수 있습니다.

<figure>

![](https://picsum.photos/seed/audit-chart/1200/420)
<figcaption>2025 Q4 기준 매출 추이 — 사내 분석 (단위: 억원)</figcaption>
</figure>

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '02. 전용 레이아웃 — 콘텐츠 분할' -->

# 02
## 콘텐츠 분할 (Content Layout)

---

<!-- _class: compare -->

# 레이아웃 — compare
클래스 `compare`는 도입 전후(Before vs After) 또는 상반되는 두 요소를 대칭 구조로 비교 대조하는 2단 레이아웃입니다.
<div class="col">

### 기존 방식 (Before)
- PowerPoint 프로그램을 켜고 수동 디자인 작업 수행
- 슬라이드 간 정렬, 폰트 종류, 여백이 뒤죽박죽으로 변형
- 내용 일부 수정 시 매번 PPT 레이아웃을 다시 정돈
</div>
<div class="vs">VS</div>
<div class="col">

### 노션 테마 (After)
- 텍스트 중심으로 마크다운 파일만 가볍게 작성
- 정해진 Notion CSS 디자인 가이드라인으로 일관성 유지
- 수정 시 원본 텍스트만 고치면 디자인 자동 정돈
</div>

---

<!-- _class: two-image -->

# 레이아웃 — two-image
클래스 `two-image`는 두 개의 넓은 시각자료 이미지를 좌우에 나란히 배치해 시각적으로 대조/비교하는 화면입니다.
<div class="images">
<figure>

![](https://picsum.photos/seed/before-flow/900/600)
<figcaption>수동 리소스 배정 워크플로우</figcaption>
</figure>
<figure>

![](https://picsum.photos/seed/after-flow/900/600)
<figcaption>자동화 엔진 기반 최적화 배정 워크플로우</figcaption>
</figure>
</div>

---

<!-- _class: before-after -->

# 레이아웃 — before-after
클래스 `before-after`는 이미지와 중간의 화살표 기호를 사용해 뚜렷한 시각적 개선 변화를 극대화하는 비교 슬라이드입니다.
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

<!-- _class: cards -->

# 레이아웃 — cards
클래스 `cards`는 2x2 고정 레이아웃의 균등 카드 그리드 슬라이드로, 특정 카드를 `featured`로 강조하는 것이 가능합니다.
<div class="card">

### 자동 슬라이드 분절
H1/H2 헤더를 바탕으로 마프 슬라이드 구분선을 자동으로 생성하고 여백을 산출합니다.
</div>
<div class="card">

### 인라인 배지 변환
텍스트 사이에 강조된 문자쌍(`*Text*`)을 감지하여 미려한 인라인 배지로 치환합니다.
</div>
<div class="card">

### 반응형 본문 레이아웃
이미지의 배치 비율에 맞춰 본문의 정렬 폭을 유기적으로 교정해 가독성을 확보합니다.
</div>
<div class="card featured">

### 노션 스타일 테마
Notion의 톤앤매너를 PPT/HTML 포맷으로 완벽히 통일하여 브랜드 통일성을 제공합니다.
</div>

---

<!-- _class: content-sidebar -->
<!-- header: '02. 전용 레이아웃 — 콘텐츠 분할' -->

# 레이아웃 — content-sidebar

<div class="main">

본문이 주역이면서 참고·팁·관련 자료를 곁들여야 할 때 사용합니다. 좌측은 일반 마크다운 본문, 우측은 `### 라벨` + 리스트로 구성된 사이드 박스입니다.

AI 도입 초기에는 **업무 표준화**가 우선입니다. 표준화되지 않은 업무는 AI에게 위임해도 결과 편차가 크고, 검증 비용이 절감 효과를 상쇄합니다.

따라서 도입 1단계에서는 반복 업무의 절차서를 먼저 정비하고, 2단계에서 해당 절차를 스킬로 변환하는 순서를 권장합니다.

</div>
<div class="side">

### 참고 자료

- 업무 절차서 표준 양식
- 스킬 변환 가이드 v2
- 내부 보안 검토 체크리스트

</div>

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 03
## 비교 / 정의 (Compare & Define)

---

<!-- _class: feature-compare -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — feature-compare
2~3 항목의 다중 특성을 카드 그리드로 비교합니다. 상태 컬럼이 없는 특성 비교에 적합 (제품/세대/플랜 비교).

<div class="compare-grid">

### Claude Cowork
- 협업 모드: 다중 에이전트
- 무료 플랜: 없음
- 한국어 지원: 우수
- 통합 도구: Skills, MCP

### Antigravity
- 협업 모드: 단일 에이전트
- 무료 플랜: 있음
- 한국어 지원: 보통
- 통합 도구: Built-in

### Cursor
- 협업 모드: 단일 에이전트
- 무료 플랜: 제한적
- 한국어 지원: 보통
- 통합 도구: 확장팩

</div>

---

<!-- _class: step-image-guide -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — step-image-guide
좌측 단계별 설명 + 우측 스크린샷 슬롯. 튜토리얼·설치 가이드에 최적화된 2단 그리드 레이아웃.

<div class="step-grid">
<div class="steps">

1. **추가기능 등록** — `홈` → `추가기능` 메뉴에서 검색 후 추가
2. **로그인** — 리본 메뉴의 Claude 아이콘 클릭 → 계정 인증
3. **Settings 확인** — 우측 톱니바퀴에서 User Instructions·세션 로그 활성화

</div>
<div class="img">

![설치 화면](https://picsum.photos/seed/install/720/540)

</div>
</div>

---

<!-- _class: definition-cards -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — definition-cards
도구·개념을 카드형으로 정의합니다. 각 카드는 `### 제목` + 2~3행 설명 구조로 자동 카드화됩니다.

### Gemini
Google의 멀티모달 AI. 1M 토큰 컨텍스트와 강력한 이미지·동영상 이해력을 제공하며 무료 플랜에서도 활용도 높음.

### Claude
Anthropic의 코딩·문서 작업 특화 AI. Skills·MCP·Plugin 생태계를 통해 도메인 자동화에 강함.

### Antigravity
Cursor 대안 AI IDE. 무료이며 다중 에이전트 협업을 지원하는 신예 IDE로 떠오름.

### ChatGPT
OpenAI의 범용 AI 어시스턴트. GPTs·코드 인터프리터·웹 검색 기능을 통합 제공.

---

<!-- _class: compare-cards -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — compare-cards
A/B 두 항목을 카드 2개로 나란히 두고 가운데 **VS 뱃지**로 시각적 대비를 강조합니다.

<div class="vs-grid">

<div class="card">

### Claude Cowork

- 다중 AI 에이전트 협업
- 회계·재무 도메인 통합 강력
- Pro·Max 유료 플랜 필요
- 한국어 응답 우수

</div>

<div class="vs"></div>

<div class="card">

### Antigravity

- 단일 AI IDE
- 일반 개발 작업에 강점
- 무료 플랜 제공
- 다중 에이전트 실험적 지원

</div>

</div>

---

<!-- _class: compare-table -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — compare-table
여러 속성을 두 항목에서 한눈에 비교합니다. 첫 컬럼은 속성, 나머지 컬럼은 비교 대상.

| 속성 | Claude Cowork | Antigravity |
|---|---|---|
| 협업 모드 | 다중 에이전트 | 단일 에이전트 |
| 무료 플랜 | 없음 | 있음 |
| 한국어 지원 | 우수 | 보통 |
| 통합 도구 | Skills · MCP | Built-in |
| 회계 도메인 적합도 | 매우 높음 | 보통 |

---

<!-- _class: concept-list -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — concept-list
5~10개 개념을 큰 번호와 함께 간결하게 나열합니다. 각 항목은 굵은 제목 + 1~2행 설명으로 구성.

1. **데이터 구조 분석** — 시트·범위·수식 관계를 파악해 전체 워크북의 논리를 이해
2. **자연어 지시 처리** — 사용자 요구사항을 작업 계획으로 변환 후 모호한 부분 재질문
3. **스킬 (Skills)** — 도메인 전문지식을 매뉴얼화해 일관된 작업 실행 보장
4. **커넥터 (MCP)** — 외부 ERP·DART·내부 DB 등 실시간 데이터 연결 도구
5. **클로드 파워포인트 연동** — 엑셀 결과를 그대로 PPT 보고서로 자동 변환
6. **세션 로그 시트** — 작업 내역을 별도 시트에 기록해 컨텍스트 복기 가능

---

<!-- _class: concept-table -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — concept-table
용어 사전·개념 정의를 표 형태로 정리합니다. 좌측 용어(보라색 굵게) + 우측 설명.

| 용어 | 설명 |
|---|---|
| 하네스 엔지니어링 | 단일 AI에게 통째로 맡기지 않고 여러 서브 에이전트로 역할 분리 후 상호 검증하는 설계 패턴 |
| MCP | Model Context Protocol — AI 모델이 외부 도구·데이터에 표준화된 방식으로 접근하는 인터페이스 |
| Skills | 도메인 전문지식·작업 절차를 AI에게 학습시켜 일관성 있게 실행하도록 만드는 기능 |
| 토큰 컨텍스트 | AI가 한 번에 처리 가능한 텍스트 양. 클로드 4.6은 100만(1M) 토큰 지원 |

---

<!-- _class: faq -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — faq
자주 묻는 질문을 Q 칩 + 답변 카드 쌍으로 나열합니다. `### 질문?` + 답변 단락 구조가 자동 카드화됩니다.

### AI에게 민감한 재무 데이터를 맡겨도 안전한가요?
엔터프라이즈 플랜은 입력 데이터를 모델 학습에 사용하지 않습니다. 다만 사내 보안 정책에 따라 비식별화 후 사용을 권장합니다.

### 도입 비용은 어느 정도 예상해야 하나요?
인당 월 구독료 외에 초기 업무 표준화·교육 비용이 발생합니다. 통상 3개월 내 반복 업무 시간 절감으로 회수됩니다.

### 기존 엑셀 매크로와 충돌하지 않나요?
별도 추가기능으로 동작하므로 기존 VBA 매크로와 독립적입니다. 동일 셀 동시 수정만 피하면 됩니다.

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '04. 전용 레이아웃 — 시각 강조 / 인용' -->

# 04
## 시각 강조 / 인용 (Visual Emphasis)

---

<!-- _class: image-quote -->

![bg left:60%](https://picsum.photos/seed/portrait1/900/1200)

> 디자인은 단순히 어떻게 보이는가에 그치지 않습니다.
> 그것이 **어떻게 기능하는가**가 핵심입니다.
>
> — Steve Jobs

---

<!-- _class: hero-quote -->

> 신뢰는 숫자가 아니라 **공시의 명료성**에서 시작합니다.
>
> — Big 4 Audit Methodology Handbook

---

<!-- _class: pastel-blocks -->

# 레이아웃 — pastel-blocks
클래스 `pastel-blocks`는 노션 고유의 6가지 은은한 파스텔 배경색이 적용된 3x2 카드 그리드 슬라이드입니다.
<div class="blocks">
<div>

### Docs
문서 및 아티클 작성
</div>
<div>

### Databases
구조화된 테이블 뷰
</div>
<div>

### Wiki
팀 정보 아카이빙
</div>
<div>

### Tasks
칸반 및 할 일 관리
</div>
<div>

### Forms
데이터 수집 및 매칭
</div>
<div>

### Notion AI
요약 및 글쓰기 보조
</div>
</div>

---

<!-- _class: gallery-grid -->
<!-- header: '04. 전용 레이아웃 — 시각 강조 / 인용' -->

# 레이아웃 — gallery-grid

![화면 1](https://picsum.photos/seed/g1/640/420) ![화면 2](https://picsum.photos/seed/g2/640/420) ![화면 3](https://picsum.photos/seed/g3/640/420) ![화면 4](https://picsum.photos/seed/g4/640/420) ![화면 5](https://picsum.photos/seed/g5/640/420) ![화면 6](https://picsum.photos/seed/g6/640/420)

이미지 3~6장을 가변 그리드로 배치합니다 — 2x2 고정인 `gallery-4`와 달리 장수에 맞춰 자동 정렬

---

<!-- _class: code-focus -->
<!-- header: '04. 전용 레이아웃 — 시각 강조 / 인용' -->

# 레이아웃 — code-focus

```python
def calculate_depreciation(asset_value: float, salvage: float, years: int) -> list[float]:
    """정액법 감가상각 스케줄을 산출한다."""
    annual = (asset_value - salvage) / years
    schedule = []
    book_value = asset_value
    for year in range(1, years + 1):
        book_value -= annual
        schedule.append(round(book_value, 2))
    return schedule

print(calculate_depreciation(50_000_000, 5_000_000, 5))
```

- 코드가 주역인 슬라이드 — 에디터 헤더 바 + 14pt 확대 렌더
- 하단 리스트는 `#` 마커로 코드 주석 톤을 유지

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '05. 전용 레이아웃 — 프로세스 / 리스트' -->

# 05
## 프로세스 / 리스트 (Process & List)

---

<!-- _class: timeline -->

# 레이아웃 — timeline
클래스 `timeline`은 숫자 배지 사이를 연한 가로선이 흐르듯 연결하는 모던한 8단계 공정 흐름 슬라이드입니다.
1. **분석 및 추출** — 마크다운 내의 헤더 깊이 및 계층 구조 분석
2. **분절 및 매칭** — 슬라이드 분할 규칙 및 적합한 레이아웃 선택
3. **Marp 변환** — 컴포넌트 래핑용 `div` 구조 및 Marp 디렉티브 삽입
4. **산출물 검증** — QA 에이전트를 통한 컴파일 결과물 최종 빌드
5. **스타일 튜닝** — CSS 규칙 적용 및 세부 디자인 미세 조정
6. **피드백 수렴** — 실시간 브라우저 프리뷰 및 유저 검토 진행
7. **최종 릴리즈** — HTML 및 PDF 등 최종 산출물 포맷 내보내기
8. **유지 및 관리** — 테마 템플릿 버전 업그레이드 및 버그 패치

---

<!-- _class: vertical-timeline -->

# 레이아웃 — vertical-timeline
클래스 `vertical-timeline`은 좌측 수직 레일을 따라 번호 순으로 공정이 계단식 진행되는 정교한 수직 타임라인 슬라이드입니다.
1. **수집 단계** — 원본 마크다운 구조 분석 및 메타데이터 정보 파악
2. **분절 단계** — 슬라이드 한도 줄 수 검출 및 단락 쪼개기 작업
3. **매칭 단계** — 카드, 차트, 타임라인 등 레이아웃 자동 판정
4. **빌드 단계** — 설정된 테마 기반으로 웹 친화형 HTML/PDF 동시 빌드

---

<!-- _class: step-text -->

# 레이아웃 — step-text
이미지 없는 절차를 카드 스택 + 번호 배지로 안내합니다. `step-image-guide`(이미지 필수)와 달리 텍스트 설명이 2행 이상인 단계 가이드에 적합합니다.

1. **업무 절차서 정비** — 반복 업무의 단계·산출물·검증 기준을 문서화합니다. 표준화되지 않은 업무는 AI 위임 시 결과 편차가 커집니다.
2. **스킬 변환** — 정비된 절차서를 AI 스킬 형식으로 변환하고, 샘플 데이터로 결과 일관성을 검증합니다.
3. **파일럿 운영** — 한 팀에서 1개월간 병행 운영하며 오류 유형을 수집하고 절차서를 보완합니다.
4. **전사 확산** — 파일럿 결과를 바탕으로 교육 자료를 만들고 부서별 순차 도입합니다.

---

<!-- _class: roadmap -->

# 레이아웃 — roadmap (로드맵)
클래스 `roadmap`은 3단 카드로 구성된 슬라이드로, 프로젝트 로드맵이나 단계별 전략 등을 소개하는 데 적합합니다.
<div class="tiers">
<div class="tier">

### Phase 01. MVP 검증
<div class="phase-detail">개발 및 배포</div>
제품 핵심 가치 정교화 및 초기 유저 피드백 수집 단계.

- 핵심 기능 정의 및 개발
- 타겟 유저 테스트 (FGI)
- 정량/정성 피드백 분석
</div>
<div class="tier featured">

### Phase 02. 시장 확장
<div class="phase-detail">마케팅 & 고도화</div>
서비스 편의성 극대화 및 마케팅 전략 다변화.

- UX 개편 및 기능 확장
- 브랜드 인지도 구축 캠페인
- 신규 가입자 30% 성장 달성
- 제휴 및 협업 파트너 확보
</div>
<div class="tier">

### Phase 03. 스케일업
<div class="phase-detail">글로벌 & 안정성</div>
인프라 스케일링 및 비즈니스 모델 수익성 최적화.

- 인프라 자동화 및 보안 강화
- 다양한 유료화 모델 검증
- 해외 시장 전략 기획
- 데이터 분석 기반 LTV 극대화
</div>
</div>

---

<!-- _class: schedule -->

# 레이아웃 — schedule
구체 날짜 기반 일정·마일스톤을 행 단위로 정리합니다. 분기/Phase 그룹은 `roadmap`, 날짜 행은 `schedule`. 상태는 인라인 `.tag`와 조합.

| 날짜 | 일정 | 상태 |
|---|---|---|
| 6/15(월) | 업무 절차서 정비 킥오프 | <span class="tag green">완료</span> |
| 6/22(월) | 스킬 변환 1차 검증 | <span class="tag yellow">진행중</span> |
| 7/06(월) | 파일럿 팀 병행 운영 시작 | <span class="tag sky">예정</span> |
| 8/03(월) | 중간 결과 임원 보고 | <span class="tag sky">예정</span> |
| 9/01(월) | 전사 확산 교육 | <span class="tag peach">대기</span> |

---

<!-- _class: toggle-list -->

# 레이아웃 — toggle-list
클래스 `toggle-list`는 노션의 아코디언 토글 목록을 연상시키는 정갈한 계층형 텍스트 목록 레이아웃입니다.
<div class="toggle heading">1단계 — 초기 환경 설정 및 계정 생성</div>
<div class="toggle item">회사 SSO 계정 활성화 및 2FA 연동 등록</div>
<div class="toggle item">로컬 개발 도구 설치 및 깃허브 SSH 인증 키 설정</div>
<div class="toggle heading">2단계 — 코드베이스 분석 및 첫 배포</div>
<div class="toggle item">개발 환경 빌드 스크립트 실행 및 데모 확인</div>
<div class="toggle item">스테이징 환경에 테스트 PR 업로드 및 머지 검증</div>

---

<!-- _class: icon-list -->

# 레이아웃 — icon-list
클래스 `icon-list`는 강조 배지(Badge)와 카드가 깔끔하게 열 지어 늘어선 특징 나열용 레이아웃입니다.
- *Fast* 실시간 Watch 모드 빌드를 지원하여 빠른 시각 피드백 제공
- *Safe* 기존 CSS와의 완벽한 하위 호환성을 제공하는 컴포넌트 탑재
- *Open* 별도의 외부 라이브러리 없이 Marp 코어 기능만으로 가볍게 빌드
- *Pretty* Notion 디자인 토큰 공유로 프레젠테이션 전체 톤앤매너 유지

---

<!-- _class: block-features -->

# 레이아웃 — block-features
클래스 `block-features`는 둥근 아이콘 배지와 카드 상자가 조합된 핵심 기능 명세 레이아웃입니다.
<div class="blocks">
<div class="block"><div class="ico">D</div>

### 문서화
팀 내 모든 지식을 명확히 축적합니다.
</div>
<div class="block"><div class="ico">T</div>

### 테이블
데이터를 체계적인 행렬로 구조화합니다.
</div>
<div class="block"><div class="ico">A</div>

### 인공지능
작성된 글을 즉시 요약하고 보완합니다.
</div>
<div class="block"><div class="ico">F</div>

### 설문 폼
필요한 정보를 노션 내부로 수집합니다.
</div>
<div class="block"><div class="ico">G</div>

### 목표선정
팀 전체의 OKR과 이정표를 공유합니다.
</div>
</div>

---

<!-- _class: comparison-3up -->
<!-- header: '03. 전용 레이아웃 — 비교 / 정의' -->

# 레이아웃 — comparison-3up
3개 이상 항목을 매트릭스 카드로 비교합니다. 카드 헤더에 항목명, 본문에 비교 속성.

<div class="matrix">

### Claude Cowork

- 다중 에이전트 협업
- 회계·재무 통합 강력
- Pro·Max 유료
- 한국어 우수

### Antigravity

- 단일 에이전트
- 일반 개발 강점
- 무료 플랜
- 한국어 보통

### Cursor

- 단일 에이전트
- 익숙한 IDE UX
- 제한적 무료
- 한국어 보통

</div>

---

<!-- _class: pros-cons -->
<!-- header: '05. 전용 레이아웃 — 프로세스 / 리스트' -->

# 레이아웃 — pros-cons
장점·단점을 좌·우 2 컬럼으로 명확히 대비. 좌측 ✓ (녹색), 우측 ✗ (빨강) 자동 강조.

<div class="pc-grid">

<div class="pros">

### 장점

- 자연어 지시만으로 복잡한 작업 수행
- Skills로 일관된 업무 매뉴얼 자동화
- 외부 데이터(MCP) 실시간 연동
- 회계·재무 도메인에서 검증된 퍼포먼스

</div>

<div class="cons">

### 단점

- 유료 플랜 필수 (Pro 이상)
- 비일관성·환각 가능성 잔존
- 민감 데이터는 별도 보안 설정 필요
- 한국 ERP·법령 MCP 생태계 미흡

</div>

</div>

---

<!-- _class: checklist -->
<!-- header: '05. 전용 레이아웃 — 프로세스 / 리스트' -->

# 레이아웃 — checklist
"할 일"·"확인 항목"을 체크박스로 시각화. 변환기가 GFM `- [ ]` / `- [x]`를 `<li class="todo|done">`으로 치환.

<ul>
<li class="done">클로드 엑셀 애드인 설치 완료</li>
<li class="done">Pro 이상 플랜 활성화 확인</li>
<li class="todo">User Instructions에 회사 작업 가이드 입력</li>
<li class="todo">Session Logging 활성화</li>
<li class="todo">회계 도메인 Skills 1개 이상 등록</li>
<li class="todo">DART MCP 또는 ERP 커넥터 연결 테스트</li>
<li class="todo">민감 데이터 처리 보안 정책 합의</li>
</ul>

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '06. 마무리' -->

# 06
## 마무리 (Closing)

---

<!-- _class: session-break -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 15:00 ~ 15:15
## 잠시 휴식을 가집니다.

---

<!-- _class: qa -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Q & A
## 질문과 답변 시간입니다.

---

<!-- _class: thanks-contact -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Contact Me
## 언제든지 연락주세요

<div class="contact-wrapper">
<div class="contact-info">

- **Email** wogus3575@naver.com
- **Website** https://procpa.co.kr
- **Blog** https://blog.naver.com/procpalee
- **Kakaotalk** https://open.kakao.com/o/sQCXbyXg
</div>
<div class="contact-qr">

![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://open.kakao.com/o/sQCXbyXg)
<div class="qr-label">Scan to Contact</div>
</div>
</div>

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# End
## 감사합니다.
