"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { WorkImage } from "@/types/work";
import styles from "./PhotoGrid.module.css";

type PhotoGridProps = {
  images: WorkImage[];
  priorityCount?: number;
};

export function PhotoGrid({ images, priorityCount = 4 }: PhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null
    );
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, showPrev, showNext]);

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, index) => {
          const format = image.format ?? "portrait";
          return (
            <figure
              key={`${image.src}-${index}`}
              className={`${styles.figure} ${styles[format]}`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.alt || "photo"} in lightbox`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
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

      {selectedIndex !== null && images[selectedIndex] && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <button
            className={styles.prevBtn}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={images[selectedIndex].width}
                height={images[selectedIndex].height}
                className={styles.lightboxImage}
                priority
                unoptimized={images[selectedIndex].src.endsWith(".svg")}
              />
            </div>
            <div className={styles.caption}>
              <span>{images[selectedIndex].alt}</span>
              <span className={styles.counter}>
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            className={styles.nextBtn}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
