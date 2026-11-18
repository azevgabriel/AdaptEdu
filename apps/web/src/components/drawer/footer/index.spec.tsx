import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerFooter } from "./index";

describe("DrawerFooter", () => {
  it("renders footer container with children", () => {
    render(
      <DrawerFooter>
        <button type="button">Salvar</button>
      </DrawerFooter>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("forwards ref to footer element", () => {
    const ref = createRef<HTMLElement>();
    render(<DrawerFooter ref={ref}>Ref Footer</DrawerFooter>);

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
