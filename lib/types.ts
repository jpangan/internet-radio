export interface Country {
  name: string;
  stationcount: number;
  iso_3166_1: string;
}

export interface Favorite {
  station: Station;
  country: Country;
}

export interface Station {
  stationuuid: string;
  name: string;
  url_resolved: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode?: string;
  language: string;
  votes: number;
  codec: string;
  bitrate: number;
}
