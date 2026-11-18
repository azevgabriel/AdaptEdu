"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { DrawerBodyProps } from "../types";

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.body} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = "DrawerBody";
