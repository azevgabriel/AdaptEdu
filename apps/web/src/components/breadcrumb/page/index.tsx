"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { BreadcrumbPageProps } from "../types";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={`${styles.page} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbPage.displayName = "BreadcrumbPage";
export const BreadcrumbCurrent = BreadcrumbPage;
