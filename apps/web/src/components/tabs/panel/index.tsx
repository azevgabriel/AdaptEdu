"use client";

import React, { forwardRef } from "react";
import { useTabsContext } from "../context";
import styles from "./index.module.css";
import type { TabsPanelProps } from "../types";

function TabsPanelComponent<T extends string = string>(
  {
    value,
    lazy = true,
    className,
    children,
    tabIndex = 0,
    ...props
  }: TabsPanelProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { value: activeValue, baseId } = useTabsContext<T>();
  const isSelected = activeValue !== undefined && activeValue === value;

  if (!isSelected) {
    if (lazy) {
      return null;
    }
    return (
      <div
        ref={ref}
        id={`${baseId}-panel-${String(value)}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${String(value)}`}
        hidden
        tabIndex={tabIndex}
        className={`${styles.tabPanel} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={`${baseId}-panel-${String(value)}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${String(value)}`}
      tabIndex={tabIndex}
      className={`${styles.tabPanel} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export type TabsPanelType = (<T extends string = string>(
  props: TabsPanelProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactNode) & {
  displayName?: string;
};

export const TabsPanel = forwardRef(
  TabsPanelComponent as unknown as React.ForwardRefRenderFunction<
    HTMLDivElement,
    TabsPanelProps<string>
  >
) as unknown as TabsPanelType;

TabsPanel.displayName = "TabsPanel";
export const TabsContent = TabsPanel;
