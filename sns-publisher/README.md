# sns-publisher

카드뉴스 PNG 캐러셀을 **Threads** 에, PDF Document Share를 **LinkedIn** 에 한 번에 게시하는 CLI.

자기완결형 패키지 — `@marp-team/marp-cli`(PDF 빌드)와 `dotenv` 두 의존성만 필요. 별도 repo로 그대로 떼갈 수 있게 설계됨.

## 디렉토리 구조

```
sns-publisher/
├── package.json           npm scripts: publish:cards
├── publish.cmd            Windows 진입점
├── .env / .env.example    OAuth 토큰
├── README.md              본 문서 (1회성 셋업 가이드)
├── commands/
│   └── caption.md         Claude Code 슬래시 명령 (`/caption <slug>`) — .claude/commands/ 로 심볼릭/복사
└── scripts/
    ├── index.js           오케스트레이션 진입
    ├── caption.js         .caption.md 파서
    ├── pdf.js             Marp --pdf + mtime 캐시
    ├── threads.js         Meta Graph 캐러셀 API
    ├── linkedin.js        Document Share API
    ├── image-host.js      PNG 공개 URL (0x0.st / GitHub)
    └── log.js             publish.log + 24h 중복 가드
```

## 입력 경로 (CARDNEWS_ROOT)

기본값: `sns-publisher/`의 **부모 폴더**. 별도 repo로 분리한 후엔 `.env`에 명시:

```
CARDNEWS_ROOT=/path/to/MD-to-PPT
```

다음 폴더 하위에서 카드뉴스 슬러그를 자동 검색:
- `<CARDNEWS_ROOT>/output/<slug>-cards/*.png`
- `<CARDNEWS_ROOT>/themes/card-news/tech-modern/<slug>/*.png`

---

# 1회성 셋업 가이드

`npm run publish:cards <slug>` 실행 전, 두 플랫폼의 OAuth 토큰을 한 번만 발급해서 `.env`에 저장하면 됩니다.

| 토큰 | 유효 기간 | 갱신 비용 |
|---|---|---|
| Threads access token | 60일 | 1단계만 다시 (10분) |
| LinkedIn access token | 60일 | OAuth 콜백 다시 (5분) |

토큰 만료가 임박하면 (7일 이내) `npm run publish:cards`가 `[warn]`으로 알립니다.

---

## 1. Threads (Meta Graph API)

### 1.1 Meta App 생성
1. https://developers.facebook.com → **My Apps → Create App**
2. App Type: **Other** → Use case: **Other** → App Type: **Business**
3. App name: 자유 (예: `card-news-publisher`)

### 1.2 Threads API 제품 추가
1. 좌측 사이드바 → **Add Product** → **Threads API** → **Set Up**
2. Use Cases 항목에서 **"Access the Threads API"** 활성화
3. **Permissions** 필요 권한 확인:
   - `threads_basic`
   - `threads_content_publish`

### 1.3 Tester 등록 (본인 계정)
1. 좌측 사이드바 → **App Roles → Roles → Add People → Threads Tester**
2. 본인 Threads 사용자명 검색 → 추가
3. Threads 모바일 앱/웹 로그인 → **설정 → 계정 → 웹사이트 권한** → 받은 초대 수락

### 1.4 단기 토큰 발급 (Graph API Explorer)
1. https://developers.facebook.com/tools/explorer
2. 우상단 **Meta App** 드롭다운 → 1.1에서 만든 앱 선택
3. **Threads API** 토큰 타입 선택
4. Permissions: `threads_basic`, `threads_content_publish` 체크
5. **Generate Access Token** 클릭 → 본인 계정으로 인증
6. 출력되는 단기 토큰 복사 (1~2시간 만료)

### 1.5 장기 토큰 변환 (60일짜리)
다음 URL을 브라우저 또는 curl로 호출:
```
https://graph.threads.net/access_token
  ?grant_type=th_exchange_token
  &client_secret=<APP_SECRET>     ← 앱 Settings에서 확인
  &access_token=<단기 토큰>
```
응답:
```json
{ "access_token": "THBA...", "token_type": "bearer", "expires_in": 5183944 }
```
이 `access_token`이 `THREADS_ACCESS_TOKEN` (60일 유효).

### 1.6 사용자 ID 확인
```
curl "https://graph.threads.net/v1.0/me?fields=id,username&access_token=<위 토큰>"
```
응답의 `id` 값이 `THREADS_USER_ID`.

### 1.7 .env 저장
```
THREADS_USER_ID=1234567890123456
THREADS_ACCESS_TOKEN=THBA...
```

---

## 2. LinkedIn (Document Share)

### 2.1 LinkedIn App 생성
1. https://www.linkedin.com/developers/apps → **Create app**
2. **LinkedIn Page** 연동 (개인 페이지여도 됨 — 본인 회사 페이지 권장)
3. App 생성 후 → **Products** 탭

### 2.2 Products 요청
다음 두 제품을 요청 (즉시 승인):
- **Sign In with LinkedIn using OpenID Connect**
- **Share on LinkedIn**

### 2.3 OAuth Redirect URL 등록
1. **Auth** 탭 → **Redirect URLs** 섹션
2. 추가: `http://localhost:8080/callback`
3. Save

`Auth` 탭 상단에 표시되는 **Client ID** / **Client Secret** 메모.

### 2.4 3-legged OAuth (브라우저로 1회)
다음 URL을 브라우저에 붙여넣기 (CLIENT_ID, STATE는 본인 값):
```
https://www.linkedin.com/oauth/v2/authorization
  ?response_type=code
  &client_id=<CLIENT_ID>
  &redirect_uri=http://localhost:8080/callback
  &state=card-news
  &scope=w_member_social%20openid%20profile
```

