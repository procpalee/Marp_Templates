---
marp: true
theme: propca-notion-style
paginate: true
size: 16:9
header: ''
footer: 'propca-notion-style — Color Variants Catalog'
---

<style>
/* ====== 카탈로그 전용 인라인 변형 (시각 데모만) ======
 * 실제 테마 적용은 별도 .css 파일 분기 (본 작업 범위 외)
 */
section.variant-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 18px;
  padding: 72px 88px;
}
section.variant-demo h1 {
  grid-column: 1 / -1;
  font-size: 32pt;
  margin-bottom: 8px;
  color: var(--demo-ink, var(--ink));
}
section.variant-demo .palette-row {
  grid-column: 1 / -1;
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}
section.variant-demo .palette-row > span {
  flex: 1;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11pt;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  letter-spacing: 0.02em;
}
section.variant-demo .mini-cover {
  background: var(--demo-cover-bg, linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%));
  color: #ffffff;
  padding: 22px 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
}
section.variant-demo .mini-cover h3 {
  color: #ffffff;
  font-size: 22pt;
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}
section.variant-demo .mini-cover .sub {
  color: rgba(255,255,255,0.78);
  font-size: 13pt;
  margin-bottom: 12px;
}
section.variant-demo .mini-cover .meta {
  font-size: 11pt;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
}
section.variant-demo .mini-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
section.variant-demo .mini-card {
  background: var(--canvas-card);
  border: 1px solid var(--hairline);
  border-radius: 8px;
  padding: 12px;
  font-size: 11pt;
  line-height: 1.4;
  color: var(--ink-mute);
}
section.variant-demo .mini-card .badge {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--demo-accent, var(--purple));
  color: #ffffff;
  font-size: 12pt;
  font-weight: 700;
  text-align: center;
  line-height: 22px;
  margin-bottom: 6px;
}
section.variant-demo .mini-card b {
  display: block;
  font-size: 12pt;
  color: var(--ink);
  margin-bottom: 4px;
}
section.variant-demo .mini-callout {
  background: var(--canvas-card);
  border: 1px solid var(--hairline);
  border-left: 3px solid var(--demo-accent, var(--purple));
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 12pt;
  color: var(--ink);
}
section.variant-demo .mini-callout b {
  color: var(--demo-accent, var(--purple));
  font-size: 10pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}
section.variant-demo .mini-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
section.variant-demo .mini-tags > span {
  font-size: 11pt;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 500;
}

