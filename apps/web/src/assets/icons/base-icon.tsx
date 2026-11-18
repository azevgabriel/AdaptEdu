import React, { useId } from "react";
import type { IconProps } from "./types";

export interface BaseIconProps extends IconProps {
  children: React.ReactNode;
}

export function BaseIcon({
  size = 24,
  width,
  height,
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "2",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  title,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  role,
  children,
  ...props
}: BaseIconProps) {
  const generatedId = useId();
  const hasAccessibleName = Boolean(title || ariaLabel);
  const titleId = title ? `icon-title-${generatedId}` : undefined;
  const resolvedRole = role ?? (hasAccessibleName ? "img" : undefined);
  const resolvedAriaHidden = ariaHidden ?? (hasAccessibleName ? undefined : true);

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      focusable="false"
      role={resolvedRole}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
      aria-hidden={resolvedAriaHidden}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      {children}
    </svg>
  );
}
