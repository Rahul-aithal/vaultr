import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import SVGIMG from "../../public/logo.svg";
import Image from "next/image";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <nav className="z-10 flex items-center justify-between px-8 py-4 border-b border-border/40 backdrop-blur-md bg-background/60 sticky top-0">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image src={SVGIMG} alt={""}/>
        <span className="text-base font-bold tracking-tight capitalize">vaultr</span>
      </Link>

      {/* Nav links */}
      <div className="hidden  items-center justify-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
      </div>

      {/* Auth area */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {user.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <span className="text-sm text-muted-foreground">{user.name?.split(" ")[0]}</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <Link
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
            >
              Get started free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}