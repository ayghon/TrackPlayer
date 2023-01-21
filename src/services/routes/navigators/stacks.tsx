import { BackButton } from '../components/buttons/BackButton';
import {
  ColorSchemeCreateModal,
  ColorSchemeModal,
  LanguageModal,
  PlayerModal,
  PlaylistCreateModal,
  PlaylistSettingsModal,
  PlaylistTracksSelectionModal
} from '../../../modals';
import { IOSCloseButton } from '../components/buttons/IOSCloseButton';
import { NavigationContainer } from '@react-navigation/native';
import { PlaylistViewScreen, SettingsScreen } from '../../../screens';
import { PlaylistsProvider } from '../../playlists';
import { RootStackParamList, Routes } from '../routes.types';
import { SettingsButton } from '../components/buttons/SettingsButton';
import { TabNavigator } from './tabs';
import { ThemeMode } from '../../../ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  getHeaderTitle,
  playerModalOptions,
  playlistViewOptions
} from '../routes.utils';
import { i18nKeys } from '../../i18n';
import { isAndroid } from '../../../utils';
import { useColorMode, useTheme } from 'native-base';
import { useInitStorage } from '../../storage/init-storage.hooks';
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
        dark: colorMode === ThemeMode.DARK
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
                headerBackTitleVisible: false,
                headerLeft: BackButton,
                title: t(i18nKeys.routes.stacks.settings.title)
              }}
            />
            <BaseStack.Screen
              component={PlaylistViewScreen}
              name={Routes.PLAYLIST_VIEW}
              options={(props) => ({
                headerBackTitle: '',
                headerLeft: BackButton,
                headerTitle: '',
                title: '',
                ...playlistViewOptions(props)
              })}
            />
          </BaseStack.Group>
          {/* ***************************
           *                            *
           *           MODALS           *
           *                            *
           *************************** */}
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
                headerLeft: isAndroid ? BackButton : undefined,
                headerRight: IOSCloseButton,
                headerTitle: t(i18nKeys.routes.modals.color_scheme.header_title)
              }}
            />
            <BaseStack.Screen
              component={ColorSchemeCreateModal}
              name={Routes.COLOR_SCHEME_CREATE}
              options={{
                headerLeft: isAndroid ? BackButton : undefined,
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
                headerLeft: isAndroid ? BackButton : undefined,
                headerRight: IOSCloseButton,
                headerTitle: t(i18nKeys.routes.modals.language.header_title)
              }}
            />
            <BaseStack.Screen
              component={PlaylistCreateModal}
              name={Routes.PLAYLIST_CREATE}
              options={{
                headerLeft: isAndroid ? BackButton : undefined,
                headerShown: isAndroid,
                headerTitle: '',
                title: ''
              }}
            />
            <BaseStack.Screen
              component={PlayerModal}
              name={Routes.PLAYER}
              options={playerModalOptions}
            />
            <BaseStack.Screen
              component={PlaylistSettingsModal}
              name={Routes.PLAYLIST_SETTINGS}
              options={{
                headerShown: false,
                title: ''
              }}
            />
            <BaseStack.Screen
              component={PlaylistTracksSelectionModal}
              name={Routes.PLAYLIST_TRACKS_SELECTION}
              options={{
                headerLeft: BackButton,
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
