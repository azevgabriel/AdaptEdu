"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";

/* -------------------------------------------------------------------------- */
/*                               Context & Types                              */
/* -------------------------------------------------------------------------- */

export interface RadioGroupContextValue<T = string> {
  name: string;
  value: T | undefined;
  onChange: (value: T) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

const RadioGroupContext = createContext<RadioGroupContextValue<unknown> | null>(null);

export function useRadioGroup<T = string>(): RadioGroupContextValue<T> {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      "useRadioGroup must be used within a <RadioGroup> component."
    );
  }
  return context as unknown as RadioGroupContextValue<T>;
}

export interface RadioButtonContextValue<T = string> {
  checked: boolean;
  disabled: boolean;
  value: T;
  size: "sm" | "md" | "lg";
}

const RadioButtonContext = createContext<RadioButtonContextValue<unknown> | null>(null);

export function useRadioButton<T = string>(): RadioButtonContextValue<T> | null {
  return useContext(RadioButtonContext) as unknown as RadioButtonContextValue<T> | null;
}

/* -------------------------------------------------------------------------- */
/*                            RadioIndicator Component                        */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            RadioButton Component                           */
/* -------------------------------------------------------------------------- */

export interface RadioButtonState<T = string> {
  checked: boolean;
  disabled: boolean;
  value: T;
}

export type RadioButtonRenderProp<T = string> = (
  state: RadioButtonState<T>
) => React.ReactNode;

export interface RadioButtonProps<T = string>
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "onChange" | "children"
  > {
  value: T;
  label?: React.ReactNode;
  description?: React.ReactNode;
  activeClassName?: string;
  variant?: "default" | "custom";
  size?: "sm" | "md" | "lg";
  indicator?: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  children?: React.ReactNode | RadioButtonRenderProp<T>;
}

function RadioButtonRoot<T = string>({
  value,
  id,
  label,
  description,
  disabled = false,
  activeClassName,
  variant,
  size = "md",
  indicator,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  children,
  onClick,
  ...props
}: RadioButtonProps<T>) {
  const generatedId = useId();
  const buttonId = id || `radio-${generatedId}`;
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

  const resolvedVariant = variant ?? (children && !label ? "custom" : "default");

  const buttonState: RadioButtonState<T> = {
    checked: isChecked,
    disabled: isDisabled,
    value,
  };

  const contextValue = useMemo<RadioButtonContextValue<T>>(
    () => ({
      checked: isChecked,
      disabled: isDisabled,
      value,
      size,
    }),
    [isChecked, isDisabled, value, size]
  );

  const renderedContent =
    typeof children === "function" ? children(buttonState) : children;

  const buttonClasses =
    resolvedVariant === "custom"
      ? `${styles.buttonBase} ${className || ""} ${
          isChecked ? activeClassName || "" : ""
        }`.trim()
      : `${styles.buttonBase} ${styles.defaultButton} ${styles[size]} ${
          isChecked ? activeClassName || styles.checked : ""
        } ${isDisabled ? styles.disabled : ""} ${className || ""}`.trim();

  return (
    <RadioButtonContext.Provider value={contextValue}>
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
        className={buttonClasses}
        onClick={handleClick}
        {...props}
      >
        {resolvedVariant === "custom" ? (
          renderedContent
        ) : (
          <>
            <span className={styles.defaultIndicatorWrapper}>
              {indicator ?? <RadioIndicator size={size} />}
            </span>
            {(label || description || renderedContent) && (
              <div className={styles.defaultContent}>
                {label && <span className={styles.defaultLabel}>{label}</span>}
                {description && (
                  <span className={styles.defaultDescription}>{description}</span>
                )}
                {renderedContent}
              </div>
            )}
          </>
        )}
      </button>
    </RadioButtonContext.Provider>
  );
}

export type RadioButtonComponent = (<T = string>(
  props: RadioButtonProps<T>
) => React.ReactElement | null) & {
  Indicator: typeof RadioIndicator;
};

export const RadioButton = Object.assign(RadioButtonRoot, {
  Indicator: RadioIndicator,
}) as RadioButtonComponent;

/* -------------------------------------------------------------------------- */
/*                             RadioGroup Component                           */
/* -------------------------------------------------------------------------- */

export interface RadioGroupProps<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function RadioGroupRoot<T = string>({
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  orientation = "vertical",
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  style,
  children,
}: RadioGroupProps<T>) {
  const generatedId = useId();
  const groupName = name || `radiogroup-${generatedId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  // WAI-ARIA fallback: if no button is checked, ensure the first enabled radio button has tabIndex=0
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checked = container.querySelector<HTMLButtonElement>(
      'button[role="radio"][aria-checked="true"]'
    );
    if (!checked) {
      const firstEnabled = container.querySelector<HTMLButtonElement>(
        'button[role="radio"]:not([disabled])'
      );
      if (firstEnabled) {
        firstEnabled.tabIndex = 0;
      }
    }
  }, [currentValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Only process arrow / navigation keys for radiogroup
    const navKeys = [
      "ArrowDown",
      "ArrowRight",
      "ArrowUp",
      "ArrowLeft",
      "Home",
      "End",
    ];
    if (!navKeys.includes(event.key)) return;

    const radios = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        'button[role="radio"]:not([disabled])'
      )
    );
    if (radios.length === 0) return;

    const activeEl = document.activeElement as HTMLButtonElement | null;
    const currentIndex = activeEl ? radios.indexOf(activeEl) : -1;
    if (currentIndex === -1) return;

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % radios.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = radios.length - 1;
        break;
    }

    if (nextIndex !== -1 && radios[nextIndex]) {
      radios[nextIndex].focus();
      radios[nextIndex].click();
    }
  };

  const contextValue = useMemo<RadioGroupContextValue<T>>(
    () => ({
      name: groupName,
      value: currentValue,
      onChange: handleChange,
      disabled,
      orientation,
    }),
    [groupName, currentValue, handleChange, disabled, orientation]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-orientation={orientation}
        aria-disabled={disabled ? "true" : undefined}
        className={`${styles.radioGroup} ${styles[orientation]} ${
          className || ""
        }`.trim()}
        style={style}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupComponent = (<T = string>(
  props: RadioGroupProps<T>
) => React.ReactElement | null) & {
  Item: typeof RadioButton;
  Indicator: typeof RadioIndicator;
};

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioButton,
  Indicator: RadioIndicator,
}) as RadioGroupComponent;
