import { initialTheme } from '../theme';
import { darkPurpleSchemeColors } from './dark-purple.scheme';
import { darkRedSchemeColors } from './dark-red.scheme';
import { darkBlueSchemeColors } from './dark-blue.scheme';
import { createTheme, CreateThemeOptions } from '@rneui/themed';
import { defaultSchemeColors } from './default.scheme';
import { ThemeColorScheme } from './schemes.types';

export const getColorSchemeConfiguration = (
  scheme: ThemeColorScheme
): {
  palette: (string | undefined)[];
  label: string;
  theme: CreateThemeOptions;
} => {
  switch (scheme) {
    case ThemeColorScheme.DEFAULT:
      return {
        palette: [
          initialTheme.darkColors?.primary,
          initialTheme.darkColors?.secondary,
          initialTheme.darkColors?.background
        ],
        label: 'Default',
        theme: createTheme(defaultSchemeColors)
      };
    case ThemeColorScheme.DARK_PURPLE:
      return {
        palette: [
          darkPurpleSchemeColors.darkColors.primary,
          darkPurpleSchemeColors.darkColors.secondary,
          darkPurpleSchemeColors.darkColors.background
        ],
        label: 'Dark Purple',
        theme: createTheme(darkPurpleSchemeColors)
      };
    case ThemeColorScheme.DARK_RED:
      return {
        palette: [
          darkRedSchemeColors.darkColors.primary,
          darkRedSchemeColors.darkColors.secondary,
          darkRedSchemeColors.darkColors.background
        ],
        label: 'Dark Red',
        theme: createTheme(darkRedSchemeColors)
      };
    case ThemeColorScheme.DARK_BLUE:
      return {
        palette: [
          darkBlueSchemeColors.darkColors.primary,
          darkBlueSchemeColors.darkColors.secondary,
          darkBlueSchemeColors.darkColors.background
        ],
        label: 'Dark Blue',
        theme: createTheme(darkBlueSchemeColors)
      };
  }
};
