import { CustomBottomTabBar } from './components/CustomBottomTabBar';
import { HomeScreen, LibraryScreen } from '../../screens';
import { LibraryHeaderRight } from './components/LibraryHeaderRight';
import { RootStackScreenProps, Routes } from './routes.types';
import { TabBarIcon } from './components/TabBarIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC, ReactNode } from 'react';

const TabStack = createBottomTabNavigator();

type TabScreenProps = {
  iconName: string;
  name: Routes;
  title: string;
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
    title: 'Home'
  },
  {
    component: LibraryScreen,
    headerRight: LibraryHeaderRight,
    headerShown: false,
    iconName: 'list',
    name: Routes.LIBRARY,
    title: 'Library'
  }
];

export const TabNavigator = () => {
  return (
    <TabStack.Navigator tabBar={CustomBottomTabBar}>
      {tabs.map(
        ({ name, component, iconName, title, headerRight, headerShown }) => (
          <TabStack.Screen
            component={component}
            key={name}
            name={name}
            options={{
              headerRight,
              headerShown,
              headerTitle: '',
              tabBarIcon: (props) => <TabBarIcon {...props} name={iconName} />,
              title
            }}
          />
        )
      )}
    </TabStack.Navigator>
  );
};
