import { DeviceEventEmitter } from 'react-native';
import { StorageEvent, StorageKeys } from '../../services';
import { ThemeColorScheme, getColorSchemeConfiguration } from './schemes';
import {
  buttonOverrides,
  checkboxOverrides,
  flatlistOverrides,
  headingOverrides,
  iconOverrides,
  inputOverrides,
  pressableOverrides,
  progressOverrides,
  sliderOverrides,
  spinnerOverrides,
  switchOverrides,
  textOverrides
} from './components';
import { colors } from './values/colors';
import { extendTheme } from 'native-base';
import { fontConfig, fontSizes, fonts } from './values/font';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export const DEFAULT_THEME_MODE: ThemeMode = ThemeMode.DARK;

const componentsOverrides = {
  Button: buttonOverrides,
  Checkbox: checkboxOverrides,
  FlatList: flatlistOverrides,
  Heading: headingOverrides,
  Icon: iconOverrides,
  Input: inputOverrides,
  Pressable: pressableOverrides,
  Progress: progressOverrides,
  SliderFilledTrack: sliderOverrides.filledTrack,
  SliderThumb: sliderOverrides.thumb,
  SliderTrack: sliderOverrides.track,
  Spinner: spinnerOverrides,
  Switch: switchOverrides,
  Text: textOverrides
};

export const defaultThemeOverrides = {
  components: componentsOverrides,
  fontConfig,
  fontSizes,
  fonts
};

export const initialTheme = extendTheme({
  colors,
  components: componentsOverrides,
  config: {
    initialColorMode: DEFAULT_THEME_MODE,
    useSystemColorMode: false
  },
  fontConfig,
  fontSizes,
  fonts
});

export type CustomTheme = typeof initialTheme;

export const useThemeManager = () => {
  const [theme, setTheme] = useState<CustomTheme>(initialTheme);

  const changeTheme = useCallback(async (scheme: ThemeColorScheme) => {
    const { theme: newTheme } = await getColorSchemeConfiguration(scheme);

    setTheme(newTheme);
    DeviceEventEmitter.emit(StorageEvent.COLOR_SCHEME_CHANGE, newTheme);
  }, []);

  useEffect(() => {
    const getStorageColorScheme = async () => {
      const storageColorScheme = (await AsyncStorage.getItem(
        StorageKeys.COLOR_SCHEME
      )) as ThemeColorScheme | null;

      if (storageColorScheme) {
        await changeTheme(storageColorScheme);
      }
    };

    getStorageColorScheme();
  }, [changeTheme]);

  return { changeTheme, theme };
};
