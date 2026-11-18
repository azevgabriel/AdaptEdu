import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  AccessibilityIcon,
  ChalkboardIcon,
  ClockIcon,
  DocumentIcon,
  EyeIcon,
  MoonIcon,
  PaletteIcon,
  PrismIcon,
  ResetIcon,
  SettingsIcon,
  SunIcon,
} from "./index";

describe("Tools Icons", () => {
  it("renders AccessibilityIcon with default decorative aria-hidden", () => {
    const { container } = render(<AccessibilityIcon data-testid="a11y-icon" />);
    const svg = screen.getByTestId("a11y-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("renders ChalkboardIcon with title", () => {
    render(<ChalkboardIcon title="Quadro da Turma" />);
    expect(screen.getByRole("img", { name: "Quadro da Turma" })).toBeInTheDocument();
  });

  it("renders ClockIcon with aria-label", () => {
    render(<ClockIcon aria-label="Tempo restante" />);
    expect(screen.getByRole("img", { name: "Tempo restante" })).toBeInTheDocument();
  });

  it("renders DocumentIcon with custom size", () => {
    render(<DocumentIcon size={28} data-testid="doc-icon" />);
    const svg = screen.getByTestId("doc-icon");
    expect(svg).toHaveAttribute("width", "28");
    expect(svg).toHaveAttribute("height", "28");
  });

  it("renders EyeIcon, MoonIcon, PaletteIcon, PrismIcon, ResetIcon, SettingsIcon, SunIcon", () => {
    const { container } = render(
      <>
        <EyeIcon data-testid="eye-icon" />
        <MoonIcon data-testid="moon-icon" />
        <PaletteIcon data-testid="palette-icon" />
        <PrismIcon data-testid="prism-icon" />
        <ResetIcon data-testid="reset-icon" />
        <SettingsIcon data-testid="settings-icon" />
        <SunIcon data-testid="sun-icon" />
      </>
    );

    expect(screen.getByTestId("eye-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("moon-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("palette-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("prism-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("reset-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("settings-icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("sun-icon")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("svg")).toHaveLength(7);
  });
});
