import React, { FC, useEffect } from 'react';
import { ScreenContainer, TrackView } from '../../ui';
import { usePlayerControls } from '../../services';
import TrackPlayer, { Track } from 'react-native-track-player';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';

export type PlayerScreenProps = {
  tracks: Track[];
};

export const PlayerScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.PLAYER>
> = ({
  route: {
    params: { tracks }
  }
}) => {
  const { controlsProps, currentTrack, setQueue } = usePlayerControls();

  useEffect(() => {
    const addTracks = async () => {
      setQueue(tracks);
      await TrackPlayer.add(tracks);
    };

    addTracks();

    return () => {
      TrackPlayer.reset();
    };
  }, [setQueue, tracks]);

  return (
    <ScreenContainer>
      {/*<Button title="Add tracks" onPress={addTracks} />*/}
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
