import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Next.js navigation hooks by default
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/minha_sala",
  useSearchParams: () => new URLSearchParams(),
}));

