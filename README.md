# MD to PPT — Marp 슬라이드 자동 변환 워크플로우

마크다운 원본 + 용도 한 줄을 입력하면, 적절한 테마를 자동 선택하고 Marp HTML 슬라이드로 변환하는 Claude Code 워크플로우.

---

## 사용법

Claude Code에서 이 폴더를 연 뒤:

```text
/deck test_markdown/your-file.md "임원 IR 발표용 30분"
```

또는 자연어:

```text
test_markdown/your-file.md 를 학회 발표용 슬라이드로 만들어줘
```

자동으로 다음이 일괄 수행됩니다:

1. **테마 자동 선택** — 용도에서 키워드 추출 (학회 → `tm-academic`)
2. **MD → Marp MD 변환** — 25개 레이아웃에 자동 매칭
3. **HTML 빌드** — `npx @marp-team/marp-cli`
4. **품질 QA** — 독립 컨텍스트 에이전트가 검증
5. **자동 수정 재시도** — 이슈 발견 시 최대 2회 재빌드

산출물:
- `test_markdown_output/slides-<slug>.md` — 변환된 Marp 마크다운
- `test_markdown_output/output/<slug>.html` — 빌드된 HTML
- `test_markdown_output/output/<slug>.qa.md` — QA 리포트

---

## 15 테마 카탈로그

| 테마 | 톤 | 용도 |
|---|---|---|
| `tech-modern` | 라이트 블루 | 베이스, 일반 테크 |
| `tm-blue` | 라이트 블루 | 테크 표준 |
| `tm-green` | 라이트 그린 | ESG / 헬스 / 성장 |
| `tm-orange` | 라이트 오렌지 | 스타트업 / 피치 |
| `tm-mono` | 다크 모노 | 럭셔리 / 미니멀 |
| `tm-keynote` | 라이트 큰 폰트 | Apple 풍 / 신제품 |
| `tm-business` | 라이트 차분 | IR / 임원 / 이사회 |
| `tm-lecture` | 라이트 큰 줄간격 | 강의 / 교육 |
| `tm-demo` | 비비드 마젠타 | 데모데이 / 프레스 |
| `tm-academic` | 세리프 네이비 | 학회 / 논문 |
| `tm-rose` | 파스텔 핑크 | 디자인 / UX |
| `tm-cyber` | 네온 다크 | 보안 / 해커톤 |
| `tm-stripe` | 프리미엄 인디고/네이비 | 핀테크 / SaaS |
| `tm-shopify` | 다크 틸 | 대시보드 / 커머스 |
| `tm-linear` | 미니멀 보라 | 툴체인 / 생산성 |

용도 → 테마 매핑은 [`.claude/skills/md-to-deck/references/theme-picker.md`](.claude/skills/md-to-deck/references/theme-picker.md) 참고.

명시적 오버라이드: `theme=tm-rose` 처럼 지정하면 자동 선택을 건너뜁니다.

---

## 폴더 구조

```
.
├── .claude/
│   ├── agents/marp-deck-reviewer.md   # 독립 QA 에이전트
│   ├── commands/deck.md               # /deck 슬래시 명령
│   └── skills/
│       ├── md-to-deck/                # 오케스트레이터 (테마+빌드+QA)
│       └── md-to-marp/                # MD → Marp MD 변환 (25 레이아웃)
├── samples/
│   ├── themes/                        # 15개 자기완결형 테마 CSS
│   ├── package.json                   # marp-cli 의존성
│   └── node_modules/
├── test_markdown/                     # 원본 .md 보관
├── test_markdown_output/              # 빌드 작업 디렉터리
│   └── package.json                   # build 스크립트
├── CLAUDE.md                          # 프로젝트 규칙 (자동 로드)
├── design.md                          # 디자인 시스템 단일 소스
└── .gitignore
```

---

## 수동 빌드 (선택)

워크플로우 외부에서 빌드만 하고 싶을 때:

```cmd
cd test_markdown_output
npx --yes @marp-team/marp-cli your-slides.md ^
    --html --allow-local-files ^
    -o output/your-slides.html ^
    --theme-set ../samples/themes
```

옵션:
- `--theme-set` 디렉터리째 지정 (15 테마 모두 등록)
- `--allow-local-files` 누락 시 PDF에서 로컬 이미지 누락
- `--html` 필수 (인라인 `<div>` 파싱 활성화)

---

## 라이선스 / 출처

- 신규 3 테마 (`tm-stripe`, `tm-shopify`, `tm-linear`)의 디자인 토큰은 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT) 의 design.md 콜렉션을 참고했습니다. 원본 브랜드 로고나 상표는 포함하지 않습니다.
- 그 외 12개 테마는 자체 제작.

---

## 핵심 컴포넌트

| 컴포넌트 | 경로 | 역할 |
|---|---|---|
| 변환 스킬 | `.claude/skills/md-to-marp/` | MD → Marp MD (25 레이아웃 자동 매칭) |
| 오케스트레이터 | `.claude/skills/md-to-deck/` | 테마 선택 + 빌드 + QA + 재시도 |
| 검증 에이전트 | `.claude/agents/marp-deck-reviewer.md` | 독립 컨텍스트 QA |
| 슬래시 명령 | `.claude/commands/deck.md` | `/deck <file> [용도]` |
| 15 테마 CSS | `samples/themes/tm-*.css` | 자기완결형 (인라인) |
