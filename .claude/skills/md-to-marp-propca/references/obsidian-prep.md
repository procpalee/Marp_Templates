# Obsidian → Standard Markdown — 변환 규칙 카탈로그

15종 변환 규칙. 정규식은 Python/Node 양쪽에서 호환되도록 작성. 본문 라인 단위 순차 적용 + 멀티라인 블록(콜아웃, 코드펜스) 멀티라인 처리.

---

## 처리 순서

1. **frontmatter 분리** — `^---\n...\n---\n` 매치 → 별도 파싱
2. **코드 펜스 보호** — ```` ```...``` ```` 와 `~~~...~~~` 블록 내용을 토큰화해 변환 제외
3. **콜아웃 멀티라인 처리** — `> [!TYPE]` 블록 단위로 추출 → `<div class="callout ...">` 래핑
4. **본문 라인별 변환** — 규칙 1~13 적용
5. **하단 정리** — 빈 줄 정규화, 풋노트 정의(`[^1]: ...`) 보존
6. **코드 펜스 복원**

---

## 변환 규칙 표 (15종)

| # | 규칙 이름 | 정규식 | 치환 | 비고 |
|---|---|---|---|---|
| 1 | `[[Page]]` | `\[\[([^\|\]#^]+)\]\]` | `\1` (캡처 그룹) | 평문 |
| 2 | `[[Page\|alias]]` | `\[\[[^\|\]]+\|([^\]]+)\]\]` | `\1` (alias) | |
| 3 | `[[Page#Heading]]` / `[[Page#^block]]` | `\[\[([^\|\]#^]+)[#^][^\|\]]+\]\]` | `\1` (Page) | 앵커 제거 |
| 4 | `![[image.png]]` | `!\[\[([^\|\]]+\.(png\|jpg\|jpeg\|gif\|webp\|svg))(\|[^\]]+)?\]\]` | `![](assets/\1)` + vault 복사 | basename 매칭. 자세히는 vault-resolution.md |
| 5 | `![[other.pdf]]` 비이미지 임베드 | `!\[\[([^\]]+)\]\]` (rule 4 매치 후 잔존) | `> 📎 Embedded: \1` | Marp 렌더 불가 |
| 6 | `> [!NOTE]` / `> [!INFO]` / `> [!ABSTRACT]` / `> [!SUMMARY]` | 멀티라인 블록 | `<div class="callout info">` + 첫 줄 `**참고**` / `**요약**` 라벨 | |
| 7 | `> [!TIP]` / `> [!EXAMPLE]` / `> [!HINT]` | 멀티라인 블록 | `<div class="callout example">` + `**예시**` / `**팁**` 라벨 | propca example variant |
| 7b | `> [!IMPORTANT]` / `> [!important]` | 멀티라인 블록 | `<div class="callout info">` + `**중요**` 라벨 | 라벨로 강조 |
| 8 | `> [!SUCCESS]` / `> [!DONE]` / `> [!CHECK]` | 멀티라인 블록 | `<div class="callout success">` + `**완료**` 라벨 | |
| 9 | `> [!WARNING]` / `> [!CAUTION]` / `> [!ATTENTION]` | 멀티라인 블록 | `<div class="callout warn">` + `**경고**` 라벨 | |
| 9b | `> [!QUESTION]` / `> [!HELP]` / `> [!FAQ]` | 멀티라인 블록 | `<div class="callout warn">` + `**질문**` 라벨 | |
| 10 | `> [!DANGER]` / `> [!ERROR]` / `> [!BUG]` / `> [!FAILURE]` / `> [!FAIL]` / `> [!MISSING]` | 멀티라인 블록 | `<div class="callout danger">` + `**위험**` 라벨 | |
| 10b | `> [!QUOTE]` / `> [!CITE]` | 멀티라인 블록 | 일반 `<blockquote>` (콜아웃 ❌ — 그냥 인용) | |
| 10c | `[[TIP()]]` ~ `[[/TIP]]` 비표준 블록 | 멀티라인 블록 (시작·종료 마커 사이 본문) | `<div class="callout example">` + `**TIP**` 라벨 | Obsidian 커스텀 플러그인 출신 마커 |
| 10d | `[[NOTE()]]` ~ `[[/NOTE]]` | 멀티라인 블록 | `<div class="callout info">` + `**참고**` 라벨 | |
| 10e | `[[WARN()]]` ~ `[[/WARN]]` 또는 `[[WARNING()]]` ~ `[[/WARNING]]` | 멀티라인 블록 | `<div class="callout warn">` + `**경고**` 라벨 | |
| 10f | `[[INFO()]]` ~ `[[/INFO]]` | 멀티라인 블록 | `<div class="callout info">` + `**참고**` 라벨 | |
| 11 | YAML frontmatter 옵시디언 전용 키 | `^(tags\|aliases\|cssclass\|publish\|permalink\|date created\|date modified\|obsidianUIMode\|cssclasses):` | 제거 | `title`/`author`/`series`/`date`는 보존 |
| 12 | 파일 상단 `#tag #tag2` 해시태그 블록 | 첫 비-frontmatter 라인이 `^(#\w+\s*)+$` 패턴 | 라인 통째 제거 | frontmatter `tags:` 키로 승격 (frontmatter 존재 시) |
| 13 | 행 끝 `^block-id` | `\s+\^[a-zA-Z0-9-]+\s*$` | 제거 | suffix만 |
| 14 | Dataview / Templater 블록 | ```` ```dataview\|dataviewjs ```` 또는 `<%[\s\S]+?%>` | 블록 통째 제거 + 리포트 경고 | Marp 실행 불가 |
| 15 | 풋노트 + HTML 주석 | `\[\^[^\]]+\]` , `<!--[\s\S]*?-->` | 보존 | Marp/markdown-it 처리 |

### `[[TYPE()]]` ~ `[[/TYPE]]` 비표준 블록 파싱

일부 옵시디언 사용자(특히 한국 커뮤니티 + 커스텀 플러그인)는 표준 `> [!TYPE]` 대신 `[[TYPE()]]` 시작 + `[[/TYPE]]` 종료 마커로 콜아웃을 표현한다. 정규화 알고리즘:

1. 라인 스캔 중 `^\[\[(\w+)\(\)\]\]$` 매치 → 블록 시작 (TYPE 캡처)
2. 다음 `^\[\[/\1\]\]$` 매치까지 본문 누적
3. 매핑 표(10c~10f)에 따라 타입별 `<div class="callout {info|example|warn|danger|success}">`로 래핑
4. 본문 첫 줄은 `**라벨**`(TIP/참고/경고 등) 자동 삽입
5. 블록 안의 마크다운(ul/ol/굵게/링크 등)은 그대로 유지

**중요**: `[[TYPE()]]` 블록은 옵시디언이 인식하지 못해 평문으로 보이지만, 사용자의 vault 내에서는 커스텀 CSS·플러그인으로 시각화되는 경우가 많다. 변환 시 propca의 `.callout`으로 표준화하면 동일한 강조 효과를 얻는다.

---

## 콜아웃 멀티라인 파싱 알고리즘

옵시디언 콜아웃은 다음과 같이 여러 행에 걸쳐 있다:

```
> [!NOTE] Optional Title
> 첫 번째 본문 줄.
> 두 번째 본문 줄.
>
> 빈 줄 후 세 번째 본문.
```

파싱 단계:
1. 라인 스캔 중 `^> \[!(\w+)\](\+|-)?\s*(.*)$` 매치 → 콜아웃 시작
2. 다음 라인이 `^>\s?` 로 시작하면 콜아웃 본문 (앞 `>` 제거)
3. 첫 비-`>` 라인 또는 EOF에서 콜아웃 종료
4. 매핑 표(규칙 6~10)로 종류 결정
5. 출력 형식:
   ```html
   <div class="callout {info|success|example|warn|danger}">

   {Optional Title이 있으면 **<Title>**}

   {본문}

   </div>
   ```
   (Marp가 인라인 `<div>` 파싱하려면 위·아래 빈 줄 필수)

타이틀 처리:
- `> [!NOTE] My Title` → 첫 줄에 `**My Title**`
- `> [!NOTE]` 단독 → 타이틀 생략

폴드 마커 (`+`/`-`):
- 출력에선 무시 (Marp는 폴드 개념 없음)

---

## 코드 펜스 보호

```` ``` ```` 또는 `~~~`로 시작하는 블록 안의 내용은 변환 대상이 아니다:

