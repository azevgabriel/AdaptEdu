"use client";

import React from "react";
import { Badge, type BadgeProps } from "../../badge";
import styles from "./index.module.css";

export type CardBadgeProps = BadgeProps;

export function CardBadge({
  size = "sm",
  variant = "neutral",
  className,
  children,
  ...props
}: CardBadgeProps) {
  return (
    <Badge
      size={size}
      variant={variant}
      className={`${styles.cardBadge} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </Badge>
  );
}
