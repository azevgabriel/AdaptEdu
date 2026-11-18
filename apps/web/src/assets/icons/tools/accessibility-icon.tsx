import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function AccessibilityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="4" r="2" />
      <path d="M4 8h16" />
      <path d="M12 8v13" />
      <path d="M8 21l4-5 4 5" />
    </BaseIcon>
  );
}
