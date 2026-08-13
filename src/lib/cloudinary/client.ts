import { v2 as cloudinary } from "cloudinary";
import type { WorkImage } from "@/types/work";
import { isCloudinaryConfigured } from "./config";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary env vars are missing.");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format?: string;
  created_at?: string;
};

function toWorkImage(resource: CloudinaryResource): WorkImage {
  const width = resource.width || 1200;
  const height = resource.height || 1600;
  const ratio = width / height;
  const format =
    ratio > 1.15 ? "landscape" : ratio < 0.85 ? "portrait" : "square";

  return {
    src: resource.secure_url,
    alt: resource.public_id.split("/").pop() ?? "photo",
    width,
    height,
    format,
    publicId: resource.public_id,
  };
}

async function listByPrefix(prefix: string): Promise<CloudinaryResource[]> {
  ensureConfigured();
  const resources: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 100,
      next_cursor: nextCursor,
    });
    resources.push(...(result.resources as CloudinaryResource[]));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources.sort((a, b) =>
    (b.created_at ?? "").localeCompare(a.created_at ?? ""),
  );
}

/** Direct children public_ids under a folder prefix (one level). */
export async function listImagesInFolder(folder: string): Promise<WorkImage[]> {
  if (!isCloudinaryConfigured()) return [];
  try {
    const prefix = folder.endsWith("/") ? folder : `${folder}/`;
    const resources = await listByPrefix(prefix);
    // Exclude nested project subfolders when listing the projects root only
    // is handled by callers; here we return all matching prefix.
    return resources.map(toWorkImage);
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "cloudinary_list_failed",
        folder,
        time: new Date().toISOString(),
        error: error instanceof Error ? error.message : "unknown",
      }),
    );
    return [];
  }
}

export async function listImagesInFolderShallow(
  folder: string,
): Promise<WorkImage[]> {
  const images = await listImagesInFolder(folder);
  const folderPrefix = folder.endsWith("/") ? folder : `${folder}/`;
  return images.filter((image) => {
    const publicId = image.publicId ?? "";
    const relative = publicId.startsWith(folderPrefix)
      ? publicId.slice(folderPrefix.length)
      : "";
    return relative.length > 0 && !relative.includes("/");
  });
}

export async function listProjectSlugs(
  projectsFolder: string,
): Promise<string[]> {
  if (!isCloudinaryConfigured()) return [];
  try {
    ensureConfigured();
    const result = await cloudinary.api.sub_folders(projectsFolder);
    return (result.folders as { name: string }[]).map((folder) => folder.name);
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "cloudinary_subfolders_failed",
        folder: projectsFolder,
        time: new Date().toISOString(),
        error: error instanceof Error ? error.message : "unknown",
      }),
    );
    return [];
  }
}
