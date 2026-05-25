# propca-notion-style — 인라인 헬퍼 자동 주입 규칙

전용 레이아웃(`_class`)과 별개로, 슬라이드 본문 어디서나 사용 가능한 8 인라인 헬퍼가 propca CSS에 정의되어 있다. md-to-marp-propca는 본문 패턴을 분석해 이 헬퍼들을 **자동 주입**한다.

---

## 헬퍼 카탈로그 (CSS 정의)

| 헬퍼 | 호출법 | 용도 |
|---|---|---|
| `.callout` | `<div class="callout {info\|success\|example\|warn\|danger}">...</div>` | 강조 박스 5종 |
| `.tag` | `<span class="tag {green\|yellow\|purple\|rose\|sky\|peach\|navy}">...</span>` | 상태 배지 7색 |
| `.chip` | `<span class="chip">...</span>` (또는 `chip solid`/`chip outline`) | 작은 라벨 |
| `.kbd` | `<span class="kbd">⌘</span>` | 키보드 키 캡 |
| `.divider` | `<div class="divider"></div>` (또는 `.strong`/`.purple`) | 가는 가로 구분선 |
| `.note` | `<div class="note">...</div>` | 조용한 메모 (callout보다 작은 톤) |
| `.cols-2` / `.cols-3` | `<div class="cols-2"><div>L</div><div>R</div></div>` | 인라인 다단 분할 |
| `figure` | `<figure>![](url)<figcaption>...</figcaption></figure>` | 이미지 + 캡션 |

---

## 자동 주입 규칙 5종

### 1. `.callout` — cleanup이 이미 처리

`obsidian-cleanup` 스킬이 `> [!NOTE]` 등을 `<div class="callout ...">`로 변환해두므로 md-to-marp-propca는 그대로 통과시킨다.

추가 케이스 (cleanup 거치지 않은 입력):
- 본문 첫 줄이 `**참고**`, `**Note**`, `**Tip**`, `**중요**`, `**경고**`, `**위험**`로 시작 + 후속 본문 2~5행 → `.callout` 자동 감싸기
  - `참고`/`Note`/`Tip` → `info`
  - `중요`/`Important` → `info`
  - `경고`/`Warning`/`주의` → `warn`
  - `위험`/`Danger`/`Error` → `danger`
  - `예시`/`Example` → `example`
  - `완료`/`Success` → `success`

### 2. `.tag` — 상태 키워드 자동 감지

본문 (인라인 또는 표 셀)에서 다음 패턴 매치 시 `<span class="tag {color}">`로 자동 래핑:

| 매치 | 색상 | 비고 |
|---|---|---|
| `완료`, `Done`, `완성` | `green` | |
| `진행중`, `In Progress`, `WIP` | `yellow` | |
| `예정`, `Upcoming`, `Scheduled` | `sky` | |
| `대기`, `Pending`, `Hold` | `peach` | |
| `중단`, `Blocked`, `Cancelled` | `rose` | |
| `긴급`, `Urgent`, `Critical` | `rose` | |
| `검토`, `Review` | `purple` | |
| `완료(예정)`, `보류` | `navy` | |

**주의**: 본문 평문에 우발적으로 등장하는 단어는 래핑하지 않는다. 다음 컨텍스트만 매치:
1. 표 셀 안 (database-rows 레이아웃)
2. 괄호 안 (`(완료)`, `(진행중)`)
3. ul/ol 항목 끝 (`- 김◯◯ — 완료`)

### 3. `.kbd` — 단축키 자동 래핑

본문에서 다음 패턴 매치:
- `⌘+K`, `⌘K`, `Cmd+K`, `Command+K`
- `Ctrl+C`, `Ctrl+Shift+P`
- `Alt+Tab`, `Option+`
- `Win+R`, `Shift+Enter`

각 키를 `<span class="kbd">키</span>`로 분리 래핑. 예:
- 입력: ``⌘+K로 명령 팔레트 열기``
- 출력: ``<span class="kbd">⌘</span>+<span class="kbd">K</span>로 명령 팔레트 열기``

문장 안 평문 단어("Ctrl이라는 키")는 매치하지 않음 — `+` 또는 `Shift` 같은 modifier 동반 시에만 활성화.

### 4. `.note` — 짧은 보조 메모

다음 패턴이 1~2행 짧은 보조 정보로 보이면 `.note`로 변환:
- `> 참고: ...` blockquote 1행
- `> Note: ...` blockquote 1행
- `> cf. ...` blockquote 1행
- `*참고:* ...` 이탤릭 시작
- 슬라이드 끝에 `※ ...`로 시작하는 1~2행

`.callout`보다 시각적으로 조용한 톤 (회색 인덴트 박스, 아이콘 없음).

### 5. `.chip` — 헤더 라벨

H1/H2 본문 안에 `[NEW]`, `[BETA]`, `[Coming Soon]`, `[Deprecated]` 같은 대괄호 라벨이 있으면 `<span class="chip">라벨</span>`로 변환.

예:
- 입력: `## 클로드 엑셀 v2 [BETA]`
- 출력: `## 클로드 엑셀 v2 <span class="chip">BETA</span>`

---

## 주입 안 하는 경우 (보수적 결정)

다음 상황에서는 자동 주입을 **건너뛰고** 평문 유지:
- 코드 펜스 안 — 코드를 망가뜨릴 수 있음
- HTML 주석 안 (`<!-- ... -->`) — Marp 디렉티브 보호
- 풋노트 정의 안 (`[^1]: ...`)
- 이미 다른 인라인 HTML 안 (예: `<a>...</a>`)
- 단일 짧은 단락 안 본문이 인라인 코드 1개만으로 구성된 경우

---

## 충돌 처리

여러 규칙이 동시에 매치되면 우선순위:
1. `.callout` (블록 단위 우선)
2. `.note` (블록 단위)
3. `.chip` (헤더 안)
4. `.tag` (인라인)
5. `.kbd` (인라인)

같은 토큰이 두 규칙에 해당하지 않도록 한 번 래핑된 영역은 후속 패스에서 제외.

---

## 사용자 직접 작성

작성자가 명시적으로 `<div class="cols-2">`, `<div class="divider">`, `<figure>` 등을 마크다운에 직접 써둔 경우 그대로 통과. 자동 주입과 충돌하지 않도록 사용자 작성 인라인 HTML은 우선시.

---

## 주입 결과 리포트

변환 완료 시 인라인 헬퍼 주입 카운트를 리포트:

```
Inline helpers injected:
  .callout: 2  (info: 1, warn: 1)
  .tag    : 5  (green: 2, yellow: 2, sky: 1)
  .kbd    : 3  (⌘+K, Ctrl+S, Shift+Enter)
  .note   : 1
  .chip   : 0
```

검증 단계(marp-reviewer)는 cleanup 단계의 callout 마커 수와 marp.md의 `.callout` 출현 수가 일치하는지 cross-check 가능.

---

## 참고

- propca CSS의 헬퍼 정의: [`../../../themes/slide/propca-notion-style/propca-notion-style.css`](../../../themes/slide/propca-notion-style/propca-notion-style.css) 의 `--- COMMON INLINE HELPERS ---` 섹션
- 쇼케이스 시연: [`../../../themes/slide/propca-notion-style/propca-notion-style.md`](../../../themes/slide/propca-notion-style/propca-notion-style.md) 의 "공통 지원 컴포넌트" 카테고리
