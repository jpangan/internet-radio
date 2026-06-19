// App — orchestrates the Internet Radio surfaces over a fake catalog.
function App() {
  const D = window.IR_DATA;
  const [country, setCountry] = React.useState(null);
  const [station, setStation] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  // sheets
  const [browseOpen, setBrowseOpen] = React.useState(false);
  const [browseCountry, setBrowseCountry] = React.useState(null); // null = country list
  const [favOpen, setFavOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);

  const list = country ? (D.stations[country.iso_3166_1] || []) : [];
  const idx = station ? list.findIndex((s) => s.stationuuid === station.stationuuid) : -1;
  const canTune = list.length > 1 && idx >= 0;
  const isFav = !!station && favorites.some((f) => f.station.stationuuid === station.stationuuid);

  const openBrowse = () => { setBrowseCountry(country || null); setBrowseOpen(true); };

  const pickStation = (s, c) => {
    setStation(s); setCountry(c); setIsPlaying(true); setBrowseOpen(false);
  };
  const tune = (dir) => {
    if (!canTune) return;
    const next = list[(idx + dir + list.length) % list.length];
    setStation(next); setIsPlaying(true);
  };
  const toggleFav = () => {
    if (!station || !country) return;
    setFavorites((prev) => prev.some((f) => f.station.stationuuid === station.stationuuid)
      ? prev.filter((f) => f.station.stationuuid !== station.stationuuid)
      : [...prev, { station, country }]);
  };
  const pickFav = (fav) => { setCountry(fav.country); setStation(fav.station); setIsPlaying(true); setFavOpen(false); };

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "var(--gradient-bg-glow)" }} />
      <window.Header country={country} favCount={favorites.length} onOpenBrowse={openBrowse} onOpenFavorites={() => setFavOpen(true)} />

      {station ? (
        <window.PlayerView
          station={station} isPlaying={isPlaying} isFav={isFav} volume={volume} muted={muted} canTune={canTune}
          onToggle={() => setIsPlaying((p) => !p)} onPrev={() => tune(-1)} onNext={() => tune(1)}
          onToggleFav={toggleFav} onShare={() => setShareOpen(true)} onBrowse={openBrowse}
          onToggleMute={() => setMuted((m) => !m)} onVolume={(v) => { setVolume(v); if (v > 0) setMuted(false); }}
        />
      ) : (
        <window.EmptyState onBrowse={openBrowse} />
      )}

      <window.BrowseSheet
        open={browseOpen} onClose={() => setBrowseOpen(false)}
        country={browseCountry} onPickCountry={(c) => setBrowseCountry(c)} onBack={() => setBrowseCountry(null)}
        onPickStation={pickStation} currentUuid={station?.stationuuid}
      />
      <window.FavoritesSheet
        open={favOpen} onClose={() => setFavOpen(false)} favorites={favorites}
        onPick={pickFav} onRemove={(uuid) => setFavorites((p) => p.filter((f) => f.station.stationuuid !== uuid))}
        currentUuid={station?.stationuuid}
      />
      <window.ShareSheet open={shareOpen} onClose={() => setShareOpen(false)} station={station} country={country} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<App />);