```python
def f(x):
    return [[x]]  # 이건 그대로 두기
```

알고리즘:
1. 1차 패스: 코드 펜스 위치 인덱싱 (시작·종료 라인 번호)
2. 변환 시 인덱싱된 범위 skip
3. 그대로 보존

예외: 라인 내 인라인 코드(`` `code` ``)는 짧으므로 라인별 정규식이 자연스럽게 잘 처리. 단 인라인 코드 안에 `[[`가 있을 가능성도 있으므로 인라인 코드도 토큰화 권장 (선택).

---

## frontmatter 처리

옵시디언 frontmatter 예시:
```yaml
---
title: 클로드 엑셀 소개
tags: [ai, claude, excel]
aliases: [Claude for Excel]
date created: 2025-04-01
cssclasses: [wide]
obsidianUIMode: source
author: ProcPA
---
```

처리 후 (다운스트림으로 통과):
```yaml
---
title: 클로드 엑셀 소개
author: ProcPA
---
```

- 옵시디언 전용 키 제거: `tags`, `aliases`, `cssclasses`, `cssclass`, `publish`, `permalink`, `date created`, `date modified`, `obsidianUIMode`
- 보존: `title`, `author`, `series`, `date` (publication 표준)
- frontmatter 자체가 없으면 그대로 패스

