import { colors } from '../values/colors';
import { textColorsDefaults } from './schemes.utils';

export const defaultSchemeColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  text: {
    accent: '#1DE9B6',
    ...textColorsDefaults.dark
  }
};
