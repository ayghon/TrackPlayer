import { usePlayerState } from '../../player';
import { TrackView } from '../../../ui';
import React from 'react';
import { Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from '../routes.types';

export const FloatingPlayer = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { controlsProps, currentTrack, queue, playlist } = usePlayerState();

  if (!currentTrack) {
    return null;
  }

  const playerPressHandler = () =>
    navigate(Routes.PLAYER, {
      tracks: queue,
      position: currentTrack?.index,
      playlist
    });

  return (
    <Pressable onPress={playerPressHandler}>
      <TrackView
        minimal
        artwork={currentTrack?.artwork as string}
        artist={currentTrack.artist}
        title={currentTrack.title}
        controlsProps={controlsProps}
      />
    </Pressable>
  );
};
