"use client";

import React from "react";
import styles from "./index.module.css";

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardFooter} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}
