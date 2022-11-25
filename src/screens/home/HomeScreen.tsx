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
  usePlaylists
} from '../../services';
import { Text, makeStyles } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: { navigate }
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { playlists } = usePlaylists();

  return (
    <ScreenContainer>
      <Text style={styles.recentlyPlayed}>
        {t(i18nKeys.screens.home.section.recently_played.title)}
      </Text>
      <Carousel<Playlist>
        data={playlists.slice(0, 3)}
        enableGradient={false}
        initialNumToRender={3}
        keyExtractor={({ title }) => title}
        renderItem={({ item }) => (
          <PlaylistItem
            artwork={item.artwork}
            onPress={() => navigate(Routes.PLAYLIST_VIEW, { playlist: item })}
            title={item.title}
            trackCount={item.count}
            variant={LayoutVariant.GRID}
          />
        )}
      />
    </ScreenContainer>
  );
};

const useStyles = makeStyles({
  recentlyPlayed: { fontSize: 16, fontWeight: '600', marginBottom: 8 }
});
