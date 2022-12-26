import { textColorsDefaults } from './schemes.utils';

export const lightRedSchemeColors = {
  primary: {
    dark: '#484848',
    light: '#ffffff',
    normal: '#fafafa',
    opaque: '#ffffff99'
  },
  secondary: {
    dark: '#c4001d',
    light: '#ff616f',
    normal: '#ff1744'
  },
  text: {
    accent: '#ff1744',
    ...textColorsDefaults.light
  }
};
