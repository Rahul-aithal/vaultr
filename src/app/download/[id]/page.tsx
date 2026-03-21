import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const DownloadPage = async ({ params }: Props) => {
  const { id } = await params;

  const record = await db
    .select()
    .from(file)
    .where(eq(file.id, id))
    .then((r) => r[0]);

  if (!record) {
    return <div>File not found.</div>;
  }

  if (!record.enabled) {
    return <div>This link is disabled.</div>;
  }

  if (new Date() > record.expiresAt) {
    return <div>This link has expired.</div>;
  }

  if (record.downloads! >= record.maxDownloads!) {
    return <div>Max downloads reached.</div>;
  }

  if (!record.allowUnkonwn) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      redirect("/login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">{record.name}</h1>
      <a
        href={`/api/download/${id}`}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Download
      </a>
    </div>
  );
};

export default DownloadPage;
