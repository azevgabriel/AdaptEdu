"use client";

import React from "react";
import styles from "./index.module.css";

export type BadgeVariant =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline"
  | "key-concept"
  | "definition"
  | "data"
  | "example";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClassMap: Record<BadgeVariant, string> = {
  neutral: styles.variantNeutral,
  brand: styles.variantBrand,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
  info: styles.variantInfo,
  outline: styles.variantOutline,
  "key-concept": styles.variantKeyConcept,
  definition: styles.variantDefinition,
  data: styles.variantData,
  example: styles.variantExample,
};

const sizeClassMap: Record<BadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export function Badge({
  variant = "neutral",
  size = "md",
  pill = false,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const variantClass = variantClassMap[variant] || styles.variantNeutral;
  const sizeClass = sizeClassMap[size] || styles.sizeMd;
  const pillClass = pill ? styles.pill : "";

  const resolvedClassName = [
    styles.badge,
    variantClass,
    sizeClass,
    pillClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={resolvedClassName} {...props}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
