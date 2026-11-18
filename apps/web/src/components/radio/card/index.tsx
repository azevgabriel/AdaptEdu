"use client";

import React, { useId, useMemo } from "react";
import {
  useRadioGroup,
  RadioButtonContext,
  type RadioButtonContextValue,
  type RadioButtonState,
  type RadioButtonRenderProp,
} from "../context";
import { RadioIndicator, type RadioIndicatorProps } from "../indicator";
import styles from "./index.module.css";

/* -------------------------------------------------------------------------- */
/*                              RadioCard Primitive                           */
/* -------------------------------------------------------------------------- */

export interface RadioCardProps<T = string>
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "onChange" | "children" | "title"
  > {
  value: T;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  extra?: React.ReactNode;
  /**
   * Whether to display the circular radio indicator. Defaults to true.
   */
  showIndicator?: boolean;
  indicatorSize?: "sm" | "md" | "lg";
  activeClassName?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  children?: React.ReactNode | RadioButtonRenderProp<T>;
}

export function RadioCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardHeader} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function RadioCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`${styles.cardTitle} ${className || ""}`.trim()} {...props}>
      {children}
    </span>
  );
}

export function RadioCardBadge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`${styles.cardBadge} ${className || ""}`.trim()} {...props}>
      {children}
    </span>
  );
}

export function RadioCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`${styles.cardDescription} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}

export function RadioCardExtra({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.cardExtra} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function RadioCardIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${styles.cardIconWrapper} ${className || ""}`.trim()}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}

export function RadioCardIndicator({
  size = "md",
  className,
  ...props
}: RadioIndicatorProps) {
  return (
    <div className={`${styles.cardIndicatorWrapper} ${className || ""}`.trim()}>
      <RadioIndicator size={size} {...props} />
    </div>
  );
}

function RadioCardRoot<T = string>({
  value,
  id,
  title,
  description,
  icon,
  badge,
  extra,
  showIndicator = true,
  indicatorSize = "md",
  disabled = false,
  activeClassName,
  className,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  children,
  onClick,
  ...props
}: RadioCardProps<T>) {
  const generatedId = useId();
  const buttonId = id || `radiocard-${generatedId}`;
  const group = useRadioGroup<T>();

  const isChecked = group.value !== undefined && group.value === value;
  const isDisabled = disabled || Boolean(group.disabled);
  const tabIndex = isChecked ? 0 : -1;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !isDisabled) {
      group.onChange(value);
    }
  };

  const cardState: RadioButtonState<T> = {
    checked: isChecked,
    disabled: isDisabled,
    value,
  };

  const contextValue = useMemo<RadioButtonContextValue<T>>(
    () => ({
      checked: isChecked,
      disabled: isDisabled,
      value,
      size: "md",
    }),
    [isChecked, isDisabled, value]
  );

  const renderedContent =
    typeof children === "function" ? children(cardState) : children;

  const cardClasses = `${styles.buttonBase} ${styles.radioCard} ${
    icon ? styles.cardHasIcon : ""
  } ${isChecked ? `${styles.radioCardChecked} ${activeClassName || ""}` : ""} ${
    isDisabled ? styles.radioCardDisabled : ""
  } ${className || ""}`.trim();

  return (
    <RadioButtonContext.Provider
      value={contextValue as unknown as RadioButtonContextValue<string>}
    >
      <button
        id={buttonId}
        type="button"
        role="radio"
        aria-checked={isChecked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={isDisabled}
        tabIndex={tabIndex}
        data-state={isChecked ? "checked" : "unchecked"}
        data-checked={isChecked ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        className={cardClasses}
        onClick={handleClick}
        {...props}
      >
        {renderedContent ? (
          renderedContent
        ) : (
          <>
            {icon ? (
              <>
                <div className={styles.cardIconWrapper} aria-hidden="true">
                  {icon}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleWrapper}>
                      {title && <span className={styles.cardTitle}>{title}</span>}
                      {badge && (
                        <span className={styles.cardBadge}>{badge}</span>
                      )}
                    </div>
                    {showIndicator && (
                      <div className={styles.cardIndicatorWrapper}>
                        <RadioIndicator checked={isChecked} size={indicatorSize} />
                      </div>
                    )}
                  </div>
                  {description && (
                    <p className={styles.cardDescription}>{description}</p>
                  )}
                  {extra && <div className={styles.cardExtra}>{extra}</div>}
                </div>
              </>
            ) : (
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrapper}>
                    {title && <span className={styles.cardTitle}>{title}</span>}
                  </div>
                  {showIndicator && (
                    <div className={styles.cardIndicatorWrapper}>
                      <RadioIndicator checked={isChecked} size={indicatorSize} />
                    </div>
                  )}
                </div>
                {badge && <span className={styles.cardBadge}>{badge}</span>}
                {description && (
                  <p className={styles.cardDescription}>{description}</p>
                )}
                {extra && <div className={styles.cardExtra}>{extra}</div>}
              </div>
            )}
          </>
        )}
      </button>
    </RadioButtonContext.Provider>
  );
}

export type RadioCardComponent = (<T = string>(
  props: RadioCardProps<T>
) => React.ReactElement | null) & {
  Header: typeof RadioCardHeader;
  Title: typeof RadioCardTitle;
  Badge: typeof RadioCardBadge;
  Description: typeof RadioCardDescription;
  Extra: typeof RadioCardExtra;
  Icon: typeof RadioCardIcon;
  Indicator: typeof RadioCardIndicator;
};

export const RadioCard = Object.assign(RadioCardRoot, {
  Header: RadioCardHeader,
  Title: RadioCardTitle,
  Badge: RadioCardBadge,
  Description: RadioCardDescription,
  Extra: RadioCardExtra,
  Icon: RadioCardIcon,
  Indicator: RadioCardIndicator,
}) as RadioCardComponent;
