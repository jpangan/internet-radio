import React from "react";

/**
 * Icon — the product's inline SVG icon set. Lucide-style 24px stroke icons
 * (globe, search, heart, share, list, chevrons, volume, x) plus the custom
 * radio-wave glyphs (radio, signal) and solid media-transport icons
 * (play, pause, prev, next). Stroke icons inherit `currentColor`.
 */
const STROKE = {
  globe: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></>,
  list: <><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  check: <polyline points="20 6 9 17 4 12" />,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  radio: <><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" /></>,
  signal: <><circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" /><path d="M8.5 10.5C9.7 9.3 10.8 8.8 12 8.8s2.3.5 3.5 1.7" /><path d="M5.5 7.5C7.4 5.6 9.6 4.6 12 4.6s4.6 1 6.5 2.9" /></>,
};

const SOLID = {
  play: <path d="M8 5v14l11-7z" />,
  pause: <><rect x="6" y="4" width="4" height="16" rx="1.5" /><rect x="14" y="4" width="4" height="16" rx="1.5" /></>,
  prev: <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />,
  next: <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />,
  volume: <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />,
  volumeMute: <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />,
};

export function Icon({ name, size = 24, strokeWidth = 1.75, style = {}, ...rest }) {
  const isSolid = name in SOLID;
  const content = isSolid ? SOLID[name] : STROKE[name];
  if (!content) return null;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={isSolid ? "currentColor" : "none"}
      stroke={isSolid ? "none" : "currentColor"}
      strokeWidth={isSolid ? undefined : strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0, ...style }}
      {...rest}
    >
      {content}
    </svg>
  );
}

/** Names available to <Icon name="…" />. */
Icon.names = [...Object.keys(STROKE), ...Object.keys(SOLID)];
