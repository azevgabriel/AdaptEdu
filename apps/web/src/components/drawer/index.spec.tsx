import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Drawer } from "./index";

describe("Drawer Component", () => {
  beforeEach(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.documentElement.style.overflow = "";
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

  it("renders title, description, children, and overlay backdrop when isOpen is true", () => {
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
    expect(screen.getByTestId("drawer-overlay")).toBeInTheDocument();
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

  it("calls onClose when clicking on the overlay outside the drawer", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Painel com Overlay">
        <p>Conteúdo Interno</p>
      </Drawer>
    );

    const overlay = screen.getByTestId("drawer-overlay");
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking on overlay if closeOnOverlayClick is false", () => {
    const handleClose = vi.fn();
    render(
      <Drawer
        isOpen={true}
        onClose={handleClose}
        closeOnOverlayClick={false}
        title="Painel Fixo"
      >
        <p>Conteúdo</p>
      </Drawer>
    );

    const overlay = screen.getByTestId("drawer-overlay");
    fireEvent.click(overlay);
    expect(handleClose).not.toHaveBeenCalled();
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

  it("locks and restores document and body scroll overflow when overlay is shown", () => {
    const { unmount, rerender } = render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Drawer isOpen={false} onClose={vi.fn()} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");

    rerender(
      <Drawer isOpen={true} onClose={vi.fn()} title="Scroll Test">
        <p>Conteúdo</p>
      </Drawer>
    );
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.documentElement.style.overflow).toBe("");
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

  it("does not render overlay when overlay is false", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} overlay={false} title="Sem Overlay">
        <p>Conteúdo Sem Overlay</p>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "false");
    expect(screen.queryByTestId("drawer-overlay")).not.toBeInTheDocument();
    expect(document.documentElement.style.overflow).not.toBe("hidden");
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("traps keyboard focus within drawer and wraps around with Tab and Shift+Tab", () => {
    render(
      <Drawer
        isOpen={true}
        onClose={vi.fn()}
        title="Focus Trap Test"
        footer={<button>Botão Final</button>}
      >
        <button>Botão Interno</button>
      </Drawer>
    );

    const closeBtn = screen.getByRole("button", { name: "Fechar painel lateral" });
    const innerBtn = screen.getByRole("button", { name: "Botão Interno" });
    const footerBtn = screen.getByRole("button", { name: "Botão Final" });
    expect(innerBtn).toBeInTheDocument();

    // Close button receives initial focus
    expect(document.activeElement).toBe(closeBtn);

    // Focus last element and press Tab -> should wrap to first element (closeBtn)
    footerBtn.focus();
    expect(document.activeElement).toBe(footerBtn);
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(closeBtn);

    // Focus first element and press Shift+Tab -> should wrap to last element (footerBtn)
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(footerBtn);

    // If focus is outside drawer, Tab redirects to first element, Shift+Tab to last element
    document.body.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(closeBtn);

    document.body.focus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(footerBtn);
  });

  it("handles drawer with static content and focuses close button", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Conteúdo Estático">
        <p>Apenas texto estático</p>
      </Drawer>
    );

    const closeBtn = screen.getByRole("button", { name: "Fechar painel lateral" });
    expect(document.activeElement).toBe(closeBtn);
  });

  it("binds accessible title and description via aria-labelledby and aria-describedby", () => {
    render(
      <Drawer
        isOpen={true}
        onClose={vi.fn()}
        title="Título de Acessibilidade"
        description="Descrição detalhada do painel"
      >
        <p>Corpo</p>
      </Drawer>
    );

    const dialog = screen.getByRole("dialog");
    const titleEl = screen.getByText("Título de Acessibilidade");
    const descEl = screen.getByText("Descrição detalhada do painel");

    expect(dialog).toHaveAttribute("aria-labelledby", titleEl.id);
    expect(dialog).toHaveAttribute("aria-describedby", descEl.id);
  });

  it("marks close button SVG icon with aria-hidden='true'", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Painel com Ícone">
        <p>Conteúdo</p>
      </Drawer>
    );

    const closeBtn = screen.getByRole("button", { name: "Fechar painel lateral" });
    const icon = closeBtn.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
