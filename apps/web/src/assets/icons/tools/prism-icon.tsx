import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function PrismIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 10 10 0 0 0 0-20" />
    </BaseIcon>
  );
}
