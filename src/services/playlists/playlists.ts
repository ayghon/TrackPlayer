import { Track } from 'react-native-track-player';
import { tracks } from '../tracks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../utils';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export type Playlist = {
  title: string;
  artwork?: string;
  count: number;
  duration?: number;
  tracks: Track[];
};

export const playlistsMock: Playlist[] = Array.from(Array(3)).map(
  (_, index) => ({
    tracks: tracks.slice(index, index + 5),
    title: `My playlist ${index}`,
    count: 5,
    artwork: tracks[index].artwork as string
  })
);

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(playlistsMock);
  const [isLoading, setLoading] = useState(true);

  const getPlaylists = useCallback(async () => {
    setLoading(true);
    const rawStoragePlaylists = await AsyncStorage.getItem(
      StorageKeys.PLAYLISTS
    );
    if (rawStoragePlaylists) {
      const newPlaylists = JSON.parse(rawStoragePlaylists) || [];
      setPlaylists(newPlaylists);
      setLoading(false);
      return newPlaylists;
    }

    setPlaylists([]);
    setLoading(false);
    return [];
  }, []);

  const addPlaylist = useCallback(
    async (playlist: Playlist) => {
      setLoading(true);
      await AsyncStorage.setItem(
        StorageKeys.PLAYLISTS,
        JSON.stringify([...playlists, playlist])
      );
      setLoading(false);
    },
    [playlists]
  );

  useFocusEffect(
    useCallback(() => {
      getPlaylists();
    }, [getPlaylists])
  );

  return { playlists, addPlaylist, isLoading };
};
