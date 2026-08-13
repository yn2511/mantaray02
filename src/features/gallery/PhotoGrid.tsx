import Image from "next/image";
import type { WorkImage } from "@/types/work";
import styles from "./PhotoGrid.module.css";

type PhotoGridProps = {
  images: WorkImage[];
  priorityCount?: number;
};

export function PhotoGrid({ images, priorityCount = 4 }: PhotoGridProps) {
  return (
    <div className={styles.grid}>
      {images.map((image, index) => {
        const format = image.format ?? "portrait";
        return (
          <figure
            key={`${image.src}-${index}`}
            className={`${styles.figure} ${styles[format]}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1600px) 40vw, 480px"
              priority={index < priorityCount}
              unoptimized={image.src.endsWith(".svg")}
            />
          </figure>
        );
      })}
    </div>
  );
}
