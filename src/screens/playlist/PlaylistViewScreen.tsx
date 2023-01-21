import { AddTracksButton } from './components/AddTracksButton';
import { Alert } from 'react-native';
import { FlatList, Pressable, Row, Text } from 'native-base';
import { FloatingPlayButton } from './components/FloatingPlayButton';
import { PlaylistArtwork } from './components/PlaylistArtwork';
import {
  RootStackScreenProps,
  Routes,
  i18nKeys,
  updateRecentlyPlayed,
  usePlayerState,
  usePlaylistsState,
  useQueueTracks
} from '../../services';
import { ScreenContainer, TrackItem } from '../../ui';
import { Track } from 'react-native-track-player';
import { useTranslation } from 'react-i18next';
import DocumentPicker, {
  pickSingle,
  types
} from 'react-native-document-picker';
import React, { FC } from 'react';

export type PlaylistViewScreenProps = { playlistId: string };

export const PlaylistViewScreen: FC<
  RootStackScreenProps<Routes.PLAYLIST_VIEW>
> = ({
  navigation: { navigate, goBack },
  route: {
    params: { playlistId }
  }
}) => {
  const { t } = useTranslation();
  const { editPlaylist, getPlaylist } = usePlaylistsState();
  const { queueTracks } = useQueueTracks(playlistId);
  const playlist = getPlaylist(playlistId);
  const { currentTrack, playlist: { id: currentPlaylistId } = {} } =
    usePlayerState();

  if (!playlist) {
    goBack();
    return null;
  }

  const { tracks, title, artwork } = playlist;

  const navigateToPlayer = async (args?: {
    index?: number;
    position?: number;
  }) => {
    const { index, position } = args || {};

    await updateRecentlyPlayed(playlist.id);
    await queueTracks({ autoPlay: true, index, position, tracks });
    navigate(Routes.PLAYER, {
      playlistId: playlist.id
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
        playlistId:
          newList.find((item) => item.id === playlist.id)?.id ?? playlistId
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
        onPress={() =>
          navigate(Routes.PLAYLIST_TRACKS_SELECTION, {
            playlistId: playlist.id
          })
        }
      />
      <FlatList<Track>
        data={tracks}
        keyExtractor={({ url }) => url.toString()}
        renderItem={({ item, index }) => (
          <Pressable marginY={2} onPress={() => navigateToPlayer({ index })}>
            <TrackItem
              active={
                currentPlaylistId === playlistId &&
                currentTrack?.title === item.title
              }
              {...item}
            />
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
};
