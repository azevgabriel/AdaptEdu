import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserIcon, UsersIcon } from "./index";

describe("People Icons", () => {
  it("renders UserIcon with default decorative aria-hidden", () => {
    const { container } = render(<UserIcon data-testid="user-icon" />);
    const svg = screen.getByTestId("user-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("renders UsersIcon with title as accessible image", () => {
    render(<UsersIcon title="Estudantes e Turmas" data-testid="users-icon" />);
    const svg = screen.getByRole("img", { name: "Estudantes e Turmas" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
    expect(screen.getByText("Estudantes e Turmas")).toBeInTheDocument();
  });
});
