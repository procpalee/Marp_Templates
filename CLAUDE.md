# MD to PPT — Project Working Rules

이 프로젝트는 마크다운 → Marp 슬라이드 → HTML 변환 도구체인입니다.
설계 단일 출처는 [`design.md`](./design.md), CSS는 [`samples/themes/`](./samples/themes/) 의 15 테마.

---

## 슬라이드 변환 요청 처리 (필수)

사용자가 다음 중 어느 표현을 쓰든 **반드시 `md-to-deck` 스킬을 가장 먼저 호출**하세요:

- "이 파일/문서/마크다운을 슬라이드로 변환"
- "발표 자료로 만들어줘"
- "Marp으로 변환"
- "PPT / 덱 / 프레젠테이션으로"
- "/deck" 슬래시 명령

**금지**:
- `anthropic-skills:pptx` 호출 (이 프로젝트는 .pptx를 산출하지 않음, Marp HTML이 산출)
- `anthropic-skills:theme-factory` 호출 (자체 15 테마 시스템 사용)
- `web-artifacts-builder` 호출 (HTML은 Marp CLI가 생성)
- 새로 스킬을 검색하거나 다른 변환기 추천 (`md-to-deck`가 이미 존재함)

---

## 핵심 컴포넌트

| 컴포넌트 | 경로 | 역할 |
|---|---|---|
| 변환 스킬 | `.claude/skills/md-to-marp/` | MD → Marp MD (25 레이아웃 자동 매칭) |
| 오케스트레이터 | `.claude/skills/md-to-deck/` | 테마 선택 + 빌드 + QA + 재시도 |
| 검증 에이전트 | `.claude/agents/marp-deck-reviewer.md` | 독립 컨텍스트 QA |
| 슬래시 명령 | `.claude/commands/deck.md` | `/deck <file> [용도]` 명시 호출 |
| 15 테마 CSS | `samples/themes/tm-*.css` | 자기완결형 (인라인 CSS) |

---

## 15 테마 카탈로그

| 테마 | 톤 / 용도 |
|---|---|
| `tech-modern` | 라이트 블루 (베이스) |
| `tm-blue` | 라이트 블루 (테크 일반) |
| `tm-green` | 라이트 그린 (ESG/헬스) |
| `tm-orange` | 라이트 오렌지 (스타트업/피치) |
| `tm-mono` | 다크 모노 (럭셔리/미니멀) |
| `tm-keynote` | 라이트 큰 폰트 (Apple 풍) |
| `tm-business` | 라이트 차분 (IR/임원) |
| `tm-lecture` | 라이트 큰 줄간격 (교육) |
| `tm-demo` | 비비드 마젠타 (데모/프레스) |
| `tm-academic` | 세리프 네이비 (학회/논문) |
| `tm-rose` | 파스텔 핑크 (디자인/UX) |
| `tm-cyber` | 네온 다크 (보안/해커톤) |
| `tm-stripe` | 프리미엄 인디고/네이비 (핀테크/SaaS) |
| `tm-shopify` | 다크 틸 (대시보드/커머스) |
| `tm-linear` | 미니멀 보라 (툴체인/생산성) |

용도→테마 매핑은 [`.claude/skills/md-to-deck/references/theme-picker.md`](.claude/skills/md-to-deck/references/theme-picker.md) 참조.

---

## 산출물 위치 규칙

- **변환물**: `test_markdown_output/slides-<slug>.md`
- **빌드물**: `test_markdown_output/output/<slug>.html`
- **QA 리포트**: `test_markdown_output/output/<slug>.qa.md`

`<slug>`는 입력 파일명 기반 kebab-case. 임의의 다른 위치에 쓰지 마세요.

---

## 빌드 명령

```cmd
cd test_markdown_output
npx --yes @marp-team/marp-cli slides-<slug>.md ^
    --html --allow-local-files ^
    -o output/<slug>.html ^
    --theme-set ../samples/themes
```

- `--theme-set` 은 디렉터리째 지정 (15 테마 모두 등록)
- `--allow-local-files` 누락하면 PDF에서 이미지 누락
- `--html` 필수 (인라인 `<div>` 파싱)

---

## CSS 변경 시 주의

- 베이스(`tech-modern.css`) 수정 시 모든 `tm-*` 파생본도 함께 갱신 필요 (`@import` 사용 안 함, 자기완결형)
- 새 레이아웃 추가는 [`samples/themes/tech-modern.css`](samples/themes/tech-modern.css) 끝에 append
- 새 테마는 `tech-modern.css` 전체 복사 → `@theme` 라인 치환 → 끝에 override append

---

## 검증 원칙

`marp-deck-reviewer` 에이전트는 **독립 컨텍스트로 실행**되어야 합니다.
- 같은 세션의 변환 컨텍스트를 공유하지 말 것 (합리화 편향 회피)
- Agent 도구로 호출하고 결과(리포트)만 수령
- 파일 수정 권한은 reviewer에게 주지 말 것 (Read/Grep/Glob/Bash만)
