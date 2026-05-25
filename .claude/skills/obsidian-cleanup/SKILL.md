---
name: obsidian-cleanup
description: 옵시디언(Obsidian)에서 작성된 마크다운 파일을 표준 마크다운으로 변환하는 테마 무관 전처리 스킬. [[wikilinks]], ![[image embeds]], > [!NOTE] 콜아웃, YAML frontmatter, #tag 블록, ^block-id, Dataview/Templater 등 옵시디언 고유 문법을 정리해서 Marp·Pandoc·정적사이트 등 어떤 다운스트림에서도 쓸 수 있는 표준 MD를 생성한다. 이미지 자산은 output/<slug>/assets/로 복사해 자기완결적 결과물 디렉토리를 만든다. md-to-marp 오케스트레이터가 호출하지만 단독으로도 사용 가능.
---

# obsidian-cleanup (v1.0)

옵시디언 마크다운을 **표준 마크다운**으로 정리하는 테마 무관 전처리 스킬.

`md-to-marp` 오케스트레이터의 첫 단계로 호출되지만 독립적으로도 사용 가능. 출력은 다른 어떤 Marp 테마 자동매칭(`md-to-marp-propca` 등)에도 그대로 입력될 수 있다.

---

## 입출력 계약

### 입력

| 필드 | 필수 | 설명 |
|---|---|---|
| `source` | ✅ | 옵시디언 .md 파일 경로 (절대/상대) |
| `vault_root` | ❌ | 옵시디언 vault 루트. 미지정 시 `.obsidian/` 폴더를 source 상위 디렉토리에서 자동 탐색 |
| `slug` | ❌ | 출력 파일명. 기본은 source 파일명 기반 kebab-case |
| `force` | ❌ | 캐시 무시 강제 재생성. 기본 false |

### 출력

1. **`output/<slug>/<slug>.cleaned.md`** — 정리된 표준 마크다운
2. **`output/<slug>/assets/`** — vault에서 복사된 이미지 자산
3. **변환 리포트** (콘솔/return) — 스트립된 항목 수, 이미지 해석 로그, 경고

### 보장 사항

1. 옵시디언 마커(`[[`, `![[`, `> [!`, `^block-id`) 잔재 0
2. 결과 디렉토리는 자기완결적 — 다른 폴더로 옮겨도 이미지 깨지지 않음
3. 멱등성: source mtime ≤ cleaned mtime이면 재실행 시 skip (force=true 제외)
4. Marp 디렉티브(`<!-- _class: ... -->`)와 풋노트(`[^1]`)는 보존
5. frontmatter의 `title`/`author`/`series`는 다운스트림으로 통과 (옵시디언 전용 키만 제거)

---

## 작업 흐름

```
[1] source 읽기
     ↓
[2] vault_root 탐색 (.obsidian/ 상위 추적)
     ↓
[3] mtime 캐시 체크 (force 아니면 skip 가능)
     ↓
[4] frontmatter 파싱 + 옵시디언 전용 키 분리
     ↓
[5] 본문 라인 단위 변환 (15종 규칙 — references/transforms.md)
     ↓
[6] 이미지 자산 복사 (references/vault-resolution.md)
     ↓
[7] output/<slug>/<slug>.cleaned.md 작성 + assets/ 복사
     ↓
[8] 변환 리포트 반환
```

---

## 1) source 읽기 + slug 결정

- `slug` 미지정 시: source 파일명에서 `(\d+\.)?\s*(.*)\.md` → kebab-case
  - 예: `1. 클로드 엑셀 소개.md` → `claude-excel-intro` 또는 `1-클로드-엑셀-소개`
  - 한글이 다수면 한글 그대로 유지하되 공백/특수문자만 `-`로 (예: `클로드-엑셀-소개`)
- `output/<slug>/` 디렉토리 생성 (없으면)

---

## 2) vault_root 탐색

