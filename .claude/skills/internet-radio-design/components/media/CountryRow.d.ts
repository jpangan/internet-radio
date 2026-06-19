import * as React from "react";

export interface CountryRowProps {
  name: string;
  /** ISO 3166-1 alpha-2 code for the flag. */
  code: string;
  /** Station count shown in the trailing pill. */
  stationCount?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** Country browse row — flag tile, name, station-count pill, chevron. */
export function CountryRow(props: CountryRowProps): JSX.Element;
