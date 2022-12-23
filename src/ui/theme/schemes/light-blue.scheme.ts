import { textColorsDefaults } from './schemes.utils';

export const lightBlueSchemeColors = {
  primary: {
    dark: '#484848',
    light: '#ffffff',
    normal: '#fafafa',
    opaque: '#ffffff99'
  },
  secondary: {
    dark: '#0031ca',
    light: '#8187ff',
    normal: '#3d5afe'
  },
  text: {
    accent: '#3d5afe',
    ...textColorsDefaults.light
  }
};
