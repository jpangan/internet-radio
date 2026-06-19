// PlayerView — empty state + active now-playing screen with transport controls.
const { Icon, Badge, Tag, Button, IconButton, StationArtwork } = window.InternetRadioDesignSystem_7e870d;

function EmptyState({ onBrowse }) {
  return (
    <main style={{
      position: "relative", flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "0 24px",
    }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 300 }}>
        <div style={{
          marginBottom: 28, display: "flex", height: 96, width: 96, alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-4xl)", background: "var(--accent-soft)",
          border: "1px solid rgba(124,108,240,0.2)", boxShadow: "0 8px 40px rgba(124,108,240,0.15)", color: "var(--accent-hover)",
        }}>
          <Icon name="globe" size={48} strokeWidth={1.5} />
        </div>
        <h2 style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>Nothing playing</h2>
        <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" }}>
          Choose a country and station to start streaming radio from around the world.
        </p>
        <Button variant="primary" size="lg" style={{ marginTop: 32 }} iconLeft={<Icon name="globe" size={16} strokeWidth={2} />} onClick={onBrowse}>
          Select Country
        </Button>
      </div>
    </main>
  );
}

function PlayerView({ station, isPlaying, isFav, volume, muted, onToggle, onPrev, onNext, onToggleFav, onShare, onBrowse, onToggleMute, onVolume, canTune }) {
  const tags = (station.tags || "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 6);
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  const techMeta = [station.codec, station.bitrate ? station.bitrate + " kbps" : ""].filter(Boolean).join(" · ");
  const volPct = Math.round((muted ? 0 : volume) * 100);

  return (
    <main style={{ position: "relative", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Now playing */}
      <div style={{ position: "relative", display: "flex", flex: 1, minHeight: 0, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <StationArtwork src={station.favicon} alt={station.name} size="lg" playing={isPlaying} />
        </div>
        <div style={{ marginBottom: 12, height: 24, display: "flex", alignItems: "center" }}>
          {isPlaying ? <Badge tone="live">Live</Badge> : <Badge tone="accent" showDot={false}>Paused</Badge>}
        </div>
        <h1 style={{ margin: 0, maxWidth: 460, textAlign: "center", fontSize: "var(--text-2xl)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#fff" }}>{station.name}</h1>
        <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 14, color: "var(--fg-2)" }}>{meta}{techMeta && " · " + techMeta}</p>
        {tags.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", maxWidth: 360, flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="glass-panel" style={{ position: "relative", flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.07)", paddingBottom: "max(16px, var(--safe-bottom))" }}>
        <div style={{ padding: "20px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", maxWidth: 420, margin: "0 auto" }}>
            <div style={{ width: 44, display: "flex" }}>
              <IconButton label="Share" onClick={onShare}><Icon name="share" size={20} /></IconButton>
            </div>
            <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", gap: 8 }}>
              <IconButton label="Previous" size="lg" disabled={!canTune} onClick={onPrev}><Icon name="prev" size={20} /></IconButton>
              <button type="button" onClick={onToggle} aria-label={isPlaying ? "Pause" : "Play"} style={{
                margin: "0 8px", display: "flex", height: 64, width: 64, flexShrink: 0, alignItems: "center", justifyContent: "center",
                borderRadius: "var(--radius-full)", border: "none", cursor: "pointer", color: "#fff",
                background: "var(--gradient-accent)", boxShadow: "var(--glow-accent-md)",
              }}>
                {isPlaying ? <Icon name="pause" size={28} /> : <Icon name="play" size={28} style={{ marginLeft: 2 }} />}
              </button>
              <IconButton label="Next" size="lg" disabled={!canTune} onClick={onNext}><Icon name="next" size={20} /></IconButton>
            </div>
            <div style={{ width: 44, display: "flex", justifyContent: "flex-end" }}>
              <IconButton label="Favorite" tone="fav" active={isFav} onClick={onToggleFav}>
                <Icon name="heart" size={20} style={{ fill: isFav ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 2 }} />
              </IconButton>
            </div>
          </div>

          {/* Volume */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 320, margin: "16px auto 0" }}>
            <IconButton label="Browse" size="sm" onClick={onBrowse}><Icon name="list" size={16} strokeWidth={2} /></IconButton>
            <IconButton label={muted ? "Unmute" : "Mute"} size="sm" onClick={onToggleMute}>
              <Icon name={muted || volume === 0 ? "volumeMute" : "volume"} size={16} />
            </IconButton>
            <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={(e) => onVolume(parseFloat(e.target.value))}
              aria-label="Volume" style={{ flex: 1, height: 4, cursor: "pointer", accentColor: "var(--accent)" }} />
            <span style={{ width: 28, textAlign: "right", fontSize: 11, fontVariantNumeric: "tabular-nums", color: "var(--fg-3)" }}>{volPct}</span>
          </div>

          <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 10, color: "var(--fg-4)" }}>
            Space · play/pause&nbsp;&nbsp;← → · skip&nbsp;&nbsp;M · mute
          </p>
        </div>
      </div>
    </main>
  );
}
window.EmptyState = EmptyState;
window.PlayerView = PlayerView;
