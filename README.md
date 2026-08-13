# Manta Ray

사진작가 **가오리 / Manta Ray (김가을)** 포트폴리오.

- 라이브: https://mantaray02.vercel.app
- 예정 도메인: `mantaray02.com`
- Instagram: [@manta_ray_02](https://www.instagram.com/manta_ray_02/)

## 스택

Next.js + Vercel + Cloudinary (백엔드/DB 없음)

## 사진 올리는 방법 (작가용)

Cloudinary Media Library에 아래 폴더로 올리면 사이트에 반영됩니다. **개수 제한 없음.**

```text
mantaray/home
mantaray/portraits
mantaray/projects
mantaray/projects/시리즈이름
mantaray/commissions
```

1. [cloudinary.com](https://cloudinary.com) 로그인
2. Media Library → 폴더 선택 → Upload
3. 보통 1분 안에 반영

API 키가 없으면 로컬에서는 `public/work` 플레이스홀더를 씁니다.

## 로컬 실행

```bash
cp .env.example .env.local
npm install
npm run dev
```

환경변수: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## 스크립트

```bash
npm run lint
npm run build
npm run audit
```
