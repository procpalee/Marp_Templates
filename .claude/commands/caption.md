---
description: 카드뉴스 .md를 읽고 Threads/LinkedIn용 캡션·해시태그 초안을 `.caption.md`에 생성. 사용자가 수정 후 `npm run publish:cards <slug>`로 게시.
argument-hint: <slug>
---

# /caption — 카드뉴스 캡션 초안 생성

`<slug>` 카드뉴스의 슬라이드 본문을 분석해 Threads/LinkedIn 각 플랫폼에 맞는 캡션 + 해시태그 초안을 생성하고 `.caption.md` 파일로 저장합니다. 사용자는 그 파일을 열어 톤·워딩만 수정한 뒤 `npm run publish:cards <slug>`로 게시.

## 사용자 입력

$ARGUMENTS

## 처리 절차 (순서대로)

1. **slug 추출**: 위 인자에서 첫 단어를 slug로. 비어있으면 가장 최근 빌드된 카드뉴스 슬러그를 자동 탐색(`output/` 또는 `themes/card-news/tech-modern/` 안에서 가장 최근 수정된 `slides-*-cards.md` 또는 `sample-*.md`). 후보가 여러 개면 사용자에게 한 번만 물어봄.

2. **소스 파일 위치 결정** (우선순위):
   - `output/slides-<slug>-cards.md` (표준 출력 경로)
   - `themes/card-news/tech-modern/<slug>.md`
   - `themes/card-news/tech-modern/sample-<slug>.md`
   - 셋 다 없으면 에러: "변환물을 찾을 수 없습니다. 먼저 `/deck`로 카드뉴스를 생성하세요"

3. **카드뉴스 .md 분석**:
   - Read 도구로 전체 파일 읽기
   - frontmatter 확인 (theme, size)
   - 각 슬라이드 추출: `<!-- _class: card-* -->` 단위로 분절
   - 각 슬라이드의 H1/H2/본문/blockquote/리스트 항목 수집
   - 핵심 키워드 추출 (H1, H2, **bold** 강조 어구)
   - 카드뉴스 주제(전체 메시지)와 톤 파악

4. **플랫폼별 캡션 초안 작성** (한국어가 기본, 원본 언어 따라가기):

   ### Threads용 (짧고 hook 중심, 최대 500자)
   - 1줄: 강한 hook 또는 통계 (카드 2번 hook 슬라이드 톤 차용)
   - 2~3줄: 어떤 가치를 주는지 짧게
   - 마지막 1줄: 행동 유도 ("저장하세요", "스와이프 →" 등)
   - 톤: 친근·구어체, 줄바꿈 자주
   - 해시태그 3~5개: 주제 키워드만 (#남용 금지)

   ### LinkedIn용 (전문성·맥락 중심, 최대 3000자)
   - 1줄: 흥미 유발 한 줄 (LinkedIn 미리보기는 ~140자에서 잘림)
   - 2~3문단: 배경 + 핵심 내용 + 활용 예시 또는 본인 견해
   - 마지막: PDF 첨부 안내 ("PDF로 7장 정리해 첨부합니다") + soft CTA
   - 톤: 전문가·차분한 어조, 1인칭 가능
   - 해시태그 3~5개: 영문 PascalCase (예: #AICoding, #DeveloperProductivity)

5. **저장 위치**:
   - 우선: `<source 파일과 같은 폴더>/<slug>.caption.md`
   - 표준 출력 경로 슬러그면: `output/<slug>-cards/<slug>-cards.caption.md`
   - 폴더 없으면 자동 생성

6. **`.caption.md` 스키마 (정확히 이 형식으로 작성, 들여쓰기 보존)**:

```yaml
---
slug: <slug>
generated_at: <ISO 8601 datetime, 사용자 시간대>
threads:
  text: |
    <한 줄씩>
    <줄바꿈 보존>
  hashtags: [tag1, tag2, tag3]
linkedin:
  text: |
    <문단 단위>

    <빈 줄로 문단 구분>
  hashtags: [Tag1, Tag2, Tag3]
---

# 캡션 초안 메모 (publish 대상 아님)

본문 부분은 자유롭게 메모/대안 초안 보관용. publish 시 무시됨.

## 대안 hook 후보
- ...
```

7. **사용자에게 다음 단계 안내**:
```
✓ .caption.md 초안 생성: <경로>
   - Threads: <글자수>자 / 해시태그 <N>개
   - LinkedIn: <글자수>자 / 해시태그 <N>개

수정 후 게시:
  cd build
  npm run publish:cards <slug>            (양쪽 동시)
  npm run publish:cards <slug> -- --dry-run  (사전 검증)
```

## 주의사항

- **사용자 문체/어휘 임의 변형 금지** — 원본 슬라이드의 톤을 그대로 계승
- **과장된 hook 금지** — "충격적인", "반드시" 같은 어그로 단어 안 씀
- **해시태그 5개 초과 금지** — 알고리즘 페널티
- **이모지는 신중하게** — Threads 1~2개, LinkedIn 0~1개
- **URL은 LinkedIn 본문에만** — Threads는 본문 URL이 도달률 ↓
- **줄바꿈은 LF로** (Windows CRLF 금지)

## 금지

- `pptx`/`theme-factory`/`web-artifacts-builder` 스킬 호출 X
- 새 카드뉴스 생성 X (이미 있는 .md만 분석)
- API 호출 X (publish는 별도 `npm run` 단계)
