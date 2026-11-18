"use client";

import React, { forwardRef } from "react";
import styles from "./index.module.css";
import type { FloatButtonProps } from "../types";

export const FloatButton = forwardRef<HTMLButtonElement, FloatButtonProps>(
  (
    {
      icon,
      label,
      badge,
      children,
      variant = "default",
      shape: explicitShape,
      size = "md",
      isActive = false,
      tooltip,
      type = "button",
      className,
      "aria-label": ariaLabelProp,
      ariaLabel,
      title,
      ...restProps
    },
    ref
  ) => {
    // If shape is explicitly provided, respect it; otherwise default to "pill" when
    // there's visible text (label or children) or a badge, or "circle" when icon-only.
    const hasContent = Boolean(label || children || badge);
    const shape = explicitShape ?? (hasContent ? "pill" : "circle");

    const resolvedAriaLabel =
      ariaLabelProp ||
      ariaLabel ||
      (typeof label === "string" ? label : undefined);

    const buttonClasses = [
      styles.floatButton,
      styles[`variant-${variant}`],
      styles[`shape-${shape}`],
      styles[`size-${size}`],
      isActive ? styles.isActive : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        aria-label={resolvedAriaLabel}
        title={tooltip || title}
        {...restProps}
      >
        {icon && (
          <span className={styles.iconSlot} aria-hidden="true">
            {icon}
          </span>
        )}

        {(label || children) && (
          <span className={styles.labelSlot}>{label || children}</span>
        )}

        {badge && <span className={styles.badgeSlot}>{badge}</span>}
      </button>
    );
  }
);

FloatButton.displayName = "FloatButton";
