import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp
} from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import React, { ReactNode } from 'react';
import { TabRoutes } from './routes.types';

const Tab = createBottomTabNavigator();

type TabScreenProps = {
  name: TabRoutes;
  component: (props: {
    route: RouteProp<ParamListBase, TabRoutes>;
    navigation: any;
  }) => ReactNode;
};

const tabs: TabScreenProps[] = [
  {
    name: TabRoutes.PLAYER,
    component: () => (
      <View>
        <Text>Home</Text>
      </View>
    )
  }
];

export const TabStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {tabs.map(({ name, component }) => (
          <Tab.Screen key={name} name={name}>
            {component}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
