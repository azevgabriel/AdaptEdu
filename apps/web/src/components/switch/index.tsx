"use client";

import React, { useId } from "react";
import styles from "./index.module.css";

export interface SwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Switch({
  id,
  checked,
  onChange,
  disabled = false,
  label,
  description,
  ariaLabel,
  ariaLabelledBy,
  name,
  size = "md",
  className,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id || `switch-${generatedId}`;
  const labelId = `switch-label-${generatedId}`;
  const descId = `switch-desc-${generatedId}`;

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const hasLabelOrDesc = Boolean(label || description);

  return (
    <div
      className={`${styles.container} ${styles[size]} ${disabled ? styles.disabled : ""} ${className || ""}`.trim()}
    >
      {hasLabelOrDesc && (
        <div className={styles.textWrapper}>
          {label && (
            <label
              id={labelId}
              htmlFor={switchId}
              className={styles.label}
              onClick={handleToggle}
            >
              {label}
            </label>
          )}
          {description && (
            <p id={descId} className={styles.description}>
              {description}
            </p>
          )}
        </div>
      )}

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (label ? labelId : undefined)}
        aria-describedby={description ? descId : undefined}
        disabled={disabled}
        name={name}
        className={`${styles.switch} ${checked ? styles.checked : ""}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </button>
    </div>
  );
}
