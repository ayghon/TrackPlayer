import { createTheme } from '@rneui/themed';
import { Colors } from '@rneui/themed/dist/config/colors';
import { RecursivePartial } from '@rneui/themed/dist/config/theme';

const colors: {
  lightColors: RecursivePartial<Colors>;
  darkColors: RecursivePartial<Colors>;
} = {
  darkColors: {
    primary: '#424242',
    secondary: '#1de9b6',
    background: '#1b1b1b'
  },
  lightColors: {
    primary: '#f5f5f5',
    secondary: '#1de9b6',
    background: '#c2c2c2'
  }
};

export const theme = createTheme({
  ...colors,
  mode: 'dark'
});
