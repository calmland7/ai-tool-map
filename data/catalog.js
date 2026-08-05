'use strict';

/**
 * AI 노선도 데이터
 * 기준일: 2026-08-05
 * 모델명·요금·버전은 분기 단위로 바뀝니다. 갱신 시 이 파일만 고치면 됩니다.
 */

const BASE_DATE = '2026-08-05';

const lines = [
  { id: 'chat',      no: '01', name: '대화형 범용 AI',   color: '#1B4FD8', desc: '매일 여는 창. 하나만 유료로 쓴다면 여기서 고릅니다.' },
  { id: 'research',  no: '02', name: '검색 · 리서치',    color: '#0E8F87', desc: '지어내지 않는 것이 최우선. 출처가 붙는지부터 봅니다.' },
  { id: 'code',      no: '03', name: '코드 · 개발',      color: '#2F6B33', desc: '자동완성에서 위임형 에이전트로 넘어간 분야.' },
  { id: 'image',     no: '04', name: '이미지',           color: '#E8622A', desc: '가장 빨리 바뀌는 노선. 버전 숫자에 집착하지 마세요.' },
  { id: 'video',     no: '05', name: '영상',             color: '#D4451F', desc: '용도별로 갈립니다. 사실감이냐, 제어냐, 물량이냐.' },
  { id: 'audio',     no: '06', name: '목소리 · 음악',    color: '#8B2F6B', desc: '한 도구가 다 하지 않습니다. 목적별로 나뉩니다.' },
  { id: 'docs',      no: '07', name: '문서 · 발표',      color: '#B8860B', desc: '백지에서 시작하는가, 있는 자료를 옮기는가.' },
  { id: 'agent',     no: '08', name: '자동화 · 에이전트', color: '#5B3FBF', desc: '답을 받는 게 아니라 일이 끝나 있는 방식.' },
  { id: 'korea',     no: '09', name: '국내 AI',          color: '#C0392B', desc: '소비자 시장보다 기업·공공 도입에서 겨루는 구도.' }
];

