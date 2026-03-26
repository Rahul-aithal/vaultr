'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const githubLogin = async () => {
    setLoading(true);
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    if (data.error) {
      toast.error("Something went wrong with login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/8 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2L4 6V12C4 15.87 7.13 19.48 11 20C14.87 19.48 18 15.87 18 12V6L11 2Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M8 12L10 14L14 10"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.6"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">vaultr</h1>
          <p className="text-sm text-muted-foreground mt-1">Secure file sharing, simplified</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card shadow-xl shadow-black/5 p-6">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage your files and links
            </p>
          </div>

          {/* Divider with text */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* GitHub button */}
          <Button
            onClick={githubLogin}
            disabled={loading}
            variant="outline"
            className="w-full h-11 rounded-xl gap-3 font-medium border-border hover:bg-muted transition-colors"
          >
            {loading ? (
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                />
                <path
                  d="M14 8C14 4.69 11.31 2 8 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            {loading ? "Signing in…" : "Continue with GitHub"}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-5 leading-relaxed">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          End-to-end encrypted · No account needed to receive files
        </p>
      </div>
    </div>
  );
};

export default Login;
