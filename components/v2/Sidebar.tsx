"use client";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export type View = "home" | "search" | "browse" | "library";

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
    <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5"/>
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" fill={fill}/>
    </svg>
  );
  if (name === "search") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
  if (name === "browse") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
    </svg>
  );
  if (name === "library") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4v17M10 4v17"/>
      <rect x="14" y="4" width="6" height="17" rx="1.5" fill={fill}
        style={{ transform: "rotate(12deg)", transformOrigin: "17px 12px" }}/>
    </svg>
  );
  return null;
}

interface SidebarProps {
  view: View;
  onNav: (v: View) => void;
  favCount: number;
}

export default function Sidebar({ view, onNav, favCount }: SidebarProps) {
  return (
    <nav style={{
      width: 248, flexShrink: 0, height: "100%", display: "flex", flexDirection: "column",
      padding: "20px 14px", gap: 6, borderRight: "1px solid var(--v-hairline)",
      background: "var(--v-bg-2)",
    }}>
      <div style={{ padding: "4px 10px 18px" }}>
        <Logo />
      </div>
      {NAV.map((n) => {
        const active = view === n.key;
        return (
          <button
            key={n.key}
            type="button"
            onClick={() => onNav(n.key)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "11px 14px", borderRadius: "var(--v-r-md)",
              border: "none", cursor: "pointer", textAlign: "left", width: "100%",
              background: active ? "var(--v-elev-2)" : "transparent",
              color: active ? "var(--v-fg)" : "var(--v-fg-3)",
              fontSize: 15, fontWeight: active ? 700 : 600,
              transition: "background .15s, color .15s",
            }}
          >
            <NavIcon name={n.key} active={active} />
            <span>{n.label}</span>
            {n.key === "library" && favCount > 0 && (
              <span style={{
                marginLeft: "auto", fontSize: 11, fontWeight: 700,
                color: "var(--v-accent)", background: "var(--v-accent-soft)",
                borderRadius: 99, padding: "2px 8px",
              }}>{favCount}</span>
            )}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <ThemeToggle wide />
    </nav>
  );
}
