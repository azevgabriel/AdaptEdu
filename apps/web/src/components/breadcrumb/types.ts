import type {
  HTMLAttributes,
  OlHTMLAttributes,
  LiHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /**
   * Custom separator node between breadcrumb items (defaults to "/").
   */
  separator?: ReactNode;
  /**
   * Accessible landmark label for the breadcrumb navigation.
   * Defaults to "Navegação estrutural".
   */
  "aria-label"?: string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface BreadcrumbListProps extends OlHTMLAttributes<HTMLOListElement> {
  className?: string;
  children: ReactNode;
}

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  children: ReactNode;
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Destination URL.
   */
  href?: string;
  /**
   * Optional leading icon.
   */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: ReactNode;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: ReactNode;
}
