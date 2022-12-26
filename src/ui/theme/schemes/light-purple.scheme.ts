import { textColorsDefaults } from './schemes.utils';

export const lightPurpleSchemeColors = {
  primary: {
    dark: '#484848',
    light: '#ffffff',
    normal: '#fafafa',
    opaque: '#ffffff99'
  },
  secondary: {
    dark: '#0100ca',
    light: '#a255ff',
    normal: '#651fff'
  },
  text: {
    accent: '#651fff',
    ...textColorsDefaults.light
  }
};
