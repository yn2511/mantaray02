import styles from "./CategoryBanner.module.css";

type CategoryBannerProps = {
  children: string;
};

export function CategoryBanner({ children }: CategoryBannerProps) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
}
