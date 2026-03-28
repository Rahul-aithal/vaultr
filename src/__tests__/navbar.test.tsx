import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "@/components/Navbar";

import "@testing-library/jest-dom";

vi.mock("next/image", () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockGetSession = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
    },
  },
}));

describe("Navbar — logged out", () => {
  it("renders sign in and get started links", async () => {
    mockGetSession.mockResolvedValue(null);
    render(await Navbar());

    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: /get started free/i })).toHaveAttribute("href", "/login");
  });

  it("renders the vaultr logo text", async () => {
    mockGetSession.mockResolvedValue(null);
    render(await Navbar());
    expect(screen.getByText("vaultr")).toBeInTheDocument();
  });

  it("does not show Dashboard link when logged out", async () => {
    mockGetSession.mockResolvedValue(null);
    render(await Navbar());
    expect(screen.queryByRole("link", { name: /^dashboard$/i })).not.toBeInTheDocument();
  });
});

describe("Navbar — logged in", () => {
  const mockSession = {
    user: { id: "user_1", name: "John Doe", email: "john@example.com" },
  };

  it("shows user's first name", async () => {
    mockGetSession.mockResolvedValue(mockSession);
    render(await Navbar());
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("shows user's initial in avatar", async () => {
    mockGetSession.mockResolvedValue(mockSession);
    render(await Navbar());
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("shows Dashboard link when logged in", async () => {
    mockGetSession.mockResolvedValue(mockSession);
    render(await Navbar());
    const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
    expect(dashboardLinks.length).toBeGreaterThan(0);
    dashboardLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/dashboard");
    });
  });

  it("does not show Sign in link when logged in", async () => {
    mockGetSession.mockResolvedValue(mockSession);
    render(await Navbar());
    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
  });
});