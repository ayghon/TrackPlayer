import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
import { RootStackParamList, Routes } from '../routes.types';
import { TrackView } from '../../../ui';
import { usePlayerState } from '../../player';
import React from 'react';

export const FloatingPlayer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { controls, currentTrack, queue, playlist } = usePlayerState();

  if (!currentTrack || queue.length === 0) {
    return null;
  }

  const playerPressHandler = () =>
    navigate(Routes.PLAYER, {
      continueCurrent: true,
      playlist
    });

  return (
    <Pressable onPress={playerPressHandler}>
      <TrackView
        artist={currentTrack.artist}
        artwork={
          typeof currentTrack.artwork === 'string'
            ? currentTrack.artwork
            : undefined
        }
        controlsProps={controls}
        minimal
        title={currentTrack.title}
      />
    </Pressable>
  );
};
