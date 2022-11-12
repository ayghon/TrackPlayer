import { Track } from 'react-native-track-player';
import { tracks } from '../tracks';

export type Playlist = {
  title: string;
  artwork: string;
  count: number;
  duration?: number;
  tracks: Track[];
};

export const playlists: Playlist[] = Array.from(Array(6)).map((_, index) => ({
  tracks: tracks.slice(index, index + 5),
  title: `My playlist ${index}`,
  count: 5,
  artwork: tracks[index].artwork as string
}));
