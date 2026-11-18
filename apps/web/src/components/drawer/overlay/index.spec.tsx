import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DrawerOverlay } from "./index";
import { DrawerContext, type DrawerContextValue } from "../context";

describe("DrawerOverlay", () => {
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

  it("renders overlay and calls onClose on click when closeOnOverlayClick is true", () => {
    const context = createMockContext();
    render(
      <DrawerContext.Provider value={context}>
        <DrawerOverlay />
      </DrawerContext.Provider>
    );

    const overlay = screen.getByTestId("drawer-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(overlay);
    expect(context.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnOverlayClick is false", () => {
    const context = createMockContext({ closeOnOverlayClick: false });
    render(
      <DrawerContext.Provider value={context}>
        <DrawerOverlay />
      </DrawerContext.Provider>
    );

    const overlay = screen.getByTestId("drawer-overlay");
    fireEvent.click(overlay);
    expect(context.onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when event.defaultPrevented is true", () => {
    const context = createMockContext();
    render(
      <DrawerContext.Provider value={context}>
        <DrawerOverlay
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </DrawerContext.Provider>
    );

    const overlay = screen.getByTestId("drawer-overlay");
    fireEvent.click(overlay);
    expect(context.onClose).not.toHaveBeenCalled();
  });

  it("forwards ref to div element", () => {
    const ref = createRef<HTMLDivElement>();
    const context = createMockContext();
    render(
      <DrawerContext.Provider value={context}>
        <DrawerOverlay ref={ref} />
      </DrawerContext.Provider>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
