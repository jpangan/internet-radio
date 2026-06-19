import * as React from "react";

export interface StationArtworkProps {
  /** Favicon URL; falls back to a radio icon if missing or it fails to load. */
  src?: string;
  alt?: string;
  /** sm: 36px circle · md: 44px rounded · lg: 144px hero with glow. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Pulse the glow halo (lg only) — use while audio is playing. @default false */
  playing?: boolean;
  style?: React.CSSProperties;
}

/** Station favicon tile with rounded corners, radio-icon fallback, and a now-playing glow at lg. */
export function StationArtwork(props: StationArtworkProps): JSX.Element;
