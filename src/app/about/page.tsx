import type { Metadata } from "next";
import { AboutContent } from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description: "가오리 / Manta Ray — 김가을",
};

export default function AboutPage() {
  return <AboutContent />;
}
