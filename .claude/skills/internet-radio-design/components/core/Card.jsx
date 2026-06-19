import React from "react";

/**
 * Card — a glass surface container. "panel" is the workhorse (blurred,
 * bordered); "sheet" is the heavier modal base; "plain" is a flat
 * translucent tile. Soft, large radius.
 */
export function Card({ children, variant = "panel", padding = 20, style = {}, ...rest }) {
  const variants = {
    panel: {
      background: "var(--glass-strong-fill)",
      backdropFilter: "var(--blur-strong)",
      WebkitBackdropFilter: "var(--blur-strong)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
    },
    sheet: {
      background: "var(--bg-sheet)",
      backdropFilter: "var(--blur-sheet)",
      WebkitBackdropFilter: "var(--blur-sheet)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-3xl)",
      boxShadow: "var(--shadow-sheet)",
    },
    plain: {
      background: "var(--surface)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
    },
  };
  return (
    <div
      style={{
        padding,
        color: "var(--fg)",
        fontFamily: "var(--font-sans)",
        boxSizing: "border-box",
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
