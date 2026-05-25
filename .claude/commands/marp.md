---
description: 마크다운(옵시디언 또는 표준) 파일을 한 줄로 Marp 슬라이드 HTML로 변환. 옵시디언 전처리 → propca-notion-style 자동 매칭 → HTML 빌드 → 독립 QA → (선택) watch 모드까지 일괄 수행. purpose에 카드뉴스 키워드가 있으면 4:5 카드뉴스 모드로 자동 분기.
argument-hint: <파일경로> [watch] [용도 설명]
---

# /marp — 마크다운 → Marp 슬라이드 (원샷)

이 명령은 **반드시 `md-to-marp` 스킬을 호출**하여 다음을 일괄 수행합니다:

1. 옵시디언 마커 정리 (`obsidian-cleanup` 스킬)
2. propca-notion-style 21 레이아웃 자동 매칭 (`md-to-marp-propca` 스킬)
3. `npx @marp-team/marp-cli`로 HTML 빌드
4. **`marp-reviewer` 에이전트(독립 컨텍스트)** 로 품질 QA
5. 이슈 있으면 자동 수정 후 재빌드·재QA (최대 2회)
6. 인자에 `watch`가 있으면 background watch 프로세스 시작
7. 최종 PASS 또는 명시적 FAIL 리포트

> purpose에 `인스타`/`쓰레드`/`카드뉴스`/`sns` 키워드가 있으면 4:5 카드뉴스 모드(tech-modern-cards 테마)로 자동 분기. PNG 7장 + HTML.

## 사용자 입력

$ARGUMENTS

## 사용 예시

- `/marp sample/1. 클로드 엑셀 소개.md` → propca-notion-style 16:9 deck, 원샷 빌드
- `/marp sample/2. 설치 및 기본설정.md watch` → 빌드 후 watch 프로세스 background 시작
- `/marp content.md 인스타 카드뉴스용 7장` → card-news 모드 (1080×1350 PNG)
- `/marp post.md 쓰레드 후크` → card-news 모드

## 처리 절차

1. **즉시 `md-to-marp` 스킬을 Skill 도구로 호출하세요.** 다른 슬라이드 스킬(`pptx`, `theme-factory`, `web-artifacts-builder` 등)은 절대 호출하지 마세요. 이 프로젝트의 산출은 항상 Marp HTML(+ 카드뉴스 PNG)입니다.

2. 위 사용자 입력에서 파싱:
   - **source**: 첫 위치 인자 또는 첨부 파일 (한글 공백 경로는 큰따옴표)
   - **watch**: 인자에 `watch` 키워드 있으면 활성
   - **purpose**: 자연어. 카드뉴스 키워드(인스타/쓰레드/카드뉴스/sns/소셜) 검출 시 card-news 모드

3. 필수 인자 누락 시 한 번만 사용자에게 묻기:
   - source 누락 → 가장 최근 수정된 `.md` 후보 1~3개 제시 후 선택
   - 그 외 인자는 기본값(deck / watch off)으로 진행

4. 최종 산출 후 다음 정보를 사용자에게 보고:
   - 모드 (deck / card-news)
   - 생성된 파일 경로
     - deck: `output/<slug>/<slug>.cleaned.md`, `<slug>.marp.md`, `<slug>.html`, `<slug>.qa.md`, `assets/`
     - card-news: `output/slides-<slug>-cards.md`, `<slug>-cards.html`, `<slug>-cards/*.png`, `<slug>-cards.qa.md`
   - QA 판정 (PASS/FAIL) + 자동 수정 횟수
   - 브라우저 미리보기 절대 경로
   - (watch 모드면) PID + 종료 방법

5. **자동 매칭 가능 deck 테마는 propca-notion-style 단일.** 다른 14 브랜드 테마(vercel/notion/claude 등)는 자동 매칭 부재이므로 사용자가 직접 `<!-- _class -->`를 작성한 MD에서만 사용 가능. `/marp` 단독으로는 시도하지 마세요.
