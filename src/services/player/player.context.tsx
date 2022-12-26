import { TrackControlsCapability } from '../../ui';
import {
  UsePlayerControlsResponse,
  useInitPlayer,
  usePlayerControls
} from './player.utils';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect
} from 'react';
import TrackPlayer from 'react-native-track-player';

const initialValue: UsePlayerControlsResponse = {
  controlsProps: {
    capabilities: {
      [TrackControlsCapability.JUMP_BACKWARD]: {
        disabled: false,
        onPress: () => null
      },
      [TrackControlsCapability.JUMP_FORWARD]: {
        disabled: false,
        onPress: () => null
      },
      [TrackControlsCapability.SKIP_TO_NEXT]: {
        disabled: false,
        onPress: () => null
      },
      [TrackControlsCapability.PLAY_PAUSE]: {
        disabled: false,
        onPress: () => null
      },
      [TrackControlsCapability.SKIP_TO_PREVIOUS]: {
        disabled: false,
        onPress: () => null
      }
    },
    duration: 0,
    isPlaying: false,
    onProgressChange: () => null,
    position: 0
  },
  currentTrack: undefined,
  queue: [],
  setCurrentTrack: () => null,
  setQueue: () => null
};

const PlayerContext = createContext<UsePlayerControlsResponse>(initialValue);

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = usePlayerControls();
  useInitPlayer();

  useEffect(() => {
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerState = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('Player Context: Provider is missing');
  }

  return context;
};
