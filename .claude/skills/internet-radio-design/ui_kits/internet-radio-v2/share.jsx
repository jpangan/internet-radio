// V2 Share sheet — an original, on-brand take: ambient gradient header (echoing
// the Now Playing screen), generative cover, glass chips, QR card, and a readable
// link field. Same elements as V1, redesigned in the V2 language.
const { Icon } = window.InternetRadioDesignSystem_7e870d;

function ShareSheet({ open, station, onClose }) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => { if (!open) setCopied(false); }, [open, station]);
  if (!open || !station) return null;

  const g = window.IR2.gradientFor(station.name);
  const tags = (station.genres || (station.tags || "").split(",")).map((t) => (t || "").trim()).filter(Boolean).slice(0, 3);
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  const url = `https://free-internet-radio.vercel.app/?country=${station.iso || ""}&station=${station.stationuuid}`;
  const prettyUrl = url.replace(/^https?:\/\//, "");
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&qzone=1&color=1a0f3c&bgcolor=ffffff&data=${encodeURIComponent(url)}`;

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: "absolute", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 18, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    }}>
      <div style={{
        width: "100%", maxWidth: 372, position: "relative", borderRadius: "var(--v-r-xl)", overflow: "hidden",
        maxHeight: "calc(100% - 24px)", overflowY: "auto",
        background: "var(--v-bg-2)", border: "1px solid var(--v-hairline-2)", boxShadow: "var(--v-shadow-pop)",
        animation: "v-rise .36s var(--v-ease)",
      }}>
        {/* Ambient gradient header — echoes Now Playing */}
        <div style={{ position: "relative", height: 132, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "-30%", background: g.css, filter: "blur(36px) saturate(150%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15), var(--v-bg-2))" }} />
          <button type="button" onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 99, border: "none", cursor: "pointer",
            background: "rgba(0,0,0,0.28)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <Icon name="x" size={15} strokeWidth={2.5} />
          </button>
          <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center", fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.78)" }}>Share station</div>
        </div>

        <div style={{ padding: "0 24px 24px", marginTop: -52, position: "relative" }}>
          {/* Cover + identity */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 96, height: 96, borderRadius: "var(--v-r-lg)", background: g.css, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), 0 16px 40px rgba(0,0,0,0.4)", border: "3px solid var(--v-bg-2)" }}>
              <span style={{ fontWeight: 800, fontSize: 34, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em" }}>{window.IR2.initials(station.name)}</span>
            </div>
            <div style={{ textAlign: "center", maxWidth: "100%" }}>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 780, letterSpacing: "-0.02em", color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</h2>
              {meta && <p style={{ margin: "5px 0 0", fontSize: 13, color: "var(--v-fg-3)" }}>{meta}</p>}
            </div>
            {(tags.length > 0 || station.codec) && (
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7 }}>
                {tags.map((t) => (
                  <span key={t} style={{ padding: "4px 12px", borderRadius: 99, fontSize: 11.5, fontWeight: 600, textTransform: "capitalize",
                    background: "var(--v-elev-2)", border: "1px solid var(--v-hairline)", color: "var(--v-fg-2)" }}>{t}</span>
                ))}
                {station.codec && <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                  background: "var(--v-accent-soft)", color: "var(--v-accent)" }}>{station.codec}{station.bitrate ? ` · ${station.bitrate}k` : ""}</span>}
              </div>
            )}
          </div>

          {/* QR card */}
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: "var(--v-r-lg)", padding: 16, background: "#fff", boxShadow: "0 0 0 1px var(--v-accent-soft), 0 16px 44px rgba(108,92,231,0.26)" }}>
              <img src={qr} alt="QR code" width={176} height={176} style={{ display: "block" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 4px #fff" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <Icon name="signal" size={19} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v-fg-4)" }}>Scan to tune in</div>
          </div>

          {/* Readable link field */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px 10px 14px", borderRadius: "var(--v-r-md)", background: "var(--v-elev-2)", border: "1px solid var(--v-hairline)" }}>
            <Icon name="globe" size={16} strokeWidth={2} style={{ color: "var(--v-fg-3)", flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: "var(--v-fg-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontVariantNumeric: "tabular-nums" }}>{prettyUrl}</span>
          </div>

          {/* Copy link */}
          <button type="button" onClick={() => { setCopied(true); }} style={{
            marginTop: 10, width: "100%", padding: "14px 0", borderRadius: "var(--v-r-md)", border: "none", cursor: "pointer", fontSize: 14.5, fontWeight: 700,
            background: copied ? "rgba(52,199,89,0.16)" : "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))",
            color: copied ? "#34c759" : "#fff", boxShadow: copied ? "none" : "0 8px 24px rgba(108,92,231,0.4)",
            transition: "background .2s, color .2s" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name={copied ? "check" : "copy"} size={16} strokeWidth={2.4} />
              {copied ? "Link copied to clipboard" : "Copy Link"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
window.ShareSheet = ShareSheet;
