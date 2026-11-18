import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TabsList } from "./index";
import { TabsContext, type TabsContextValue } from "../context";

describe("TabsList", () => {
  const createMockContext = (
    overrides?: Partial<TabsContextValue>
  ): TabsContextValue => {
    const tabElementsMap = new Map();
    return {
      value: "tab-1",
      setValue: vi.fn(),
      orientation: "horizontal",
      variant: "line",
      size: "md",
      fitted: true,
      activationMode: "automatic",
      baseId: "tabs-test",
      registerTab: vi.fn((val, el) => {
        if (el) tabElementsMap.set(val, el);
      }),
      unregisterTab: vi.fn((val) => tabElementsMap.delete(val)),
      tabElementsRef: { current: tabElementsMap },
      ...overrides,
    };
  };

  it("renders with role='tablist' and accessible label", () => {
    const context = createMockContext();
    render(
      <TabsContext.Provider value={context}>
        <TabsList aria-label="Abas de Navegação">
          <button type="button">Tab 1</button>
        </TabsList>
      </TabsContext.Provider>
    );

    const tablist = screen.getByRole("tablist", {
      name: "Abas de Navegação",
    });
    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
    expect(tablist.className).toContain("fitted");
  });

  it("navigates tabs using ArrowRight, ArrowLeft, Home, and End keys", () => {
    const context = createMockContext();
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    context.tabElementsRef.current!.set("tab-1", btn1);
    context.tabElementsRef.current!.set("tab-2", btn2);
    context.tabElementsRef.current!.set("tab-3", btn3);

    const spyFocus1 = vi.spyOn(btn1, "focus");
    vi.spyOn(btn2, "focus");
    const spyFocus3 = vi.spyOn(btn3, "focus");

    render(
      <TabsContext.Provider value={context}>
        <TabsList ariaLabel="Abas">
          <span>Abas</span>
        </TabsList>
      </TabsContext.Provider>
    );

    const tablist = screen.getByRole("tablist");

    // ArrowRight moves to index 0 when no tab active
    fireEvent.keyDown(tablist, { key: "ArrowRight" });
    expect(spyFocus1).toHaveBeenCalled();
    expect(context.setValue).toHaveBeenCalledWith("tab-1");

    // End key moves to last tab
    fireEvent.keyDown(tablist, { key: "End" });
    expect(spyFocus3).toHaveBeenCalled();
    expect(context.setValue).toHaveBeenCalledWith("tab-3");

    // Home key moves to first tab
    fireEvent.keyDown(tablist, { key: "Home" });
    expect(spyFocus1).toHaveBeenCalled();
    expect(context.setValue).toHaveBeenCalledWith("tab-1");

    // ArrowLeft wraps around to last tab
    fireEvent.keyDown(tablist, { key: "ArrowLeft" });
    expect(spyFocus3).toHaveBeenCalled();
  });

  it("forwards ref to div element", () => {
    const ref = createRef<HTMLDivElement>();
    const context = createMockContext();
    render(
      <TabsContext.Provider value={context}>
        <TabsList ref={ref}>
          <button type="button">Tab</button>
        </TabsList>
      </TabsContext.Provider>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
