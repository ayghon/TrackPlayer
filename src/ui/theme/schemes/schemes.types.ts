export enum ThemeColorScheme {
  DEFAULT = 'default',
  DARK_PURPLE = 'dark-purple',
  DARK_RED = 'dark-red',
  DARK_BLUE = 'dark-blue',
  LIGHT_BLUE = 'light-blue',
  LIGHT_PURPLE = 'light-purple',
  LIGHT_RED = 'light-red',
  LIGHT_TURQUOISE = 'light-turquoise',
  CUSTOM = 'custom'
}

/**
 * @description List of colors linked to a color-scheme
 */
export enum ColorSchemePalette {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BACKGROUND = 'background',
  LIGHT = 'white',
  DARK = 'black'
}

export type ColorSchemeItem = {
  name: ThemeColorScheme;
  title: string;
};

export type ColorSchemeList = ColorSchemeItem[];
