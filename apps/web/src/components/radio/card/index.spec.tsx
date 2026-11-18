import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioCard } from "./index";
import { RadioGroupContext } from "../context";

describe("RadioCard Primitive", () => {
  function renderWithGroup(ui: React.ReactNode, value = "card-1", onChange = vi.fn()) {
    return render(
      <RadioGroupContext.Provider
        value={{
          name: "test-group",
          value,
          onChange,
          disabled: false,
          orientation: "vertical",
        }}
      >
        {ui}
      </RadioGroupContext.Provider>
    );
  }

  it("renders prop-driven card with title, badge, description, extra, and indicator", () => {
    renderWithGroup(
      <RadioCard
        value="card-1"
        title="Modo Protanopia"
        badge="Cones L"
        description="Dificuldade na detecção de comprimentos longos"
        extra="Remapeia eixos vermelho-magenta"
        showIndicator
        ariaLabel="Modo Protanopia"
      />
    );

    const card = screen.getByRole("radio", { name: "Modo Protanopia" });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("aria-checked", "true");
    expect(card).toHaveAttribute("tabindex", "0");

    expect(screen.getByText("Modo Protanopia")).toBeInTheDocument();
    expect(screen.getByText("Cones L")).toBeInTheDocument();
    expect(
      screen.getByText("Dificuldade na detecção de comprimentos longos")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Remapeia eixos vermelho-magenta")
    ).toBeInTheDocument();
  });

  it("calls onChange callback when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithGroup(
      <RadioCard
        value="card-2"
        title="Modo Escuro"
        ariaLabel="Ativar Modo Escuro"
      />,
      "card-1",
      handleChange
    );

    const card = screen.getByRole("radio", { name: "Ativar Modo Escuro" });
    expect(card).toHaveAttribute("aria-checked", "false");

    await user.click(card);
    expect(handleChange).toHaveBeenCalledWith("card-2");
  });

  it("renders with icon in horizontal icon layout", () => {
    renderWithGroup(
      <RadioCard
        value="card-1"
        title="Com Ícone"
        icon={<span data-testid="test-icon">Icon</span>}
        badge="Ativo"
        ariaLabel="Card com Ícone"
      />
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("Com Ícone")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("supports compound composition via RadioCard subcomponents", () => {
    renderWithGroup(
      <RadioCard value="custom" ariaLabel="Card Composto">
        <RadioCard.Header>
          <RadioCard.Icon><span>*</span></RadioCard.Icon>
          <RadioCard.Title>Título Composto</RadioCard.Title>
          <RadioCard.Badge>Badge Composto</RadioCard.Badge>
          <RadioCard.Indicator />
        </RadioCard.Header>
        <RadioCard.Description>Descrição Composta</RadioCard.Description>
        <RadioCard.Extra>Nota Extra</RadioCard.Extra>
      </RadioCard>
    );

    expect(screen.getByRole("radio", { name: "Card Composto" })).toBeInTheDocument();
    expect(screen.getByText("Título Composto")).toBeInTheDocument();
    expect(screen.getByText("Badge Composto")).toBeInTheDocument();
    expect(screen.getByText("Descrição Composta")).toBeInTheDocument();
    expect(screen.getByText("Nota Extra")).toBeInTheDocument();
  });

  it("supports render props for dynamic custom children", () => {
    renderWithGroup(
      <RadioCard value="card-1" ariaLabel="Render Prop Card">
        {({ checked }) => <span>{checked ? "Card Marcado" : "Card Desmarcado"}</span>}
      </RadioCard>
    );

    expect(screen.getByText("Card Marcado")).toBeInTheDocument();
  });
});
