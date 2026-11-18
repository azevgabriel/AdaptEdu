import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseIcon } from "./base-icon";

describe("BaseIcon", () => {
  it("renders with default props (decorative, 24x24, focusable false)", () => {
    render(
      <BaseIcon data-testid="base-icon">
        <path d="M0 0" />
      </BaseIcon>
    );

    const svg = screen.getByTestId("base-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("handles width and height overrides over size", () => {
    render(
      <BaseIcon size={24} width={48} height={32} data-testid="custom-size">
        <path d="M0 0" />
      </BaseIcon>
    );

    const svg = screen.getByTestId("custom-size");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("renders with title, sets role img, title element and aria-labelledby", () => {
    render(
      <BaseIcon title="Ícone Informativo" data-testid="accessible-title">
        <path d="M0 0" />
      </BaseIcon>
    );

    const svg = screen.getByRole("img", { name: "Ícone Informativo" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
    expect(screen.getByText("Ícone Informativo")).toBeInTheDocument();
  });

  it("renders with aria-label, sets role img", () => {
    render(
      <BaseIcon aria-label="Rótulo acessível" data-testid="accessible-label">
        <path d="M0 0" />
      </BaseIcon>
    );

    const svg = screen.getByRole("img", { name: "Rótulo acessível" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("allows explicit role and aria-hidden overrides", () => {
    render(
      <BaseIcon
        role="presentation"
        aria-hidden={false}
        data-testid="overridden-props"
      >
        <path d="M0 0" />
      </BaseIcon>
    );

    const svg = screen.getByTestId("overridden-props");
    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg).toHaveAttribute("aria-hidden", "false");
  });

  it("supports custom styling props like fill, stroke, strokeWidth", () => {
    render(
      <BaseIcon
        fill="#ff0000"
        stroke="#00ff00"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="bevel"
        viewBox="0 0 48 48"
        data-testid="styled-icon"
      >
        <circle cx="24" cy="24" r="10" />
      </BaseIcon>
    );

    const svg = screen.getByTestId("styled-icon");
    expect(svg).toHaveAttribute("fill", "#ff0000");
    expect(svg).toHaveAttribute("stroke", "#00ff00");
    expect(svg).toHaveAttribute("stroke-width", "3");
    expect(svg).toHaveAttribute("stroke-linecap", "square");
    expect(svg).toHaveAttribute("stroke-linejoin", "bevel");
    expect(svg).toHaveAttribute("viewBox", "0 0 48 48");
  });
});
