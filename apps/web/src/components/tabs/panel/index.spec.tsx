import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { TabsPanel } from "./index";
import { TabsContext, type TabsContextValue } from "../context";

describe("TabsPanel", () => {
  const createMockContext = (
    overrides?: Partial<TabsContextValue>
  ): TabsContextValue => ({
    value: "panel-1",
    setValue: vi.fn(),
    orientation: "horizontal",
    variant: "line",
    size: "md",
    fitted: false,
    activationMode: "automatic",
    baseId: "tabs-test",
    registerTab: vi.fn(),
    unregisterTab: vi.fn(),
    tabElementsRef: { current: new Map() },
    ...overrides,
  });

  it("renders panel when active with role='tabpanel', id, and aria-labelledby", () => {
    const context = createMockContext({ value: "panel-1" });
    render(
      <TabsContext.Provider value={context}>
        <TabsPanel value="panel-1">
          <p>Conteúdo do Painel 1</p>
        </TabsPanel>
      </TabsContext.Provider>
    );

    const panel = screen.getByRole("tabpanel");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("id", "tabs-test-panel-panel-1");
    expect(panel).toHaveAttribute("aria-labelledby", "tabs-test-tab-panel-1");
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(screen.getByText("Conteúdo do Painel 1")).toBeInTheDocument();
  });

  it("does not render when inactive and lazy=true (default)", () => {
    const context = createMockContext({ value: "panel-2" });
    render(
      <TabsContext.Provider value={context}>
        <TabsPanel value="panel-1">
          <p>Conteúdo Inativo</p>
        </TabsPanel>
      </TabsContext.Provider>
    );

    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
  });

  it("renders with hidden attribute when inactive and lazy=false", () => {
    const context = createMockContext({ value: "panel-2" });
    const { container } = render(
      <TabsContext.Provider value={context}>
        <TabsPanel value="panel-1" lazy={false}>
          <p>Conteúdo Oculto</p>
        </TabsPanel>
      </TabsContext.Provider>
    );

    const panel = container.querySelector('[id="tabs-test-panel-panel-1"]');
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("hidden");
  });

  it("forwards ref to div element", () => {
    const ref = createRef<HTMLDivElement>();
    const context = createMockContext({ value: "panel-1" });
    render(
      <TabsContext.Provider value={context}>
        <TabsPanel value="panel-1" ref={ref}>
          Ref Panel
        </TabsPanel>
      </TabsContext.Provider>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
