import { StorageKeys } from '../../utils';
import {
  ThemeColorScheme,
  getColorSchemeConfiguration,
  useThemeManager
} from '../../ui';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    activeColorSchemeText,
    changeColorScheme,
    colorScheme,
    colorSchemeList
  };
};
