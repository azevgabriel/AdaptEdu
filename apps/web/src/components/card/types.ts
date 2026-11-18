import React from "react";

export type CardElement = "div" | "article" | "section" | "button";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  variant?: "default" | "subtle" | "bordered";
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  type?: "button" | "submit" | "reset";
  disabledReason?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}
