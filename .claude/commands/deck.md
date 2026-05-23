---
description: 마크다운 파일을 Marp 슬라이드로 변환 + 테마 자동 적용 + HTML 빌드 + 별도 에이전트 QA. 가장 명시적으로 워크플로를 트리거하는 슬래시 명령.
argument-hint: <파일경로> [용도 설명]
---

# /deck — Marp 슬라이드 일괄 변환 + QA

이 명령은 **반드시 `md-to-deck` 스킬을 호출**하여 다음을 일괄 수행합니다:

1. 마크다운 원본 분석
2. 용도(목적·청중) 기반 12 테마 중 자동 선택
3. `md-to-marp` 스킬로 Marp MD 변환
4. `npx @marp-team/marp-cli`로 HTML 빌드
5. **`marp-deck-reviewer` 에이전트(독립 컨텍스트)** 로 품질 QA
6. 이슈 있으면 자동 수정 후 재빌드·재QA (최대 2회)
7. 최종 PASS 또는 명시적 FAIL 리포트

## 사용자 입력

$ARGUMENTS

## 처리 절차

1. **즉시 `md-to-deck` 스킬을 Skill 도구로 호출하세요.** 다른 슬라이드 스킬(`pptx`, `theme-factory`, `web-artifacts-builder` 등)은 절대 호출하지 마세요. 이 프로젝트의 산출은 항상 Marp HTML입니다.

2. 위 사용자 입력에서 파싱:
   - **source**: 파일 경로 또는 첨부 파일
   - **purpose**: 자연어 한 문장 용도 설명

3. 둘 다 명확하지 않으면 한 번만 사용자에게 물어보세요. 그 외에는 합리적인 기본값으로 진행하세요:
   - source 누락 시: 가장 최근 수정된 `.md` 후보 1~3개 제시 후 선택받기
   - purpose 누락 시: 파일 내용을 빠르게 훑어서 추정 + `tm-blue` 폴백

4. 최종 산출 후 다음 정보를 사용자에게 보고:
   - 생성된 파일 경로 (slides-<slug>.md, output/<slug>.html, output/<slug>.qa.md)
   - 선택된 테마와 그 이유 (매칭 키워드)
   - QA 판정 (PASS/FAIL) + 자동 수정 횟수
   - 브라우저 미리보기 명령 (`start "" "..."` 또는 `open "..."`)
