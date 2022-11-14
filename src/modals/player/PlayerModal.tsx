import React, { FC, useEffect } from 'react';
import { ScreenContainer, TrackView } from '../../ui';
import { usePlayerControls } from '../../services';
import TrackPlayer, { Track } from 'react-native-track-player';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';

export type PlayerModalProps = {
  tracks: Track[];
  position?: number;
  playlist?: {
    title: string;
  };
};

export const PlayerModal: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYER>
> = ({
  route: {
    params: { tracks, position = 0 }
  }
}) => {
  const { controlsProps, currentTrack, setQueue } = usePlayerControls();

  useEffect(() => {
    const addTracks = async () => {
      setQueue(tracks);
      await TrackPlayer.add(tracks);

      if (position > 0) {
        await TrackPlayer.skip(position);
      }
    };

    addTracks();

    return () => {
      TrackPlayer.reset();
    };
  }, [position, setQueue, tracks]);

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
