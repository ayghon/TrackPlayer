import { Track } from 'react-native-track-player';
import { tracksMocks } from '../tracks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../utils';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { faker } from '@faker-js/faker';

export type Playlist = {
  id: string;
  title: string;
  artwork?: string;
  count: number;
  duration?: number;
  tracks: Track[];
};

export const playlistsMock: Playlist[] = Array.from(Array(4)).map(
  (_, index) => ({
    id: faker.datatype.uuid(),
    tracks: tracksMocks.slice(index, index + 8),
    title: faker.random.words(3),
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
    async (playlist: Omit<Playlist, 'id'>) => {
      setLoading(true);
      const newList: Playlist[] = [
        ...playlists,
        { ...playlist, id: faker.datatype.uuid() }
      ];
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
    async (playlistId: string) => {
      setLoading(true);
      const newList = playlists.filter(({ id }) => id !== playlistId);
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
    async (playlistId: string, data: Partial<Playlist>) => {
      setLoading(true);
      const newList = playlists.map((item) =>
        item.id === playlistId ? { ...item, ...data } : item
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
