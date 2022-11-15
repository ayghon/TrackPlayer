import { createTheme, CreateThemeOptions, useTheme } from '@rneui/themed';
import { DEFAULT_THEME_MODE, StorageKeys } from '../../utils';
import { useCallback, useEffect, useState } from 'react';
import {
  defaultSchemeColors,
  getColorSchemeConfiguration,
  ThemeColorScheme
} from './schemes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialTheme = createTheme({
  ...defaultSchemeColors,
  mode: DEFAULT_THEME_MODE
});

export const useThemeManager = () => {
  const [theme, setTheme] = useState<CreateThemeOptions>(initialTheme);
  const { updateTheme } = useTheme();

  const changeTheme = useCallback(
    (scheme: ThemeColorScheme) => {
      const { theme: newTheme } = getColorSchemeConfiguration(scheme);
      if (updateTheme) {
        updateTheme(newTheme);
      }
      setTheme(newTheme);
    },
    [updateTheme]
  );

  useEffect(() => {
    const getStorageColorScheme = async () => {
      const storageColorScheme = (await AsyncStorage.getItem(
        StorageKeys.COLOR_SCHEME
      )) as ThemeColorScheme | null;

      if (storageColorScheme) {
        changeTheme(storageColorScheme);
      }
    };

    getStorageColorScheme();
  }, [changeTheme]);

  return { theme, changeTheme };
};
