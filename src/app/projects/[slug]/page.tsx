import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryBanner } from "@/components/CategoryBanner";
import { PhotoGrid } from "@/features/gallery";
import { getProjectBySlug } from "@/features/works";
import styles from "./detail.module.css";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projects" };
  return {
    title: project.title,
    description: project.excerpt ?? project.body,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <CategoryBanner>Projects</CategoryBanner>
      <header className={styles.header}>
        <h2 className={styles.title}>{project.title}</h2>
        {project.year ? <p className={styles.year}>{project.year}</p> : null}
        {project.body ? <p className={styles.body}>{project.body}</p> : null}
      </header>
      <PhotoGrid images={project.images} />
    </article>
  );
}
