/* ───────────────────────────────────────────────────────────────
   Internet Radio V2 — generative artwork + catalog.
   Every station gets a deterministic, harmonious gradient "cover"
   derived from its name — so the UI is rich even though real radio
   stations only ship a tiny favicon.
   ─────────────────────────────────────────────────────────────── */
(function () {
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // → { from, to, h1, h2, css, cssSoft } — a duotone gradient cover.
  function gradientFor(seed) {
    const h = hash(seed || "radio");
    const h1 = h % 360;
    const h2 = (h1 + 30 + (h % 50)) % 360;
    const s1 = 68 + (h % 18);
    const l1 = 56 + (h % 10);
    const s2 = 70 + ((h >> 3) % 16);
    const l2 = 34 + ((h >> 5) % 10);
    const from = `hsl(${h1} ${s1}% ${l1}%)`;
    const to = `hsl(${h2} ${s2}% ${l2}%)`;
    const ax = 18 + (h % 30);
    const ay = 12 + ((h >> 4) % 30);
    const css =
      `radial-gradient(120% 120% at ${ax}% ${ay}%, ${from} 0%, transparent 58%),` +
      `radial-gradient(130% 130% at ${100 - ax}% ${100 - ay}%, ${to} 0%, transparent 60%),` +
      `linear-gradient(135deg, hsl(${h1} ${s1}% ${l1 - 8}%), hsl(${h2} ${s2}% ${l2}%))`;
    return { from, to, h1, h2, css };
  }

  function initials(name) {
    const cleaned = (name || "").replace(/^(radio|the)\s+/i, "").trim();
    const parts = cleaned.split(/[\s.\-]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // ── Catalog ──────────────────────────────────────────────────
  // A broad country list (Radio Browser covers ~230 countries; this is a
  // representative slice). Sorted by station count, like the real /countries feed.
  const COUNTRIES = [
    { name: "United States", iso: "US", count: 5392 },
    { name: "Germany", iso: "DE", count: 3104 },
    { name: "United Kingdom", iso: "GB", count: 2841 },
    { name: "France", iso: "FR", count: 1876 },
    { name: "Brazil", iso: "BR", count: 1442 },
    { name: "India", iso: "IN", count: 1395 },
    { name: "Italy", iso: "IT", count: 1330 },
    { name: "Japan", iso: "JP", count: 1209 },
    { name: "Spain", iso: "ES", count: 1188 },
    { name: "Canada", iso: "CA", count: 1120 },
    { name: "Russia", iso: "RU", count: 1064 },
    { name: "Mexico", iso: "MX", count: 980 },
    { name: "Poland", iso: "PL", count: 942 },
    { name: "Netherlands", iso: "NL", count: 904 },
    { name: "Argentina", iso: "AR", count: 870 },
    { name: "Greece", iso: "GR", count: 812 },
    { name: "Turkey", iso: "TR", count: 786 },
    { name: "Australia", iso: "AU", count: 742 },
    { name: "Indonesia", iso: "ID", count: 708 },
    { name: "Ukraine", iso: "UA", count: 690 },
    { name: "Portugal", iso: "PT", count: 654 },
    { name: "Romania", iso: "RO", count: 632 },
    { name: "South Korea", iso: "KR", count: 612 },
    { name: "Austria", iso: "AT", count: 590 },
    { name: "Colombia", iso: "CO", count: 566 },
    { name: "Switzerland", iso: "CH", count: 552 },
    { name: "Sweden", iso: "SE", count: 528 },
    { name: "Belgium", iso: "BE", count: 514 },
    { name: "Chile", iso: "CL", count: 498 },
    { name: "Czechia", iso: "CZ", count: 472 },
    { name: "Hungary", iso: "HU", count: 448 },
    { name: "Denmark", iso: "DK", count: 430 },
    { name: "Finland", iso: "FI", count: 412 },
    { name: "Norway", iso: "NO", count: 398 },
    { name: "Ireland", iso: "IE", count: 376 },
    { name: "Peru", iso: "PE", count: 354 },
    { name: "Philippines", iso: "PH", count: 342 },
    { name: "South Africa", iso: "ZA", count: 328 },
    { name: "New Zealand", iso: "NZ", count: 296 },
    { name: "Thailand", iso: "TH", count: 278 },
    { name: "China", iso: "CN", count: 262 },
    { name: "Croatia", iso: "HR", count: 244 },
    { name: "Serbia", iso: "RS", count: 228 },
    { name: "Egypt", iso: "EG", count: 196 },
  ];

  // Fields mirror Radio Browser: votes (user votes) + clickcount (cumulative plays).
  // clicktrend (the "trending" growth metric) is faked by ordering position here.
  function S(name, country, iso, lang, genres, bitrate, codec) {
    const h = hash(name);
    return { stationuuid: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name, country, iso, language: lang, tags: genres.join(","), genres,
      bitrate, codec, votes: 80 + (h % 9000), clickcount: 1000 + (h % 240000) };
  }

  const STATIONS = [
    S("BBC Radio 6 Music", "United Kingdom", "GB", "English", ["Alternative","Indie","Eclectic"], 128, "MP3"),
    S("KEXP 90.3 FM", "United States", "US", "English", ["Eclectic","Indie","Public"], 128, "MP3"),
    S("FIP", "France", "FR", "French", ["Eclectic","Jazz","World"], 192, "MP3"),
    S("NTS Radio 1", "United Kingdom", "GB", "English", ["Electronic","Eclectic"], 256, "AAC"),
    S("Jazz FM", "United Kingdom", "GB", "English", ["Jazz","Soul","Blues"], 256, "MP3"),
    S("J-WAVE 81.3", "Japan", "JP", "Japanese", ["J-Pop","City Pop"], 128, "AAC"),
    S("Radio Nova", "France", "FR", "French", ["Eclectic","Groove"], 128, "AAC"),
    S("Triple J", "Australia", "AU", "English", ["Alternative","Indie"], 192, "MP3"),
    S("WNYC 93.9", "United States", "US", "English", ["News","Talk","Public"], 128, "AAC"),
    S("Classic FM", "United Kingdom", "GB", "English", ["Classical"], 192, "AAC"),
    S("Hot 97", "United States", "US", "English", ["Hip-Hop","Rap"], 128, "MP3"),
    S("FluxFM Berlin", "Germany", "DE", "German", ["Alternative","Indie"], 128, "MP3"),
    S("Rinse FM", "United Kingdom", "GB", "English", ["Electronic","Grime","House"], 256, "AAC"),
    S("Tokyo FM", "Japan", "JP", "Japanese", ["Pop","Talk"], 128, "MP3"),
    S("Antena 1", "Brazil", "BR", "Portuguese", ["Soft Rock","Pop"], 128, "MP3"),
    S("Los 40", "Spain", "ES", "Spanish", ["Pop","Hits"], 128, "MP3"),
    S("Radio Deejay", "Italy", "IT", "Italian", ["Pop","Dance"], 128, "MP3"),
    S("1LIVE", "Germany", "DE", "German", ["Pop","Charts"], 128, "AAC"),
    S("Worldwide FM", "United Kingdom", "GB", "English", ["Jazz","Soul","Global"], 256, "AAC"),
    S("KCRW", "United States", "US", "English", ["Eclectic","Indie","Public"], 128, "AAC"),
    S("Capital London", "United Kingdom", "GB", "English", ["Pop","Hits"], 128, "MP3"),
    S("InterFM897", "Japan", "JP", "Japanese", ["Bilingual","Rock"], 192, "MP3"),
    S("France Inter", "France", "FR", "French", ["News","Culture","Talk"], 128, "MP3"),
    S("Kiss Fresh", "United Kingdom", "GB", "English", ["Dance","Electronic"], 128, "MP3"),
  ];

  const GENRES = [
    { name: "Jazz & Soul", key: "jazz" },
    { name: "Electronic", key: "electronic" },
    { name: "Indie & Alternative", key: "indie" },
    { name: "Pop & Hits", key: "pop" },
    { name: "Classical", key: "classical" },
    { name: "News & Talk", key: "news" },
    { name: "Hip-Hop", key: "hip-hop" },
    { name: "World", key: "world" },
  ];

  function byGenre(substr) {
    return STATIONS.filter((s) => s.genres.some((g) => g.toLowerCase().includes(substr)));
  }

  const byVotes = [...STATIONS].sort((a, b) => b.votes - a.votes);
  const byPlays = [...STATIONS].sort((a, b) => b.clickcount - a.clickcount);

  window.IR2 = {
    gradientFor, initials, hash,
    countries: COUNTRIES,
    stations: STATIONS,
    genres: GENRES,
    // Every shelf below maps to a real Radio Browser ordering / filter:
    topStation: byVotes[0],          // order=votes, take #1
    trending: STATIONS.slice(0, 8),  // order=clicktrend
    popular: byPlays.slice(0, 8),    // order=clickcount
    mostVoted: byVotes.slice(0, 8),  // order=votes
    byGenre,
    byCountry: (iso) => {
      const real = STATIONS.filter((s) => s.iso === iso);
      if (real.length >= 3) return real;
      // Synthesize a plausible lineup for countries without seeded stations,
      // so every country drills into content (the live API returns real ones).
      const c = COUNTRIES.find((x) => x.iso === iso) || { name: iso, iso };
      const kinds = [
        ["FM", ["Pop", "Hits"]], ["Radio Uno", ["Talk", "News"]], ["Classic", ["Classical"]],
        ["Beat", ["Dance", "Electronic"]], ["Jazz Cafe", ["Jazz", "Soul"]], ["Rock", ["Rock", "Alternative"]],
        ["Capital", ["Pop", "Top 40"]], ["Cultura", ["Culture", "Talk"]],
      ];
      const synth = kinds.map(([suffix, genres], i) =>
        S(`${c.name.split(" ")[0]} ${suffix}`, c.name, iso, "", genres, [128, 192, 256][i % 3], i % 2 ? "AAC" : "MP3"));
      return real.concat(synth).slice(0, 8);
    },
    search: (q) => {
      q = q.trim().toLowerCase();
      if (!q) return [];
      return STATIONS.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.genres.some((g) => g.toLowerCase().includes(q)));
    },
  };
})();
