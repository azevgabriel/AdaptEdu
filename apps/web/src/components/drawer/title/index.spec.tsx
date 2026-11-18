import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerTitle } from "./index";
import { DrawerContext, type DrawerContextValue } from "../context";

describe("DrawerTitle", () => {
  it("renders with context titleId and default h2 tag", () => {
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
        <DrawerTitle>Título do Drawer</DrawerTitle>
      </DrawerContext.Provider>
    );

    const heading = screen.getByRole("heading", { level: 2, name: "Título do Drawer" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "test-title-id");
  });

  it("supports custom heading level tag and custom id", () => {
    render(
      <DrawerTitle as="h3" id="custom-id">
        Título H3
      </DrawerTitle>
    );

    const heading = screen.getByRole("heading", { level: 3, name: "Título H3" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "custom-id");
  });

  it("forwards ref to element", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<DrawerTitle ref={ref}>Ref Title</DrawerTitle>);

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});
