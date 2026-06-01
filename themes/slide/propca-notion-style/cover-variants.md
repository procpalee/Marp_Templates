---
marp: true
theme: propca-notion-style
paginate: true
size: 16:9
header: ''
footer: 'propca-notion-style — Cover Variants'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Cover Variants
## propca-notion-style 표지 6종 카탈로그

2026.05

---

<!-- header: '01. 기본형' -->

# 01 — cover (기본)
**Navy 그라데이션** 풀블리드 + 좌상단 흰색 로고 + H1 하단 hairline + H2 부제 + 우하단 연월.

사용 시점:
- 회계법인·자문사 정통 발표
- 시그니처 톤 유지가 필요한 시리즈
- 별도 이미지 없이 텍스트만으로 신뢰감을 주고 싶을 때

호출: `<!-- _class: cover -->` (생략 시 기본)

---

<!-- _class: cover-image -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _backgroundImage: url('https://picsum.photos/seed/cover-image/1920/1080') -->

# Cover with Image
## 배경 이미지 + Navy 오버레이

2026.05

---

<!-- header: '02. cover-image' -->

# 02 — cover-image
**배경 이미지** + navy 72~82% 알파 오버레이. 이미지 위에 텍스트가 가독성 있게 떠 있음.

사용 시점:
- 키노트 컨퍼런스·런칭 발표
- 분위기·감정을 사진 1장에 담고 싶을 때
- 시리즈물 챕터 전환

호출:
```markdown
<!-- _class: cover-image -->
<!-- _backgroundImage: url('...') -->

# 타이틀
## 부제

2026.05
```

---

<!-- _class: cover-split -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

![bg left:50%](https://picsum.photos/seed/cover-split/960/1080)

# Cover Split

## 좌 사진 / 우 텍스트

2026.05

---

<!-- header: '03. cover-split' -->

# 03 — cover-split
**좌 50% 이미지 / 우 50% navy 텍스트**. Marp `![bg left:50%](url)` 디렉티브로 좌측에 사진을 배치.

사용 시점:
- 인물 사진과 함께 발표자 소개
- 제품 비주얼 + 키 메시지 분리
- 잡지·에디토리얼 톤 표지

호출:
```markdown
<!-- _class: cover-split -->

![bg left:50%](photo.jpg)

# 타이틀
## 부제

2026.05
```

---

<!-- _class: cover-minimal -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Quiet
## 극단적 미니멀의 미학

2026.05

---

<!-- header: '04. cover-minimal' -->

# 04 — cover-minimal
**흰 배경 + 거대 H1 (88pt) + 좌하단 부제·메타**. 발음과 정렬의 절제로 강한 인상.

사용 시점:
- 메시지가 강한 한 단어·구절을 강조하고 싶을 때
- 디자인·아카이브 톤
- 시각적 노이즈 최소화가 핵심인 발표

호출: `<!-- _class: cover-minimal -->`

---

<!-- _class: cover-band -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Cover with Band
## 상단 보라 띠 + 정통 회계법인 톤

2026.05

---

<!-- header: '05. cover-band' -->

# 05 — cover-band
**상단 8px purple 띠** + H1 위 짧은 색 액센트 바 + 중앙 정렬 정통 톤.

사용 시점:
- 회계법인·감사 보고서 정통 발표
- 분기·연간 결산 발표
- 컨설팅 보고서 표지

호출: `<!-- _class: cover-band -->`

---

<!-- _class: cover-photo-full -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

![bg](https://picsum.photos/seed/cover-full/1920/1080)

# Full-bleed Photo
## 풀블리드 사진 + 하단 그라데이션

2026.05

---

<!-- header: '06. cover-photo-full' -->

# 06 — cover-photo-full
**풀블리드 사진** + 하단 50%→95% navy 그라데이션 위에 텍스트. 비주얼 임팩트 최대.

사용 시점:
- 시리즈 첫 발표 키노트
- 브랜드 캠페인 런칭
- 사진 자체가 메시지인 경우 (제품·풍경·인물 클로즈업)

호출:
```markdown
<!-- _class: cover-photo-full -->

![bg](photo.jpg)

# 타이틀
## 부제

2026.05
```

---

<!-- _class: section -->
<!-- _header: '' -->
<!-- header: '07. 비교 한눈에' -->

# 07
## 6종 비교 한눈에

---

<!-- header: '07. 비교 한눈에' -->

# 6종 Cover 비교

| # | 클래스 | 톤 | 적합 |
|---|---|---|---|
| 1 | `cover` | Navy 그라데이션 | 시그니처 정통 발표 |
| 2 | `cover-image` | 배경 이미지 + Navy 오버레이 | 컨퍼런스·런칭 |
| 3 | `cover-split` | 좌 이미지 / 우 텍스트 | 인물·제품 비주얼 |
| 4 | `cover-minimal` | 흰 배경 + 거대 H1 | 메시지 강조·아카이브 |
| 5 | `cover-band` | 상단 보라 띠 + 흰 배경 | 회계법인·정통 보고서 |
| 6 | `cover-photo-full` | 풀블리드 사진 | 브랜드 캠페인·시리즈 첫 화 |

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Cover Variants Catalog
## 끝까지 봐주셔서 감사합니다

ProcPA · propca-notion-style
