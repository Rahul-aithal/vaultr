import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

function StatusPage({
  icon,
  iconBg,
  iconColor,
  title,
  desc,
  action,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/6 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-[110px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-sm">
        <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
        {action}
        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1">
          Powered by <span className="font-semibold text-foreground">vaultr</span>
        </Link>
      </div>
    </div>
  );
}

const DownloadPage = async ({ params }: Props) => {
  const { id } = await params;

  const record = await db
    .select()
    .from(file)
    .where(eq(file.id, id))
    .then((r) => r[0]);

  if (!record) {
    return (
      <StatusPage
        iconBg="bg-muted"
        iconColor="text-muted-foreground"
        icon={
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 4H18L22 8V24H6V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M18 4V8H22" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M10 16H18M10 20H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        }
        title="File not found"
        desc="This file doesn't exist or may have been deleted by its owner."
      />
    );
  }

  if (!record.enabled) {
    return (
      <StatusPage
        iconBg="bg-muted"
        iconColor="text-muted-foreground"
        icon={
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="7" y="12" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 12V9C10 7.34 11.34 6 13 6H15C16.66 6 18 7.34 18 9V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="14" cy="17" r="1.5" fill="currentColor" />
          </svg>
        }
        title="Link disabled"
        desc="The owner has disabled this link. It's no longer available for download."
      />
    );
  }

  if (new Date() > record.expiresAt) {
    return (
      <StatusPage
        iconBg="bg-destructive/10"
        iconColor="text-destructive"
        icon={
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 8V14L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M8 4L4 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M20 4L24 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        }
        title="Link expired"
        desc="This download link has passed its expiry date and is no longer valid."
      />
    );
  }

  if (record.downloads! >= record.maxDownloads!) {
    return (
      <StatusPage
        iconBg="bg-destructive/10"
        iconColor="text-destructive"
        icon={
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6V16M14 16L10 12M14 16L18 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 20H22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="21" cy="8" r="4" fill="currentColor" className="text-destructive" />
            <path d="M19.5 8H22.5M21 6.5V9.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        }
        title="Download limit reached"
        desc="This file has reached its maximum number of allowed downloads."
      />
    );
  }

  if (!record.allowUnkonwn) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      redirect("/login");
    }
  }

  const getFileExt = (name: string) => name.split(".").pop()?.toUpperCase() ?? "FILE";
  const getFileStyle = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (["mp4", "mov", "avi", "mkv"].includes(ext ?? "")) return { color: "text-accent", bg: "bg-accent/10" };
    if (["pdf"].includes(ext ?? "")) return { color: "text-destructive", bg: "bg-destructive/10" };
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext ?? "")) return { color: "text-chart-3", bg: "bg-chart-3/10" };
    if (["zip", "rar", "tar", "gz"].includes(ext ?? "")) return { color: "text-chart-4", bg: "bg-chart-4/10" };
    return { color: "text-primary", bg: "bg-primary/10" };
  };

  const style = getFileStyle(record.name);
  const ext = getFileExt(record.name);
  const downloadsLeft = (record.maxDownloads ?? 0) - (record.downloads ?? 0);
  const isAlmostGone = downloadsLeft <= 3;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center gap-6">

        {/* File icon */}
        <div className={`w-20 h-20 rounded-3xl ${style.bg} ${style.color} flex items-center justify-center`}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M8 5H22L28 11V31H8V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M22 5V11H28" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M13 19H23M13 23H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* File info */}
        <div className="space-y-1.5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${style.bg} ${style.color} mb-1`}>
            {ext} file
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground leading-tight">{record.name}</h1>
          <p className="text-sm text-muted-foreground">
            Shared securely via <span className="font-semibold text-foreground">vaultr</span>
          </p>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1C3.01 1 1 3.01 1 5.5S3.01 10 5.5 10 10 7.99 10 5.5 7.99 1 5.5 1Z" stroke="currentColor" strokeWidth="1.1" />
              <path d="M5.5 3V5.5L7 6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Expires {new Date(record.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
            isAlmostGone
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-border bg-card text-muted-foreground"
          }`}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 2V7M5.5 7L3.5 5M5.5 7L7.5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.5 9H9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            {downloadsLeft} download{downloadsLeft !== 1 ? "s" : ""} left
          </div>

        </div>

        {/* Download button */}
        <a
          href={`/api/download/${id}`}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 13H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Download file
        </a>

        {/* Warning if almost gone */}
        {isAlmostGone && (
          <div className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-destructive/20 bg-destructive/5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-destructive">
              <path d="M7 2L1 12H13L7 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M7 6V8.5M7 10H7.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-destructive">
              Only <strong>{downloadsLeft}</strong> download{downloadsLeft !== 1 ? "s" : ""} remaining — grab it while you can.
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
            vaultr
          </Link>{" "}
          · End-to-end encrypted file sharing
        </p>
      </div>
    </div>
  );
};

export default DownloadPage;
