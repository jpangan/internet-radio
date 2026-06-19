// ShareSheet — station hero + QR code + copy link.
const { Icon, Tag } = window.InternetRadioDesignSystem_7e870d;

function ShareSheet({ open, onClose, station, country }) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => { if (!open) setCopied(false); }, [open]);
  if (!station) return null;

  const tags = (station.tags || "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 3);
  const url = `https://free-internet-radio.vercel.app/?country=${country?.iso_3166_1 || ""}&station=${station.stationuuid}`;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&color=1a0f3c&data=${encodeURIComponent(url)}`;

  return (
    <window.Sheet open={open} onClose={onClose} maxWidth={320}>
      <button type="button" onClick={onClose} aria-label="Close" style={{
        position: "absolute", top: 16, right: 16, zIndex: 10, display: "flex", height: 28, width: 28,
        alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", border: "none",
        background: "var(--surface)", color: "var(--fg-2)", cursor: "pointer",
      }}><Icon name="x" size={14} strokeWidth={2.5} /></button>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 24px 20px", gap: 12 }}>
        <div style={{
          display: "flex", height: 64, width: 64, flexShrink: 0, alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--accent-soft)",
          border: "1.5px solid rgba(124,108,240,0.2)", boxShadow: "0 0 24px rgba(124,108,240,0.2)", color: "var(--accent-hover)",
        }}>
          <Icon name="radio" size={32} />
        </div>
        <div style={{ textAlign: "center", minWidth: 0, width: "100%" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--fg-3)" }}>{[country?.name, station.language].filter(Boolean).join(" · ")}</p>
        </div>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
            {tags.map((t) => <Tag key={t} accent>{t}</Tag>)}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 24px 20px" }}>
        <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500, color: "var(--fg-4)" }}>Scan to tune in</span>
        <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px 24px", gap: 16 }}>
        <div style={{ position: "relative", borderRadius: "var(--radius-2xl)", padding: 16, background: "#fff", boxShadow: "0 0 0 1px rgba(124,108,240,0.2), 0 8px 40px rgba(124,108,240,0.25)" }}>
          <img src={qr} alt="QR code" width={188} height={188} style={{ display: "block" }} />
        </div>
        <button type="button" onClick={() => { setCopied(true); }} style={{
          width: "100%", borderRadius: "var(--radius-lg)", padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
          background: copied ? "rgba(52,199,89,0.15)" : "var(--accent-soft)",
          border: copied ? "1px solid rgba(52,199,89,0.35)" : "1px solid var(--accent-ring)",
          color: copied ? "var(--success)" : "rgba(255,255,255,0.9)",
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon name={copied ? "check" : "copy"} size={14} strokeWidth={2.5} />
            {copied ? "Link copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </window.Sheet>
  );
}
window.ShareSheet = ShareSheet;
