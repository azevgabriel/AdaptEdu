import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ChevronDownIcon,
  CloseIcon,
  HomeIcon,
  LogoutIcon,
} from "./index";

describe("Navigation Icons", () => {
  it("renders ChevronDownIcon with default decorative aria-hidden", () => {
    const { container } = render(<ChevronDownIcon data-testid="chevron-icon" />);
    const svg = screen.getByTestId("chevron-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(container.querySelector("polyline")).toBeInTheDocument();
  });

  it("renders CloseIcon with title and accessible img role", () => {
    render(<CloseIcon title="Fechar modal" data-testid="close-icon" />);
    const svg = screen.getByRole("img", { name: "Fechar modal" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
    expect(screen.getByText("Fechar modal")).toBeInTheDocument();
  });

  it("renders HomeIcon with custom size and aria-label", () => {
    render(
      <HomeIcon
        size={32}
        aria-label="Página inicial"
        data-testid="home-icon"
      />
    );
    const svg = screen.getByRole("img", { name: "Página inicial" });
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("renders LogoutIcon with custom dimensions overriding size", () => {
    render(
      <LogoutIcon
        size={24}
        width={40}
        height={40}
        data-testid="logout-icon"
      />
    );
    const svg = screen.getByTestId("logout-icon");
    expect(svg).toHaveAttribute("width", "40");
    expect(svg).toHaveAttribute("height", "40");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
