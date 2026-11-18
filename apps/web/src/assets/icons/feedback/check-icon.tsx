import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseIcon>
  );
}
