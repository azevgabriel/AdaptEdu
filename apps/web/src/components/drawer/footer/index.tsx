"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { DrawerFooterProps } from "../types";

export const DrawerFooter = forwardRef<HTMLElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={`${styles.footer} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

DrawerFooter.displayName = "DrawerFooter";
