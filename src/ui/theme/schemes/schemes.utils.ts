import { initialTheme } from '../theme';
import { darkPurpleSchemeColors } from './dark-purple.scheme';
import { darkRedSchemeColors } from './dark-red.scheme';
import { darkBlueSchemeColors } from './dark-blue.scheme';
import { createTheme, CreateThemeOptions, ThemeMode } from '@rneui/themed';
import { defaultSchemeColors } from './default.scheme';
import { ThemeColorScheme } from './schemes.types';
import { lightBlueSchemeColors } from './light-blue.scheme';
import { lightRedSchemeColors } from './light-red.scheme';
import { lightPurpleSchemeColors } from './light-purple.scheme';
import { lightTurquoiseSchemeColors } from './light-turquoise.scheme';

export const getColorSchemeConfiguration = (
  scheme: ThemeColorScheme
): {
  mode: ThemeMode;
  palette: (string | undefined)[];
  label: string;
  theme: CreateThemeOptions;
} => {
  switch (scheme) {
    case ThemeColorScheme.DEFAULT:
      return {
        mode: 'dark',
        palette: [
          initialTheme.darkColors?.primary,
          initialTheme.darkColors?.secondary,
          initialTheme.darkColors?.background
        ],
        label: 'Default',
        theme: createTheme({ ...defaultSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_PURPLE:
      return {
        mode: 'dark',
        palette: [
          darkPurpleSchemeColors.darkColors.primary,
          darkPurpleSchemeColors.darkColors.secondary,
          darkPurpleSchemeColors.darkColors.background
        ],
        label: 'Dark Purple',
        theme: createTheme({ ...darkPurpleSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_RED:
      return {
        mode: 'dark',
        palette: [
          darkRedSchemeColors.darkColors.primary,
          darkRedSchemeColors.darkColors.secondary,
          darkRedSchemeColors.darkColors.background
        ],
        label: 'Dark Red',
        theme: createTheme({ ...darkRedSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.DARK_BLUE:
      return {
        mode: 'dark',
        palette: [
          darkBlueSchemeColors.darkColors.primary,
          darkBlueSchemeColors.darkColors.secondary,
          darkBlueSchemeColors.darkColors.background
        ],
        label: 'Dark Blue',
        theme: createTheme({ ...darkBlueSchemeColors, mode: 'dark' })
      };
    case ThemeColorScheme.LIGHT_BLUE:
      return {
        mode: 'light',
        palette: [
          lightBlueSchemeColors.lightColors.primary,
          lightBlueSchemeColors.lightColors.secondary,
          lightBlueSchemeColors.lightColors.background
        ],
        label: 'Light Blue',
        theme: createTheme({ ...lightBlueSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_RED:
      return {
        mode: 'light',
        palette: [
          lightRedSchemeColors.lightColors.primary,
          lightRedSchemeColors.lightColors.secondary,
          lightRedSchemeColors.lightColors.background
        ],
        label: 'Light Red',
        theme: createTheme({ ...lightRedSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_PURPLE:
      return {
        mode: 'light',
        palette: [
          lightPurpleSchemeColors.lightColors.primary,
          lightPurpleSchemeColors.lightColors.secondary,
          lightPurpleSchemeColors.lightColors.background
        ],
        label: 'Light Purple',
        theme: createTheme({ ...lightPurpleSchemeColors, mode: 'light' })
      };
    case ThemeColorScheme.LIGHT_TURQUOISE:
      return {
        mode: 'light',
        palette: [
          lightTurquoiseSchemeColors.lightColors.primary,
          lightTurquoiseSchemeColors.lightColors.secondary,
          lightTurquoiseSchemeColors.lightColors.background
        ],
        label: 'Light Turquoise',
        theme: createTheme({ ...lightTurquoiseSchemeColors, mode: 'light' })
      };
  }
};
