"use client";

import React from "react";
import type { MenuSeparatorProps } from "../types";
import styles from "./index.module.css";

export function MenuSeparator({
  className,
  role = "separator",
  ...props
}: MenuSeparatorProps) {
  return (
    <div
      role={role}
      className={`${styles.menuSeparator} ${className || ""}`.trim()}
      {...props}
    />
  );
}
