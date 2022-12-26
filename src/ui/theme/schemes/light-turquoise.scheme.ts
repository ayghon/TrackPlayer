import { textColorsDefaults } from './schemes.utils';

export const lightTurquoiseSchemeColors = {
  primary: {
    dark: '#484848',
    light: '#ffffff',
    normal: '#fafafa',
    opaque: '#ffffff99'
  },
  secondary: {
    dark: '#00b686',
    light: '#6effe8',
    normal: '#1DE9B6'
  },
  text: {
    accent: '#00bfa5',
    ...textColorsDefaults.light
  }
};
