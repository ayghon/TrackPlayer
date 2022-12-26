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
  tracks: Track[];
  position?: number;
  playlist?: Playlist;
};

export const PlayerModal: FC<RootStackScreenProps<Routes.PLAYER>> = ({
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
          artist={currentTrack.artist}
          artwork={currentTrack?.artwork as string}
          controlsProps={controlsProps}
          title={currentTrack.title}
        />
      )}
    </ScreenContainer>
  );
};
