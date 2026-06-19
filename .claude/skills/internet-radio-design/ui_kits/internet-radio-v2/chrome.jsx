// V2 chrome — desktop sidebar, mobile bottom nav, top bar.
const { Icon } = window.InternetRadioDesignSystem_7e870d;

const NAV = [
  { key: "home", label: "Home", icon: "home" },
  { key: "search", label: "Search", icon: "search" },
  { key: "browse", label: "Browse", icon: "globe" },
  { key: "library", label: "Library", icon: "library" },
];

// Extra glyphs not in the DS Icon set.
function NavGlyph({ name, size = 22, active }) {
  const sw = active ? 2.2 : 1.9;
  if (name === "home") return (<svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" fill={active ? "currentColor" : "none"}/></svg>);
  if (name === "library") return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M5 4v17M10 4v17"/><rect x="14" y="4" width="6" height="17" rx="1.5" fill={active ? "currentColor" : "none"} transform="rotate(12 17 12)"/></svg>);
  return <Icon name={name} size={size} strokeWidth={sw} />;
}

function Logo({ compact }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))", color: "#fff", boxShadow: "0 4px 16px rgba(108,92,231,0.4)" }}>
        <Icon name="signal" size={20} />
      </div>
      {!compact && <div style={{ fontSize: 16, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>Internet Radio</div>}
    </div>
  );
}

function Sidebar({ view, onNav, theme, onToggleTheme, favCount }) {
  return (
    <nav style={{ width: 248, flexShrink: 0, height: "100%", display: "flex", flexDirection: "column",
      padding: "20px 14px", gap: 6, borderRight: "1px solid var(--v-hairline)", background: "var(--v-bg-2)" }}>
      <div style={{ padding: "4px 10px 18px" }}><Logo /></div>
      {NAV.map((n) => {
        const active = view === n.key;
        return (
          <button key={n.key} type="button" onClick={() => onNav(n.key)} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "11px 14px", borderRadius: "var(--v-r-md)",
            border: "none", cursor: "pointer", textAlign: "left", width: "100%",
            background: active ? "var(--v-elev-2)" : "transparent",
            color: active ? "var(--v-fg)" : "var(--v-fg-3)", fontSize: 15, fontWeight: active ? 700 : 600,
            transition: "background .15s, color .15s",
          }}>
            <NavGlyph name={n.icon} size={22} active={active} />
            <span>{n.label}</span>
            {n.key === "library" && favCount > 0 && (
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "var(--v-accent)", background: "var(--v-accent-soft)", borderRadius: 99, padding: "2px 8px" }}>{favCount}</span>
            )}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} wide />
    </nav>
  );
}

function ThemeToggle({ theme, onToggle, wide }) {
  return (
    <button type="button" onClick={onToggle} aria-label="Toggle theme" style={{
      display: "flex", alignItems: "center", justifyContent: wide ? "flex-start" : "center", gap: 10,
      padding: wide ? "11px 14px" : 0, width: wide ? "100%" : 38, height: wide ? "auto" : 38,
      borderRadius: wide ? "var(--v-r-md)" : "var(--v-r-pill)", cursor: "pointer",
      border: "1px solid var(--v-hairline)", background: "var(--v-elev)", color: "var(--v-fg-2)",
      fontSize: 14, fontWeight: 600,
    }}>
      {theme === "dark"
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>}
      {wide && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}

// Sticky top bar inside the main scroll area (desktop): greeting + theme.
function TopBar({ title, theme, onToggleTheme, onBack }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", gap: 14,
      padding: "16px 4px", background: "linear-gradient(var(--v-bg) 60%, transparent)" }}>
      {onBack && (
        <button type="button" onClick={onBack} aria-label="Back" style={{ width: 36, height: 36, borderRadius: 99, border: "none", cursor: "pointer", background: "var(--v-elev-2)", color: "var(--v-fg)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="chevronLeft" size={18} strokeWidth={2.4} /></button>
      )}
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--v-fg)" }}>{title}</h1>
      <div style={{ marginLeft: "auto" }} />
    </div>
  );
}

function MobileNav({ view, onNav, favCount }) {
  return (
    <nav style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 40, display: "flex",
      borderTop: "1px solid var(--v-hairline)", background: "var(--v-mat-chrome)", backdropFilter: "var(--v-mat-blur)",
      WebkitBackdropFilter: "var(--v-mat-blur)", padding: "8px 8px max(8px, env(safe-area-inset-bottom))" }}>
      {NAV.map((n) => {
        const active = view === n.key;
        return (
          <button key={n.key} type="button" onClick={() => onNav(n.key)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 0",
            border: "none", background: "transparent", cursor: "pointer",
            color: active ? "var(--v-accent)" : "var(--v-fg-3)", fontSize: 10.5, fontWeight: 650,
          }}>
            <NavGlyph name={n.icon} size={23} active={active} />
            {n.label}
          </button>
        );
      })}
    </nav>
  );
}

Object.assign(window, { Sidebar, MobileNav, TopBar, ThemeToggle, Logo, NavGlyph });
