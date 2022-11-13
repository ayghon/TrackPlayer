import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { RootStackParamList, Routes } from './routes.types';
import { HomeScreen, LibraryScreen } from '../../screens';
import { TabBarIcon } from './components/TabBarIcon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const TabStack = createBottomTabNavigator();

type TabScreenProps = {
  iconName: string;
  name: Routes;
  title: string;
  component: FC<NativeStackScreenProps<RootStackParamList, any>>;
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
    <TabStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 0
        }
      }}>
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
