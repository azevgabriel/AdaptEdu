"use client";

import React, { forwardRef } from "react";
import type { MenuProps } from "../types";
import styles from "./index.module.css";

export const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(
  function MenuRoot(
    {
      role = "menu",
      align = "right",
      className,
      children,
      ...props
    },
    ref
  ) {
    const alignClass = align === "left" ? styles.alignLeft : styles.alignRight;

    return (
      <div
        ref={ref}
        role={role}
        className={`${styles.menu} ${alignClass} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);
