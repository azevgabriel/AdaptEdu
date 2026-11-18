"use client";

import React from "react";
import type { CardTitleProps } from "../types";
import styles from "./index.module.css";

export function CardTitle({
  as: Component = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={`${styles.cardTitle} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
