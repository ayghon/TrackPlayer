import { useThemeMode } from '@rneui/themed';
import { useState } from 'react';
import { ColorSchemeSetting } from './settings.types';
import { theme } from '../../ui';

const colorSchemeToText: Record<ColorSchemeSetting, string> = {
  [ColorSchemeSetting.DEFAULT_DARK]: 'Default Dark',
  [ColorSchemeSetting.DEFAULT_LIGHT]: 'Default Light'
};

type UseColorSchemeResponse = {
  colorScheme: ColorSchemeSetting;
  colorSchemeToText: Record<ColorSchemeSetting, string>;
  activeColorSchemeText: string;
  changeColorScheme: (scheme: ColorSchemeSetting) => void;
  colorSchemeList: { name: ColorSchemeSetting; title: string }[];
};

const colorSchemeList = Object.values(ColorSchemeSetting).map((value) => ({
  name: value,
  title: colorSchemeToText[value]
}));

export const useColorScheme = (): UseColorSchemeResponse => {
  const { mode, setMode } = useThemeMode();
  const isDarkMode = mode === 'dark';

  const [colorScheme, setColorScheme] = useState<ColorSchemeSetting>(
    isDarkMode
      ? ColorSchemeSetting.DEFAULT_DARK
      : ColorSchemeSetting.DEFAULT_LIGHT
  );

  const activeColorSchemeText = colorSchemeToText[colorScheme];

  const changeColorScheme = (scheme: ColorSchemeSetting) => {
    switch (scheme) {
      case ColorSchemeSetting.DEFAULT_DARK:
        setColorScheme(ColorSchemeSetting.DEFAULT_DARK);
        setMode('dark');
        break;
      case ColorSchemeSetting.DEFAULT_LIGHT:
      default:
        setColorScheme(ColorSchemeSetting.DEFAULT_LIGHT);
        setMode('light');
        break;
    }
  };

  return {
    colorScheme,
    colorSchemeToText,
    activeColorSchemeText,
    changeColorScheme,
    colorSchemeList
  };
};

export const getColorSchemePalette = (scheme: ColorSchemeSetting) => {
  switch (scheme) {
    case ColorSchemeSetting.DEFAULT_DARK:
      return [
        theme.darkColors?.primary,
        theme.darkColors?.secondary,
        theme.darkColors?.background
      ];
    case ColorSchemeSetting.DEFAULT_LIGHT:
    default:
      return [
        theme.lightColors?.primary,
        theme.lightColors?.secondary,
        theme.lightColors?.background
      ];
  }
};
