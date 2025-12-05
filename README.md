# 다기능 오피스 툴킷 (Multi-Tool Office Toolkit)

Electron + Next.js 기반의 데스크톱 오피스 툴 모음 애플리케이션입니다.

## 주요 기능

### 🧮 이름-숫자 합산 툴
- "이름 숫자" 형식의 데이터를 입력하면 자동으로 합산
- 동일한 이름의 숫자 값을 모두 합산하여 순위별로 정렬
- 클립보드 복사 기능
- Excel 파일로 저장 (.xlsx)
- 앱 종료 시 자동 저장, 재시작 시 자동 복원

### ⚙️ 설정 기능
- 다크/라이트 모드 지원
- 시스템 테마 자동 감지
- 앱 버전 정보 표시

### 🔄 자동 업데이트
- GitHub Releases를 통한 자동 업데이트
- 업데이트 알림 및 다운로드

## 기술 스택

- **Electron** 28.x - 데스크톱 앱 프레임워크
- **Next.js** 14.x - React 프레임워크 (App Router)
- **TypeScript** - 타입 안정성
- **shadcn/ui** - UI 컴포넌트 라이브러리
- **Tailwind CSS** - 스타일링
- **exceljs** - Excel 파일 생성
- **electron-store** - 로컬 데이터 저장
- **electron-updater** - 자동 업데이트

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 18.x 이상
- **pnpm** (권장) 또는 npm

### 설치 방법

```bash
# 1. 저장소 클론
git clone https://github.com/99YJH/tool.git
cd tool

# 2. pnpm 설치 (없는 경우)
npm install -g pnpm

# 3. 의존성 설치
pnpm install

# 4. Electron 빌드 스크립트 실행 (중요!)
# pnpm이 보안상 차단하는 경우 npm으로 설치
npm install electron@28.3.3 --no-save
```

### 개발 모드 실행

```bash
pnpm dev
```

이 명령어는 다음을 동시에 실행합니다:
- Next.js 개발 서버 (http://localhost:3000)
- Electron 앱 (자동으로 창이 열림)

### 프로덕션 빌드

```bash
# Windows 빌드
pnpm run build:win

# macOS 빌드
pnpm run build:mac

# 모든 플랫폼 빌드
pnpm run build:all
```

빌드 결과는 `release/` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
tool/
├── electron/              # Electron 메인 프로세스
│   ├── main.ts           # 메인 진입점
│   ├── preload.ts        # Preload 스크립트
│   ├── store.ts          # 로컬 저장소
│   ├── updater.ts        # 자동 업데이트
│   └── utils.ts          # 유틸리티
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   ├── page.tsx      # 메인 페이지
│   │   └── settings/     # 설정 페이지
│   ├── components/       # React 컴포넌트
│   │   ├── ui/           # shadcn/ui 컴포넌트
│   │   ├── layout/       # 레이아웃 컴포넌트
│   │   └── name-sum-tool/ # 이름-숫자 합산 툴
│   ├── lib/              # 유틸리티 함수
│   │   ├── parser.ts     # 데이터 파싱 로직
│   │   ├── excel-export.ts # Excel 저장
│   │   └── utils.ts      # 공통 유틸
│   └── types/            # TypeScript 타입 정의
├── public/
│   └── icons/            # 앱 아이콘
├── package.json          # 의존성 및 스크립트
├── electron-builder.yml  # 빌드 설정
└── next.config.js        # Next.js 설정
```

## 🛠️ 사용 방법

### 이름-숫자 합산 툴

1. 좌측 입력창에 다음 형식으로 데이터 입력:
   ```
   홍길동 1000
   김철수 2000
   홍길동 500
   이영희 3000
   ```

2. 우측 출력창에 자동으로 합산 결과 표시
   - 동일한 이름의 숫자가 모두 합산됨
   - 합산값 기준 내림차순 정렬
   - 순위 자동 부여

3. **복사 버튼**: 결과를 "이름 숫자" 형식으로 클립보드에 복사

4. **Excel 저장**: .xlsx 파일로 다운로드

5. **초기화**: 입력창 내용 지우기

### 설정

- 좌측 사이드바 하단의 "설정" 버튼 클릭
- 테마 변경 (라이트/다크/시스템)
- 앱 버전 확인

## ⚠️ 문제 해결

### Electron 실행 오류

```bash
Error: Electron failed to install correctly
```

**해결 방법:**
```bash
# npm으로 Electron 재설치
npm install electron@28.3.3 --no-save
```

### pnpm 빌드 스크립트 차단

pnpm이 보안상 Electron 설치 스크립트를 차단하는 경우:

1. `.npmrc` 파일에 다음 추가:
   ```
   enable-pre-post-scripts=true
   ```

2. 또는 npm 사용:
   ```bash
   npm install electron@28.3.3 --no-save
   ```

### 포트 충돌

개발 서버 포트(3000)가 이미 사용 중인 경우:
```bash
# 프로세스 종료 후 재시작
lsof -ti:3000 | xargs kill -9
pnpm dev
```

## 📦 배포

### GitHub Releases를 통한 자동 업데이트

1. 버전 업데이트:
   ```bash
   # package.json의 version 변경
   npm version patch  # 또는 minor, major
   ```

2. 빌드 및 배포:
   ```bash
   pnpm run build:all
   ```

3. GitHub에 Release 생성:
   - GitHub 저장소 → Releases → "Create a new release"
   - Tag: `v0.1.0` (package.json의 버전과 동일)
   - `release/` 디렉토리의 파일들 업로드

4. 사용자가 앱을 실행하면 자동으로 업데이트 알림 표시

### 코드 서명 (선택사항)

실제 배포 시 코드 서명 권장:
- **Windows**: `.pfx` 인증서 ($100-300/년)
- **macOS**: Apple Developer ID ($99/년) + Notarization

## 🤝 기여

이 프로젝트는 개인 프로젝트입니다.

## 📝 라이선스

MIT License

## 📧 문의

문제가 있거나 제안사항이 있으시면 GitHub Issues를 이용해주세요.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
