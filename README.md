# 📸 Manta Ray (가오리) — Photography Portfolio

> **사진작가 가오리 / Manta Ray (김가을)의 공식 온라인 포트폴리오 웹사이트**  
> 모던 미니멀리즘 디자인과 Next.js App Router, Cloudinary 미디어 인프라 기반의 고성능 아티스트 아카이브.

[![Live Demo](https://img.shields.io/badge/Live_Demo-mantaray02.vercel.app-black?logo=vercel)](https://mantaray02.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?logo=cloudinary)](https://cloudinary.com)

---

## 🌐 1. 웹사이트 접속 및 링크 (Links)
- **공식 라이브**: [https://mantaray02.vercel.app](https://mantaray02.vercel.app)
- **예정 커스텀 도메인**: `mantaray02.com`
- **작가 공식 인스타그램**: [@manta_ray_02](https://www.instagram.com/manta_ray_02/) · [@manta_ray_archive](https://www.instagram.com/manta_ray_archive/)
- **문의 이메일**: [hello@mantaray02.com](mailto:hello@mantaray02.com)

---

## ✨ 2. 핵심 인터랙션 및 기능 (Key Features)

### 🎞️ 1) 수직 마키 홈 캔버스 (Infinite Vertical Marquee)
- 메인 화면 진입 시 작가의 대표작들이 서로 다른 3가지 속도(`speed1`, `speed2`, `speed3`)로 부드럽게 무한 스크롤되는 감각적인 3열 캔버스 구현.
- 화면 중앙의 미니멀 오버레이 카테고리(`Portraits`, `Projects`, `Commissions`)를 통해 몰입감 있는 진입 동선 제공.

### 🖼️ 2) 플루이드 반응형 포토 그리드 (Fluid Responsive Grid)
- 사진의 종횡비(`portrait`, `landscape`, `square`)에 따라 자동 정렬되는 플렉시블 그리드 레이아웃.
- 모바일 환경(1~2열 최적화)과 데스크톱 와이드 스크린 환경(3~4열)을 완벽하게 분기 지원.

### 🔍 3) 풀스크린 인터랙티브 라이트박스 (Interactive Lightbox)
- 갤러리의 모든 사진 클릭 시 즉시 고화질 전체화면 뷰어 모달 진입.
- **키보드 접근성 완벽 지원**:
  - `←` (이전 사진) / `→` (다음 사진)
  - `Escape` (라이트박스 닫기)
- 인덱스 카운터(`1 / 8`) 및 캡션 오버레이 표시.

### ☁️ 4) 작가 친화적 제로 백엔드 CMS (Cloudinary Media Sync)
- 복잡한 어드민 CMS나 데이터베이스 없이, 작가가 [Cloudinary](https://cloudinary.com) 미디어 라이브러리 폴더에 사진을 업로드하기만 하면 1분 내 사이트에 실시간 자동 동기화.
- 로컬 환경 및 API 미연결 시 `public/work/*.svg` 플레이스홀더로 무중단 구동.

---

## 🛡️ 3. 엔터프라이즈 보안 및 성능 아키텍처 (Security & Performance)

컴퓨터공학 실무 표준을 준수한 엄격한 보안 헤더와 에러 차단 아키텍처를 탑재했습니다:

```text
[ Client Request ] 
       │
       ▼
[ middleware.ts ] ───▶ x-request-id UUID 생성 및 전역 헤더 주입
       │
       ▼
[ next.config.ts ] ──▶ 엄격한 보안 헤더 정책 강제
       ├─ Content-Security-Policy (CSP: default-src 'self', frame-ancestors 'none')
       ├─ Strict-Transport-Security (HSTS: max-age=2년, preload)
       ├─ X-Frame-Options: DENY (Clickjacking 차단)
       ├─ X-Content-Type-Options: nosniff (MIME Sniffing 방지)
       ├─ Permissions-Policy: camera=(), microphone=(), payment=() (불필요 API 차단)
       └─ Cross-Origin-Opener/Resource-Policy: same-origin
       │
       ▼
[ global-error.tsx / error.tsx ] ──▶ 프로덕션 환경 내부 스택트레이스 노출 원천 차단
```

---

## 📁 4. 사진 업로드 가이드 (작가 전용)

Cloudinary Media Library에 아래 폴더 구조로 사진을 업로드하면 즉시 포트폴리오에 반영됩니다:

```text
mantaray/
├── home/                # 홈 캔버스 마키 롤링 사진
├── portraits/           # 인물 사진 컬렉션
├── projects/            # 개인 프로젝트 및 에세이
│   └── {시리즈이름}/     # 개별 프로젝트 슬러그별 사진 (예: once-useful, diary-light)
└── commissions/         # 상업 및 외주 의뢰 사진
```

---

## 💻 5. 로컬 개발 및 실행 (Getting Started)

### 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local`을 생성합니다:
```bash
cp .env.example .env.local
```

필요 환경 변수:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
*(환경변수가 없어도 로컬 플레이스홀더 모드로 완벽히 작동합니다.)*

### 의존성 설치 및 로컬 서버 구동
```bash
npm install
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속합니다.

### 린트 및 품질 점검 스크립트
```bash
npm run lint         # ESLint 린트 검사
npm run lint:fix     # 린트 자동 교정
npm run format       # Prettier 포맷팅
npm run build        # 프로덕션 빌드 검증
npm run audit        # 보안 취약점 점검
```

---

## 👩‍💻 저작권 및 크레딧
- **Photography**: 가오리 · Manta Ray (김가을)
- **Development**: 윤나래 ([@yn2511](https://github.com/yn2511))
