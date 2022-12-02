import {
  ColorSchemeStorageData,
  StorageKeys,
  getParsedStorageData
} from '../../../services';
import { CreateThemeOptions, ThemeMode, createTheme } from '@rneui/themed';
import { ThemeColorScheme } from './schemes.types';
import { ThemeColors } from '../theme.types';
import { darkBlueSchemeColors } from './dark-blue.scheme';
import { darkPurpleSchemeColors } from './dark-purple.scheme';
import { darkRedSchemeColors } from './dark-red.scheme';
import { defaultSchemeColors } from './default.scheme';
import { initialTheme } from '../theme';
import { lightBlueSchemeColors } from './light-blue.scheme';
import { lightPurpleSchemeColors } from './light-purple.scheme';
import { lightRedSchemeColors } from './light-red.scheme';
import { lightTurquoiseSchemeColors } from './light-turquoise.scheme';

export type ColorSchemeConfigurationPalette = (string | undefined)[];

export type GetColorSchemeConfigurationResponse = {
  mode: ThemeMode;
  palette: ColorSchemeConfigurationPalette;
  label: string;
  theme: CreateThemeOptions;
};

const getCustomColorSchemePalette = async () => {
  const parsedData = await getParsedStorageData<ColorSchemeStorageData>(
    StorageKeys.CUSTOM_COLOR_SCHEMES
  );

  if (!parsedData) {
    return {
      colors: { darkColors: {}, lightColors: {} },
      mode: 'light' as ThemeMode,
      palette: []
    };
  }

  const customThemeColors = parsedData && {
    background: parsedData.palette.background,
    black: parsedData.palette.black,
    primary: parsedData.palette.primary,
    secondary: parsedData.palette.secondary,
    white: parsedData.palette.white
  };

  const colors: ThemeColors = {
    darkColors: customThemeColors,
    lightColors: customThemeColors
  };

  const palette: ColorSchemeConfigurationPalette = [
    parsedData.palette.primary,
    parsedData.palette.secondary,
    parsedData.palette.background
  ];

  return { colors, mode: parsedData.mode, palette };
};

export const getColorSchemeConfiguration = async (
  scheme: ThemeColorScheme
): Promise<GetColorSchemeConfigurationResponse> => {
  const customPalette = await getCustomColorSchemePalette();

  switch (scheme) {
    case ThemeColorScheme.DEFAULT:
    default:
      return {
        label: 'Default',
        mode: 'dark',
        palette: [
          initialTheme.darkColors?.primary,
          initialTheme.darkColors?.secondary,
          initialTheme.darkColors?.background
        ],
        theme: createTheme({ ...defaultSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_PURPLE:
      return {
        label: 'Dark Purple',
        mode: 'dark',
        palette: [
          darkPurpleSchemeColors.darkColors.primary,
          darkPurpleSchemeColors.darkColors.secondary,
          darkPurpleSchemeColors.darkColors.background
        ],
        theme: createTheme({ ...darkPurpleSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_RED:
      return {
        label: 'Dark Red',
        mode: 'dark',
        palette: [
          darkRedSchemeColors.darkColors.primary,
          darkRedSchemeColors.darkColors.secondary,
          darkRedSchemeColors.darkColors.background
        ],
        theme: createTheme({ ...darkRedSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_BLUE:
      return {
        label: 'Dark Blue',
        mode: 'dark',
        palette: [
          darkBlueSchemeColors.darkColors.primary,
          darkBlueSchemeColors.darkColors.secondary,
          darkBlueSchemeColors.darkColors.background
        ],
        theme: createTheme({ ...darkBlueSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.LIGHT_BLUE:
      return {
        label: 'Light Blue',
        mode: 'light',
        palette: [
          lightBlueSchemeColors.lightColors.primary,
          lightBlueSchemeColors.lightColors.secondary,
          lightBlueSchemeColors.lightColors.background
        ],
        theme: createTheme({ ...lightBlueSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_RED:
      return {
        label: 'Light Red',
        mode: 'light',
        palette: [
          lightRedSchemeColors.lightColors.primary,
          lightRedSchemeColors.lightColors.secondary,
          lightRedSchemeColors.lightColors.background
        ],
        theme: createTheme({ ...lightRedSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_PURPLE:
      return {
        label: 'Light Purple',
        mode: 'light',
        palette: [
          lightPurpleSchemeColors.lightColors.primary,
          lightPurpleSchemeColors.lightColors.secondary,
          lightPurpleSchemeColors.lightColors.background
        ],
        theme: createTheme({ ...lightPurpleSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_TURQUOISE:
      return {
        label: 'Light Turquoise',
        mode: 'light',
        palette: [
          lightTurquoiseSchemeColors.lightColors.primary,
          lightTurquoiseSchemeColors.lightColors.secondary,
          lightTurquoiseSchemeColors.lightColors.background
        ],
        theme: createTheme({ ...lightTurquoiseSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.CUSTOM:
      return {
        label: 'Custom',
        mode: customPalette.mode,
        palette: customPalette.palette,
        theme: createTheme({
          ...customPalette.colors,
          mode: customPalette.mode
        })
      };
  }
};
