import { FlatList, TouchableOpacity, View } from 'react-native';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  tracksMocks,
  usePlaylistsState
} from '../../services';
import { ScreenContainer, TrackItem } from '../../ui';
import { Track } from 'react-native-track-player';
import { isIOS } from '../../utils';
import { makeStyles } from '@rneui/themed';
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
  const styles = useStyles();
  const [selectedTracks, setSelectedTracks] = useState<Track[]>(
    playlist?.tracks ?? []
  );
  const { editPlaylist } = usePlaylistsState();

  const getSelectedStyle = (trackId: string) => {
    return selectedTracks.find((item) => item.title === trackId)
      ? styles.selectedTrack
      : undefined;
  };

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
    <ScreenContainer hasCloseButton={isIOS} onClose={onModalClose}>
      <View>
        <FlatList<Track>
          data={tracksMocks}
          keyExtractor={(t) => t.title || t.url.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
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
              style={[
                styles.trackButton,
                item.title ? getSelectedStyle(item.title) : undefined
              ]}
            >
              <TrackItem {...item} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles({
  selectedTrack: {
    opacity: 0.5
  },
  trackButton: {
    marginBottom: 16,
    paddingVertical: 4
  }
});
