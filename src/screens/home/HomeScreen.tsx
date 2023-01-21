import {
  Carousel,
  LayoutVariant,
  PlaylistItem,
  ScreenContainer
} from '../../ui';
import { DeviceEventEmitter } from 'react-native';
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
import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import React, { FC, useEffect, useState } from 'react';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: { navigate }
}) => {
  const { t } = useTranslation();
  const { playlists } = usePlaylistsState();
  const { recentlyPlayed, isLoading } = useRecentlyPlayed();
  const [list, setList] = useState<Playlist[]>([]);

  // set list with storage values of recently played items
  useEffect(() => {
    if (list.length === 0 && !isLoading) {
      setList(recentlyPlayed);
    }
  }, [isLoading, list.length, recentlyPlayed]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      StorageEvent.CLEAR_CACHE,
      () => setList([])
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

        setList(playlistItems);
      }
    );

    return () => listener.remove();
  }, [playlists]);

  return (
    <ScreenContainer>
      <Text marginBottom={2} variant="title">
        {t(i18nKeys.screens.home.section.recently_played.title)}
      </Text>
      <Carousel<Playlist>
        data={list}
        keyExtractor={({ title }) => title}
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
      />
    </ScreenContainer>
  );
};
