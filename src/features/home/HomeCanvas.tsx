import Image from "next/image";
import Link from "next/link";
import type { WorkImage } from "@/types/work";
import styles from "./HomeCanvas.module.css";

type HomeCanvasProps = {
  images: WorkImage[];
};

const HOME_LINKS = [
  { href: "/portraits", label: "Portraits", tone: "accent" },
  { href: "/projects", label: "Projects", tone: "mid" },
  { href: "/commissions", label: "Commissions", tone: "deep" },
] as const;

function splitColumns(images: WorkImage[], count: number): WorkImage[][] {
  const columns: WorkImage[][] = Array.from({ length: count }, () => []);
  images.forEach((image, index) => {
    columns[index % count].push(image);
  });
  return columns;
}

export function HomeCanvas({ images }: HomeCanvasProps) {
  const source = images.length > 0 ? images : [];
  if (source.length === 0) {
    return (
      <section className={styles.canvas}>
        <nav className={styles.overlay} aria-label="Categories">
          {HOME_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.overlayLink} ${styles[item.tone]}`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </section>
    );
  }

  const filled =
    source.length >= 9
      ? source
      : Array.from({ length: 12 }, (_, index) => source[index % source.length]);
  const columns = splitColumns(filled, 3);

  return (
    <section className={styles.canvas}>
      <div className={styles.columns} aria-hidden="true">
        {columns.map((column, columnIndex) => {
          const loop = [...column, ...column, ...column];
          return (
            <div
              key={columnIndex}
              className={`${styles.column} ${styles[`speed${columnIndex + 1}`]}`}
            >
              <div className={styles.track}>
                {loop.map((image, index) => (
                  <figure
                    key={`${columnIndex}-${index}`}
                    className={styles.tile}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      className={styles.tileImage}
                      sizes="33vw"
                      priority={columnIndex === 0 && index < 3}
                      unoptimized={image.src.endsWith(".svg")}
                    />
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <nav className={styles.overlay} aria-label="Categories">
        {HOME_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.overlayLink} ${styles[item.tone]}`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
