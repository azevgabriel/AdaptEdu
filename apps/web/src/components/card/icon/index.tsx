"use client";

import React from "react";
import styles from "./index.module.css";

export function CardIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${styles.cardIcon} ${className || ""}`.trim()}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}
