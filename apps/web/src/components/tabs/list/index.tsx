"use client";

import React, { forwardRef } from "react";
import { useTabsContext } from "../context";
import styles from "./index.module.css";
import type { TabsListProps } from "../types";

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (
    {
      "aria-label": ariaLabelProp,
      ariaLabel,
      className,
      children,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const {
      orientation,
      variant,
      fitted,
      activationMode,
      setValue,
      tabElementsRef,
    } = useTabsContext();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const tabsMap = tabElementsRef.current;
      if (!tabsMap || tabsMap.size === 0) return;

      const entries = Array.from(tabsMap.entries()).filter(
        ([, el]) => el && !el.disabled
      );
      if (entries.length === 0) return;

      const currentIndex = entries.findIndex(
        ([, el]) => el === document.activeElement
      );

      const isHorizontal = orientation === "horizontal";
      const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
      const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

      let targetIndex = -1;

      if (event.key === nextKey) {
        event.preventDefault();
        targetIndex =
          currentIndex === -1 || currentIndex === entries.length - 1
            ? 0
            : currentIndex + 1;
      } else if (event.key === prevKey) {
        event.preventDefault();
        targetIndex =
          currentIndex <= 0 ? entries.length - 1 : currentIndex - 1;
      } else if (event.key === "Home") {
        event.preventDefault();
        targetIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        targetIndex = entries.length - 1;
      }

      if (targetIndex !== -1) {
        const [targetValue, targetElement] = entries[targetIndex];
        targetElement.focus();
        if (activationMode === "automatic") {
          setValue(targetValue);
        }
      }
    };

    const listClasses = [
      styles.tabList,
      styles[`variant-${variant}`],
      styles[`orientation-${orientation}`],
      fitted ? styles.fitted : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabelProp || ariaLabel}
        className={listClasses}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "TabsList";
