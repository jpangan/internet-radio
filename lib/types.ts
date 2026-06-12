export interface Country {
  name: string;
  stationcount: number;
  iso_3166_1: string;
}

export interface Station {
  name: string;
  url_resolved: string;
  favicon: string;
  tags: string;
  country: string;
  language: string;
  votes: number;
  codec: string;
  bitrate: number;
}
