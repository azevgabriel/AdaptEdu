"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { useTabsContext } from "../context";
import styles from "./index.module.css";
import type { TabsTabProps } from "../types";

function TabsTabComponent<T extends string = string>(
  {
    value,
    icon,
    badge,
    className,
    activeClassName,
    children,
    type = "button",
    disabled,
    onClick,
    ...props
  }: TabsTabProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    value: activeValue,
    setValue,
    variant,
    size,
    fitted,
    baseId,
    registerTab,
    unregisterTab,
  } = useTabsContext<T>();

  const internalRef = useRef<HTMLButtonElement | null>(null);
  const isSelected = activeValue !== undefined && activeValue === value;

  useEffect(() => {
    registerTab(value, internalRef.current);
    return () => {
      unregisterTab(value);
    };
  }, [value, registerTab, unregisterTab]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) {
      setValue(value);
    }
  };

  const tabClasses = [
    styles.tab,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fitted ? styles.fitted : undefined,
    isSelected ? styles.isSelected : undefined,
    isSelected && activeClassName ? activeClassName : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      id={`${baseId}-tab-${String(value)}`}
      role="tab"
      type={type}
      disabled={disabled}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${String(value)}`}
      tabIndex={isSelected ? 0 : -1}
      className={tabClasses}
      onClick={handleClick}
      {...props}
    >
      {icon && (
        <span className={styles.iconSlot} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && <span className={styles.badgeSlot}>{badge}</span>}
    </button>
  );
}

export type TabsTabType = (<T extends string = string>(
  props: TabsTabProps<T> & React.RefAttributes<HTMLButtonElement>
) => React.ReactNode) & {
  displayName?: string;
};

export const TabsTab = forwardRef(
  TabsTabComponent as unknown as React.ForwardRefRenderFunction<
    HTMLButtonElement,
    TabsTabProps<string>
  >
) as unknown as TabsTabType;

TabsTab.displayName = "TabsTab";
export const TabsTrigger = TabsTab;
