import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => {
    return React.createElement("img", props);
  },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).ResizeObserver = ResizeObserver;