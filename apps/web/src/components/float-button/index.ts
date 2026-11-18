export * from "./types";
export * from "./button";
export * from "./group";

import { FloatButton as BaseFloatButton } from "./button";
import { FloatGroup } from "./group";

export type FloatButtonComponent = typeof BaseFloatButton & {
  Group: typeof FloatGroup;
};

export const FloatButton = Object.assign(BaseFloatButton, {
  Group: FloatGroup,
}) as FloatButtonComponent;

/* Semantic Aliases */
export const FloatButtonGroup = FloatGroup;
export const FloatActionButton = FloatButton;
export const FloatActionGroup = FloatGroup;
