import { CategoryBanner } from "@/components/CategoryBanner";
import { PhotoGrid } from "@/features/gallery";
import type { WorkImage } from "@/types/work";

type GallerySectionProps = {
  title: string;
  images: WorkImage[];
};

export function GallerySection({ title, images }: GallerySectionProps) {
  return (
    <section>
      <CategoryBanner>{title}</CategoryBanner>
      <PhotoGrid images={images} />
    </section>
  );
}
