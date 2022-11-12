import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { RootStackParamList, Routes } from './routes.types';
import { PlayerScreen, SettingsScreen } from '../../screens';
import React from 'react';
import { TabNavigator } from './tabs';
import { getHeaderTitle } from './routes.utils';

const BaseStack = createNativeStackNavigator<RootStackParamList>();

export const BaseStackNavigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: theme.mode === 'dark',
        colors: {
          background: theme.colors.background,
          primary: theme.colors.black,
          text: theme.colors.black,
          border: theme.colors.background,
          card: theme.colors.background,
          notification: theme.colors.secondary
        }
      }}>
      <BaseStack.Navigator>
        <BaseStack.Screen
          name={Routes.ROOT}
          component={TabNavigator}
          options={({ navigation, route }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate(Routes.SETTINGS)}
                name="settings"
                color={theme.colors.black}
              />
            )
          })}
        />
        <BaseStack.Screen
          name={Routes.SETTINGS}
          component={SettingsScreen}
          options={{
            headerBackTitle: ''
          }}
        />
        <BaseStack.Screen
          name={Routes.PLAYER}
          component={PlayerScreen}
          options={{
            headerBackTitle: ''
          }}
        />
      </BaseStack.Navigator>
    </NavigationContainer>
  );
};
