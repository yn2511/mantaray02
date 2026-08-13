import {
  CLOUDINARY_FOLDERS,
  getProjectFolder,
  isCloudinaryConfigured,
  listImagesInFolder,
  listImagesInFolderShallow,
  listProjectSlugs,
} from "@/lib/cloudinary";
import type { Work, WorkImage, WorkSection } from "@/types/work";
import { getProjectMeta, projectMeta } from "./project.meta";
import { works as localWorks } from "./works.data";

function localBySection(section: WorkSection): WorkImage[] {
  return localWorks
    .filter((work) => work.section === section)
    .flatMap((work) => work.images);
}

export async function getSectionImages(
  section: WorkSection,
): Promise<WorkImage[]> {
  if (!isCloudinaryConfigured()) {
    return localBySection(section);
  }

  if (section === "projects") {
    const rootImages = await listImagesInFolderShallow(
      CLOUDINARY_FOLDERS.projects,
    );
    const slugs = await listProjectSlugs(CLOUDINARY_FOLDERS.projects);
    const nested = await Promise.all(
      slugs.map((slug) => listImagesInFolder(getProjectFolder(slug))),
    );
    const images = [...rootImages, ...nested.flat()];
    return images.length > 0 ? images : localBySection(section);
  }

  const images = await listImagesInFolder(CLOUDINARY_FOLDERS[section]);
  return images.length > 0 ? images : localBySection(section);
}

export async function getHomeImages(): Promise<WorkImage[]> {
  if (!isCloudinaryConfigured()) {
    return localWorks.flatMap((work) => work.images);
  }

  const home = await listImagesInFolder(CLOUDINARY_FOLDERS.home);
  if (home.length > 0) return home;

  const [portraits, projects, commissions] = await Promise.all([
    getSectionImages("portraits"),
    getSectionImages("projects"),
    getSectionImages("commissions"),
  ]);
  const merged = [...portraits, ...projects, ...commissions];
  return merged.length > 0 ? merged : localWorks.flatMap((work) => work.images);
}

export async function getAllProjects(): Promise<Work[]> {
  if (!isCloudinaryConfigured()) {
    return localWorks.filter((work) => work.section === "projects");
  }

  const slugs = await listProjectSlugs(CLOUDINARY_FOLDERS.projects);
  const known = new Set(slugs);

  const fromCloud: Work[] = await Promise.all(
    slugs.map(async (slug) => {
      const meta = getProjectMeta(slug);
      const images = await listImagesInFolder(getProjectFolder(slug));
      return {
        slug,
        section: "projects",
        title: meta?.title ?? slug,
        excerpt: meta?.excerpt,
        body: meta?.body,
        year: meta?.year,
        images,
      };
    }),
  );

  const extras: Work[] = projectMeta
    .filter((meta) => !known.has(meta.slug))
    .map((meta) => ({
      ...meta,
      section: "projects",
      images: [],
    }));

  const projects = [...fromCloud, ...extras].filter(
    (project) =>
      project.images.length > 0 || Boolean(getProjectMeta(project.slug)),
  );

  if (projects.some((project) => project.images.length > 0)) {
    return projects;
  }

  return localWorks.filter((work) => work.section === "projects");
}

export async function getProjectBySlug(
  slug: string,
): Promise<Work | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}
