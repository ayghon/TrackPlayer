import { RepeatMode } from 'react-native-track-player';

export enum TrackControlsCapability {
  PLAY_PAUSE = 'play-pause',
  JUMP_FORWARD = 'jump-forward',
  JUMP_BACKWARD = 'jump-backward',
  SKIP_TO_NEXT = 'skip-to-next',
  SKIP_TO_PREVIOUS = 'skip-to-previous'
}

type TrackControlButton = {
  disabled: boolean;
  onPress: () => void;
};

export type TrackCapabilities = Record<
  TrackControlsCapability,
  TrackControlButton
>;

export type TrackControls = {
  position: number;
  isPlaying: boolean;
  duration: number;
  onProgressChange: (position: number) => void;
  capabilities: TrackCapabilities;
  repeatMode?: RepeatMode;
  changeRepeatMode?: (mode: RepeatMode) => void;
  toggleShuffle?: () => void;
  shuffle?: boolean;
};
