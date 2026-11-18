import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "./index";

describe("Switch Component", () => {
  it("renders unchecked by default when checked=false", () => {
    render(<Switch checked={false} onChange={vi.fn()} ariaLabel="Notificações" />);
    const switchElement = screen.getByRole("switch", { name: "Notificações" });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute("aria-checked", "false");
  });

  it("renders checked when checked=true", () => {
    render(<Switch checked={true} onChange={vi.fn()} ariaLabel="Modo Noturno" />);
    const switchElement = screen.getByRole("switch", { name: "Modo Noturno" });
    expect(switchElement).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange with opposite value when clicked", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} ariaLabel="Ativar" />);
    const switchElement = screen.getByRole("switch", { name: "Ativar" });

    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles with Space and Enter keyboard keys", () => {
    const handleChange = vi.fn();
    render(<Switch checked={true} onChange={handleChange} ariaLabel="Opção Teclado" />);
    const switchElement = screen.getByRole("switch", { name: "Opção Teclado" });

    fireEvent.keyDown(switchElement, { key: " " });
    expect(handleChange).toHaveBeenCalledWith(false);

    fireEvent.keyDown(switchElement, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(false);

    // Other keys do not trigger onChange
    fireEvent.keyDown(switchElement, { key: "ArrowDown" });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} disabled ariaLabel="Desabilitado" />);
    const switchElement = screen.getByRole("switch", { name: "Desabilitado" });

    expect(switchElement).toBeDisabled();
    fireEvent.click(switchElement);
    fireEvent.keyDown(switchElement, { key: " " });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders with label and description and toggles when label is clicked", () => {
    const handleChange = vi.fn();
    render(
      <Switch
        id="contrast-test"
        checked={false}
        onChange={handleChange}
        label="Alto Contraste"
        description="Aumenta a espessura das bordas estruturais."
      />
    );

    const labelElement = screen.getByText("Alto Contraste");
    expect(labelElement).toBeInTheDocument();
    expect(screen.getByText("Aumenta a espessura das bordas estruturais.")).toBeInTheDocument();

    const switchElement = screen.getByRole("switch", { name: "Alto Contraste" });
    expect(switchElement).toHaveAttribute("aria-checked", "false");

    fireEvent.click(labelElement);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("supports different sizes (sm, lg)", () => {
    const { container, rerender } = render(
      <Switch checked={false} onChange={vi.fn()} size="sm" ariaLabel="Pequeno" />
    );
    expect(container.firstChild).toHaveClass(/sm/);

    rerender(<Switch checked={false} onChange={vi.fn()} size="lg" ariaLabel="Grande" />);
    expect(container.firstChild).toHaveClass(/lg/);
  });

  it("programmatically associates label via htmlFor and description via aria-describedby", () => {
    render(
      <Switch
        id="dyslexia-switch"
        checked={true}
        onChange={vi.fn()}
        label="Fonte para Dislexia"
        description="Aumenta o espaçamento de caracteres e linhas."
      />
    );

    const switchBtn = screen.getByRole("switch", { name: "Fonte para Dislexia" });
    const labelEl = screen.getByText("Fonte para Dislexia");
    const descEl = screen.getByText("Aumenta o espaçamento de caracteres e linhas.");

    expect(labelEl).toHaveAttribute("for", "dyslexia-switch");
    expect(switchBtn).toHaveAttribute("aria-describedby", descEl.id);
  });

  it("has type='button' and does not toggle on unrecognized key presses", () => {
    const handleChange = vi.fn();
    render(<Switch checked={false} onChange={handleChange} ariaLabel="Apenas Teclas" />);
    const switchBtn = screen.getByRole("switch", { name: "Apenas Teclas" });

    expect(switchBtn).toHaveAttribute("type", "button");

    fireEvent.keyDown(switchBtn, { key: "Tab" });
    fireEvent.keyDown(switchBtn, { key: "Escape" });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
