"use client";

import { createContext, useContext } from "react";

/* -------------------------------------------------------------------------- */
/*                            RadioGroup Context                              */
/* -------------------------------------------------------------------------- */

export interface RadioGroupContextValue<T = string> {
  name: string;
  value: T | undefined;
  onChange: (value: T) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroupContext = createContext<RadioGroupContextValue<string> | null>(
  null
);

export function useRadioGroup<T = string>(): RadioGroupContextValue<T> {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      "useRadioGroup must be used within a <RadioGroup> component."
    );
  }
  return context as unknown as RadioGroupContextValue<T>;
}

/* -------------------------------------------------------------------------- */
/*                            RadioButton Context                             */
/* -------------------------------------------------------------------------- */

export interface RadioButtonState<T = string> {
  checked: boolean;
  disabled: boolean;
  value: T;
}

export type RadioButtonRenderProp<T = string> = (
  state: RadioButtonState<T>
) => React.ReactNode;

export interface RadioButtonContextValue<T = string> {
  checked: boolean;
  disabled: boolean;
  value: T;
  size: "sm" | "md" | "lg";
}

export const RadioButtonContext = createContext<RadioButtonContextValue<string> | null>(
  null
);

export function useRadioButton<T = string>(): RadioButtonContextValue<T> | null {
  return useContext(RadioButtonContext) as unknown as RadioButtonContextValue<T> | null;
}
