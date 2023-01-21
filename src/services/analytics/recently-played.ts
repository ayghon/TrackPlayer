import { DeviceEventEmitter } from 'react-native';
import { Playlist, usePlaylistsState } from '../playlists';
import { StorageEvent, StorageKeys, getParsedStorageData } from '../storage';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateRecentlyPlayed = async (playlistId: string) => {
  const data =
    (await getParsedStorageData<string[]>(StorageKeys.RECENTLY_PLAYED)) || [];

  let newData: string[] = data.filter((item) => item !== playlistId);
  if (newData.length >= 3) {
    newData = [playlistId, ...newData.slice(0, 2)];
  } else {
    newData = [playlistId, ...newData];
  }

  await AsyncStorage.setItem(
    StorageKeys.RECENTLY_PLAYED,
    JSON.stringify(newData)
  );
  DeviceEventEmitter.emit(StorageEvent.RECENTLY_PLAYED_UPDATED, newData);
};

const getRecentlyPlayed =
  getParsedStorageData<string[]>(StorageKeys.RECENTLY_PLAYED) || [];

export const transformRecentlyPlayedIdsToPlaylists = (
  playlists: Playlist[],
  ids: string[]
) =>
  ids.reduce<Playlist[]>((acc, it) => {
    const playlistItem = playlists.find((playlist) => playlist.id === it);

    return playlistItem ? [...acc, playlistItem] : acc;
  }, []);

export const useRecentlyPlayed = () => {
  const [isLoading, setLoading] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Playlist[]>([]);
  const { playlists } = usePlaylistsState();

  useEffect(() => {
    setLoading(true);
    getRecentlyPlayed.then((items) => {
      if (!items) {
        return;
      }

      const playlistItems = transformRecentlyPlayedIdsToPlaylists(
        playlists,
        items
      );
      setRecentlyPlayed(playlistItems);
      setLoading(false);
    });
  }, [playlists]);

  return { isLoading, recentlyPlayed };
};
