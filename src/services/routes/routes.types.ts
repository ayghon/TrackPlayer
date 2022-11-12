import { PlayerScreenProps } from '../../screens';

export enum Routes {
  ROOT = 'root',
  SETTINGS = 'settings',
  PLAYER = 'player',
  HOME = 'home',
  LIBRARY = 'library'
}

export type RootStackParamList = {
  [Routes.ROOT]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.PLAYER]: PlayerScreenProps;
  [Routes.HOME]: undefined;
  [Routes.LIBRARY]: undefined;
};
