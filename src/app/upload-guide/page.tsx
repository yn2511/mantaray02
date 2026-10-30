import type { Metadata } from "next";
import Link from "next/link";
import styles from "./UploadGuide.module.css";

export const metadata: Metadata = {
  title: "Upload Guide | Manta Ray",
  description:
    "김가을 작가님과 관리자를 위한 Cloudinary 기반 사진 업로드 및 자동 동기화 가이드.",
};

export default function UploadGuidePage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Photographer Manual</span>
        <h1 className={styles.title}>사진 업로드 및 아카이빙 가이드</h1>
        <p className={styles.subtitle}>
          복잡한 관리자 CMS 없이, Cloudinary 클라우드 폴더에 사진을 넣으면 웹사이트에 1분 내 자동 반영됩니다.
        </p>
      </header>

      <section className={styles.steps}>
        {/* Step 1 */}
        <article className={styles.stepCard}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>STEP 1</span>
            <h2 className={styles.stepTitle}>Cloudinary 로그인 및 Media Library 접속</h2>
          </div>
          <p className={styles.stepDesc}>
            별도의 어드민 사이트 접속 없이, 작가님의 공식 이미지 스토리지인 Cloudinary 콘솔에서 직접 관리합니다.
          </p>
          <div className={styles.codeBox}>
            1. https://cloudinary.com 접속 후 작가 계정 로그인<br />
            2. 좌측 상단 메뉴에서 [Media Library] (폴더 모양 아이콘) 클릭
          </div>
        </article>

        {/* Step 2 */}
        <article className={styles.stepCard}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>STEP 2</span>
            <h2 className={styles.stepTitle}>카테고리별 폴더 구조 확인</h2>
          </div>
          <p className={styles.stepDesc}>
            원하는 페이지에 맞게 해당 폴더로 이동하여 사진을 업로드합니다.
          </p>
          <pre className={styles.codeBox}>
{`mantaray/
├── home/                # 메인 화면 수직 롤링 캔버스 (최소 6~12장 이상 권장)
├── portraits/           # 인물 사진 컬렉션 (Portraits 탭)
├── projects/            # 기획 프로젝트 및 사진 에세이 (Projects 탭)
│   ├── once-useful/     # 프로젝트 슬러그별 폴더 (영문 소문자/하이픈)
│   ├── diary-light/
│   └── {새프로젝트명}/   # 새 폴더를 만들면 사이트에 새 프로젝트 자동 생성!
└── commissions/         # 브랜드 협업, 룩북, 상업 외주 화보 (Commissions 탭)`}
          </pre>
          <ul className={styles.tipList}>
            <li><strong>팁:</strong> 새 프로젝트를 열고 싶을 땐 <code>mantaray/projects/</code> 안에 영문 폴더(예: <code>seoul-night</code>)를 만들고 사진을 넣으면 자동으로 프로젝트가 분기됩니다.</li>
          </ul>
        </article>

        {/* Step 3 */}
        <article className={styles.stepCard}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>STEP 3</span>
            <h2 className={styles.stepTitle}>드래그 앤 드롭 업로드 & 최적 권장 사양</h2>
          </div>
          <p className={styles.stepDesc}>
            해당 폴더를 열고 PC나 맥에서 사진 파일들을 마우스로 끌어다 놓기만 하면 즉시 업로드됩니다.
          </p>
          <div className={styles.codeBox}>
            • 포맷: 원본 JPG / PNG / WebP 모두 지원<br />
            • 해상도: 긴 축 기준 2,000px ~ 3,500px 권장 (서버에서 WebP/AVIF로 자동 최적화 압축)<br />
            • 색공간: 웹 표준 sRGB 권장 (AdobeRGB는 웹 브라우저에 따라 색감이 틀어질 수 있음)
          </div>
        </article>

        {/* Step 4 */}
        <article className={styles.stepCard}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>STEP 4</span>
            <h2 className={styles.stepTitle}>1분 내 무중단 자동 반영 (On-demand ISR)</h2>
          </div>
          <p className={styles.stepDesc}>
            업로드가 완료되면 별도로 개발자에게 요청하거나 빌드 버튼을 누를 필요가 없습니다. Next.js 엣지 캐시가 클라우드 변경을 감지하여 <strong>보통 1분 이내에 라이브 웹사이트에 새 사진이 노출</strong>됩니다.
          </p>
        </article>
      </section>

      {/* FAQ & Tips */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>자주 묻는 질문 & 실전 팁 (FAQ)</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Q. 사진 노출 순서를 정하고 싶어요</h3>
            <p className={styles.faqA}>
              기본적으로 최신 업로드 순 또는 파일명 순으로 정렬됩니다. 정밀한 순서를 원하시면 파일명 앞에 <code>01_</code>, <code>02_</code>처럼 번호를 붙여 업로드하시면 그대로 배치됩니다.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Q. 라이트박스 전체화면에서 화질이 깨지지 않나요?</h3>
            <p className={styles.faqA}>
              포트폴리오에 탑재된 인터랙티브 라이트박스는 방문자의 모니터 해상도(Retina 4K 등)에 맞춰 Cloudinary의 최고화질 고해상도 에셋을 스트리밍하므로 디테일 손실 없이 선명하게 감상할 수 있습니다.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Q. 사진을 삭제하거나 교체하려면?</h3>
            <p className={styles.faqA}>
              Cloudinary Media Library에서 해당 사진을 삭제하거나 새 사진을 올리시면 캐시 갱신 주기(최대 1~5분) 이후 웹사이트에서도 자동으로 제거 및 교체됩니다.
            </p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Q. 인스타그램 링크나 문의 이메일 수정은?</h3>
            <p className={styles.faqA}>
              현재 사이트 하단 및 메뉴에 <code>@manta_ray_02</code>와 <code>hello@mantaray02.com</code>이 연동되어 있습니다. 작가님의 새 채널이 생기면 언제든 코드 수정으로 10초 만에 반영 가능합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusText}>
          <span className={styles.statusDot} />
          <span>미디어 서버 엔진: Next.js App Router × Cloudinary On-demand CDN 활성화됨</span>
        </div>
        <Link href="/portraits" className={styles.statusBtn}>
          포트폴리오 보러가기 →
        </Link>
      </div>
    </main>
  );
}
