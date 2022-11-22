import { PlaylistViewScreenProps } from '../../screens';
import { PlayerModalProps, PlaylistSettingsModalProps } from '../../modals';

export enum Routes {
  ROOT = 'root',
  SETTINGS = 'settings',
  PLAYER = 'player',
  HOME = 'home',
  LIBRARY = 'library',
  COLOR_SCHEME = 'color-scheme',
  PLAYLIST_CREATE = 'playlist-create',
  PLAYLIST_VIEW = 'playlist-view',
  PLAYLIST_SETTINGS = 'playlist-settings'
}

export type RootStackParamList = {
  [Routes.ROOT]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.PLAYER]: PlayerModalProps;
  [Routes.HOME]: undefined;
  [Routes.LIBRARY]: undefined;
  [Routes.COLOR_SCHEME]: undefined;
  [Routes.PLAYLIST_CREATE]: undefined;
  [Routes.PLAYLIST_VIEW]: PlaylistViewScreenProps;
  [Routes.PLAYLIST_SETTINGS]: PlaylistSettingsModalProps;
};
