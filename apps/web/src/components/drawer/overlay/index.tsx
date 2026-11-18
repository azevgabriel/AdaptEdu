"use client";

import React, { forwardRef } from "react";
import { useDrawerContext } from "../context";
import styles from "./index.module.css";
import type { DrawerOverlayProps } from "../types";

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onClose, closeOnOverlayClick } = useDrawerContext();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && closeOnOverlayClick) {
        onClose();
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.overlay} ${className || ""}`.trim()}
        onClick={handleClick}
        aria-hidden="true"
        data-testid="drawer-overlay"
        {...props}
      />
    );
  }
);

DrawerOverlay.displayName = "DrawerOverlay";
