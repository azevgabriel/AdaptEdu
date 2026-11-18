import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerContent } from "./index";
import { DrawerContext, type DrawerContextValue } from "../context";

describe("DrawerContent", () => {
  const createMockContext = (
    overrides?: Partial<DrawerContextValue>
  ): DrawerContextValue => ({
    isOpen: true,
    onClose: vi.fn(),
    position: "right",
    size: "md",
    showOverlay: true,
    closeOnOverlayClick: true,
    titleId: "title-id",
    descId: "desc-id",
    drawerRef: { current: null },
    closeButtonRef: { current: null },
    ...overrides,
  });

  it("renders section dialog with context position and size classes", () => {
    const context = createMockContext({ position: "left", size: "lg" });
    render(
      <DrawerContext.Provider value={context}>
        <DrawerContent>
          <p>Conteúdo do Painel</p>
        </DrawerContent>
      </DrawerContext.Provider>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "title-id");
    expect(dialog).toHaveAttribute("aria-describedby", "desc-id");
    expect(dialog.className).toContain("left");
    expect(dialog.className).toContain("lg");
  });

  it("supports explicit position and size prop overrides", () => {
    const context = createMockContext();
    render(
      <DrawerContext.Provider value={context}>
        <DrawerContent position="right" size="xl">
          <span>Override Content</span>
        </DrawerContent>
      </DrawerContext.Provider>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("right");
    expect(dialog.className).toContain("xl");
  });

  it("forwards ref to section element (both object and function ref)", () => {
    const ref = createRef<HTMLElement>();
    let functionNode: HTMLElement | null = null;
    const context = createMockContext();
    render(
      <DrawerContext.Provider value={context}>
        <DrawerContent ref={ref}>Ref Content</DrawerContent>
        <DrawerContent ref={(node) => { functionNode = node; }}>Function Ref Content</DrawerContent>
      </DrawerContext.Provider>
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(functionNode).toBeInstanceOf(HTMLElement);
  });
});
