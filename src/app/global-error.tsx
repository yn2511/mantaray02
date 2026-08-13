"use client";

import styles from "./error.module.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        <section className={styles.page}>
          <h1 className={styles.title}>Error</h1>
          <p className={styles.copy}>Something went wrong.</p>
          {error.digest ? (
            <p className={styles.meta}>ref: {error.digest}</p>
          ) : null}
          <button type="button" className={styles.button} onClick={reset}>
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
