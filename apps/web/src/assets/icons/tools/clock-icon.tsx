import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </BaseIcon>
  );
}
