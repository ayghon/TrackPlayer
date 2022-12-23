import {
  ColorSchemeCreateModal,
  ColorSchemeModal,
  LanguageModal,
  PlayerModal,
  PlaylistCreateModal,
  PlaylistSettingsModal,
  PlaylistTracksSelectionModal
} from '../../modals';
import { IOSCloseButton } from './components/IOSCloseButton';
import { NavigationContainer } from '@react-navigation/native';
import { PlaylistSettingsButton } from './components/PlaylistSettingsButton';
import { PlaylistViewScreen, SettingsScreen } from '../../screens';
import { PlaylistsProvider } from '../playlists';
import { RootStackParamList, Routes } from './routes.types';
import { SettingsButton } from './components/SettingsButton';
import { TabNavigator } from './tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from './routes.utils';
import { i18nKeys } from '../i18n';
import { isAndroid } from '../../utils';
import { useColorMode, useTheme } from 'native-base';
import { useInitStorage } from '../storage/init-storage.hooks';
import { useTranslation } from 'react-i18next';
import React from 'react';

const BaseStack = createNativeStackNavigator<RootStackParamList>();

export const BaseStackNavigation = () => {
  const { t } = useTranslation();
  useInitStorage();
  const { colorMode } = useColorMode();
  const {
    colors: { primary, secondary, text }
  } = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: primary.normal,
          border: primary.light,
          card: primary.normal,
          notification: secondary.dark,
          primary: text.primary,
          text: text.primary
        },
        dark: colorMode === 'dark'
      }}
    >
      <PlaylistsProvider>
        <BaseStack.Navigator>
          <BaseStack.Group screenOptions={{ animation: 'slide_from_right' }}>
            <BaseStack.Screen
              component={TabNavigator}
              name={Routes.ROOT}
              options={({ route }) => ({
                headerRight: SettingsButton,
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
                route: {
                  params: { playlist }
                }
              }) => ({
                headerBackTitle: '',
                headerRight: () => (
                  <PlaylistSettingsButton playlist={playlist} />
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
              options={{
                headerRight: IOSCloseButton,
                headerTitle: t(i18nKeys.routes.modals.color_scheme.header_title)
              }}
            />
            <BaseStack.Screen
              component={ColorSchemeCreateModal}
              name={Routes.COLOR_SCHEME_CREATE}
              options={{
                headerRight: IOSCloseButton,
                headerTitle: t(
                  i18nKeys.routes.modals.color_scheme_create.header_title
                ),
                presentation: 'fullScreenModal'
              }}
            />
            <BaseStack.Screen
              component={LanguageModal}
              name={Routes.LANGUAGE}
              options={{
                headerRight: IOSCloseButton,
                headerTitle: t(i18nKeys.routes.modals.language.header_title)
              }}
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
                route: {
                  params: { playlist }
                }
              }) => ({
                contentStyle: {
                  paddingTop: playlist?.title ? 0 : 16
                },
                headerRight: IOSCloseButton,
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
