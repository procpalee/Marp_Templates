# Vault 경로 해석 + 이미지 자산 복사

옵시디언 `![[image.png]]` 임베드는 vault 어디에 위치한 이미지든 basename만으로 참조할 수 있다. 변환 시 vault에서 실제 파일을 찾아 `output/<slug>/assets/`로 복사하고 MD에서는 상대 경로로 갱신한다.

---

## Vault 루트 탐색

### 자동 탐색 알고리즘

1. `source` 파일의 디렉토리에서 출발
2. 상위로 1단계씩 올라가며 `.obsidian/` 폴더 존재 확인
3. 발견 시 → 그 위치가 vault_root
4. 파일시스템 루트 도달 → fallback: `source` 부모 디렉토리

```python
# 의사 코드
def find_vault_root(source_path):
    current = Path(source_path).parent
    while current != current.parent:
        if (current / ".obsidian").is_dir():
            return current
        current = current.parent
    # fallback
    return Path(source_path).parent
```

### 명시적 지정

`vault_root` 인자가 주어지면 자동 탐색 skip.

### Vault 루트가 의심스러운 경우

- vault_root가 너무 상위(예: 사용자 홈)면 재귀 glob 비용이 너무 큼 → 경고
- 시간 제한 5초 안에 매치 못하면 abort + 경고

---

## 이미지 매칭 알고리즘

`![[image.png]]` 또는 `![[image.png|400]]` (이미지 크기 옵션) 처리:

1. **basename 추출**: `image.png`
2. **vault 하위 재귀 glob**: `vault_root.rglob(image.png)` (대소문자 무시)
3. **매치 분류**:
   - 0개 매치 → 원본 토큰 보존, 리포트 `warnings`에 추가
   - 1개 매치 → 그대로 사용
   - 2개 이상 → source와의 경로 거리 최단 선택 (디렉토리 노드 수 기준), 동률이면 가장 깊은 매치 우선 (옵시디언 기본 동작과 일치)
4. **복사**: 매칭된 파일을 `output/<slug>/assets/<basename>`로 복사 (덮어쓰기)
5. **치환**: MD에서 `![[image.png|400]]` → `![](assets/image.png)` (옵시디언 크기 옵션은 Marp 호환 안 됨, 무시)

### 충돌 처리

동일 basename을 가진 다른 파일이 vault에 여러 개 있을 경우:
- 옵시디언처럼 source와 가장 가까운 것 선택
- 동일 vault 내에서 다른 위치 파일과 이름이 같을 수 있음 (예: `image1.png` 가 여러 폴더에)
- assets/ 폴더 안에서는 basename 충돌이 없다고 가정 (실제 사례 드묾)
- 충돌 발생 시: 첫 번째 매치 사용 + 리포트 경고

---

## 지원 이미지 형식

| 확장자 | 처리 |
|---|---|
| `.png` / `.jpg` / `.jpeg` / `.gif` / `.webp` / `.svg` | 자산 복사 + `![]()` 치환 |
| `.pdf` / `.mp3` / `.mp4` / `.mov` 등 | "비이미지 임베드"로 분류 → `> 📎 Embedded: ...` 평문 |
| `.md` (note transclusion) | 비이미지 임베드와 동일 처리. Marp 렌더 불가 |

---

## 디렉토리 구조

처리 후:

```
output/
  <slug>/
    <slug>.cleaned.md        ← assets/image.png 참조
    assets/
      image1.png
      diagram.svg
      ...
```

이 구조는 다음 다운스트림이 그대로 사용:
- `md-to-marp-propca` → `<slug>.marp.md`는 같은 디렉토리에 두므로 `assets/...` 상대 경로 유효
- Marp 빌드 시 `--allow-local-files` 플래그로 로컬 이미지 접근 허용
- HTML 결과물 `<slug>.html`도 같은 디렉토리에 두므로 브라우저에서 동작

---

## 다른 디렉토리로 옮길 때

`output/<slug>/` 폴더 전체를 다른 곳으로 옮겨도 이미지 깨지지 않음 (모든 참조가 폴더 내 상대 경로). 자기완결성 보장.

---

## 멱등성 / 캐시

이미지 복사는 source 자체의 mtime 캐시(SKILL.md §6)와는 독립:
- assets/ 안 파일이 이미 존재해도 항상 덮어쓰기 (vault 원본이 갱신됐을 수 있음)
- 단 source mtime ≤ cleaned mtime이면 전체 cleanup을 skip하므로 자산 복사도 skip
- `force=true`면 양쪽 모두 무조건 재실행

---

## 성능 고려

- 대형 vault (수만 파일)에서 `rglob`은 매번 비용이 큼
- 한 번의 cleanup 호출 안에서는 vault 인덱스를 캐시 (dict: basename → 매치 리스트)
- 인덱스는 in-memory만, 디스크 저장 안 함 (vault 변경 가능성)
- 5초 timeout 도달 시 인덱스 미완 → 부분 매치 + 경고

---

## 디버깅 팁

리포트의 `image_embeds` 섹션을 확인:
- `resolved: N` = 성공한 매칭 수
- `missing: M` = vault에서 못 찾은 수 (warnings에 basename 리스트)
- `ambiguous: K` = 다중 매칭 + 자동 선택한 수

매칭 실패가 의심스러우면 vault_root 인자로 명시적 지정 시도.
