import { CustomTheme } from './src/ui';

declare module 'native-base' {
  interface ICustomTheme extends CustomTheme {}
}
