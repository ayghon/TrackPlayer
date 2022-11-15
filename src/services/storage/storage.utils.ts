import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../utils';
import { useCallback, useEffect } from 'react';
import { playlistsMock } from '../playlists';

export const useInitStorage = () => {
  const handlePlaylists = useCallback(async () => {
    const storagePlaylists = await AsyncStorage.getItem(StorageKeys.PLAYLISTS);
    if (!storagePlaylists) {
      await AsyncStorage.setItem(
        StorageKeys.PLAYLISTS,
        JSON.stringify(playlistsMock)
      );
    }
  }, []);

  useEffect(() => {
    const initStorage = async () => {
      await handlePlaylists();
    };

    initStorage();
  }, [handlePlaylists]);
};
