import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_THEME_MODE, StorageKeys } from '../../utils';
import { ThemeMode, useThemeMode } from '@rneui/themed';
import { useEffect } from 'react';

export const useInitStorage = () => {
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    const initStorage = async () => {
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
    };

    initStorage();
  }, [mode, setMode]);
};
