import { StorageKeys } from '../../utils';
import { Track } from 'react-native-track-player';
import { faker } from '@faker-js/faker';
import { tracksMocks } from '../tracks';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    artwork: tracksMocks[index].artwork as string,
    count: 8,
    id: faker.datatype.uuid(),
    title: faker.random.words(3),
    tracks: tracksMocks.slice(index, index + 8)
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
    addPlaylist,
    editPlaylist,
    getPlaylists,
    isLoading,
    playlists,
    removePlaylist
  };
};
