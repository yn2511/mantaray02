"use client";

import { useEffect } from "react";
import { toSafeClientMessage } from "@/lib/errors/AppError";
import styles from "./error.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Keep internals out of the UI; digest is safe to correlate in logs.
    console.error(
      JSON.stringify({
        level: "error",
        message: "app_route_error",
        digest: error.digest,
        time: new Date().toISOString(),
      }),
    );
  }, [error]);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Error</h1>
      <p className={styles.copy}>{toSafeClientMessage(error)}</p>
      <button type="button" className={styles.button} onClick={reset}>
        Try again
      </button>
    </section>
  );
}
