# Marp Theme Samples

5개 디자인 시스템에 **완전히 동일한 콘텐츠**를 적용한 비교용 샘플.

## 구조

```
samples/
├── themes/                     # Marp 테마 (CSS)
│   ├── minimal-light.css
│   ├── modern-dark.css
│   ├── academic-editorial.css
│   ├── vivid-gradient.css
│   └── warm-paper.css
├── slides-01-minimal-light.md  # 동일 콘텐츠 × 5
├── slides-02-modern-dark.md
├── slides-03-academic-editorial.md
├── slides-04-vivid-gradient.md
├── slides-05-warm-paper.md
├── package.json
├── build.cmd                   # Windows 배치 빌드
├── index.html                  # 5개 동시 비교 뷰어
└── output/                     # 빌드 결과 (HTML/PDF)
```

## 빌드 (택일)

### A. npx (설치 없이)
```cmd
build.cmd
```

### B. npm 설치 후
```cmd
npm install
npm run build           # 5개 HTML 모두
npm run pdf             # 5개 PDF 모두
npm run watch:01        # 라이브 프리뷰 (1번 테마)
```

개별 빌드도 가능: `npm run build:03`, `npm run pdf:04`

## 비교 뷰어

`npm run build` 후 `index.html` 을 브라우저로 열면 5개 덱을 한 페이지에서 비교 가능.

## 콘텐츠 구성 (9 슬라이드)

각 덱은 동일 순서:
1. 커버 (제목 + 발표자)
2. 챕터 디바이더
3. 불릿 리스트
4. 본문 + 하위 헤딩
5. 코드 블록 (TypeScript)
6. 인용 (blockquote)
7. 통계 (강조 텍스트)
8. 비교표 (table)
9. 엔딩 (Q&A)

## 콘텐츠 수정 시

콘텐츠를 바꾸면 5개 파일을 모두 수정해야 함. 단일 출처가 필요하면:
- (간단) PowerShell 스크립트로 마스터 → 5개 복사
- (정석) Slidev로 가서 layouts 분리

지금은 비교가 목적이라 5개 분리 유지.

## 폰트 의존

모든 테마가 Pretendard + Noto Sans KR을 CDN으로 로드.
오프라인 렌더링은 폰트 로컬 임베드 필요 (`--allow-local-files` 플래그는 이미 적용됨).
