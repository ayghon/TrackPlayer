import {
  ParamListBase,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { Routes } from './routes.types';
import { getWelcomeMessageByPeriod } from '../../utils';
import { i18nKeys } from '../i18n';

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
