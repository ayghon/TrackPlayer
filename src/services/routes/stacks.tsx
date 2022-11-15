import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, Routes } from './routes.types';
import { PlaylistViewScreen, SettingsScreen } from '../../screens';
import React from 'react';
import { TabNavigator } from './tabs';
import { getHeaderTitle } from './routes.utils';
import { Icon, useTheme } from '@rneui/themed';
import {
  ColorSchemeModal,
  PlayerModal,
  PlaylistCreateModal
} from '../../modals';
import { LibraryHeaderRight } from './components/LibraryHeaderRight';
import { Horizontal } from '../../ui';
import { Platform } from 'react-native';
import { useInitStorage } from '../storage/storage.utils';

const BaseStack = createNativeStackNavigator<RootStackParamList>();

export const BaseStackNavigation = () => {
  useInitStorage();
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
      }}
    >
      <BaseStack.Navigator>
        <BaseStack.Group screenOptions={{ animation: 'slide_from_right' }}>
          <BaseStack.Screen
            name={Routes.ROOT}
            component={TabNavigator}
            options={({ navigation, route }) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => (
                <Horizontal>
                  <LibraryHeaderRight />
                  <Icon
                    onPress={() => navigation.navigate(Routes.SETTINGS)}
                    name="settings"
                    color={theme.colors.black}
                  />
                </Horizontal>
              )
            })}
          />
          <BaseStack.Screen
            name={Routes.SETTINGS}
            component={SettingsScreen}
            options={{
              headerBackTitle: '',
              title: 'Settings'
            }}
          />
          <BaseStack.Screen
            name={Routes.PLAYLIST_VIEW}
            component={PlaylistViewScreen}
            options={() => ({
              headerTitle: '',
              headerBackTitle: '',
              title: ''
            })}
          />
        </BaseStack.Group>
        <BaseStack.Group
          screenOptions={{
            presentation: 'modal',
            animation: 'slide_from_right'
          }}
        >
          <BaseStack.Screen
            name={Routes.COLOR_SCHEME}
            component={ColorSchemeModal}
            options={({ navigation: { goBack } }) => ({
              headerRight: () => <Icon name="close" onPress={() => goBack()} />,
              headerTitle: 'Color scheme'
            })}
          />
          <BaseStack.Screen
            name={Routes.PLAYLIST_CREATE}
            component={PlaylistCreateModal}
            options={{
              headerTitle: '',
              title: '',
              headerShown: Platform.OS === 'android'
            }}
          />
          <BaseStack.Screen
            name={Routes.PLAYER}
            component={PlayerModal}
            options={({
              navigation: { goBack },
              route: {
                params: { playlist }
              }
            }) => ({
              headerRight: () => <Icon name="close" onPress={() => goBack()} />,
              contentStyle: {
                paddingTop: playlist?.title ? 0 : 16
              },
              title: playlist?.title ?? ''
            })}
          />
        </BaseStack.Group>
      </BaseStack.Navigator>
    </NavigationContainer>
  );
};
