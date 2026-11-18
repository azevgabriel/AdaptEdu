"use client";

import React, { forwardRef } from "react";
import { useBreadcrumbContext } from "../context";
import styles from "./index.module.css";
import type { BreadcrumbSeparatorProps } from "../types";

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    const { separator } = useBreadcrumbContext();

    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={`${styles.separator} ${className || ""}`.trim()}
        {...props}
      >
        {children ?? separator}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
