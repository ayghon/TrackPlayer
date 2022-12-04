import { ActivityIndicator } from 'react-native';
import {
  Playlist,
  RootStackScreenProps,
  Routes,
  usePlayerState
} from '../../services';
import { ScreenContainer, TrackView } from '../../ui';
import React, { FC, useEffect } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';

export type PlayerModalProps = {
  tracks?: Track[];
  position?: number;
  index?: number;
  playlist?: Playlist;
  continueCurrent?: boolean;
  autoPlay?: boolean;
};

export const PlayerModal: FC<RootStackScreenProps<Routes.PLAYER>> = ({
  route: {
    params: {
      continueCurrent = false,
      autoPlay = true,
      tracks,
      position = 0,
      index = 0,
      playlist
    }
  }
}) => {
  const { controls, currentTrack, setQueue, setPlaylist, queue } =
    usePlayerState();

  useEffect(() => {
    const addTracks = async () => {
      if (playlist && setPlaylist) {
        setPlaylist(playlist);
      }

      if (!continueCurrent && tracks) {
        setQueue(tracks);

        // clean previous queue
        await TrackPlayer.reset();
        // create new queue
        await TrackPlayer.add(tracks);

        if (index >= 0) {
          await TrackPlayer.skip(index);
        }

        if (position > 0) {
          await TrackPlayer.seekTo(position);
        }

        if (autoPlay) {
          await TrackPlayer.play();
        }
      }
    };

    addTracks();
  }, [
    autoPlay,
    continueCurrent,
    index,
    playlist,
    position,
    setPlaylist,
    setQueue,
    tracks
  ]);

  if (!currentTrack || queue.length === 0) {
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <TrackView
        artist={currentTrack.artist}
        artwork={currentTrack?.artwork as string}
        controlsProps={controls}
        title={currentTrack.title}
      />
    </ScreenContainer>
  );
};
