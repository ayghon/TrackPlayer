import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_THEME_MODE, StorageKeys } from '../../utils';
import { ThemeMode, useThemeMode } from '@rneui/themed';
import { useCallback, useEffect } from 'react';
import { playlistsMock } from '../playlists';

export const useInitStorage = () => {
  const { mode, setMode } = useThemeMode();

  const handleThemeMode = useCallback(async () => {
    const storageDarkMode = (await AsyncStorage.getItem(
      StorageKeys.DARK_MODE
    )) as ThemeMode | null;

    if (!storageDarkMode) {
      if (mode !== DEFAULT_THEME_MODE) {
        setMode(DEFAULT_THEME_MODE);
      }
      await AsyncStorage.setItem(StorageKeys.DARK_MODE, DEFAULT_THEME_MODE);
    } else {
      if (mode !== storageDarkMode) {
        setMode(storageDarkMode);
      }
    }
  }, [mode, setMode]);

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
      await handleThemeMode();
      await handlePlaylists();
    };

    initStorage();
  }, [handlePlaylists, handleThemeMode]);
};
