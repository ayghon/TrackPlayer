import { Track } from 'react-native-track-player';
import { tracks } from '../tracks';

export type Playlist = {
  title: string;
  artwork: string;
  count: number;
  duration?: number;
  tracks: Track[];
};

export const playlists: Playlist[] = [
  {
    tracks: tracks,
    title: 'My playlist',
    count: tracks.length,
    artwork: tracks[0].artwork as string
  },
  {
    tracks: tracks.slice(0, 2),
    title: 'My second playlist',
    count: tracks.length - 1,
    artwork: tracks[0].artwork as string
  }
];