const tools = [
  // ── 01 대화형 범용 ────────────────────────────────
  {
    id: 'chatgpt', line: 'chat', name: 'ChatGPT', vendor: 'OpenAI',
    tagline: '가장 넓은 기능 폭과 생태계',
    why: '2026년 7월 GPT-5.6 계열(플래그십·균형·보급형 3단계)로 세대가 올라갔습니다. 음성 대화, 이미지 생성, 파일 분석, 외부 앱 연동이 한 서비스에 모여 있어 처음 쓰는 사람에게 진입 장벽이 가장 낮습니다.',
    bestFor: ['처음 쓰는 사람', '한 곳에서 다 해결', '외부 앱 연동'],
    caveat: '긴 글의 문체가 평이해지는 경향. 기능이 많아 초심자에게는 오히려 산만할 수 있습니다.',
    free: true, price: '무료 / 유료 구독 다단계', tags: ['범용', '음성', '이미지', '초보자']
  },
  {
    id: 'claude', line: 'chat', name: 'Claude', vendor: 'Anthropic',
    tagline: '긴 글과 추론, 그리고 에이전트',
    why: '2026년 6~7월 Sonnet 5와 Opus 5가 연달아 공개됐습니다. 전문가 평가와 긴 문서 추론, 코딩·에이전트 작업에서 강하고 터미널 도구(Claude Code)와 업무 도구(Cowork)로 확장됩니다.',
    bestFor: ['보고서·기고문', '계약서·논문 분석', '개발과 자동화'],
    caveat: '이미지 생성 기능이 없고 대중적 부가기능은 상대적으로 적습니다.',
    free: true, price: '무료 / 유료 구독', tags: ['글쓰기', '추론', '코딩', '긴문서']
  },
  {
    id: 'gemini', line: 'chat', name: 'Gemini', vendor: 'Google',
    tagline: '100만 토큰과 진짜 멀티모달',
    why: '텍스트·이미지·오디오·영상을 한 모델에서 처리하고 컨텍스트가 100만 토큰입니다. Gmail·문서·드라이브 안에 이미 들어와 있고 가격이 공격적입니다.',
    bestFor: ['구글 워크스페이스 사용자', '자료가 아주 많을 때', '영상·음성 파일 입력'],
    caveat: '세밀한 지시 이행은 경쟁 모델보다 덜 정확하다는 평가가 있습니다.',
    free: true, price: '무료 등급 넓음', tags: ['멀티모달', '긴컨텍스트', '가성비', '구글']
  },
  {
    id: 'copilot', line: 'chat', name: 'Microsoft Copilot', vendor: 'Microsoft',
    tagline: '결재 라인에 있는 문서에 붙는다',
    why: '워드·엑셀·팀즈 안에서 바로 동작합니다. 모델 자체 성능보다 이미 회사가 쓰는 파일에 직접 붙는다는 점이 값어치입니다.',
    bestFor: ['Microsoft 365 조직', '보안상 외부 반입이 어려운 곳'],
    caveat: '단독 성능만 놓고 보면 상위 3사보다 인상적이지 않습니다.',
    free: false, price: 'M365 구독 연계', tags: ['오피스', '기업', '보안']
  },
  {
    id: 'perplexity', line: 'chat', name: 'Perplexity', vendor: 'Perplexity',
    tagline: '모든 답에 링크가 붙는 검색',
    why: '일반 대화형이 아니라 출처를 붙여 주는 검색 엔진입니다. 사실 확인 비용이 가장 낮습니다.',
    bestFor: ['최근 사건·통계', '인용이 필요한 보고서'],
    caveat: '창작이나 긴 글쓰기는 약합니다.',
    free: true, price: '무료 / 유료', tags: ['검색', '출처', '리서치']
  },
  {
    id: 'openweight', line: 'chat', name: 'DeepSeek · Qwen · Llama', vendor: '오픈웨이트 계열',
    tagline: '내 서버에 올려 쓰는 선택지',
    why: '가중치가 공개돼 사내 인프라에 올릴 수 있습니다. 성능 대비 비용이 낮아 대량 처리와 민감 데이터 처리에 씁니다.',
    bestFor: ['데이터 반출 금지 조직', '호출량이 매우 많은 서비스'],
    caveat: '설치·운영 인력이 필요하고 최상위 품질은 아닙니다.',
    free: true, price: '모델 무료 / 인프라 비용', tags: ['오픈소스', '온프레미스', '비용절감']
  },

  // ── 02 리서치 ────────────────────────────────────
  {
    id: 'notebooklm', line: 'research', name: 'NotebookLM', vendor: 'Google',
    tagline: '내가 올린 자료 안에서만 답한다',
    why: '논문·판례·강의자료를 넣으면 요약, 마인드맵, 두 사람이 대화하는 오디오 개요, 슬라이드 초안까지 만듭니다. 근거가 문서에 묶여 있어 환각 위험이 낮습니다.',
    bestFor: ['학생·연구자', '교육 담당자', '자료가 이미 있는 모든 사람'],
    caveat: '문서 밖 지식은 다루지 않습니다. 그게 장점이자 한계입니다.',
    free: true, price: '무료', tags: ['무료', '출처기반', '학습', '요약']
  },
  {
    id: 'elicit', line: 'research', name: 'Elicit · Consensus', vendor: '학술 특화',
    tagline: '논문 데이터베이스를 상대로 검색',
    why: '일반 웹이 아니라 학술 문헌을 대상으로 검색하고 연구 결과를 표로 정리합니다. 결과의 성격이 웹 검색과 완전히 다릅니다.',
    bestFor: ['대학원생', '문헌 리뷰', '임상·정책 연구'],
    caveat: '한국어 논문 커버리지는 제한적입니다.',
    free: true, price: '무료 등급 있음', tags: ['논문', '학술', '리뷰']
  },
  {
    id: 'deepresearch', line: 'research', name: '딥리서치 기능', vendor: 'ChatGPT · Claude · Gemini 내장',
    tagline: '5~15분간 스스로 찾아 읽고 보고서를 쓴다',
    why: '수십 개 문서를 자동으로 수집·독해해 보고서를 냅니다. 별도 서비스가 아니라 이미 쓰는 구독에 포함된 경우가 많습니다.',
    bestFor: ['시장 조사', '경쟁사 분석', '정책 동향 정리'],
    caveat: '길이에 속지 말 것. 인용 링크를 표본으로 열어 확인하는 습관이 필요합니다.',
    free: false, price: '유료 구독 포함', tags: ['자동조사', '보고서']
  },

  // ── 03 코드 ──────────────────────────────────────
  {
    id: 'github-copilot', line: 'code', name: 'GitHub Copilot', vendor: 'GitHub · Microsoft',
    tagline: '가장 무난한 첫 도구',
    why: 'VS Code·JetBrains 등 지원 편집기가 가장 넓고 인라인 자동완성이 안정적입니다. 기업용 라이선스와 IP 보호 조항이 갖춰져 있습니다.',
    bestFor: ['첫 AI 코딩 도구', '회사 보안 심사 통과가 필요할 때'],
    caveat: '자율 작업 능력은 전용 에이전트보다 얕습니다.',
    free: true, price: '무료 등급 / 저가 구독', tags: ['자동완성', '기업', '호환성']
  },
  {
    id: 'cursor', line: 'code', name: 'Cursor', vendor: 'Anysphere',
    tagline: 'AI를 전제로 다시 만든 편집기',
    why: '확장이 아니라 편집기 자체입니다. 여러 파일을 동시에 고치는 에이전트 모드와 매끄러운 일상 코딩 경험으로 개발자 선호가 높습니다.',
    bestFor: ['매일 코드를 쓰는 사람의 주력 편집기'],
    caveat: '편집기를 갈아타야 하므로 기존 설정 이전 부담이 있습니다.',
    free: true, price: '무료 / 구독', tags: ['IDE', '에이전트', '멀티파일']
  },
  {
    id: 'claude-code', line: 'code', name: 'Claude Code', vendor: 'Anthropic',
    tagline: '터미널에서 일을 맡아 끝내는 쪽',
    why: '코드베이스 전체를 읽고 여러 파일을 수정하고 테스트를 돌리고 PR까지 만듭니다. 복잡한 디버깅과 구조 설계에서 강합니다.',
    bestFor: ['큰 리팩터링', '레거시 파악', '반복 작업 위임'],
    caveat: '터미널 환경에 익숙해야 하고 토큰 비용 관리가 필요합니다.',
    free: false, price: '구독 또는 API 종량', tags: ['에이전트', '터미널', '리팩터링']
  },
  {
    id: 'windsurf', line: 'code', name: 'Windsurf', vendor: 'Windsurf',
    tagline: '부담 없이 에이전트를 시험하는 자리',
    why: '에이전트 기능을 낮은 진입 비용으로 써 볼 수 있는 요금 구조입니다.',
    bestFor: ['팀 도입 전 시범 사용'],
    caveat: '생태계 규모는 위 세 곳보다 작습니다.',
    free: true, price: '무료 등급 있음', tags: ['IDE', '에이전트']
  },
  {
    id: 'replit', line: 'code', name: 'Replit', vendor: 'Replit',
    tagline: '설명만으로 앱을 만들고 배포까지',
    why: '브라우저 안에서 개발 환경·실행·배포가 모두 끝납니다. 비개발자의 시제품 제작에 적합합니다.',
    bestFor: ['비개발자 시제품', '교육용 실습'],
    caveat: '규모가 커지면 자체 인프라로 옮겨야 합니다.',
    free: true, price: '무료 / 구독', tags: ['노코드', '교육', '배포']
  },
  {
    id: 'aider', line: 'code', name: 'Aider', vendor: '오픈소스',
    tagline: '무료, git 친화적, 모델 자유 선택',
    why: '터미널에서 돌아가는 오픈소스 페어 프로그래머입니다. 원하는 모델을 붙여 씁니다.',
    bestFor: ['비용을 통제하려는 개인 개발자'],
    caveat: 'UI가 없고 설정을 직접 해야 합니다.',
    free: true, price: '무료 (모델 비용 별도)', tags: ['오픈소스', '무료', 'CLI']
  },

  // ── 04 이미지 ────────────────────────────────────
  {
    id: 'gpt-image', line: 'image', name: 'GPT Image 계열', vendor: 'OpenAI',
    tagline: '지시를 그대로 따르고 글자를 제대로 쓴다',
    why: '프롬프트 이행 정확도와 이미지 안 텍스트 렌더링이 강점입니다. 대화하듯 고쳐 나가는 방식이라 초보자 진입이 가장 쉽습니다.',
    bestFor: ['마케팅 이미지', '안내물', '텍스트가 들어가는 그래픽'],
    caveat: '예술적 개성은 Midjourney보다 약합니다.',
    free: false, price: '구독 포함 / API', tags: ['텍스트렌더링', '초보자', '광고']
  },
  {
    id: 'nano-banana', line: 'image', name: 'Nano Banana 계열', vendor: 'Google',
    tagline: '"이 부분만" 이 진짜로 그 부분만 바뀐다',
    why: '사진 편집과 인물 일관성 유지에 강합니다. 대화형 편집이 잘 되고 Gemini 앱에서 무료로 시험해 볼 수 있습니다.',
    bestFor: ['기존 사진 수정', '배경 교체', '같은 인물 반복 등장'],
    caveat: '제품군 이름이 복잡해 어느 등급을 쓰는지 확인이 필요합니다.',
    free: true, price: '무료 등급 있음', tags: ['사진편집', '무료', '일관성']
  },
  {
    id: 'midjourney', line: 'image', name: 'Midjourney', vendor: 'Midjourney',
    tagline: '결과물의 "멋"에서는 여전히 기준점',
    why: '최소한의 프롬프트로도 완성도 높은 미감이 나옵니다. 웹 인터페이스가 정리되면서 접근성도 좋아졌습니다.',
    bestFor: ['콘셉트 아트', '무드보드', '표지·포스터'],
    caveat: '세밀한 편집 제어가 약하고 무료 등급이 없습니다.',
    free: false, price: '월 구독', tags: ['아트', '심미성', '콘셉트']
  },
  {
    id: 'firefly', line: 'image', name: 'Adobe Firefly', vendor: 'Adobe',
    tagline: '학습 데이터 출처를 밝힌 몇 안 되는 선택',
    why: '라이선스를 확보한 데이터로만 학습했다고 공개한 서비스입니다. 상업적 분쟁 위험을 줄이려는 조직이 씁니다.',
    bestFor: ['기업 광고물', '공공기관 홍보물'],
    caveat: '이미지 품질의 최상단은 아닙니다.',
    free: true, price: '무료 등급 / Adobe 구독', tags: ['저작권안전', '기업', '상업이용']
  },
  {
    id: 'ideogram', line: 'image', name: 'Ideogram · Recraft', vendor: '전문 특화',
    tagline: '글자와 벡터라는 좁고 확실한 자리',
    why: 'Ideogram은 이미지 안 타이포그래피, Recraft는 벡터·브랜드 자산 생성에서 강합니다.',
    bestFor: ['로고 시안', '아이콘', '포스터 카피'],
    caveat: '범용 이미지 생성기로 쓰기에는 폭이 좁습니다.',
    free: true, price: '무료 등급 있음', tags: ['타이포', '벡터', '디자인']
  },
  {
    id: 'flux', line: 'image', name: 'FLUX · Qwen-Image', vendor: '오픈웨이트',
    tagline: '내 파이프라인에 넣는 이미지 모델',
    why: '가중치가 공개돼 자체 서버에서 대량 생성하거나 사내 데이터로 미세조정할 수 있습니다.',
    bestFor: ['자체 파이프라인 구축', '프라이버시 요구가 큰 작업'],
    caveat: 'GPU와 운영 인력이 필요합니다.',
    free: true, price: '모델 무료', tags: ['오픈소스', '대량생성', '커스텀']
  },

  // ── 05 영상 ──────────────────────────────────────
  {
    id: 'veo', line: 'video', name: 'Google Veo', vendor: 'Google',
    tagline: '사실적인 장면과 소리를 함께',
    why: '현실감 있는 영상과 네이티브 오디오, 이미지에서 영상으로 잇는 작업이 안정적입니다. 클라우드 인프라와 붙습니다.',
    bestFor: ['광고 콘셉트 영상', '제품 무드컷', '기업 파이프라인'],
    caveat: '주관적인 "영화적 질감"은 취향을 탑니다.',
    free: false, price: '초당 과금 / 구독', tags: ['사실감', '오디오', '광고']
  },
  {
    id: 'runway', line: 'video', name: 'Runway', vendor: 'Runway',
    tagline: '모델이 아니라 작업 환경',
    why: '키프레임, 모션 브러시, 카메라 제어, 영상-투-영상 등 편집 도구를 갖췄습니다. 캐릭터 일관성과 물리적 상호작용 표현이 강점으로 꼽힙니다.',
    bestFor: ['광고 대행 작업', 'VFX 시안', '통제가 필요한 클라이언트 작업'],
    caveat: '크레딧 소진이 빨라 실비용 계산이 필요합니다.',
    free: true, price: '무료 체험 / 구독', tags: ['제어', '편집', '전문가']
  },
  {
    id: 'kling', line: 'video', name: 'Kling · Seedance · PixVerse', vendor: '고속·물량 계열',
    tagline: '여러 안을 뽑아 고르는 방식',
    why: '움직임이 큰 장면과 빠른 반복 생성에 강하고 단가가 낮은 편입니다. 다중 샷 생성과 네이티브 오디오를 지원하는 제품도 있습니다.',
    bestFor: ['숏폼', '소셜 콘텐츠', '다량 시안'],
    caveat: '세밀한 연출 제어는 Runway보다 약합니다.',
    free: true, price: '무료 크레딧 / 구독', tags: ['숏폼', '가성비', '물량']
  },
  {
    id: 'heygen', line: 'video', name: 'HeyGen · Synthesia', vendor: '아바타 영상',
    tagline: '대본을 넣으면 사람이 말한다',
    why: '진행자 아바타, 다국어 더빙, 립싱크가 핵심입니다. 사내 교육 영상과 제품 안내 제작에 실제로 많이 쓰입니다.',
    bestFor: ['이러닝', '사내 공지', '제품 사용 안내'],
    caveat: '실존 인물의 얼굴·음성 사용은 반드시 동의가 필요합니다.',
    free: true, price: '무료 체험 / 구독', tags: ['교육', '아바타', '다국어']
  },
  {
    id: 'sora-note', line: 'video', name: 'Sora (확인 필요)', vendor: 'OpenAI',
    tagline: '파이프라인의 기반으로 삼기 전 공지 확인',
    why: '2026년 상반기 Sora 앱 서비스 종료와 API 종료 일정이 여러 매체를 통해 보도됐습니다. 서비스 상태가 유동적입니다.',
    bestFor: ['현재로서는 신규 설계 권장 대상 아님'],
    caveat: 'Sora 기반으로 제작 파이프라인을 짜고 있다면 공식 공지를 직접 확인하고 대체안을 병행 검토하세요.',
    free: false, price: '변동', tags: ['주의', '확인필요']
  },

  // ── 06 소리 ──────────────────────────────────────
  {
    id: 'elevenlabs', line: 'audio', name: 'ElevenLabs', vendor: 'ElevenLabs',
    tagline: '음성 현실감의 기준점',
    why: '목소리 품질과 복제 정확도에서 앞서 있습니다. 오디오북, 내레이션, 다국어 더빙에 널리 쓰입니다.',
    bestFor: ['내레이션', '오디오북', '다국어 더빙'],
    caveat: '목소리 복제는 반드시 본인 동의가 전제되어야 합니다.',
    free: true, price: '무료 등급 / 구독', tags: ['음성', '복제', '더빙']
  },
  {
    id: 'murf', line: 'audio', name: 'Murf · WellSaid · Play.ht', vendor: '기업용 TTS',
    tagline: '교육 콘텐츠에 맞춘 편집 환경',
    why: '기업 내레이션과 다국어 제작을 전제로 한 워크플로를 제공합니다.',
    bestFor: ['사내 교육', '설명 영상', '다국어 버전'],
    caveat: '표현력은 ElevenLabs 대비 밋밋한 편입니다.',
    free: true, price: '무료 체험 / 구독', tags: ['기업', '교육', 'TTS']
  },
  {
    id: 'suno', line: 'audio', name: 'Suno', vendor: 'Suno',
    tagline: '가사·보컬·편곡이 붙은 완성곡',
    why: '보컬 표현력이 크게 올라와 영상 배경음악의 저작권 문제를 회피하는 용도로 많이 쓰입니다.',
    bestFor: ['영상 배경음악', '팟캐스트 인트로', '행사용 곡'],
    caveat: '상업적 이용 조건은 요금제마다 다릅니다. 계약 전 약관을 확인하세요.',
    free: true, price: '무료 등급 / 구독', tags: ['음악', '보컬', '배경음악']
  },
  {
    id: 'udio', line: 'audio', name: 'Udio · Lyria · Mubert', vendor: '연주·앰비언트',
    tagline: '보컬 없는 배경 음악',
    why: '분위기와 템포로 골라 쓰는 라이브러리형에 가깝습니다. 실시간 스트리밍 생성을 지원하는 제품도 있습니다.',
    bestFor: ['브이로그 BGM', '전시·매장 음악', '게임 앰비언트'],
    caveat: '곡 구조의 완결성은 Suno보다 약합니다.',
    free: true, price: '무료 등급 있음', tags: ['BGM', '연주', '라이선스']
  },
  {
    id: 'descript', line: 'audio', name: 'Descript', vendor: 'Descript',
    tagline: '대본을 고치면 음성이 따라 잘린다',
    why: '오디오·영상을 텍스트 편집하듯 다룹니다. 팟캐스트 편집 방식 자체를 바꾼 도구입니다.',
    bestFor: ['팟캐스트', '유튜브 편집', '인터뷰 정리'],
    caveat: '한국어 전사 정확도는 영어 대비 낮을 수 있습니다.',
    free: true, price: '무료 등급 / 구독', tags: ['편집', '팟캐스트', '전사']
  },
  {
    id: 'otter', line: 'audio', name: 'Otter · Fireflies · Granola', vendor: '회의록',
    tagline: '실시간 전사와 자동 요약',
    why: '회의 내용을 텍스트로 남기고 액션 아이템을 정리합니다. 민감도에 따라 도구를 나눠 쓰는 것이 좋습니다.',
    bestFor: ['정기 회의', '영업 통화', '인터뷰'],
    caveat: '녹음 사실을 참석자에게 고지하는 것이 원칙입니다.',
    free: true, price: '무료 등급 / 구독', tags: ['회의록', '전사', '요약']
  },
  {
    id: 'krisp', line: 'audio', name: 'Krisp · Adobe Podcast', vendor: '음질 개선',
    tagline: '이미 녹음된 파일 살리기',
    why: '통화 중 소음 차단과 녹음 파일의 잡음 제거를 담당합니다. 무료로 쓸 수 있는 범위가 넓습니다.',
    bestFor: ['재택 회의', '현장 녹음 복구'],
    caveat: '과하게 적용하면 목소리가 인공적으로 들립니다.',
    free: true, price: '무료 등급 있음', tags: ['잡음제거', '무료', '음질']
  },

  // ── 07 문서·발표 ─────────────────────────────────
  {
    id: 'gamma', line: 'docs', name: 'Gamma', vendor: 'Gamma',
    tagline: '주제만 주면 1분 안에 덱이 나온다',
    why: '프롬프트에서 디자인이 끝난 슬라이드까지 가장 빠릅니다. 웹 공유 형태가 기본이라 발표에 바로 씁니다.',
    bestFor: ['백지에서 시작하는 발표', '빠른 시안'],
    caveat: 'PPTX로 내보내면 레이아웃이 틀어지는 경우가 있습니다.',
    free: true, price: '무료 크레딧 / 구독', tags: ['발표', '속도', '디자인']
  },
  {
    id: 'notebooklm-slides', line: 'docs', name: 'NotebookLM 슬라이드', vendor: 'Google',
    tagline: '내 자료에 근거해서만 만든다',
    why: '올린 문서를 기반으로 슬라이드를 구성하므로 내용이 지어내질 위험이 낮습니다. 무료라는 점이 결정적입니다.',
    bestFor: ['보고 자료', '수업 자료', '정확도가 중요한 발표'],
    caveat: '디자인 다양성은 전용 도구보다 부족합니다.',
    free: true, price: '무료', tags: ['무료', '정확도', '출처기반']
  },
  {
    id: 'copilot-ppt', line: 'docs', name: 'Copilot + PowerPoint', vendor: 'Microsoft',
    tagline: '최종 산출물이 PPT여야 할 때',
    why: '네이티브 PPT라 변환 사고가 없습니다. 사내 템플릿을 그대로 써야 하는 경우 사실상 유일한 답인 경우가 많습니다.',
    bestFor: ['사내 보고', '고정 템플릿 사용 조직'],
    caveat: 'M365 구독이 전제입니다.',
    free: false, price: 'M365 연계', tags: ['PPT', '기업', '템플릿']
  },
  {
    id: 'canva', line: 'docs', name: 'Canva AI', vendor: 'Canva',
    tagline: '이미 쓰고 있다면 옮길 이유가 적다',
    why: '템플릿 생태계가 가장 넓고 카드뉴스·포스터·영상까지 한 곳에서 처리됩니다.',
    bestFor: ['SNS 콘텐츠', '소상공인 홍보물', '학교 게시물'],
    caveat: 'AI 생성 결과는 개요 수준이고 다듬기는 사람 몫입니다.',
    free: true, price: '무료 등급 넓음', tags: ['템플릿', '무료', '디자인']
  },
  {
    id: 'notion-ai', line: 'docs', name: 'Notion AI', vendor: 'Notion',
    tagline: '업무 위키 안에서 이어지는 작업',
    why: '회의록·기획서가 이미 Notion에 있다면 그 안에서 검색·요약·초안 작성이 끊기지 않고 이어집니다.',
    bestFor: ['Notion을 쓰는 팀'],
    caveat: 'Notion을 안 쓰면 도입할 이유가 없습니다.',
    free: false, price: 'Notion 구독 연계', tags: ['위키', '협업', '요약']
  },
  {
    id: 'grammarly', line: 'docs', name: 'Grammarly · QuillBot', vendor: '문장 교정',
    tagline: '문법 교정과 문장 다듬기 전용',
    why: '영어 문서 작성 비중이 높은 사람에게 여전히 유효합니다. 브라우저와 오피스에 붙습니다.',
    bestFor: ['영문 메일', '논문 초고 교정'],
    caveat: '한국어 지원 범위를 먼저 확인해야 합니다.',
    free: true, price: '무료 등급 있음', tags: ['교정', '영어', '글쓰기']
  },

  // ── 08 자동화 ────────────────────────────────────
  {
    id: 'zapier', line: 'agent', name: 'Zapier', vendor: 'Zapier',
    tagline: '연결 앱 수가 압도적',
    why: '수천 개 앱을 잇고 자연어로 에이전트를 만드는 기능이 더해졌습니다. 희귀한 SaaS까지 대체로 지원됩니다.',
    bestFor: ['비개발자 팀의 첫 자동화', '연결 대상이 다양할 때'],
    caveat: '작업 건수가 늘면 비용이 빠르게 오릅니다.',
    free: true, price: '무료 등급 / 구독', tags: ['노코드', '연동', '입문']
  },
  {
    id: 'make', line: 'agent', name: 'Make', vendor: 'Make',
    tagline: '시각적 시나리오와 낮은 시작 요금',
    why: '작업 흐름을 그림으로 짜고, 같은 예산에서 처리 건수가 많은 편입니다.',
    bestFor: ['건수가 많은데 예산이 빠듯할 때'],
    caveat: '복잡한 시나리오는 화면이 금세 지저분해집니다.',
    free: true, price: '무료 등급 / 저가 구독', tags: ['노코드', '가성비', '시각화']
  },
  {
    id: 'n8n', line: 'agent', name: 'n8n', vendor: 'n8n',
    tagline: '오픈소스이고 내 서버에 올린다',
    why: 'AI 노드, 메모리, 벡터 DB 연동, 사람 승인 단계까지 구성할 수 있습니다. 자체 호스팅이 가능해 데이터 주권이 필요한 조직에 맞습니다.',
    bestFor: ['데이터 반출 금지 조직', '기술 인력이 있는 팀'],
    caveat: '초기 구축과 운영 부담이 있습니다.',
    free: true, price: '자체 호스팅 무료 / 클라우드 유료', tags: ['오픈소스', '자체호스팅', '고급']
  },
  {
    id: 'manus', line: 'agent', name: 'Manus', vendor: 'Manus',
    tagline: '과제를 통째로 맡기는 방식',
    why: '브라우저를 직접 조작하며 다단계 작업을 끝까지 수행합니다. "조사해서 자료까지 만들어 줘" 형태의 위임에 맞습니다.',
    bestFor: ['리서치 + 산출물 제작 위임'],
    caveat: '중간 판단 오류를 사람이 못 잡으면 그대로 결과에 남습니다.',
    free: true, price: '무료 크레딧 / 구독', tags: ['위임형', '브라우저', '에이전트']
  },
  {
    id: 'cowork', line: 'agent', name: 'Claude Cowork · Claude Code', vendor: 'Anthropic',
    tagline: '파일과 도구를 직접 다루며 수행',
    why: '문서 더미 정리, 반복 분석, 개발 업무를 실제 파일 위에서 처리합니다.',
    bestFor: ['문서 정리', '반복 분석', '개발 업무'],
    caveat: '되돌릴 수 없는 작업 전에는 확인 단계를 두어야 합니다.',
    free: false, price: '구독', tags: ['에이전트', '문서', '개발']
  },
  {
    id: 'copilot-studio', line: 'agent', name: 'Copilot Studio · Agentforce', vendor: '기업 플랫폼',
    tagline: '이미 결제 중일 가능성이 높다',
    why: '기업이 쓰는 소프트웨어 안에 사내 에이전트를 만드는 기능이 포함돼 있는 경우가 많습니다.',
    bestFor: ['사내 시스템 연동 자동화'],
    caveat: '도입 전 기존 계약에 이미 포함돼 있는지부터 확인하세요.',
    free: false, price: '기업 계약', tags: ['기업', '내장', 'CRM']
  },

  // ── 09 국내 ──────────────────────────────────────
  {
    id: 'exaone', line: 'korea', name: 'K-엑사원', vendor: 'LG AI연구원',
    tagline: '국내 최대 규모 공개 모델',
    why: '정부 독자 AI 파운데이션 모델 사업 1차 평가 1위. 2026년 7월 말 K-엑사원 2.0을 750B 규모 오픈웨이트로 공개하고 상업적 이용이 가능한 라이선스로 전환했습니다.',
    bestFor: ['기업이 직접 받아 쓰는 국산 모델', '소버린 AI 요구'],
    caveat: '대규모 모델이라 구동 인프라 부담이 큽니다.',
    free: true, price: '오픈웨이트', tags: ['국산', '오픈웨이트', '대형']
  },
  {
    id: 'solar', line: 'korea', name: '솔라', vendor: '업스테이지',
    tagline: '작은 모델로 실용 성능을 내는 노선',
    why: '독자 AI 파운데이션 모델 사업 2차 단계 진출. 모델 크기 대비 성능 효율이 강점으로 평가됩니다.',
    bestFor: ['온프레미스 도입 후보', '비용 민감한 사내 서비스'],
    caveat: '최상위 프런티어 모델과 직접 비교하기는 어렵습니다.',
    free: true, price: '오픈웨이트 / API', tags: ['국산', '효율', '기업']
  },
  {
    id: 'adot', line: 'korea', name: '에이닷 · A.X', vendor: 'SK텔레콤',
    tagline: '모델과 대중 서비스를 함께 가진 사례',
    why: '500B급 A.X K1을 공개했고, 서비스 에이닷은 월 사용자 1,000만을 넘겼습니다. 통화·기록·일정 등 생활 밀착 기능이 축입니다.',
    bestFor: ['일상 비서 기능', '통화 관련 활용'],
    caveat: '범용 생성 성능은 글로벌 상위 모델과 격차가 있습니다.',
    free: true, price: '무료 앱', tags: ['국산', '앱', '생활']
  },
  {
    id: 'hyperclova', line: 'korea', name: '하이퍼클로바X', vendor: '네이버클라우드',
    tagline: '성능과 별개로 정책 기준이 작동한 사례',
    why: '한국어 벤치마크에서 강세를 보였으나 독자성 기준 미충족으로 국가 사업 2차 진출에서 제외됐고, 대화 서비스 CLOVA X는 2026년 4월 종료됐습니다.',
    bestFor: ['한국어 처리가 필요한 기업 API 검토'],
    caveat: '소비자용 대화 서비스는 더 이상 제공되지 않습니다.',
    free: false, price: '기업 API', tags: ['국산', '한국어', '기업']
  },
  {
    id: 'wrtn', line: 'korea', name: '뤼튼', vendor: '뤼튼테크놀로지스',
    tagline: '한국어 접근성과 보급 중심',
    why: '국내 이용자 대상 생성 AI 서비스로, 소상공인 AI 교육 사업 등 보급 영역으로 확장하고 있습니다.',
    bestFor: ['한국어 홍보 문구', '교육 실습 도구', '소상공인'],
    caveat: '자체 모델 성능보다 사용성과 접근성이 강점입니다.',
    free: true, price: '무료 등급 있음', tags: ['국산', '무료', '교육']
  }
];

