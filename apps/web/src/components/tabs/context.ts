"use client";

import { createContext, useContext, type RefObject } from "react";
import type { TabsOrientation, TabsVariant, TabsSize } from "./types";

export interface TabsContextValue<T = string> {
  value: T | undefined;
  setValue: (value: T) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  size: TabsSize;
  fitted: boolean;
  activationMode: "automatic" | "manual";
  baseId: string;
  registerTab: (value: T, node: HTMLButtonElement | null) => void;
  unregisterTab: (value: T) => void;
  tabElementsRef: RefObject<Map<T, HTMLButtonElement>>;
}

export const TabsContext = createContext<TabsContextValue<string> | null>(null);

export function useTabsContext<T = string>(): TabsContextValue<T> {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components must be rendered within a <Tabs> container."
    );
  }
  return context as unknown as TabsContextValue<T>;
}
