import { ScreenContainer, TrackItem } from '../../ui';
import React, { FC, useState } from 'react';
import {
  Playlist,
  RootStackParamList,
  Routes,
  tracksMocks,
  usePlaylists
} from '../../services';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Platform, TouchableOpacity, View } from 'react-native';
import { Track } from 'react-native-track-player';
import { makeStyles } from '@rneui/themed';

export type PlaylistTracksSelectionModalProps = {
  playlist: Playlist;
};

export const PlaylistTracksSelectionModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYLIST_TRACKS_SELECTION>
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
  const { editPlaylist } = usePlaylists();

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
        tracks: selectedTracks,
        count: selectedTracks.length
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
    <ScreenContainer
      hasCloseButton={Platform.OS === 'ios'}
      onClose={onModalClose}
    >
      <View>
        <FlatList<Track>
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={tracksMocks}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.trackButton,
                item.title ? getSelectedStyle(item.title) : undefined
              ]}
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
            >
              <TrackItem {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(t) => t.title || t.url.toString()}
        />
      </View>
    </ScreenContainer>
  );
};

const useStyles = makeStyles({
  trackButton: {
    paddingVertical: 4,
    marginBottom: 16
  },
  selectedTrack: {
    opacity: 0.5
  }
});
