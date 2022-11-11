import { Icon, Slider } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';

type ControlButton = {
  disabled: boolean;
  onPress: () => void;
};

export enum ControlsCapability {
  PLAY_PAUSE = 'play-pause',
  JUMP_FORWARD = 'jump-forward',
  JUMP_BACKWARD = 'jump-backward',
  SKIP_TO_NEXT = 'skip-to-next',
  SKIP_TO_PREVIOUS = 'skip-to-previous'
}

export type ControlsProps = {
  position: number;
  isPlaying: boolean;
  duration: number;
  onProgressChange: (position: number) => void;
  capabilities: Record<ControlsCapability, ControlButton>;
};

export const Controls = ({
  duration,
  isPlaying,
  position,
  onProgressChange,
  capabilities
}: ControlsProps) => {
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
        trackStyle={{ height: 6 }}
        thumbStyle={{ height: 16, width: 16 }}
        onSlidingComplete={onProgressChange}
      />
      <View style={styles.container}>
        <Icon
          size={56}
          containerStyle={styles.outerIconStart}
          iconStyle={styles.icon}
          name="skip-previous"
          disabled={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].disabled}
          onPress={capabilities[ControlsCapability.SKIP_TO_PREVIOUS].onPress}
        />
        <Icon
          containerStyle={styles.innerIconStart}
          size={32}
          iconStyle={styles.icon}
          name="fast-rewind"
          disabled={capabilities[ControlsCapability.JUMP_BACKWARD].disabled}
          onPress={capabilities[ControlsCapability.JUMP_BACKWARD].onPress}
        />
        <Icon
          size={56}
          iconStyle={styles.icon}
          name={isPlaying ? 'play-arrow' : 'pause'}
          disabled={capabilities[ControlsCapability.PLAY_PAUSE].disabled}
          onPress={capabilities[ControlsCapability.PLAY_PAUSE].onPress}
        />
        <Icon
          containerStyle={styles.innerIconEnd}
          size={32}
          iconStyle={styles.icon}
          name="fast-forward"
          disabled={capabilities[ControlsCapability.JUMP_FORWARD].disabled}
          onPress={capabilities[ControlsCapability.JUMP_FORWARD].onPress}
        />
        <Icon
          containerStyle={styles.outerIconEnd}
          size={56}
          iconStyle={styles.icon}
          name="skip-next"
          disabled={capabilities[ControlsCapability.SKIP_TO_NEXT].disabled}
          onPress={capabilities[ControlsCapability.SKIP_TO_NEXT].onPress}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerIconEnd: {
    backgroundColor: theme.colors.background,
    paddingStart: 16
  },
  outerIconStart: {
    backgroundColor: theme.colors.background,
    paddingEnd: 16
  },
  innerIconEnd: {
    backgroundColor: theme.colors.background,
    paddingStart: 8
  },
  innerIconStart: {
    backgroundColor: theme.colors.background,
    paddingEnd: 8
  },
  icon: {
    backgroundColor: theme.colors.background,
    color: theme.colors.black
  }
}));
