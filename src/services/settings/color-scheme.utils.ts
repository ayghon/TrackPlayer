import { useCallback, useState } from 'react';
import {
  getColorSchemeConfiguration,
  ThemeColorScheme,
  useThemeManager
} from '../../ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';

type UseColorSchemeResponse = {
  colorScheme: ThemeColorScheme;
  activeColorSchemeText: string;
  changeColorScheme: (scheme: ThemeColorScheme) => void;
  colorSchemeList: { name: ThemeColorScheme; title: string }[];
};

const colorSchemeList = Object.values(ThemeColorScheme).map((value) => {
  const { label } = getColorSchemeConfiguration(value);

  return {
    name: value,
    title: label
  };
});

export const useColorScheme = (): UseColorSchemeResponse => {
  const { changeTheme } = useThemeManager();
  const [colorScheme, setColorScheme] = useState<ThemeColorScheme>(
    ThemeColorScheme.DEFAULT
  );

  const { label: activeColorSchemeText } =
    getColorSchemeConfiguration(colorScheme);

  const changeColorScheme = async (scheme: ThemeColorScheme) => {
    await AsyncStorage.setItem(StorageKeys.COLOR_SCHEME, scheme);
    changeTheme(scheme);
    setColorScheme(scheme);
  };

  useFocusEffect(
    useCallback(() => {
      const getStorageColorScheme = async () => {
        const storageColorScheme = (await AsyncStorage.getItem(
          StorageKeys.COLOR_SCHEME
        )) as ThemeColorScheme | null;

        if (storageColorScheme) {
          setColorScheme(storageColorScheme);
        }
      };

      getStorageColorScheme();
    }, [])
  );

  return {
    colorScheme,
    activeColorSchemeText,
    changeColorScheme,
    colorSchemeList
  };
};
