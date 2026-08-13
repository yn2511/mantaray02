import type { Work, WorkSection } from "@/types/work";

/**
 * Text-only metadata for project essays.
 * Photos come from Cloudinary folders: mantaray/projects/{slug}/
 */
export const projectMeta: Omit<Work, "images" | "section">[] = [
  {
    slug: "once-useful",
    title: "한때 유용했지만 어느 순간 무용해진 것들에 대하여",
    excerpt: "쓰임을 잃은 사물과, 그 자리에 남는 빛.",
    body: "한때 손을 거쳐 가던 것들이 있다. 쓸모를 다한 뒤에도 형태는 남고, 그림자는 더 또렷해진다. 이 시리즈는 그 잔여를 사진으로 적는다.",
    year: 2026,
  },
  {
    slug: "diary-light",
    title: "Diary Light",
    excerpt: "하루의 가장자리를 붙잡아 둔 기록.",
    body: "의도하지 않은 장면일수록 오래 남는다.",
    year: 2025,
  },
];

export function getProjectMeta(slug: string) {
  return projectMeta.find((item) => item.slug === slug);
}

export const sectionTitles: Record<WorkSection, string> = {
  portraits: "Portraits",
  projects: "Projects",
  commissions: "Commissions",
};
