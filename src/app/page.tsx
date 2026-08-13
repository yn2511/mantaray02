import { HomeCanvas } from "@/features/home";
import { getHomeImages } from "@/features/works";

export const revalidate = 60;

export default async function HomePage() {
  const images = await getHomeImages();
  return <HomeCanvas images={images} />;
}
