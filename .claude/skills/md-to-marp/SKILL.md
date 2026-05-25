---
name: md-to-marp
description: 마크다운 파일(옵시디언 또는 표준)을 받아 Marp 슬라이드 HTML로 한 번에 변환하는 오케스트레이터. 두 가지 모드 — (1) deck 모드: propca-notion-style 16:9 슬라이드 (강의·교육·발표 자료 기본), (2) card-news 모드: 4:5 Threads/Instagram 카드뉴스 (purpose에 인스타/카드뉴스/sns 키워드 매치 시). 파이프라인은 obsidian-cleanup → md-to-marp-propca → Marp HTML 빌드 → marp-reviewer QA → (선택) watch 모드. 출력은 output/<slug>/<slug>.html (+ cleaned.md, marp.md, qa.md, assets/). card-news 모드는 기존 output/<slug>-cards/*.png 구조 유지.
---

# md-to-marp (v2.0)

**End-to-end 워크플로**: 옵시디언 또는 표준 마크다운 → 모드 결정 → (옵시디언 전처리 →) Marp MD 변환 → HTML 빌드 → 독립 QA → (선택) watch 모드.

`obsidian-cleanup`, `md-to-marp-propca` 스킬과 `marp-reviewer` 에이전트를 오케스트레이션하는 상위 레이어.

---

## 입출력 계약

### 입력

| 필드 | 필수 | 설명 |
|---|---|---|
| `source` | ✅ | 마크다운 파일 경로 (절대/상대). 옵시디언 또는 표준 형식 모두 지원 |
| `purpose` | ❌ | 자연어 용도. 카드뉴스 키워드 검출 시 mode=card-news로 분기 |
| `mode` | ❌ | `deck`(기본) 또는 `card-news`. 미지정 시 `purpose`에서 자동 감지 |
| `slug` | ❌ | 출력 파일명. 기본은 source 파일명 기반 |
| `watch` | ❌ | true면 빌드 후 watch 프로세스 background 시작 |
| `max_retries` | ❌ | QA 실패 시 자동 수정 재시도 횟수. 기본 2 |
| `skip_qa` | ❌ | QA 건너뛰기. 기본 false |

### 출력 (deck 모드 — propca-notion-style)

```
output/<slug>/
  <slug>.cleaned.md       ← obsidian-cleanup 산출 (옵시디언이 아니어도 정리본)
  <slug>.marp.md          ← md-to-marp-propca 산출
  <slug>.html             ← Marp HTML 빌드
  <slug>.qa.md            ← marp-reviewer 리포트
  assets/                 ← 옵시디언 이미지 복사본 (있을 때)
```

### 출력 (card-news 모드 — tech-modern-cards)

기존 flat 구조 유지 (호환성):
```
output/
  slides-<slug>-cards.md  ← 카드뉴스 Marp MD
  <slug>-cards.html       ← 검수 HTML
  <slug>-cards/*.png      ← 1080×1350 PNG 카드 7장
  <slug>-cards.qa.md      ← QA 리포트
```

### 보장 사항

1. `mode` 미지정 시 `purpose`에서 자동 감지 (§2)
2. deck 모드 = propca-notion-style 고정 (다른 14 브랜드 테마는 자동 매칭 부재)
3. 빌드 실패 시 즉시 에러 보고하고 중단
4. QA FAIL + `max_retries > 0`이면 이슈 기반 자동 수정 후 재빌드·재QA
5. `watch` 활성 시 초기 빌드 + QA 완료 후 watch 프로세스를 background 시작 (QA는 watch 모드에선 재실행하지 않음)
6. 최종 결과는 항상 PASS 또는 명시적 FAIL 리포트 동반

---

## 워크플로

```
[1] 입력 파싱 (source, purpose, mode, watch)
     ↓
[2] 모드 결정 (§2)
     │  - card-news 키워드 매치 → mode=card-news, theme=tech-modern-cards
     │  - 그 외 → mode=deck, theme=propca-notion-style
     ↓
[3] deck 모드:
     [3-1] Skill(obsidian-cleanup) → output/<slug>/<slug>.cleaned.md + assets/
     [3-2] Skill(md-to-marp-propca) → output/<slug>/<slug>.marp.md
    card-news 모드:
     [3'] 카드뉴스 변환 (§5) → output/slides-<slug>-cards.md
     ↓
[4] Marp 빌드
     │  - deck: HTML 1-pass
     │  - card-news: HTML + PNG 2-pass
     ↓
[5] Agent(marp-reviewer) 호출 (독립 컨텍스트)
     │  - rule-based + visual
     │  - PASS/FAIL + 이슈 목록 반환
     ↓
[6] PASS면 산출 종료
    FAIL + retry < max_retries:
       이슈 → 슬라이드 단위 수정 (Edit tool) → [4]부터 재실행
    FAIL + retry ≥ max_retries:
       명시적 FAIL 리포트 + 남은 이슈 노출 후 종료
     ↓
[7] watch=true:
     - background로 Marp --watch 시작
     - 사용자에게 HTML 절대 경로 + PID 알림
```

---

## 1) 입력 파싱

사용자 발화에서 추출:
- **source**: 명시적 경로 또는 첨부 파일. 한글 공백 포함 경로도 지원 (큰따옴표)
- **purpose**: 따옴표/콜론 뒤 자연어. 생략 시 deck 모드 기본
- **slug**: source 파일명에서 `(\d+\.)?\s*(.*)\.md` → kebab-case (한글 보존 + 공백/특수문자만 `-`)
- **watch**: 인자에 `watch` 키워드 있으면 활성
- **max_retries**: `--retries=N`. 기본 2

---

## 2) 모드 자동 감지

```
keywords(purpose) → mode

  인스타|insta|instagram|쓰레드|threads|카드뉴스|card news|sns|소셜|social 카드
    → mode=card-news, theme=tech-modern-cards (고정)

  (그 외)
    → mode=deck, theme=propca-notion-style (고정)
```

선택 결과 1줄 로그:
- `Mode: deck / Theme: propca-notion-style`
- `Mode: card-news (matched "인스타") / Theme: tech-modern-cards`

> **주의**: deck 모드의 14 다른 브랜드 테마(vercel/notion/claude/spotify/stripe/figma/apple/linear/cursor/raycast/supabase/airbnb/nvidia/tesla)는 **자동 매칭 부재** — 사용자가 `<!-- _class -->`를 수동으로 작성한 경우에만 사용 가능. 본 오케스트레이터는 자동 변환 시 propca-notion-style만 사용.

---

## 3) deck 모드 파이프라인

### 3-1) obsidian-cleanup 호출

```
Skill(obsidian-cleanup, args: "<source 경로> slug=<slug>")
```

산출: `output/<slug>/<slug>.cleaned.md` + `output/<slug>/assets/` (이미지 복사본).

**옵시디언 마커가 없는 표준 MD도 그대로 통과** (cleanup은 멱등). 의미: 이 단계는 항상 안전하게 실행 가능.

### 3-2) md-to-marp-propca 호출

```
Skill(md-to-marp-propca, args: "<output/<slug>/<slug>.cleaned.md> slug=<slug> [header=...] [footer=...] [presenter=...]")
```

산출: `output/<slug>/<slug>.marp.md`.

### 3-3) Marp 빌드

```cmd
cd build
npx --yes @marp-team/marp-cli ^
    ../output/<slug>/<slug>.marp.md ^
    --html --allow-local-files ^
    -o ../output/<slug>/<slug>.html ^
    --theme-set ../themes/slide
```

`--theme-set ../themes/slide`로 propca-notion-style.css 자동 등록 (재귀 스캔).

빌드 exit code ≠ 0:
- stderr 캡처 후 즉시 사용자 보고 + 중단

### 3-4) marp-reviewer QA

```
Agent({
  description: "Marp deck QA review",
  subagent_type: "marp-reviewer",
  prompt: <검증 컨텍스트>
})
```

검증 컨텍스트 prompt 구조:

```
다음 Marp 슬라이드 덱을 품질 검증해주세요.

[입력]
- 모드: deck
- 원본: output/<slug>/<slug>.cleaned.md (또는 source)
- 변환물: output/<slug>/<slug>.marp.md
- 빌드물: output/<slug>/<slug>.html
- 의도된 용도: <purpose>
- 적용 테마: propca-notion-style

[지침]
- Phase 0 테마 감지 → propca-notion-style → Phase 1A 적용
- Phase 2 visual 양 모드 공통
- PASS/FAIL 판정 + 슬라이드별 이슈 + 자동 수정 권장 사항

[출력 형식]
.claude/agents/marp-reviewer.md §"출력 형식" 스키마 그대로
리포트만 반환하고 파일은 수정하지 마세요.
```

리포트는 `output/<slug>/<slug>.qa.md`로 저장.

---

## 4) card-news 모드 파이프라인

> 옵시디언 전처리 + propca 매칭은 사용 안 함. tech-modern-cards 어휘 직접 적용.

### 4-1) 카드뉴스 변환 (오케스트레이터 내장)

source를 직접 읽어 7 카드뉴스 레이아웃에 매핑:

| # | 입력 패턴 | 출력 클래스 | 신뢰도 |
|---|---|---|---|
| 1 | 첫 슬라이드 (강제) | `card-cover` | 高 |
| 2 | 마지막 H1 = `팔로우`/`저장`/`구독`/`Follow`/`@핸들`/URL | `card-cta` | 高 |
| 3 | 마지막 H1 = `감사`/`Thanks`/`끝` (CTA 미해당) | `card-end` | 高 |
| 4 | blockquote 단독 (≥2줄) | `card-quote` | 高 |
| 5 | H1 단독 + 본문 ≤1줄 + 후속 ≥3 (2번 슬라이드 이내) | `card-hook` | 中 |
| 6 | ol 3~5 항목 (각 ≤2줄) | `card-list` | 高 |
| 7 | 그 외 (H2 + 본문/ul) | `card-point` | 高 |
| 0 | 폴백 | `card-point` | — |

부가 규칙:
- `card-point`에 번호 배지 자동 부여 (인라인 코드 ``01``, ``02`` 형식)
- `card-cover` 첫 슬라이드: H1 + 부제 + 핸들 3줄 구조
- `card-cta`: URL/`@핸들`을 마지막 단락으로 분리
- 16:9용 `<div class="col">`/`<div class="tile">` 등 추가 마크업 금지

front matter:
```yaml
---
marp: true
theme: tech-modern-cards
size: sns
paginate: false
_header: ''
_footer: ''
---
```

산출: `output/slides-<slug>-cards.md`.

### 4-2) 2-pass 빌드

```cmd
cd build

:: HTML (검수용)
npx --yes @marp-team/marp-cli ../output/slides-<slug>-cards.md ^
    --html --allow-local-files ^
    -o ../output/<slug>-cards.html ^
    --theme-set ../themes/card-news/tech-modern

:: PNG 카드 (소셜 업로드)
npx --yes @marp-team/marp-cli ../output/slides-<slug>-cards.md ^
    --images png --allow-local-files ^
    -o ../output/<slug>-cards/<slug>-cards.png ^
    --theme-set ../themes/card-news/tech-modern
```

### 4-3) marp-reviewer QA

위와 동일하지만 prompt의 `[모드]`를 `card-news`로, `[적용 테마]`를 `tech-modern-cards`로 지정.

---

## 5) PASS / FAIL 분기

### PASS 경로

deck:
```
✓ QA PASS — <slug>
  Mode: deck
  Theme: propca-notion-style
  Slides: <N>
  HTML: output/<slug>/<slug>.html (<KB>)
  Report: output/<slug>/<slug>.qa.md

  미리보기: file:///<절대경로>/<slug>.html
```

card-news:
```
✓ QA PASS — <slug>
  Mode: card-news
  Slides: <N>
  HTML: output/<slug>-cards.html
  PNG:  output/<slug>-cards/ (<N> files, 1080×1350)
  Report: output/<slug>-cards.qa.md
```

### FAIL + retry < max_retries

이슈 목록 → 슬라이드 단위 수정:
```
for each issue in report.issues:
  if issue.severity ∈ {high, medium}:
    locate slide in <slug>.marp.md (또는 slides-<slug>-cards.md)
    apply fix (Edit tool)
retry build + QA
```

### FAIL + retry ≥ max_retries

```
✗ QA FAIL after <max_retries> retries — <slug>
  Remaining issues:
    [slide 7] 카드 개수 불일치 — high
    [slide 12] _header 누락 — medium
  Report: output/<slug>/<slug>.qa.md (수동 검토 필요)
```

---

## 6) Watch 모드 (deck 모드 전용, 선택)

`watch=true` 인자가 있으면 QA PASS 후 watch 프로세스 background 시작:

```cmd
cd build
npx --yes @marp-team/marp-cli ^
    ../output/<slug>/<slug>.marp.md ^
    --watch --html --allow-local-files ^
    --theme-set ../themes/slide
```

Bash 도구의 `run_in_background: true`로 호출. 사용자에게 알림:

```
👀 Watch 모드 시작
   PID: <pid>
   감시 중: output/<slug>/<slug>.marp.md
   HTML: file:///<절대경로>/<slug>.html

   .marp.md를 수정하면 HTML이 자동 재빌드됩니다.
   종료: kill <pid> 또는 터미널 닫기
```

> watch 모드에서는 QA 재실행하지 않음 (재빌드 노이즈 회피). QA는 초기 1회만.

---

## 사용 예시

### 옵시디언 강의 자료
```
사용자: "/marp sample/2. 설치 및 기본설정.md"

Claude:
  → Skill(md-to-marp)
  → 파싱: source=sample/2. 설치 및 기본설정.md, slug=2-설치-및-기본설정
  → 모드: deck / 테마: propca-notion-style
  → Skill(obsidian-cleanup): 18 wikilinks, 4 image embeds, 1 callout 처리
  → Skill(md-to-marp-propca): 14 slides, 3 cover/section, 2 timeline, 4 cards, ...
  → 빌드: 142 KB HTML ✓
  → Agent(marp-reviewer): PASS (high=0, medium=1)
  → 출력:
       ✓ QA PASS — 2-설치-및-기본설정
         HTML: output/2-설치-및-기본설정/2-설치-및-기본설정.html
         미리보기: file:///.../2-설치-및-기본설정.html
```

### Watch 모드
```
사용자: "/marp sample/3. 주요 기능 및 동작 원리.md watch"

Claude:
  → 위 전체 파이프라인 1회 실행
  → QA PASS
  → Watch 프로세스 background 시작 (PID: 12345)
  → "이제 원본 .md를 수정하면 HTML이 자동 갱신됩니다."
```

### 카드뉴스
```
사용자: "/marp content.md 인스타 카드뉴스용 7장"

Claude:
  → Skill(md-to-marp)
  → 모드: card-news (matched "인스타") / 테마: tech-modern-cards
  → 카드뉴스 변환: 7 slides (card-cover/4×card-point/card-list/card-cta)
  → 빌드: HTML 32KB + 7 PNG (1080×1350)
  → Agent(marp-reviewer): PASS
  → 출력 경로 안내
```

---

## 참고 자료

- 옵시디언 전처리: [`../obsidian-cleanup/SKILL.md`](../obsidian-cleanup/SKILL.md)
- propca 자동 매칭: [`../md-to-marp-propca/SKILL.md`](../md-to-marp-propca/SKILL.md)
- 검수 에이전트: [`../../agents/marp-reviewer.md`](../../agents/marp-reviewer.md)
- propca-notion-style 디자인: [`../../../themes/slide/propca-notion-style/design.md`](../../../themes/slide/propca-notion-style/design.md)
- 카드뉴스 디자인: [`../../../themes/card-news/tech-modern/design.md`](../../../themes/card-news/tech-modern/design.md)
- 슬래시 명령: [`../../commands/marp.md`](../../commands/marp.md)
