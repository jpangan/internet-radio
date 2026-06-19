import React from "react";

/**
 * Button — the brand's primary action control.
 * Variants: "primary" (violet gradient pill + glow), "secondary" (glass pill),
 * "ghost" (transparent, hover-fills). Always fully rounded.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13, gap: 6 },
    md: { padding: "12px 28px", fontSize: 14, gap: 8 },
    lg: { padding: "14px 32px", fontSize: 15, gap: 8 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-semibold)",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "background .2s ease, box-shadow .2s ease, transform .1s ease, color .2s ease",
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent",
  };

  const variants = {
    primary: {
      background: "var(--gradient-accent)",
      color: "#fff",
      boxShadow: "var(--glow-accent-sm)",
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--fg)",
      border: "1px solid var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-2)",
    },
  };

  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: { boxShadow: "var(--glow-accent-lg)" },
    secondary: { background: "var(--surface-hover)", borderColor: "var(--border-strong)" },
    ghost: { background: "var(--surface)", color: "var(--fg)" },
  }[variant] : {};

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
    </button>
  );
}
