import { Button, FlatList, Pressable } from 'native-base';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  i18nKeys,
  tracksMocks,
  usePlaylistsState
} from '../../services';
import { ScreenContainer, TrackItem } from '../../ui';
import { Track } from 'react-native-track-player';
import { isIOS } from '../../utils';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';

export type PlaylistTracksSelectionModalProps = {
  playlist: Playlist;
};

export const PlaylistTracksSelectionModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_TRACKS_SELECTION>
> = ({
  navigation: { navigate, goBack },
  route: {
    params: { playlist }
  }
}) => {
  const { t } = useTranslation();
  const [selectedTracks, setSelectedTracks] = useState<Track[]>(
    playlist?.tracks ?? []
  );
  const { editPlaylist } = usePlaylistsState();

  const getIsSelected = (trackId: string) =>
    !!selectedTracks.find((item) => item.title === trackId);

  const onModalClose = async () => {
    if (
      selectedTracks.filter((selected) =>
        playlist.tracks.map(
          (initialTrack) => initialTrack.title !== selected.title
        )
      ).length > 0
    ) {
      const newList = await editPlaylist(playlist.id, {
        count: selectedTracks.length,
        tracks: selectedTracks
      });
      navigate(Routes.PLAYLIST_VIEW, {
        playlist:
          newList.find((item) => item.title === playlist.title) || playlist
      });
    } else {
      goBack();
    }
  };

  return (
    <ScreenContainer hasCloseButton={isIOS} onClose={goBack}>
      <FlatList<Track>
        data={tracksMocks}
        keyExtractor={(i) => i.title || i.url.toString()}
        renderItem={({ item }) => (
          <Pressable
            marginBottom={4}
            onPress={() => {
              if (
                selectedTracks.find(
                  (selectedTrack) => selectedTrack.title === item.title
                )
              ) {
                setSelectedTracks((state) =>
                  state.filter((i) => i.title !== item.title)
                );
              } else {
                setSelectedTracks((state) => [...state, item]);
              }
            }}
            opacity={item.title && getIsSelected(item.title) ? 0.5 : undefined}
            paddingY={1}
          >
            <TrackItem {...item} />
          </Pressable>
        )}
      />
      <Button marginTop={2} onPress={onModalClose}>
        {t(i18nKeys.screens.playlist.button.add_tracks)}
      </Button>
    </ScreenContainer>
  );
};
