import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { RootStackParamList, Routes } from '../routes.types';
import { TrackView } from '../../../ui';
import { usePlayerState } from '../../player';
import React from 'react';

export const FloatingPlayer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { controlsProps, currentTrack, queue, playlist } = usePlayerState();

  if (!currentTrack) {
    return null;
  }

  const playerPressHandler = () =>
    navigate(Routes.PLAYER, {
      playlist,
      position: currentTrack?.index,
      tracks: queue
    });

  return (
    <Pressable onPress={playerPressHandler}>
      <TrackView
        artist={currentTrack.artist}
        artwork={currentTrack?.artwork as string}
        controlsProps={controlsProps}
        minimal
        title={currentTrack.title}
      />
    </Pressable>
  );
};
