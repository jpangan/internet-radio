// Sheet — shared modal scaffold (scrim + rising glass sheet + header).
const { Icon } = window.InternetRadioDesignSystem_7e870d;

function Sheet({ open, onClose, children, maxWidth = 448 }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "absolute", inset: 0, zIndex: 50, display: "flex",
        alignItems: "flex-end", justifyContent: "center",
        background: "var(--scrim)", backdropFilter: "var(--blur-overlay)", WebkitBackdropFilter: "var(--blur-overlay)",
      }}>
      <div className="modal-sheet" style={{
        width: "100%", maxWidth, position: "relative", display: "flex", flexDirection: "column",
        overflow: "hidden", maxHeight: "92%",
        borderTopLeftRadius: "var(--radius-3xl)", borderTopRightRadius: "var(--radius-3xl)",
        background: "var(--bg-sheet)", backdropFilter: "var(--blur-sheet)", WebkitBackdropFilter: "var(--blur-sheet)",
        border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-sheet)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, flexShrink: 0 }}>
          <div style={{ height: 4, width: 36, borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.18)" }} />
        </div>
        {children}
      </div>
    </div>
  );
}

function SheetHeader({ icon, iconTone = "accent", title, subtitle, onBack, onClose }) {
  const toneBg = iconTone === "fav" ? "var(--fav-soft)" : "var(--accent-soft)";
  const toneColor = iconTone === "fav" ? "var(--fav)" : "var(--accent-hover)";
  return (
    <div style={{ display: "flex", flexShrink: 0, alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {onBack ? (
        <button type="button" onClick={onBack} style={iconBtn}><Icon name="arrowLeft" size={16} strokeWidth={2.5} /></button>
      ) : (
        <div style={{ display: "flex", height: 32, width: 32, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", background: toneBg, color: toneColor }}>
          {icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.2, display: "flex", alignItems: "center", gap: 6 }}>{title}</h2>
        {subtitle && <p style={{ margin: "1px 0 0", fontSize: 11, color: "var(--fg-3)" }}>{subtitle}</p>}
      </div>
      <button type="button" onClick={onClose} style={iconBtn}><Icon name="x" size={16} strokeWidth={2.5} /></button>
    </div>
  );
}
const iconBtn = {
  display: "flex", height: 32, width: 32, flexShrink: 0, alignItems: "center", justifyContent: "center",
  borderRadius: "var(--radius-full)", border: "none", background: "transparent", color: "var(--fg-2)", cursor: "pointer",
};
window.Sheet = Sheet;
window.SheetHeader = SheetHeader;
window.sheetIconBtn = iconBtn;
