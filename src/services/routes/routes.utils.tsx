import { BackButton } from './components/buttons/BackButton';
import { HeaderTitleProps, PlayerHeader } from './components/PlayerHeader';
import { IOSCloseButton } from './components/buttons/IOSCloseButton';
import { Icon } from 'native-base';
import {
  ParamListBase,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { PlaylistSettingsButton } from './components/buttons/PlaylistSettingsButton';
import { RootStackParamList, Routes } from './routes.types';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { getWelcomeMessageByPeriod, isAndroid } from '../../utils';
import { i18nKeys } from '../i18n';
import React from 'react';

export const getHeaderTitle = (route: RouteProp<ParamListBase, Routes>) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case Routes.LIBRARY:
      return i18nKeys.routes.tabs.library.header_title;
    case Routes.HOME:
    default:
      return getWelcomeMessageByPeriod();
  }
};

export const playlistViewOptions = ({
  route: {
    params: { playlistId }
  }
}: {
  route: RouteProp<RootStackParamList, Routes.PLAYLIST_VIEW>;
}) => ({
  headerRight: () => <PlaylistSettingsButton playlistId={playlistId} />
});

export const playerModalOptions = ({
  route: {
    params: { playlistId }
  }
}: {
  route: RouteProp<RootStackParamList, Routes.PLAYER>;
}) => ({
  contentStyle: {
    paddingTop: playlistId ? 0 : 16
  },
  headerLeft: isAndroid ? BackButton : undefined,
  headerRight: IOSCloseButton,
  headerTitle: (props: HeaderTitleProps) => (
    <PlayerHeader {...props} playlistId={playlistId} />
  )
});

export const tabsOptions = (iconName: string) => ({
  tabBarIcon: (props: { focused: boolean; color: string; size: number }) => (
    <Icon {...props} name={iconName} />
  )
});
