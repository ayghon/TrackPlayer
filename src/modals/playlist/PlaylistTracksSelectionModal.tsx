import { Button, FlatList, Pressable } from 'native-base';
import {
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
  playlistId: string;
};

export const PlaylistTracksSelectionModal: FC<
  RootStackScreenProps<Routes.PLAYLIST_TRACKS_SELECTION>
> = ({
  navigation: { navigate, goBack },
  route: {
    params: { playlistId }
  }
}) => {
  const { t } = useTranslation();
  const { getPlaylist } = usePlaylistsState();
  const playlist = getPlaylist(playlistId);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>(
    playlist?.tracks ?? []
  );
  const { editPlaylist } = usePlaylistsState();

  const getIsSelected = (trackId: string) =>
    !!selectedTracks.find((item) => item.title === trackId);

  const onModalClose = async () => {
    if (!playlist) {
      goBack();
      return null;
    }

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
        playlistId:
          newList.find((item) => item.id === playlist.id)?.id ?? playlist.id
      });
    } else {
      goBack();
    }
  };

  const selectItemHandler = (item: Track) => {
    if (
      selectedTracks.find((selectedTrack) => selectedTrack.title === item.title)
    ) {
      setSelectedTracks((state) => state.filter((i) => i.title !== item.title));
    } else {
      setSelectedTracks((state) => [...state, item]);
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
            onPress={() => selectItemHandler(item)}
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
