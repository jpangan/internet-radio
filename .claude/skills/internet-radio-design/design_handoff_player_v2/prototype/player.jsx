// V2 player — docked mini bar + full-screen Now Playing (parallax, ambient).
const { Icon, Flag } = window.InternetRadioDesignSystem_7e870d;

function MiniPlayer({ station, playing, onToggle, onNext, onExpand, isFav, onFav }) {
  if (!station) return null;
  return (
    <div onClick={onExpand} style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", cursor: "pointer",
      borderTop: "1px solid var(--v-hairline)", background: "var(--v-mat-chrome)",
      backdropFilter: "var(--v-mat-blur)", WebkitBackdropFilter: "var(--v-mat-blur)",
    }}>
      <window.Cover station={station} size={48} radius="10px" playing={playing} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</div>
        <div style={{ fontSize: 12, color: "var(--v-fg-3)", marginTop: 1, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", overflow: "hidden" }}>
          {playing ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--v-accent)", fontWeight: 700 }}><span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--v-accent)" }} />LIVE</span> : "Paused"} · {station.country}
        </div>
      </div>
      <button type="button" onClick={(e) => { e.stopPropagation(); onFav(); }} aria-label="Favorite" style={{ border: "none", background: "transparent", cursor: "pointer", color: isFav ? "var(--v-accent)" : "var(--v-fg-3)", display: "inline-flex", padding: 6 }}>
        <Icon name="heart" size={20} style={{ fill: isFav ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 2 }} />
      </button>
      <window.PlayFab playing={playing} size={42} onClick={(e) => { e.stopPropagation(); onToggle(); }} />
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next" className="v-only-wide" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--v-fg-2)", display: "inline-flex", padding: 6 }}>
        <Icon name="next" size={22} />
      </button>
    </div>
  );
}

function NowPlaying({ station, playing, open, onClose, onToggle, onNext, onPrev, isFav, onFav, volume, onVolume, onShare }) {
  const ref = React.useRef(null);
  const [px, setPx] = React.useState({ x: 0, y: 0 });
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!open || !playing) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [open, playing]);
  React.useEffect(() => { setElapsed(0); }, [station]);

  if (!station) return null;
  const g = window.IR2.gradientFor(station.name);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setPx({ x, y });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPx({ x: 0, y: 0 })} aria-hidden={!open} style={{
      position: "absolute", inset: 0, zIndex: 60, overflow: "hidden",
      transform: open ? "translateY(0)" : "translateY(100%)",
      transition: "transform .5s var(--v-ease)", pointerEvents: open ? "auto" : "none",
    }}>
      {/* Ambient background */}
      <div style={{ position: "absolute", inset: "-20%", background: g.css, filter: "blur(80px) saturate(150%)",
        transform: `scale(1.2) translate(${px.x * -24}px, ${px.y * -24}px)`, transition: "transform .3s var(--v-ease-soft)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.62))" }} />

      {/* Content */}
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center",
        padding: "clamp(18px, 3vw, 34px)", overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{ width: "100%", maxWidth: 520, display: "flex", alignItems: "center", justifyContent: "space-between", color: "#fff" }}>
          <button type="button" onClick={onClose} aria-label="Collapse" style={{ width: 40, height: 40, borderRadius: 99, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.16)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.8 }}>Now Playing</div>
          <button type="button" onClick={onShare} aria-label="Share" style={{ width: 40, height: 40, borderRadius: 99, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.16)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <Icon name="share" size={18} />
          </button>
        </div>

        {/* Cover with parallax */}
        <div style={{ flex: "0 0 auto", margin: "auto 0", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}>
          <div style={{ transform: `translate(${px.x * 16}px, ${px.y * 16}px) rotateX(${px.y * -5}deg) rotateY(${px.x * 5}deg)`, transition: "transform .25s var(--v-ease-soft)", transformStyle: "preserve-3d", perspective: 800 }}>
            <window.Cover station={station} size="min(64vw, 340px)" radius="var(--v-r-xl)" initials playing={playing} style={{ boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }} />
          </div>

          {/* Meta */}
          <div style={{ width: "100%", marginTop: 30, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 820, letterSpacing: "-0.03em", lineHeight: 1.08 }}>{station.name}</h1>
                <p style={{ margin: "8px 0 0", fontSize: 15, opacity: 0.82, display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
                  <Flag code={station.iso} width={18} radius={3} /> {station.country} · {station.genres.join(" · ")}
                </p>
              </div>
              <button type="button" onClick={onFav} aria-label="Favorite" style={{ border: "none", background: "transparent", cursor: "pointer", color: "#fff", display: "inline-flex", padding: 4 }}>
                <Icon name="heart" size={28} style={{ fill: isFav ? "#fff" : "none", stroke: "#fff", strokeWidth: 2 }} />
              </button>
            </div>

            {/* Live waveform bar */}
            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, fontVariantNumeric: "tabular-nums", opacity: 0.75 }}>{mm}:{ss}</span>
              <div style={{ flex: 1, height: 26, display: "flex", alignItems: "center", gap: 2, overflow: "hidden" }}>
                {Array.from({ length: 64 }).map((_, i) => {
                  const h = 6 + ((window.IR2.hash(station.name + i) % 20));
                  return <span key={i} style={{ flex: 1, height: playing ? h + "px" : "4px", minWidth: 2, borderRadius: 2, background: "rgba(255,255,255,0.55)",
                    transformOrigin: "center", animation: playing ? `v-eq ${0.6 + (i % 5) * 0.12}s ease-in-out infinite` : "none", animationDelay: `${(i % 7) * 0.07}s` }} />;
                })}
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, letterSpacing: "0.08em", color: "#fff" }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", boxShadow: "0 0 8px #fff" }} /> LIVE
              </span>
            </div>

            {/* Transport */}
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
              <button type="button" onClick={onPrev} aria-label="Previous" style={transBtn}><Icon name="prev" size={30} /></button>
              <window.PlayFab playing={playing} size={76} onClick={onToggle} style={{ background: "#fff", color: "#111", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }} />
              <button type="button" onClick={onNext} aria-label="Next" style={transBtn}><Icon name="next" size={30} /></button>
            </div>

            {/* Volume */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, maxWidth: 360, margin: "24px auto 8px", color: "#fff" }}>
              <Icon name="volume" size={18} style={{ opacity: 0.8 }} />
              <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => onVolume(parseFloat(e.target.value))} aria-label="Volume"
                className="v-range-light" style={{ flex: 1, height: 4 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const transBtn = { border: "none", background: "transparent", cursor: "pointer", color: "#fff", display: "inline-flex", padding: 4 };

Object.assign(window, { MiniPlayer, NowPlaying });