LinkedIn 로그인 + 권한 허용 → `localhost:8080`으로 리다이렉트 (브라우저는 "연결 실패"라고 표시되지만 정상). URL의 `?code=AQT...` 부분 복사.

### 2.5 Access Token 교환
```
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d grant_type=authorization_code \
  -d code=<위에서 복사한 code> \
  -d redirect_uri=http://localhost:8080/callback \
  -d client_id=<CLIENT_ID> \
  -d client_secret=<CLIENT_SECRET>
```
응답:
```json
{ "access_token": "AQU...", "expires_in": 5184000, "scope": "openid,profile,w_member_social" }
```
이게 `LINKEDIN_ACCESS_TOKEN` (60일).

### 2.6 Author URN 확인
```
curl -H "Authorization: Bearer <위 토큰>" https://api.linkedin.com/v2/userinfo
```
응답의 `sub` 값을 prefix와 합쳐:
```
LINKEDIN_AUTHOR_URN=urn:li:person:<sub>
```

### 2.7 .env 저장
```
LINKEDIN_AUTHOR_URN=urn:li:person:abc123XYZ
LINKEDIN_ACCESS_TOKEN=AQU...
```

---

## 3. 이미지 호스팅 (Threads 캐러셀용)

Threads API는 PNG 공개 URL을 요구합니다. 두 옵션:

### Option A: 0x0.st (기본, 셋업 불필요)
`.env`에서 변경 안 함:
```
IMAGE_HOST_PROVIDER=0x0
```
PNG 7장이 24시간 동안 0x0.st에 임시 호스팅됩니다. 게시 후 24h 안에 자동 만료.

**제한**: 0x0.st는 무료 공공 서비스. 한국 IP에서 가끔 차단되거나 정책이 바뀔 수 있습니다. 실패 시 옵션 B로.

### Option B: GitHub 임시 브랜치
1. GitHub 빈 private repo 생성 (예: `<your>/card-news-host`)
2. https://github.com/settings/tokens → **Generate new token (classic)** → scope: `repo`
3. `.env`:
```
IMAGE_HOST_PROVIDER=github
GITHUB_TOKEN=ghp_xxxxx
GITHUB_HOST_REPO=your-username/card-news-host
GITHUB_HOST_BRANCH=card-news-host
```

PNG가 `images/<timestamp>-<filename>.png`에 push되고 `raw.githubusercontent.com` URL로 Threads에 제출됩니다. (수동 정리 필요 — 1주에 한 번 브랜치 reset)

---

## 4. 첫 실행 + 검증

### Dry-run (실제 게시 안 함)
```cmd
cd sns-publisher
npm run publish:cards <slug> -- --dry-run
```

기대 출력:
```
[OK]   cardDir: output/<slug>-cards
[OK]   PNG: 7 files
[OK]   caption: threads(127/500), linkedin(348/3000)
[OK]   PDF: cache hit (24KB)
[DRY]  threads: would host 7 PNGs via 0x0, then 9 API calls
[DRY]  linkedin: would 1 register + 1 PUT + 1 ugcPosts = 3 API calls
DRY RUN — no posts published.
```

### 플랫폼 분리 첫 게시 (안전 검증)
```cmd
npm run publish:cards <slug> -- --threads-only
```
→ Threads 본인 timeline에 7장 캐러셀이 보이는지 확인 → 즉시 삭제.

```cmd
npm run publish:cards <slug> -- --linkedin-only
```
→ LinkedIn 본인 피드에 PDF 7페이지 게시 → 확인 → 즉시 삭제.

### 동시 게시
```cmd
npm run publish:cards <slug>
```
→ 양쪽 모두 게시. `output/<slug>-cards/publish.log` 에 2건 성공 기록.

### 중복 게시 방지
같은 slug 24h 내 재실행 시 자동 abort. 강제 실행:
```cmd
npm run publish:cards <slug> -- --force
```

---

## 5. 트러블슈팅

| 증상 | 원인 | 대응 |
|---|---|---|
| `THREADS_ENV_MISSING` | `.env` 미생성 또는 키 오타 | `.env` 파일이 `sns-publisher/` 폴더에 있는지, 키 이름이 `.env.example`과 같은지 확인 |
| `0x0.st upload failed: HTTP 4xx` | IP 차단 또는 정책 변경 | `IMAGE_HOST_PROVIDER=github`로 전환 |
| `threads: HTTP 400 (Media not found)` | PNG URL이 Meta에서 fetch 안 됨 | 호스팅된 URL을 브라우저로 직접 열어 확인. 0x0.st는 가끔 propagation 지연 |
| `linkedin: HTTP 401` | 토큰 만료 (60일 경과) | §2.4부터 다시 (브라우저 OAuth만, 5분) |
| `linkedin: HTTP 422 (uploadMechanism)` | LinkedIn API 버전 변경 가능성 | `LinkedIn-Version` 헤더 (linkedin.js)를 최신으로 갱신 |
| `slug not found` | 카드뉴스 미빌드 또는 slug 오타 | 먼저 `/deck`로 카드뉴스 생성, 그 다음 `/caption <slug>` |

---

## 6. 보안 체크리스트

- [ ] `.env`가 `.gitignore`에 포함됨 (이미 셋업됨)
- [ ] 토큰을 GitHub PR/이슈/Slack에 붙여넣지 않음
- [ ] 노출 의심 시: Meta/LinkedIn에서 App secret 재발급 → 토큰 모두 갱신
- [ ] `output/*-cards/publish.log`는 post ID만 기록(토큰 X) — commit해도 안전, 단 `.gitignore`에 이미 포함