1. `source` 디렉토리에서 시작
2. 상위로 올라가며 `.obsidian/` 폴더 발견 시 → 그 위치가 vault_root
3. 못 찾고 파일시스템 루트 도달 → source 부모 디렉토리를 vault_root로 가정 (경고 리포트)

---

## 3) 변환 규칙 적용

핵심 변환 15종은 [references/transforms.md](references/transforms.md)에 정의. 본문은 정규식 순차 치환 + 콜아웃 블록 멀티라인 파싱으로 처리.

특수 처리 순서:
1. 코드 펜스(``` ```...``` ```) 안 내용은 변환 대상에서 제외 (이스케이프 보존)
2. HTML 주석(`<!-- ... -->`) 보존 — Marp 디렉티브와 동일 syntax
3. 풋노트(`[^1]`, `[^name]: ...`) 보존
4. 콜아웃은 멀티라인 블록 — `> [!TYPE]`부터 다음 비-`>` 라인 직전까지가 한 블록

---

## 4) 이미지 자산 복사

`![[image.png]]` 패턴 처리:
1. vault_root 하위 재귀 glob (`**/<basename>`, 대소문자 무시)
2. 매칭 결과 ≥ 1: source와 경로 거리 최단 선택 → `output/<slug>/assets/<basename>` 복사 (덮어쓰기)
3. 매칭 결과 0: 원본 토큰 보존 + 리포트 경고
4. 복사 성공 시 MD에서 `![](assets/<basename>)`로 치환 (상대 경로)

세부 로직은 [references/vault-resolution.md](references/vault-resolution.md) 참조.

---

## 5) 출력 작성

- `output/<slug>/<slug>.cleaned.md` 작성
- 보존된 frontmatter는 다음만 통과: `title`, `author`, `series`, `date` (옵시디언 전용 키 제외)
- 변환 리포트는 콘솔 출력 + (선택) `output/<slug>/<slug>.cleanup.log` 기록

리포트 예시:
```
✓ obsidian-cleanup — <slug>
  Wikilinks stripped:   12
  Image embeds resolved: 4 / 4
  Callouts converted:    3 (info: 1, warn: 1, example: 1)
  Hashtag blocks stripped: 1
  Dataview blocks stripped: 0
  Footnotes preserved:   2
  Warnings: 0
```

---

## 6) 멱등성 / 캐시

- `output/<slug>/<slug>.cleaned.md` 존재 + source mtime ≤ cleaned mtime → skip + 기존 경로 반환
- `force=true` → 무조건 재생성

---

## 호출 방식

### Skill 도구로 호출 (md-to-marp 오케스트레이터가 사용)

```
Skill(obsidian-cleanup, args: "<source 경로> [slug=<slug>] [vault_root=<path>] [force]")
```

### 사용 예시

```
사용자: "sample/2. 설치 및 기본설정.md 정리해줘"

Claude:
  → Skill(obsidian-cleanup)
  → source 파싱: sample/2. 설치 및 기본설정.md
  → slug: 2-설치-및-기본설정
  → vault_root 자동 탐색: <프로젝트 루트>
  → 변환:
       Wikilinks: 3건 → 평문
       Image embeds: 2건 → assets/ 복사
       Callouts: > [!TIP] 1건 → <div class="callout example">
       Hashtags: #obsidian #ai #excel 라인 1건 제거
       Frontmatter: tags/aliases 제거, title 보존
  → 출력:
       output/2-설치-및-기본설정/2-설치-및-기본설정.cleaned.md
       output/2-설치-및-기본설정/assets/ (2 files)
```

---

## 참고 자료

- 변환 규칙 카탈로그: [references/transforms.md](references/transforms.md)
- 이미지 경로 해석 + 자산 복사: [references/vault-resolution.md](references/vault-resolution.md)
- 다운스트림 사용처: [`../md-to-marp-propca/SKILL.md`](../md-to-marp-propca/SKILL.md), [`../md-to-marp/SKILL.md`](../md-to-marp/SKILL.md)
