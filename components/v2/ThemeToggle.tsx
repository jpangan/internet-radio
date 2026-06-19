"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ wide }: { wide?: boolean }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        display: "flex", alignItems: "center",
        justifyContent: wide ? "flex-start" : "center",
        gap: 10,
        padding: wide ? "11px 14px" : 0,
        width: wide ? "100%" : 38,
        height: wide ? "auto" : 38,
        borderRadius: wide ? "var(--v-r-md)" : "var(--v-r-pill)",
        cursor: "pointer",
        border: "1px solid var(--v-hairline)",
        background: "var(--v-elev)",
        color: "var(--v-fg-2)",
        fontSize: 14, fontWeight: 600,
      }}
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
      )}
      {wide && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
