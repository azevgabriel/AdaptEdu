"use client";

import React, { forwardRef } from "react";
import { useDrawerContext } from "../context";
import styles from "./index.module.css";
import type { DrawerContentProps } from "../types";

export const DrawerContent = forwardRef<HTMLElement, DrawerContentProps>(
  (
    {
      position: positionProp,
      size: sizeProp,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const context = useDrawerContext();
    const position = positionProp || context.position;
    const size = sizeProp || context.size;

    return (
      <section
        ref={(node) => {
          if (context.drawerRef) {
            context.drawerRef.current = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="dialog"
        aria-modal={context.showOverlay}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || context.titleId}
        aria-describedby={ariaDescribedBy || context.descId}
        tabIndex={-1}
        className={`${styles.panel} ${styles[position]} ${styles[size]} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </section>
    );
  }
);

DrawerContent.displayName = "DrawerContent";
export const DrawerPanel = DrawerContent;
