import { Track } from 'react-native-track-player';

export type CreatePlaylistRequest = Omit<Playlist, 'id' | 'createdAt'>;

export type Playlist = {
  id: string;
  createdAt: string;
  title: string;
  artwork?: string;
  count: number;
  duration?: number;
  tracks: Track[];
  pinned: boolean;
};

export type UsePlaylistsResponse = {
  createPlaylist: (playlist: CreatePlaylistRequest) => Promise<Playlist[]>;
  editPlaylist: (
    playlistId: string,
    data: Partial<Playlist>
  ) => Promise<Playlist[]>;
  getPlaylists: () => Promise<Playlist[]>;
  isLoading: boolean;
  orderedPlaylists: Playlist[];
  playlists: Playlist[];
  removePlaylist: (playlistId: string) => Promise<Playlist[]>;
  getPlaylist: (id: string) => Playlist | undefined;
};
