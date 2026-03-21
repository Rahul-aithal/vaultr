"use server";

import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { BUCKET, minioClient } from "@/lib/minio";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const rawFile = formData.get("file") as File;
  const name = formData.get("name") as string;
  const enabled = formData.get("enabled") === "true";
  const allowUnknown = formData.get("allowUnknown") === "true";
  const maxDownloads = Number(formData.get("maxDownloads")) || 10;
  const expiresAt = new Date(formData.get("expiresAt") as string);

  if (!rawFile || !name) throw new Error("Missing file or name");

  const uniqueName = `${name}-${uuidv4()}`;
  const buffer = Buffer.from(await rawFile.arrayBuffer());

  await minioClient.putObject(BUCKET, uniqueName, buffer, buffer.length, {
    "Content-Type": rawFile.type,
  });

  const [inserted] = await db
    .insert(file)
    .values({
      name,
      link: uniqueName,
      enabled,
      allowUnkonwn: allowUnknown,
      maxDownloads,
      expiresAt,
      createdBy: session.user.id,
    })
    .returning({ id: file.id });

  redirect(`/dashboard/upload/success?id=${inserted.id}`);
}
