import { db } from "@/db/drizzle";
import { download, file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { downloadColumns } from "./download-columns"; // new columns file

const Dashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  // Files created by me
  const files = await db
    .select({
      name: file.name,
      link: file.link,
      downloads: file.downloads,
      maxDownloads: file.maxDownloads,
      enabled: file.enabled,
    })
    .from(file)
    .where(eq(file.createdBy, session.user.id));

  // Files downloaded by me
  const myDownloads = await db
    .select({
      fileName: file.name,
      fileLink: file.link,
      downloadedAt: download.createdAt,
      status: download.status,
    })
    .from(download)
    .innerJoin(file, eq(download.fileId, file.id))
    .where(eq(download.userId, session.user.id));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Files</h1>
      <DataTable columns={columns} data={files} />

      <h1 className="text-2xl font-bold mb-6 mt-10">My Downloads</h1>
      <DataTable columns={downloadColumns} data={myDownloads} />
    </div>
  );
};

export default Dashboard;
