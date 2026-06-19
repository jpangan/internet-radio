import * as React from "react";

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Single inline SVG icon. */
  children: React.ReactNode;
  /** Accessible label (also the tooltip title). */
  label: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Colour family on hover / active. @default "default" */
  tone?: "default" | "accent" | "fav";
  /** Whether the control is in an active (selected) state. @default false */
  active?: boolean;
}

/** Circular icon-only control — hover fills with a faint surface, press shrinks. */
export function IconButton(props: IconButtonProps): JSX.Element;
