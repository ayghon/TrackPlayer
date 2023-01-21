import { DeviceEventEmitter } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
import { RootStackParamList, Routes } from '../routes.types';
import { StorageEvent } from '../../storage';
import { TrackView } from '../../../ui';
import { usePlayerState } from '../../player';
import React, { useEffect, useState } from 'react';

export const FloatingPlayer = () => {
  const [enabled, setEnabled] = useState(true);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { controls, currentTrack, queue, playlist } = usePlayerState();

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      StorageEvent.CLEAR_CACHE,
      () => setEnabled(false)
    );

    return () => listener.remove();
  }, []);

  if (!enabled || !currentTrack || queue.length === 0) {
    return null;
  }

  const playerPressHandler = () => {
    if (playlist?.id) {
      navigate(Routes.PLAYER, {
        continueCurrent: true,
        playlistId: playlist.id
      });
    }
  };

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
