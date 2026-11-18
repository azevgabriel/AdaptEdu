"use client";

import React from "react";
import { useRadioButton } from "../context";
import styles from "./index.module.css";

export interface RadioIndicatorProps {
  checked?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  dotClassName?: string;
  style?: React.CSSProperties;
}

export function RadioIndicator({
  checked: checkedProp,
  size: sizeProp,
  className,
  dotClassName,
  style,
}: RadioIndicatorProps) {
  const radioContext = useRadioButton();
  const checked = checkedProp ?? radioContext?.checked ?? false;
  const size = sizeProp ?? radioContext?.size ?? "md";

  const sizeClass =
    size === "sm"
      ? styles.indicatorSm
      : size === "lg"
      ? styles.indicatorLg
      : styles.indicatorMd;

  return (
    <span
      className={`${styles.radioIndicator} ${sizeClass} ${
        checked ? styles.radioIndicatorChecked : ""
      } ${className || ""}`.trim()}
      aria-hidden="true"
      style={style}
    >
      {checked && (
        <span
          className={`${styles.radioIndicatorDot} ${
            dotClassName || ""
          }`.trim()}
        />
      )}
    </span>
  );
}
