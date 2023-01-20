import {
  Carousel,
  LayoutVariant,
  PlaylistItem,
  ScreenContainer
} from '../../ui';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: { navigate }
}) => {
  const { t } = useTranslation();
  const { playlists } = usePlaylistsState();

  return (
    <ScreenContainer>
      <Text marginBottom={2} variant="title">
        {t(i18nKeys.screens.home.section.recently_played.title)}
      </Text>
      <Carousel<Playlist>
        data={playlists.slice(0, 3)}
        initialNumToRender={3}
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
