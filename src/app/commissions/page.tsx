import type { Metadata } from "next";
import { GallerySection } from "@/features/gallery";
import { getSectionImages } from "@/features/works";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Commissions",
};

export default async function CommissionsPage() {
  const images = await getSectionImages("commissions");
  return <GallerySection title="Commissions" images={images} />;
}
