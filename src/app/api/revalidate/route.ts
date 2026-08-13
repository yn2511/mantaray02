import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

/**
 * Cloudinary notification webhook target.
 * Set the same secret in Cloudinary webhook + Vercel env REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/portraits");
  revalidatePath("/projects");
  revalidatePath("/commissions");
  revalidatePath("/about");

  logger.info("revalidate_triggered", {
    path: "/api/revalidate",
  });

  return NextResponse.json({ ok: true, revalidated: true });
}