const stacks = [
  {
    id: 'student', role: '학생 · 대학원생', who: '과제, 논문, 발표가 반복되는 사람',
    picks: [
      { tool: 'notebooklm', note: '강의자료·논문을 넣고 요약·질문·오디오 복습' },
      { tool: 'perplexity', note: '출처가 필요한 사실 확인' },
      { tool: 'claude',     note: '초안 잡기와 논리 점검' },
      { tool: 'gamma',      note: '발표 자료 마감 전날의 보험' }
    ]
  },
  {
    id: 'marketer', role: '마케터 · 콘텐츠', who: '기획부터 소재 제작까지 혼자 하는 사람',
    picks: [
      { tool: 'chatgpt',      note: '카피, 기획, 아이디어 확장' },
      { tool: 'nano-banana',  note: '소재 이미지 생성과 수정' },
      { tool: 'kling',        note: '숏폼 영상 시안' },
      { tool: 'zapier',       note: '소재 배포와 리포트 자동화' }
    ]
  },
  {
    id: 'developer', role: '개발자', who: '코드가 업무의 절반 이상인 사람',
    picks: [
      { tool: 'cursor',      note: '편집기 안의 일상 작업' },
      { tool: 'claude-code', note: '큰 수정과 자율 작업 위임' },
      { tool: 'perplexity',  note: '라이브러리·에러 최신 정보' }
    ]
  },
  {
    id: 'teacher', role: '교사 · 강사', who: '자료를 만들고 설명해야 하는 사람',
    picks: [
      { tool: 'notebooklm', note: '교재를 퀴즈·요약·오디오로 변환' },
      { tool: 'canva',      note: '수업 슬라이드와 게시물' },
      { tool: 'heygen',     note: '다국어 안내 영상, 반복 강의 대체' },
      { tool: 'elevenlabs', note: '듣기 자료와 내레이션' }
    ]
  },
  {
    id: 'smallbiz', role: '소상공인 · 1인 사업자', who: '돈과 시간이 가장 부족한 사람',
    picks: [
      { tool: 'gemini',       note: '무료 등급으로 2주 먼저 써 보기' },
      { tool: 'canva',        note: '메뉴판, 배너, SNS 카드' },
      { tool: 'nano-banana',  note: '상품 사진 보정과 배경 교체' },
      { tool: 'wrtn',         note: '한국어 홍보 문구, 정부 지원 교육 활용' }
    ]
  },
  {
    id: 'enterprise', role: '기업 도입 담당자', who: '조직 전체에 깔아야 하는 사람',
    picks: [
      { tool: 'copilot',       note: '이미 쓰는 구독에 포함돼 있는지부터 확인' },
      { tool: 'openweight',    note: '데이터 반출 금지라면 자체 구축 검토' },
      { tool: 'n8n',           note: '자체 호스팅 자동화 기반' },
      { tool: 'copilot-studio',note: '기존 기업 계약에 포함 여부 확인' }
    ]
  }
];

