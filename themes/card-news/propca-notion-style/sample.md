---
marp: true
theme: propca-notion-style-cards
size: sns
paginate: false
_header: ''
_footer: ''
---

<!-- _class: card-cover -->

# 마크다운으로 카드뉴스

Notion 워크스페이스 톤을 그대로 4:5 캐러셀로

@propca-notion · contact@example.com

---

<!-- _class: card-hook -->

# 노션은 페이지가 끝이 아닙니다

스와이프하면 14가지 카드 레이아웃이 나옵니다 →

---

<!-- _class: card-point -->

`01`

## 디자인 토큰부터

색·폰트·간격을 변수로 정의하면 카드뉴스도 16:9 슬라이드도 **한 톤**으로 나옵니다. propca 데크의 navy/purple/pastel 토큰을 그대로 계승.

---

<!-- _class: card-sticky-notes -->

## 워크스페이스에 메모하기

- **회의록** 회의 직후 즉시 기록, 액션 아이템 강조
- **아이디어** 떠오를 때마다 toss, 매주 정리
- **링크 모음** 읽어볼 글 따로 큐레이션
- **할 일** 오늘 · 이번 주 · 이번 달 3단 구분

---

<!-- _class: card-pastel-blocks -->

## 카테고리 한눈에

- **회의록** 모든 정기 미팅 기록
- **자산 관리** 참고 이미지·문서
- **로드맵** 분기별 마일스톤
- **위키** 팀 컨벤션 문서
- **링크** 큐레이션 모음
- **회고** 주간/월간 retrospective

---

<!-- _class: card-database-rows -->

## 이번 주 진행 현황

1. **로그인 리팩터링** `Done`
2. **온보딩 페이지** `진행중`
3. **결제 모듈 분리** `리뷰`
4. **알림 시스템** `대기`
5. **분석 대시보드** `백로그`

---

<!-- _class: card-toggle-list -->

## 자주 묻는 질문

- 변환에 얼마나 걸리나요?
  - 평균 7장 기준 30~60초
  - PNG 빌드 포함
- 어떤 마크다운 문법을 지원하나요?
  - GitHub Flavored Markdown 전체
  - HTML 콜아웃 부분 지원
- Threads에 바로 올릴 수 있나요?
  - `npm run publish:cards <slug>` 한 줄

---

<!-- _class: card-block-features -->

## 세 가지 핵심 기능

- **자동 매칭** 마크다운 구조를 보고 7개 카드 레이아웃 중 가장 맞는 것을 자동 선택합니다.
- **시각 검증** marp-deck-reviewer 에이전트가 빌드 직후 톤·여백·강조를 독립 검수합니다.
- **2-pass 빌드** HTML(검수)과 PNG(업로드) 양쪽을 한 번에 산출합니다.

---

<!-- _class: card-yellow-banner -->

# 결국 한 가지만 기억하세요

좋은 카드뉴스는 디자인이 아니라 **순서**입니다.

---

<!-- _class: card-quote -->

> 디자인은 단지 어떻게 보이는가가 아닙니다. **어떻게 작동하는가**에 대한 것입니다.
>
> — Steve Jobs

---

<!-- _class: card-pastel-quote -->

> Notion 톤 카드뉴스 덕분에 팀 내부 공지가 훨씬 빠르게 도달합니다. 디자이너 없이도 일관된 톤이 유지돼요.
>
> — 김민수, 프로덕트 리드

---

<!-- _class: card-list -->

## 카드뉴스 만드는 4단계

1. **원본 작성** — H1·H2 위주의 짧은 마크다운
2. **레이아웃 매칭** — card-* 자동 휴리스틱
3. **PNG 빌드** — Marp CLI `--images png`
4. **소셜 업로드** — 1080×1350 캐러셀로

---

<!-- _class: card-cta -->
<!-- _paginate: false -->

# 팔로우하고 저장하세요

다음 카드뉴스는 다음주 월요일

@propca-notion

---

<!-- _class: card-end -->
<!-- _paginate: false -->

# 감사합니다

이번 카드뉴스가 도움이 됐다면 공유해 주세요.

@propca-notion · contact@example.com
