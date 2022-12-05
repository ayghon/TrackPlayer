import { AddTracksButton } from './components/AddTracksButton';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { FloatingPlayButton } from './components/FloatingPlayButton';
import { Horizontal, ScreenContainer, TrackItem } from '../../ui';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { PlaylistArtwork } from './components/PlaylistArtwork';
import { Text, makeStyles } from '@rneui/themed';
import { Track } from 'react-native-track-player';
import { useTranslation } from 'react-i18next';
import DocumentPicker, {
  pickSingle,
  types
} from 'react-native-document-picker';
import React, { FC } from 'react';

export type PlaylistViewScreenProps = { playlist: Playlist };

export const PlaylistViewScreen: FC<
  RootStackScreenProps<Routes.PLAYLIST_VIEW>
> = ({
  navigation: { navigate },
  route: {
    params: { playlist }
  }
}) => {
  const { tracks, title, artwork } = playlist;
  const { t } = useTranslation();
  const styles = useStyles();
  const { editPlaylist } = usePlaylistsState();

  const navigateToPlayer = (args?: { index?: number; position?: number }) => {
    const { index, position } = args || {};

    navigate(Routes.PLAYER, {
      autoPlay: true,
      index,
      playlist,
      position,
      tracks
    });
  };

  const changeArtworkHandler = async () => {
    const newArtWork = await pickSingle({ type: [types.images] }).catch(
      (error) => {
        if (DocumentPicker.isCancel(error)) {
          return null;
        } else {
          Alert.alert(t(i18nKeys.errors.unexpected.try_again));
        }
      }
    );

    if (newArtWork) {
      const newList = await editPlaylist(playlist.id, {
        artwork: newArtWork.uri
      });

      navigate(Routes.PLAYLIST_VIEW, {
        playlist:
          newList.find((item) => item.title === playlist.title) || playlist
      });
    }
  };

  return (
    <ScreenContainer>
      <PlaylistArtwork artwork={artwork} onPress={changeArtworkHandler} />
      <Horizontal alignCenter style={styles.playlistTitleSection}>
        <Text style={styles.playlistTitle}>{title}</Text>
        <FloatingPlayButton
          isVisible={tracks.length > 0}
          onPress={() => navigateToPlayer()}
        />
      </Horizontal>
      <AddTracksButton
        onPress={() => navigate(Routes.PLAYLIST_TRACKS_SELECTION, { playlist })}
        style={styles.button}
      />
      <FlatList<Track>
        data={tracks}
        keyExtractor={({ url }) => url.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigateToPlayer({ index })}
            style={styles.trackButton}
          >
            <TrackItem {...item} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: 16
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  playlistTitleSection: {
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%'
  },
  trackButton: {
    marginBottom: 16,
    paddingVertical: 4
  },
  trackList: {
    height: '100%',
    justifyContent: 'space-between'
  }
}));
