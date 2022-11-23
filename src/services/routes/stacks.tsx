import {
  ColorSchemeModal,
  PlayerModal,
  PlaylistCreateModal,
  PlaylistSettingsModal,
  PlaylistTracksSelectionModal
} from '../../modals';
import { Horizontal } from '../../ui';
import { Icon, useTheme } from '@rneui/themed';
import { LibraryHeaderRight } from './components/LibraryHeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import { PlaylistViewScreen, SettingsScreen } from '../../screens';
import { RootStackParamList, Routes } from './routes.types';
import { TabNavigator } from './tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from './routes.utils';
import { useInitStorage } from '../storage/storage.utils';
import React from 'react';

const BaseStack = createNativeStackNavigator<RootStackParamList>();

export const BaseStackNavigation = () => {
  useInitStorage();
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.colors.background,
          border: theme.colors.background,
          card: theme.colors.background,
          notification: theme.colors.secondary,
          primary: theme.colors.black,
          text: theme.colors.black
        },
        dark: theme.mode === 'dark'
      }}
    >
      <BaseStack.Navigator>
        <BaseStack.Group screenOptions={{ animation: 'slide_from_right' }}>
          <BaseStack.Screen
            component={TabNavigator}
            name={Routes.ROOT}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <Horizontal>
                  <LibraryHeaderRight />
                  <Icon
                    color={theme.colors.black}
                    name="settings"
                    onPress={() => navigation.navigate(Routes.SETTINGS)}
                  />
                </Horizontal>
              ),
              headerTitle: getHeaderTitle(route)
            })}
          />
          <BaseStack.Screen
            component={SettingsScreen}
            name={Routes.SETTINGS}
            options={{
              headerBackTitle: '',
              title: 'Settings'
            }}
          />
          <BaseStack.Screen
            component={PlaylistViewScreen}
            name={Routes.PLAYLIST_VIEW}
            options={({
              navigation: { navigate },
              route: {
                params: { playlist }
              }
            }) => ({
              headerBackTitle: '',
              headerRight: () => (
                <Icon
                  name="more-vert"
                  onPress={() =>
                    navigate(Routes.PLAYLIST_SETTINGS, {
                      playlist
                    })
                  }
                />
              ),
              headerTitle: '',
              title: ''
            })}
          />
        </BaseStack.Group>
        <BaseStack.Group
          screenOptions={{
            animation: 'slide_from_right',
            presentation: 'modal'
          }}
        >
          <BaseStack.Screen
            component={ColorSchemeModal}
            name={Routes.COLOR_SCHEME}
            options={({ navigation: { goBack } }) => ({
              headerRight: () => <Icon name="close" onPress={() => goBack()} />,
              headerTitle: 'Color scheme'
            })}
          />
          <BaseStack.Screen
            component={PlaylistCreateModal}
            name={Routes.PLAYLIST_CREATE}
            options={{
              headerShown: Platform.OS === 'android',
              headerTitle: '',
              title: ''
            }}
          />
          <BaseStack.Screen
            component={PlayerModal}
            name={Routes.PLAYER}
            options={({
              navigation: { goBack },
              route: {
                params: { playlist }
              }
            }) => ({
              contentStyle: {
                paddingTop: playlist?.title ? 0 : 16
              },
              headerRight: () => <Icon name="close" onPress={() => goBack()} />,
              title: playlist?.title ?? ''
            })}
          />
          <BaseStack.Screen
            component={PlaylistSettingsModal}
            name={Routes.PLAYLIST_SETTINGS}
            options={{
              headerShown: Platform.OS === 'android',
              headerTitle: '',
              title: ''
            }}
          />
          <BaseStack.Screen
            component={PlaylistTracksSelectionModal}
            name={Routes.PLAYLIST_TRACKS_SELECTION}
            options={{
              headerShown: Platform.OS === 'android',
              headerTitle: '',
              title: ''
            }}
          />
        </BaseStack.Group>
      </BaseStack.Navigator>
    </NavigationContainer>
  );
};
