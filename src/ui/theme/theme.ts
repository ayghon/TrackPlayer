import { createTheme } from '@rneui/themed';
import { Colors } from '@rneui/themed/dist/config/colors';
import { RecursivePartial } from '@rneui/themed/dist/config/theme';
import { DEFAULT_THEME_MODE } from '../../utils';

type ThemeColors = {
  lightColors: RecursivePartial<Colors>;
  darkColors: RecursivePartial<Colors>;
};

const colors: ThemeColors = {
  darkColors: {
    primary: '#424242',
    secondary: '#1de9b6',
    background: '#1b1b1b'
  },
  lightColors: {
    primary: '#f5f5f5',
    secondary: '#AD1457',
    background: '#c2c2c2'
  }
};

export const theme = createTheme({
  ...colors,
  mode: DEFAULT_THEME_MODE
});
