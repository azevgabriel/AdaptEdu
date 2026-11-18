import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardBadge } from "./index";

describe("CardBadge", () => {
  it("renders badge text", () => {
    render(<CardBadge>BNCC</CardBadge>);
    expect(screen.getByText("BNCC")).toBeInTheDocument();
  });

  it("applies badge class", () => {
    const { container } = render(<CardBadge>Ativo</CardBadge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toMatch(/cardBadge/);
  });
});
