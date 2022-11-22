import { Horizontal, Image, ScreenContainer, TrackItem } from '../../ui';
import { FlatList, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Playlist, RootStackParamList, Routes } from '../../services';
import { FAB, Icon, makeStyles, Text, useTheme } from '@rneui/themed';
import { AddTracksButton } from './components/AddTracksButton';
import { Track } from 'react-native-track-player';

export type PlaylistViewScreenProps = { playlist: Playlist };

export const PlaylistViewScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYLIST_VIEW>
> = ({
  navigation: { navigate },
  route: {
    params: { playlist }
  }
}) => {
  const { tracks, title, artwork } = playlist;
  const styles = useStyles();
  const { theme } = useTheme();

  const navigateToPlayer = (position?: number) => {
    navigate(Routes.PLAYER, { tracks, position, playlist: { title } });
  };

  return (
    <ScreenContainer>
      <Image
        containerStyle={styles.image}
        source={artwork ? { uri: artwork } : undefined}
      />
      <Horizontal alignCenter style={styles.playlistTitleSection}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <FAB
          onPress={() => navigateToPlayer()}
          buttonStyle={styles.fab}
          icon={<Icon name="play-arrow" color={theme.colors.white} size={32} />}
          visible={tracks.length > 0}
        />
      </Horizontal>
      <AddTracksButton
        onPress={() => navigate(Routes.PLAYLIST_TRACKS_SELECTION, { playlist })}
        style={styles.button}
      />
      <FlatList<Track>
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={tracks}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => navigateToPlayer(index)}
          >
            <TrackItem {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(t) => t.title || t.url.toString()}
      />
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  trackButton: {
    paddingVertical: 4,
    marginBottom: 16
  },
  trackList: {
    justifyContent: 'space-between',
    height: '100%'
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginVertical: 16,
    backgroundColor: theme.colors.white
  },
  playlistTitleSection: {
    marginBottom: 16,
    width: '100%',
    justifyContent: 'space-between'
  },
  playlistTitle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  button: {
    marginBottom: 16
  },
  fab: { margin: 0, padding: 0 }
}));
