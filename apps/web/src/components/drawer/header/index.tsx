"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { DrawerHeaderProps } from "../types";

export const DrawerHeader = forwardRef<HTMLElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`${styles.header} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </header>
    );
  }
);

DrawerHeader.displayName = "DrawerHeader";
