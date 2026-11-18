"use client";

import React from "react";
import styles from "./index.module.css";

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardBody} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}
