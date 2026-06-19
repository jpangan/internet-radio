// V2 Home / Discover — editorial hero + scrolling shelves.
const { Icon, Flag } = window.InternetRadioDesignSystem_7e870d;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Hero({ station, playing, onPlay, onOpen }) {
  const g = window.IR2.gradientFor(station.name);
  return (
    <div onClick={() => onOpen(station)} style={{
      position: "relative", borderRadius: "var(--v-r-xl)", overflow: "hidden", cursor: "pointer",
      padding: "clamp(20px, 4vw, 36px)", marginBottom: 26, minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "flex-end",
      background: g.css, boxShadow: "var(--v-shadow-card)", animation: "v-pop-in .5s var(--v-ease)",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))" }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 99,
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 11.5, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#fff", boxShadow: "0 0 8px #fff" }} /> Top Station Today
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 820, letterSpacing: "-0.035em", color: "#fff", lineHeight: 1.02, textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}>{station.name}</h2>
        <p style={{ margin: "10px 0 18px", color: "rgba(255,255,255,0.82)", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
          <Flag code={station.iso} width={18} radius={3} /> {station.country} · {station.genres.join(" · ")}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={(e) => { e.stopPropagation(); onPlay(station); }} style={{
            display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 24px", borderRadius: 99, border: "none", cursor: "pointer",
            background: "#fff", color: "#111", fontSize: 15, fontWeight: 750, boxShadow: "0 8px 28px rgba(0,0,0,0.25)" }}>
            <Icon name={playing ? "pause" : "play"} size={18} /> {playing ? "Pause" : "Listen Now"}
          </button>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600 }}>{station.votes.toLocaleString()} votes</div>
        </div>
      </div>
    </div>
  );
}

function QuickTile({ station, playing, onPlay, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onOpen(station)} style={{
      display: "flex", alignItems: "center", gap: 12, borderRadius: "var(--v-r-md)", overflow: "hidden", cursor: "pointer",
      background: hover ? "var(--v-elev-3)" : "var(--v-elev-2)", transition: "background .18s", height: 56,
    }}>
      <window.Cover station={station} size={56} radius="0" initials playing={playing} />
      <div style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 700, color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{station.name}</div>
      <div style={{ marginRight: 12, opacity: hover ? 1 : 0, transition: "opacity .15s" }}>
        <window.PlayFab playing={playing} size={36} onClick={(e) => { e.stopPropagation(); onPlay(station); }} />
      </div>
    </div>
  );
}

function HomeView({ current, playing, onPlay, onOpen, country }) {
  const G = window.IR2;
  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <window.TopBar title={greeting()} />
      <Hero station={G.topStation} playing={playing && current?.stationuuid === G.topStation.stationuuid} onPlay={onPlay} onOpen={onOpen} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10, marginBottom: 30 }}>
        {G.trending.slice(0, 6).map((s) => (
          <QuickTile key={s.stationuuid} station={s} playing={playing && current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />
        ))}
      </div>

      <window.Shelf title="Trending now">
        {G.trending.map((s) => <window.StationCard key={s.stationuuid} station={s} playing={playing && current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </window.Shelf>

      <window.Shelf title="Most popular">
        {G.popular.map((s) => <window.StationCard key={s.stationuuid} station={s} playing={playing && current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </window.Shelf>

      <window.Shelf title="Jazz & Soul">
        {G.byGenre("jazz").concat(G.byGenre("soul")).map((s, i) => <window.StationCard key={s.stationuuid + i} station={s} playing={playing && current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </window.Shelf>

      <window.Shelf title="Most voted">
        {G.mostVoted.map((s, i) => <window.StationCard key={s.stationuuid + i} station={s} playing={playing && current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </window.Shelf>
    </div>
  );
}

Object.assign(window, { HomeView });
