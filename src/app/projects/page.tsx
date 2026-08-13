import type { Metadata } from "next";
import { GallerySection } from "@/features/gallery";
import { getSectionImages } from "@/features/works";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const images = await getSectionImages("projects");
  return <GallerySection title="Projects" images={images} />;
}
