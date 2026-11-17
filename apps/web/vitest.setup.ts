import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockPrefetch = vi.fn();
export const mockBack = vi.fn();
export const mockForward = vi.fn();
export const mockRefresh = vi.fn();
export const mockRedirect = vi.fn();
export const mockAssign = vi.fn();

// Mock window.location.assign
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    ...window.location,
    assign: mockAssign,
  },
});

// Mock Next.js navigation hooks by default
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
  }),
  usePathname: () => "/minha_sala",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

// Mock Next.js fonts
vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "--font-nunito" }),
  Inter: () => ({ variable: "--font-inter" }),
}));
