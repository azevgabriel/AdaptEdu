"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { BreadcrumbListProps } from "../types";

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={`${styles.list} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

BreadcrumbList.displayName = "BreadcrumbList";
