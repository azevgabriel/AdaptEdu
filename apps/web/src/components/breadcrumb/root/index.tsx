"use client";

import React, { forwardRef, useMemo } from "react";
import { BreadcrumbContext, type BreadcrumbContextValue } from "../context";
import styles from "./index.module.css";
import type { BreadcrumbProps } from "../types";

export const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      separator = "/",
      "aria-label": ariaLabelProp,
      ariaLabel,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedAriaLabel = ariaLabelProp || ariaLabel || "Navegação estrutural";

    const contextValue = useMemo<BreadcrumbContextValue>(
      () => ({ separator }),
      [separator]
    );

    return (
      <BreadcrumbContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label={resolvedAriaLabel}
          className={`${styles.nav} ${className || ""}`.trim()}
          {...props}
        >
          {children}
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
);

BreadcrumbRoot.displayName = "BreadcrumbRoot";
