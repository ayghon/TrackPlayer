import {
  CreatePlaylistRequest,
  Playlist,
  UsePlaylistsResponse
} from './playlists.types';
import { StorageKeys, getParsedStorageData } from '../storage';
import { faker } from '@faker-js/faker';
import { tracksMocks } from '../tracks';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const playlistsMock: Playlist[] = Array.from(Array(4)).map(
  (_, index) => ({
    artwork: tracksMocks[index].artwork as string,
    count: 8,
    createdAt: faker.datatype.datetime().toISOString(),
    id: faker.datatype.uuid(),
    pinned: false,
    title: faker.random.words(3),
    tracks: tracksMocks.slice(index, index + 8)
  })
);

export const usePlaylists = (): UsePlaylistsResponse => {
  const [playlists, setPlaylists] = useState<Playlist[]>(playlistsMock);
  const [pinnedPlaylists, setPinnedPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getPlaylists = useCallback(async () => {
    setLoading(true);
    const storagePlaylists = await getParsedStorageData<Playlist[]>(
      StorageKeys.PLAYLISTS
    );
    if (storagePlaylists) {
      setPlaylists(storagePlaylists);
      setLoading(false);
      return storagePlaylists;
    }

    setPlaylists([]);
    setLoading(false);
    return [];
  }, []);

  const getPinnedPlaylists = useCallback(async () => {
    setLoading(true);
    const storagePlaylists = await getParsedStorageData<Playlist[]>(
      StorageKeys.PLAYLISTS
    );

    if (storagePlaylists) {
      const pinnedItems = storagePlaylists.reduce<Playlist[]>(
        (acc, it) => (it.pinned ? [...acc, it] : acc),
        []
      );

      setPinnedPlaylists(pinnedItems);
      setLoading(false);
      return pinnedItems;
    }

    setPinnedPlaylists([]);
    setLoading(false);
    return [];
  }, []);

  const getPlaylist = (id: string) => playlists.find((p) => p.id === id);

  const createPlaylist = useCallback(
    async (playlist: CreatePlaylistRequest) => {
      setLoading(true);
      const newList: Playlist[] = [
        ...playlists,
        {
          ...playlist,
          createdAt: new Date().toISOString(),
          id: faker.datatype.uuid()
        }
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
      const newList = playlists.filter(({ id }) => id !== playlistId) || [];
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
      const newList =
        playlists.map((item) =>
          item.id === playlistId ? { ...item, ...data } : item
        ) || [];

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
      getPinnedPlaylists();
    }, [getPlaylists, getPinnedPlaylists])
  );

  const orderedPlaylists = playlists.sort((a, b) => {
    if (a.pinned && !b.pinned) {
      return -1;
    }

    if (!a.pinned && b.pinned) {
      return 1;
    }
    return 0;
  });

  return {
    createPlaylist,
    editPlaylist,
    getPinnedPlaylists,
    getPlaylist,
    getPlaylists,
    isLoading,
    orderedPlaylists,
    pinnedPlaylists,
    playlists,
    removePlaylist
  };
};
