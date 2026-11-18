import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChromaticSwatchCard } from "./index";
import type { SwatchItem } from "./index";

describe("ChromaticSwatchCard Component", () => {
  const mockItem: SwatchItem = {
    id: "mat-swatch",
    canonicalName: "Matemática & Lógica",
    standardColorHex: "#2563eb",
    perceivedColorHex: "#3b82f6",
    perceivedDescription: "Azul Cobalto Brilhante",
    opticalNote: "Distingue operações com fidelidade.",
    contrastTag: "AAA (9.1:1)",
    borderStyle: "4px solid #1d4ed8",
  };

  it("renders canonical name and perceived description", () => {
    render(<ChromaticSwatchCard item={mockItem} />);

    expect(screen.getByText("Matemática & Lógica")).toBeInTheDocument();
    expect(screen.getByText("Azul Cobalto Brilhante")).toBeInTheDocument();
    expect(screen.getByText("Distingue operações com fidelidade.")).toBeInTheDocument();
  });

  it("renders contrast badge and standard swatch label", () => {
    render(<ChromaticSwatchCard item={mockItem} />);

    expect(screen.getByText("AAA (9.1:1)")).toBeInTheDocument();
    expect(screen.getByText("Padrão")).toBeInTheDocument();
  });

  it("applies background color and border style to the preview container", () => {
    render(<ChromaticSwatchCard item={mockItem} />);

    const card = screen.getByTestId("swatch-card-mat-swatch");
    const preview = card.firstElementChild as HTMLElement;

    expect(preview.style.backgroundColor).toBe("rgb(59, 130, 246)"); // #3b82f6
    expect(preview.style.borderLeft).toContain("4px solid");
  });
});
