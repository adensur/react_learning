export type Track = {
  name: string;
  artists: string;
  id: string;
};

export type Data = {
  content: string;
  tracks: Array<Track>;
};

export type ExtendedTrack = {
  track: Track;
  note: string;
  state: string; // todo: Enum
};
