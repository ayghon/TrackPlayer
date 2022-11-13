import { PlayerScreenProps } from '../../screens';

export enum Routes {
  ROOT = 'root',
  SETTINGS = 'settings',
  PLAYER = 'player',
  HOME = 'home',
  LIBRARY = 'library',
  COLOR_SCHEME = 'color-scheme',
  CREATE_PLAYLIST = 'create-playlist'
}

export type RootStackParamList = {
  [Routes.ROOT]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.PLAYER]: PlayerScreenProps;
  [Routes.HOME]: undefined;
  [Routes.LIBRARY]: undefined;
  [Routes.COLOR_SCHEME]: undefined;
  [Routes.CREATE_PLAYLIST]: undefined;
};