`tags`가 있고 본문 상단에 해시태그 라인이 없으면, frontmatter `tags`는 그대로 제거 (다운스트림이 Marp라 사용 안 함).

---

## 풋노트 보존

옵시디언 풋노트는 Marp + markdown-it에서 그대로 동작하므로 변환하지 않는다:

```markdown
본문 내 참조[^1].

[^1]: 풋노트 정의.
```

→ 그대로 통과.

---

## 변환 리포트 데이터 구조

리포트는 카운트 + 경고를 담는다:

```json
{
  "wikilinks_stripped": 12,
  "image_embeds": {"resolved": 4, "missing": 0, "ambiguous": 0},
  "callouts": {"info": 1, "warn": 1, "example": 1, "success": 0, "danger": 0},
  "hashtag_blocks_stripped": 1,
  "dataview_blocks_stripped": 0,
  "block_ids_stripped": 5,
  "footnotes_preserved": 2,
  "frontmatter_keys_stripped": ["tags", "aliases", "cssclass"],
  "warnings": []
}
```

---

## 테스트 케이스 (sample 폴더 기준 예상)

| 입력 파일 | 예상 변환 |
|---|---|
| `sample/1. 클로드 엑셀 소개.md` | wikilinks 0~5, image embeds 0~3, callout 0~2 |
| `sample/2. 설치 및 기본설정.md` | image embeds 2~5 (스크린샷 위주), 절차형 ol 보존 |
| `sample/3. 주요 기능 및 동작 원리.md` | 기능 카드형 → 변환 대상 적음 (대부분 표준 MD), 콜아웃 1~2 |
| `sample/최신 AI 인사이트 - 1. AI는 회계 업계를 어떻게 바꿀 것인가....md` | 장문 블로그 → wikilinks 5+, footnotes 가능, image embeds 1~3 |

실제 카운트는 V-1 검증에서 확인.
