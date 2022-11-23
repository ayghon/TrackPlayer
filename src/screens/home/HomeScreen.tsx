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
  usePlaylists
} from '../../services';
import { Text, makeStyles } from '@rneui/themed';
import React, { FC } from 'react';

export const HomeScreen: FC<RootStackScreenProps<Routes.HOME>> = ({
  navigation: { navigate }
}) => {
  const styles = useStyles();
  const { playlists } = usePlaylists();

  return (
    <ScreenContainer>
      <Text style={styles.recentlyPlayed}>Recently played</Text>
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
