import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatGroup } from "./index";

describe("FloatGroup", () => {
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    vi.restoreAllMocks();
  });

  it("renders with default placement, direction, role, and aria-label", () => {
    render(
      <FloatGroup>
        <button type="button">Botão 1</button>
        <button type="button">Botão 2</button>
      </FloatGroup>
    );

    const toolbar = screen.getByRole("toolbar", { name: "Ações flutuantes" });
    expect(toolbar).toBeInTheDocument();
    expect(toolbar.className).toContain("bottom-right");
    expect(toolbar.className).toContain("column");
    expect(screen.getByText("Botão 1")).toBeInTheDocument();
    expect(screen.getByText("Botão 2")).toBeInTheDocument();
  });

  it("supports custom placement and row direction", () => {
    render(
      <FloatGroup
        placement="top-left"
        direction="row"
        ariaLabel="Painel de ferramentas"
        offsetTop={20}
        offsetLeft={20}
      >
        <button type="button">Item</button>
      </FloatGroup>
    );

    const toolbar = screen.getByRole("toolbar", {
      name: "Painel de ferramentas",
    });
    expect(toolbar.className).toContain("top-left");
    expect(toolbar.className).toContain("row");
    expect(toolbar.style.top).toBe("20px");
    expect(toolbar.style.left).toBe("20px");
  });

  it("dynamically avoids overlapping with footer when footer is in viewport", () => {
    // Create a mock footer in document body
    const footer = document.createElement("footer");
    document.body.appendChild(footer);

    // Mock getBoundingClientRect on footer: top at 850px (150px visible in a 1000px viewport)
    vi.spyOn(footer, "getBoundingClientRect").mockReturnValue({
      top: 850,
      bottom: 1200,
      left: 0,
      right: 1200,
      width: 1200,
      height: 350,
      x: 0,
      y: 850,
      toJSON: () => {},
    });

    render(
      <FloatGroup offsetBottom={32}>
        <button type="button">Ação</button>
      </FloatGroup>
    );

    const toolbar = screen.getByRole("toolbar");
    // Visible footer height is 1000 - 850 = 150px
    // bottom should be 32px + 150px = 182px
    expect(toolbar.style.bottom).toBe("182px");

    // Simulate scroll when footer moves further up (200px visible)
    vi.spyOn(footer, "getBoundingClientRect").mockReturnValue({
      top: 800,
      bottom: 1150,
      left: 0,
      right: 1200,
      width: 1200,
      height: 350,
      x: 0,
      y: 800,
      toJSON: () => {},
    });

    fireEvent.scroll(window);
    expect(toolbar.style.bottom).toBe("232px");

    // Simulate scroll when footer moves completely below viewport (top at 1100px)
    vi.spyOn(footer, "getBoundingClientRect").mockReturnValue({
      top: 1100,
      bottom: 1450,
      left: 0,
      right: 1200,
      width: 1200,
      height: 350,
      x: 0,
      y: 1100,
      toJSON: () => {},
    });

    fireEvent.scroll(window);
    expect(toolbar.style.bottom).toBe("32px");

    document.body.removeChild(footer);
  });

  it("handles avoidFooter=false without adding scroll calculations", () => {
    render(
      <FloatGroup avoidFooter={false} offsetBottom={24}>
        <button type="button">Sem evasão</button>
      </FloatGroup>
    );

    const toolbar = screen.getByRole("toolbar");
    expect(toolbar.style.bottom).toBe("24px");
  });

  it("forwards ref to div container element", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FloatGroup ref={ref}>
        <button type="button">Com Ref</button>
      </FloatGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
