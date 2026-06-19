import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "panel" */
  variant?: "panel" | "sheet" | "plain";
  /** Inner padding in px. @default 20 */
  padding?: number;
  children?: React.ReactNode;
}

/** Glass surface container — blurred panel, heavier modal sheet, or flat translucent tile. */
export function Card(props: CardProps): JSX.Element;
