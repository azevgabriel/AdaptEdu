"use client";

import React from "react";
import styles from "./index.module.css";

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`${styles.cardDescription} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}
