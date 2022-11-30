import { Platform } from 'react-native';
import { ThemeMode } from '@rneui/themed';

export const DEFAULT_THEME_MODE: ThemeMode = 'dark';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
