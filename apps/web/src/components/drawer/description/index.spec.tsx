import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerDescription } from "./index";
import { DrawerContext, type DrawerContextValue } from "../context";

describe("DrawerDescription", () => {
  it("renders with context descId", () => {
    const mockContext: DrawerContextValue = {
      isOpen: true,
      onClose: () => {},
      position: "right",
      size: "md",
      showOverlay: true,
      closeOnOverlayClick: true,
      titleId: "test-title-id",
      descId: "test-desc-id",
      drawerRef: { current: null },
      closeButtonRef: { current: null },
    };

    render(
      <DrawerContext.Provider value={mockContext}>
        <DrawerDescription>Descrição do Drawer</DrawerDescription>
      </DrawerContext.Provider>
    );

    const description = screen.getByText("Descrição do Drawer");
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute("id", "test-desc-id");
  });

  it("supports custom id override", () => {
    render(<DrawerDescription id="custom-desc">Texto customizado</DrawerDescription>);

    const description = screen.getByText("Texto customizado");
    expect(description).toHaveAttribute("id", "custom-desc");
  });

  it("forwards ref to paragraph element", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<DrawerDescription ref={ref}>Ref Description</DrawerDescription>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
