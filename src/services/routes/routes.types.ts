import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PlayerModalProps,
  PlaylistSettingsModalProps,
  PlaylistTracksSelectionModalProps
} from '../../modals';
import { PlaylistViewScreenProps } from '../../screens';

export enum Routes {
  ROOT = 'root',
  SETTINGS = 'settings',
  PLAYER = 'player',
  HOME = 'home',
  LIBRARY = 'library',
  COLOR_SCHEME = 'color-scheme',
  PLAYLIST_CREATE = 'playlist-create',
  PLAYLIST_VIEW = 'playlist-view',
  PLAYLIST_SETTINGS = 'playlist-settings',
  PLAYLIST_TRACKS_SELECTION = 'playlist-tracks-selection',
  LANGUAGE = 'language'
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
  [Routes.PLAYLIST_TRACKS_SELECTION]: PlaylistTracksSelectionModalProps;
  [Routes.LANGUAGE]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
