# procpa-vivid-thumb — 썸네일 시스템 (매체별 비율 + 변형 5종)

슬라이드 테마 procpa-vivid의 토큰(Vivid Blue `#2563eb` · Pretendard · 헤어라인)을 계승한 **자기완결형 썸네일 테마**. 슬라이드 CSS의 `section.thumb`(16:9 단일)를 승격해 매체별 사이즈 프리셋 + 레이아웃 변형 7종으로 확장했다.

## 사이즈 프리셋 (front matter `size:` + `_class` ratio 합성)

| 프리셋 | 크기 | 비율 | 용도 | front matter | `_class` 합성 |
|---|---|---|---|---|---|
| (기본) | 1280×720 | 16:9 | 블로그 OG · 유튜브 · 링크 미리보기 | `size:` 생략 | — |
| `sq` | 1080×1080 | 1:1 | 인스타 피드 · 프로필 그리드 | `size: sq` | `sq` |
| `sns` | 1080×1350 | 4:5 | 카드뉴스 표지 겸용 | `size: sns` | `tall` |

- **16:9 세이프 영역**: 좌우 320px 패딩 → 콘텐츠가 가운데 1:1(720×720) 존 안에 유지되어 정사각 크롭에도 안 잘림. **주 산출물은 16:9** — sq/sns 프리셋은 인스타 피드·카드 표지가 따로 필요할 때만.
- **텍스트·로고·브랜드는 모든 비율에서 가운데 정렬** (2026-07 사용자 결정 — 콘텐츠가 중앙 1:1 존에 갇히므로 좌측 정렬보다 자연스러움).
- ratio 클래스(`sq`/`tall`)는 **모든 슬라이드의 `_class`에 함께** 넣는다: `<!-- _class: thumb-photo sq -->`.

## 레이아웃 변형 5종

| 클래스 | 스타일 | 어울리는 콘텐츠 |
|---|---|---|
| `thumb-photo` ★기본 | 사진(`_backgroundImage` **cover**) + 다크 스크림 + 화이트 타이포 | 메인 변형 — 사진 없으면 잉크 폴백 |
| `thumb-typo` | 화이트 순타이포 + 상하 룰 | 텍스트 글, 오피니언 |
| `thumb-ink` | 잉크 캔버스 + 블루 액센트 바 | 선언형 제목, 사진 없음 |
| `thumb-band` | 상단 16px 블루 밴드 + 화이트 | 가이드·하우투 |
| `thumb-badge` | 블루 pill 회차 배지 (`<div class="badge">EP 01</div>`) | 연재물 |

브랜드 마커는 **모든 변형에서 하단 중앙** — photo/ink는 화이트 로고 이미지(테마 `::after`가 자동 배치), typo/band/badge는 `<div class="brand">PROCPA</div>` 텍스트.

> v1의 `thumb-split`(좌 텍스트/우 스크린샷)은 슬라이드 표지 성격이라 삭제, `thumb-quote`도 삭제 (2026-07 사용자 결정).

공통 마크업: `.eyebrow`(카테고리) → `# 제목` → `<p class="sub">부제</p>` (+ 화이트 캔버스 변형은 `<div class="brand">PROCPA</div>`). 사진은 `_backgroundImage` 디렉티브(스크림은 테마가 처리, `![bg]` 아님).

## 빌드 (`build/`에서)

```
npm run build:thumb        # 16:9 샘플 시트 HTML (검수)
npm run thumb:png-169      # 16:9 PNG (1280×720)
npm run thumb:png-sq       # 1:1 PNG (1080×1080)
npm run thumb:png-45       # 4:5 PNG (1080×1350)
npm run thumb:all          # 3종 일괄
```

산출: `themes/thumbnail/procpa-vivid/png/sample-<ratio>.NNN.png`. 실사용 산출물은 `output/<slug>-thumb/` 권장.

## Marpit 주의사항 (구현 메모)

- `section::after`는 Marpit이 예약(페이지네이션) — 테마의 `content`가 제거되고 `padding: inherit`가 주입된다. 로고 ::after에는 반드시 `padding: 0`을 명시할 것. `section::before`는 안전(content 보존).
- 사이즈 프리셋은 CSS 메타데이터 `/* @size sq 1080px 1080px */` 선언 → front matter `size: sq`로 선택.
- 로고 data-URI는 슬라이드 테마와 동일 (갱신 시 `--logo` 값만 교체).

## 파일

- CSS: [`procpa-vivid-thumb.css`](procpa-vivid-thumb.css)
- 샘플: [`sample-169.md`](sample-169.md) / [`sample-sq.md`](sample-sq.md) / [`sample-45.md`](sample-45.md) — sq/45는 `build/`의 gen 스크립트가 아닌 sample-169 기준 수동 동기화 (내용 동일, size+ratio 클래스만 차이)
- 미리보기 PNG: `png/`
