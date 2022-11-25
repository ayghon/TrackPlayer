import { Platform } from 'react-native';
import { ThemeMode } from '@rneui/themed';

export enum StorageKeys {
  COLOR_SCHEME = 'color-scheme',
  PLAYLISTS = 'playlists'
}

export const DEFAULT_THEME_MODE: ThemeMode = 'dark';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
