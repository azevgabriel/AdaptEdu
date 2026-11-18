"use client";

import React, {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { TabsContext, type TabsContextValue } from "../context";
import styles from "./index.module.css";
import type { TabsProps } from "../types";

function TabsRootComponent<T extends string = string>(
  {
    value: valueProp,
    defaultValue,
    onChange,
    onValueChange,
    orientation = "horizontal",
    variant = "line",
    size = "md",
    fitted = false,
    activationMode = "automatic",
    id,
    className,
    children,
    ...props
  }: TabsProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const generatedId = useId();
  const baseId = id || `tabs-${generatedId}`;

  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    defaultValue
  );
  const isControlled = valueProp !== undefined;
  const activeValue = isControlled ? valueProp : uncontrolledValue;

  const tabElementsRef = useRef<Map<T, HTMLButtonElement>>(new Map());

  const registerTab = useCallback(
    (val: T, node: HTMLButtonElement | null) => {
      if (node) {
        tabElementsRef.current.set(val, node);
      } else {
        tabElementsRef.current.delete(val);
      }
    },
    []
  );

  const unregisterTab = useCallback((val: T) => {
    tabElementsRef.current.delete(val);
  }, []);

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
      onValueChange?.(nextValue);
    },
    [isControlled, onChange, onValueChange]
  );

  const contextValue = useMemo<TabsContextValue<T>>(
    () => ({
      value: activeValue,
      setValue,
      orientation,
      variant,
      size,
      fitted,
      activationMode,
      baseId,
      registerTab,
      unregisterTab,
      tabElementsRef,
    }),
    [
      activeValue,
      setValue,
      orientation,
      variant,
      size,
      fitted,
      activationMode,
      baseId,
      registerTab,
      unregisterTab,
    ]
  );

  const tabsClasses = [
    styles.tabs,
    styles[`orientation-${orientation}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TabsContext.Provider
      value={contextValue as unknown as TabsContextValue<string>}
    >
      <div ref={ref} id={baseId} className={tabsClasses} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsRootType = (<T extends string = string>(
  props: TabsProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactNode) & {
  displayName?: string;
};

export const TabsRoot = forwardRef(
  TabsRootComponent as unknown as React.ForwardRefRenderFunction<
    HTMLDivElement,
    TabsProps<string>
  >
) as unknown as TabsRootType;

TabsRoot.displayName = "TabsRoot";
