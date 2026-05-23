---
name: md-to-deck
description: 임의의 마크다운 파일과 용도(목적·청중)를 받아 Marp 슬라이드 마크다운 변환 + 테마 자동 선택 + HTML 빌드 + 별도 검증 에이전트를 통한 품질 QA까지 일괄 수행하는 통합 워크플로. 입력은 원본 .md 경로 + 용도 설명. 출력은 test_markdown_output/slides-<slug>.md, output/<slug>.html, QA 리포트. 내부적으로 md-to-marp 스킬을 호출하고 marp-deck-reviewer 에이전트로 검증한다.
---

# md-to-deck (v1.0)

**End-to-end 워크플로**: 원본 MD → Marp MD → 테마 결정 → HTML 빌드 → 독립 에이전트 QA → (필요 시) 자동 수정 재시도.

`md-to-marp` 스킬과 `marp-deck-reviewer` 에이전트를 오케스트레이션하는 상위 레이어다.

---

## 입출력 계약

### 입력

| 필드 | 필수 | 설명 |
|---|---|---|
| `source` | ✅ | 원본 마크다운 파일 경로 (절대/상대) |
| `purpose` | ✅ | 용도·목적·청중. 자연어 한 문장. 예: "사내 임원 IR 발표용, 30분 분량" |
| `slug` | ❌ | 출력 파일명. 기본은 입력 파일명 기반 |
| `theme` | ❌ | 명시적 테마 지정. 생략 시 `purpose`에서 자동 선택 |
| `max_retries` | ❌ | QA 실패 시 자동 수정 재시도 횟수. 기본 2 |
| `skip_visual_qa` | ❌ | 시각 QA 건너뛰기 (rule-based만). 기본 false |

### 출력

1. **`test_markdown_output/slides-<slug>.md`** — 변환된 Marp 마크다운
2. **`test_markdown_output/output/<slug>.html`** — 렌더링된 HTML
3. **`test_markdown_output/output/<slug>.qa.md`** — QA 리포트 (PASS/FAIL + 이슈 목록)

### 보장 사항

1. `theme` 미지정 시 `purpose`에서 자동 선택 (§2 매핑 표)
2. 빌드 실패 시 즉시 에러 보고하고 중단 (no silent failure)
3. QA 실패 + `max_retries > 0`이면 이슈 기반 자동 수정 후 재빌드·재QA
4. 최종 결과는 항상 PASS 또는 명시적 FAIL 리포트 동반

---

## 워크플로

```
[1] 입력 파싱
     ↓
[2] 테마 결정 (references/theme-picker.md)
     ↓
[3] Skill(md-to-marp) 호출 → slides-<slug>.md 생성
     ↓
[4] npx marp 빌드 → <slug>.html 생성
     ↓
[5] Agent(marp-deck-reviewer) 호출 (독립 컨텍스트)
     │  - rule-based 자동 체크 (8 항목)
     │  - visual 체크 (HTML 직접 분석, 12 항목)
     │  ↓
     │  PASS/FAIL + 이슈 목록 반환
     ↓
[6] PASS면 산출 종료
    FAIL이고 retry < max_retries면:
       - 이슈를 슬라이드 단위 수정 지시로 변환
       - slides-<slug>.md 수정 (Edit tool)
       - [4]부터 재실행
    FAIL이고 retry ≥ max_retries면:
       - 명시적 FAIL 리포트 + 남은 이슈 노출 후 종료
```

---

## 1) 입력 파싱

사용자 발화에서 추출:
- **source 파일 경로**: 명시적 경로 또는 첨부 파일
- **purpose**: 따옴표/콜론 뒤 텍스트. 생략 시 사용자에게 한 번만 물어봄
- **slug**: 입력 파일명에서 `(\d+\.)?\s*(.*)\.md` → kebab-case
- **theme**: `--theme=` 또는 본문에 명시되면 사용. 없으면 자동
- **max_retries**: `--retries=N`. 기본 2

---

## 2) 테마 결정 (theme-picker)

`references/theme-picker.md`의 키워드 매핑을 적용:

```
keywords(purpose) → theme
  학회|논문|세미나|연구|paper|academic     → tm-academic
  강의|교육|튜토리얼|lecture|workshop     → tm-lecture
  비즈니스|임원|IR|투자|board|exec        → tm-business
  스타트업|피치|데모데이|pitch            → tm-orange
  ESG|친환경|헬스|sustainability|health   → tm-green
  디자인|UX|워크숍|design|ux              → tm-rose
  보안|인프라|해커톤|devops|security      → tm-cyber
  키노트|Apple|미니멀|keynote             → tm-keynote
  모노|럭셔리|monochrome|luxury           → tm-mono
  데모|프레스|press|launch                → tm-demo
  (기본)                                  → tm-blue
```

신뢰도가 낮으면 (매칭 단어 없음) `tm-blue` 폴백.

선택 결과를 한 줄로 로그: `Theme selected: tm-rose (matched "워크숍")`.

---

## 3) md-to-marp 호출

Claude Code 환경: `Skill` 도구로 `md-to-marp` 호출.

```
Skill(md-to-marp, args: "<source 경로> theme=<선택된 테마> slug=<slug>")
```

호출 결과로 `test_markdown_output/slides-<slug>.md` 생성됨.

---

## 4) Marp 빌드

```cmd
cd test_markdown_output
npx --yes @marp-team/marp-cli slides-<slug>.md ^
    --html --allow-local-files ^
    -o output/<slug>.html ^
    --theme-set ../samples/themes
```

