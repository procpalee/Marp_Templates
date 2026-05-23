# 테마 선택 가이드 (theme-picker)

`purpose` (용도·목적·청중) 자연어에서 키워드를 매칭해 12 테마 중 하나를 선택한다.

---

## 12 테마 카탈로그

| # | 테마 | 톤 | 적합 용도 |
|---|---|---|---|
| 1 | `tech-modern` | 라이트 + 블루 | 베이스. 무난한 테크 발표 |
| 2 | `tm-blue` | 라이트 + 블루 | 일반 테크 표준 (tech-modern과 동일) |
| 3 | `tm-green` | 라이트 + 그린 | 친환경·ESG·헬스·성장 지표 |
| 4 | `tm-orange` | 라이트 + 오렌지 | 스타트업·피치·데모데이·에너지 |
| 5 | `tm-mono` | 다크 + 모노 | 미니멀·럭셔리·하이엔드·럭셔리 브랜드 |
| 6 | `tm-keynote` | 라이트 + 큰 폰트 | Apple 풍·미니멀·신제품 발표 |
| 7 | `tm-business` | 라이트 + 차분 | 임원·IR·투자 보고·이사회 |
| 8 | `tm-lecture` | 라이트 + 큰 줄간격 | 강의·교육·튜토리얼·워크북 |
| 9 | `tm-demo` | 비비드 마젠타 | 데모·프레스·런칭·페스티벌 |
| 10 | `tm-academic` | 세리프 네이비 | 학회·논문·세미나·연구실 |
| 11 | `tm-rose` | 파스텔 핑크 | 디자인·UX·워크숍·라이프스타일 |
| 12 | `tm-cyber` | 네온 다크 | 보안·인프라·해커톤·devops |
| 13 | `tm-stripe` | 프리미엄 인디고/네이비 | 핀테크·결제·SaaS 프리미엄·B2B |
| 14 | `tm-shopify` | 다크 틸 | 대시보드·커머스·관리자 UI |
| 15 | `tm-linear` | 미니멀 보라 | 툴체인·생산성·이슈트래커 |

---

## 키워드 → 테마 매핑

소문자 정규화 후 매칭. 첫 매치 채택. 동시 매치는 위 우선순위.

| 매칭 키워드 (정규식 OR) | 선택 |
|---|---|
| `학회\|논문\|세미나\|연구실\|paper\|academic\|conference\|thesis` | `tm-academic` |
| `강의\|교육\|튜토리얼\|워크북\|lecture\|tutorial\|teaching\|class` | `tm-lecture` |
| `임원\|이사회\|IR\|투자\|보드\|exec\|board\|investor\|earnings` | `tm-business` |
| `스타트업\|피치\|데모데이\|pitch\|demoday\|fundraising` | `tm-orange` |
| `ESG\|친환경\|헬스\|sustainability\|health\|wellness\|eco\|green` | `tm-green` |
| `디자인\|UX\|UI\|워크숍\|design\|ux\|workshop\|brainstorm` | `tm-rose` |
| `보안\|인프라\|해커톤\|devops\|security\|infra\|hackathon\|hacker` | `tm-cyber` |
| `키노트\|Apple\|미니멀\|launch\|keynote\|minimal\|product` | `tm-keynote` |
| `모노\|럭셔리\|monochrome\|luxury\|premium\|highend` | `tm-mono` |
| `데모\|프레스\|press\|demo\|release\|festival` | `tm-demo` |
| `프리미엄\|premium\|결제\|payment\|fintech\|핀테크\|stripe\|SaaS\|B2B` | `tm-stripe` |
| `대시보드\|커머스\|이커머스\|ecommerce\|shopify\|dashboard\|admin` | `tm-shopify` |
| `툴체인\|workflow\|productivity\|linear\|이슈트래커\|task` | `tm-linear` |
| `(unmatched)` | `tm-blue` (fallback) |

---

## 매칭 신뢰도

| 매칭 단어 수 | 신뢰도 | 처리 |
|---|---|---|
| 2 이상 | 高 | 첫 매치 채택 |
| 1 | 中 | 채택 + 로그에 후보 표시 |
| 0 | 低 | `tm-blue` 폴백, 사용자 알림 |

---

## 명시적 오버라이드

사용자가 명시적으로 `theme=<이름>` 또는 "tm-rose 테마로"라고 지정하면 매칭 결과 무시하고 그 값 사용.

존재하지 않는 테마 이름이면 사용자에게 알림 후 fallback.

---

## 출력 형식

```
Theme selected: tm-academic
  matched: "학회" (in purpose: "학회 발표용 30분")
  confidence: 高
```

또는

```
Theme selected: tm-blue (fallback)
  no keyword matched in purpose: "내부 리뷰 자료"
  override with: theme=<name>
```
