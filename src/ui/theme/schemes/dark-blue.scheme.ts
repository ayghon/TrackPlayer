import { textColorsDefaults } from './schemes.utils';

export const darkBlueSchemeColors = {
  primary: {
    dark: '#000000',
    light: '#484848',
    normal: '#212121',
    opaque: '#00000099'
  },
  secondary: {
    dark: '#0031ca',
    light: '#8187ff',
    normal: '#3d5afe'
  },
  text: {
    accent: '#3d5afe',
    ...textColorsDefaults.dark
  }
};
