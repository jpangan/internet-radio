// Fake catalog for the Internet Radio UI kit. Shapes mirror lib/types.ts.
window.IR_DATA = {
  countries: [
    { name: "United Kingdom", iso_3166_1: "GB", stationcount: 2841 },
    { name: "United States", iso_3166_1: "US", stationcount: 5392 },
    { name: "Japan", iso_3166_1: "JP", stationcount: 1209 },
    { name: "France", iso_3166_1: "FR", stationcount: 1876 },
    { name: "Germany", iso_3166_1: "DE", stationcount: 3104 },
    { name: "Brazil", iso_3166_1: "BR", stationcount: 1442 },
    { name: "Italy", iso_3166_1: "IT", stationcount: 1330 },
    { name: "Spain", iso_3166_1: "ES", stationcount: 1188 },
    { name: "Mexico", iso_3166_1: "MX", stationcount: 980 },
    { name: "Australia", iso_3166_1: "AU", stationcount: 742 },
  ],
  stations: {
    GB: [
      { stationuuid: "gb1", name: "BBC Radio 6 Music", favicon: "", tags: "alternative,indie,eclectic", country: "United Kingdom", language: "english", codec: "MP3", bitrate: 128 },
      { stationuuid: "gb2", name: "BBC Radio 1", favicon: "", tags: "pop,top 40,dance", country: "United Kingdom", language: "english", codec: "AAC", bitrate: 128 },
      { stationuuid: "gb3", name: "Jazz FM", favicon: "", tags: "jazz,soul,blues", country: "United Kingdom", language: "english", codec: "MP3", bitrate: 256 },
      { stationuuid: "gb4", name: "Capital London", favicon: "", tags: "pop,hits", country: "United Kingdom", language: "english", codec: "MP3", bitrate: 128 },
      { stationuuid: "gb5", name: "Classic FM", favicon: "", tags: "classical", country: "United Kingdom", language: "english", codec: "AAC", bitrate: 192 },
      { stationuuid: "gb6", name: "Kiss Fresh", favicon: "", tags: "dance,electronic", country: "United Kingdom", language: "english", codec: "MP3", bitrate: 128 },
    ],
    US: [
      { stationuuid: "us1", name: "KEXP 90.3 FM Seattle", favicon: "", tags: "eclectic,public,indie", country: "United States", language: "english", codec: "MP3", bitrate: 128 },
      { stationuuid: "us2", name: "WNYC 93.9 FM", favicon: "", tags: "news,talk,public", country: "United States", language: "english", codec: "AAC", bitrate: 128 },
      { stationuuid: "us3", name: "Hot 97", favicon: "", tags: "hip hop,rap", country: "United States", language: "english", codec: "MP3", bitrate: 128 },
      { stationuuid: "us4", name: "WFMU", favicon: "", tags: "freeform,eclectic", country: "United States", language: "english", codec: "MP3", bitrate: 128 },
    ],
    JP: [
      { stationuuid: "jp1", name: "J-WAVE 81.3", favicon: "", tags: "j-pop,city pop", country: "Japan", language: "japanese", codec: "AAC", bitrate: 128 },
      { stationuuid: "jp2", name: "Tokyo FM", favicon: "", tags: "pop,talk", country: "Japan", language: "japanese", codec: "MP3", bitrate: 128 },
      { stationuuid: "jp3", name: "InterFM897", favicon: "", tags: "bilingual,rock", country: "Japan", language: "japanese", codec: "MP3", bitrate: 192 },
    ],
    FR: [
      { stationuuid: "fr1", name: "FIP", favicon: "", tags: "eclectic,jazz,world", country: "France", language: "french", codec: "MP3", bitrate: 192 },
      { stationuuid: "fr2", name: "Radio Nova", favicon: "", tags: "eclectic,groove", country: "France", language: "french", codec: "AAC", bitrate: 128 },
      { stationuuid: "fr3", name: "France Inter", favicon: "", tags: "news,talk,culture", country: "France", language: "french", codec: "MP3", bitrate: 128 },
    ],
    DE: [
      { stationuuid: "de1", name: "FluxFM Berlin", favicon: "", tags: "alternative,indie", country: "Germany", language: "german", codec: "MP3", bitrate: 128 },
      { stationuuid: "de2", name: "1LIVE", favicon: "", tags: "pop,charts", country: "Germany", language: "german", codec: "AAC", bitrate: 128 },
    ],
    BR: [
      { stationuuid: "br1", name: "Rádio Globo", favicon: "", tags: "talk,sports", country: "Brazil", language: "portuguese", codec: "MP3", bitrate: 128 },
      { stationuuid: "br2", name: "Antena 1", favicon: "", tags: "soft rock,pop", country: "Brazil", language: "portuguese", codec: "MP3", bitrate: 128 },
    ],
    IT: [{ stationuuid: "it1", name: "Radio Deejay", favicon: "", tags: "pop,dance", country: "Italy", language: "italian", codec: "MP3", bitrate: 128 }],
    ES: [{ stationuuid: "es1", name: "Los 40", favicon: "", tags: "pop,hits", country: "Spain", language: "spanish", codec: "MP3", bitrate: 128 }],
    MX: [{ stationuuid: "mx1", name: "Los 40 México", favicon: "", tags: "pop,latin", country: "Mexico", language: "spanish", codec: "MP3", bitrate: 128 }],
    AU: [{ stationuuid: "au1", name: "Triple J", favicon: "", tags: "alternative,indie", country: "Australia", language: "english", codec: "MP3", bitrate: 128 }],
  },
};
