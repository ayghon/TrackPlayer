import { Track } from 'react-native-track-player';
import { tracksMocks } from '../tracks';
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

export const playlistsMock: Playlist[] = Array.from(Array(4)).map(
  (_, index) => ({
    tracks: tracksMocks.slice(index, index + 8),
    title: `My playlist ${index}`,
    count: 8,
    artwork: tracksMocks[index].artwork as string
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
      const newList = [...playlists, playlist];
      await AsyncStorage.setItem(
        StorageKeys.PLAYLISTS,
        JSON.stringify(newList)
      );
      setPlaylists(newList);
      setLoading(false);

      return newList;
    },
    [playlists]
  );

  const removePlaylist = useCallback(
    async (playlist: Playlist) => {
      setLoading(true);
      const newList = playlists.filter(({ title }) => title !== playlist.title);
      await AsyncStorage.setItem(
        StorageKeys.PLAYLISTS,
        JSON.stringify(newList)
      );
      setPlaylists(newList);
      setLoading(false);

      return newList;
    },
    [playlists]
  );

  const editPlaylist = useCallback(
    async (title: string, data: Partial<Playlist>) => {
      setLoading(true);
      const newList = playlists.map((item) =>
        item.title === title ? { ...item, ...data } : item
      );

      await AsyncStorage.setItem(
        StorageKeys.PLAYLISTS,
        JSON.stringify(newList)
      );
      setPlaylists(newList);
      setLoading(false);

      return newList;
    },
    [playlists]
  );

  useFocusEffect(
    useCallback(() => {
      getPlaylists();
    }, [getPlaylists])
  );

  return {
    playlists,
    addPlaylist,
    removePlaylist,
    isLoading,
    getPlaylists,
    editPlaylist
  };
};
