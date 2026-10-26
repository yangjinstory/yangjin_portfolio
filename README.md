# GitHub Pages 포트폴리오 배포 안내

## 적용 방법
`index.html`, `style.css`, `content.js`, `script.js`를 GitHub 저장소 `yangjin_portfolio`의 최상위 경로에 업로드해 기존 파일을 교체하세요.

**중요:** 기존 `index.html` 원본은 제공되지 않아, 기존 스타일·스크립트 구조에 맞춰 재구성한 파일입니다. 기존 ABOUT / EXPERIENCE / CONTACT 문구 중 별도로 작성했던 내용이 있다면 업로드 전에 비교하세요.

## 검색 노출 제한
- `index.html`의 `robots`, `googlebot`, `bingbot` 메타 태그에 `noindex` 설정을 넣었습니다.
- `robots.txt`는 AI 크롤러에 대한 크롤링 제한 요청 예시입니다. 단, **프로젝트 저장소의 robots.txt는 GitHub Pages 사이트의 도메인 루트 robots.txt로 제공되지 않으므로 해당 URL에서는 실제 효력이 없습니다.** 이를 검색 비노출의 핵심 장치로 여기지 마세요.
- 일반 검색엔진은 페이지를 읽고 `noindex`를 확인해야 하므로 Google/Bing을 robots.txt로 막지 않았습니다.
- 검색 결과 제거는 즉시 이루어지지 않을 수 있습니다. 이미 색인된 페이지는 검색엔진의 제거 요청 도구를 별도로 사용하세요.
- GitHub Pages는 누구나 URL로 접근할 수 있습니다. 비공개 접근이나 이미지 보호가 필요하면 인증을 지원하는 별도 호스팅이 필요합니다.
- 검색 비노출을 절대 보장할 수 없습니다.

## 예산 표기
연간 18억 원의 정확한 수치는 넣지 않고 '약 20억 원'으로 표시했습니다. 근사치 역시 내부 기밀에 해당한다면 '대규모 광고 예산'으로 변경하세요.
