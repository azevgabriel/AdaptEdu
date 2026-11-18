"use client";

import React from "react";
import styles from "./index.module.css";

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardHeader} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}
