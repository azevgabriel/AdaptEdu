import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Drawer } from "./index";

describe("Drawer Component", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not render when isOpen is false", () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Painel Lateral">
        <p>Conteúdo do Drawer</p>
      </Drawer>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title, description, and children when isOpen is true", () => {
    render(
      <Drawer
        isOpen={true}
        onClose={vi.fn()}
        title="Painel de Validação"
        description="Descrição do painel"
        footer={<button>Ação</button>}
      >
        <p>Conteúdo do painel lateral</p>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Painel de Validação")).toBeInTheDocument();
    expect(screen.getByText("Descrição do painel")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do painel lateral")).toBeInTheDocument();
    expect(screen.getByText("Ação")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Painel Lateral">
        <p>Conteúdo</p>
      </Drawer>
    );

    const closeBtn = screen.getByRole("button", { name: "Fechar painel lateral" });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when pressing Escape key", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Painel Lateral">
        <p>Conteúdo</p>
      </Drawer>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} closeOnEscape={false} title="Painel Lateral">
        <p>Conteúdo</p>
      </Drawer>
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when clicking on backdrop in modal mode", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} isModal={true} title="Painel Modal">
        <p>Conteúdo</p>
      </Drawer>
    );

    const root = screen.getByTestId("drawer-root");
    fireEvent.click(root);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside the panel", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Painel Lateral">
        <p>Conteúdo Interno</p>
      </Drawer>
    );

    const content = screen.getByText("Conteúdo Interno");
    fireEvent.click(content);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("locks and restores body scroll overflow in modal mode", () => {
    const { unmount, rerender } = render(
      <Drawer isOpen={true} onClose={vi.fn()} isModal={true} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Drawer isOpen={false} onClose={vi.fn()} isModal={true} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe("");

    rerender(
      <Drawer isOpen={true} onClose={vi.fn()} isModal={true} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("supports position left and size lg", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} position="left" size="lg" title="Esquerda">
        <p>Conteúdo Esquerdo</p>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass(/left/);
    expect(dialog).toHaveClass(/lg/);
  });

  it("supports non-modal mode", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} isModal={false} title="Não Modal">
        <p>Conteúdo Não Modal</p>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "false");
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
