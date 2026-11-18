import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTab,
  TabsTrigger,
  TabsPanel,
  TabsContent,
  TabList,
  Tab,
  TabTrigger,
  TabPanel,
  TabContent,
  useTabsContext,
} from "./index";

describe("Tabs Compound Barrel Exports", () => {
  it("exports root Tabs and individual subcomponents", () => {
    expect(Tabs).toBeDefined();
    expect(TabsRoot).toBeDefined();
    expect(TabsList).toBeDefined();
    expect(TabsTab).toBeDefined();
    expect(TabsTrigger).toBeDefined();
    expect(TabsPanel).toBeDefined();
    expect(TabsContent).toBeDefined();
  });

  it("attaches all compound subcomponents onto Tabs", () => {
    expect(Tabs.Root).toBe(TabsRoot);
    expect(Tabs.List).toBe(TabsList);
    expect(Tabs.Tab).toBe(TabsTab);
    expect(Tabs.Trigger).toBe(TabsTrigger);
    expect(Tabs.Panel).toBe(TabsPanel);
    expect(Tabs.Content).toBe(TabsContent);
  });

  it("exports semantic aliases", () => {
    expect(TabList).toBe(TabsList);
    expect(Tab).toBe(TabsTab);
    expect(TabTrigger).toBe(TabsTrigger);
    expect(TabPanel).toBe(TabsPanel);
    expect(TabContent).toBe(TabsContent);
  });

  it("throws an error when useTabsContext is called outside Tabs provider", () => {
    expect(() => renderHook(() => useTabsContext())).toThrow(
      /Tabs compound components must be rendered within a <Tabs> container/
    );
  });
});
