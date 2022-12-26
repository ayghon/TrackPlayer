import { textColorsDefaults } from './schemes.utils';

export const darkRedSchemeColors = {
  primary: {
    dark: '#000000',
    light: '#484848',
    normal: '#212121',
    opaque: '#00000099'
  },
  secondary: {
    dark: '#c4001d',
    light: '#ff616f',
    normal: '#ff1744'
  },
  text: {
    accent: '#ff1744',
    ...textColorsDefaults.dark
  }
};
