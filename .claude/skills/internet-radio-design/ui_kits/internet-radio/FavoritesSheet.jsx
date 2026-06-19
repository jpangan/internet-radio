// FavoritesSheet — saved stations with empty state + remove.
const { Icon, Flag, StationArtwork } = window.InternetRadioDesignSystem_7e870d;

function FavoritesSheet({ open, onClose, favorites, onPick, onRemove, currentUuid }) {
  return (
    <window.Sheet open={open} onClose={onClose}>
      <window.SheetHeader
        onClose={onClose} iconTone="fav"
        icon={<Icon name="heart" size={16} style={{ fill: "currentColor", stroke: "none" }} />}
        title="Favorites"
        subtitle={favorites.length === 0 ? "No saved stations" : `${favorites.length} saved station${favorites.length !== 1 ? "s" : ""}`}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 20px" }}>
        {favorites.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 24px", textAlign: "center" }}>
            <div style={{ marginBottom: 20, display: "flex", height: 64, width: 64, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-xl)", background: "var(--glass)", border: "1px solid var(--border)", color: "var(--fg-3)" }}>
              <Icon name="heart" size={32} style={{ stroke: "currentColor", fill: "none", strokeWidth: 2 }} />
            </div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#fff" }}>No favorites yet</p>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--fg-3)" }}>Tap the heart while listening to save a station here.</p>
          </div>
        ) : (
          <div style={{ padding: "8px 0" }}>
            {favorites.map((fav) => {
              const active = currentUuid === fav.station.stationuuid;
              return (
                <div key={fav.station.stationuuid} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  borderRadius: "var(--radius-lg)",
                  background: active ? "var(--fav-soft)" : "transparent",
                  boxShadow: active ? "inset 0 0 0 1px var(--fav-border)" : "none",
                }}>
                  <button type="button" onClick={() => onPick(fav)} style={{ display: "flex", flex: 1, minWidth: 0, alignItems: "center", gap: 12, textAlign: "left", border: "none", background: "transparent", cursor: "pointer" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <StationArtwork src={fav.station.favicon} alt={fav.station.name} size="sm" />
                      <span style={{ position: "absolute", bottom: -2, right: -2, display: "flex", height: 16, width: 16, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", background: "rgba(10,10,20,0.9)", border: "1px solid var(--border)", overflow: "hidden" }}>
                        <Flag code={fav.country.iso_3166_1} width={14} radius={0} style={{ height: 10 }} />
                      </span>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: active ? "#fff" : "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{fav.station.name}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--fg-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {fav.country.name}{fav.station.bitrate ? ` · ${fav.station.bitrate} kbps` : ""}
                      </p>
                    </div>
                  </button>
                  <button type="button" onClick={() => onRemove(fav.station.stationuuid)} aria-label="Remove" style={{ display: "flex", height: 28, width: 28, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", border: "none", background: "transparent", color: "var(--fg-4)", cursor: "pointer" }}>
                    <Icon name="x" size={14} strokeWidth={2.5} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </window.Sheet>
  );
}
window.FavoritesSheet = FavoritesSheet;
