"use client";

import React, { forwardRef, useContext } from "react";
import { DrawerContext } from "../context";
import styles from "./index.module.css";
import type { DrawerTitleProps } from "../types";

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ as: Tag = "h2", id, className, children, ...props }, ref) => {
    const context = useContext(DrawerContext);
    const resolvedId = id || context?.titleId;

    return (
      <Tag
        ref={ref}
        id={resolvedId}
        className={`${styles.title} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

DrawerTitle.displayName = "DrawerTitle";
