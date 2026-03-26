import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { file } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";

interface Props {
  searchParams: Promise<{ id: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const record = await db
    .select({ name: file.name, id: file.id })
    .from(file)
    .where(eq(file.id, id))
    .then((r) => r[0]);

  if (!record) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" className="text-destructive" />
              <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-destructive" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">File not found</p>
          <p className="text-xs text-muted-foreground">This file may have been deleted or never existed.</p>
          <Link href="/dashboard" className="inline-block text-xs text-primary underline underline-offset-2 mt-1">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/download/${record.id}`;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-6">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/7 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center gap-6">

        {/* Success icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-accent/15 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M9 18L15 24L27 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              />
            </svg>
          </div>
          {/* Ping ring */}
          <div className="absolute inset-0 rounded-3xl border-2 border-accent/30 animate-ping" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Upload successful!</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">{record.name}</span> is ready to share.
            Anyone with the link can download it.
          </p>
        </div>

        {/* Link card */}
        <div className="w-full rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M5 6.5C5.55 7.33 6.66 7.55 7.5 7L9 5.5C9.83 4.67 9.83 3.33 9 2.5C8.17 1.67 6.83 1.67 6 2.5L5.25 3.25"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="text-primary"
                />
                <path
                  d="M7 5.5C6.45 4.67 5.34 4.45 4.5 5L3 6.5C2.17 7.33 2.17 8.67 3 9.5C3.83 10.33 5.17 10.33 6 9.5L6.75 8.75"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
            </div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Share link</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-foreground truncate flex-1 font-mono">{downloadLink}</p>
            <CopyButton text={downloadLink} />
          </div>

          <p className="text-[11px] text-muted-foreground text-left">
            This link is unique to your file. Share it with anyone you want to give access to.
          </p>
        </div>

        {/* What's next */}
        <div className="w-full rounded-xl border border-border bg-card p-4 text-left flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">What's next</p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: "📋", text: "Copy the link above and share it via email, Slack, or anywhere." },
              { icon: "📊", text: "Track downloads from your dashboard in real time." },
              { icon: "⏱️", text: "The link will expire based on the settings you configured." },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <span className="text-base leading-none mt-0.5">{item.icon}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-2.5">
          <Link
            href="/dashboard/upload"
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2V9M7 2L4.5 4.5M7 2L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Upload another file
          </Link>
          <Link
            href="/dashboard"
            className="w-full h-11 rounded-xl border border-border text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-muted transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H9M2 7L5 4M2 7L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}