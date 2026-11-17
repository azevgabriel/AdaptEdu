import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockPrefetch = vi.fn();
export const mockBack = vi.fn();
export const mockForward = vi.fn();
export const mockRefresh = vi.fn();
export const mockRedirect = vi.fn();

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