/* === 6 톤 정의 === */
section.tone-current {
  --demo-accent: #5645d4;
  --demo-cover-bg: linear-gradient(180deg, #0a1530 0%, #070f24 100%);
}
section.tone-rose {
  --demo-accent: #d14d72;
  --demo-cover-bg: linear-gradient(180deg, #1f1018 0%, #170911 100%);
}
section.tone-emerald {
  --demo-accent: #10a37f;
  --demo-cover-bg: linear-gradient(180deg, #0a1f1a 0%, #061613 100%);
}
section.tone-amber {
  --demo-accent: #e09b3d;
  --demo-cover-bg: linear-gradient(180deg, #1f1607 0%, #160f04 100%);
}
section.tone-slate {
  --demo-accent: #64748b;
  --demo-cover-bg: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}
section.tone-ocean {
  --demo-accent: #0072c6;
  --demo-cover-bg: linear-gradient(180deg, #062335 0%, #03162a 100%);
}
</style>

<!-- _class: cover -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Color Variants Catalog
## propca-notion-style 컬러 톤 6종 시안

2026.05

---

<!-- header: '00. 한눈에 보기' -->

# 한눈에 보기 — 6종 시그니처

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px;">
<div style="background: #0a1530; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">CURRENT</b><br><span style="font-size:22pt;font-weight:700;">Navy + Purple</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#0a1530 · #5645d4</span></div>
<div style="background: #1f1018; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">ROSE</b><br><span style="font-size:22pt;font-weight:700;">Navy + Rose</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#1f1018 · #d14d72</span></div>
<div style="background: #0a1f1a; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">EMERALD</b><br><span style="font-size:22pt;font-weight:700;">Navy + Emerald</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#0a1f1a · #10a37f</span></div>
<div style="background: #1f1607; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">AMBER</b><br><span style="font-size:22pt;font-weight:700;">Brown + Amber</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#1f1607 · #e09b3d</span></div>
<div style="background: #1e293b; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">SLATE</b><br><span style="font-size:22pt;font-weight:700;">Charcoal + Slate</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#1e293b · #64748b</span></div>
<div style="background: #062335; color: #fff; padding: 14px 18px; border-radius: 8px;"><b style="font-size:13pt;letter-spacing:0.08em;color:rgba(255,255,255,0.6)">OCEAN</b><br><span style="font-size:22pt;font-weight:700;">Navy + Ocean</span><br><span style="font-size:11pt;color:rgba(255,255,255,0.7)">#062335 · #0072c6</span></div>
</div>

---

<!-- _class: variant-demo tone-current -->
<!-- header: '01. CURRENT — Navy + Purple' -->

# Current — Navy + Purple <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">회계·자문 시그니처</span>

<div class="palette-row"><span style="background:#0a1530;">#0a1530</span><span style="background:#5645d4;">#5645d4</span><span style="background:#f6f5f4;color:#191918;">#f6f5f4</span><span style="background:#e5e3df;color:#191918;">#e5e3df</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>클로드 엑셀 가이드</h3><div class="sub">AI 자동화 가이드 시리즈 #1</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">A</span><b>Skills</b>도메인 매뉴얼화</div>
<div class="mini-card"><span class="badge">B</span><b>MCP</b>외부 도구 연결</div>
<div class="mini-card"><span class="badge">C</span><b>PPT 연동</b>한 번에 보고서</div>
</div>

<div class="mini-callout"><b>참고</b>회계법인·자문사 기본 톤. 정통적·신뢰감 강조.</div>

<div class="mini-tags"><span style="background:#d9f3e1;color:#1f5e2c;">완료</span><span style="background:#f9e79f;color:#7a5d00;">진행중</span><span style="background:#dcecfa;color:#1758a3;">예정</span><span style="background:#e6e0f5;color:#3a2a99;">검토</span></div>

---

<!-- _class: variant-demo tone-rose -->
<!-- header: '02. ROSE — Navy + Rose' -->

# Rose — Navy + Rose <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">마케팅·여성층·라이프스타일</span>

<div class="palette-row"><span style="background:#1f1018;">#1f1018</span><span style="background:#d14d72;">#d14d72</span><span style="background:#fdf3f6;color:#191918;">#fdf3f6</span><span style="background:#f0d6df;color:#191918;">#f0d6df</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>2026 마케팅 트렌드</h3><div class="sub">고객 경험 디자인</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">A</span><b>Persona</b>고객 정의</div>
<div class="mini-card"><span class="badge">B</span><b>Journey</b>접점 매핑</div>
<div class="mini-card"><span class="badge">C</span><b>Loyalty</b>충성도 설계</div>
</div>

<div class="mini-callout"><b>TIP</b>따뜻하고 친근한 톤. 라이프스타일 발표에 적합.</div>

<div class="mini-tags"><span style="background:#fde0ec;color:#a32468;">트렌드</span><span style="background:#ffe8d4;color:#8a4015;">신상품</span><span style="background:#f9e79f;color:#7a5d00;">캠페인</span></div>

---

<!-- _class: variant-demo tone-emerald -->
<!-- header: '03. EMERALD — Navy + Emerald' -->

# Emerald — Navy + Emerald <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">환경·헬스케어·자연</span>

<div class="palette-row"><span style="background:#0a1f1a;">#0a1f1a</span><span style="background:#10a37f;">#10a37f</span><span style="background:#f4f9f5;color:#191918;">#f4f9f5</span><span style="background:#d2e8d8;color:#191918;">#d2e8d8</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>ESG 성과 보고</h3><div class="sub">2026년 환경·사회·지배구조</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">E</span><b>Environment</b>탄소 감축</div>
<div class="mini-card"><span class="badge">S</span><b>Social</b>임직원 다양성</div>
<div class="mini-card"><span class="badge">G</span><b>Governance</b>이사회 독립성</div>
</div>

<div class="mini-callout"><b>핵심</b>친환경·헬스케어 발표에 적합한 차분한 자연 톤.</div>

<div class="mini-tags"><span style="background:#d9f3e1;color:#0d5e3b;">달성</span><span style="background:#dcecfa;color:#1758a3;">진행</span><span style="background:#f9e79f;color:#7a5d00;">검토</span></div>

---

<!-- _class: variant-demo tone-amber -->
<!-- header: '04. AMBER — Brown + Amber' -->

# Amber — Brown + Amber <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">출판·저널·문화</span>

<div class="palette-row"><span style="background:#1f1607;">#1f1607</span><span style="background:#e09b3d;">#e09b3d</span><span style="background:#faf4ea;color:#191918;">#faf4ea</span><span style="background:#e8dcc4;color:#191918;">#e8dcc4</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>독서모임 회보</h3><div class="sub">2026년 5월 — 인문 고전</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">1</span><b>소크라테스의 변명</b>이번 달 책</div>
<div class="mini-card"><span class="badge">2</span><b>변경 다음 시즌</b>도덕경 시리즈</div>
<div class="mini-card"><span class="badge">3</span><b>토론 일정</b>5/28 19시</div>
</div>

<div class="mini-callout"><b>예시</b>저널·문화·아카이브 톤. 따뜻하고 클래식한 인상.</div>

<div class="mini-tags"><span style="background:#ffe8d4;color:#8a4015;">고전</span><span style="background:#f9e79f;color:#7a5d00;">에세이</span><span style="background:#fde0ec;color:#a32468;">시</span></div>

---

<!-- _class: variant-demo tone-slate -->
<!-- header: '05. SLATE — Charcoal + Slate' -->

# Slate — Charcoal + Slate <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">법률·미니멀·B2B</span>

<div class="palette-row"><span style="background:#1e293b;">#1e293b</span><span style="background:#64748b;">#64748b</span><span style="background:#f8fafc;color:#191918;">#f8fafc</span><span style="background:#e2e8f0;color:#191918;">#e2e8f0</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>법률 자문 보고서</h3><div class="sub">2026.Q1 주요 판례</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">§</span><b>1심</b>승소율 분석</div>
<div class="mini-card"><span class="badge">§</span><b>2심</b>리스크 항목</div>
<div class="mini-card"><span class="badge">§</span><b>판례</b>최근 동향</div>
</div>

<div class="mini-callout"><b>NOTE</b>중립적·절제된 톤. 법률·재무 보고서·B2B 미니멀 발표.</div>

<div class="mini-tags"><span style="background:#e2e8f0;color:#1e293b;">중요</span><span style="background:#dcecfa;color:#1758a3;">검토</span><span style="background:#d9f3e1;color:#1f5e2c;">결정</span></div>

---

<!-- _class: variant-demo tone-ocean -->
<!-- header: '06. OCEAN — Navy + Ocean' -->

# Ocean — Navy + Ocean <span style="font-size:14pt;font-weight:400;color:var(--ink-sub);">테크·B2B SaaS·핀테크</span>

<div class="palette-row"><span style="background:#062335;">#062335</span><span style="background:#0072c6;">#0072c6</span><span style="background:#f0f7fc;color:#191918;">#f0f7fc</span><span style="background:#d2e4f0;color:#191918;">#d2e4f0</span><span style="background:#191918;">#191918</span></div>

<div class="mini-cover">
<div><h3>SaaS 플랫폼 로드맵</h3><div class="sub">2026 H2 제품 전략</div></div>
<div class="meta">2026.05</div>
</div>

<div class="mini-cards">
<div class="mini-card"><span class="badge">Q2</span><b>API v2</b>리뉴얼</div>
<div class="mini-card"><span class="badge">Q3</span><b>AI Copilot</b>출시</div>
<div class="mini-card"><span class="badge">Q4</span><b>Enterprise</b>SSO</div>
</div>

<div class="mini-callout"><b>핵심</b>테크·핀테크·B2B 신뢰감 톤. Ocean Blue 강조.</div>

<div class="mini-tags"><span style="background:#dcecfa;color:#1758a3;">Beta</span><span style="background:#d9f3e1;color:#1f5e2c;">GA</span><span style="background:#f9e79f;color:#7a5d00;">Roadmap</span></div>

---

<!-- header: '07. 토큰 매트릭스' -->

# 토큰 매트릭스 — 톤별 핵심 7개

| 톤 | --purple (시그니처) | --navy (Hero) | --navy-deep | --canvas-card | --pastel-accent | 적합 컨텍스트 |
|---|---|---|---|---|---|---|
| **CURRENT** | `#5645d4` | `#0a1530` | `#070f24` | `#f6f5f4` | lavender | 회계·자문·기본 |
| **ROSE** | `#d14d72` | `#1f1018` | `#170911` | `#fdf3f6` | pink-200 | 마케팅·라이프스타일 |
| **EMERALD** | `#10a37f` | `#0a1f1a` | `#061613` | `#f4f9f5` | mint | 환경·헬스케어 |
| **AMBER** | `#e09b3d` | `#1f1607` | `#160f04` | `#faf4ea` | peach | 출판·저널·문화 |
| **SLATE** | `#64748b` | `#1e293b` | `#0f172a` | `#f8fafc` | gray-200 | 법률·미니멀·B2B |
| **OCEAN** | `#0072c6` | `#062335` | `#03162a` | `#f0f7fc` | sky | 테크·SaaS·핀테크 |

> 실제 테마 적용은 별도 .css 파일로 분기(예: `propca-rose.css`) 또는 `_class: theme-rose` 인라인 변형으로 후속 작업.

---

<!-- _class: end -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Color Variants Catalog
## 톤 선택 후 별도 분기 작업 진행

ProcPA · propca-notion-style
