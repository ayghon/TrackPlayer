import { Horizontal } from '../../display';
import { Icon, Slider, makeStyles, useTheme } from '@rneui/themed';
import { RepeatMode } from 'react-native-track-player';
import { RepeatModeControls } from './RepeatModeControls';
import { View } from 'react-native';
import React from 'react';

type TrackControlButton = {
  disabled: boolean;
  onPress: () => void;
};

export enum TrackControlsCapability {
  PLAY_PAUSE = 'play-pause',
  JUMP_FORWARD = 'jump-forward',
  JUMP_BACKWARD = 'jump-backward',
  SKIP_TO_NEXT = 'skip-to-next',
  SKIP_TO_PREVIOUS = 'skip-to-previous'
}

export type TrackControlsProps = {
  position: number;
  isPlaying: boolean;
  duration: number;
  onProgressChange: (position: number) => void;
  capabilities: Record<TrackControlsCapability, TrackControlButton>;
  repeatMode?: RepeatMode;
  changeRepeatMode?: (mode: RepeatMode) => void;
  toggleShuffle?: () => void;
  shuffle?: boolean;
};

export const TrackControls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities,
  repeatMode = RepeatMode.Off,
  changeRepeatMode,
  toggleShuffle,
  shuffle = false
}: TrackControlsProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View>
      <Slider
        maximumTrackTintColor={theme.colors.primary}
        maximumValue={duration}
        minimumTrackTintColor={theme.colors.secondary}
        minimumValue={0}
        onSlidingComplete={onProgressChange}
        thumbStyle={styles.sliderThumb}
        thumbTintColor={theme.colors.secondary}
        thumbTouchSize={{ height: 12, width: 12 }}
        trackStyle={styles.sliderTrack}
        value={position}
      />
      <Horizontal alignCenter style={styles.container}>
        <Icon
          containerStyle={styles.outerIconStart}
          disabled={
            capabilities[TrackControlsCapability.SKIP_TO_PREVIOUS].disabled
          }
          disabledStyle={styles.icon}
          name="skip-previous"
          onPress={
            capabilities[TrackControlsCapability.SKIP_TO_PREVIOUS].onPress
          }
          size={56}
        />
        <Icon
          containerStyle={styles.innerIconStart}
          disabled={
            capabilities[TrackControlsCapability.JUMP_BACKWARD].disabled
          }
          disabledStyle={styles.icon}
          name="fast-rewind"
          onPress={capabilities[TrackControlsCapability.JUMP_BACKWARD].onPress}
          size={32}
        />
        <Icon
          disabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          disabledStyle={styles.icon}
          name={isPlaying ? 'play-arrow' : 'pause'}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
          size={56}
        />
        <Icon
          containerStyle={styles.innerIconEnd}
          disabled={capabilities[TrackControlsCapability.JUMP_FORWARD].disabled}
          disabledStyle={styles.icon}
          name="fast-forward"
          onPress={capabilities[TrackControlsCapability.JUMP_FORWARD].onPress}
          size={32}
        />
        <Icon
          containerStyle={styles.outerIconEnd}
          disabled={capabilities[TrackControlsCapability.SKIP_TO_NEXT].disabled}
          disabledStyle={styles.icon}
          name="skip-next"
          onPress={capabilities[TrackControlsCapability.SKIP_TO_NEXT].onPress}
          size={56}
        />
      </Horizontal>
      {(toggleShuffle || changeRepeatMode) && (
        <Horizontal style={styles.advancedControlsContainer}>
          {toggleShuffle && (
            <Icon
              color={shuffle ? theme.colors.secondary : undefined}
              name="shuffle"
              onPress={toggleShuffle}
              size={32}
              style={styles.startIcon}
            />
          )}
          {changeRepeatMode && (
            <RepeatModeControls
              onChange={changeRepeatMode}
              repeatMode={repeatMode}
              style={styles.endIcon}
            />
          )}
        </Horizontal>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  advancedControlsContainer: {
    justifyContent: 'space-between'
  },
  container: {
    justifyContent: 'center'
  },
  endIcon: {
    alignSelf: 'flex-end'
  },
  icon: {
    backgroundColor: theme.colors.background
  },
  innerIconEnd: {
    paddingStart: 8
  },
  innerIconStart: {
    paddingEnd: 8
  },
  outerIconEnd: {
    paddingStart: 16
  },
  outerIconStart: {
    paddingEnd: 16
  },
  sliderThumb: { height: 16, width: 16 },
  sliderTrack: { height: 6 },
  startIcon: {
    alignSelf: 'flex-start'
  }
}));
