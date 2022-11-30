import {
  ColorSchemeCreateModal,
  ColorSchemeModal,
  LanguageModal,
  PlayerModal,
  PlaylistCreateModal,
  PlaylistSettingsModal,
  PlaylistTracksSelectionModal
} from '../../modals';
import { Horizontal } from '../../ui';
import { Icon, useTheme } from '@rneui/themed';
import { LibraryHeaderRight } from './components/LibraryHeaderRight';
import { NavigationContainer } from '@react-navigation/native';
import { PlaylistViewScreen, SettingsScreen } from '../../screens';
import { PlaylistsProvider } from '../playlists';
import { RootStackParamList, Routes } from './routes.types';
import { TabNavigator } from './tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from './routes.utils';
import { i18nKeys } from '../i18n';
import { isAndroid } from '../../utils';
import { useInitStorage } from '../storage/init-storage.hooks';
import { useTranslation } from 'react-i18next';
import React from 'react';

const BaseStack = createNativeStackNavigator<RootStackParamList>();

export const BaseStackNavigation = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  useInitStorage();

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
      <PlaylistsProvider>
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
                headerTitle: t(getHeaderTitle(route))
              })}
            />
            <BaseStack.Screen
              component={SettingsScreen}
              name={Routes.SETTINGS}
              options={{
                headerBackTitle: '',
                title: t(i18nKeys.routes.stacks.settings.title)
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
                headerRight: () => (
                  <Icon name="close" onPress={() => goBack()} />
                ),
                headerTitle: t(i18nKeys.routes.modals.color_scheme.header_title)
              })}
            />
            <BaseStack.Screen
              component={ColorSchemeCreateModal}
              name={Routes.COLOR_SCHEME_CREATE}
              options={({ navigation: { goBack } }) => ({
                headerRight: () => (
                  <Icon name="close" onPress={() => goBack()} />
                ),
                headerTitle: t(
                  i18nKeys.routes.modals.color_scheme_create.header_title
                ),
                presentation: 'fullScreenModal'
              })}
            />
            <BaseStack.Screen
              component={LanguageModal}
              name={Routes.LANGUAGE}
              options={({ navigation: { goBack } }) => ({
                headerRight: () => (
                  <Icon name="close" onPress={() => goBack()} />
                ),
                headerTitle: t(i18nKeys.routes.modals.language.header_title)
              })}
            />
            <BaseStack.Screen
              component={PlaylistCreateModal}
              name={Routes.PLAYLIST_CREATE}
              options={{
                headerShown: isAndroid,
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
                headerRight: () => (
                  <Icon name="close" onPress={() => goBack()} />
                ),
                title: playlist?.title ?? ''
              })}
            />
            <BaseStack.Screen
              component={PlaylistSettingsModal}
              name={Routes.PLAYLIST_SETTINGS}
              options={{
                headerShown: isAndroid,
                headerTitle: '',
                title: ''
              }}
            />
            <BaseStack.Screen
              component={PlaylistTracksSelectionModal}
              name={Routes.PLAYLIST_TRACKS_SELECTION}
              options={{
                headerShown: isAndroid,
                headerTitle: '',
                title: ''
              }}
            />
          </BaseStack.Group>
        </BaseStack.Navigator>
      </PlaylistsProvider>
    </NavigationContainer>
  );
};
