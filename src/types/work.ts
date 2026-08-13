export type WorkSection = "portraits" | "projects" | "commissions";

export type WorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  format?: "portrait" | "landscape" | "square";
  publicId?: string;
};

export type Work = {
  slug: string;
  section: WorkSection;
  title: string;
  excerpt?: string;
  body?: string;
  year?: number;
  images: WorkImage[];
};
