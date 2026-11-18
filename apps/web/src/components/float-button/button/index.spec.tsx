import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FloatButton } from "./index";

describe("FloatButton", () => {
  it("renders with icon and label and triggers onClick", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <FloatButton
        icon={<span data-testid="dummy-icon">★</span>}
        label="Ação Flutuante"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole("button", { name: "Ação Flutuante" });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("dummy-icon")).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon-only with circle shape and accessible aria-label", () => {
    render(
      <FloatButton
        icon={<span data-testid="icon-only">🔍</span>}
        ariaLabel="Pesquisar"
        variant="primary"
      />
    );

    const button = screen.getByRole("button", { name: "Pesquisar" });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon-only")).toBeInTheDocument();
    expect(button.className).toContain("shape-circle");
    expect(button.className).toContain("variant-primary");
  });

  it("renders with badge indicator", () => {
    render(
      <FloatButton
        label="Modo Daltonismo"
        badge={<span data-testid="badge-elem">Tritanopia</span>}
        variant="secondary"
      />
    );

    expect(screen.getByText("Modo Daltonismo")).toBeInTheDocument();
    expect(screen.getByTestId("badge-elem")).toBeInTheDocument();
    expect(screen.getByText("Tritanopia")).toBeInTheDocument();
  });

  it("applies active state and custom shape/size", () => {
    render(
      <FloatButton
        label="Ativo"
        isActive
        shape="square"
        size="lg"
        variant="danger"
        tooltip="Dica de ferramenta"
      />
    );

    const button = screen.getByRole("button", { name: "Ativo" });
    expect(button.className).toContain("isActive");
    expect(button.className).toContain("shape-square");
    expect(button.className).toContain("size-lg");
    expect(button.className).toContain("variant-danger");
    expect(button).toHaveAttribute("title", "Dica de ferramenta");
  });

  it("respects disabled state and prevents click execution", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <FloatButton
        label="Desabilitado"
        disabled
        onClick={handleClick}
      />
    );

    const button = screen.getByRole("button", { name: "Desabilitado" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref to button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<FloatButton ref={ref} aria-label="Ref Button" />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
