// V2 app — responsive orchestrator (sidebar desktop / tabs mobile), theme + device toggles.
const { Icon } = window.InternetRadioDesignSystem_7e870d;

function ShareToast({ show }) {
  return (
    <div style={{ position: "absolute", left: "50%", bottom: 110, transform: `translateX(-50%) translateY(${show ? 0 : 12}px)`,
      zIndex: 90, opacity: show ? 1 : 0, pointerEvents: "none", transition: "opacity .25s, transform .25s",
      padding: "11px 18px", borderRadius: 99, background: "var(--v-mat-chrome)", backdropFilter: "var(--v-mat-blur)",
      border: "1px solid var(--v-hairline-2)", color: "var(--v-fg)", fontSize: 13.5, fontWeight: 650, boxShadow: "var(--v-shadow-pop)",
      display: "flex", alignItems: "center", gap: 8 }}>
      <Icon name="check" size={15} strokeWidth={2.6} style={{ color: "var(--v-accent)" }} /> Link copied to clipboard
    </div>
  );
}

function FloatingControls({ theme, onToggleTheme, device, onToggleDevice }) {
  return (
    <div style={{ position: "absolute", top: 14, right: 16, zIndex: 95, display: "flex", gap: 8 }}>
      <button type="button" onClick={onToggleDevice} title="Toggle device" style={fcBtn}>
        <Icon name={device === "mobile" ? "globe" : "list"} size={16} strokeWidth={2} />
        <span style={{ fontSize: 12, fontWeight: 650 }}>{device === "mobile" ? "Desktop" : "Mobile"}</span>
      </button>
    </div>
  );
}
const fcBtn = { display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", borderRadius: 99, cursor: "pointer",
  border: "1px solid var(--v-hairline-2)", background: "var(--v-mat-chrome)", backdropFilter: "var(--v-mat-blur)", color: "var(--v-fg-2)" };

function App() {
  const G = window.IR2;
  const [theme, setTheme] = React.useState("dark");
  const [device, setDevice] = React.useState("desktop"); // desktop | mobile
  const [view, setView] = React.useState("home");
  const [current, setCurrent] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  const [npOpen, setNpOpen] = React.useState(false);
  const [favs, setFavs] = React.useState(() => [G.stations[4], G.stations[2]]);
  const [volume, setVolume] = React.useState(0.8);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1100);
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    if (!hostRef.current || !window.ResizeObserver) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);

  const compact = device === "mobile" || width < 760;

  const play = (s) => { setCurrent(s); setPlaying(true); };
  const toggle = () => { if (current) setPlaying((p) => !p); };
  const open = (s) => { setCurrent(s); setPlaying(true); setNpOpen(true); };
  const idx = current ? G.stations.findIndex((s) => s.stationuuid === current.stationuuid) : -1;
  const tune = (d) => { if (idx < 0) return; const n = G.stations[(idx + d + G.stations.length) % G.stations.length]; setCurrent(n); setPlaying(true); };
  const isFav = (s) => favs.some((f) => f.stationuuid === s?.stationuuid);
  const toggleFav = (s) => { const t = s || current; if (!t) return; setFavs((p) => p.some((f) => f.stationuuid === t.stationuuid) ? p.filter((f) => f.stationuuid !== t.stationuuid) : [t, ...p]); };
  const share = () => setShareOpen(true);

  const viewProps = { current, playing, onPlay: play, onOpen: open };
  let content;
  if (view === "home") content = <window.HomeView {...viewProps} />;
  else if (view === "search") content = <window.SearchView {...viewProps} />;
  else if (view === "browse") content = <window.BrowseView {...viewProps} />;
  else content = <window.LibraryView favorites={favs} {...viewProps} onRemove={(s) => toggleFav(s)} />;

  // Frame: full-bleed desktop, or a centered phone for mobile preview.
  const frame = device === "mobile"
    ? { width: 402, height: "100%", maxHeight: 860, borderRadius: 30, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px var(--v-hairline)" }
    : { width: "100%", height: "100%" };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: device === "mobile" ? "var(--v-bg)" : "transparent" }}>
      <div ref={hostRef} style={{ position: "relative", display: "flex", background: "var(--v-bg)", color: "var(--v-fg)", fontFamily: "var(--v-font)", ...frame }}>
        <FloatingControls theme={theme} onToggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} device={device} onToggleDevice={() => setDevice((d) => d === "mobile" ? "desktop" : "mobile")} />

        {!compact && <window.Sidebar view={view} onNav={setView} theme={theme} onToggleTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} favCount={favs.length} />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
          {compact && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
              <window.Logo />
              <window.ThemeToggle theme={theme} onToggle={() => setTheme((t) => t === "dark" ? "light" : "dark")} />
            </div>
          )}
          <main style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: compact ? "8px 18px 20px" : "0 32px 28px",
            paddingBottom: current ? (compact ? 150 : 100) : (compact ? 80 : 28) }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>{content}</div>
          </main>

          {/* Docked player + mobile nav */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 45 }}>
            {current && <window.MiniPlayer station={current} playing={playing} onToggle={toggle} onNext={() => tune(1)} onExpand={() => setNpOpen(true)} isFav={isFav(current)} onFav={() => toggleFav()} />}
            {compact && <window.MobileNav view={view} onNav={setView} favCount={favs.length} />}
          </div>
        </div>

        <window.NowPlaying station={current} playing={playing} open={npOpen} onClose={() => setNpOpen(false)}
          onToggle={toggle} onNext={() => tune(1)} onPrev={() => tune(-1)} isFav={isFav(current)} onFav={() => toggleFav()}
          volume={volume} onVolume={setVolume} onShare={share} />

        <window.ShareSheet open={shareOpen} station={current} onClose={() => setShareOpen(false)} />
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
