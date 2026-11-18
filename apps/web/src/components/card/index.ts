export * from "./types";
export * from "./root";
export * from "./header";
export * from "./title";
export * from "./description";
export * from "./body";
export * from "./badge";
export * from "./icon";
export * from "./footer";

import { CardRoot } from "./root";
import { CardHeader } from "./header";
import { CardTitle } from "./title";
import { CardDescription } from "./description";
import { CardBody } from "./body";
import { CardBadge } from "./badge";
import { CardIcon } from "./icon";
import { CardFooter } from "./footer";

export type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Body: typeof CardBody;
  Badge: typeof CardBadge;
  Icon: typeof CardIcon;
  Footer: typeof CardFooter;
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Badge: CardBadge,
  Icon: CardIcon,
  Footer: CardFooter,
}) as CardComponent;
