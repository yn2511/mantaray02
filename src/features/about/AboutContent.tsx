import styles from "./AboutContent.module.css";

export function AboutContent() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Artist CV</h1>
      <p className={styles.brand}>가오리 · Manta Ray</p>
      <p className={styles.name}>김가을 (Gaeul Kim) — Seoul, Korea</p>

      <div className={styles.copy}>
        <p>
          글처럼 적어 내려가는 사진. 과장된 연출 대신 사물이 본래 지닌 질감과
          빛의 잔여를 응시합니다. 한때 쓰임을 다하고 남겨진 형태들, 하루의
          가장자리에서 마주치는 찰나의 햇살, 그리고 인물이 지닌 고유한 침묵을
          아날로그 필름과 디지털 매체의 교차점에서 기록합니다.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Selected Exhibitions</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.year}>2026</span>
            <div className={styles.listContent}>
              <strong>한때 유용했던 것들에 대하여 (Solo Exhibition)</strong>
              <span>갤러리 팩토리 성수, 서울</span>
            </div>
          </li>
          <li>
            <span className={styles.year}>2025</span>
            <div className={styles.listContent}>
              <strong>The Edge of the Day (Curated Group Show)</strong>
              <span>스페이스 아카이브 한남, 서울</span>
            </div>
          </li>
          <li>
            <span className={styles.year}>2024</span>
            <div className={styles.listContent}>
              <strong>Kyoto & Fukuoka Monologue (Two-Person Exhibition)</strong>
              <span>아트센터 백해영, 서울</span>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Editorial & Commercial Clients</h2>
        <p className={styles.clientText}>
          Vogue Korea · Dazed Korea · Musinsa Studio · Gentle Monster · Magazine B · Studio Concrete · SM Entertainment · Hybe Labels (Portrait Editorial Archive)
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Publications</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.year}>2025</span>
            <div className={styles.listContent}>
              <strong>사진집 《잔여의 빛 (Diary Light)》</strong>
              <span>독립출판 한정판 아카이브 (300 Copies)</span>
            </div>
          </li>
          <li>
            <span className={styles.year}>2024</span>
            <div className={styles.listContent}>
              <strong>사진 에세이 《침묵의 부피》</strong>
              <span>민음사 포토 에세이 시리즈 수록</span>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Equipment & Formats</h2>
        <p className={styles.gearText}>
          Leica M11 · Hasselblad 907X & CFV 100C · Contax T3 (35mm Analog Film) · Kodak Tri-X 400 · Kodak Portra 160 / 400
        </p>
      </div>

      <div className={styles.contact}>
        <p>Inquiries & Print Editions</p>
        <a href="mailto:hello@mantaray02.com">hello@mantaray02.com</a>
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/manta_ray_02/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @manta_ray_02
          </a>
          <span>·</span>
          <a
            href="https://www.instagram.com/manta_ray_archive/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Archive @manta_ray_archive
          </a>
        </div>
      </div>
    </section>
  );
}
