# AI 노선도 (ai-tool-map)

분야별 AI 도구를 정리한 교육용 웹앱. Express 백엔드 + 정적 프론트엔드 한 덩어리로, Railway에 그대로 올라갑니다.

기준일 **2026-08-05** · 9개 노선 · 50개 도구

---

## 무엇이 들어 있나

```
ai-tool-map/
├── server.js            Express 서버 (API + 정적 파일)
├── data/catalog.js      모든 데이터. 갱신은 이 파일만 고치면 됩니다
├── public/
│   ├── index.html       화면 뼈대
│   ├── styles.css       스타일
│   └── app.js           API를 호출해 화면을 그림
├── package.json
├── railway.json         Railway 빌드·헬스체크 설정
└── .nvmrc
```

프론트엔드는 하드코딩된 내용이 없습니다. 전부 API에서 받아 그립니다.
`data/catalog.js` 한 파일만 수정하면 화면과 API가 함께 바뀝니다.

---

## 로컬에서 실행

```bash
npm install
npm start          # http://localhost:3000
npm run dev        # 파일 변경 시 자동 재시작
```

---

## API

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/health` | 헬스 체크 (Railway 헬스체크 경로) |
| GET | `/api/meta` | 기준일, 노선 수, 도구 수 |
| GET | `/api/lines` | 노선 목록과 노선별 도구 개수 |
| GET | `/api/tools` | 도구 목록. `?line=` `?q=` `?free=true` `?tag=` |
| GET | `/api/tools/:id` | 도구 하나 |
| GET | `/api/stacks` | 직무별 추천 조합 |
| GET | `/api/guide` | 선택 원칙, 주의사항, 워크숍 진행안 |
| POST | `/api/recommend` | `{ role, needs[], freeOnly }` → 추천 조합 |

예시:

```bash
curl "http://localhost:3000/api/tools?line=code"
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"role":"teacher","freeOnly":true}'
```

---

## Railway에 배포하기

Railway는 GitHub 저장소를 연결하는 방식이 가장 안정적입니다. 5분이면 끝납니다.

### 1. GitHub에 올린다

```bash
cd ai-tool-map
git init
git add .
git commit -m "AI 노선도 초기 버전"
git branch -M main
git remote add origin https://github.com/<계정>/ai-tool-map.git
git push -u origin main
```

### 2. Railway에서 프로젝트를 만든다

1. [railway.com](https://railway.com) 로그인 → **New Project**
2. **Deploy from GitHub repo** 선택
3. 방금 올린 저장소 선택 → Railway가 Node 프로젝트를 자동 인식하고 빌드를 시작합니다

`railway.json`이 이미 들어 있어서 시작 명령(`npm start`)과 헬스체크(`/api/health`)는 따로 설정할 필요가 없습니다.

### 3. 공개 주소를 켠다

서비스 → **Settings** → **Networking** → **Generate Domain**
포트를 물어보면 비워 두거나 `3000`을 넣습니다. 서버가 `process.env.PORT`를 그대로 쓰기 때문에 Railway가 주는 포트를 자동으로 따릅니다.

몇십 초 뒤 `https://<프로젝트이름>.up.railway.app` 으로 열립니다.

### 4. (선택) CLI로 배포하기

GitHub를 거치지 않고 로컬에서 바로 올리려면:

```bash
npm i -g @railway/cli
railway login          # 브라우저가 열리고 본인 계정으로 인증
railway init           # 새 프로젝트 생성
railway up             # 현재 폴더를 배포
railway domain         # 공개 도메인 발급
```

### 환경변수

필수 항목은 없습니다. `PORT`는 Railway가 자동으로 넣어 줍니다.
나중에 DB나 외부 API를 붙이면 Railway → **Variables** 탭에서 추가하세요.

---

## 자주 걸리는 지점

**빌드는 됐는데 502가 뜬다**
서버가 `0.0.0.0`이 아니라 `localhost`에 바인딩된 경우입니다. 이 프로젝트는 `app.listen(PORT, '0.0.0.0')`으로 되어 있어 해당 없습니다.

**포트를 고정했더니 안 열린다**
`PORT`를 코드에 박아 두면 안 됩니다. 반드시 `process.env.PORT || 3000` 형태를 유지하세요.

**Node 버전 문제**
`.nvmrc`와 `package.json`의 `engines`로 Node 20 이상을 요구합니다. 빌드 로그에서 버전이 낮게 잡히면 Railway 서비스 설정에서 Node 버전을 지정하세요.

---

## 내용 갱신

AI 도구 시장은 분기마다 바뀝니다. 갱신할 때는 `data/catalog.js`에서:

- `BASE_DATE` — 기준일
- `tools` — 도구 추가·수정·삭제
- `lines` — 새 분야가 생기면 노선 추가
- `stacks` — 직무별 조합

수정 후 커밋하고 push하면 Railway가 자동으로 재배포합니다.

---

## 면책

공개된 비교 리뷰, 벤치마크 집계, 국내 언론 보도, 정부 발표를 종합해 정리한 교육용 개요입니다.
특정 제품과의 후원 관계가 없으며, 모델명·버전·요금은 사용 전 각 서비스 공식 페이지에서 확인해야 합니다.

MIT License
