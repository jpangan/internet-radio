import React from "react";

/**
 * IconButton — circular control holding a single inline SVG icon.
 * Hover fills with a faint surface; press shrinks. Use `tone` for
 * accent / favorite states.
 */
export function IconButton({
  children,
  label,
  size = "md",
  tone = "default",
  active = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = { sm: 32, md: 36, lg: 44 }[size] || 36;
  const [hover, setHover] = React.useState(false);

  const toneColor = {
    default: "var(--fg-2)",
    accent: "var(--accent-hover)",
    fav: "var(--fav)",
  }[tone];

  const idle = active && tone === "fav" ? "var(--fav)"
    : active && tone === "accent" ? "var(--accent-hover)"
    : "var(--fg-2)";

  const hoverBg = tone === "fav" ? "var(--fav-soft)"
    : tone === "accent" ? "var(--accent-soft)"
    : "var(--surface)";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.92)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims,
        height: dims,
        flexShrink: 0,
        borderRadius: "var(--radius-full)",
        border: "none",
        background: hover && !disabled ? hoverBg : "transparent",
        color: hover && !disabled ? toneColor : idle,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        transition: "background .2s ease, color .2s ease, transform .1s ease",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
