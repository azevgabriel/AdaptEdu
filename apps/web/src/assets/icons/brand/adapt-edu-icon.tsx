import React from "react";
import { BaseIcon } from "../base-icon";
import type { IconProps } from "../types";

export function AdaptEduIcon(props: IconProps) {
  return (
    <BaseIcon strokeWidth="2.2" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </BaseIcon>
  );
}
