import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useAccessibility,
  STORAGE_KEYS,
} from "./use-accessibility";

describe("useAccessibility Hook", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-cvd");
    document.documentElement.removeAttribute("data-font-size");
    document.documentElement.removeAttribute("data-dyslexia");
    document.documentElement.removeAttribute("data-high-contrast");
    document.documentElement.removeAttribute("data-reduced-motion");
    vi.clearAllMocks();
  });

  it("initializes with default settings when localStorage is empty", () => {
    const { result } = renderHook(() => useAccessibility());

    expect(result.current.theme).toBe("light");
    expect(result.current.cvdMode).toBe("default");
    expect(result.current.fontSize).toBe("normal");
    expect(result.current.dyslexiaFont).toBe(false);
    expect(result.current.highContrast).toBe(false);
    expect(result.current.hasActiveAccommodations).toBe(false);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.getAttribute("data-cvd")).toBeNull();
  });

  it("loads stored settings from localStorage", () => {
    localStorage.setItem(STORAGE_KEYS.THEME, "dark");
    localStorage.setItem(STORAGE_KEYS.CVD_MODE, "deuteranopia");
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, "large");
    localStorage.setItem(STORAGE_KEYS.DYSLEXIA, "true");
    localStorage.setItem(STORAGE_KEYS.HIGH_CONTRAST, "true");
    localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, "true");

    const { result } = renderHook(() => useAccessibility());

    expect(result.current.theme).toBe("dark");
    expect(result.current.cvdMode).toBe("deuteranopia");
    expect(result.current.fontSize).toBe("large");
    expect(result.current.dyslexiaFont).toBe(true);
    expect(result.current.highContrast).toBe(true);
    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.hasActiveAccommodations).toBe(true);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.getAttribute("data-cvd")).toBe("deuteranopia");
    expect(document.documentElement.getAttribute("data-font-size")).toBe("large");
    expect(document.documentElement.getAttribute("data-dyslexia")).toBe("true");
    expect(document.documentElement.getAttribute("data-high-contrast")).toBe("true");
    expect(document.documentElement.getAttribute("data-reduced-motion")).toBe("true");
  });

  it("toggles theme correctly between light and dark", () => {
    const { result } = renderHook(() => useAccessibility());

    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("updates individual accessibility settings and applies DOM attributes", () => {
    const { result } = renderHook(() => useAccessibility());

    act(() => {
      result.current.setCvdMode("protanopia");
    });
    expect(result.current.cvdMode).toBe("protanopia");
    expect(localStorage.getItem(STORAGE_KEYS.CVD_MODE)).toBe("protanopia");
    expect(document.documentElement.getAttribute("data-cvd")).toBe("protanopia");

    act(() => {
      result.current.setFontSize("x-large");
    });
    expect(result.current.fontSize).toBe("x-large");
    expect(localStorage.getItem(STORAGE_KEYS.FONT_SIZE)).toBe("x-large");
    expect(document.documentElement.getAttribute("data-font-size")).toBe("x-large");

    act(() => {
      result.current.setDyslexiaFont(true);
    });
    expect(result.current.dyslexiaFont).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.DYSLEXIA)).toBe("true");
    expect(document.documentElement.getAttribute("data-dyslexia")).toBe("true");

    act(() => {
      result.current.setHighContrast(true);
    });
    expect(result.current.highContrast).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.HIGH_CONTRAST)).toBe("true");
    expect(document.documentElement.getAttribute("data-high-contrast")).toBe("true");

    act(() => {
      result.current.setReducedMotion(true);
    });
    expect(result.current.reducedMotion).toBe(true);
    expect(localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION)).toBe("true");
    expect(document.documentElement.getAttribute("data-reduced-motion")).toBe("true");
  });

  it("resets accessibility settings to defaults", () => {
    const { result } = renderHook(() => useAccessibility());

    act(() => {
      result.current.setCvdMode("achromatopsia");
      result.current.setFontSize("large");
      result.current.setDyslexiaFont(true);
      result.current.setHighContrast(true);
      result.current.setReducedMotion(true);
    });

    expect(result.current.hasActiveAccommodations).toBe(true);

    act(() => {
      result.current.resetSettings();
    });

    expect(result.current.cvdMode).toBe("default");
    expect(result.current.fontSize).toBe("normal");
    expect(result.current.dyslexiaFont).toBe(false);
    expect(result.current.highContrast).toBe(false);
    expect(result.current.reducedMotion).toBe(false);
    expect(result.current.hasActiveAccommodations).toBe(false);

    expect(document.documentElement.getAttribute("data-cvd")).toBeNull();
    expect(document.documentElement.getAttribute("data-font-size")).toBeNull();
    expect(document.documentElement.getAttribute("data-dyslexia")).toBeNull();
    expect(document.documentElement.getAttribute("data-high-contrast")).toBeNull();
    expect(document.documentElement.getAttribute("data-reduced-motion")).toBeNull();
  });
});
