"use client";

import React from "react";
import styles from "./index.module.css";

export interface RadioLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export function RadioLabel({ className, children, ...props }: RadioLabelProps) {
  return (
    <span
      className={`${styles.defaultLabel} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}

export interface RadioDescriptionProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export function RadioDescription({
  className,
  children,
  ...props
}: RadioDescriptionProps) {
  return (
    <span
      className={`${styles.defaultDescription} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
