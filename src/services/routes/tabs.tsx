import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { TabRoutes } from './routes.types';
import { PlayerScreen } from '../../screens';

const Tab = createBottomTabNavigator();

// type TabScreenProps = {
//   name: TabRoutes;
//   component: (props: {
//     route: RouteProp<ParamListBase, TabRoutes>;
//     navigation: any;
//   }) => ReactNode;
// };

// const tabs: TabScreenProps[] = [
//   {
//     name: TabRoutes.PLAYER,
//     component: PlayerScreen
//   }
// ];

export const TabStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={TabRoutes.PLAYER} component={PlayerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
