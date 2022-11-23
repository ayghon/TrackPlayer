import {
  ParamListBase,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { Routes } from './routes.types';
import { getWelcomeMessageByPeriod } from '../../utils';

export const getHeaderTitle = (route: RouteProp<ParamListBase, Routes>) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case Routes.LIBRARY:
      return 'Your library';
    case Routes.HOME:
    default:
      return getWelcomeMessageByPeriod();
  }
};
