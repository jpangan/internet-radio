import * as React from "react";

export interface StationRowProps {
  name: string;
  /** Favicon URL (falls back to a radio icon). */
  favicon?: string;
  /** Genre tags — first two are shown. */
  tags?: string[];
  /** Bitrate in kbps; rendered after the tags. */
  bitrate?: number;
  /** Highlights the row with a violet inset ring + pulse dot. @default false */
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** Tappable station list row — favicon, name, genre tags + bitrate, active pulse. */
export function StationRow(props: StationRowProps): JSX.Element;