const principles = [
  { no: '01', title: '순위표는 답이 아니다', body: '상위 모델들은 주요 벤치마크에서 1~2%포인트 차이로 붙어 있습니다. 점수보다 가격, 응답 속도, 내가 쓰는 업무 도구와의 연결이 실제 만족도를 좌우합니다.' },
  { no: '02', title: '도구와 모델은 별개다', body: 'Cursor 안에서 Claude를 쓰고 Copilot 안에서 GPT를 쓰는 시대입니다. 껍데기(도구)와 두뇌(모델)를 나눠서 고르세요.' },
  { no: '03', title: '하나로 다 하려 하지 않는다', body: '고성능 이용자일수록 만능 도구 하나가 아니라 3~5개를 역할별로 씁니다. 대화형 하나 + 리서치 하나 + 만드는 것 하나가 기본 골격입니다.' },
  { no: '04', title: '무료로 갈 수 있는 곳이 많다', body: 'NotebookLM, Gemini 무료 등급, 각 서비스 무료 티어만 조합해도 학습·기획 업무 대부분이 커버됩니다. 돈을 쓰기 전에 두 주만 무료로 써 보세요.' }
];

const risks = [
  { title: '환각', body: '모든 모델은 그럴듯한 거짓을 만듭니다. 숫자, 법조문, 인용, 사람 이름은 예외 없이 원문을 확인합니다. 답이 길고 유려할수록 더 위험합니다.' },
  { title: '개인정보', body: '주민번호, 고객 명단, 미공개 계약서, 환자 기록은 입력하지 않는 것을 기본값으로 합니다. 기업용 요금제의 학습 제외 설정을 확인하세요.' },
  { title: '저작권', body: '생성 이미지·음악의 상업적 사용 조건은 서비스마다 다릅니다. 학습 데이터 출처를 명시한 서비스가 분쟁 위험이 낮습니다.' },
  { title: '목소리와 얼굴', body: '실존 인물의 음성·초상을 동의 없이 합성하는 것은 기술 문제가 아니라 법적 문제입니다.' },
  { title: '편향', body: '특정 집단, 직업, 성별에 대한 통념이 결과물에 자연스럽게 섞여 나옵니다. 사람에 대한 판단에는 쓰지 않습니다.' },
  { title: '실력의 착시', body: '초안을 빨리 얻는 것과 판단이 좋아지는 것은 다릅니다. 학습 단계에서는 먼저 스스로 답하고 그다음에 비교하는 순서를 권합니다.' }
];

