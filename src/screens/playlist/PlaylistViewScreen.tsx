import { AddTracksButton } from './components/AddTracksButton';
import { Alert } from 'react-native';
import { FlatList, Pressable, Row, Text } from 'native-base';
import { FloatingPlayButton } from './components/FloatingPlayButton';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  usePlaylistsState
} from '../../services';
import { PlaylistArtwork } from './components/PlaylistArtwork';
import { ScreenContainer, TrackItem } from '../../ui';
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
      <Row
        alignItems="center"
        justifyContent="space-between"
        marginBottom={4}
        width="100%"
      >
        <Text variant="title">{title}</Text>
        <FloatingPlayButton
          isVisible={tracks.length > 0}
          onPress={() => navigateToPlayer()}
        />
      </Row>
      <AddTracksButton
        onPress={() => navigate(Routes.PLAYLIST_TRACKS_SELECTION, { playlist })}
      />
      <FlatList<Track>
        data={tracks}
        keyExtractor={({ url }) => url.toString()}
        marginTop={4}
        renderItem={({ item, index }) => (
          <Pressable marginY={2} onPress={() => navigateToPlayer({ index })}>
            <TrackItem {...item} />
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
};
