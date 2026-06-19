import * as React from "react";

export interface BadgeProps {
  children?: React.ReactNode;
  /** Colour family. @default "live" */
  tone?: "live" | "accent" | "fav" | "neutral";
  /** Show the leading status dot(s). @default true */
  showDot?: boolean;
  style?: React.CSSProperties;
}

/** Small uppercase status pill — "Live" pulses a dot; accent "Connecting…" bounces three. */
export function Badge(props: BadgeProps): JSX.Element;
