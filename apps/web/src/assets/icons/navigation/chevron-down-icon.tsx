import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </BaseIcon>
  );
}
