import Link from "next/link";
import styles from "./error.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Not found</h1>
      <p className={styles.copy}>이 페이지는 없습니다.</p>
      <Link href="/" className={styles.button}>
        Home
      </Link>
    </section>
  );
}
