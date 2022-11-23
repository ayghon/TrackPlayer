import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect
} from 'react';
import { usePlayerControls, UsePlayerControlsResponse } from './player.utils';
import { TrackControlsCapability } from '../../ui';
import TrackPlayer from 'react-native-track-player';

const initialValue: UsePlayerControlsResponse = {
  queue: [],
  controlsProps: {
    position: 0,
    duration: 0,
    isPlaying: false,
    capabilities: {
      [TrackControlsCapability.JUMP_BACKWARD]: {
        disabled: false,
        onPress: () => {}
      },
      [TrackControlsCapability.JUMP_FORWARD]: {
        disabled: false,
        onPress: () => {}
      },
      [TrackControlsCapability.SKIP_TO_NEXT]: {
        disabled: false,
        onPress: () => {}
      },
      [TrackControlsCapability.PLAY_PAUSE]: {
        disabled: false,
        onPress: () => {}
      },
      [TrackControlsCapability.SKIP_TO_PREVIOUS]: {
        disabled: false,
        onPress: () => {}
      }
    },
    onProgressChange: () => {}
  },
  currentTrack: undefined,
  setCurrentTrack: () => {},
  setQueue: () => {}
};

const PlayerContext = createContext<UsePlayerControlsResponse>(initialValue);

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = usePlayerControls();

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
  return useContext(PlayerContext);
};
