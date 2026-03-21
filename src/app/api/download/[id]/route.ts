import { db } from "@/db/drizzle";
import { download, file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { BUCKET, minioClient } from "@/lib/minio";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const record = await db
    .select()
    .from(file)
    .where(eq(file.id, id))
    .then((r) => r[0]);

  if (!record) {
    return new Response("File not found", { status: 404 });
  }

  if (!record.enabled) {
    return new Response("Link is disabled", { status: 403 });
  }

  if (new Date() > record.expiresAt) {
    return new Response("Link has expired", { status: 410 });
  }

  if (record.downloads! >= record.maxDownloads!) {
    return new Response("Max downloads reached", { status: 403 });
  }

  const session = await auth.api.getSession({ headers: await headers() });
  let downloadId: string="";
  if (!record.allowUnkonwn) {
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const [ downloadInsertData  ]= await db.insert(download).values({
      fileId: id,
      userId: session.user.id,
    }).returning({ id: download.id });
    downloadId = downloadInsertData.id
  }

  // Stream file from Minio
  const stream = await minioClient.getObject(BUCKET, record.link);

  // Increment downloads
  await db
    .update(file)
    .set({ downloads: sql`${file.downloads} + 1` })
    .where(eq(file.id, id));

  if(downloadId.length>2)
  await db.update(download).set({ status: "success" }).where(eq(download.id, downloadId));


  return new Response(stream as unknown as ReadableStream, {
    headers: {
      "Content-Disposition": `attachment; filename="${record.name}"`,
      "Content-Type": "application/octet-stream",
    },
  });
}
