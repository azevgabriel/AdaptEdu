import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChromaticMatrix } from "./index";

describe("ChromaticMatrix", () => {
  it("renders the matrix title and optical explanation for default trichromatic vision", () => {
    render(<ChromaticMatrix cvdMode="default" />);

    expect(
      screen.getByRole("heading", {
        name: /matriz de comparação cromática & simulação perceptiva/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fundamentação oftalmológica: visão tricromática completa/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hierarquia de conteúdo pedagógico/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/disciplinas escolares/i)
    ).toBeInTheDocument();
  });

  it("updates optical explanation and perceived labels when Tritanopia is selected", () => {
    render(<ChromaticMatrix cvdMode="tritanopia" />);

    expect(
      screen.getByText(/eixo vermelho-ciano preservado/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remapeado para terracota \/ ferrugem/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remapeado para azul petróleo \/ ciano profundo/i)
    ).toBeInTheDocument();
  });

  it("renders structural border encodings when Achromatopsia is selected", () => {
    render(<ChromaticMatrix cvdMode="achromatopsia" />);

    expect(
      screen.getByText(/escudo anti-ofuscamento/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/preto fosco com borda sólida 4px/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cinza escuro com borda dupla 4px/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cinza médio com borda pontilhada 4px/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cinza claro com borda tracejada 4px/i)
    ).toBeInTheDocument();
  });

  it("renders correct swatches and descriptions for Deuteranopia and Protanopia", () => {
    const { rerender } = render(<ChromaticMatrix cvdMode="deuteranopia" />);

    expect(
      screen.getByText(/eixo vermelho-verde \(cones m/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remapeado para ciano vivo/i)
    ).toBeInTheDocument();

    rerender(<ChromaticMatrix cvdMode="protanopia" />);

    expect(
      screen.getByText(/eixo vermelho-verde \(cones l/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remapeado para magenta vivo/i)
    ).toBeInTheDocument();
  });
});
