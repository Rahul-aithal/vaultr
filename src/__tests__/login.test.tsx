import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "@/app/login/page";

const mockSignIn = vi.fn();

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      social: (...args: unknown[]) => mockSignIn(...args),
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("Login page", () => {
  beforeEach(() => {
    mockSignIn.mockReset();
  });

  it("renders the login card", () => {
    render(<Login />);
    expect(screen.getByText("vaultr")).toBeInTheDocument();
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with github/i })).toBeInTheDocument();
  });

  it("shows loading state while signing in", async () => {
    mockSignIn.mockImplementation(() => new Promise(() => {})); // never resolves
    render(<Login />);

    const button = screen.getByRole("button", { name: /continue with github/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent(/signing in/i);
      expect(button).toBeDisabled();
    });
  });

  it("shows error toast when sign in fails", async () => {
    const { toast } = await import("sonner");
    mockSignIn.mockResolvedValue({ error: { message: "OAuth failed" } });

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /continue with github/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong with login");
    });
  });

  it("calls signIn with github provider and correct callbackURL", async () => {
    mockSignIn.mockResolvedValue({ error: null });
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /continue with github/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        provider: "github",
        callbackURL: "/dashboard",
      });
    });
  });

  it("renders Terms and Privacy links", () => {
    render(<Login />);
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
  });
});