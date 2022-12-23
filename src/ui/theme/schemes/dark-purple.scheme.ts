import { textColorsDefaults } from './schemes.utils';

export const darkPurpleSchemeColors = {
  primary: {
    dark: '#000000',
    light: '#484848',
    normal: '#212121',
    opaque: '#00000099'
  },
  secondary: {
    dark: '#0100ca',
    light: '#a255ff',
    normal: '#651fff'
  },
  text: {
    accent: '#651fff',
    ...textColorsDefaults.dark
  }
};
