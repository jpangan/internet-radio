import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** Optional leading icon node (an inline SVG). */
  iconLeft?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action control — violet gradient pill with a soft glow, or glass / ghost variants.
 * @startingPoint section="Core" subtitle="Pill buttons: primary, secondary, ghost" viewport="400x120"
 */
export function Button(props: ButtonProps): JSX.Element;
