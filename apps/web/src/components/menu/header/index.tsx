"use client";

import React from "react";
import type { MenuHeaderProps } from "../types";
import styles from "./index.module.css";

export function MenuHeader({
  className,
  children,
  ...props
}: MenuHeaderProps) {
  return (
    <div
      role="none"
      className={`${styles.menuHeader} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
