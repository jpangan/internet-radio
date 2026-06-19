import React from "react";

/**
 * SearchInput — glass text field with a leading search icon and a violet
 * focus ring. Matches the modal search bars. 16px font on mobile to avoid
 * iOS zoom.
 */
export function SearchInput({ value, onChange, placeholder = "Search…", style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", width: "100%", ...style }}>
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="var(--fg-3)" strokeWidth="2"
        style={{ position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px 16px 10px 36px",
          fontSize: 16,
          fontFamily: "var(--font-sans)",
          color: "var(--fg)",
          background: "var(--glass-hover)",
          border: `1px solid ${focus ? "var(--focus-border)" : "var(--border)"}`,
          borderRadius: "var(--radius-md)",
          outline: "none",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          transition: "border-color .2s ease, box-shadow .2s ease",
        }}
        {...rest}
      />
    </div>
  );
}
