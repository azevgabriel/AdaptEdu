import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardDescription } from "./index";

describe("CardDescription", () => {
  it("renders description paragraph text", () => {
    render(<CardDescription>Descrição do plano pedagógico</CardDescription>);
    expect(screen.getByText("Descrição do plano pedagógico")).toBeInTheDocument();
  });

  it("complies with dyslexia invariant by not applying italic styling", () => {
    render(<CardDescription>Texto descritivo legível</CardDescription>);
    const desc = screen.getByText("Texto descritivo legível");
    expect(window.getComputedStyle(desc).fontStyle).not.toBe("italic");
  });
});
