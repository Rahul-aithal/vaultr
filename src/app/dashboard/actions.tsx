"use server";

import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type EditFileInput = {
  link: string;
  name: string;
  maxDownloads: number;
  expiresAt: string;
  enabled: boolean;
  allowUnkonwn: boolean;
};

export async function updateFile(link: string, data: EditFileInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Not authenticated");

  await db
    .update(file)
    .set({
      name: data.name,
      maxDownloads: data.maxDownloads,
      expiresAt: new Date(data.expiresAt),
      enabled: data.enabled,
      allowUnkonwn: data.allowUnkonwn,
    })
    .where(eq(file.link, link));

  revalidatePath("/dashboard");
}