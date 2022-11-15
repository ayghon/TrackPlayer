import { RecursivePartial } from '@rneui/themed/dist/config/theme';
import { Colors } from '@rneui/themed/dist/config/colors';

export type ThemeColors = {
  lightColors: RecursivePartial<Colors>;
  darkColors: RecursivePartial<Colors>;
};
