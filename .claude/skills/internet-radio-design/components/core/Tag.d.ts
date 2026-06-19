import * as React from "react";

export interface TagProps {
  children?: React.ReactNode;
  /** Violet tinted style with border (used in the share sheet). @default false */
  accent?: boolean;
  style?: React.CSSProperties;
}

/** Tiny capitalized genre / metadata chip. Low-contrast glass fill; cluster under station names. */
export function Tag(props: TagProps): JSX.Element;
