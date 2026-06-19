"use client";

import type { View } from "./Sidebar";

const NAV: { key: View; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "browse", label: "Browse" },
  { key: "library", label: "Library" },
];

function NavIcon({ name, active }: { name: View; active: boolean }) {
  const sw = active ? 2.2 : 1.9;
  const fill = active ? "currentColor" : "none";
  if (name === "home") return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" fill={fill}/>
    </svg>
  );
  if (name === "search") return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
  if (name === "browse") return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
    </svg>
  );
  if (name === "library") return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4v17M10 4v17"/>
      <rect x="14" y="4" width="6" height="17" rx="1.5" fill={fill}
        style={{ transform: "rotate(12deg)", transformOrigin: "17px 12px" }}/>
    </svg>
  );
  return null;
}

interface MobileNavProps {
  view: View;
  onNav: (v: View) => void;
  favCount: number;
}

export default function MobileNav({ view, onNav, favCount }: MobileNavProps) {
  return (
    <nav style={{
      display: "flex", borderTop: "1px solid var(--v-hairline)",
      background: "var(--v-mat-chrome)", backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)",
      padding: "8px 8px max(8px, env(safe-area-inset-bottom))",
    }}>
      {NAV.map((n) => {
        const active = view === n.key;
        return (
          <button
            key={n.key}
            type="button"
            onClick={() => onNav(n.key)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 4, padding: "6px 0", border: "none", background: "transparent",
              cursor: "pointer", position: "relative",
              color: active ? "var(--v-accent)" : "var(--v-fg-3)",
              fontSize: 10.5, fontWeight: 650,
            }}
          >
            <NavIcon name={n.key} active={active} />
            {n.label}
            {n.key === "library" && favCount > 0 && (
              <span style={{
                position: "absolute", top: 2, right: "calc(50% - 18px)",
                fontSize: 9, fontWeight: 800, color: "var(--v-on-accent)",
                background: "var(--v-accent)", borderRadius: 99,
                padding: "1px 5px", lineHeight: 1.6,
              }}>{favCount > 9 ? "9+" : favCount}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
