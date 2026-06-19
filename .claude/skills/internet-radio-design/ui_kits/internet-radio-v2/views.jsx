// V2 Search + Browse + Library views.
const { Icon, Flag } = window.InternetRadioDesignSystem_7e870d;

function GenreTile({ genre, onClick }) {
  const g = window.IR2.gradientFor(genre.name + genre.key);
  return (
    <button type="button" onClick={onClick} style={{
      position: "relative", height: 104, borderRadius: "var(--v-r-md)", overflow: "hidden", border: "none", cursor: "pointer",
      background: g.css, textAlign: "left", padding: 16, color: "#fff",
    }}>
      <span style={{ position: "relative", fontSize: 17, fontWeight: 780, letterSpacing: "-0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>{genre.name}</span>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 40%, rgba(0,0,0,0.25))" }} />
    </button>
  );
}

function SearchView({ current, playing, onPlay, onOpen }) {
  const G = window.IR2;
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState(null);
  const results = G.search(q);
  const countryMatches = q.trim()
    ? G.countries.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()))
    : [];

  // Drill-in: a country's stations.
  if (country) {
    const list = G.byCountry(country.iso);
    return (
      <div style={{ animation: "v-fade .3s ease" }}>
        <window.TopBar title={country.name} onBack={() => setCountry(null)} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 4px 18px", color: "var(--v-fg-3)", fontSize: 14 }}>
          <Flag code={country.iso} width={22} radius={3} /> {country.count.toLocaleString()} stations · showing top {list.length}
        </div>
        {list.map((s, i) => <window.ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing} active={current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </div>
    );
  }

  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <window.TopBar title="Search" />
      <div style={{ position: "relative", marginBottom: 24, maxWidth: 560 }}>
        <Icon name="search" size={20} strokeWidth={2} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--v-fg-3)" }} />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Stations, genres, countries…" style={{
          width: "100%", padding: "14px 16px 14px 46px", fontSize: 16, fontFamily: "var(--v-font)", fontWeight: 500,
          color: "var(--v-fg)", background: "var(--v-elev-2)", border: "1px solid var(--v-hairline)", borderRadius: "var(--v-r-md)", outline: "none",
        }} />
      </div>

      {q ? (
        (results.length || countryMatches.length) ? (
          <div>
            {countryMatches.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>Countries</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                  {countryMatches.slice(0, 6).map((c) => <CountryCard key={c.iso} c={c} onClick={() => setCountry(c)} />)}
                </div>
              </div>
            )}
            {results.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>{results.length} station{results.length !== 1 ? "s" : ""}</div>
                {results.map((s, i) => <window.ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing} active={current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--v-fg-3)" }}>
            <div style={{ fontSize: 16, fontWeight: 650, color: "var(--v-fg-2)" }}>No matches for “{q}”</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Try a genre like “jazz” or a country like “Japan”.</div>
          </div>
        )
      ) : (
        <div>
          <SectionHead>Browse by country</SectionHead>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 30 }}>
            {G.countries.map((c) => <CountryCard key={c.iso} c={c} onClick={() => setCountry(c)} />)}
          </div>
          <SectionHead>Browse all genres</SectionHead>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {G.genres.map((genre) => <GenreTile key={genre.key} genre={genre} onClick={() => setQ(genre.name.split(" ")[0])} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHead({ children }) {
  return <h2 style={{ margin: "0 4px 14px", fontSize: 21, fontWeight: 750, letterSpacing: "-0.02em", color: "var(--v-fg)" }}>{children}</h2>;
}

function CountryCard({ c, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: "var(--v-r-md)", border: "1px solid var(--v-hairline)",
      background: hover ? "var(--v-elev-2)" : "var(--v-elev)", cursor: "pointer", textAlign: "left", transition: "background .15s, transform .15s",
      transform: hover ? "translateY(-2px)" : "none",
    }}>
      <span style={{ width: 48, height: 36, borderRadius: 8, overflow: "hidden", flexShrink: 0, boxShadow: "var(--v-shadow-card)" }}>
        <Flag code={c.iso} width={48} radius={0} style={{ height: 36 }} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--v-fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
        <div style={{ fontSize: 12.5, color: "var(--v-fg-3)", marginTop: 2 }}>{c.count.toLocaleString()} stations</div>
      </div>
      <Icon name="chevronRight" size={18} strokeWidth={2.4} style={{ color: "var(--v-fg-4)" }} />
    </button>
  );
}

function BrowseView({ current, playing, onPlay, onOpen }) {
  const G = window.IR2;
  const [country, setCountry] = React.useState(null);
  if (country) {
    const list = G.byCountry(country.iso);
    return (
      <div style={{ animation: "v-fade .3s ease" }}>
        <window.TopBar title={country.name} onBack={() => setCountry(null)} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 4px 18px", color: "var(--v-fg-3)", fontSize: 14 }}>
          <Flag code={country.iso} width={22} radius={3} /> {country.count.toLocaleString()} stations · showing top {list.length}
        </div>
        {list.map((s, i) => <window.ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing} active={current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen} />)}
      </div>
    );
  }
  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <window.TopBar title="Browse" />
      <p style={{ margin: "0 4px 18px", color: "var(--v-fg-3)", fontSize: 14.5 }}>Tune in to live radio from around the world.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {G.countries.map((c) => <CountryCard key={c.iso} c={c} onClick={() => setCountry(c)} />)}
      </div>
    </div>
  );
}

function LibraryView({ favorites, current, playing, onPlay, onOpen, onRemove }) {
  return (
    <div style={{ animation: "v-fade .35s ease" }}>
      <window.TopBar title="Your Library" />
      {favorites.length === 0 ? (
        <div style={{ padding: "70px 0", textAlign: "center" }}>
          <div style={{ width: 88, height: 88, margin: "0 auto 18px", borderRadius: "var(--v-r-lg)", display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--v-elev-2)", color: "var(--v-fg-3)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4v17M10 4v17"/><rect x="14" y="4" width="6" height="17" rx="1.5"/></svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 750, color: "var(--v-fg)" }}>Build your collection</div>
          <div style={{ fontSize: 14.5, color: "var(--v-fg-3)", marginTop: 8 }}>Tap the heart on any station to save it here.</div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--v-fg-3)", margin: "0 4px 8px" }}>{favorites.length} saved station{favorites.length !== 1 ? "s" : ""}</div>
          {favorites.map((s, i) => (
            <window.ListRow key={s.stationuuid} station={s} index={i + 1} playing={playing} active={current?.stationuuid === s.stationuuid} onPlay={onPlay} onOpen={onOpen}
              trailing={<button type="button" onClick={(e) => { e.stopPropagation(); onRemove(s); }} aria-label="Remove" style={{ border: "none", background: "transparent", color: "var(--v-accent)", cursor: "pointer", display: "inline-flex" }}><Icon name="heart" size={18} style={{ fill: "currentColor", stroke: "none" }} /></button>} />
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { SearchView, BrowseView, LibraryView });
