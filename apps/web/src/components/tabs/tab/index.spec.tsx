import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabsTab } from "./index";
import { TabsContext, type TabsContextValue } from "../context";

describe("TabsTab", () => {
  const createMockContext = (
    overrides?: Partial<TabsContextValue>
  ): TabsContextValue => ({
    value: "tab-1",
    setValue: vi.fn(),
    orientation: "horizontal",
    variant: "line",
    size: "md",
    fitted: false,
    activationMode: "automatic",
    baseId: "test-tabs",
    registerTab: vi.fn(),
    unregisterTab: vi.fn(),
    tabElementsRef: { current: new Map() },
    ...overrides,
  });

  it("renders with role='tab' and selected state when matching active value", () => {
    const context = createMockContext({ value: "tab-1" });
    render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-1" badge="3">
          Aba 1
        </TabsTab>
      </TabsContext.Provider>
    );

    const tab = screen.getByRole("tab", { name: /aba 1/i });
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveAttribute("tabindex", "0");
    expect(tab).toHaveAttribute("id", "test-tabs-tab-tab-1");
    expect(tab).toHaveAttribute("aria-controls", "test-tabs-panel-tab-1");
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders unselected state when value does not match active value", () => {
    const context = createMockContext({ value: "tab-2" });
    render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-1">Aba 1</TabsTab>
      </TabsContext.Provider>
    );

    const tab = screen.getByRole("tab", { name: "Aba 1" });
    expect(tab).toHaveAttribute("aria-selected", "false");
    expect(tab).toHaveAttribute("tabindex", "-1");
  });

  it("calls setValue on click", async () => {
    const user = userEvent.setup();
    const context = createMockContext({ value: "tab-1" });

    render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-2">Aba 2</TabsTab>
      </TabsContext.Provider>
    );

    const tab = screen.getByRole("tab", { name: "Aba 2" });
    await user.click(tab);

    expect(context.setValue).toHaveBeenCalledWith("tab-2");
  });

  it("does not call setValue when tab is disabled", async () => {
    const user = userEvent.setup();
    const context = createMockContext({ value: "tab-1" });

    render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-2" disabled>
          Aba 2
        </TabsTab>
      </TabsContext.Provider>
    );

    const tab = screen.getByRole("tab", { name: "Aba 2" });
    await user.click(tab);

    expect(context.setValue).not.toHaveBeenCalled();
  });

  it("registers and unregisters on mount/unmount", () => {
    const context = createMockContext();
    const { unmount } = render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-1">Aba 1</TabsTab>
      </TabsContext.Provider>
    );

    expect(context.registerTab).toHaveBeenCalledWith("tab-1", expect.any(HTMLButtonElement));

    unmount();
    expect(context.unregisterTab).toHaveBeenCalledWith("tab-1");
  });

  it("forwards ref to button element (both object and function ref)", () => {
    const ref = createRef<HTMLButtonElement>();
    let functionNode: HTMLButtonElement | null = null;
    const context = createMockContext();

    render(
      <TabsContext.Provider value={context}>
        <TabsTab value="tab-1" ref={ref}>
          Ref Tab
        </TabsTab>
        <TabsTab
          value="tab-2"
          ref={(node) => {
            functionNode = node;
          }}
        >
          Function Ref Tab
        </TabsTab>
      </TabsContext.Provider>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(functionNode).toBeInstanceOf(HTMLButtonElement);
  });
});
