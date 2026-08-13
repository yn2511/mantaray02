import styles from "./InstagramLink.module.css";

export function InstagramLink() {
  return (
    <a
      href="https://www.instagram.com/manta_ray_02/"
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram @manta_ray_02"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    </a>
  );
}
