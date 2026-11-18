"use client";

import React, { forwardRef, useContext } from "react";
import { DrawerContext } from "../context";
import styles from "./index.module.css";
import type { DrawerDescriptionProps } from "../types";

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ id, className, children, ...props }, ref) => {
  const context = useContext(DrawerContext);
  const resolvedId = id || context?.descId;

  return (
    <p
      ref={ref}
      id={resolvedId}
      className={`${styles.description} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
});

DrawerDescription.displayName = "DrawerDescription";
