
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4C2 2.9 2.9 2 4 2H12C13.1 2 14 2.9 14 4V10C14 11.1 13.1 12 12 12H9L8 14L7 12H4C2.9 12 2 11.1 2 10V4Z" fill="currentColor" className="text-primary-foreground" />
              <path d="M5 6H11M5 8.5H9" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight">vaultr</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Now in public beta — free for 5GB
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6">
          Share files with{" "}
          <span className="text-primary">zero friction</span>,<br />
          maximum trust.
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
          Vaultr lets you send, receive, and store files securely — with end-to-end encryption,
          expiring links, and no account required for recipients.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-20">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Upload a file free
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors text-sm"
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* App preview card */}
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="flex-1 mx-4">
              <div className="h-5 rounded-md bg-background/80 border border-border flex items-center px-3 gap-2">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M4.5 1C2.567 1 1 2.567 1 4.5S2.567 8 4.5 8 8 6.433 8 4.5 6.433 1 4.5 1zM9 9L7.5 7.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-[10px] text-muted-foreground">vaultr.app/share/xk92m</span>
              </div>
            </div>
          </div>

          {/* Drop zone */}
          <div className="p-6">
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/8 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V16M12 4L8 8M12 4L16 8" stroke="currentColor" className="text-primary" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18H20" stroke="currentColor" className="text-primary" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Drop files here or <span className="text-primary">browse</span></p>
                <p className="text-xs text-muted-foreground mt-1">Up to 5GB free · All file types supported</p>
              </div>
            </div>

            {/* Recent uploads */}
            <div className="mt-4 space-y-2">
              {[
                { name: "design-system-v2.fig", size: "84 MB", color: "text-primary", icon: "F", time: "Just now", done: true },
                { name: "onboarding-video.mp4", size: "212 MB", color: "text-accent", icon: "V", time: "2 min ago", done: true },
                { name: "contract-final.pdf", size: "1.2 MB", color: "text-destructive", icon: "P", time: "5 min ago", done: true },
              ].map((file) => (
                <div key={file.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold ${file.color}`}>
                    {file.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.done && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">Shared</span>
                    )}
                    <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7H12M12 7L8.5 3.5M12 7L8.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L4 5V10C4 13.31 6.67 16.42 10 17C13.33 16.42 16 13.31 16 10V5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "End-to-end encrypted",
              desc: "Files are encrypted before leaving your device. Only you and your recipient can read them.",
              accent: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: "Expiring links",
              desc: "Set links to expire after a time limit or number of downloads. Stay in control.",
              accent: "text-accent",
              bg: "bg-accent/10",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4H16V14H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M8 14V17M12 14V17M6 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: "No account needed",
              desc: "Recipients open the link and download instantly. No sign-up, no friction.",
              accent: "text-chart-3",
              bg: "bg-chart-3/10",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
              <div className={`w-9 h-9 rounded-lg ${f.bg} ${f.accent} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3C2 2.45 2.45 2 3 2H7C7.55 2 8 2.45 8 3V7C8 7.55 7.55 8 7 8H5.5L5 9L4.5 8H3C2.45 8 2 7.55 2 7V3Z" fill="white"/>
            </svg>
          </div>
          <span>© 2025 Vaultr. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
}
