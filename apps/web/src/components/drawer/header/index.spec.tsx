import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerHeader } from "./index";

describe("DrawerHeader", () => {
  it("renders header container with children", () => {
    render(
      <DrawerHeader>
        <span>Título Header</span>
      </DrawerHeader>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Título Header")).toBeInTheDocument();
  });

  it("forwards ref to header element", () => {
    const ref = createRef<HTMLElement>();
    render(<DrawerHeader ref={ref}>Ref Header</DrawerHeader>);

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
