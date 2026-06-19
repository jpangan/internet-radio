import * as React from "react";

export interface FlagProps {
  /** ISO 3166-1 alpha-2 country code (e.g. "GB", "JP"). */
  code: string;
  /** Width in px; height is derived at a 3:2 ratio. @default 20 */
  width?: number;
  /** Corner radius in px. @default 3 */
  radius?: number;
  style?: React.CSSProperties;
}

/** Country flag (3:2) from an ISO code, served via flagcdn.com, with a globe fallback. */
export function Flag(props: FlagProps): JSX.Element;
