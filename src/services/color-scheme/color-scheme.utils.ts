import {
  ColorSchemeList,
  ThemeColorScheme,
  getColorSchemeConfiguration,
  useThemeManager
} from '../../ui';
import { StorageKeys } from '../storage';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseColorSchemeResponse = {
  colorScheme: ThemeColorScheme;
  activeColorSchemeText: string;
  changeColorScheme: (scheme: ThemeColorScheme) => void;
  colorSchemeList: ColorSchemeList;
};

export const useColorScheme = (): UseColorSchemeResponse => {
  const { changeTheme } = useThemeManager();
  const [colorScheme, setColorScheme] = useState<ThemeColorScheme>(
    ThemeColorScheme.DEFAULT
  );
  const [activeColorSchemeText, setActiveColorSchemeText] = useState('');
  const [colorSchemeList, setColorSchemeList] = useState<ColorSchemeList>([]);

  useEffect(() => {
    getColorSchemeConfiguration(colorScheme).then(({ label }) =>
      setActiveColorSchemeText(label)
    );
  }, [colorScheme]);

  useEffect(() => {
    Promise.all(
      Object.values(ThemeColorScheme).map(async (value) => {
        const { label } = await getColorSchemeConfiguration(value);

        return {
          name: value,
          title: label
        };
      })
    ).then((list) => setColorSchemeList(list));
  }, []);

  const changeColorScheme = useCallback(
    async (scheme: ThemeColorScheme) => {
      await AsyncStorage.setItem(StorageKeys.COLOR_SCHEME, scheme);
      await changeTheme(scheme);
      setColorScheme(scheme);
    },
    [changeTheme]
  );

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
