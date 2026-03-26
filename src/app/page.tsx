import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      {/* Sticky Nav */}
      <nav className=" z-10 flex items-center justify-between px-8 py-4 border-b border-border/40 backdrop-blur-md bg-background/60 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L2 4.5V9C2 12.04 4.69 14.82 8 15.5C11.31 14.82 14 12.04 14 9V4.5L8 1Z" fill="white" fillOpacity="0.95" />
              <path d="M5.5 9L7 10.5L10.5 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight">vaultr</span>
        </div>

        <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-12">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Now in public beta — free for 5GB
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.08] max-w-3xl mb-6">
          Share files with{" "}
          <span className="text-primary">zero friction</span>,{" "}
          <br className="hidden sm:block" />
          maximum trust.
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
          Send, receive, and store files securely — end-to-end encrypted,
          expiring links, and no account required for recipients.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/25"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2V11M7.5 2L4.5 5M7.5 2L10.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Upload a file free
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors text-sm"
          >
            See how it works
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M3 6.5H10M10 6.5L7 3.5M10 6.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-muted-foreground mb-16">No credit card required · Free forever up to 5GB</p>

        {/* App preview card */}
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
            </div>
            <div className="flex-1 mx-3">
              <div className="h-5 rounded-md bg-background/70 border border-border/60 flex items-center px-3 gap-2">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M4 1C2.34 1 1 2.34 1 4S2.34 7 4 7 7 5.66 7 4 5.66 1 4 1ZM8 8L6.5 6.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] text-muted-foreground">vaultr.app/share/xk92m</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                  <span className="text-[9px] text-accent font-medium">Secure</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-xl border-2 border-dashed border-primary/25 bg-primary/4 p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/40 hover:bg-primary/7 transition-all">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 4V15M11 4L7.5 7.5M11 4L14.5 7.5" stroke="currentColor" className="text-primary" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 18H18" stroke="currentColor" className="text-primary" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Drop files or <span className="text-primary">click to browse</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">Up to 5GB free · All formats supported</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              {[
                { name: "design-system-v2.fig", size: "84 MB", color: "text-primary", bg: "bg-primary/10", icon: "F", time: "Just now" },
                { name: "onboarding-video.mp4", size: "212 MB", color: "text-accent", bg: "bg-accent/10", icon: "V", time: "2 min ago" },
                { name: "contract-final.pdf", size: "1.2 MB", color: "text-destructive", bg: "bg-destructive/10", icon: "P", time: "5 min ago" },
              ].map((file) => (
                <div key={file.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/40 transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${file.bg} flex items-center justify-center text-xs font-bold ${file.color} shrink-0`}>
                    {file.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.time}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/12 text-accent font-medium">Shared</span>
                    <button className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5H11M11 6.5L8 3.5M11 6.5L8 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1L8 4.5H12L9 7L10 11L6.5 9L3 11L4 7L1 4.5H5L6.5 1Z" fill="currentColor" className="text-primary" />
            </svg>
            <span>4.9/5 rating</span>
          </div>
          <div className="w-px h-3 bg-border hidden sm:block" />
          <span>12,000+ files shared</span>
          <div className="w-px h-3 bg-border hidden sm:block" />
          <span>SOC 2 compliant</span>
          <div className="w-px h-3 bg-border hidden sm:block" />
          <span>99.9% uptime</span>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Features</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Everything you need, nothing you don't</h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
            Built for people who value simplicity, security, and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5V10C4 13.31 6.67 16.42 10 17C13.33 16.42 16 13.31 16 10V5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              title: "End-to-end encrypted",
              desc: "Files are encrypted before leaving your device. Only you and your recipient can read them.",
              accent: "text-primary", bg: "bg-primary/10",
            },
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>),
              title: "Expiring links",
              desc: "Set links to expire after a time limit or number of downloads. Stay in full control.",
              accent: "text-accent", bg: "bg-accent/10",
            },
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M4 17C4 14.24 6.69 12 10 12C13.31 12 16 14.24 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>),
              title: "No account needed",
              desc: "Recipients open the link and download instantly. No sign-up, no friction on their end.",
              accent: "text-chart-3", bg: "bg-chart-3/10",
            },
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4H16V14H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 14V17M12 14V17M6 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>),
              title: "Download tracking",
              desc: "See exactly who downloaded your files and when. Full visibility over every share.",
              accent: "text-chart-4", bg: "bg-chart-4/10",
            },
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3L3 7V13L10 17L17 13V7L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 3V17M3 7L10 11L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
              title: "All file types",
              desc: "PDFs, videos, archives, design files — if it's a file, Vaultr can handle it.",
              accent: "text-primary", bg: "bg-primary/10",
            },
            {
              icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 17H3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>),
              title: "Shareable instantly",
              desc: "One click to copy a share link. Paste it anywhere — email, Slack, iMessage.",
              accent: "text-accent", bg: "bg-accent/10",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5 hover:border-primary/25 hover:shadow-sm transition-all">
              <div className={`w-9 h-9 rounded-lg ${f.bg} ${f.accent} flex items-center justify-center mb-4`}>{f.icon}</div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Pricing</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Simple, honest pricing</h2>
          <p className="text-muted-foreground text-sm mt-3">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              name: "Free", price: "$0", period: "forever",
              desc: "Perfect for personal use and occasional sharing.",
              features: ["5 GB storage", "Expiring links", "Download tracking", "All file types", "No account for recipients"],
              cta: "Get started", href: "/login", highlight: false,
            },
            {
              name: "Pro", price: "$9", period: "per month",
              desc: "For power users who share files regularly.",
              features: ["100 GB storage", "Everything in Free", "Password-protected links", "Custom link aliases", "Priority support"],
              cta: "Start free trial", href: "/login", highlight: true,
            },
            {
              name: "Team", price: "$29", period: "per month",
              desc: "For teams that need collaboration and control.",
              features: ["1 TB storage", "Everything in Pro", "Team workspace", "Admin controls", "Audit logs", "SSO / SAML"],
              cta: "Contact sales", href: "mailto:hello@vaultr.app", highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 flex flex-col relative ${plan.highlight ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card"}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-sm whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-foreground tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground mb-1">/{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">{plan.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <circle cx="7" cy="7" r="6" fill="currentColor" className={plan.highlight ? "text-primary" : "text-muted"} />
                      <path d="M4.5 7L6 8.5L9.5 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${plan.highlight ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20" : "border border-border hover:bg-muted text-foreground"}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 px-6 pb-24 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-primary/20 bg-primary/6 px-8 py-14 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L3 6.5V12C3 16.14 6.47 19.92 11 21C15.53 19.92 19 16.14 19 12V6.5L11 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="text-primary" />
              <path d="M7.5 11L9.5 13L14.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Ready to share securely?</h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Join thousands of users who trust Vaultr. Free to get started, no credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
          >
            Start for free
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M3 6.5H10M10 6.5L7 3.5M10 6.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1L1.5 3V6C1.5 7.93 3.07 9.6 5 10C6.93 9.6 8.5 7.93 8.5 6V3L5 1Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span>© 2025 Vaultr. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Status</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
