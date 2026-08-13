export const CLOUDINARY_ROOT = "mantaray";

export const CLOUDINARY_FOLDERS = {
  home: `${CLOUDINARY_ROOT}/home`,
  portraits: `${CLOUDINARY_ROOT}/portraits`,
  projects: `${CLOUDINARY_ROOT}/projects`,
  commissions: `${CLOUDINARY_ROOT}/commissions`,
} as const;

export type CloudinarySection = keyof typeof CLOUDINARY_FOLDERS;

export function getProjectFolder(slug: string): string {
  return `${CLOUDINARY_FOLDERS.projects}/${slug}`;
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );
}
