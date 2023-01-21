import { Column } from 'native-base';
import { DeviceEventEmitter } from 'react-native';
import { LayoutVariant, PlaylistItem, ScreenContainer } from '../../ui';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  StorageEvent,
  i18nKeys,
  transformRecentlyPlayedIdsToPlaylists,
  usePlaylistsState,
  useRecentlyPlayed
} from '../../services';
import { Section } from './components/Section';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import React, { FC, useCallback, useEffect, useState } from 'react';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: { navigate }
}) => {
  const { t } = useTranslation();
  const {
    playlists,
    getPinnedPlaylists,
    isLoading: isLoadingPlaylists
  } = usePlaylistsState();
  const { recentlyPlayed, isLoading } = useRecentlyPlayed();
  const [recentlyPlayedList, setRecentlyPlayedList] = useState<Playlist[]>([]);
  const [pinnedList, setPinnedList] = useState<Playlist[]>([]);

  // set list with storage values of recently played items
  useEffect(() => {
    if (recentlyPlayedList.length === 0 && !isLoading) {
      setRecentlyPlayedList(recentlyPlayed);
    }
  }, [isLoading, recentlyPlayedList.length, recentlyPlayed]);

  // set list with storage values of pinned items
  useFocusEffect(
    useCallback(() => {
      if (!isLoadingPlaylists) {
        getPinnedPlaylists().then((list) => setPinnedList(list));
      }
    }, [getPinnedPlaylists, isLoadingPlaylists])
  );

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      StorageEvent.CLEAR_CACHE,
      () => setRecentlyPlayedList([])
    );

    return () => listener.remove();
  }, []);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      StorageEvent.RECENTLY_PLAYED_UPDATED,
      (values) => {
        const playlistItems = transformRecentlyPlayedIdsToPlaylists(
          playlists,
          values
        );

        setRecentlyPlayedList(playlistItems);
      }
    );

    return () => listener.remove();
  }, [playlists]);

  return (
    <ScreenContainer>
      <Column space="xl">
        <Section<Playlist>
          keyExtractor={({ id }) => id}
          list={recentlyPlayedList}
          renderItem={({ item }) => (
            <PlaylistItem
              artwork={item.artwork}
              onPress={() =>
                navigate(Routes.PLAYLIST_VIEW, { playlistId: item.id })
              }
              title={item.title}
              trackCount={item.count}
              variant={LayoutVariant.GRID}
            />
          )}
          title={t(i18nKeys.screens.home.section.recently_played.title)}
        />
        <Section<Playlist>
          keyExtractor={({ id }) => id}
          list={pinnedList}
          renderItem={({ item }) => (
            <PlaylistItem
              artwork={item.artwork}
              onPress={() =>
                navigate(Routes.PLAYLIST_VIEW, { playlistId: item.id })
              }
              title={item.title}
              trackCount={item.count}
              variant={LayoutVariant.GRID}
            />
          )}
          title={t(i18nKeys.screens.home.section.pinned_playlists.title)}
        />
      </Column>
    </ScreenContainer>
  );
};
