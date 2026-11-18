import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseIcon>
  );
}
