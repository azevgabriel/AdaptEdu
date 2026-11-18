import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HandoutPreview } from "./index";

describe("HandoutPreview", () => {
  it("renders realistic classroom handout with all pedagogical highlight blocks", () => {
    render(<HandoutPreview cvdMode="default" />);

    expect(
      screen.getByRole("heading", {
        name: /prévia em tempo real: roteiro pedagógico adaptado/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/geografia • ensino fundamental ii/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/conceito-chave & atenção/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/definição & estrutura/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/dados numéricos & metas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/exemplo prático & exercício/i)
    ).toBeInTheDocument();
  });

  it("renders the optical simulation lens toggle when non-default CVD is selected", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<HandoutPreview cvdMode="default" />);

    // In default mode, simulation lens switch is not needed
    expect(
      screen.queryByLabelText(/ativar lente de simulação óptica/i)
    ).not.toBeInTheDocument();

    // In deuteranopia mode, simulation lens switch appears
    rerender(<HandoutPreview cvdMode="deuteranopia" />);

    const lensCheckbox = screen.getByLabelText(
      /ativar lente de simulação óptica do aluno na prévia/i
    );
    expect(lensCheckbox).toBeInTheDocument();

    const handoutCard = screen.getByTestId("classroom-handout-preview");
    expect(handoutCard.style.filter).toBe("");

    // Toggle lens ON
    await user.click(lensCheckbox);
    expect(handoutCard.style.filter).toContain("sim-deuteranopia");

    // Toggle lens OFF
    await user.click(lensCheckbox);
    expect(handoutCard.style.filter).toBe("");
  });

  it("applies the appropriate SVG filter per deficiency when simulation lens is active", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<HandoutPreview cvdMode="tritanopia" />);

    const lensCheckbox = screen.getByLabelText(
      /ativar lente de simulação óptica do aluno na prévia/i
    );
    await user.click(lensCheckbox);

    const handoutCard = screen.getByTestId("classroom-handout-preview");
    expect(handoutCard.style.filter).toContain("sim-tritanopia");

    rerender(<HandoutPreview cvdMode="achromatopsia" />);
    expect(handoutCard.style.filter).toContain("sim-achromatopsia");

    rerender(<HandoutPreview cvdMode="protanopia" />);
    expect(handoutCard.style.filter).toContain("sim-protanopia");
  });
});
