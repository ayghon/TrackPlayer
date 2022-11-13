import { Icon, makeStyles, Slider, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

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
};

export const TrackControls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities
}: TrackControlsProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View>
      <Slider
        value={position}
        maximumValue={duration}
        minimumValue={0}
        maximumTrackTintColor={theme.colors.primary}
        minimumTrackTintColor={theme.colors.secondary}
        thumbTintColor={theme.colors.secondary}
        thumbTouchSize={{ width: 12, height: 12 }}
        trackStyle={styles.sliderTrack}
        thumbStyle={styles.sliderThumb}
        onSlidingComplete={onProgressChange}
      />
      <View style={styles.container}>
        <Icon
          size={56}
          containerStyle={styles.outerIconStart}
          name="skip-previous"
          disabledStyle={styles.icon}
          disabled={
            capabilities[TrackControlsCapability.SKIP_TO_PREVIOUS].disabled
          }
          onPress={
            capabilities[TrackControlsCapability.SKIP_TO_PREVIOUS].onPress
          }
        />
        <Icon
          containerStyle={styles.innerIconStart}
          size={32}
          disabledStyle={styles.icon}
          name="fast-rewind"
          disabled={
            capabilities[TrackControlsCapability.JUMP_BACKWARD].disabled
          }
          onPress={capabilities[TrackControlsCapability.JUMP_BACKWARD].onPress}
        />
        <Icon
          size={56}
          disabledStyle={styles.icon}
          name={isPlaying ? 'play-arrow' : 'pause'}
          disabled={capabilities[TrackControlsCapability.PLAY_PAUSE].disabled}
          onPress={capabilities[TrackControlsCapability.PLAY_PAUSE].onPress}
        />
        <Icon
          containerStyle={styles.innerIconEnd}
          size={32}
          disabledStyle={styles.icon}
          name="fast-forward"
          disabled={capabilities[TrackControlsCapability.JUMP_FORWARD].disabled}
          onPress={capabilities[TrackControlsCapability.JUMP_FORWARD].onPress}
        />
        <Icon
          containerStyle={styles.outerIconEnd}
          size={56}
          disabledStyle={styles.icon}
          name="skip-next"
          disabled={capabilities[TrackControlsCapability.SKIP_TO_NEXT].disabled}
          onPress={capabilities[TrackControlsCapability.SKIP_TO_NEXT].onPress}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  sliderTrack: { height: 6 },
  sliderThumb: { height: 16, width: 16 },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerIconEnd: {
    paddingStart: 16
  },
  outerIconStart: {
    paddingEnd: 16
  },
  innerIconEnd: {
    paddingStart: 8
  },
  innerIconStart: {
    paddingEnd: 8
  },
  icon: {
    backgroundColor: theme.colors.background
  }
}));
