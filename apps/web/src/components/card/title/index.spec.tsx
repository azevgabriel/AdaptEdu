import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardTitle } from "./index";

describe("CardTitle", () => {
  it("renders as an h3 heading by default", () => {
    render(<CardTitle>Título Padrão</CardTitle>);
    const heading = screen.getByRole("heading", { level: 3, name: "Título Padrão" });
    expect(heading).toBeInTheDocument();
  });

  it("renders as polymorphic level (h2) when requested", () => {
    render(<CardTitle as="h2">Título Nível 2</CardTitle>);
    const heading = screen.getByRole("heading", { level: 2, name: "Título Nível 2" });
    expect(heading).toBeInTheDocument();
  });

  it("renders as span when as='span'", () => {
    const { container } = render(<CardTitle as="span">Título Span</CardTitle>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("complies with dyslexia invariant by not applying italic styling", () => {
    render(<CardTitle>Título Legível</CardTitle>);
    const title = screen.getByText("Título Legível");
    expect(window.getComputedStyle(title).fontStyle).not.toBe("italic");
  });
});
