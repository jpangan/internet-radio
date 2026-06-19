// V2 shared primitives — generative cover, equalizer, cards, play button.
const { Icon, Flag } = window.InternetRadioDesignSystem_7e870d;
const G = window.IR2;

// Generative gradient cover. `playing` overlays an equalizer.
function Cover({ station, size = 160, radius = "var(--v-r-md)", initials = true, playing = false, style = {} }) {
  const g = G.gradientFor(station.name);
  return (
    <div style={{
      position: "relative", width: size, height: size, flexShrink: 0,
      borderRadius: radius, overflow: "hidden", background: g.css,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), var(--v-shadow-card)",
      display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      {initials && size >= 96 && (
        <span style={{
          fontWeight: 800, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.03em",
          fontSize: size * 0.34, textShadow: "0 2px 14px rgba(0,0,0,0.3)", userSelect: "none",
        }}>{G.initials(station.name)}</span>
      )}
      {initials && size < 96 && size >= 40 && (
        <span style={{ fontWeight: 800, color: "rgba(255,255,255,0.92)", fontSize: size * 0.4 }}>
          {G.initials(station.name)[0]}
        </span>
      )}
      {playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.28)", backdropFilter: "blur(1px)" }}>
          <Equalizer size={size > 120 ? 22 : 14} />
        </div>
      )}
    </div>
  );
}

function Equalizer({ size = 18, color = "#fff" }) {
  const bars = [0, 1, 2, 3];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.16, height: size }} aria-hidden>
      {bars.map((i) => (
        <span key={i} style={{
          width: size * 0.16, height: size, borderRadius: 99, background: color,
          transformOrigin: "bottom", animation: `v-eq ${0.7 + i * 0.18}s ease-in-out infinite`,
          animationDelay: `${i * 0.12}s`,
        }} />
      ))}
    </div>
  );
}

// Circular gradient play/pause button (the brand control).
function PlayFab({ playing, onClick, size = 56, style = {} }) {
  return (
    <button type="button" onClick={onClick} aria-label={playing ? "Pause" : "Play"} className="v-fab" style={{
      width: size, height: size, flexShrink: 0, borderRadius: "var(--v-r-pill)", border: "none", cursor: "pointer",
      background: "linear-gradient(135deg, var(--v-accent), var(--v-accent-2))", color: "var(--v-on-accent)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 28px rgba(108,92,231,0.45)", transition: "transform .12s var(--v-ease-soft)", ...style,
    }}>
      <Icon name={playing ? "pause" : "play"} size={size * 0.42} style={{ marginLeft: playing ? 0 : size * 0.03 }} />
    </button>
  );
}

// Discover card (square cover + title + subtitle), used in shelves.
function StationCard({ station, playing, onPlay, onOpen, width = 168 }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(station)} style={{
        width, flexShrink: 0, padding: 10, borderRadius: "var(--v-r-lg)", cursor: "pointer",
        background: hover ? "var(--v-elev-2)" : "transparent", transition: "background .2s var(--v-ease-soft)",
      }}>
      <div style={{ position: "relative" }}>
        <Cover station={station} size={width - 20} radius="var(--v-r-md)" playing={playing} />
        <div style={{
          position: "absolute", right: 8, bottom: 8,
          opacity: hover || playing ? 1 : 0, transform: hover || playing ? "translateY(0)" : "translateY(8px)",
          transition: "opacity .22s var(--v-ease-soft), transform .22s var(--v-ease-soft)",
        }}>
          <PlayFab playing={playing} size={44} onClick={(e) => { e.stopPropagation(); onPlay(station); }} />
        </div>
      </div>
      <div style={{ marginTop: 10, padding: "0 2px" }}>
        <div style={{ fontSize: 14, fontWeight: 650, color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</div>
        <div style={{ marginTop: 3, fontSize: 12.5, color: "var(--v-fg-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {station.genres.slice(0, 2).join(" · ")}
        </div>
      </div>
    </div>
  );
}

// Horizontal scrolling shelf with a title.
function Shelf({ title, action, children }) {
  return (
    <section style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "0 4px 10px" }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>{title}</h2>
        {action && <button type="button" onClick={action.onClick} className="v-link" style={{
          border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)",
        }}>{action.label}</button>}
      </div>
      <div className="v-shelf" style={{ display: "flex", gap: 6, overflowX: "auto", overflowY: "hidden", padding: "2px 0 6px", scrollSnapType: "x proximity" }}>
        {children}
      </div>
    </section>
  );
}

// Compact list row (Library / search results / now-playing queue).
function ListRow({ station, index, playing, active, onPlay, onOpen, trailing }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(station)} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "8px 12px", borderRadius: "var(--v-r-md)", cursor: "pointer",
        background: active ? "var(--v-accent-soft)" : hover ? "var(--v-elev-2)" : "transparent",
        transition: "background .15s var(--v-ease-soft)",
      }}>
      {index != null && (
        <div style={{ width: 22, textAlign: "center", flexShrink: 0, color: active ? "var(--v-accent)" : "var(--v-fg-3)", fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
          {hover ? <PlayMini onClick={(e) => { e.stopPropagation(); onPlay(station); }} active={active} /> : (active && playing ? <Equalizer size={13} color="var(--v-accent)" /> : index)}
        </div>
      )}
      <Cover station={station} size={44} radius="10px" initials playing={false} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: active ? "var(--v-accent)" : "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</div>
        <div style={{ marginTop: 2, fontSize: 12.5, color: "var(--v-fg-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 6 }}>
          <Flag code={station.iso} width={15} radius={2} /> {station.country} · {station.genres[0]}
        </div>
      </div>
      {trailing}
      <div style={{ flexShrink: 0, fontSize: 12.5, color: "var(--v-fg-4)", fontVariantNumeric: "tabular-nums" }}>{station.bitrate}k</div>
    </div>
  );
}

function PlayMini({ onClick }) {
  return <button type="button" onClick={onClick} aria-label="Play" style={{ border: "none", background: "transparent", color: "var(--v-fg)", cursor: "pointer", padding: 0, display: "inline-flex" }}><Icon name="play" size={16} /></button>;
}

Object.assign(window, { Cover, Equalizer, PlayFab, StationCard, Shelf, ListRow });