const workshop = [
  { min: 10, title: '같은 질문, 세 서비스', body: '수강생 각자의 실제 업무 질문 하나를 ChatGPT·Claude·Gemini에 똑같이 넣고 답을 비교합니다. 어디가 더 길고 어디가 더 조심스러운지 관찰합니다.' },
  { min: 20, title: '자료 기반 정확도', body: '같은 PDF를 NotebookLM과 일반 대화형 AI에 각각 넣고 "이 문서에 없는 내용"을 일부러 물어봅니다. 어느 쪽이 모른다고 답하는지 확인합니다.' },
  { min: 20, title: '프롬프트 개선', body: '역할 + 대상 독자 + 형식 + 분량 + 하지 말 것, 다섯 요소를 넣어 다시 요청하고 이전 결과와 비교합니다.' },
  { min: 20, title: '만들기', body: '방금 만든 내용을 Gamma 또는 NotebookLM으로 슬라이드화하고 표지 이미지를 이미지 생성 도구로 뽑습니다.' },
  { min: 15, title: '검증', body: '결과물에서 숫자와 인용을 골라 실제로 확인합니다. 틀린 항목 수를 세어 칠판에 적습니다.' },
  { min: 5,  title: '각자의 3종 세트 정하기', body: '오늘 이후 실제로 쓸 도구 세 개만 종이에 적고 마칩니다.' }
];

module.exports = { BASE_DATE, lines, tools, stacks, principles, risks, workshop };
