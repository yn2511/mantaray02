import type { Metadata } from "next";
import { GallerySection } from "@/features/gallery";
import { getSectionImages } from "@/features/works";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portraits",
};

export default async function PortraitsPage() {
  const images = await getSectionImages("portraits");
  return <GallerySection title="Portraits" images={images} />;
}
