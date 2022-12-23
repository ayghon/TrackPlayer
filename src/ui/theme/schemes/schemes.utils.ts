import {
  ColorSchemeStorageData,
  StorageKeys,
  getParsedStorageData,
  i18nKeys
} from '../../../services';
import { CustomTheme, ThemeMode, defaultThemeOverrides } from '../theme';
import { ThemeColorScheme } from './schemes.types';
import { darkBlueSchemeColors } from './dark-blue.scheme';
import { darkPurpleSchemeColors } from './dark-purple.scheme';
import { darkRedSchemeColors } from './dark-red.scheme';
import { defaultSchemeColors } from './default.scheme';
import { extendTheme } from 'native-base';
import { lightBlueSchemeColors } from './light-blue.scheme';
import { lightPurpleSchemeColors } from './light-purple.scheme';
import { lightRedSchemeColors } from './light-red.scheme';
import { lightTurquoiseSchemeColors } from './light-turquoise.scheme';

export const textColorsDefaults = {
  dark: {
    primary: '#FFFFFF',
    secondary: '#000000',
    subtitle: {
      primary: '#D9D9D9',
      secondary: '#2D2D2D'
    }
  },
  light: {
    primary: '#000000',
    secondary: '#FFFFFF',
    subtitle: {
      primary: '#2D2D2D',
      secondary: '#D9D9D9'
    }
  }
};

export type ColorSchemeConfigurationPalette = [string, string] | never[];

export type GetColorSchemeConfigurationResponse = {
  mode: ThemeMode;
  palette: ColorSchemeConfigurationPalette;
  labelKey: string;
  theme: CustomTheme;
};

const getCustomColorSchemePalette = async () => {
  const parsedData = await getParsedStorageData<ColorSchemeStorageData>(
    StorageKeys.CUSTOM_COLOR_SCHEMES
  );

  if (!parsedData) {
    return {
      colors: {},
      mode: ThemeMode.LIGHT,
      palette: []
    };
  }

  const customThemeColors = {
    primary: {
      dark: parsedData.palette['primary.dark'],
      light: parsedData.palette['primary.light'],
      normal: parsedData.palette['primary.normal'],
      opaque: parsedData.palette['primary.opaque']
    },
    secondary: {
      dark: parsedData.palette['secondary.dark'],
      light: parsedData.palette['secondary.light'],
      normal: parsedData.palette['secondary.normal']
    },
    text: {
      accent: parsedData.palette['secondary.normal'],
      ...(parsedData.mode === ThemeMode.DARK
        ? textColorsDefaults.dark
        : textColorsDefaults.light)
    }
  };

  const palette: ColorSchemeConfigurationPalette = [
    parsedData.palette['primary.normal'],
    parsedData.palette['secondary.normal']
  ];

  return { colors: customThemeColors, mode: parsedData.mode, palette };
};

export const getColorSchemeConfiguration = async (
  scheme: ThemeColorScheme
): Promise<GetColorSchemeConfigurationResponse> => {
  const customPalette = await getCustomColorSchemePalette();

  switch (scheme) {
    case ThemeColorScheme.DEFAULT:
    default:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.default,
        mode: ThemeMode.DARK,
        palette: [
          defaultSchemeColors.primary.normal,
          defaultSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: defaultSchemeColors,
          config: {
            initialColorMode: ThemeMode.DARK,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.DARK_PURPLE:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.dark_purple,
        mode: ThemeMode.DARK,
        palette: [
          darkPurpleSchemeColors.primary.normal,
          darkPurpleSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: darkPurpleSchemeColors,
          config: {
            initialColorMode: ThemeMode.DARK,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.DARK_RED:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.dark_red,
        mode: ThemeMode.DARK,
        palette: [
          darkRedSchemeColors.primary.normal,
          darkRedSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: darkRedSchemeColors,
          config: {
            initialColorMode: ThemeMode.DARK,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.DARK_BLUE:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.dark_blue,
        mode: ThemeMode.DARK,
        palette: [
          darkBlueSchemeColors.primary.normal,
          darkBlueSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: darkBlueSchemeColors,
          config: {
            initialColorMode: ThemeMode.DARK,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.LIGHT_BLUE:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.light_blue,
        mode: ThemeMode.LIGHT,
        palette: [
          lightBlueSchemeColors.primary.normal,
          lightBlueSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: lightBlueSchemeColors,
          config: {
            initialColorMode: ThemeMode.LIGHT,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.LIGHT_RED:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.light_red,
        mode: ThemeMode.LIGHT,
        palette: [
          lightRedSchemeColors.primary.normal,
          lightRedSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: lightRedSchemeColors,
          config: {
            initialColorMode: ThemeMode.LIGHT,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.LIGHT_PURPLE:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.light_purple,
        mode: ThemeMode.LIGHT,
        palette: [
          lightPurpleSchemeColors.primary.normal,
          lightPurpleSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: lightPurpleSchemeColors,
          config: {
            initialColorMode: ThemeMode.LIGHT,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.LIGHT_TURQUOISE:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.light_turquoise,
        mode: ThemeMode.LIGHT,
        palette: [
          lightTurquoiseSchemeColors.primary.normal,
          lightTurquoiseSchemeColors.secondary.normal
        ],
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: lightTurquoiseSchemeColors,
          config: {
            initialColorMode: ThemeMode.LIGHT,
            useSystemColorMode: false
          }
        })
      };
    case ThemeColorScheme.CUSTOM:
      return {
        labelKey: i18nKeys.ui.theme.schemes.theme_color_scheme.custom,
        mode: customPalette.mode,
        palette: customPalette.palette,
        theme: extendTheme({
          ...defaultThemeOverrides,
          colors: { ...customPalette.colors },
          config: {
            initialColorMode: customPalette.mode,
            useSystemColorMode: false
          }
        })
      };
  }
};
