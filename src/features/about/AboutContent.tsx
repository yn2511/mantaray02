import styles from "./AboutContent.module.css";

export function AboutContent() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Artist CV</h1>
      <p className={styles.brand}>가오리 · Manta Ray</p>
      <p className={styles.name}>김가을</p>
      <div className={styles.copy}>
        <p>
          글처럼 찍는 사진. 쓰임을 잃은 사물, 하루의 가장자리, 의뢰마다 달라지는
          색과 톤 사이에서도 같은 시선으로 남긴다.
        </p>
        <p>
          Instagram{" "}
          <a
            href="https://www.instagram.com/manta_ray_02/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @manta_ray_02
          </a>
          {" · "}
          <a
            href="https://www.instagram.com/manta_ray_archive/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @manta_ray_archive
          </a>
        </p>
      </div>
      <div className={styles.contact}>
        <p>Contact</p>
        <a href="mailto:hello@mantaray02.com">hello@mantaray02.com</a>
      </div>
    </section>
  );
}
