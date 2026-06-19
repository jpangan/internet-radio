// Header — logo lockup, active country pill, globe + favorites buttons.
const { Icon, Flag } = window.InternetRadioDesignSystem_7e870d;

function Header({ country, favCount, onOpenBrowse, onOpenFavorites }) {
  return (
    <header className="glass-panel" style={{
      position: "relative", zIndex: 10, flexShrink: 0,
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      paddingTop: "max(12px, var(--safe-top))",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 16px 12px",
      }}>
        <div style={{ display: "flex", flex: 1, minWidth: 0, alignItems: "center", gap: 10 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, flexShrink: 0, borderRadius: 12,
            background: "linear-gradient(135deg, rgba(148,136,245,0.25), rgba(124,108,240,0.15))",
            border: "1px solid rgba(124,108,240,0.35)", color: "var(--accent-hover)",
          }}>
            <Icon name="signal" size={20} />
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>Internet Radio</div>
            <div style={{ marginTop: 3, fontSize: 10, color: "var(--fg-3)" }}>Stream the world</div>
          </div>
        </div>

        {country && (
          <button type="button" onClick={onOpenBrowse} style={{
            display: "flex", flexShrink: 0, alignItems: "center", gap: 6,
            borderRadius: "var(--radius-full)", padding: "6px 12px", maxWidth: 160,
            fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg-2)",
          }}>
            <Flag code={country.iso_3166_1} width={16} radius={2} />
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{country.name}</span>
          </button>
        )}

        <button type="button" onClick={onOpenBrowse} aria-label="Select country" style={{
          display: "flex", height: 36, width: 36, flexShrink: 0, alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-full)", cursor: "pointer",
          background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg-2)",
        }}>
          <Icon name="globe" size={18} />
        </button>

        <button type="button" onClick={onOpenFavorites} aria-label="Favorites" style={{
          position: "relative", display: "flex", height: 36, width: 36, flexShrink: 0,
          alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", cursor: "pointer",
          background: favCount > 0 ? "var(--fav-soft)" : "var(--surface)",
          border: favCount > 0 ? "1px solid var(--fav-border)" : "1px solid var(--border)",
          color: favCount > 0 ? "var(--fav)" : "var(--fg-2)",
        }}>
          <Icon name="heart" size={16} style={{ fill: favCount > 0 ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 2 }} />
          {favCount > 0 && (
            <span style={{
              position: "absolute", top: -4, right: -4, display: "flex", height: 16, width: 16,
              alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)",
              fontSize: 9, fontWeight: 700, color: "#fff", background: "var(--fav)",
            }}>{favCount > 9 ? "9+" : favCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
window.Header = Header;
