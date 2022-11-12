import React from 'react';
import { ScreenContainer, TrackView } from '../../ui';
import TrackPlayer from 'react-native-track-player';
import { Button } from '@rneui/base';
import { trackList, useInitPlayer, usePlayerControls } from '../../services';

export const PlayerScreen = () => {
  useInitPlayer();

  const { controlsProps, currentTrack, setQueue } = usePlayerControls();

  const addTracks = async () => {
    setQueue(trackList);
    await TrackPlayer.add(trackList);
  };

  return (
    <ScreenContainer>
      <Button title="Add tracks" onPress={addTracks} />
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
