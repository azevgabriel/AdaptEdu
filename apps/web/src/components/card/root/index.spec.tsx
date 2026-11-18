import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardRoot } from "./index";

describe("CardRoot", () => {
  it("renders as a div container by default", () => {
    const { container } = render(<CardRoot>Conteúdo do Card</CardRoot>);
    expect(screen.getByText("Conteúdo do Card")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as an article when as='article'", () => {
    const { container } = render(<CardRoot as="article">Conteúdo Artigo</CardRoot>);
    expect(container.firstChild?.nodeName).toBe("ARTICLE");
  });

  it("renders as an accessible button with keyboard support when as='button'", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CardRoot as="button" onClick={handleClick}>
        Clique aqui
      </CardRoot>
    );

    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toHaveAttribute("type", "button");

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
      <CardRoot as="button" disabled onClick={handleClick}>
        Desabilitado
      </CardRoot>
    );

    const button = screen.getByRole("button", { name: /desabilitado/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies selected styling class and data-selected attribute", () => {
    const { container } = render(<CardRoot selected>Card Selecionado</CardRoot>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("data-selected", "true");
    expect(card.className).toMatch(/cardSelected/);
  });

  it("applies subtle and bordered variants", () => {
    const { rerender, container } = render(<CardRoot variant="subtle">Subtle</CardRoot>);
    let card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/variantSubtle/);

    rerender(<CardRoot variant="bordered">Bordered</CardRoot>);
    card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/variantBordered/);
  });
});
