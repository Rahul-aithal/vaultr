import { db } from "@/db/drizzle";
import { download, file as fileTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { downloadColumns } from "./download-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L4 5V10C4 13.31 6.67 16.42 10 17C13.33 16.42 16 13.31 16 10V5L10 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="text-muted-foreground"
              />
            </svg>
          </div>
          <p className="text-muted-foreground text-sm">Not authenticated</p>
          <Link href="/login">
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  const files = await db
    .select({
      name: fileTable.name,
      link: fileTable.link,
      downloads: fileTable.downloads,
      maxDownloads: fileTable.maxDownloads,
      enabled: fileTable.enabled,
      allowUnkonwn:fileTable.allowUnkonwn
    })
    .from(fileTable)
    .where(eq(fileTable.createdBy, session.user.id));

  const myDownloads = await db
    .select({
      name: fileTable.name,
      fileLink: fileTable.link,
      downloadedAt: download.createdAt,
      status: download.status,
    })
    .from(download)
    .innerJoin(fileTable, eq(download.fileId, fileTable.id))
    .where(eq(download.userId, session.user.id));

  const totalDownloads = files.reduce((sum, f) => sum + (f.downloads ?? 0), 0);
  const activeFiles = files.filter((f) => f.enabled).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your files and track downloads in one place.
            </p>
          </div>
          <Link href="/dashboard/upload">
            <Button className="gap-2 rounded-full px-5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2V10M7 2L4 5M7 2L10 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M2 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Upload File
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            {
              label: "Total Files",
              value: files.length,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2H9L13 6V14H3V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M9 2V6H13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              ),
              accent: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Active Files",
              value: activeFiles,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              accent: "text-accent",
              bg: "bg-accent/10",
            },
            {
              label: "Total Downloads",
              value: totalDownloads,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 13H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              accent: "text-chart-3",
              bg: "bg-chart-3/10",
            },
            {
              label: "My Downloads",
              value: myDownloads.length,
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M3 13C3 10.79 5.24 9 8 9C10.76 9 13 10.79 13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              accent: "text-chart-4",
              bg: "bg-chart-4/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-4 py-4 flex items-center gap-3 hover:border-primary/20 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bg} ${stat.accent} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground leading-none">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* My Files section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-primary" />
              <h2 className="text-base font-semibold text-foreground">My Files</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {files.length}
              </span>
            </div>
            <Link href="/dashboard/upload">
              <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5 h-7 px-3">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                New file
              </Button>
            </Link>
          </div>

          {files.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M4 3H13L18 8V19H4V3Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  />
                  <path
                    d="M13 3V8H18"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  />
                  <path
                    d="M8 13H14M11 10V16"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="text-muted-foreground"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">No files yet</p>
                <p className="text-xs text-muted-foreground mt-0.5">Upload your first file to get started</p>
              </div>
              <Link href="/dashboard/upload">
                <Button size="sm" className="rounded-full mt-1">
                  Upload a file
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <DataTable columns={columns} data={files} />
            </div>
          )}
        </div>

        {/* My Downloads section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-accent" />
            <h2 className="text-base font-semibold text-foreground">My Downloads</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              {myDownloads.length}
            </span>
          </div>

          {myDownloads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 py-16 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 4V14M11 14L7 10M11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  />
                  <path
                    d="M4 18H18"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="text-muted-foreground"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">No downloads yet</p>
                <p className="text-xs text-muted-foreground mt-0.5">Files you download will appear here</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <DataTable columns={downloadColumns} data={myDownloads} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
