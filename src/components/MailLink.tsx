import styles from "./MailLink.module.css";

export function MailLink() {
  return (
    <a
      href="mailto:hello@mantaray02.com"
      className={styles.link}
      aria-label="Email"
    >
      @
    </a>
  );
}
