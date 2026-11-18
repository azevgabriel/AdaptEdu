"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { BreadcrumbItemProps } from "../types";

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={`${styles.item} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </li>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";
