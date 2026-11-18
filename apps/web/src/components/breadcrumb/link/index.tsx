"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import type { BreadcrumbLinkProps } from "../types";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ href = "#", icon, className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={`${styles.link} ${className || ""}`.trim()}
        {...props}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </Link>
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";
