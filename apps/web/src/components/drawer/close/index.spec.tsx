import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DrawerClose } from "./index";
import { DrawerContext, type DrawerContextValue } from "../context";

describe("DrawerClose", () => {
  it("renders with default close icon and calls context.onClose when clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const mockContext: DrawerContextValue = {
      isOpen: true,
      onClose: handleClose,
      position: "right",
      size: "md",
      showOverlay: true,
      closeOnOverlayClick: true,
      titleId: "title",
      descId: "desc",
      drawerRef: { current: null },
      closeButtonRef: { current: null },
    };

    render(
      <DrawerContext.Provider value={mockContext}>
        <DrawerClose />
      </DrawerContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Fechar painel lateral" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("supports custom children and custom onClick handler", async () => {
    const user = userEvent.setup();
    const customClick = vi.fn();

    render(
      <DrawerClose onClick={customClick} ariaLabel="Cancelar e Fechar">
        <span>Fechar Agora</span>
      </DrawerClose>
    );

    const button = screen.getByRole("button", { name: "Cancelar e Fechar" });
    expect(screen.getByText("Fechar Agora")).toBeInTheDocument();

    await user.click(button);
    expect(customClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when event.defaultPrevented is true", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    const mockContext: DrawerContextValue = {
      isOpen: true,
      onClose: handleClose,
      position: "right",
      size: "md",
      showOverlay: true,
      closeOnOverlayClick: true,
      titleId: "title",
      descId: "desc",
      drawerRef: { current: null },
      closeButtonRef: { current: null },
    };

    render(
      <DrawerContext.Provider value={mockContext}>
        <DrawerClose
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </DrawerContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Fechar painel lateral" });
    await user.click(button);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("forwards ref to button element (both object and function ref)", () => {
    const ref = createRef<HTMLButtonElement>();
    let functionNode: HTMLButtonElement | null = null;
    render(
      <>
        <DrawerClose ref={ref} />
        <DrawerClose ref={(node) => { functionNode = node; }} />
      </>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(functionNode).toBeInstanceOf(HTMLButtonElement);
  });
});
