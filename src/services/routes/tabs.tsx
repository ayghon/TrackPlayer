import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Routes } from './routes.types';
import { HomeScreen, LibraryScreen } from '../../screens';
import { RouteProp } from '@react-navigation/core/src/types';
import { TabBarIcon } from './components/TabBarIcon';

const TabStack = createBottomTabNavigator();

type TabScreenProps = {
  iconName: string;
  name: Routes;
  title: string;
  component:
    | React.ComponentType<{
        route: RouteProp<ParamListBase, Routes>;
        navigation: any;
      }>
    | React.ComponentType<Record<string, unknown>>;
};

const tabs: TabScreenProps[] = [
  {
    name: Routes.HOME,
    component: HomeScreen,
    iconName: 'home',
    title: 'Home'
  },
  {
    name: Routes.LIBRARY,
    component: LibraryScreen,
    iconName: 'list',
    title: 'Library'
  }
];

export const TabNavigator = () => {
  return (
    <TabStack.Navigator>
      {tabs.map(({ name, component, iconName, title }) => (
        <TabStack.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: (props) => <TabBarIcon {...props} name={iconName} />,
            title,
            headerTitle: ''
          }}
          component={component}
        />
      ))}
    </TabStack.Navigator>
  );
};
