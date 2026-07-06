---
marp: true
theme: procpa-vivid-dark
paginate: true
size: 16:9
header: 'procpa-vivid-dark — Bright Royal'
footer: '© 2026 · procpa.co.kr'
---

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

<div class="eyebrow">procpa-vivid · Dark "Bright Royal"</div>

# 어둠 위에서도, 더 선명하게.

## 다크 캔버스 `#0b0e13` · Bright Royal `#5b9cff` 단일 강조 — 라이트 베이스를 @import로 상속한 다크 변형. 토큰만 바꿔 모든 컴포넌트가 자동 반전됩니다.

build with clarity · 2026

---

<!-- _class: section -->
<!-- _header: '' -->

# 01

## 공통 컴포넌트 — 같은 마크업, 반전된 표면

---

# 기본 콘텐츠 — 다크 전환

라이트 테마의 모든 컴포넌트·레이아웃은 `:root` 토큰만 바꿔 그대로 다크로 반전됩니다. 강조색은 라이트 `#2563eb` → 다크 `#5b9cff`로 한 종만 교체됩니다.

- 깊이는 여전히 **헤어라인 + 여백**에서 옵니다 (그림자 zero).
- 인라인 `code`는 어두운 muted 표면 토큰칩으로 처리됩니다.

> 인용 콜아웃도 다크 캔버스 위 soft blue wash로 자동 반전됩니다.

---

# `.card` + `.stat` (다크)

<div class="cols-3">
<div class="card"><h4>Structure</h4><h3>헤어라인</h3><p>다크 카드도 raised surface 토큰으로 분리됩니다.</p></div>
<div class="card top-rule"><h4>Accent</h4><h3>Bright Royal</h3><p>강조는 `#5b9cff` 한 종.</p></div>
<div class="stat"><div class="num">40<span class="unit">%</span></div><div class="label">소요 시간</div><div class="desc">기존 대비</div></div>
</div>

---

# `.board` · `.panel` (다크 신규 컴포넌트)

<div class="cols-2">
<div class="board two">
<div class="board-col"><h4>진행</h4><div class="board-item accent">검증 에이전트</div><div class="board-item">정책 수립</div></div>
<div class="board-col"><h4>완료</h4><div class="board-item">애드인 설치</div></div>
</div>
<div class="panel accent"><h4>원칙</h4><h3>단일 책임</h3><p>작성·검증 컨텍스트를 분리해 편향을 차단합니다.</p></div>
</div>

---

# `.process` · `.quote-block` (다크)

<div class="process">
<div class="process-step"><span class="n">01</span><h3>수집</h3><p>원장·증빙 정리.</p></div>
<div class="process-step"><span class="n">02</span><h3>검증</h3><p>1차 + 독립 교차.</p></div>
<div class="process-step"><span class="n">03</span><h3>서명</h3><p>사람 최종 판단.</p></div>
</div>

<div class="quote-block"><p>토큰 전용이라 인용 블록도 다크에서 그대로 반전됩니다.</p><span class="cite">— procpa-vivid-dark</span></div>

---

# 인라인 헬퍼 — 다크 색 반전

<div class="callout"><strong>info</strong> — 좌측 블루 바 콜아웃.</div>
<div class="callout success"><strong>success</strong> — 성공·완료 상태.</div>
<div class="callout danger"><strong>danger</strong> — 위험·금지 사항.</div>

<div class="divider"></div>

상태 배지 <span class="tag success">완료</span> <span class="tag warn">진행</span> <span class="tag danger">중단</span> · <span class="mark">.mark 하이라이트</span> · 단축키 <span class="kbd">Ctrl</span> + <span class="kbd">K</span>

<div class="note">.note — 다크 캔버스 위 한 단계 조용한 메모 박스.</div>

---

# `.code-block` · `.table-block` (다크)

<div class="cols-2">
<div class="code-block">
<div class="code-head">audit_agent.py<span class="lang">python</span></div>

```python
class AuditAgent:
    def verify(self, ledger):
        return self.scan(ledger)
```

</div>
<div class="table-block zebra compact">

| 단계 | 담당 |
|---|---|
| 수집 | 에이전트 |
| 검증 | 독립 교차 |
| 서명 | 사람 |

<div class="cap">표 1. 책임</div>
</div>
</div>

---

<!-- _class: statement -->

# 본질은 사라지지 않습니다. <strong>제3자의 독립성</strong>이 감사 제도의 핵심입니다.

ProcPA — 최신 AI 인사이트

---

<!-- _class: vertical-timeline -->

# vertical-timeline (다크)

1. **수집** — 원본 마크다운 분석
2. **분절** — 슬라이드 단위 분할
3. **매칭** — 컴포넌트/레이아웃 판정
4. **빌드** — HTML/PDF 생성

---

<!-- _class: problem-solution -->

# problem-solution (다크)

<div class="ps-row">
<div class="problem"><h3>문제</h3><div class="body">

수작업 검증에 **주당 12시간**, 마감 지연 반복.

</div></div>
<div class="arrow">→</div>
<div class="solution"><h3>해결</h3><div class="body">

**독립 검증 에이전트**가 교차 확인, 사람은 판단·서명.

</div></div>
</div>

---

<!-- _class: cover-image -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->
<!-- _backgroundImage: "url('https://picsum.photos/seed/pvdcov/1920/1080')" -->

# cover-image (다크)

## 사진 스크림은 라이트/다크 동일 — 흰 텍스트 유지

2026.06

---

<!-- _class: takeaway -->

<div class="eyebrow">핵심 정리</div>

# 다크에서도 결론은 <strong>선명</strong>합니다.

토큰 전용이라 problem 레일·blue 강조가 자동 반전됩니다.

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# 감사합니다.

## 한국공인회계사 이재현 · 회계 × AI 생산성

procpa.co.kr · 2026
