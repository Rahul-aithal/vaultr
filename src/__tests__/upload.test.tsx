import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import UploadPage from "@/app/dashboard/upload/page";

const mockUploadFile = vi.fn();

vi.mock("@/app/dashboard/upload/actions", () => ({
  uploadFile: (...args: unknown[]) => mockUploadFile(...args),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("UploadPage", () => {
  beforeEach(() => {
    mockUploadFile.mockReset();
    mockUploadFile.mockResolvedValue(undefined);
  });

  it("renders the upload dropzone", () => {
    render(<UploadPage />);
    expect(screen.getByText(/drop your file here/i)).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<UploadPage />);
    expect(screen.getByPlaceholderText(/project brief/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument(); // max downloads number input
  });

  it("renders both toggle switches", () => {
    render(<UploadPage />);
    expect(screen.getByText("Enable link")).toBeInTheDocument();
    expect(screen.getByText("Allow unknown users")).toBeInTheDocument();
  });

  it("shows selected file name after file is chosen", async () => {
    render(<UploadPage />);

    const file = new File(["hello"], "report.pdf", { type: "application/pdf" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText("report.pdf")).toBeInTheDocument();
    });
  });

  it("shows loading state while uploading", async () => {
    mockUploadFile.mockImplementation(() => new Promise(() => {}));
    render(<UploadPage />);

    const nameInput = screen.getByPlaceholderText(/project brief/i);
    const expiresInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["hello"], "report.pdf", { type: "application/pdf" });
    await userEvent.upload(fileInput, file);
    
    await userEvent.clear(nameInput);
    // await userEvent.type(nameInput, "My Report");
    
    fireEvent.change(expiresInput, { target: { value: "2025-12-31T23:59" } });
    
    fireEvent.submit(
      screen.getByRole("button", { name: /upload file/i }).closest("form")!
    );
    await waitFor(() => {
      expect(screen.getByText(/uploading/i)).toBeInTheDocument();
    });
  });

  it("calls uploadFile with correct formData values", async () => {
    render(<UploadPage />);

    const nameInput = screen.getByPlaceholderText(/project brief/i);
    const expiresInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["hello"], "report.pdf", { type: "application/pdf" });

    await userEvent.upload(fileInput, file);
    await userEvent.type(nameInput, "My Report");
    fireEvent.change(expiresInput, { target: { value: "2025-12-31T23:59" } });

    fireEvent.submit(screen.getByRole("button", { name: /upload file/i }).closest("form")!);

    await waitFor(() => {
      expect(mockUploadFile).toHaveBeenCalledTimes(1);
      const formData: FormData = mockUploadFile.mock.calls[0][0];
      // expect(formData.get("name")).toBe("report.pdf");
      expect(formData.get("enabled")).toBe("true");
      expect(formData.get("allowUnknown")).toBe("true");
    });
  });

  it("back link points to /dashboard", () => {
    render(<UploadPage />);
    expect(screen.getByRole("link", { name: "" }).closest("a")).toHaveAttribute("href", "/dashboard");
  });
});