빌드 exit code ≠ 0이면:
- stderr 캡처
- 즉시 사용자에게 보고 + 중단

---

## 5) 검증 에이전트 호출

```
Agent({
  description: "Marp deck QA review",
  subagent_type: "marp-deck-reviewer",  // .claude/agents/marp-deck-reviewer.md
  prompt: <검증 컨텍스트>
})
```

**검증 컨텍스트 prompt 구조:**

```
다음 Marp 슬라이드 덱을 품질 검증해주세요.

[입력]
- 원본: <source 경로>
- 변환물: test_markdown_output/slides-<slug>.md
- 빌드물: test_markdown_output/output/<slug>.html
- 의도된 용도: <purpose>
- 적용 테마: <theme>

[검증 항목]
1) Rule-based (필수):
   - front matter `theme: <theme>` 존재
   - 첫 슬라이드 `_class: cover`
   - 마지막 슬라이드 `_class: end|qa|thanks-contact`
   - HTML 파일 크기 ≥ 80KB
   - HTML에 `section.cover {` 규칙 존재
   - 원본 H2 텍스트가 모두 결과 어딘가에 살아남았는지 (diff)
   - placeholder (`TODO`, `TBD`, `xxx`, `<...>`) 부재
   - 모든 `<div>` 위아래 빈 줄 (Marp 파싱)

2) Visual (HTML 분석):
   - 슬라이드별 본문 길이 점검
   - 카드/컬럼 균등성 (CSS 검사)
   - 헤더/푸터 텍스트와 본문 겹침
   - 콘트라스트 (다크 배경에 다크 글씨 등)
   - 빈 슬라이드
   - 코드블록 overflow

[출력 형식]
QA 리포트(.md). 항상 동일 스키마:

```
# QA Report — <slug>

**Verdict:** PASS | FAIL
**Theme:** <theme>
**Slides:** <N>
**Build:** <KB>

## Rule-based
- [x|FAIL] front matter theme
- [x|FAIL] cover slide
- ...

## Visual issues (slide-by-slide)
### Slide 7 (grid-3)
- Issue: 카드 3개 폭 불균등
- Severity: medium
- Fix: <구체적 조치>

## Recommendations
- ...
```

리포트만 반환하고 파일은 수정하지 마세요.
```

---

## 6) PASS / FAIL 분기

### PASS 경로

```
✓ QA PASS — <slug>
  Theme: <theme>
  Slides: <N>
  HTML: output/<slug>.html (<KB>)
  Report: output/<slug>.qa.md

빌드 명령:
  cd test_markdown_output && npm run build:<slug>
```

### FAIL + retry < max_retries

이슈 목록 파싱 → 슬라이드 단위 수정:

```
for each issue in report.issues:
  if issue.severity ∈ {high, medium}:
    locate slide in slides-<slug>.md
    apply fix (Edit tool)
retry build + QA
```

### FAIL + retry ≥ max_retries

```
✗ QA FAIL after <max_retries> retries — <slug>
  Remaining issues:
    [slide 7] 카드 폭 불균등 — high
    [slide 12] 이미지 푸터 겹침 — medium
  Report: output/<slug>.qa.md (수동 검토 필요)
```

---

## 7) 패키지화 옵션 (선택)

이 스킬만으로 충분하지만, 더 멀리 가려면:

1. **package.json 스크립트 자동 추가**: 새 slug마다 `build:<slug>` 라인 append (sed로 가능)
2. **로컬 NPM 바이너리** (`bin/md-to-deck`): Node.js 래퍼로 Claude 외부에서도 사용
3. **MCP 서버 노출**: 다른 LLM·Cursor·Continue 등에서도 호출 가능
4. **GitHub Action**: `.md` 푸시 시 자동 빌드 + QA + PR 코멘트

현재 스킬은 (1)만 추가 가능. 나머지는 추후 확장.

---

## 사용 예시

```
사용자: "C:/Users/wogus/docs/Q2-strategy.md 임원 IR 발표용으로 30분짜리 만들어줘"

Claude:
  → Skill(md-to-deck)
  → 파싱: source=Q2-strategy.md, purpose="임원 IR 발표용 30분"
  → 테마: tm-business (matched "임원|IR")
  → Skill(md-to-marp): slides-q2-strategy.md 생성 (24 slides)
  → 빌드: q2-strategy.html (108KB) ✓
  → Agent(marp-deck-reviewer): QA 시작
       리포트: 2 medium issues
         - slide 14 stats KPI 4개 중 1개 빈칸
         - slide 19 코드블록 가로 overflow
  → 자동 수정: slides-q2-strategy.md 2곳 패치
  → 재빌드 → 재QA: PASS ✓
  
출력:
  ✓ QA PASS — q2-strategy
    Theme: tm-business
    Slides: 24
    HTML: output/q2-strategy.html (109KB)
    Retries: 1/2
    Report: output/q2-strategy.qa.md
```

---

## 참고 자료

- 상위 변환 스킬: [`../md-to-marp/SKILL.md`](../md-to-marp/SKILL.md)
- 테마 매핑: [`references/theme-picker.md`](references/theme-picker.md)
- 검증 체크리스트: [`references/verification-checklist.md`](references/verification-checklist.md)
- 검증 에이전트: [`../../agents/marp-deck-reviewer.md`](../../agents/marp-deck-reviewer.md)
- 12 테마 베이스: `../../../samples/themes/`
