import { Colors } from '@rneui/themed/dist/config/colors';
import { RecursivePartial } from '@rneui/themed/dist/config/theme';

export type ThemeColors = {
  lightColors: RecursivePartial<Colors>;
  darkColors: RecursivePartial<Colors>;
};
