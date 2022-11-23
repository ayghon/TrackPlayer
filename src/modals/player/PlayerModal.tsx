import React, { FC, useEffect } from 'react';
import { ScreenContainer, TrackView } from '../../ui';
import {
  Playlist,
  RootStackParamList,
  Routes,
  usePlayerState
} from '../../services';
import TrackPlayer, { Track } from 'react-native-track-player';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PlayerModalProps = {
  tracks: Track[];
  position?: number;
  playlist?: Playlist;
};

export const PlayerModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYER>
> = ({
  route: {
    params: { tracks, position = 0, playlist }
  }
}) => {
  const { controlsProps, currentTrack, setQueue, setPlaylist } =
    usePlayerState();

  useEffect(() => {
    const addTracks = async () => {
      setQueue(tracks);
      if (playlist && setPlaylist) {
        setPlaylist(playlist);
      }

      await TrackPlayer.add(tracks);

      if (position > 0) {
        await TrackPlayer.skip(position);
      }
    };

    addTracks();
  }, [playlist, position, setPlaylist, setQueue, tracks]);

  return (
    <ScreenContainer>
      {currentTrack && (
        <TrackView
          artwork={currentTrack?.artwork as string}
          artist={currentTrack.artist}
          title={currentTrack.title}
          controlsProps={controlsProps}
        />
      )}
    </ScreenContainer>
  );
};
