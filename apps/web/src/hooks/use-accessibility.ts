"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

export type ColorVisionMode =
  | "default"
  | "deuteranopia"
  | "protanopia"
  | "tritanopia"
  | "achromatopsia";

export type FontSizeMode = "normal" | "large" | "x-large";

export interface AccessibilitySettings {
  theme: ThemeMode;
  cvdMode: ColorVisionMode;
  fontSize: FontSizeMode;
  dyslexiaFont: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

export const STORAGE_KEYS = {
  THEME: "adaptedu_theme",
  CVD_MODE: "adaptedu_cvd_mode",
  FONT_SIZE: "adaptedu_font_size",
  DYSLEXIA: "adaptedu_dyslexia",
  HIGH_CONTRAST: "adaptedu_high_contrast",
  REDUCED_MOTION: "adaptedu_reduced_motion",
} as const;

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  theme: "light",
  cvdMode: "default",
  fontSize: "normal",
  dyslexiaFont: false,
  highContrast: false,
  reducedMotion: false,
};

const emptySubscribe = () => () => {};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(
    DEFAULT_ACCESSIBILITY_SETTINGS
  );
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Apply DOM attributes to document.documentElement
  const applySettingsToDOM = useCallback((newSettings: AccessibilitySettings) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    // Theme (Light / Dark)
    root.setAttribute("data-theme", newSettings.theme);

    // Color Vision Deficiency (CVD)
    if (newSettings.cvdMode === "default") {
      root.removeAttribute("data-cvd");
    } else {
      root.setAttribute("data-cvd", newSettings.cvdMode);
    }

    // Font Sizing Scale
    if (newSettings.fontSize === "normal") {
      root.removeAttribute("data-font-size");
    } else {
      root.setAttribute("data-font-size", newSettings.fontSize);
    }

    // Reading & Dyslexia Accommodation
    if (newSettings.dyslexiaFont) {
      root.setAttribute("data-dyslexia", "true");
    } else {
      root.removeAttribute("data-dyslexia");
    }

    // High Contrast Mode
    if (newSettings.highContrast) {
      root.setAttribute("data-high-contrast", "true");
    } else {
      root.removeAttribute("data-high-contrast");
    }

    // Reduced Motion Mode
    if (newSettings.reducedMotion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }
  }, []);

  // Initial load from localStorage and system preferences
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Read stored values or fall back to system defaults
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null;
    const systemPrefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: ThemeMode =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : systemPrefersDark
        ? "dark"
        : "light";

    const storedCvd = localStorage.getItem(STORAGE_KEYS.CVD_MODE) as ColorVisionMode | null;
    const validCvdModes: ColorVisionMode[] = [
      "default",
      "deuteranopia",
      "protanopia",
      "tritanopia",
      "achromatopsia",
    ];
    const initialCvd: ColorVisionMode =
      storedCvd && validCvdModes.includes(storedCvd) ? storedCvd : "default";

    const storedFontSize = localStorage.getItem(
      STORAGE_KEYS.FONT_SIZE
    ) as FontSizeMode | null;
    const validFontSizes: FontSizeMode[] = ["normal", "large", "x-large"];
    const initialFontSize: FontSizeMode =
      storedFontSize && validFontSizes.includes(storedFontSize)
        ? storedFontSize
        : "normal";

    const initialDyslexia =
      localStorage.getItem(STORAGE_KEYS.DYSLEXIA) === "true";

    const initialHighContrast =
      localStorage.getItem(STORAGE_KEYS.HIGH_CONTRAST) === "true";

    const storedReducedMotion = localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION);
    const systemPrefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialReducedMotion =
      storedReducedMotion !== null
        ? storedReducedMotion === "true"
        : systemPrefersReducedMotion;

    const initialSettings: AccessibilitySettings = {
      theme: initialTheme,
      cvdMode: initialCvd,
      fontSize: initialFontSize,
      dyslexiaFont: initialDyslexia,
      highContrast: initialHighContrast,
      reducedMotion: initialReducedMotion,
    };

    // Synchronize client-side settings from localStorage on initial mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(initialSettings);
    applySettingsToDOM(initialSettings);
  }, [applySettingsToDOM]);

  // Set individual settings with persistence
  const setTheme = useCallback(
    (theme: ThemeMode) => {
      setSettings((prev) => {
        const next = { ...prev, theme };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.THEME, theme);
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const toggleTheme = useCallback(() => {
    setTheme(settings.theme === "dark" ? "light" : "dark");
  }, [settings.theme, setTheme]);

  const setCvdMode = useCallback(
    (cvdMode: ColorVisionMode) => {
      setSettings((prev) => {
        const next = { ...prev, cvdMode };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.CVD_MODE, cvdMode);
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const setFontSize = useCallback(
    (fontSize: FontSizeMode) => {
      setSettings((prev) => {
        const next = { ...prev, fontSize };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize);
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const setDyslexiaFont = useCallback(
    (dyslexiaFont: boolean) => {
      setSettings((prev) => {
        const next = { ...prev, dyslexiaFont };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.DYSLEXIA, String(dyslexiaFont));
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const setHighContrast = useCallback(
    (highContrast: boolean) => {
      setSettings((prev) => {
        const next = { ...prev, highContrast };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.HIGH_CONTRAST, String(highContrast));
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const setReducedMotion = useCallback(
    (reducedMotion: boolean) => {
      setSettings((prev) => {
        const next = { ...prev, reducedMotion };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, String(reducedMotion));
        }
        applySettingsToDOM(next);
        return next;
      });
    },
    [applySettingsToDOM]
  );

  const resetSettings = useCallback(() => {
    const next: AccessibilitySettings = {
      ...DEFAULT_ACCESSIBILITY_SETTINGS,
      theme: settings.theme, // Preserve current theme choice or reset as desired
    };
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.CVD_MODE);
      localStorage.removeItem(STORAGE_KEYS.FONT_SIZE);
      localStorage.removeItem(STORAGE_KEYS.DYSLEXIA);
      localStorage.removeItem(STORAGE_KEYS.HIGH_CONTRAST);
      localStorage.removeItem(STORAGE_KEYS.REDUCED_MOTION);
    }
    setSettings(next);
    applySettingsToDOM(next);
  }, [applySettingsToDOM, settings.theme]);

  // Check if non-default accessibility accommodations are currently enabled
  const hasActiveAccommodations =
    settings.cvdMode !== "default" ||
    settings.fontSize !== "normal" ||
    settings.dyslexiaFont ||
    settings.highContrast ||
    settings.reducedMotion;

  return {
    settings,
    isMounted,
    theme: settings.theme,
    cvdMode: settings.cvdMode,
    fontSize: settings.fontSize,
    dyslexiaFont: settings.dyslexiaFont,
    highContrast: settings.highContrast,
    reducedMotion: settings.reducedMotion,
    hasActiveAccommodations,
    setTheme,
    toggleTheme,
    setCvdMode,
    setFontSize,
    setDyslexiaFont,
    setHighContrast,
    setReducedMotion,
    resetSettings,
  };
}
