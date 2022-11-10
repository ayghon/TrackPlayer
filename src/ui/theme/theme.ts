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
  components: {
    Text: {
      h1Style: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '300',
        backgroundColor: 'white'
      },
      h2Style: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '100'
      },
      h3Style: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '500'
      }
    }
  },
  mode: 'dark'
});
