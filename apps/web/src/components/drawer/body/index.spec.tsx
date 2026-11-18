import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { DrawerBody } from "./index";

describe("DrawerBody", () => {
  it("renders body container with children", () => {
    render(
      <DrawerBody>
        <p>Conteúdo principal do drawer</p>
      </DrawerBody>
    );

    expect(screen.getByText("Conteúdo principal do drawer")).toBeInTheDocument();
  });

  it("forwards ref to div element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<DrawerBody ref={ref}>Ref Body</DrawerBody>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
