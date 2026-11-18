import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuRoot } from "./index";

describe("MenuRoot Component", () => {
  it("renders container with role='menu' by default", () => {
    render(<MenuRoot aria-label="Menu de teste">Menu items</MenuRoot>);

    const menu = screen.getByRole("menu", { name: "Menu de teste" });
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveTextContent("Menu items");
  });

  it("applies alignLeft class when align='left'", () => {
    const { container } = render(<MenuRoot align="left">Conteúdo</MenuRoot>);
    expect((container.firstChild as HTMLElement).className).toMatch(/alignLeft/);
  });

  it("applies alignRight class by default", () => {
    const { container } = render(<MenuRoot>Conteúdo</MenuRoot>);
    expect((container.firstChild as HTMLElement).className).toMatch(/alignRight/);
  });
});
