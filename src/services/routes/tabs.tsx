import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC, ReactNode } from 'react';
import { RootStackParamList, Routes } from './routes.types';
import { HomeScreen, LibraryScreen } from '../../screens';
import { TabBarIcon } from './components/TabBarIcon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryHeaderRight } from './components/LibraryHeaderRight';
import { CustomBottomTabBar } from './components/CustomBottomTabBar';

const TabStack = createBottomTabNavigator();

type TabScreenProps = {
  iconName: string;
  name: Routes;
  title: string;
  component: FC<NativeStackScreenProps<RootStackParamList, any>>;
  headerRight?: () => ReactNode;
  headerShown?: boolean;
};

const tabs: TabScreenProps[] = [
  {
    name: Routes.HOME,
    component: HomeScreen,
    iconName: 'home',
    title: 'Home',
    headerShown: false
  },
  {
    name: Routes.LIBRARY,
    component: LibraryScreen,
    iconName: 'list',
    title: 'Library',
    headerShown: false,
    headerRight: LibraryHeaderRight
  }
];

export const TabNavigator = () => {
  return (
    <TabStack.Navigator tabBar={CustomBottomTabBar}>
      {tabs.map(
        ({ name, component, iconName, title, headerRight, headerShown }) => (
          <TabStack.Screen
            key={name}
            name={name}
            options={{
              headerShown,
              headerRight,
              tabBarIcon: (props) => <TabBarIcon {...props} name={iconName} />,
              title,
              headerTitle: ''
            }}
            component={component}
          />
        )
      )}
    </TabStack.Navigator>
  );
};
