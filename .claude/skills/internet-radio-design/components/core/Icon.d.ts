import * as React from "react";

export type IconName =
  | "globe" | "search" | "heart" | "share" | "list"
  | "chevronRight" | "chevronLeft" | "arrowLeft" | "x" | "check" | "copy"
  | "radio" | "signal"
  | "play" | "pause" | "prev" | "next" | "volume" | "volumeMute";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /** px. @default 24 */
  size?: number;
  /** Stroke icons only. @default 1.75 */
  strokeWidth?: number;
}

/** The product's inline SVG icon set — Lucide-style strokes, custom radio glyphs, solid transport icons. Inherits currentColor. */
export function Icon(props: IconProps): JSX.Element;
