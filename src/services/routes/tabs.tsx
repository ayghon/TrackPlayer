import { AddPlaylistButton } from './components/AddPlaylistButton';
import { CustomBottomTabBar } from './components/CustomBottomTabBar';
import { HomeScreen, LibraryScreen } from '../../screens';
import { Icon } from 'native-base';
import {
  RootStackParamList,
  RootStackScreenProps,
  Routes
} from './routes.types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { i18nKeys } from '../i18n';
import { useTranslation } from 'react-i18next';
import React, { FC, ReactNode } from 'react';

const TabStack = createBottomTabNavigator<RootStackParamList>();

type TabScreenProps = {
  iconName: string;
  name: Routes;
  titleKey: string;
  // FIXME use correct typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<RootStackScreenProps<any>>;
  headerRight?: () => ReactNode;
  headerShown?: boolean;
};

const tabs: TabScreenProps[] = [
  {
    component: HomeScreen,
    headerShown: false,
    iconName: 'home',
    name: Routes.HOME,
    titleKey: i18nKeys.routes.tabs.home.tab_bar.button.title
  },
  {
    component: LibraryScreen,
    headerRight: AddPlaylistButton,
    headerShown: false,
    iconName: 'list',
    name: Routes.LIBRARY,
    titleKey: i18nKeys.routes.tabs.library.tab_bar.button.title
  }
];

export const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <TabStack.Navigator tabBar={CustomBottomTabBar}>
      {tabs.map(
        ({ name, component, iconName, titleKey, headerRight, headerShown }) => (
          <TabStack.Screen
            component={component}
            key={name}
            name={name}
            options={{
              ...tabsOptions(iconName),
              headerRight,
              headerShown,
              headerTitle: '',
              title: t(titleKey)
            }}
          />
        )
      )}
    </TabStack.Navigator>
  );
};

const tabsOptions = (iconName: string) => ({
  tabBarIcon: (props: { focused: boolean; color: string; size: number }) => (
    <Icon {...props} name={iconName} />
  )
});
