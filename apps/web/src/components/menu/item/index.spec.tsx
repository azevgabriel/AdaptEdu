import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuItem } from "./index";

describe("MenuItem Component", () => {
  it("renders as button with role='menuitem' by default", () => {
    render(<MenuItem>Minha Conta</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Minha Conta" });
    expect(item).toBeInTheDocument();
    expect(item.tagName).toBe("BUTTON");
  });

  it("renders as Next.js Link when href is provided", () => {
    render(<MenuItem href="/turmas">Turmas</MenuItem>);

    const link = screen.getByRole("menuitem", { name: "Turmas" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/turmas");
  });

  it("handles clicks and keyboard activation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MenuItem onClick={handleClick}>Sair</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Sair" });
    await user.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);

    item.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(2);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("does not trigger onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MenuItem disabled onClick={handleClick}>Opção Desabilitada</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Opção Desabilitada" });
    expect(item).toBeDisabled();

    await user.click(item);
    expect(handleClick).not.toHaveBeenCalled();

    fireEvent.click(item);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders icon with aria-hidden='true'", () => {
    render(
      <MenuItem icon={<span data-testid="item-icon">📚</span>}>
        Planos de Aula
      </MenuItem>
    );

    expect(screen.getByTestId("item-icon")).toBeInTheDocument();
  });

  it("applies active class when isActive is true", () => {
    render(<MenuItem isActive>Item Ativo</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Item Ativo" });
    expect(item.className).toMatch(/itemActive/);
  });

  it("applies danger variant class", () => {
    render(<MenuItem variant="danger">Excluir</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Excluir" });
    expect(item.className).toMatch(/variantDanger/);
  });

  it("applies brand variant class", () => {
    render(<MenuItem variant="brand">Ação Especial</MenuItem>);

    const item = screen.getByRole("menuitem", { name: "Ação Especial" });
    expect(item.className).toMatch(/variantBrand/);
  });

  it("prevents navigation and click when disabled link is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <MenuItem href="/bloqueado" disabled onClick={handleClick}>
        Link Bloqueado
      </MenuItem>
    );

    const link = screen.getByRole("menuitem", { name: "Link Bloqueado" });
    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
