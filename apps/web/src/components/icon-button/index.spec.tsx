import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./index";

describe("IconButton Component", () => {
  it("renders as an accessible HTML button with type='button' and accessible name", () => {
    render(
      <IconButton aria-label="Abrir configurações">
        <span data-testid="settings-icon">⚙️</span>
      </IconButton>
    );

    const button = screen.getByRole("button", { name: "Abrir configurações" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("renders as an accessible Link when href is provided", () => {
    render(
      <IconButton
        href="/configuracoes/acessibilidade"
        aria-label="Configurações de acessibilidade"
      >
        <span>♿</span>
      </IconButton>
    );

    const link = screen.getByRole("link", {
      name: "Configurações de acessibilidade",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/configuracoes/acessibilidade");
  });

  it("triggers onClick callback and supports keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton aria-label="Alternar modo foco" onClick={handleClick}>
        <span>🔍</span>
      </IconButton>
    );

    const button = screen.getByRole("button", { name: "Alternar modo foco" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);

    button.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(2);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("does not trigger onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton disabled aria-label="Ação bloqueada" onClick={handleClick}>
        <span>🔒</span>
      </IconButton>
    );

    const button = screen.getByRole("button", { name: "Ação bloqueada" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies active state styling when isActive is true", () => {
    render(
      <IconButton isActive aria-label="Painel ativo">
        <span>⭐</span>
      </IconButton>
    );

    const button = screen.getByRole("button", { name: "Painel ativo" });
    expect(button.className).toMatch(/active/);
  });

  it("renders auxiliary indicator dot when hasIndicator is true", () => {
    render(
      <IconButton
        hasIndicator
        indicatorTitle="Acomodações ativas"
        indicatorTestId="test-indicator"
        aria-label="Acessibilidade"
      >
        <span>♿</span>
      </IconButton>
    );

    const indicator = screen.getByTestId("test-indicator");
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute("title", "Acomodações ativas");
    expect(indicator).toHaveAttribute("aria-hidden", "true");
  });

  it("applies size classes (sm, md, lg)", () => {
    const { rerender } = render(
      <IconButton size="sm" aria-label="Pequeno">
        <span>S</span>
      </IconButton>
    );
    expect(screen.getByRole("button", { name: "Pequeno" }).className).toMatch(/sizeSm/);

    rerender(
      <IconButton size="lg" aria-label="Grande">
        <span>L</span>
      </IconButton>
    );
    expect(screen.getByRole("button", { name: "Grande" }).className).toMatch(/sizeLg/);
  });

  it("applies variant classes (subtle, outline, primary, ghost)", () => {
    const { rerender } = render(
      <IconButton variant="outline" aria-label="Contorno">
        <span>O</span>
      </IconButton>
    );
    expect(screen.getByRole("button", { name: "Contorno" }).className).toMatch(/variantOutline/);

    rerender(
      <IconButton variant="primary" aria-label="Primário">
        <span>P</span>
      </IconButton>
    );
    expect(screen.getByRole("button", { name: "Primário" }).className).toMatch(/variantPrimary/);
  });

  it("applies default size (md) and default variant (ghost)", () => {
    render(<IconButton aria-label="Padrão"><span>D</span></IconButton>);
    const btn = screen.getByRole("button", { name: "Padrão" });
    expect(btn.className).toMatch(/sizeMd/);
    expect(btn.className).toMatch(/variantGhost/);
  });

  it("prevents navigation and click when disabled link is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton
        href="/bloqueado"
        disabled
        aria-label="Link Bloqueado"
        onClick={handleClick}
      >
        <span>🔒</span>
      </IconButton>
    );

    const link = screen.getByRole("link", { name: "Link Bloqueado" });
    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
