// BrowseSheet — country list → station list, with search.
const { Icon, Flag, Button, SearchInput, StationRow, CountryRow } = window.InternetRadioDesignSystem_7e870d;

function BrowseSheet({ open, onClose, country, onPickCountry, onBack, onPickStation, currentUuid }) {
  const [q, setQ] = React.useState("");
  React.useEffect(() => { if (open) setQ(""); }, [open, country]);

  const D = window.IR_DATA;
  const inStations = !!country;
  const stations = inStations ? (D.stations[country.iso_3166_1] || []) : [];

  const countries = D.countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  const filtered = stations.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <window.Sheet open={open} onClose={onClose}>
      <window.SheetHeader
        onClose={onClose}
        onBack={inStations ? onBack : undefined}
        icon={<Icon name="globe" size={16} />}
        title={inStations ? <><Flag code={country.iso_3166_1} width={18} radius={2} />{country.name}</> : "Select Country"}
        subtitle={inStations ? `${stations.length} stations loaded` : `${D.countries.length} countries available`}
      />
      <div style={{ flexShrink: 0, padding: "12px 16px" }}>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder={inStations ? "Search stations…" : "Search countries…"} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 20px" }}>
        {inStations
          ? filtered.map((s) => (
              <StationRow key={s.stationuuid} name={s.name}
                tags={(s.tags || "").split(",").map((t) => t.trim()).filter(Boolean)}
                bitrate={s.bitrate} active={currentUuid === s.stationuuid}
                onClick={() => onPickStation(s, country)} />
            ))
          : countries.map((c) => (
              <CountryRow key={c.iso_3166_1} name={c.name} code={c.iso_3166_1} stationCount={c.stationcount}
                onClick={() => onPickCountry(c)} />
            ))}
      </div>
    </window.Sheet>
  );
}
window.BrowseSheet = BrowseSheet;
